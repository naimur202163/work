const express = require('express');
const router = express.Router();
const {
  createCustomer,
  secretSub,
} = require('../controllers/subscription-pay');

router.post('/', createCustomer);
router.post('/secretSub', secretSub);

module.exports = router;
