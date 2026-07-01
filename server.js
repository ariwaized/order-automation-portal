require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const nodemailer = require('nodemailer');

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

app.listen(PORT, () => {
  console.log(`\n=================================================`);
  console.log(`🚀 Portal Server is running at http://localhost:${PORT}`);
  console.log(`=================================================\n`);
});
