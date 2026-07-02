// Default Database Seed Data (used for initialization)
const DEFAULT_VENDORS = [
  {
    "id": "v_berman",
    "name": "ברמן",
    "category": "bakery",
    "type": "website",
    "email": "",
    "websiteUrl": "https://bermanapp.co.il/#/",
    "username": "23987",
    "password": "bikurim2023",
    "emailTemplate": "",
    "correctionTemplate": "",
    "catalog": [
      { "name": "ברמן אסלי 5 פיתות", "unit": "יחידות", "sku": "238" },
      { "name": "לחם רוסי", "unit": "יחידות", "sku": "1194" }
    ]
  },
  {
    "id": "v_einbar",
    "name": "עין-בר",
    "category": "bakery",
    "type": "website",
    "email": "",
    "websiteUrl": "https://ein-bar.co.il/login",
    "username": "einbar_user",
    "password": "PasswordEinbar2",
    "emailTemplate": "",
    "correctionTemplate": "",
    "catalog": [
      { "name": "לחם כפרי כהה", "unit": "יחידות" },
      { "name": "לחם דגנים קל", "unit": "יחידות" },
      { "name": "לחמניות אצבע", "unit": "יחידות" },
      { "name": "פיתות כוסמין", "unit": "ארגזים" }
    ]
  },
  {
    "id": "v_bikurim",
    "name": "מאפיית ביכורים",
    "category": "bakery",
    "type": "email",
    "email": "orders@bikurim-bakery.co.il",
    "websiteUrl": "",
    "username": "",
    "password": "",
    "emailTemplate": "שלום לצוות ביכורים,\nאנא ספקו עבורנו את הלחמים הבאים לתאריך {{date}}:\n\n{{items}}\n\nבברכה,\nמחלקת הזמנות",
    "correctionTemplate": "שלום לצוות ביכורים,\nבוצע תיקון כמויות להזמנה של תאריך {{date}}:\n\nהשינויים:\n{{changes}}\n\nהרשימה המעודכנת:\n{{items}}",
    "catalog": [
      { "name": "לחם כוסמין 100%", "unit": "יחידות" },
      { "name": "לחם מחמצת שיפון", "unit": "יחידות" },
      { "name": "קרקרים כוסמין", "unit": "ארגזים" }
    ]
  },
  {
    "id": "v_ran",
    "name": "ראן",
    "category": "vegetables",
    "type": "website",
    "email": "",
    "websiteUrl": "http://www.ranfp.com/index.php?dir=site&page=members&op=enter",
    "username": "b0527616223@gmail.com",
    "password": "RanPasswordPlaceholder",
    "emailTemplate": "",
    "correctionTemplate": "",
    "catalog": [
      { "name": "ירק אישי 80 גר' בד\"ץ (80 יחידות בארגז)", "unit": "ארגזים", "sku": "5018" },
      { "name": "ירק אישי 80 גר שארית ישראל (80 יחידות בארגז)", "unit": "ארגזים", "sku": "5081" },
      { "name": "ירק אישי 80 גר' רגיל (80 יחידות בארגז)", "unit": "ארגזים", "sku": "5138" },
      { "name": "ירק אישי 100 גר' רגיל (70 יחידות בארגז)", "unit": "ארגזים", "sku": "5021" },
      { "name": "ירק אישי 100 גר' בד\"ץ (70 יחידות בארגז)", "unit": "ארגזים", "sku": "5135" },
      { "name": "ירק אישי 100 גר שארית ישראל (70 יחידות)", "unit": "ארגזים", "sku": "5132" },
      { "name": "ירק אישי 100 גר' לנדא (70 יחידות בארגז)", "unit": "ארגזים", "sku": "5165" },
      { "name": "ירק גנים 500 גרם בד\"ץ (16 יחידות בארגז)", "unit": "ארגזים", "sku": "5150" },
      { "name": "ירק גנים 500 גרם רגיל (16 יחידות בארגז)", "unit": "ארגזים", "sku": "5156" },
      { "name": "ירק גנים 500 גרם שארית ישראל (16 יחידות)", "unit": "ארגזים", "sku": "5159" },
      { "name": "ירק גנים 500 גרם לנדא (16 יחידות בארגז)", "unit": "ארגזים", "sku": "5180" },
      { "name": "ירק גנים 400 גרם רגיל (16 יחידות בארגז)", "unit": "ארגזים", "sku": "5027" },
      { "name": "ירק גנים 400 גרם בד\"ץ (16 יחידות בארגז)", "unit": "ארגזים", "sku": "5024" },
      { "name": "ירק גנים 400 גרם שארית ישראל (16 יחידות)", "unit": "ארגזים", "sku": "5084" },
      { "name": "ירק גנים 400 גרם לנדא (16 יחידות בארגז)", "unit": "ארגזים", "sku": "5168" },
      { "name": "ירק גנים 1 ק\"ג בד\"ץ (10 יחידות בארגז)", "unit": "ארגזים", "sku": "5141" },
      { "name": "ירק גנים 1 ק\"ג רגיל (10 יחידות בארגז)", "unit": "ארגזים", "sku": "5144" },
      { "name": "ירק גנים 1 ק\"ג שארית ישראל (10 יחידות)", "unit": "ארגזים", "sku": "5147" },
      { "name": "ירק גנים 1 ק\"ג לנדא (10 יחידות בארגז)", "unit": "ארגזים", "sku": "5183" },
      { "name": "ירק גנים 800 גרם בד\"ץ (10 יחידות בארגז)", "unit": "ארגזים", "sku": "5030" },
      { "name": "ירק גנים 800 גרם רגיל (10 יחידות בארגז)", "unit": "ארגזים", "sku": "5033" },
      { "name": "ירק גנים 800 גרם לנדא (10 יחידות בארגז)", "unit": "ארגזים", "sku": "5171" },
      { "name": "ירק גנים 800 גרם שארית ישראל (10 יחידות)", "unit": "ארגזים", "sku": "5087" }
    ]
  },
  {
    "id": "v_yanki",
    "name": "יענקי פרידמן",
    "category": "vegetables",
    "type": "email",
    "email": "yanki.friedman@gmail.com",
    "websiteUrl": "",
    "username": "",
    "password": "",
    "emailTemplate": "שלום יענקי,\nלהלן ההזמנה לתאריך {{date}}:\n\n{{items}}\n\nתודה,\nהזמנות",
    "correctionTemplate": "שלום יענקי,\nנא לעדכן את הכמויות הבאות להזמנה של {{date}}:\n\nהפרשים:\n{{changes}}\n\nסך הכל פריטים להזמנה:\n{{items}}",
    "catalog": [
      { "name": "בצל יבש", "unit": "שק" },
      { "name": "תפוחי אדמה", "unit": "שק" },
      { "name": "גזר ארוז", "unit": "ק\"ג" },
      { "name": "לימונים", "unit": "ק\"ג" }
    ]
  },
  {
    "id": "v_yosef",
    "name": "יוסף חומרי גלם",
    "category": "raw_materials",
    "type": "email",
    "email": "yosef@rawmaterials.co.il",
    "websiteUrl": "",
    "username": "",
    "password": "",
    "emailTemplate": "שלום יוסף,\nאנא ספק לנו את חומרי הגלם הבאים לתאריך {{date}}:\n\n{{items}}\n\nתודה,\nמנהל מחסן",
    "correctionTemplate": "שלום יוסף,\nבוצע תיקון כמויות להזמנת הגלם לתאריך {{date}}:\n\nשינויים:\n{{changes}}\n\nרשימה מלאה מעודכנת:\n{{items}}",
    "catalog": [
      { "name": "קמח לבן", "unit": "שק 25 ק\"ג" },
      { "name": "סוכר לבן", "unit": "שק 50 ק\"ג" },
      { "name": "שמן קנולה", "unit": "פח 10 ליטר" },
      { "name": "שמרים יבשים", "unit": "חבילה 500 גרם" }
    ]
  }
];

const DEFAULT_ORDERS = [
  {
    "id": "o_yanki_1",
    "date": "2026-06-24",
    "vendorId": "v_yanki",
    "vendorName": "יענקי פרידמן",
    "category": "vegetables",
    "status": "completed",
    "items": [
      { "name": "בצל יבש", "quantity": 5, "unit": "שק" },
      { "name": "תפוחי אדמה", "quantity": 10, "unit": "שק" }
    ],
    "dispatchedItems": [
      { "name": "בצל יבש", "quantity": 5, "unit": "שק" },
      { "name": "תפוחי אדמה", "quantity": 10, "unit": "שק" }
    ],
    "actionsLog": [
      { "timestamp": "2026-06-24T08:00:00.000Z", "action": "הזמנה נוצרה כטיוטה" },
      { "timestamp": "2026-06-24T08:10:00.000Z", "action": "נשלח מייל בהצלחה לכתובת yanki.friedman@gmail.com" }
    ]
  },
  {
    "id": "o_berman_1",
    "date": "2026-06-24",
    "vendorId": "v_berman",
    "vendorName": "ברמן",
    "category": "bakery",
    "status": "pending_approval",
    "items": [
      { "name": "לחם אחיד פרוס", "quantity": 50, "unit": "יחידות" },
      { "name": "חלות שבת", "quantity": 20, "unit": "יחידות" }
    ],
    "actionsLog": [
      { "timestamp": "2026-06-24T08:15:00.000Z", "action": "הזמנה נוצרה וממתינה לאישור" }
    ]
  }
];

// --- Local Storage Database Helper ---
function getLocalDB() {
  let data = localStorage.getItem('order_automation_db');
  if (!data) {
    const initialData = { vendors: DEFAULT_VENDORS, orders: DEFAULT_ORDERS };
    localStorage.setItem('order_automation_db', JSON.stringify(initialData));
    return initialData;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return { vendors: DEFAULT_VENDORS, orders: DEFAULT_ORDERS };
  }
}

function writeLocalDB(data) {
  localStorage.setItem('order_automation_db', JSON.stringify(data));
}

// --- Firebase Initialization (if configured) ---
let firebaseDb = null;
let firebaseAuth = null;
let isFirebaseConnected = false;
let currentUserRole = 'viewer'; // default fallback

let fbConfigStr = localStorage.getItem('firebase_config');
const targetProjectId = "orderautomation-a1c02";
let needOverwrite = false;

if (!fbConfigStr) {
  needOverwrite = true;
} else {
  try {
    const parsed = JSON.parse(fbConfigStr);
    if (!parsed || parsed.projectId !== targetProjectId) {
      needOverwrite = true;
    }
  } catch (e) {
    needOverwrite = true;
  }
}

if (needOverwrite) {
  fbConfigStr = JSON.stringify({
    apiKey: "AIzaSyBBEJleoC42NKahdCcApQGrmx385JU5PPs",
    authDomain: "orderautomation-a1c02.firebaseapp.com",
    projectId: "orderautomation-a1c02",
    storageBucket: "orderautomation-a1c02.firebasestorage.app",
    messagingSenderId: "990225381229",
    appId: "1:990225381229:web:3d68ae83eccdc827d54c64",
    measurementId: "G-SHC24WS44T"
  });
  localStorage.setItem('firebase_config', fbConfigStr);
}

try {
  const firebaseConfig = JSON.parse(fbConfigStr);
  if (typeof firebase !== 'undefined') {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    firebaseDb = firebase.firestore();
    firebaseAuth = firebase.auth();
    isFirebaseConnected = true;
    console.log('Connected to Firebase Firestore & Auth successfully.');
    
    // Auth Listener
    firebaseAuth.onAuthStateChanged(handleAuthStateChange);
  }
} catch (error) {
  console.error('Failed to initialize Firebase client:', error);
}

// --- Database Operations Adapter ---
const dbOps = {
  getDbType: () => isFirebaseConnected ? 'firebase' : 'local',

  // Vendors CRUD
  getVendors: async () => {
    if (isFirebaseConnected && firebaseDb) {
      try {
        const snapshot = await firebaseDb.collection('vendors').get();
        const firebaseVendors = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // Self-healing: Re-create any missing default vendor or update if catalog length changed
        let updated = false;
        
        for (const localV of DEFAULT_VENDORS) {
          const fbV = firebaseVendors.find(v => v.id === localV.id);
          // Re-create if missing, or update if catalog size is different (meaning it's the old mock catalog!)
          if (!fbV || (localV.id === 'v_ran' && (!fbV.catalog || fbV.catalog.length !== localV.catalog.length))) {
            const copy = { ...localV };
            delete copy.id;
            await firebaseDb.collection('vendors').doc(localV.id).set(copy);
            updated = true;
          }
        }
        
        if (updated) {
          const newSnapshot = await firebaseDb.collection('vendors').get();
          return newSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        }
        
        return firebaseVendors;
      } catch (err) {
        console.error("Firebase getVendors error, falling back to local:", err);
      }
    }
    return getLocalDB().vendors;
  },

  saveVendor: async (vendor) => {
    if (isFirebaseConnected && firebaseDb) {
      try {
        const id = vendor.id || 'v_' + Date.now();
        vendor.id = id;
        const dataToSave = { ...vendor };
        delete dataToSave.id;
        await firebaseDb.collection('vendors').doc(id).set(dataToSave, { merge: true });
        return vendor;
      } catch (err) {
        console.error("Firebase saveVendor error, falling back to local:", err);
      }
    }
    const localData = getLocalDB();
    if (!vendor.id) {
      vendor.id = 'v_' + Date.now();
      localData.vendors.push(vendor);
    } else {
      const idx = localData.vendors.findIndex(v => v.id === vendor.id);
      if (idx !== -1) {
        localData.vendors[idx] = vendor;
      } else {
        localData.vendors.push(vendor);
      }
    }
    writeLocalDB(localData);
    return vendor;
  },

  deleteVendor: async (vendorId) => {
    if (isFirebaseConnected && firebaseDb) {
      try {
        await firebaseDb.collection('vendors').doc(vendorId).delete();
      } catch (err) {
        console.error("Firebase deleteVendor error, falling back to local:", err);
      }
    }
    const localData = getLocalDB();
    localData.vendors = localData.vendors.filter(v => v.id !== vendorId);
    writeLocalDB(localData);
  },

  // Orders CRUD
  getOrders: async (date) => {
    let firebaseOrders = [];
    if (isFirebaseConnected && firebaseDb) {
      try {
        let query = firebaseDb.collection('orders');
        if (date) {
          query = query.where('date', '==', date);
        }
        const snapshot = await query.get();
        firebaseOrders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (err) {
        console.error("Firebase getOrders error:", err);
      }
    }
    
    // Fetch local orders
    const localData = getLocalDB();
    const localOrders = date 
      ? localData.orders.filter(o => o.date === date)
      : localData.orders;
      
    // Merge: Keep all Firebase orders, add local orders only if their ID doesn't exist in Firebase
    const mergedOrders = [...firebaseOrders];
    localOrders.forEach(lo => {
      if (!mergedOrders.some(fo => fo.id === lo.id)) {
        mergedOrders.push(lo);
      }
    });
    
    return mergedOrders;
  },

  saveOrder: async (order) => {
    if (isFirebaseConnected && firebaseDb) {
      try {
        const id = order.id || 'o_' + Date.now();
        order.id = id;
        const dataToSave = { ...order };
        delete dataToSave.id;
        await firebaseDb.collection('orders').doc(id).set(dataToSave, { merge: true });
        return order;
      } catch (err) {
        console.error("Firebase saveOrder error, falling back to local:", err);
      }
    }
    const localData = getLocalDB();
    if (!order.id) {
      order.id = 'o_' + Date.now();
      localData.orders.push(order);
    } else {
      const idx = localData.orders.findIndex(o => o.id === order.id);
      if (idx !== -1) {
        localData.orders[idx] = order;
      } else {
        localData.orders.push(order);
      }
    }
    writeLocalDB(localData);
    return order;
  },

  deleteOrder: async (orderId) => {
    if (isFirebaseConnected && firebaseDb) {
      try {
        await firebaseDb.collection('orders').doc(orderId).delete();
      } catch (err) {
        console.error("Firebase deleteOrder error, falling back to local:", err);
      }
    }
    const localData = getLocalDB();
    localData.orders = localData.orders.filter(o => o.id !== orderId);
    writeLocalDB(localData);
  }
};

// --- Order Diff & Formatter Logic (Ported from server.js) ---
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

// Generate Action Preview client-side
async function prepareActionPayload(orderId) {
  const ordersList = await dbOps.getOrders();
  const order = ordersList.find(o => o.id === orderId);
  if (!order) throw new Error('ההזמנה לא נמצאה: ' + orderId + ', הזמנות זמינות במערכת: ' + ordersList.map(o => o.id + ' (' + o.vendorName + ')').join(', '));

  const vendorsList = await dbOps.getVendors();
  const vendor = vendorsList.find(v => v.id === order.vendorId);
  if (!vendor) throw new Error('הספק לא נמצא');

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

  return actionPayload;
}

// Dispatch Action client-side
async function executeDispatchPayload(orderId) {
  const ordersList = await dbOps.getOrders();
  const order = ordersList.find(o => o.id === orderId);
  if (!order) throw new Error('ההזמנה לא נמצאה');

  const vendorsList = await dbOps.getVendors();
  const vendor = vendorsList.find(v => v.id === order.vendorId);
  if (!vendor) throw new Error('הספק לא נמצא');

  const timestamp = new Date().toISOString();
  let logMessage = '';

  if (vendor.type === 'email') {
    try {
      const emailPayload = await prepareActionPayload(orderId);
      const response = await fetch('http://localhost:3000/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: emailPayload.emailDetails.to,
          subject: emailPayload.emailDetails.subject,
          body: emailPayload.emailDetails.body
        })
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.error || 'שגיאה בשליחת המייל מהשרת המקומי');
      }
      logMessage = `נשלח מייל בהצלחה לכתובת ${vendor.email}`;
      if (order.dispatchedItems) {
        logMessage = `נשלח מייל תיקון בהצלחה לכתובת ${vendor.email}`;
      }
      order.status = order.dispatchedItems ? 'correction_sent' : 'completed';
    } catch (err) {
      throw new Error('שליחת המייל נכשלה: ' + err.message);
    }
  } else if (vendor.type === 'website') {
    if (vendor.id === 'v_berman' || vendor.id === 'v_ran') {
      try {
        const response = await fetch('http://localhost:3000/api/dispatch', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            vendorId: vendor.id,
            credentials: { username: vendor.username, password: vendor.password },
            orderData: order
          })
        });
        const result = await response.json();
        if (!response.ok || !result.success) {
          throw new Error(result.error || 'שגיאה בביצוע האוטומציה דרך השרת');
        }
        logMessage = `בוצעה אוטומציה בהצלחה באתר ${vendor.websiteUrl}: ${result.message || ''}`;
        order.status = 'completed';
      } catch (err) {
        throw new Error('האוטומציה נכשלה: ' + err.message);
      }
    } else {
      logMessage = `סימולציית אוטומציה (דמו) באתר ${vendor.websiteUrl} (הספק לא נתמך במלואו עדיין)`;
      order.status = 'completed';
    }
  }

  order.dispatchedItems = JSON.parse(JSON.stringify(order.items));

  if (!order.actionsLog) order.actionsLog = [];
  order.actionsLog.push({
    timestamp: timestamp,
    action: logMessage
  });

  const saved = await dbOps.saveOrder(order);
  return {
    success: true,
    log: logMessage,
    order: saved
  };
}

// --- Global UI State ---
let vendors = [];
let orders = [];
let selectedDate = '';
let currentActiveOrderId = null;
let currentCategoryFilter = 'all';
let currentVendorCategoryFilter = 'all';
let lastSubmitType = 'dispatch';

// DOM Elements
const dbStatus = document.getElementById('db-status');
const dbStatusText = document.getElementById('db-status-text');
const datePicker = document.getElementById('order-date-picker');
const ordersListContainer = document.getElementById('orders-list-container');
const activityLogContainer = document.getElementById('activity-log-container');
const vendorsGridContainer = document.getElementById('vendors-grid-container');

// Navigation Buttons
const btnDashboard = document.getElementById('btn-dashboard');
const btnOrders = document.getElementById('btn-orders');
const btnVendors = document.getElementById('btn-vendors');
const btnDeveloper = document.getElementById('btn-developer');
const viewDashboard = document.getElementById('view-dashboard');
const viewOrders = document.getElementById('view-orders');
const viewVendors = document.getElementById('view-vendors');
const viewDeveloper = document.getElementById('view-developer');

// Modal Elements
const modalOrder = document.getElementById('modal-order');
const modalVendor = document.getElementById('modal-vendor');
const modalSafetyConfirm = document.getElementById('modal-safety-confirm');
const orderModalTitle = document.getElementById('order-modal-title');
const vendorModalTitle = document.getElementById('vendor-modal-title');

const btnAddVendorModal = document.getElementById('btn-add-vendor-modal');

// Close buttons
const btnCloseOrderModal = document.getElementById('btn-close-order-modal');
const btnCloseVendorModal = document.getElementById('btn-close-vendor-modal');
const btnCloseSafetyModal = document.getElementById('btn-close-safety-modal');

// Forms & Inputs
const orderForm = document.getElementById('order-form');
const orderIdInput = document.getElementById('order-id-input');
const orderItemsListContainer = document.getElementById('order-items-list-container');
const btnAddItemRow = document.getElementById('btn-add-item-row');

const vendorForm = document.getElementById('vendor-form');
const vendorIdInput = document.getElementById('vendor-id-input');
const vendorNameInput = document.getElementById('vendor-name-input');
const vendorTypeSelect = document.getElementById('vendor-type-select');
const vendorEmailOptions = document.getElementById('vendor-email-options');
const vendorWebsiteOptions = document.getElementById('vendor-website-options');

const vendorEmailInput = document.getElementById('vendor-email-input');
const vendorEmailTemplate = document.getElementById('vendor-email-template');
const vendorCorrectionTemplate = document.getElementById('vendor-correction-template');
const vendorWebsiteUrl = document.getElementById('vendor-website-url');
const vendorUsername = document.getElementById('vendor-username');
const vendorPassword = document.getElementById('vendor-password');

// Safety Modal Elements
const safetyEmailDetails = document.getElementById('safety-email-details');
const previewEmailTo = document.getElementById('preview-email-to');
const previewEmailSubject = document.getElementById('preview-email-subject');
const previewEmailBody = document.getElementById('preview-email-body');

const safetyWebsiteDetails = document.getElementById('safety-website-details');
const previewWebUrl = document.getElementById('preview-web-url');
const previewWebAuth = document.getElementById('preview-web-auth');
const previewWebSteps = document.getElementById('preview-web-steps');

const btnConfirmSafetyDispatch = document.getElementById('btn-confirm-safety-dispatch');
const btnCancelSafety = document.getElementById('btn-cancel-safety');

// Cloud Connection Form Elements
const btnCloudSettings = document.getElementById('btn-cloud-settings');
const modalCloudSettings = document.getElementById('modal-cloud-settings');
const btnCloseCloudModal = document.getElementById('btn-close-cloud-modal');
const cloudSettingsForm = document.getElementById('cloud-settings-form');
const cloudConfigInput = document.getElementById('cloud-config-input');
const btnClearCloud = document.getElementById('btn-clear-cloud');

// Data Management Elements
const btnDataManagement = document.getElementById('btn-data-management');
const modalDataManagement = document.getElementById('modal-data-management');
const btnCloseDataModal = document.getElementById('btn-close-data-modal');
const btnExportDb = document.getElementById('btn-export-db');
const btnTriggerImport = document.getElementById('btn-trigger-import');
const inputImportDb = document.getElementById('input-import-db');
const btnResetSeed = document.getElementById('btn-reset-seed');

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
  setupDatePicker();
  checkDbStatus();
  refreshAllData();
  setupEventListeners();
});

// Setup Date Picker to local today
function setupDatePicker() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  selectedDate = `${year}-${month}-${day}`;
  datePicker.value = selectedDate;

  // Make the entire input clickable to show the native calendar picker (works in modern browsers)
  datePicker.addEventListener('click', function() {
    if (typeof this.showPicker === 'function') {
      try {
        this.showPicker();
      } catch(e) {}
    }
  });
}

function formatDateHebrew(dateStr) {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

function checkDbStatus() {
  const type = dbOps.getDbType();
  if (type === 'firebase') {
    dbStatus.classList.add('connected');
    dbStatusText.textContent = 'מחובר ל-Firebase Cloud';
  } else {
    dbStatus.classList.remove('connected');
    dbStatusText.textContent = 'מצב מקומי (localStorage)';
  }
}

async function refreshAllData() {
  try {
    vendors = await dbOps.getVendors();
    orders = await dbOps.getOrders(selectedDate);
    renderVendors();
    renderOrders();
    renderActivityLogs();
    renderDashboardStats();
    renderDailySummaryTable();
  } catch (err) {
    console.error('Error refreshing data:', err);
  }
}

// --- Dashboard Stats & Daily Summary Table ---
function renderDashboardStats() {
  const totalVendors = vendors.length;
  
  // Completed orders today
  const completedOrders = orders.filter(o => o.status === 'completed' || o.status === 'correction_sent').length;
  
  // Pending orders today
  const pendingOrders = orders.filter(o => o.status === 'pending_approval').length;
  
  // Total items quantity ordered today
  let totalItemsCount = 0;
  orders.forEach(order => {
    order.items.forEach(item => {
      totalItemsCount += (item.quantity || 0);
    });
  });
  
  const statsVendors = document.getElementById('stats-total-vendors');
  const statsCompleted = document.getElementById('stats-completed-orders');
  const statsPending = document.getElementById('stats-pending-orders');
  const statsItems = document.getElementById('stats-total-items');
  
  if (statsVendors) statsVendors.textContent = totalVendors;
  if (statsCompleted) statsCompleted.textContent = completedOrders;
  if (statsPending) statsPending.textContent = pendingOrders;
  if (statsItems) statsItems.textContent = totalItemsCount;
}

function renderDailySummaryTable() {
  const tbody = document.getElementById('daily-summary-tbody');
  if (!tbody) return;
  
  tbody.innerHTML = '';
  
  if (vendors.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" style="text-align: center; padding: 20px;">אין ספקים מוגדרים במערכת.</td></tr>';
    return;
  }
  
  vendors.forEach(vendor => {
    const order = orders.find(o => o.vendorId === vendor.id);
    const tr = document.createElement('tr');
    tr.style.borderBottom = '1px solid var(--border-color)';
    
    let statusBadgeHTML = '<span class="badge badge-no-order">לא הוזמן</span>';
    let totalItems = 0;
    let itemsPreview = '---';
    
    if (order) {
      const badgeClass = `badge-${order.status}`;
      let badgeText = '';
      switch (order.status) {
        case 'draft': badgeText = 'טיוטה'; break;
        case 'pending_approval': badgeText = 'ממתין לאישור'; break;
        case 'completed': badgeText = 'בוצע בהצלחה'; break;
        case 'correction_sent': badgeText = 'נשלח תיקון'; break;
      }
      statusBadgeHTML = `<span class="badge ${badgeClass}"><span class="status-dot"></span> ${badgeText}</span>`;
      
      // Calculate total items
      order.items.forEach(i => { totalItems += (i.quantity || 0); });
      
      // Items preview
      itemsPreview = order.items.map(i => `${i.name}: ${i.quantity} ${i.unit || ''}`).join(', ');
    }
    
    tr.innerHTML = `
      <td style="padding: 12px 10px; font-weight: 500; color: #fff;">${vendor.name}</td>
      <td style="padding: 12px 10px;">${statusBadgeHTML}</td>
      <td style="padding: 12px 10px; color: var(--text-secondary);">${totalItems || '---'}</td>
      <td style="padding: 12px 10px; color: var(--text-secondary); max-width: 300px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${itemsPreview}">${itemsPreview}</td>
    `;
    tbody.appendChild(tr);
  });
}

// UI Rendering
function renderOrders() {
  ordersListContainer.innerHTML = '';
  
  const categories = {
    bakery: { name: 'מאפים', icon: 'fa-bread-slice', vendors: [] },
    vegetables: { name: 'ירקות', icon: 'fa-carrot', vendors: [] },
    raw_materials: { name: 'חומרי גלם', icon: 'fa-boxes-stacked', vendors: [] }
  };

  vendors.forEach(v => {
    const cat = v.category || 'other';
    if (currentCategoryFilter === 'all' || cat === currentCategoryFilter) {
      if (!categories[cat]) {
        categories[cat] = { name: 'אחר', icon: 'fa-truck', vendors: [] };
      }
      categories[cat].vendors.push(v);
    }
  });

  let hasAnyContent = false;
  for (const [key, cat] of Object.entries(categories)) {
    if (cat.vendors.length === 0) continue;
    hasAnyContent = true;

    const section = document.createElement('div');
    section.className = 'dashboard-category-section';
    section.innerHTML = `<h3 class="category-section-title"><i class="fa-solid ${cat.icon}"></i> ${cat.name}</h3>`;

    const grid = document.createElement('div');
    grid.className = 'dashboard-vendor-cards-grid';

    cat.vendors.forEach(vendor => {
      const order = orders.find(o => o.vendorId === vendor.id);
      
      const card = document.createElement('div');
      card.className = `vendor-order-card ${order ? 'has-order' : 'no-order'}`;
      card.style.cursor = 'pointer';
      
      if (currentUserRole !== 'viewer') {
        card.addEventListener('click', () => {
          if (order) {
            openEditOrderModal(order.id);
          } else {
            openNewOrderForVendor(vendor.id);
          }
        });
      } else {
        card.style.cursor = 'default';
      }

      let statusBadge = '<span class="badge badge-no-order">לא הוזמן</span>';
      let itemsPreview = 'אין הזמנה לתאריך זה. לחץ כאן ליצירה...';
      let actionButtons = '';

      if (order) {
        const badgeClass = `badge-${order.status}`;
        let badgeText = '';
        switch (order.status) {
          case 'draft': badgeText = 'טיוטה'; break;
          case 'pending_approval': badgeText = 'ממתין לאישור'; break;
          case 'completed': badgeText = 'בוצע בהצלחה'; break;
          case 'correction_sent': badgeText = 'נשלח תיקון'; break;
        }
        statusBadge = `<span class="badge ${badgeClass}"><span class="status-dot"></span> ${badgeText}</span>`;
        
        itemsPreview = order.items.map(i => `${i.name}: ${i.quantity} ${i.unit || ''}`).join(', ');

        let dispatchBtnHTML = '';
        if (order.status === 'pending_approval') {
          dispatchBtnHTML = `
            <button class="btn btn-primary btn-sm" onclick="event.stopPropagation(); prepareDispatch('${order.id}')">
              <i class="fa-solid fa-paper-plane"></i> שגר
            </button>
          `;
        } else if (order.status === 'completed' || order.status === 'correction_sent') {
          let verifyBtnHTML = '';
          if (vendor.id === 'v_ran') {
            verifyBtnHTML = `
              <button class="btn btn-secondary btn-sm" style="color: var(--color-info); border-color: rgba(14,165,233,0.15);" onclick="event.stopPropagation(); verifyOrderOnDemand('${order.id}', this)">
                <i class="fa-solid fa-shield-halved"></i> אימות
              </button>
            `;
          }
          dispatchBtnHTML = `
            ${verifyBtnHTML}
            <button class="btn btn-secondary btn-sm" onclick="event.stopPropagation(); prepareDispatch('${order.id}')">
              <i class="fa-solid fa-rotate"></i> עדכן/תקן
            </button>
          `;
        }

        if (currentUserRole !== 'viewer') {
          actionButtons = `
            ${dispatchBtnHTML}
            <button class="btn btn-secondary btn-sm text-danger" style="color: var(--color-danger); border-color: rgba(239,68,68,0.15);" onclick="event.stopPropagation(); deleteOrder('${order.id}')">
              <i class="fa-solid fa-trash"></i>
            </button>
          `;
        }
      }

      card.innerHTML = `
        <div class="vendor-card-top">
          <span class="vendor-card-name">${vendor.name}</span>
          ${statusBadge}
        </div>
        <div class="vendor-card-middle">
          <p class="vendor-card-items-preview">${itemsPreview}</p>
        </div>
        ${order ? `<div class="vendor-card-bottom">${actionButtons}</div>` : ''}
      `;

      grid.appendChild(card);
    });

    section.appendChild(grid);
    ordersListContainer.appendChild(section);
  }

  if (!hasAnyContent) {
    ordersListContainer.innerHTML = `
      <div class="empty-state">
        <i class="fa-solid fa-folder-open"></i>
        <p>אין ספקים או קטגוריות להצגה.</p>
      </div>
    `;
  }
}

async function renderActivityLogs() {
  activityLogContainer.innerHTML = '';
  const allOrders = await dbOps.getOrders();
  
  const allLogs = [];
  allOrders.forEach(order => {
    if (order.actionsLog) {
      order.actionsLog.forEach(log => {
        allLogs.push({
          vendorName: order.vendorName,
          timestamp: new Date(log.timestamp),
          action: log.action
        });
      });
    }
  });

  allLogs.sort((a, b) => b.timestamp - a.timestamp);

  if (allLogs.length === 0) {
    activityLogContainer.innerHTML = `
      <div class="empty-state" style="padding: 20px 0;">
        <p style="font-size: 0.9rem;">אין פעילויות שתועדו.</p>
      </div>
    `;
    return;
  }

  allLogs.slice(0, 15).forEach(log => {
    const li = document.createElement('li');
    li.className = 'activity-log-item';
    const dateStr = log.timestamp.toLocaleDateString('he-IL', { day: '2-digit', month: '2-digit' });
    const timeStr = log.timestamp.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' });
    
    li.innerHTML = `
      <span class="log-content"><strong>${log.vendorName}</strong>: ${log.action}</span>
      <span class="log-time">${dateStr} ${timeStr}</span>
    `;
    activityLogContainer.appendChild(li);
  });
}

function renderVendors() {
  vendorsGridContainer.innerHTML = '';
  
  const filteredVendors = currentVendorCategoryFilter === 'all'
    ? vendors
    : vendors.filter(v => v.category === currentVendorCategoryFilter);

  if (filteredVendors.length === 0) {
    vendorsGridContainer.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <i class="fa-solid fa-truck-field"></i>
        <p>לא נמצאו ספקים בקטגוריה זו.</p>
      </div>
    `;
    return;
  }

  filteredVendors.forEach(v => {
    const card = document.createElement('div');
    card.className = 'vendor-card';

    const isEmail = v.type === 'email';
    const typeBadge = isEmail 
      ? '<span class="vendor-badge-type email"><i class="fa-regular fa-envelope"></i> אימייל</span>'
      : '<span class="vendor-badge-type website"><i class="fa-solid fa-globe"></i> אתר אינטרנט</span>';

    const detailsHTML = isEmail
      ? `<div><i class="fa-regular fa-envelope"></i> ${v.email}</div>`
      : `<div><i class="fa-solid fa-link"></i> <a href="${v.websiteUrl}" target="_blank" style="color: inherit; text-decoration: underline;">כנס לאתר</a></div>
         <div><i class="fa-regular fa-user"></i> שם משתמש: ${v.username}</div>`;

    card.innerHTML = `
      <div class="vendor-card-header">
        <span class="vendor-name">${v.name}</span>
        ${typeBadge}
      </div>
      <div class="vendor-details">
        ${detailsHTML}
      </div>
      <div class="button-group" style="margin-top: 10px; justify-content: flex-end;">
        <button class="btn btn-secondary btn-sm" onclick="openEditVendorModal('${v.id}')">
          <i class="fa-solid fa-pen"></i> ערוך ספק
        </button>
        <button class="btn btn-secondary btn-sm" style="color: var(--color-danger);" onclick="deleteVendor('${v.id}')">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `;

    vendorsGridContainer.appendChild(card);
  });
}

// --- Event Listeners ---
function setupEventListeners() {
  // Navigation
  const btnSystemAdmin = document.getElementById('btn-system-admin');
  const viewSystemAdmin = document.getElementById('view-system-admin');

  btnDashboard.addEventListener('click', () => {
    btnDashboard.classList.add('active');
    btnOrders.classList.remove('active');
    btnVendors.classList.remove('active');
    btnSystemAdmin.classList.remove('active');
    btnDeveloper.classList.remove('active');
    viewDashboard.classList.add('active');
    viewOrders.classList.remove('active');
    viewVendors.classList.remove('active');
    viewSystemAdmin.classList.remove('active');
    viewDeveloper.classList.remove('active');
  });

  btnOrders.addEventListener('click', () => {
    btnOrders.classList.add('active');
    btnDashboard.classList.remove('active');
    btnVendors.classList.remove('active');
    btnSystemAdmin.classList.remove('active');
    btnDeveloper.classList.remove('active');
    viewOrders.classList.add('active');
    viewDashboard.classList.remove('active');
    viewVendors.classList.remove('active');
    viewSystemAdmin.classList.remove('active');
    viewDeveloper.classList.remove('active');
  });

  btnVendors.addEventListener('click', () => {
    btnVendors.classList.add('active');
    btnDashboard.classList.remove('active');
    btnOrders.classList.remove('active');
    btnSystemAdmin.classList.remove('active');
    btnDeveloper.classList.remove('active');
    viewVendors.classList.add('active');
    viewDashboard.classList.remove('active');
    viewOrders.classList.remove('active');
    viewSystemAdmin.classList.remove('active');
    viewDeveloper.classList.remove('active');
  });

  btnSystemAdmin.addEventListener('click', () => {
    if (currentUserRole !== 'admin') return;
    btnSystemAdmin.classList.add('active');
    btnDashboard.classList.remove('active');
    btnOrders.classList.remove('active');
    btnVendors.classList.remove('active');
    btnDeveloper.classList.remove('active');
    viewSystemAdmin.classList.add('active');
    viewDashboard.classList.remove('active');
    viewOrders.classList.remove('active');
    viewVendors.classList.remove('active');
    viewDeveloper.classList.remove('active');
    loadAdminUsers();
  });

  btnDeveloper.addEventListener('click', () => {
    if (currentUserRole !== 'admin') return;
    btnDeveloper.classList.add('active');
    btnDashboard.classList.remove('active');
    btnOrders.classList.remove('active');
    btnVendors.classList.remove('active');
    btnSystemAdmin.classList.remove('active');
    viewDeveloper.classList.add('active');
    viewDashboard.classList.remove('active');
    viewOrders.classList.remove('active');
    viewVendors.classList.remove('active');
    viewSystemAdmin.classList.remove('active');
    loadDeveloperZone();
  });

  // Date picker change
  datePicker.addEventListener('change', (e) => {
    selectedDate = e.target.value;
    refreshAllData();
  });

  // Dashboard Filters
  const dbFilterBtns = document.querySelectorAll('#dashboard-filters .filter-btn');
  dbFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      dbFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategoryFilter = btn.getAttribute('data-category');
      renderOrders();
    });
  });

  // Vendor Filters
  const vendorFilterBtns = document.querySelectorAll('#vendor-filters .filter-btn');
  vendorFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      vendorFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentVendorCategoryFilter = btn.getAttribute('data-category');
      renderVendors();
    });
  });

  // Open/Close Modals
  btnAddVendorModal.addEventListener('click', () => openNewVendorModal());

  btnCloseOrderModal.addEventListener('click', () => modalOrder.classList.remove('active'));
  document.getElementById('btn-cancel-order').addEventListener('click', () => modalOrder.classList.remove('active'));

  btnCloseVendorModal.addEventListener('click', () => modalVendor.classList.remove('active'));
  document.getElementById('btn-cancel-vendor').addEventListener('click', () => modalVendor.classList.remove('active'));

  btnCloseSafetyModal.addEventListener('click', () => modalSafetyConfirm.classList.remove('active'));
  btnCancelSafety.addEventListener('click', () => modalSafetyConfirm.classList.remove('active'));

  vendorTypeSelect.addEventListener('change', (e) => toggleVendorTypeFields(e.target.value));
  btnAddItemRow.addEventListener('click', () => addItemRow());

  // Form Submissions
  document.getElementById('btn-save-draft').addEventListener('click', () => {
    lastSubmitType = 'draft';
  });
  document.getElementById('btn-save-and-dispatch').addEventListener('click', () => {
    lastSubmitType = 'dispatch';
  });

  orderForm.addEventListener('submit', handleOrderSubmit);
  vendorForm.addEventListener('submit', handleVendorSubmit);

  // Safety confirmation dispatch
  btnConfirmSafetyDispatch.addEventListener('click', executeDispatch);

  // Cloud Config Modals & actions
  btnCloudSettings.addEventListener('click', () => {
    const config = localStorage.getItem('firebase_config');
    cloudConfigInput.value = config ? config : '';
    modalCloudSettings.classList.add('active');
  });

  btnCloseCloudModal.addEventListener('click', () => {
    modalCloudSettings.classList.remove('active');
  });

  cloudSettingsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const configVal = cloudConfigInput.value.trim();
    if (!configVal) {
      alert('נא להזין קונפיגורציית Firebase תקנית.');
      return;
    }
    try {
      JSON.parse(configVal);
      localStorage.setItem('firebase_config', configVal);
      alert('הגדרות ענן נשמרו בהצלחה. האפליקציה תיטען מחדש כעת.');
      window.location.reload();
    } catch (err) {
      alert('קונפיגורציית Firebase אינה בפורמט JSON תקין. אנא בדוק והזן מחדש.');
    }
  });

  btnClearCloud.addEventListener('click', () => {
    if (confirm('האם לנתק את החיבור לענן ולחזור לעבודה מקומית (localStorage)?')) {
      localStorage.removeItem('firebase_config');
      alert('החיבור לענן נותק. האפליקציה תיטען מחדש כעת במצב מקומי.');
      window.location.reload();
    }
  });

  // Data & Backup Management Listeners
  btnDataManagement.addEventListener('click', () => {
    modalDataManagement.classList.add('active');
  });

  btnCloseDataModal.addEventListener('click', () => {
    modalDataManagement.classList.remove('active');
  });

  btnExportDb.addEventListener('click', () => {
    const dbData = getLocalDB();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dbData, null, 2));
    const downloadAnchor = document.createElement('a');
    const date = new Date().toISOString().split('T')[0];
    downloadAnchor.setAttribute("href",     dataStr);
    downloadAnchor.setAttribute("download", `order_safe_backup_${date}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  });

  btnTriggerImport.addEventListener('click', () => {
    inputImportDb.click();
  });

  inputImportDb.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(evt) {
      try {
        const parsed = JSON.parse(evt.target.result);
        if (parsed.vendors && parsed.orders) {
          if (confirm('האם אתה בטוח שברצונך לדרוס את כל הנתונים הנוכחיים ולשחזר מהקובץ הנבחר?')) {
            writeLocalDB(parsed);
            alert('הנתונים שוחזרו בהצלחה! האפליקציה תיטען מחדש כעת.');
            window.location.reload();
          }
        } else {
          alert('קובץ הגיבוי אינו תקין (חסרים שדות ספקים או הזמנות).');
        }
      } catch(err) {
        alert('שגיאה בקריאת קובץ הגיבוי. ודא שזהו קובץ JSON תקין.');
      }
    };
    reader.readAsText(file);
  });

  btnResetSeed.addEventListener('click', () => {
    if (confirm('אזהרה: פעולה זו תמחוק את כל השינויים וההזמנות שביצעת ותחזיר את המערכת למצב ברירת המחדל (הספקים והמוצרים המקוריים). האם להמשיך?')) {
      localStorage.removeItem('order_automation_db');
      alert('המערכת אותחלה בהצלחה לנתוני ברירת המחדל! האפליקציה תיטען מחדש כעת.');
      window.location.reload();
    }
  });
}

// Order Modal Logic
function openEditOrderModal(orderId) {
  const order = orders.find(o => o.id === orderId);
  if (!order) return;

  const bermanErr = validateBermanRules(order.vendorId, true);
  if (bermanErr) { alert(bermanErr); return; }

  orderModalTitle.textContent = `עריכת הזמנה - ${order.vendorName}`;
  orderIdInput.value = order.id;
  document.getElementById('order-vendor-id-input').value = order.vendorId;
  
  loadVendorCatalog(order.vendorId, order.items);

  orderItemsListContainer.innerHTML = '';
  const vendor = vendors.find(v => v.id === order.vendorId);
  const catalogNames = vendor && vendor.catalog ? vendor.catalog.map(c => c.name) : [];
  
  const customItems = order.items.filter(i => !catalogNames.includes(i.name));
  if (customItems.length > 0) {
    customItems.forEach(item => {
      addItemRow(item.name, item.quantity, item.unit);
    });
  }
  
  
  updateBermanModalUI(order.vendorId);
  modalOrder.classList.add('active');
}

function openNewOrderForVendor(vendorId) {
  const vendor = vendors.find(v => v.id === vendorId);
  if (!vendor) return;

  const bermanErr = validateBermanRules(vendorId, true);
  if (bermanErr) { alert(bermanErr); return; }

  orderModalTitle.textContent = `הזמנה חדשה - ${vendor.name}`;
  orderIdInput.value = '';
  orderForm.reset();
  document.getElementById('order-vendor-id-input').value = vendor.id;
  
  loadVendorCatalog(vendor.id);
  orderItemsListContainer.innerHTML = '';
  
  updateBermanModalUI(vendor.id);
  modalOrder.classList.add('active');
}

function addItemRow(name = '', quantity = 1, unit = 'ק"ג') {
  const row = document.createElement('div');
  row.className = 'item-row form-group';
  row.style.padding = '0';
  row.style.marginBottom = '8px';

  row.innerHTML = `
    <input type="text" class="form-control item-name" placeholder="שם מוצר (עגבניות, לחמניות...)" value="${name}" required>
    <input type="number" class="form-control item-quantity" placeholder="כמות" min="0" step="any" value="${quantity}" required>
    <select class="form-control item-unit">
      <option value="ק\"ג" ${unit === 'ק"ג' ? 'selected' : ''}>ק"ג</option>
      <option value="יחידות" ${unit === 'יחידות' ? 'selected' : ''}>יחידות</option>
      <option value="ארגזים" ${unit === 'ארגזים' ? 'selected' : ''}>ארגזים</option>
      <option value="שק" ${unit === 'שק' ? 'selected' : ''}>שק</option>
    </select>
    <button type="button" class="btn btn-secondary btn-sm" style="color: var(--color-danger); height: 42px;" onclick="this.parentElement.remove()">
      <i class="fa-solid fa-trash"></i>
    </button>
  `;
  orderItemsListContainer.appendChild(row);
}

async function handleOrderSubmit(e) {
  e.preventDefault();
  
  const orderId = orderIdInput.value;
  const vendorId = document.getElementById('order-vendor-id-input').value;
  const vendor = vendors.find(v => v.id === vendorId);

  if (!vendorId) {
    alert('אנא בחר ספק (חברה) להזמנה');
    return;
  }

  const items = [];

  // 1. Predefined catalog items
  const catalogRows = document.querySelectorAll('.catalog-item-row');
  catalogRows.forEach(row => {
    const input = row.querySelector('.catalog-item-quantity');
    const val = input.value.trim();
    if (val !== '') {
      const quantity = parseFloat(val);
      if (!isNaN(quantity)) {
        const isValidQty = orderId ? (quantity >= 0) : (quantity > 0);
        if (isValidQty) {
          items.push({
            name: input.getAttribute('data-name'),
            quantity: quantity,
            unit: input.getAttribute('data-unit'),
            sku: input.getAttribute('data-sku') || undefined
          });
        }
      }
    }
  });

  // 2. Custom items
  const itemRows = orderItemsListContainer.querySelectorAll('.item-row');
  itemRows.forEach(row => {
    const nameInput = row.querySelector('.item-name');
    const name = nameInput ? nameInput.value.trim() : '';
    const quantityInput = row.querySelector('.item-quantity');
    const val = quantityInput ? quantityInput.value.trim() : '';
    const unitSelect = row.querySelector('.item-unit');
    const unit = unitSelect ? unitSelect.value : 'יחידות';
    
    if (name && val !== '') {
      const quantity = parseFloat(val);
      if (!isNaN(quantity)) {
        const isValidQty = orderId ? (quantity >= 0) : (quantity > 0);
        if (isValidQty) {
          items.push({ name, quantity, unit });
        }
      }
    }
  });

  if (items.length === 0 && !orderId) {
    alert('יש להזין כמות לפחות עבור מוצר אחד');
    return;
  }

  const bermanErr = validateBermanRules(vendorId, false, items, lastSubmitType === 'dispatch');
  if (bermanErr) {
    alert(bermanErr);
    return;
  }

  const existingOrder = orders.find(o => o.id === orderId);
  const targetStatus = (lastSubmitType === 'draft') ? 'draft' : 'pending_approval';

  const orderPayload = {
    id: orderId || undefined,
    date: selectedDate,
    vendorId,
    vendorName: vendor ? vendor.name : 'ספק לא ידוע',
    category: vendor ? vendor.category : 'other',
    items,
    status: targetStatus
  };

  if (existingOrder) {
    orderPayload.actionsLog = existingOrder.actionsLog || [];
    orderPayload.actionsLog.push({
      timestamp: new Date().toISOString(),
      action: lastSubmitType === 'draft' 
        ? 'בוצע עדכון כמויות בהזמנה (נשמר כטיוטה)' 
        : 'בוצע עדכון כמויות בהזמנה (ממתין לשיגור עדכון)'
    });
    if (existingOrder.dispatchedItems) {
      orderPayload.dispatchedItems = existingOrder.dispatchedItems;
    }
  } else {
    orderPayload.actionsLog = [{
      timestamp: new Date().toISOString(),
      action: lastSubmitType === 'draft' ? 'הזמנה נוצרה כטיוטה' : 'הזמנה נוצרה וממתינה לאישור'
    }];
  }

  try {
    const saved = await dbOps.saveOrder(orderPayload);
    modalOrder.classList.remove('active');
    await refreshAllData();
    
    if (lastSubmitType === 'dispatch') {
      prepareDispatch(saved.id);
    }
  } catch (err) {
    console.error('Error saving order:', err);
    alert('שגיאה בשמירת ההזמנה');
  }
}

// Vendor selector grid is no longer used, as each order modal is locked to a single vendor.

function loadVendorCatalog(vendorId, orderItems = []) {
  const container = document.getElementById('catalog-items-container');
  container.innerHTML = '';

  const vendor = vendors.find(v => v.id === vendorId);
  if (!vendor) return;

  const catalog = vendor.catalog || [];

  if (catalog.length === 0) {
    container.innerHTML = `
      <div style="color: var(--text-secondary); font-size: 0.9rem; text-align: center; padding: 10px; width: 100%;">
        לא הוגדרה רשימת מוצרים קבועה עבור ספק זה.<br>
        השתמש באזור "מוצרים נוספים" מטה כדי להוסיף פריטים באופן חופשי.
      </div>
    `;
    return;
  }

  catalog.forEach(item => {
    const activeItem = orderItems.find(i => i.name === item.name);
    const quantity = activeItem ? activeItem.quantity : '';

    const row = document.createElement('div');
    row.className = 'catalog-item-row';
    row.innerHTML = `
      <span class="catalog-item-name">${item.name}</span>
      <input type="number" class="form-control catalog-item-quantity" data-name="${item.name}" data-unit="${item.unit}" data-sku="${item.sku || ''}" placeholder="כמות" min="0" step="any" value="${quantity}">
      <span class="catalog-item-unit-label">${item.unit}</span>
    `;
    container.appendChild(row);
  });
}

async function deleteOrder(orderId) {
  if (!confirm('האם אתה בטוח שברצונך למחוק הזמנה זו? כל הנתונים שלה יימחקו לצמיתות.')) return;
  try {
    await dbOps.deleteOrder(orderId);
    refreshAllData();
  } catch (err) {
    console.error('Error deleting order:', err);
  }
}

// Vendor Modal Logic
function openNewVendorModal() {
  vendorModalTitle.textContent = 'הוספת ספק חדש';
  vendorIdInput.value = '';
  vendorForm.reset();
  document.getElementById('vendor-category-select').value = 'bakery';
  document.getElementById('vendor-catalog-input').value = '';
  toggleVendorTypeFields('email');
  modalVendor.classList.add('active');
}

function openEditVendorModal(vendorId) {
  const vendor = vendors.find(v => v.id === vendorId);
  if (!vendor) return;

  vendorModalTitle.textContent = `עריכת ספק: ${vendor.name}`;
  vendorIdInput.value = vendor.id;
  vendorNameInput.value = vendor.name;
  vendorTypeSelect.value = vendor.type;
  
  toggleVendorTypeFields(vendor.type);
  document.getElementById('vendor-category-select').value = vendor.category || 'bakery';

  const catalogText = vendor.catalog 
    ? vendor.catalog.map(c => c.sku ? `${c.name}, ${c.unit || 'יחידות'}, ${c.sku}` : `${c.name}, ${c.unit || 'יחידות'}`).join('\n')
    : '';
  document.getElementById('vendor-catalog-input').value = catalogText;

  if (vendor.type === 'email') {
    vendorEmailInput.value = vendor.email || '';
    vendorEmailTemplate.value = vendor.emailTemplate || '';
    vendorCorrectionTemplate.value = vendor.correctionTemplate || '';
  } else {
    vendorWebsiteUrl.value = vendor.websiteUrl || '';
    vendorUsername.value = vendor.username || '';
    vendorPassword.value = vendor.password || '';
  }

  modalVendor.classList.add('active');
}

function toggleVendorTypeFields(type) {
  if (type === 'email') {
    vendorEmailOptions.classList.remove('hidden');
    vendorWebsiteOptions.classList.add('hidden');
    vendorEmailInput.required = true;
    vendorWebsiteUrl.required = false;
  } else {
    vendorEmailOptions.classList.add('hidden');
    vendorWebsiteOptions.classList.remove('hidden');
    vendorEmailInput.required = false;
    vendorWebsiteUrl.required = true;
  }
}

async function handleVendorSubmit(e) {
  e.preventDefault();

  const vendorId = vendorIdInput.value;
  const type = vendorTypeSelect.value;
  const category = document.getElementById('vendor-category-select').value;
  const catalogText = document.getElementById('vendor-catalog-input').value.trim();

  const catalog = [];
  if (catalogText) {
    catalogText.split('\n').forEach(line => {
      const parts = line.split(',');
      const name = parts[0]?.trim();
      const unit = parts[1]?.trim() || 'יחידות';
      const sku = parts[2]?.trim() || '';
      if (name) {
        if (sku) catalog.push({ name, unit, sku });
        else catalog.push({ name, unit });
      }
    });
  }

  const vendorPayload = {
    id: vendorId || undefined,
    name: vendorNameInput.value,
    type,
    category,
    catalog,
    email: type === 'email' ? vendorEmailInput.value : '',
    emailTemplate: type === 'email' ? vendorEmailTemplate.value : '',
    correctionTemplate: type === 'email' ? vendorCorrectionTemplate.value : '',
    websiteUrl: type === 'website' ? vendorWebsiteUrl.value : '',
    username: type === 'website' ? vendorUsername.value : '',
    password: type === 'website' ? vendorPassword.value : ''
  };

  try {
    await dbOps.saveVendor(vendorPayload);
    modalVendor.classList.remove('active');
    refreshAllData();
  } catch (err) {
    console.error('Error saving vendor:', err);
    alert('שגיאה בשמירת הספק');
  }
}

async function runAutomationLocally(payload) {
  alert('שילוח אוטומטי זמין רק דרך התוכנה המקומית ולא דרך גיטהאב.\nאנא פתח את המערכת ב- localhost:3000');
}

// --- Berman Business Rules ---

function validateBermanRules(vendorId, isOpeningModal = false, items = [], isDispatch = false) {
  if (vendorId !== 'v_berman') return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const target = new Date(selectedDate);
  target.setHours(0, 0, 0, 0);

  const diffTime = target - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Rule 3: Cutoff 14:00 the day before
  if (diffDays <= 1) {
    const currentHour = new Date().getHours();
    if (diffDays < 1 || (diffDays === 1 && currentHour >= 14)) {
      if (isOpeningModal) {
        return "לא ניתן ליצור או לערוך הזמנה לברמן למחר אחרי השעה 14:00 (או לתאריכי עבר).";
      }
      return "לא ניתן לשמור או לשגר: חלף זמן ההזמנה לברמן (14:00 יום לפני).";
    }
  }

  if (isOpeningModal) return null;

  // Rule 1: Min 15 items
  let totalQuantity = 0;
  items.forEach(item => { totalQuantity += (item.quantity || 0); });
  if (totalQuantity < 15) {
    return `לברמן יש להזמין מינימום 15 פריטים סך הכל (בכל הסוגים יחד). כרגע הזנת ${totalQuantity}.`;
  }

  // Rule 2: Max 4 days in advance for dispatching
  if (isDispatch && diffDays > 4) {
    return "לא ניתן לשגר הזמנה לברמן יותר מ-4 ימים מראש. ניתן רק לשמור כטיוטה.";
  }

  return null;
}

function updateBermanModalUI(vendorId) {
  const dispatchBtn = document.getElementById('btn-save-and-dispatch');
  
  if (vendorId === 'v_berman') {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(selectedDate);
    target.setHours(0, 0, 0, 0);
    const diffDays = Math.ceil((target - today) / (1000 * 60 * 60 * 24));
    
    if (diffDays > 4) {
      dispatchBtn.disabled = true;
      dispatchBtn.title = "לא ניתן לשגר לברמן יותר מ-4 ימים מראש. שמור כטיוטה.";
      dispatchBtn.style.opacity = "0.5";
      dispatchBtn.style.cursor = "not-allowed";
      return;
    }
  }
  
  // Default state for non-Berman or valid Berman
  dispatchBtn.disabled = false;
  dispatchBtn.title = "";
  dispatchBtn.style.opacity = "1";
  dispatchBtn.style.cursor = "pointer";
}

async function deleteVendor(vendorId) {
  if (!confirm('האם למחוק ספק זה? שים לב: הזמנות קיימות של ספק זה עשויות להפוך ללא זמינות.')) return;
  try {
    await dbOps.deleteVendor(vendorId);
    refreshAllData();
  } catch (err) {
    console.error('Error deleting vendor:', err);
  }
}

// Safety Dispatch Modal Logic
async function prepareDispatch(orderId) {
  currentActiveOrderId = orderId;
  
  try {
    const payload = await prepareActionPayload(orderId);

    if (payload.type === 'email') {
      safetyEmailDetails.classList.remove('hidden');
      safetyWebsiteDetails.classList.add('hidden');

      previewEmailTo.textContent = payload.emailDetails.to;
      previewEmailSubject.textContent = payload.emailDetails.subject;
      previewEmailBody.textContent = payload.emailDetails.body;
      
      if (payload.isCorrection) {
        document.querySelector('.safety-warning-banner').innerHTML = `
          <i class="fa-solid fa-triangle-exclamation" style="color: var(--color-purple);"></i>
          <span>שימו לב: מדובר ב<strong>עדכון כמויות (תיקון)</strong> להזמנה שכבר שודרה בעבר. יישלח מייל תיקון ממוקד המדגיש את ההפרשים.</span>
        `;
      } else {
        document.querySelector('.safety-warning-banner').innerHTML = `
          <i class="fa-solid fa-circle-info"></i>
          <span>אנא קרא בעיון את הפרטים מטה. לחיצה על "אשר ושגר" תבצע את הפעולה ישירות ברשת.</span>
        `;
      }
    } else {
      safetyEmailDetails.classList.add('hidden');
      safetyWebsiteDetails.classList.remove('hidden');

      previewWebUrl.textContent = payload.websiteDetails.url;
      previewWebAuth.textContent = payload.websiteDetails.username;
      
      previewWebSteps.innerHTML = '';
      payload.websiteDetails.steps.forEach(step => {
        const li = document.createElement('li');
        li.textContent = step.desc;
        if (step.value) {
          const small = document.createElement('small');
          small.style.display = 'block';
          small.style.color = 'var(--text-muted)';
          small.textContent = step.value;
          li.appendChild(small);
        }
        previewWebSteps.appendChild(li);
      });

      document.querySelector('.safety-warning-banner').innerHTML = `
        <i class="fa-solid fa-circle-info"></i>
        <span>סימולציית אוטומציה לאתר. המערכת תתחבר עם הפרטים השמורים ותבצע את הפעולות שלב אחר שלב.</span>
      `;
    }

    modalSafetyConfirm.classList.add('active');
  } catch (err) {
    console.error('Error preparing action:', err);
    alert('שגיאה בהכנת הפעולה: ' + err.message);
  }
}

async function executeDispatch() {
  if (!currentActiveOrderId) return;
  
  btnConfirmSafetyDispatch.disabled = true;
  btnConfirmSafetyDispatch.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> משגר כעת...';
  
  try {
    const result = await executeDispatchPayload(currentActiveOrderId);
    if (result.success) {
      modalSafetyConfirm.classList.remove('active');
      refreshAllData();
    } else {
      alert('שגיאה בשיגור ההזמנה');
    }
  } catch (err) {
    console.error('Error executing dispatch:', err);
    alert('שגיאה בשיגור ההזמנה');
  } finally {
    btnConfirmSafetyDispatch.disabled = false;
    btnConfirmSafetyDispatch.innerHTML = '<i class="fa-solid fa-paper-plane"></i> אשר ושגר הזמנה';
  }
}

// Global scope bindings for dynamically generated HTML elements
window.openEditOrderModal = openEditOrderModal;
window.openNewOrderForVendor = openNewOrderForVendor;
window.deleteOrder = deleteOrder;
window.prepareDispatch = prepareDispatch;
window.openEditVendorModal = openEditVendorModal;
window.deleteVendor = deleteVendor;

// --- Admin Area Functions ---
async function loadAdminUsers() {
  const tbody = document.getElementById('admin-users-tbody');
  tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;">טוען משתמשים...</td></tr>';
  
  if (!isFirebaseConnected || !firebaseDb) return;
  
  try {
    const snapshot = await firebaseDb.collection('users').get();
    tbody.innerHTML = '';
    
    snapshot.forEach(doc => {
      const data = doc.data();
      const tr = document.createElement('tr');
      tr.style.borderBottom = '1px solid var(--border-color)';
      
      const roleText = data.role === 'admin' ? 'מנהל מערכת' : (data.role === 'editor' ? 'עורך הזמנות' : 'צופה בלבד');
      const dateText = data.createdAt ? new Date(data.createdAt).toLocaleDateString('he-IL') : 'לא ידוע';
      
      let actionsHTML = '';
      if (doc.id !== firebaseAuth.currentUser.uid) {
        actionsHTML = `
          <select class="form-control" style="width: auto; display: inline-block; padding: 4px;" onchange="changeUserRole('${doc.id}', this.value)">
            <option value="viewer" ${data.role === 'viewer' ? 'selected' : ''}>צופה</option>
            <option value="editor" ${data.role === 'editor' ? 'selected' : ''}>עורך</option>
            <option value="admin"  ${data.role === 'admin' ? 'selected' : ''}>מנהל</option>
          </select>
        `;
      } else {
        actionsHTML = '<span style="color: var(--text-secondary); font-size:0.8rem;">(אתה)</span>';
      }
      
      tr.innerHTML = `
        <td style="padding: 10px;">${data.email}</td>
        <td style="padding: 10px;">${dateText}</td>
        <td style="padding: 10px;">${roleText}</td>
        <td style="padding: 10px;">${actionsHTML}</td>
      `;
      tbody.appendChild(tr);
    });
  } catch(err) {
    console.error(err);
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:var(--color-danger);">שגיאה בטעינת משתמשים: ${err.message || err}</td></tr>`;
  }
}

window.changeUserRole = async function(uid, newRole) {
  if (currentUserRole !== 'admin') return;
  if (!confirm('האם אתה בטוח שברצונך לשנות הרשאות למשתמש זה?')) return;
  
  try {
    await firebaseDb.collection('users').doc(uid).update({ role: newRole });
    alert('ההרשאות עודכנו בהצלחה!');
    loadAdminUsers();
  } catch (err) {
    alert('שגיאה בעדכון ההרשאות: ' + err.message);
  }
};

// --- Auth & Roles Logic ---
const modalLogin = document.getElementById('modal-login');
const loginForm = document.getElementById('login-form');
const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');
const btnToggleSignup = document.getElementById('btn-toggle-signup');
const userProfileBadge = document.getElementById('user-profile-badge');
const userEmailDisplay = document.getElementById('user-email-display');
const userRoleDisplay = document.getElementById('user-role-display');
const btnLogout = document.getElementById('btn-logout');

let isSignupMode = false;

if (btnToggleSignup) {
  btnToggleSignup.addEventListener('click', (e) => {
    e.preventDefault();
    isSignupMode = !isSignupMode;
    if (isSignupMode) {
      document.querySelector('#modal-login h2').textContent = 'יצירת משתמש חדש';
      document.querySelector('#modal-login button[type="submit"]').textContent = 'הירשם';
      btnToggleSignup.textContent = 'יש לך כבר חשבון? התחבר';
    } else {
      document.querySelector('#modal-login h2').textContent = 'התחברות למערכת';
      document.querySelector('#modal-login button[type="submit"]').textContent = 'התחבר';
      btnToggleSignup.textContent = 'צור חשבון';
    }
  });
}

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = loginEmail.value.trim();
    const password = loginPassword.value.trim();
    if (!email || !password) return;
    
    try {
      if (isSignupMode) {
        await firebaseAuth.createUserWithEmailAndPassword(email, password);
      } else {
        await firebaseAuth.signInWithEmailAndPassword(email, password);
      }
    } catch (err) {
      alert('שגיאה: ' + err.message);
    }
  });
}

if (btnLogout) {
  btnLogout.addEventListener('click', async () => {
    if (firebaseAuth) {
      await firebaseAuth.signOut();
    }
  });
}

async function handleAuthStateChange(user) {
  if (user) {
    // User is logged in
    if (modalLogin) modalLogin.classList.remove('active');
    if (userProfileBadge) userProfileBadge.style.display = 'flex';
    if (userEmailDisplay) userEmailDisplay.textContent = user.email;
    
    // Check role in Firestore
    if (firebaseDb) {
      try {
        const userDoc = await firebaseDb.collection('users').doc(user.uid).get();
        const isOwner = user.email.toLowerCase() === 'ariwaized@gmail.com';
        
        if (userDoc.exists) {
          currentUserRole = userDoc.data().role || 'viewer';
          // Auto upgrade owner to admin in database if not already
          if (isOwner && currentUserRole !== 'admin') {
            currentUserRole = 'admin';
            await firebaseDb.collection('users').doc(user.uid).update({ role: 'admin' });
          }
        } else {
          // New user, create as admin if owner, else viewer
          currentUserRole = isOwner ? 'admin' : 'viewer';
          await firebaseDb.collection('users').doc(user.uid).set({
            email: user.email,
            role: currentUserRole,
            createdAt: new Date().toISOString()
          });
        }
      } catch (err) {
        console.error("Error fetching user role:", err);
        // Fallback for owner even if database read fails
        currentUserRole = user.email.toLowerCase() === 'ariwaized@gmail.com' ? 'admin' : 'viewer';
      }
    }
    
    let roleHebrew = 'צופה בלבד';
    if (currentUserRole === 'admin') roleHebrew = 'מנהל מערכת';
    if (currentUserRole === 'editor') roleHebrew = 'עורך הזמנות';
    
    if (userRoleDisplay) userRoleDisplay.textContent = 'תפקיד: ' + roleHebrew;
    
    applyRoleBasedUI(currentUserRole);
    refreshAllData(); // reload data now that we know the role
  } else {
    // User is logged out
    if (modalLogin) modalLogin.classList.add('active');
    if (userProfileBadge) userProfileBadge.style.display = 'none';
    currentUserRole = 'viewer';
  }
}

function applyRoleBasedUI(role) {
  const btnVendors = document.getElementById('btn-vendors');
  const btnSystemAdmin = document.getElementById('btn-system-admin');
  const btnDeveloper = document.getElementById('btn-developer');
  
  if (role === 'admin') {
    if (btnVendors) btnVendors.style.display = 'block';
    if (btnSystemAdmin) btnSystemAdmin.style.display = 'block';
    if (btnDeveloper) btnDeveloper.style.display = 'block';
  } else {
    if (btnVendors) btnVendors.style.display = 'none';
    if (btnSystemAdmin) btnSystemAdmin.style.display = 'none';
    if (btnDeveloper) btnDeveloper.style.display = 'none';
  }
  
  // Re-render dashboard if already loaded
  renderVendors();
  renderOrders();
}

async function loadDeveloperZone() {
  const screenshotsContainer = document.getElementById('developer-screenshots-container');
  const logsContainer = document.getElementById('developer-logs-container');
  
  if (screenshotsContainer) screenshotsContainer.innerHTML = '<li>טוען צילומי מסך...</li>';
  if (logsContainer) logsContainer.innerHTML = '<li>טוען יומן לוגים...</li>';
  
  try {
    // 1. Fetch screenshots from server API
    let screenshotFiles = [];
    try {
      const res = await fetch('http://localhost:3000/api/screenshots');
      if (res.ok) {
        screenshotFiles = await res.json();
      }
    } catch (e) {
      console.error('Failed to fetch screenshots from local server:', e);
    }
    
    if (screenshotsContainer) {
      screenshotsContainer.innerHTML = '';
      if (screenshotFiles.length === 0) {
        screenshotsContainer.innerHTML = '<div style="color: var(--text-secondary); padding: 10px;">אין צילומי מסך זמינים בשרת המקומי.</div>';
      } else {
        screenshotFiles.forEach(file => {
          // File name format: order_o_berman_1.png or order_o_1721234567890.png
          const orderId = file.replace('order_', '').replace('.png', '');
          const li = document.createElement('li');
          li.style.display = 'flex';
          li.style.justifyContent = 'space-between';
          li.style.alignItems = 'center';
          li.style.padding = '10px 0';
          li.style.borderBottom = '1px solid var(--border-color)';
          
          li.innerHTML = `
            <div>
              <span style="color: #fff; font-weight: 500;">${file}</span>
              <div style="font-size: 0.8rem; color: var(--text-secondary);">מזהה הזמנה: ${orderId}</div>
            </div>
            <a href="http://localhost:3000/screenshots/${file}" target="_blank" class="btn btn-secondary btn-sm" style="color: var(--color-info); border-color: rgba(14,165,233,0.15); text-decoration: none; display: inline-flex; align-items: center; gap: 4px;">
              <i class="fa-regular fa-image"></i> צפה בתמונה
            </a>
          `;
          screenshotsContainer.appendChild(li);
        });
      }
    }
    
    // 2. Load system logs (recent actionsLog from all orders)
    let allLogs = [];
    const allOrders = await dbOps.getOrders();
    allOrders.forEach(order => {
      if (order.actionsLog) {
        order.actionsLog.forEach(log => {
          allLogs.push({
            timestamp: log.timestamp,
            action: log.action,
            orderId: order.id,
            vendorName: order.vendorName,
            date: order.date
          });
        });
      }
    });
    
    // Sort logs descending by timestamp
    allLogs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    if (logsContainer) {
      logsContainer.innerHTML = '';
      if (allLogs.length === 0) {
        logsContainer.innerHTML = '<div style="color: var(--text-secondary); padding: 10px;">אין לוגים זמינים במערכת.</div>';
      } else {
        allLogs.forEach(log => {
          const dateObj = new Date(log.timestamp);
          const timeStr = dateObj.toLocaleTimeString('he-IL') + ' ' + dateObj.toLocaleDateString('he-IL');
          const li = document.createElement('li');
          li.style.padding = '8px 0';
          li.style.borderBottom = '1px dashed var(--border-color)';
          li.innerHTML = `
            <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--text-secondary);">
              <span>${timeStr}</span>
              <span>הזמנת ${log.vendorName} (${log.date})</span>
            </div>
            <div style="color: #fff; margin-top: 4px; font-size: 0.9rem;">${log.action}</div>
          `;
          logsContainer.appendChild(li);
        });
      }
    }
    
  } catch (err) {
    console.error('Error loading developer zone data:', err);
  }
}

// Manually verify Ran order on demand
async function verifyOrderOnDemand(orderId, btn) {
  if (btn.disabled) return;
  
  if (!confirm('האם ברצונך להפעיל כעת בדיקת אימות אוטומטית מול אתר הספק? \n(הבוט יתחבר וישווה את כמויות הירקות בפועל).')) {
    return;
  }
  
  const originalHtml = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> מאמת...';
  
  try {
    const response = await fetch('http://localhost:3000/api/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId })
    });
    
    const result = await response.json();
    
    btn.disabled = false;
    btn.innerHTML = originalHtml;
    
    if (!response.ok || !result.success) {
      throw new Error(result.error || 'שגיאה בהרצת בדיקת האימות');
    }
    
    if (result.isMatch) {
      alert('✅ בדיקת האימות הצליחה! \nההזמנה באתר תואמת לחלוטין לפורטל.');
    } else {
      let diffText = '❌ נמצאו הפרשים מול אתר הספק:\n\n';
      result.diffs.forEach(diff => {
        diffText += `• ${diff}\n`;
      });
      diffText += '\nנשלח מייל התראה מפורט למנהל.';
      alert(diffText);
    }
    
    // Reload logs
    loadDeveloperZone();
    
  } catch (err) {
    btn.disabled = false;
    btn.innerHTML = originalHtml;
    console.error('Verification failed:', err);
    alert('שגיאה במהלך בדיקת האימות: ' + err.message);
  }
}
