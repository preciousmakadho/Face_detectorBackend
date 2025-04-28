const express = require('express');
const router = express.Router();
const twilio = require('twilio');

// Environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = '+12408662710';

// Initialize Twilio client
const client = twilio(accountSid, authToken);

// POST endpoint to send SMS messages
router.post('/api/send-sms', async (req, res) => {
  try {
    // Get data from request body
    const { to, body } = req.body;
    
    // Validate required fields
    if (!to || !body) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields: to and body are required' 
      });
    }
    
    // Send message via Twilio
    const message = await client.messages.create({
      body: body,
      from: fromNumber,
      to: to
    });
    
    // Return success with message SID
    return res.status(200).json({
      success: true,
      messageSid: message.sid,
      body: message.body
    });
    
  } catch (error) {
    console.error('Error sending SMS message:', error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;