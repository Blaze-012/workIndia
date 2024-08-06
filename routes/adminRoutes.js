const express = require('express');
const verifyAdminApiKey = require('../middleware/apiKeyMiddleware');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const { addShort, updateShort } = require('../controllers/adminController');
const router = express.Router();

router.post('/shorts/create', authenticate, authorize(['admin']), verifyAdminApiKey, addShort);
router.put('/update/:id', authenticate, authorize(['admin']), verifyAdminApiKey, updateShort);

module.exports = router;
