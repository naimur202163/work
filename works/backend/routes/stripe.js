const express = require('express');
const router = express.Router();
const {
  stripe,
  secret,
  transfers,
  createCustomerPortalSession,
  handleStripeHooks,
  seriesTransfers,
} = require('../controllers/stripe');
const { protect } = require('../middleware/auth');

router.route('/stripeOnboarding').post(protect, stripe);
router.route('/secret').post(protect, secret);
router.route('/transfers').post(protect, transfers);
router.route('/seriesTransfers').post(protect, seriesTransfers);
router.route('/customerPortal').post(protect, createCustomerPortalSession);
router.route('/hooks').post(handleStripeHooks);

module.exports = router;