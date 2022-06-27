const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  createNewSeries,
  getSeriesById,
  updateSeriesById,
  deleteSeriesById,
  getAllSeriesOfUser,
  getAllSeries,
  addVideoToSeries,
  removeVideoFromSeries,
  dragDropSeriesVideos,
  getAllPurchasedSeries,
  getSinglePurchasedCourse,
  createSeriesProgress,
  updateSeriesProgress,
} = require('../controllers/series');

router.route('/').post(protect, createNewSeries);
router.route('/get-series').get(protect, getAllSeries);
router.route('/getUserSeries/:username').get(protect, getAllSeriesOfUser);
router.route('/purchasedSeries').get(protect, getAllPurchasedSeries);
router.route('/purchasedSeries/:id').get(protect, getSinglePurchasedCourse);
router.route('/seriesProgress/:seriesId').post(protect, createSeriesProgress);
router
  .route('/seriesProgress/:seriesId/:videoId')
  .patch(protect, updateSeriesProgress);
router.route('/:seriesId').patch(protect, updateSeriesById);
router.route('/:seriesId').delete(protect, deleteSeriesById);
router.route('/:seriesId').get(protect, getSeriesById);

// video routes
router.route('/:seriesId/addVideo').post(protect, addVideoToSeries);
router.route('/:seriesId/removeVideo').post(protect, removeVideoFromSeries);

// drag & drop videos
router.route('/:seriesId/dragDrop').post(protect, dragDropSeriesVideos);

module.exports = router;
