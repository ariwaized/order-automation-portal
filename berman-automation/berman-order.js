/**
 * ===================================================
 * סקריפט אוטומציה מלאה - מאפיית ברמן
 * ===================================================
 * שימוש:
 *   node berman-order.js order.json
 *
 * הסקריפט מבצע את כל התהליך אוטומטית:
 * כניסה → בחירת תאריך → הוספת פריטים → שדר הזמנה
 * ===================================================
 */

const { chromium } = require('playwright');

// ==============================
// הגדרות קבועות
// ==============================
const BASE_URL = 'https://bermanapp.co.il/#/';
const SLOW_MO = 350; // האטה (ms) - כדי לראות מה קורה בדפדפן

// ==============================
// עזרי תאריך
// ==============================
function getTomorrowDate() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return formatDate(d);
}

function formatDate(d) {
  const day   = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year  = d.getFullYear();
  return `${day}-${month}-${year}`;
}

// פונקציה זו הוסרה מכיוון שההזמנה מגיעה כעת מהשרת

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
// סגירת פופ-אפ (פונקציה)
// ==============================
async function closePopupIfExists(page, stepLabel) {
  console.log(`📢 ${stepLabel} — מחפש הודעה קופצת (פופ-אפ)...`);
  try {
    const xBtn = page.locator('span.material-symbols-outlined', { hasText: 'close' }).first();
    await xBtn.waitFor({ state: 'visible', timeout: 5000 });
    await xBtn.click();
    console.log('   ✅ הודעה נסגרה');
    await page.waitForTimeout(800);
    return true;
  } catch (e) {
    console.log('   ℹ️  לא הופיעה הודעה - ממשיך');
    return false;
  }
}

// ==============================
// הדפסת תצוגה מקדימה
// ==============================
function printPreview(order, targetDate, credentials) {
  const line = '='.repeat(52);
  console.log('\n' + line);
  console.log('🍞  אוטומציה - מאפיית ברמן');
  console.log(line);
  console.log(`📅  תאריך משלוח : ${targetDate}`);
  console.log(`👤  לקוח         : ${credentials.username}`);
  console.log(`📦  פריטים       : ${order.items.length}\n`);
  order.items.forEach((item, i) => {
    console.log(`  ${i + 1}. [${item.sku}]  ${item.name}  ×  ${item.quantity}`);
  });
  console.log(line);
}

// ==============================
// לוגיקת האוטומציה הראשית
// ==============================
async function executeBermanOrder(order, credentials) {
  if (!order.items || order.items.length === 0) {
    throw new Error('❌ אין פריטים בהזמנה.');
  }

  let targetDate = order.date || getTomorrowDate();
  
  // אם התאריך הגיע מהפורטל בפורמט של מערכת (YYYY-MM-DD), נמיר אותו לפורמט של ברמן (DD-MM-YYYY)
  if (targetDate && targetDate.includes('-') && targetDate.split('-')[0].length === 4) {
    const [yyyy, mm, dd] = targetDate.split('-');
    targetDate = `${dd}-${mm}-${yyyy}`;
  }

  printPreview(order, targetDate, credentials);

  // ספירה לאחור לפני התחלה - אפשרות לבטל
  await countdown(5, '▶️  מתחיל אוטומציה...');

  const browser = await chromium.launch({ headless: false, slowMo: SLOW_MO });
  
  // 1. הגדרת אפשרויות הדפדפן
  const context = await browser.newContext({ locale: 'he-IL', timezoneId: 'Asia/Jerusalem' });
  const page    = await context.newPage();
  page.setDefaultTimeout(25000);

  try {

    // ================================================
    // שלב 1: כניסה
    // ================================================
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    console.log('🔐 שלב 1/6 — מבצע התחברות לאתר...');
    const inputs = page.locator('input');
    await inputs.nth(0).fill(credentials.username);
    await inputs.nth(1).fill(credentials.password);
    await page.locator('button', { hasText: 'כניסה' }).filter({ visible: true }).click();
    
    await page.waitForTimeout(3000);
    console.log('   ✅ כניסה הצליחה');

    // ================================================
    // שלב 2: סגירת חלון מוקפץ
    // ================================================
    await closePopupIfExists(page, 'שלב 2/6');

    // ================================================
    // שלב 3: בחירת שורת תאריך + "צפייה"
    // ================================================
    console.log(`📅 שלב 3/6 — בחירת תאריך ${targetDate}...`);

    const dateRow = page.locator(`text=${targetDate}`).first();
    await dateRow.waitFor({ state: 'visible' });
    await dateRow.click(); // בחירת השורה (נצבעת אפור)
    await page.waitForTimeout(600);

    // לחיצה על "צפייה"
    const viewBtn = page.locator('div.redirect').filter({ has: page.getByText('צפייה', { exact: true }) }).first();
    await viewBtn.waitFor({ state: 'visible', timeout: 15000 });
    await viewBtn.click();
    
    // סומכים רק על זמנים ועל הופעת כפתורים (לא networkidle שעלול להיתקע)
    await page.waitForTimeout(4000);
    
    // אולי קופץ פופ אפ פה? ננסה לסגור אותו
    await closePopupIfExists(page, 'אחרי לחיצה על צפייה');
    
    console.log('   ✅ נכנסנו לדף ההזמנה');

    // ================================================
    // שלב 4: הוספת פריטים מהקטלוג (כניסה אחת, חיפוש רצוף)
    // ================================================
    console.log(`🛒 שלב 4/6 — הוספת ${order.items.length} פריטים...`);

    const addItemBtn = page.locator('div.box_option', { hasText: 'הוסף פריט' }).first();
    // נותן לזה חצי דקה (30 שניות) לחכות שכפתור הוסף פריט יופיע
    await addItemBtn.waitFor({ state: 'visible', timeout: 30000 });
    await addItemBtn.click();
    console.log('   ✅ לחיצה על "הוסף פריט" הצליחה');
    await page.waitForTimeout(2000);

    for (let i = 0; i < order.items.length; i++) {
      const item = order.items[i];
      let itemSku = item.sku;
      
      // אם אין מק"ט מפורש (למשל פריט שהוזן ידנית), נחפש את המספר הראשון בתוך השם
      if (!itemSku && item.name) {
        const match = item.name.match(/(\d+)/);
        if (match) itemSku = match[1];
      }
      
      itemSku = String(itemSku || item.name).trim();

      console.log(`\n   [${i + 1}/${order.items.length}] מק"ט ${itemSku} — ${item.name}`);

      // חיפוש
      const openSearchBtn = page.locator('button.icon').filter({ has: page.locator('img[src*="search-amit.svg"]') }).first();
      await openSearchBtn.waitFor({ state: 'visible', timeout: 10000 });
      await openSearchBtn.click();
      console.log('   ✅ לחיצה על זכוכית המגדלת (פתיחת חיפוש)');

      await page.waitForTimeout(2000);

      const searchInput = page.getByPlaceholder('חיפוש מוצר...');
      await searchInput.waitFor({ state: 'visible', timeout: 10000 });
      await searchInput.click({ clickCount: 3 });
      await searchInput.fill(itemSku);
      
      // הוספתי המתנה ארוכה יותר כדי שהאתר האיטי יספיק להגיב
      await page.waitForTimeout(3000); 
      console.log(`   ✅ מק"ט ${itemSku} הוקלד בהצלחה`);

      // סגירת פופ אפ שאולי קפץ פתאום והפריע
      const didClosePopup = await closePopupIfExists(page, 'בדיקת פופ-אפ בזמן חיפוש');
      
      if (didClosePopup) {
        console.log('   🔄 הפופ-אפ הפריע! מזין את המק"ט מחדש...');
        await searchInput.click({ clickCount: 3 });
        await searchInput.fill(itemSku);
        await page.waitForTimeout(3000);
      }

      // איתור הפריט המדויק
      const skuLabel = `מק"ט: ${itemSku}`;
      const exactCard = page.locator('div, li, article').filter({ hasText: skuLabel }).first();
      await exactCard.waitFor({ state: 'visible', timeout: 15000 });

      // השדה של הכמות (לפי ה-HTML שהבאת)
      const qtyInput = exactCard.locator('input.oreder_counter_block').first();
      
      // בודקים אם שדה הכמות כבר גלוי (אומר שהמוצר בסל)
      const alreadyInCart = await qtyInput.isVisible();
      
      if (!alreadyInCart) {
        // לחיצה על כפתור "הוסף לסל" (לפי ה-HTML שהבאת)
        const addBtn = exactCard.locator('.container_add_order').first();
        await addBtn.click();
        console.log('      ➕ "הוסף לסל" נלחץ');
        
        // המתנה ששדה הכמות יופיע
        await qtyInput.waitFor({ state: 'visible', timeout: 5000 });
      } else {
        console.log('      ℹ️  כבר בסל – מעדכן כמות');
      }

      // הגדרת כמות מדויקת
      await qtyInput.click({ clickCount: 3 });
      await qtyInput.fill(String(item.quantity));
      await page.keyboard.press('Tab');
      await page.waitForTimeout(500);
      console.log(`      ✅ כמות: ${item.quantity}`);
    }

    console.log('\n   ✅ כל הפריטים הוכנסו');

    // ================================================
    // שלב 5: חזרה לסל הקניות (עגלה)
    // ================================================
    console.log('🛒 שלב 5/6 — מעבר לסל הקניות...');

    // לחצן העגלה עם תמונת הסופרמרקט לפי ה-HTML שלך
    const cartBtn = page.locator('button.icon').filter({ has: page.locator('img[src*="supermarket-amit.svg"]') }).first();
    await cartBtn.waitFor({ state: 'visible', timeout: 15000 });
    await cartBtn.click();
    
    await page.waitForTimeout(3000);
    console.log('   ✅ נכנסנו לסל הקניות');

    // ================================================
    // שלב 6: ספירה לאחור ← שדר הזמנה
    // ================================================
    console.log('\n' + '='.repeat(52));
    console.log('🚀 שלב 6/6 — שיגור הזמנה');
    console.log('='.repeat(52));
    order.items.forEach(it => {
      console.log(`   • ${it.name} (${it.sku}) × ${it.quantity}`);
    });
    console.log(`\n📅 תאריך: ${targetDate}`);

    await countdown(10, '🔴 שודר בעוד');

    // כפתור שידור הזמנה לפי ה-HTML שלך
    const sendOrderBtn = page.locator('div.box_option', { hasText: 'שדר הזמנה' }).first();
    await sendOrderBtn.waitFor({ state: 'visible', timeout: 15000 });
    await sendOrderBtn.click();
    
    // המתנה להופעת הודעת ההצלחה
    await page.waitForTimeout(4000);

    // יצירת תיקיית צילומי מסך אם לא קיימת
    const fs = require('fs');
    const path = require('path');
    const screenshotsDir = path.join(__dirname, '..', 'screenshots');
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }

    const orderId = order.id || 'test';
    const screenshotPath = path.join(screenshotsDir, `order_${orderId}.png`);
    await page.screenshot({ path: screenshotPath });
    console.log(`📸 צילום מסך של אישור ההזמנה נשמר בכתובת: ${screenshotPath}`);

    await page.waitForTimeout(2000);

    console.log('\n' + '='.repeat(52));
    console.log('✅  ההזמנה שודרה בהצלחה לברמן! 🎉');
    console.log('='.repeat(52) + '\n');

    console.log('הדפדפן נסגר לאחר הצלחה.');
    await browser.close();
    return { success: true, message: 'ההזמנה שודרה בהצלחה!' };

  } catch (err) {
    console.error('\n❌ שגיאה:', err.message);
    if (browser) {
       await browser.close();
    }
    throw err;
  }
}

module.exports = { executeBermanOrder };

// ==============================
// אפשרות הרצה ישירה מהטרמינל (טסטים)
// ==============================
if (require.main === module) {
  const fs = require('fs');
  const filePath = process.argv[2];
  if (!filePath || !fs.existsSync(filePath)) {
    console.error('❌ שימוש: node berman-order.js <order.json>');
    process.exit(1);
  }
  
  const orderData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  // פרטי התחברות קשיחים רק לצורך הטסט מהטרמינל
  const testCredentials = { username: '23987', password: 'bikurim2023' };
  
  console.log('🔄 מריץ טסט ישיר מהטרמינל...');
  executeBermanOrder(orderData, testCredentials)
    .then(() => console.log('✅ הבדיקה הסתיימה'))
    .catch(err => console.error('❌ שגיאה בבדיקה:', err));
}
