const express = require('express');
const router = express.Router();
const {
  login,
  loginGoogle,
  findFacebookId,
  loginFacebook,
  signup,
  me,
  isEmailExist,
  isUserNameExist,
  verifyEmail,
  findGoogleId,
  isReferralCodeExist,
} = require('../controllers/auth');
const { protect } = require('../middleware/auth');

router.route('/signup').post(signup);
router.route('/isEmailExist').get(isEmailExist);
router.route('/isUserNameExist').get(isUserNameExist);
router.route('/isReferralCodeExist').get(isReferralCodeExist);
router.route('/login').post(login);
router.route('/google/:googleId').get(findGoogleId);
router.route('/login/google').post(loginGoogle);
router.route('/facebook/:facebookId').get(findFacebookId);
router.route('/login/facebook').post(loginFacebook);
router.route('/me').get(protect, me);

module.exports = router;
