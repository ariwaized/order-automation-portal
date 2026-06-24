const fs = require('fs');
const path = require('path');

let dbType = 'local'; // 'local' or 'firebase'
let db = null;

// Initialize Firebase if credentials exist
try {
  const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT || path.join(__dirname, 'firebase-service-account.json');
  if (fs.existsSync(serviceAccountPath)) {
    const admin = require('firebase-admin');
    const serviceAccount = require(serviceAccountPath);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    db = admin.firestore();
    dbType = 'firebase';
    console.log('Connected to Firebase Firestore successfully.');
  } else {
    console.log('Firebase credentials file (firebase-service-account.json) not found. Using local JSON database (db.json).');
  }
} catch (error) {
  console.error('Failed to initialize Firebase, falling back to local JSON database:', error);
}

const LOCAL_DB_PATH = path.join(__dirname, 'db.json');

function readLocalDB() {
  if (!fs.existsSync(LOCAL_DB_PATH)) {
    const initialData = { vendors: [], orders: [] };
    fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(initialData, null, 2));
    return initialData;
  }
  try {
    return JSON.parse(fs.readFileSync(LOCAL_DB_PATH, 'utf8'));
  } catch (e) {
    return { vendors: [], orders: [] };
  }
}

function writeLocalDB(data) {
  fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(data, null, 2));
}

const dbOperations = {
  getDbType: () => dbType,

  // Vendors CRUD
  getVendors: async () => {
    if (dbType === 'firebase') {
      const snapshot = await db.collection('vendors').get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } else {
      return readLocalDB().vendors;
    }
  },

  saveVendor: async (vendor) => {
    if (dbType === 'firebase') {
      const docRef = vendor.id ? db.collection('vendors').doc(vendor.id) : db.collection('vendors').doc();
      const vendorData = { ...vendor };
      delete vendorData.id;
      await docRef.set(vendorData, { merge: true });
      return { id: docRef.id, ...vendorData };
    } else {
      const localData = readLocalDB();
      if (!vendor.id) {
        vendor.id = 'v_' + Date.now();
        localData.vendors.push(vendor);
      } else {
        const index = localData.vendors.findIndex(v => v.id === vendor.id);
        if (index !== -1) {
          localData.vendors[index] = vendor;
        } else {
          localData.vendors.push(vendor);
        }
      }
      writeLocalDB(localData);
      return vendor;
    }
  },

  deleteVendor: async (vendorId) => {
    if (dbType === 'firebase') {
      await db.collection('vendors').doc(vendorId).delete();
    } else {
      const localData = readLocalDB();
      localData.vendors = localData.vendors.filter(v => v.id !== vendorId);
      writeLocalDB(localData);
    }
  },

  // Orders CRUD
  getOrders: async (date) => {
    if (dbType === 'firebase') {
      let query = db.collection('orders');
      if (date) {
        query = query.where('date', '==', date);
      }
      const snapshot = await query.get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } else {
      const localData = readLocalDB();
      if (date) {
        return localData.orders.filter(o => o.date === date);
      }
      return localData.orders;
    }
  },

  saveOrder: async (order) => {
    if (dbType === 'firebase') {
      const docRef = order.id ? db.collection('orders').doc(order.id) : db.collection('orders').doc();
      const orderData = { ...order };
      delete orderData.id;
      await docRef.set(orderData, { merge: true });
      return { id: docRef.id, ...orderData };
    } else {
      const localData = readLocalDB();
      if (!order.id) {
        order.id = 'o_' + Date.now();
        localData.orders.push(order);
      } else {
        const index = localData.orders.findIndex(o => o.id === order.id);
        if (index !== -1) {
          localData.orders[index] = order;
        } else {
          localData.orders.push(order);
        }
      }
      writeLocalDB(localData);
      return order;
    }
  },

  deleteOrder: async (orderId) => {
    if (dbType === 'firebase') {
      await db.collection('orders').doc(orderId).delete();
    } else {
      const localData = readLocalDB();
      localData.orders = localData.orders.filter(o => o.id !== orderId);
      writeLocalDB(localData);
    }
  }
};

module.exports = dbOperations;
