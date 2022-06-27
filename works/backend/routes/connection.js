const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  sendConnectRequest,
  getAllConnectionRequest,
  approveConnectionRequest,
  declinedConnectionRequest,
  getAllConnection,
  connectionStatus,
  removeConnection,
} = require('../controllers/connection');

// routes
router.route('/').post(protect, sendConnectRequest);
router.route('/').get(protect, getAllConnectionRequest);
router.route('/friends').get(protect, getAllConnection);
router.route('/approved').post(protect, approveConnectionRequest);
router.route('/declined').post(protect, declinedConnectionRequest);
router.route('/status').post(protect, connectionStatus);
router.route('/remove').post(protect, removeConnection);

module.exports = router;
