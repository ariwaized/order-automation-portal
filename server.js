require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const nodemailer = require('nodemailer');

// Import the automation scripts
const { executeBermanOrder } = require('./berman-automation/berman-order');
const { executeRanOrder } = require('./ran-automation/ran-order');
const { verifyRanOrder } = require('./ran-automation/ran-verify');

// Initialize Firebase SDK for background tasks
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, doc, updateDoc, arrayUnion, query, where } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyBBEJleoC42NKahdCcApQGrmx385JU5PPs",
  authDomain: "orderautomation-a1c02.firebaseapp.com",
  projectId: "orderautomation-a1c02",
  storageBucket: "orderautomation-a1c02.firebasestorage.app",
  messagingSenderId: "990225381229",
  appId: "1:990225381229:web:3d68ae83eccdc827d54c64",
  measurementId: "G-SHC24WS44T"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the root directory (the portal UI)
app.use(express.static(path.join(__dirname)));

// API endpoint to dispatch orders via Playwright automation
app.post('/api/dispatch', async (req, res) => {
  const { vendorId, credentials, orderData } = req.body;

  if (!vendorId || !credentials || !orderData) {
    return res.status(400).json({ error: 'Missing required fields: vendorId, credentials, or orderData.' });
  }

  console.log(`\n======================================`);
  console.log(`Received dispatch request for vendor: ${vendorId}`);
  console.log(`Order ID: ${orderData.id}, Date: ${orderData.date}`);
  console.log(`======================================\n`);

  // Respond immediately to the client to avoid blocking the UI
  res.status(200).json({ success: true, message: 'שיגור אוטומטי הופעל ברקע בשרת.' });

  // Run the automation in the background asynchronously
  (async () => {
    const { doc, updateDoc, getDoc } = require('firebase/firestore');
    const orderDocRef = doc(db, 'orders', orderData.id);

    try {
      let result;
      if (vendorId === 'v_berman') {
        result = await executeBermanOrder(orderData, credentials);
      } else if (vendorId === 'v_ran') {
        result = await executeRanOrder(orderData, credentials);
      } else {
        console.error(`[Background] Automation for vendor '${vendorId}' not implemented.`);
        return;
      }

      // Success path
      const isCorrection = orderData.dispatchedItems && orderData.dispatchedItems.length > 0;
      const targetStatus = isCorrection ? 'correction_sent' : 'completed';
      const logMessage = `בוצעה אוטומציה בהצלחה באתר: ${result.message || ''}`;

      const updatePayload = {
        status: targetStatus,
        dispatchedItems: orderData.items
      };

      if (result.vendorOrderNumber) {
        updatePayload.vendorOrderNumber = result.vendorOrderNumber;
      }

      // Get current actionsLog to append
      const docSnap = await getDoc(orderDocRef);
      if (docSnap.exists()) {
        const currentData = docSnap.data();
        const actionsLog = currentData.actionsLog || [];
        actionsLog.push({
          timestamp: new Date().toISOString(),
          action: logMessage
        });
        updatePayload.actionsLog = actionsLog;
      }

      await updateDoc(orderDocRef, updatePayload);
      console.log(`[Background] Order ${orderData.id} status updated to ${targetStatus}`);

    } catch (error) {
      console.error('[Background] Automation failed:', error);
      // Revert status to pending_approval and log the error
      try {
        const docSnap = await getDoc(orderDocRef);
        if (docSnap.exists()) {
          const currentData = docSnap.data();
          const actionsLog = currentData.actionsLog || [];
          actionsLog.push({
            timestamp: new Date().toISOString(),
            action: `❌ שגיאה באוטומציה: ${error.message}`
          });
          await updateDoc(orderDocRef, {
            status: 'pending_approval',
            error: error.message,
            actionsLog: actionsLog
          });
          console.log(`[Background] Order ${orderData.id} reverted to pending_approval`);
        }
      } catch (fbErr) {
        console.error('[Background] Failed to revert order status in Firestore:', fbErr);
      }
    }
  })();
});

// API endpoint to send emails via SMTP
app.post('/api/send-email', async (req, res) => {
  const { to, subject, body } = req.body;

  if (!to || !subject || !body) {
    return res.status(400).json({ error: 'Missing required fields: to, subject, or body.' });
  }

  console.log(`\n======================================`);
  console.log(`Received email dispatch request to: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`======================================\n`);

  try {
    // Check if configuration is set
    if (!process.env.SMTP_USER || process.env.SMTP_USER === 'your-email@gmail.com') {
      throw new Error('SMTP credentials are not configured in the .env file.');
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to,
      subject,
      text: body,
      html: `<div dir="rtl" style="font-family: Arial, sans-serif; text-align: right; direction: rtl; white-space: pre-wrap; font-size: 15px; color: #333;">${body}</div>`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return res.status(200).json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error('Email dispatch failed:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

// Get list of screenshots
app.get('/api/screenshots', (req, res) => {
  const fs = require('fs');
  const screenshotsDir = path.join(__dirname, 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    return res.json([]);
  }
  fs.readdir(screenshotsDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read screenshots directory' });
    }
    try {
      const imagesWithStats = files
        .filter(file => /\.(png|jpe?g|gif)$/i.test(file))
        .map(file => {
          const filePath = path.join(screenshotsDir, file);
          const stat = fs.statSync(filePath);
          return { name: file, mtime: stat.mtimeMs };
        });
      
      imagesWithStats.sort((a, b) => b.mtime - a.mtime);
      res.json(imagesWithStats.map(img => img.name));
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'Failed to read screenshots file stats' });
    }
  });
});

// API endpoint to manually trigger verification for a specific order
app.post('/api/verify', async (req, res) => {
  const { orderId } = req.body;
  if (!orderId) {
    return res.status(400).json({ error: 'Missing required field: orderId' });
  }

  console.log(`\n[Verification] Manual request received for order: ${orderId}`);

  try {
    // Fetch order from Firebase
    const orderDoc = await getDocs(query(collection(db, 'orders'), where('__name__', '==', orderId)));
    if (orderDoc.empty) {
      return res.status(404).json({ error: 'Order not found in database.' });
    }
    
    const orderData = { id: orderDoc.docs[0].id, ...orderDoc.docs[0].data() };
    
    // Fetch Ran credentials
    const vendorsRef = collection(db, 'vendors');
    const ranVendorDoc = await getDocs(query(vendorsRef, where('__name__', '==', 'v_ran')));
    if (ranVendorDoc.empty) {
      return res.status(404).json({ error: 'Ran vendor configuration not found.' });
    }
    
    const vendorData = ranVendorDoc.docs[0].data();
    const credentials = {
      username: vendorData.username,
      password: vendorData.password
    };
    
    // Run verification
    const result = await verifyRanOrder(orderData, credentials);
    const timestamp = new Date().toISOString();
    
    if (!result.success) {
      const logAction = `[אימות ידני] ⚠️ שגיאה בהרצת בדיקת האימות: ${result.error}`;
      await updateDoc(doc(db, 'orders', orderId), {
        actionsLog: arrayUnion({ timestamp, action: logAction })
      });
      return res.status(500).json({ success: false, error: result.error });
    }
    
    let logAction = '';
    if (result.isMatch) {
      logAction = `[אימות ידני] ✅ הזמנת הירקות נבדקה ונמצאה תקינה ותואמת במלואה לפורטל.`;
      await updateDoc(doc(db, 'orders', orderId), {
        actionsLog: arrayUnion({ timestamp, action: logAction })
      });
    } else {
      logAction = `[אימות ידני] ❌ בדיקת האימות נכשלה! נמצאו הפרשים מול אתר הספק. נשלח מייל התראה מפורט.`;
      await updateDoc(doc(db, 'orders', orderId), {
        actionsLog: arrayUnion({ timestamp, action: logAction })
      });
      
      // Build email diff body
      let diffsListHtml = '<ul>';
      result.diffs.forEach(diff => {
        diffsListHtml += `<li style="margin-bottom: 8px; color: #b91c1c;">${diff}</li>`;
      });
      diffsListHtml += '</ul>';
      
      const emailSubject = `⚠️ התראת הפרשים (ידני) בהזמנת הירקות לראן לתאריך ${orderData.date}`;
      const emailBodyHtml = `
        <h2 dir="rtl">התראת הפרשים - פורטל הזמנות ביכורים</h2>
        <p dir="rtl">שלום מנהל,</p>
        <p dir="rtl">בבדיקת האימות הידנית שבוצעה עבור הזמנת הירקות לספק <strong>ראן</strong> לתאריך קבלת סחורה <strong>${orderData.date}</strong>, נמצאו הפרשים מול אתר הספק:</p>
        <div dir="rtl">${diffsListHtml}</div>
        <p dir="rtl">בברכה,<br>בוט הזמנות ביכורים</p>
      `;
      
      await sendNotificationEmail('ariwaized@gmail.com', emailSubject, emailBodyHtml);
    }
    
    return res.status(200).json({ success: true, isMatch: result.isMatch, diffs: result.diffs });
    
  } catch (err) {
    console.error('Manual verification failed:', err);
    return res.status(500).json({ error: err.message });
  }
});

// --- Background Daily Verification Logic ---
async function sendNotificationEmail(to, subject, bodyHtml) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to,
      subject,
      html: `<div dir="rtl" style="font-family: Arial, sans-serif; text-align: right; direction: rtl; white-space: pre-wrap; font-size: 15px; color: #333;">${bodyHtml}</div>`
    };

    await transporter.sendMail(mailOptions);
    console.log('[Verification] Alert email sent successfully.');
  } catch (error) {
    console.error('[Verification] Failed to send alert email:', error);
  }
}

async function runDailyRanVerification() {
  console.log('\n[Verification] Starting automated Ran verification task...');
  
  // Calculate tomorrow's date: YYYY-MM-DD
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];
  
  console.log(`[Verification] Checking active Ran orders for date: ${tomorrowStr}`);
  
  try {
    // 1. Fetch active orders for tomorrow from Firestore
    const ordersRef = collection(db, 'orders');
    const q = query(ordersRef, where('vendorId', '==', 'v_ran'), where('date', '==', tomorrowStr));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      console.log(`[Verification] No active Ran order found in database for tomorrow (${tomorrowStr}).`);
      return;
    }
    
    // 2. Fetch Ran vendor details (credentials)
    const vendorsRef = collection(db, 'vendors');
    const ranVendorDoc = await getDocs(query(vendorsRef, where('__name__', '==', 'v_ran')));
    
    let credentials = null;
    if (!ranVendorDoc.empty) {
      const vendorData = ranVendorDoc.docs[0].data();
      credentials = {
        username: vendorData.username,
        password: vendorData.password
      };
    } else {
      console.error('[Verification] Ran vendor configuration not found in database.');
      return;
    }
    
    // 3. Perform verification for each order found
    for (const docSnap of querySnapshot.docs) {
      const order = { id: docSnap.id, ...docSnap.data() };
      
      const result = await verifyRanOrder(order, credentials);
      const timestamp = new Date().toISOString();
      
      if (!result.success) {
        console.error(`[Verification] Playwright execution failed for order ${order.id}:`, result.error);
        const logAction = `[אימות אוטומטי] ⚠️ שגיאה בהרצת בדיקת האימות: ${result.error}`;
        await updateDoc(doc(db, 'orders', order.id), {
          actionsLog: arrayUnion({ timestamp, action: logAction })
        });
        continue;
      }
      
      if (result.isMatch) {
        console.log(`[Verification] Order ${order.id} is verified and matches perfectly!`);
        const logAction = `[אימות אוטומטי] ✅ הזמנת הירקות נבדקה ונמצאה תקינה ותואמת במלואה לפורטל.`;
        await updateDoc(doc(db, 'orders', order.id), {
          actionsLog: arrayUnion({ timestamp, action: logAction })
        });
      } else {
        console.warn(`[Verification] Mismatch detected for order ${order.id}!`);
        
        // Write mismatch log
        const logAction = `[אימות אוטומטי] ❌ בדיקת האימות נכשלה! נמצאו הפרשים מול אתר הספק. נשלח מייל התראה מפורט.`;
        await updateDoc(doc(db, 'orders', order.id), {
          actionsLog: arrayUnion({ timestamp, action: logAction })
        });
        
        // Build email diff body
        let diffsListHtml = '<ul>';
        result.diffs.forEach(diff => {
          diffsListHtml += `<li style="margin-bottom: 8px; color: #b91c1c;">${diff}</li>`;
        });
        diffsListHtml += '</ul>';
        
        const emailSubject = `⚠️ התראת הפרשים בהזמנת הירקות לראן לתאריך ${order.date}`;
        const emailBodyHtml = `
          <h2 dir="rtl">התראת הפרשים - פורטל הזמנות ביכורים</h2>
          <p dir="rtl">שלום מנהל,</p>
          <p dir="rtl">בבדיקת האימות האוטומטית שבוצעה עבור הזמנת הירקות לספק <strong>ראן</strong> לתאריך קבלת סחורה <strong>${order.date}</strong>, נמצאו הפרשים בין הרשום בפורטל לבין מה שמופיע בפועל באתר של ראן:</p>
          <div dir="rtl">${diffsListHtml}</div>
          <p dir="rtl"><em>שים לב: המערכת לא ביצעה תיקון אוטומטי כדי לא לדרוס שינויים ידניים שנעשו באתר. אנא בדוק זאת.</em></p>
          <p dir="rtl">בברכה,<br>בוט הזמנות ביכורים</p>
        `;
        
        await sendNotificationEmail('ariwaized@gmail.com', emailSubject, emailBodyHtml);
      }
    }
    
  } catch (err) {
    console.error('[Verification] Error running daily task:', err);
  }
}

// --- Background Daily Verification Scheduler ---
let lastVerificationDate = '';

setInterval(async () => {
  const now = new Date();
  const todayStr = now.toISOString().split('T')[0]; // YYYY-MM-DD
  const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  
  const targetTime = process.env.RAN_VERIFICATION_TIME || '12:20';
  if (timeStr === targetTime && lastVerificationDate !== todayStr) {
    lastVerificationDate = todayStr;
    console.log(`\n[Scheduler] Time matches ${targetTime}. Running daily Ran order verification...`);
    try {
      await runDailyRanVerification();
    } catch (err) {
      console.error('[Scheduler] Ran verification task failed:', err);
    }
  }
}, 30000); // Check every 30 seconds

app.listen(PORT, () => {
  console.log(`\n=================================================`);
  console.log(`🚀 Portal Server is running at http://localhost:${PORT}`);
  console.log(`=================================================\n`);
});
