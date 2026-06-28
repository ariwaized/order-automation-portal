const express = require('express');
const path = require('path');
const cors = require('cors');

// Import the automation script for Berman
const { executeBermanOrder } = require('./berman-automation/berman-order');

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

  try {
    if (vendorId === 'v_berman') {
      // Execute Berman automation
      const result = await executeBermanOrder(orderData, credentials);
      return res.status(200).json({ success: true, message: result.message });
    } else {
      // Handle other vendors if needed in the future
      return res.status(400).json({ error: `Automation for vendor '${vendorId}' is not implemented yet.` });
    }
  } catch (error) {
    console.error('Automation failed:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`\n=================================================`);
  console.log(`🚀 Portal Server is running at http://localhost:${PORT}`);
  console.log(`=================================================\n`);
});
