/**
 * ===================================================
 * סקריפט אוטומציה מלאה - ספק ירקות ראן (R.A.N)
 * ===================================================
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// ==============================
// עזרי תאריך
// ==============================
function getTomorrowDateFormatted() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return formatDate(d);
}

function formatDate(d) {
  const day   = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year  = d.getFullYear();
  return `${day}-${month}-${year} 08:00:00`;
}

// ==============================
// ספירה לאחור (Ctrl+C = ביטול)
// ==============================
async function countdown(seconds, message) {
  for (let i = seconds; i > 0; i--) {
    process.stdout.write(`\r${message} עוד ${i} שניות... (Ctrl+C לביטול)`);
    await new Promise(r => setTimeout(r, 1000));
  }
  process.stdout.write('\r' + ' '.repeat(70) + '\r');
}

// ==============================
// הדפסת תצוגה מקדימה
// ==============================
function printPreview(order, targetDate, credentials) {
  const line = '='.repeat(52);
  console.log('\n' + line);
  console.log('🥬  אוטומציה - ספק ירקות ראן');
  console.log(line);
  console.log(`📅  תאריך משלוח : ${targetDate}`);
  console.log(`👤  לקוח         : ${credentials.username}`);
  console.log(`📦  פריטים       : ${order.items.length}\n`);
  order.items.forEach((item, i) => {
    console.log(`  ${i + 1}. [${item.sku}]  ${item.name}  ×  ${item.quantity}`);
  });
  console.log(line);
}

async function executeRanOrder(order, credentials) {
  if (!order.items || order.items.length === 0) {
    throw new Error('❌ אין פריטים בהזמנה.');
  }

  let targetDate = order.date; // YYYY-MM-DD
  if (targetDate && targetDate.includes('-') && targetDate.split('-')[0].length === 4) {
    const [yyyy, mm, dd] = targetDate.split('-');
    targetDate = `${dd}-${mm}-${yyyy} 08:00:00`;
  } else {
    targetDate = getTomorrowDateFormatted();
  }

  printPreview(order, targetDate, credentials);

  await countdown(5, '▶️  מתחיל אוטומציה...');

  const browser = await chromium.launch({ headless: false, slowMo: 300 });
  const context = await browser.newContext({ locale: 'he-IL', timezoneId: 'Asia/Jerusalem' });
  const page = await context.newPage();
  page.setDefaultTimeout(30000);

  try {
    // שלב 1: כניסה
    console.log('🔐 שלב 1/5 — התחברות לאתר...');
    await page.goto('http://www.ranfp.com/index.php?dir=site&page=members&op=enter');
    await page.getByRole('textbox', { name: 'דואר אלקטרוני' }).fill(credentials.username);
    await page.getByRole('textbox', { name: 'סיסמא' }).fill(credentials.password);
    await page.getByRole('button', { name: 'התחבר' }).click();

    await page.waitForURL('**/index.php?dir=site&page=members&op=view*');
    console.log('   ✅ כניסה הצליחה');

    // שלב 2: מעבר לדף ההזמנה
    console.log('📅 שלב 2/5 — מעבר לדף ההזמנה הגדרת תאריך...');
    await page.goto('http://www.ranfp.com/index.php?dir=site&page=orders&op=add&kind=1');
    await page.waitForTimeout(3000);

    // הגדרת תאריך
    await page.evaluate((dateStr) => {
      const el = document.getElementById('date');
      if (el) {
        el.value = dateStr;
        el.dispatchEvent(new Event('change', { bubbles: true }));
        el.dispatchEvent(new Event('blur', { bubbles: true }));
      }
    }, targetDate);
    console.log(`   ✅ תאריך הוגדר: ${targetDate}`);

    // שלב 3: הוספת כמויות מוצרים
    console.log('🛒 שלב 3/5 — מזין כמויות עבור מוצרים...');
    for (const item of order.items) {
      if (!item.sku) {
        console.warn(`   ⚠️ מוצר [${item.name}] חסר מק"ט (SKU) - מדלג.`);
        continue;
      }
      
      const inputSelector = `input[name="prodact[${item.sku}]"]`;
      const qtyInput = page.locator(inputSelector).first();
      
      try {
        await qtyInput.waitFor({ state: 'visible', timeout: 5000 });
        await qtyInput.click({ clickCount: 3 });
        await qtyInput.fill(String(item.quantity));
        console.log(`      ✅ [${item.sku}] ${item.name} -> כמות: ${item.quantity}`);
      } catch (e) {
        console.error(`      ❌ שגיאה במילוי מוצר מק"ט ${item.sku} (${item.name}):`, e.message);
      }
    }

    // שלב 4: שיגור הזמנה
    console.log('\n🚀 שלב 4/5 — שולח הזמנה...');
    await countdown(5, '🔴 שודר בעוד');
    
    await page.locator('#addbtn').click();
    console.log('   ✅ כפתור שליחה נלחץ');

    // שלב 5: המתנה להצלחה וצילום מסך
    console.log('📸 שלב 5/5 — ממתין להודעת אישור מהאתר...');
    const successMsg = page.locator('.send-massage');
    await successMsg.waitFor({ state: 'visible', timeout: 25000 });
    
    // המתנה לייצוב ההודעה
    await page.waitForTimeout(2000);

    // יצירת תיקיית צילומי מסך אם לא קיימת
    const screenshotsDir = path.join(__dirname, '..', 'screenshots');
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }

    const screenshotPath = path.join(screenshotsDir, `order_${order.id}.png`);
    await page.screenshot({ path: screenshotPath });
    console.log(`   ✅ צילום מסך נשמר: ${screenshotPath}`);

    console.log('\n' + '='.repeat(52));
    console.log('✅  ההזמנה לראן שודרה בהצלחה! 🎉');
    console.log('='.repeat(52) + '\n');

    await browser.close();
    return { success: true, message: 'ההזמנה שודרה בהצלחה!' };

  } catch (err) {
    console.error('\n❌ שגיאה באוטומציה:', err.message);
    if (browser) await browser.close();
    throw err;
  }
}

module.exports = { executeRanOrder };
