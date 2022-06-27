const express = require('express');
const router = express.Router();
const {
  createUserSettings,
  deleteUserSettingsById,
  updateUserSettingsById,
  getAllUserSettingsById,
  getSingleUserSettingsById,
  updateVisitorBadge,
  updateUserSettingsByUserId,
  getSingleUserSettingByUserId,
} = require('../controllers/user-settings');

router.post('/', createUserSettings);
router.delete('/:id', deleteUserSettingsById);
router.patch('/:id', updateUserSettingsById);
router.get('/', getAllUserSettingsById);
router.get('/:id', getSingleUserSettingsById);
router.get('/userId/:userId', getSingleUserSettingByUserId);
router.post('/updateVisitorBadge', updateVisitorBadge);
updateUserSettingsByUserId;
router.post('/updateSettings', updateUserSettingsByUserId);

module.exports = router;
