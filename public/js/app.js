// Global State
let vendors = [];
let orders = [];
let selectedDate = '';
let currentActiveOrderId = null;
let currentCategoryFilter = 'all';
let currentVendorCategoryFilter = 'all';


// DOM Elements
const dbStatus = document.getElementById('db-status');
const dbStatusText = document.getElementById('db-status-text');
const datePicker = document.getElementById('order-date-picker');
const selectedDateLabel = document.getElementById('selected-date-label');
const ordersListContainer = document.getElementById('orders-list-container');
const activityLogContainer = document.getElementById('activity-log-container');
const vendorsGridContainer = document.getElementById('vendors-grid-container');

// Navigation Buttons
const btnDashboard = document.getElementById('btn-dashboard');
const btnVendors = document.getElementById('btn-vendors');
const viewDashboard = document.getElementById('view-dashboard');
const viewVendors = document.getElementById('view-vendors');

// Modal Elements
const modalOrder = document.getElementById('modal-order');
const modalVendor = document.getElementById('modal-vendor');
const modalSafetyConfirm = document.getElementById('modal-safety-confirm');

const btnNewOrder = document.getElementById('btn-new-order');
const btnAddVendorModal = document.getElementById('btn-add-vendor-modal');

// Close buttons
const btnCloseOrderModal = document.getElementById('btn-close-order-modal');
const btnCloseVendorModal = document.getElementById('btn-close-vendor-modal');
const btnCloseSafetyModal = document.getElementById('btn-close-safety-modal');

// Forms & Inputs
const orderForm = document.getElementById('order-form');
const orderIdInput = document.getElementById('order-id-input');
const orderVendorSelect = document.getElementById('order-vendor-select');
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

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
  setupDatePicker();
  checkDbStatus();
  loadVendors().then(() => {
    loadOrders();
  });
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
  selectedDateLabel.textContent = formatDateHebrew(selectedDate);
}

function formatDateHebrew(dateStr) {
  const parts = dateStr.split('-');
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

// --- API Calls ---

async function checkDbStatus() {
  try {
    const res = await fetch('/api/status');
    const data = await res.json();
    if (data.dbType === 'firebase') {
      dbStatus.classList.add('connected');
      dbStatusText.textContent = 'מחובר ל-Firebase Cloud';
    } else {
      dbStatus.classList.remove('connected');
      dbStatusText.textContent = 'מצב מקומי (db.json)';
    }
  } catch (err) {
    dbStatus.classList.remove('connected');
    dbStatusText.textContent = 'שגיאת חיבור לשרת';
  }
}

async function loadVendors() {
  try {
    const res = await fetch('/api/vendors');
    vendors = await res.json();
    populateVendorSelect();
    renderVendors();
  } catch (err) {
    console.error('Error loading vendors:', err);
  }
}

async function loadOrders() {
  try {
    const res = await fetch(`/api/orders?date=${selectedDate}`);
    orders = await res.json();
    renderOrders();
    renderActivityLogs();
  } catch (err) {
    console.error('Error loading orders:', err);
  }
}

// --- UI Rendering ---

function populateVendorSelect() {
  orderVendorSelect.innerHTML = '<option value="" disabled selected>בחר ספק מהרשימה...</option>';
  
  const bakeries = vendors.filter(v => v.category === 'bakery');
  const vegetables = vendors.filter(v => v.category === 'vegetables');
  const others = vendors.filter(v => v.category !== 'bakery' && v.category !== 'vegetables');

  if (bakeries.length > 0) {
    const group = document.createElement('optgroup');
    group.label = 'מאפים';
    bakeries.forEach(v => {
      const option = document.createElement('option');
      option.value = v.id;
      option.textContent = v.name;
      group.appendChild(option);
    });
    orderVendorSelect.appendChild(group);
  }

  if (vegetables.length > 0) {
    const group = document.createElement('optgroup');
    group.label = 'ירקות';
    vegetables.forEach(v => {
      const option = document.createElement('option');
      option.value = v.id;
      option.textContent = v.name;
      group.appendChild(option);
    });
    orderVendorSelect.appendChild(group);
  }

  if (others.length > 0) {
    const group = document.createElement('optgroup');
    group.label = 'אחר';
    others.forEach(v => {
      const option = document.createElement('option');
      option.value = v.id;
      option.textContent = v.name;
      group.appendChild(option);
    });
    orderVendorSelect.appendChild(group);
  }
}


function renderOrders() {
  ordersListContainer.innerHTML = '';
  
  const filteredOrders = currentCategoryFilter === 'all'
    ? orders
    : orders.filter(order => {
        const vendor = vendors.find(v => v.id === order.vendorId);
        return (order.category || (vendor ? vendor.category : '')) === currentCategoryFilter;
      });

  if (filteredOrders.length === 0) {
    ordersListContainer.innerHTML = `
      <div class="empty-state">
        <i class="fa-solid fa-folder-open"></i>
        <p>אין הזמנות מתוכננות בקטגוריה זו לתאריך זה.</p>
        <button class="btn btn-secondary btn-sm mt-2" onclick="openNewOrderModal()">צור הזמנה עכשיו</button>
      </div>
    `;
    return;
  }

  filteredOrders.forEach(order => {

    const card = document.createElement('div');
    card.className = 'order-item-card';

    // Build items preview
    const itemsPreview = order.items.map(i => `${i.name}: ${i.quantity} ${i.unit || ''}`).join(', ');

    // Badge styling class
    const badgeClass = `badge-${order.status}`;
    let badgeText = '';
    switch (order.status) {
      case 'draft': badgeText = 'טיוטה'; break;
      case 'pending_approval': badgeText = 'ממתין לאישור'; break;
      case 'completed': badgeText = 'בוצע בהצלחה'; break;
      case 'correction_sent': badgeText = 'נשלח תיקון'; break;
    }

    // Determine primary action button based on status
    let actionBtnHTML = '';
    if (order.status === 'pending_approval') {
      actionBtnHTML = `
        <button class="btn btn-primary btn-sm" onclick="prepareDispatch('${order.id}')">
          <i class="fa-solid fa-paper-plane"></i> הכן לשיגור
        </button>
      `;
    } else if (order.status === 'completed' || order.status === 'correction_sent') {
      actionBtnHTML = `
        <button class="btn btn-secondary btn-sm" onclick="prepareDispatch('${order.id}')">
          <i class="fa-solid fa-rotate"></i> שלח עדכון/תיקון
        </button>
      `;
    }

    card.innerHTML = `
      <div class="order-header-row">
        <span class="vendor-title">${order.vendorName}</span>
        <span class="badge ${badgeClass}">
          <span class="status-dot"></span> ${badgeText}
        </span>
      </div>
      <div class="order-body-row">
        <span class="items-title">פריטים שהוזמנו:</span>
        <div class="items-text-preview">${itemsPreview}</div>
      </div>
      <div class="order-actions-row">
        <div class="order-meta">
          תאריך: ${formatDateHebrew(order.date)}
        </div>
        <div class="button-group">
          <button class="btn btn-secondary btn-sm" onclick="openEditOrderModal('${order.id}')">
            <i class="fa-solid fa-pen"></i> ערוך כמויות
          </button>
          ${actionBtnHTML}
          <button class="btn btn-danger btn-sm" style="background: transparent; color: var(--color-danger); border: 1px solid rgba(239,68,68,0.2)" onclick="deleteOrder('${order.id}')">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    `;

    ordersListContainer.appendChild(card);
  });
}

function renderActivityLogs() {
  activityLogContainer.innerHTML = '';
  
  // Combine all logs of current date orders and sort by timestamp desc
  const allLogs = [];
  orders.forEach(order => {
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
        <p style="font-size: 0.9rem;">אין פעילויות שתועדו היום.</p>
      </div>
    `;
    return;
  }

  allLogs.forEach(log => {
    const li = document.createElement('li');
    li.className = 'activity-log-item';
    
    const timeStr = log.timestamp.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    
    li.innerHTML = `
      <span class="log-content"><strong>${log.vendorName}</strong>: ${log.action}</span>
      <span class="log-time">${timeStr}</span>
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

// --- Event Listeners Setup ---

function setupEventListeners() {
  // Navigation
  btnDashboard.addEventListener('click', () => {
    btnDashboard.classList.add('active');
    btnVendors.classList.remove('active');
    viewDashboard.classList.add('active');
    viewVendors.classList.remove('active');
  });

  btnVendors.addEventListener('click', () => {
    btnVendors.classList.add('active');
    btnDashboard.classList.remove('active');
    viewVendors.classList.add('active');
    viewDashboard.classList.remove('active');
  });

  // Date picker change
  datePicker.addEventListener('change', (e) => {
    selectedDate = e.target.value;
    selectedDateLabel.textContent = formatDateHebrew(selectedDate);
    loadOrders();
  });

  // Category Filters Event Listeners
  const dbFilterBtns = document.querySelectorAll('#dashboard-filters .filter-btn');
  dbFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      dbFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategoryFilter = btn.getAttribute('data-category');
      renderOrders();
    });
  });

  const vendorFilterBtns = document.querySelectorAll('#vendor-filters .filter-btn');
  vendorFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      vendorFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentVendorCategoryFilter = btn.getAttribute('data-category');
      renderVendors();
    });
  });


  // Open Modals
  btnNewOrder.addEventListener('click', () => openNewOrderModal());
  btnAddVendorModal.addEventListener('click', () => openNewVendorModal());

  // Close Modals
  btnCloseOrderModal.addEventListener('click', () => modalOrder.classList.remove('active'));
  document.getElementById('btn-cancel-order').addEventListener('click', () => modalOrder.classList.remove('active'));

  btnCloseVendorModal.addEventListener('click', () => modalVendor.classList.remove('active'));
  document.getElementById('btn-cancel-vendor').addEventListener('click', () => modalVendor.classList.remove('active'));

  btnCloseSafetyModal.addEventListener('click', () => modalSafetyConfirm.classList.remove('active'));
  btnCancelSafety.addEventListener('click', () => modalSafetyConfirm.classList.remove('active'));

  // Vendor type toggle
  vendorTypeSelect.addEventListener('change', (e) => {
    toggleVendorTypeFields(e.target.value);
  });

  // Add item row in order modal
  btnAddItemRow.addEventListener('click', () => addItemRow());

  // Forms Submissions
  orderForm.addEventListener('submit', handleOrderSubmit);
  vendorForm.addEventListener('submit', handleVendorSubmit);

  // Safety confirmation dispatch
  btnConfirmSafetyDispatch.addEventListener('click', executeDispatch);
}

// --- Order Modal Logic ---

function openNewOrderModal() {
  orderModalTitle.textContent = 'יצירת הזמנה חדשה';
  orderIdInput.value = '';
  orderForm.reset();
  orderItemsListContainer.innerHTML = '';
  addItemRow(); // Start with one item row
  modalOrder.classList.add('active');
}

function openEditOrderModal(orderId) {
  const order = orders.find(o => o.id === orderId);
  if (!order) return;

  orderModalTitle.textContent = `עריכת הזמנה - ${order.vendorName}`;
  orderIdInput.value = order.id;
  orderVendorSelect.value = order.vendorId;
  orderItemsListContainer.innerHTML = '';
  
  order.items.forEach(item => {
    addItemRow(item.name, item.quantity, item.unit);
  });
  
  modalOrder.classList.add('active');
}

function addItemRow(name = '', quantity = 1, unit = 'ק"ג') {
  const row = document.createElement('div');
  row.className = 'item-row form-group';
  row.style.padding = '0';
  row.style.marginBottom = '8px';

  row.innerHTML = `
    <input type="text" class="form-control item-name" placeholder="שם מוצר (עגבניות, לחמניות...)" value="${name}" required>
    <input type="number" class="form-control item-quantity" placeholder="כמות" min="0.1" step="any" value="${quantity}" required>
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
  const vendorId = orderVendorSelect.value;
  const vendor = vendors.find(v => v.id === vendorId);

  // Gather items
  const itemRows = orderItemsListContainer.querySelectorAll('.item-row');
  const items = [];
  itemRows.forEach(row => {
    const name = row.querySelector('.item-name').value;
    const quantity = parseFloat(row.querySelector('.item-quantity').value);
    const unit = row.querySelector('.item-unit').value;
    items.push({ name, quantity, unit });
  });

  if (items.length === 0) {
    alert('יש להוסיף לפחות פריט אחד להזמנה');
    return;
  }

  const existingOrder = orders.find(o => o.id === orderId);

  const orderPayload = {
    id: orderId || undefined,
    date: selectedDate,
    vendorId,
    vendorName: vendor ? vendor.name : 'ספק לא ידוע',
    category: vendor ? vendor.category : 'other',
    items,
    status: existingOrder ? existingOrder.status : 'pending_approval'
  };


  // Add action log details
  if (existingOrder) {
    orderPayload.actionsLog = existingOrder.actionsLog || [];
    orderPayload.actionsLog.push({
      timestamp: new Date().toISOString(),
      action: 'בוצע עדכון כמויות בהזמנה (ממתין לשיגור עדכון)'
    });
    // Keep dispatched items for diffing later if already dispatched once
    if (existingOrder.dispatchedItems) {
      orderPayload.dispatchedItems = existingOrder.dispatchedItems;
    }
  }

  try {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderPayload)
    });
    
    if (res.ok) {
      modalOrder.classList.remove('active');
      loadOrders();
    } else {
      const err = await res.json();
      alert(`שגיאה בשמירת ההזמנה: ${err.error}`);
    }
  } catch (err) {
    console.error('Error saving order:', err);
  }
}

async function deleteOrder(orderId) {
  if (!confirm('האם אתה בטוח שברצונך למחוק הזמנה זו? כל הנתונים שלה יימחקו לצמיתות.')) return;
  try {
    const res = await fetch(`/api/orders/${orderId}`, { method: 'DELETE' });
    if (res.ok) {
      loadOrders();
    }
  } catch (err) {
    console.error('Error deleting order:', err);
  }
}

// --- Vendor Modal Logic ---

function openNewVendorModal() {
  vendorModalTitle.textContent = 'הוספת ספק חדש';
  vendorIdInput.value = '';
  vendorForm.reset();
  document.getElementById('vendor-category-select').value = 'bakery';
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

  const vendorPayload = {
    id: vendorId || undefined,
    name: vendorNameInput.value,
    type,
    category,
    email: type === 'email' ? vendorEmailInput.value : '',
    emailTemplate: type === 'email' ? vendorEmailTemplate.value : '',
    correctionTemplate: type === 'email' ? vendorCorrectionTemplate.value : '',
    websiteUrl: type === 'website' ? vendorWebsiteUrl.value : '',
    username: type === 'website' ? vendorUsername.value : '',
    password: type === 'website' ? vendorPassword.value : ''
  };


  try {
    const res = await fetch('/api/vendors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(vendorPayload)
    });

    if (res.ok) {
      modalVendor.classList.remove('active');
      loadVendors().then(() => loadOrders());
    } else {
      const err = await res.json();
      alert(`שגיאה בשמירת הספק: ${err.error}`);
    }
  } catch (err) {
    console.error('Error saving vendor:', err);
  }
}

async function deleteVendor(vendorId) {
  if (!confirm('האם למחוק ספק זה? שים לב: הזמנות קיימות של ספק זה עשויות להפוך ללא זמינות.')) return;
  try {
    const res = await fetch(`/api/vendors/${vendorId}`, { method: 'DELETE' });
    if (res.ok) {
      loadVendors();
    }
  } catch (err) {
    console.error('Error deleting vendor:', err);
  }
}

// --- Safety Dispatch Gate Logic (Human In The Loop) ---

async function prepareDispatch(orderId) {
  currentActiveOrderId = orderId;
  
  try {
    const res = await fetch(`/api/orders/${orderId}/prepare-action`, { method: 'POST' });
    if (!res.ok) {
      const err = await res.json();
      alert(`שגיאה בהכנת ההזמנה לשיגור: ${err.error}`);
      return;
    }

    const payload = await res.json();

    // Populate Safety Modal based on type
    if (payload.type === 'email') {
      safetyEmailDetails.classList.remove('hidden');
      safetyWebsiteDetails.classList.add('hidden');

      previewEmailTo.textContent = payload.emailDetails.to;
      previewEmailSubject.textContent = payload.emailDetails.subject;
      previewEmailBody.textContent = payload.emailDetails.body;
      
      // If it is a correction, highlight it
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
  }
}

async function executeDispatch() {
  if (!currentActiveOrderId) return;
  
  btnConfirmSafetyDispatch.disabled = true;
  btnConfirmSafetyDispatch.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> משגר כעת...';
  
  try {
    const res = await fetch(`/api/orders/${currentActiveOrderId}/dispatch`, { method: 'POST' });
    const data = await res.json();
    
    if (res.ok) {
      modalSafetyConfirm.classList.remove('active');
      loadOrders();
    } else {
      alert(`שגיאה בשיגור ההזמנה: ${data.error}`);
    }
  } catch (err) {
    console.error('Error executing dispatch:', err);
  } finally {
    btnConfirmSafetyDispatch.disabled = false;
    btnConfirmSafetyDispatch.innerHTML = '<i class="fa-solid fa-paper-plane"></i> אשר ושגר הזמנה';
  }
}

// Global scope helpers for onclick handlers in dynamically generated HTML
window.openNewOrderModal = openNewOrderModal;
window.openEditOrderModal = openEditOrderModal;
window.deleteOrder = deleteOrder;
window.prepareDispatch = prepareDispatch;
window.openEditVendorModal = openEditVendorModal;
window.deleteVendor = deleteVendor;
