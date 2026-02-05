const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// Webhook verification
router.get('/', (req, res) => {
    res.status(200);
});

// Handle messages
router.post('/', messageController.handleMessage);

module.exports = router;