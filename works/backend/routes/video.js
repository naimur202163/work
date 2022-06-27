const express = require('express');
const router = express.Router();
const {
  recommendedVideos,
  videosStaffPicks,
  getVideosByCategory,
  getVideosByStaffPickCategory,
  getVideosByFeaturedCategory,
  filterVideos,
} = require('../controllers/user');
const { protect } = require('../middleware/auth');
const {
  newVideo,
  getVideo,
  likeVideo,
  dislikeVideo,
  addComment,
  newView,
  searchVideo,
  editVideo,
  deleteVideo,
  selectCategory,
  videoAccessOverlays,
  getCategoryById,
  getVideoCategories,
  selectHashtag,
  savePPVUnlockInformation,
  saveTipAfterTwoInfo,
  getVideoCategoriesFeatured,
  postVideoCategory,
  deleteCloudinaryVideo,
  getCategoryByVideo,
} = require('../controllers/video');

router.route('/').post(protect, newVideo);
router.route('/').get(protect, recommendedVideos);
router.route('/staffPick').get(protect, videosStaffPicks);
router.route('/categories').get(getVideoCategories);
router.route('/category/:id').put(postVideoCategory);
router.route('/categories/featured').get(getVideoCategoriesFeatured);
router.route('/search').get(protect, searchVideo);
router.route('/category').get(selectCategory);
router.route('/videoAccessOverlays').get(videoAccessOverlays);
router.route('/hashtag').get(selectHashtag);
router
  .route('/staffPick/:categoryID')
  .get(protect, getVideosByStaffPickCategory);
router.route('/featured/:categoryID').get(protect, getVideosByFeaturedCategory);
router.route('/category/:id').get(getCategoryById);
router.route('/getCategoryByVideo/:videoId').get(getCategoryByVideo);

router
  .route('/getVideosByCategory/:categoryID')
  .get(protect, getVideosByCategory);
router.route('/:id').get(protect, getVideo);
router.route('/:id').put(protect, editVideo);
router.route('/:id').delete(protect, deleteVideo);
router.route('/cloudinary/:id').delete(protect, deleteCloudinaryVideo);
router.route('/:id/like').get(protect, likeVideo);
router.route('/:id/dislike').get(protect, dislikeVideo);
router.route('/:id/comment').post(protect, addComment);
router.route('/:id/view').get(protect, newView);
router.route('/filterVideos').post(protect, filterVideos);
router
  .route('/savePPVUnlockInformation')
  .post(protect, savePPVUnlockInformation);
router.route('/saveTipAfterTwoInfo').post(protect, saveTipAfterTwoInfo);
module.exports = router;
