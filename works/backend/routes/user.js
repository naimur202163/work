const express = require('express');
const { editOrCreateFilterSetting, getKarmaFilterByUserId } = require('../controllers/karmaFilterSettings');
const router = express.Router();
const {
  toggleSubscribe,
  getFeed,
  editUser,
  editCoverPhoto,
  editAvatar,
  searchUser,
  getProfile,
  recommendChannels,
  getLikedVideos,
  getHistory,
  spaceLeft,
  updateNotification,
  verifyEmail,
  sendPasswordResetLink,
  resetPassword,
  moreVideos,
  getUserTransactions,
  getWarriorPageBanner,
  getFeaturedWarriors,
  contactIsutra,
  getLibraryVideos,
  deleteUser,
  getIsutraMarketingBanners,
  getKarmaSentTranansations,
  checkResetPasswordTokenExpiry,
  newCategoryRequest,
  videoReport,
  addFlagType,
  getFlagTypes,
} = require('../controllers/user');
const { protect, withAndWithoutLogin } = require('../middleware/auth');

router.route('/getKarmaFilterSettingByUserId/:filterType').get(protect, getKarmaFilterByUserId);
router.route('/getFlagTypes').get(protect, getFlagTypes);
router.route('/libraryVideos').get(protect, getLibraryVideos);
router.route('/contact_us').post(protect, contactIsutra);
router.route('/warrior_banner').get(withAndWithoutLogin, getWarriorPageBanner);
router
  .route('/marketing_banner')
  .get(withAndWithoutLogin, getIsutraMarketingBanners);
router.route('/featured_warrior').get(withAndWithoutLogin, getFeaturedWarriors);
router.route('/').put(protect, editUser);
router.route('/userVideos/:userID').get(protect, moreVideos);
router.route('/editCoverPhoto').put(protect, editCoverPhoto);
router.route('/editAvatar').put(protect, editAvatar);
router.route('/').get(protect, recommendChannels);
router.route('/likedVideos').get(protect, getLikedVideos);
router.route('/history').get(protect, getHistory);
router.route('/feed').get(protect, getFeed);
router.route('/search').get(protect, searchUser);
router.route('/:userIdOrUserName').get(withAndWithoutLogin, getProfile);
router.route('/:id/togglesubscribe').get(protect, toggleSubscribe);
router.route('/userTransactions').post(protect, getUserTransactions);
router.route('/karmaSentByUser').post(protect, getKarmaSentTranansations);
router.route('/space-left/:id').get(protect, spaceLeft);
router.route('/update-notification/:id').put(protect, updateNotification);
router.route('/verifyEmail').post(verifyEmail);
router.route('/forgot_password').post(sendPasswordResetLink);
router.route('/reset_password').post(resetPassword);
router.route('/delete_user').post(deleteUser);
router.route('/checkResetPWTokenExpiry').post(checkResetPasswordTokenExpiry);
router.route('/newCategoryRequest').post(protect, newCategoryRequest);
router.route('/videoReportByUser').post(protect, videoReport);
router.route('/addFlagType').post(protect, addFlagType);
router.route('/createOrEditKarmaFilterSetting').post(protect, editOrCreateFilterSetting);

module.exports = router;
