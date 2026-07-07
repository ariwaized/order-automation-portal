/**
 * ===================================================
 * סקריפט אימות הזמנות - ספק ירקות ראן (R.A.N)
 * ===================================================
 */

const { chromium } = require('playwright');

// חיפוש הזמנה עם תמיכה בדפדוף (Pagination) מבוסס pos
async function locateOrderRow(page, orderDate, vendorOrderNumber) {
  const targetDateOnly = orderDate; // YYYY-MM-DD
  
  for (let offset = 0; offset <= 210; offset += 70) {
    console.log(`   🔍 מחפש את ההזמנה בעמוד עם offset pos=${offset}...`);
    await page.goto(`http://www.ranfp.com/index.php?dir=site&page=members&op=orders&id=14&pos=${offset}`);
    await page.waitForTimeout(2000);
    
    const hasTable = await page.evaluate(() => !!document.querySelector('table tbody tr'));
    if (!hasTable) {
      console.log('   ℹ️ העמוד ריק או שלא קיימת טבלת הזמנות, עוצר חיפוש.');
      break;
    }
    
    const editBtnSelector = await page.evaluate(({ targetDate, targetOrderNo }) => {
      const rows = Array.from(document.querySelectorAll('table tbody tr'));
      for (const row of rows) {
        const cells = Array.from(row.querySelectorAll('td'));
        if (cells.length < 5) continue;
        
        const orderNo = cells[4].innerText.trim();
        const dateCell = cells[1].innerText.trim();
        
        if (targetOrderNo) {
          if (orderNo === String(targetOrderNo)) {
            const editBtn = row.querySelector('a[href*="edit="]') || row.querySelector('a[href*="view="]');
            if (editBtn) return `a[href*="${editBtn.getAttribute('href')}"]`;
          }
        } else {
          if (dateCell.startsWith(targetDate)) {
            const editBtn = row.querySelector('a[href*="edit="]') || row.querySelector('a[href*="view="]');
            if (editBtn) return `a[href*="${editBtn.getAttribute('href')}"]`;
          }
        }
      }
      return null;
    }, { targetDate: targetDateOnly, targetOrderNo: vendorOrderNumber || null });
    
    if (editBtnSelector) {
      console.log(`   ✅ נמצא כפתור להזמנה ${vendorOrderNumber || targetDateOnly} ב-offset pos=${offset}`);
      return editBtnSelector;
    }
  }
  
  return null;
}

async function verifyRanOrder(order, credentials) {
  console.log(`🔍 מתחיל בדיקת אימות להזמנה ${order.id} לתאריך ${order.date}...`);
  
  const browser = await chromium.launch({ 
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu'
    ]
  });
  const context = await browser.newContext({ locale: 'he-IL', timezoneId: 'Asia/Jerusalem' });
  const page = await context.newPage();
  page.setDefaultTimeout(30000);
  
  try {
    // 1. התחברות
    await page.goto('http://www.ranfp.com/index.php?dir=site&page=members&op=enter');
    await page.getByRole('textbox', { name: 'דואר אלקטרוני' }).fill(credentials.username);
    await page.getByRole('textbox', { name: 'סיסמא' }).fill(credentials.password);
    await page.getByRole('button', { name: 'התחבר' }).click();
    await page.waitForURL('**/index.php?dir=site&page=members&op=view*');

    // 2. מעבר להזמנות שלי ומציאת ההזמנה
    console.log('📅 מחפש את ההזמנה ב"ההזמנות שלי"...');
    const editButtonSelector = await locateOrderRow(page, order.date, order.vendorOrderNumber);

    if (!editButtonSelector) {
      console.log(`   ❌ לא נמצאה הזמנה פעילה באתר של ראן לתאריך ${order.date}.`);
      await browser.close();
      return {
        success: true,
        isMatch: false,
        diffs: [`לא נמצאה הזמנה פעילה באתר של ראן לתאריך ${order.date}.`]
      };
    }

    // 3. כניסה לעמוד ההזמנה ושליפת כמויות בפועל
    await page.locator(editButtonSelector).first().click();
    await page.waitForTimeout(4000);

    const actualItems = await page.evaluate(() => {
      const list = [];
      const inputs = document.querySelectorAll('input[name^="prodact["]');
      inputs.forEach(input => {
        const qty = parseInt(input.value) || 0;
        if (qty > 0) {
          const nameAttr = input.getAttribute('name');
          const match = nameAttr.match(/\[(\d+)\]/);
          if (match) {
            const sku = match[1];
            const tr = input.closest('tr');
            let name = 'Unknown';
            if (tr) {
              const cells = tr.querySelectorAll('td');
              name = cells[0] ? cells[0].innerText.trim().split('\n')[0] : 'Unknown';
            }
            list.push({ sku, name, quantity: qty });
          }
        }
      });
      return list;
    });

    await browser.close();

    // 4. השוואת פריטים וכמויות
    const diffs = [];
    
    // בדיקה שכל מה שיש בפורטל קיים ותואם לאתר של ראן
    for (const portalItem of order.items) {
      if (portalItem.quantity === 0) continue;
      const actual = actualItems.find(item => item.sku === String(portalItem.sku));
      if (!actual) {
        diffs.push(`מוצר [${portalItem.sku}] "${portalItem.name}" מופיע בפורטל (כמות: ${portalItem.quantity}) אך חסר לחלוטין באתר של ראן.`);
      } else if (actual.quantity !== portalItem.quantity) {
        diffs.push(`מוצר [${portalItem.sku}] "${portalItem.name}": בפורטל רשום כמות ${portalItem.quantity}, אך באתר של ראן מופיע בפועל כמות ${actual.quantity}.`);
      }
    }

    // בדיקה אם יש מוצרים באתר של ראן שלא קיימים בפורטל
    for (const actual of actualItems) {
      const portalItem = order.items.find(item => String(item.sku) === actual.sku);
      if (!portalItem || portalItem.quantity === 0) {
        diffs.push(`מוצר [${actual.sku}] "${actual.name}" מופיע באתר של ראן (כמות: ${actual.quantity}) אך לא קיים בהזמנה בפורטל.`);
      }
    }

    console.log(`   ✅ בדיקת האימות הסתיימה. הפרשים שנמצאו: ${diffs.length}`);
    return {
      success: true,
      isMatch: diffs.length === 0,
      diffs: diffs
    };

  } catch (err) {
    console.error('❌ שגיאה במהלך בדיקת האימות:', err.message);
    if (browser) await browser.close();
    return {
      success: false,
      error: err.message
    };
  }
}

module.exports = { verifyRanOrder };
