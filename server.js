const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Helpers
function formatItemsList(items) {
  return items.map(item => `- ${item.name}: ${item.quantity} ${item.unit || ''}`).join('\n');
}

function computeItemsDiff(oldItems, newItems) {
  const oldMap = new Map(oldItems.map(i => [i.name, i]));
  const newMap = new Map(newItems.map(i => [i.name, i]));
  const changes = [];

  // Check new/changed items
  for (const [name, newItem] of newMap.entries()) {
    const oldItem = oldMap.get(name);
    if (!oldItem) {
      changes.push(`+ התווסף: ${name} (${newItem.quantity} ${newItem.unit || ''})`);
    } else if (oldItem.quantity !== newItem.quantity) {
      changes.push(`* עודכן: ${name} (שונה מ-${oldItem.quantity} ל-${newItem.quantity} ${newItem.unit || ''})`);
    }
  }

  // Check deleted items
  for (const [name, oldItem] of oldMap.entries()) {
    if (!newMap.has(name)) {
      changes.push(`- בוטל: ${name} (הוסר מההזמנה)`);
    }
  }

  return changes.length > 0 ? changes.join('\n') : 'אין שינויים בכמויות';
}

// API Endpoints

// Get db status
app.get('/api/status', (req, res) => {
  res.json({
    status: 'ok',
    dbType: db.getDbType(),
    timestamp: new Date().toISOString()
  });
});

// Vendors API
app.get('/api/vendors', async (req, res) => {
  try {
    const vendors = await db.getVendors();
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/vendors', async (req, res) => {
  try {
    const vendor = req.body;
    if (!vendor.name || !vendor.type) {
      return res.status(400).json({ error: 'שם וסוג ספק הם שדות חובה' });
    }
    const saved = await db.saveVendor(vendor);
    res.json(saved);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/vendors/:id', async (req, res) => {
  try {
    await db.deleteVendor(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Orders API
app.get('/api/orders', async (req, res) => {
  try {
    const { date } = req.query; // YYYY-MM-DD
    const orders = await db.getOrders(date);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const order = req.body;
    if (!order.date || !order.vendorId || !order.items) {
      return res.status(400).json({ error: 'תאריך, מזהה ספק ורשימת פריטים הם שדות חובה' });
    }

    // Ensure status defaults to pending_approval if not set
    if (!order.status) {
      order.status = 'pending_approval';
    }

    if (!order.actionsLog) {
      order.actionsLog = [{
        timestamp: new Date().toISOString(),
        action: 'הזמנה נוצרה'
      }];
    }

    const saved = await db.saveOrder(order);
    res.json(saved);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/orders/:id', async (req, res) => {
  try {
    await db.deleteOrder(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Prepare Action (Generate Preview for Confirmation)
app.post('/api/orders/:id/prepare-action', async (req, res) => {
  try {
    const orders = await db.getOrders();
    const order = orders.find(o => o.id === req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'ההזמנה לא נמצאה' });
    }

    const vendors = await db.getVendors();
    const vendor = vendors.find(v => v.id === order.vendorId);
    if (!vendor) {
      return res.status(404).json({ error: 'הספק לא נמצא' });
    }

    const dateFormatted = order.date;
    const isCorrection = order.status === 'completed' || order.status === 'correction_sent' || order.dispatchedItems;

    let actionPayload = {
      type: vendor.type,
      vendorName: vendor.name,
      isCorrection: !!isCorrection
    };

    if (vendor.type === 'email') {
      const itemsText = formatItemsList(order.items);
      let subject = `הזמנת סחורה - ${vendor.name} - תאריך ${dateFormatted}`;
      let body = '';

      if (isCorrection && order.dispatchedItems) {
        subject = `עדכון/תיקון הזמנה - ${vendor.name} - תאריך ${dateFormatted}`;
        const changesText = computeItemsDiff(order.dispatchedItems, order.items);
        const template = vendor.correctionTemplate || 'שלום,\nבוצע תיקון להזמנה של {{date}}:\n\nהשינויים:\n{{changes}}\n\nהרשימה המעודכנת:\n{{items}}';
        body = template
          .replace(/\{\{date\}\}/g, dateFormatted)
          .replace(/\{\{changes\}\}/g, changesText)
          .replace(/\{\{items\}\}/g, itemsText);
        
        actionPayload.changesSummary = changesText;
      } else {
        const template = vendor.emailTemplate || 'שלום,\nאנא ספקו לתאריך {{date}}:\n\n{{items}}';
        body = template
          .replace(/\{\{date\}\}/g, dateFormatted)
          .replace(/\{\{items\}\}/g, itemsText);
      }

      actionPayload.emailDetails = {
        to: vendor.email,
        subject: subject,
        body: body
      };
    } else if (vendor.type === 'website') {
      // Create detailed step-by-step simulator payload
      const steps = [
        { desc: `ניווט לכתובת האתר: ${vendor.websiteUrl || 'כתובת לא מוגדרת'}`, value: vendor.websiteUrl },
        { desc: `הזנת שם משתמש וסיסמה`, value: `שם משתמש: ${vendor.username || 'לא מוגדר'} | סיסמה: ********` },
        { desc: `מעבר לדף ניהול עגלות/הזמנות קבועות` }
      ];

      order.items.forEach(item => {
        steps.push({ desc: `חיפוש פריט: "${item.name}" והוספת ${item.quantity} ${item.unit || ''} לסל` });
      });

      steps.push({ desc: `בדיקה סופית של העגלה ואימות כמויות` });
      steps.push({ desc: `לחיצה על כפתור ביצוע הזמנה סופי לתאריך ${dateFormatted}` });

      actionPayload.websiteDetails = {
        url: vendor.websiteUrl,
        username: vendor.username,
        steps: steps,
        itemsCount: order.items.length
      };
    }

    res.json(actionPayload);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Dispatch Action (Confirm & Send)
app.post('/api/orders/:id/dispatch', async (req, res) => {
  try {
    const orders = await db.getOrders();
    const order = orders.find(o => o.id === req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'ההזמנה לא נמצאה' });
    }

    const vendors = await db.getVendors();
    const vendor = vendors.find(v => v.id === order.vendorId);
    if (!vendor) {
      return res.status(404).json({ error: 'הספק לא נמצא' });
    }

    const timestamp = new Date().toISOString();
    let logMessage = '';

    if (vendor.type === 'email') {
      // In a real environment, nodemailer would be configured here.
      // We will simulate it and log success.
      logMessage = `נשלח מייל בהצלחה לכתובת ${vendor.email}`;
      if (order.dispatchedItems) {
        logMessage = `נשלח מייל תיקון בהצלחה לכתובת ${vendor.email}`;
      }
      order.status = order.dispatchedItems ? 'correction_sent' : 'completed';
    } else {
      // Website automation simulator commit
      logMessage = `בוצעה אוטומציה בהצלחה באתר ${vendor.websiteUrl}`;
      order.status = 'completed';
    }

    // Save current items as dispatched so future edits can calculate diffs
    order.dispatchedItems = JSON.parse(JSON.stringify(order.items));

    // Update log
    if (!order.actionsLog) order.actionsLog = [];
    order.actionsLog.push({
      timestamp: timestamp,
      action: logMessage
    });

    const saved = await db.saveOrder(order);
    res.json({
      success: true,
      log: logMessage,
      order: saved
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
