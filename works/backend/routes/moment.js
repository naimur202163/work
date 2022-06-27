const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  uploadMoment,
  getMoments,
  deleteMoment,
  getMoment,
  updateMoment,
  tagPeopleInMoment,
  getAllTaggedUsers
} = require('../controllers/moment');

// routes
router.route('/').post(protect, uploadMoment);
router.route('/').get(protect, getMoments);
router.route('/:momentId').get(protect, getMoment);
router.route('/:momentId').delete(protect, deleteMoment);
router.route('/:momentId').patch(protect, updateMoment);
router.route('/:momentId/tagUser').put(protect, tagPeopleInMoment);
router.route('/:momentId/tagUsers').get(protect, getAllTaggedUsers);

module.exports = router;
