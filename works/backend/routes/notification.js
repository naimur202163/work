const express = require("express");
const router = express.Router();
const {
  createNotificationCategoryAndTypes,
  getNotificationCategories,
  getNotificationTypes,
  getNotifications,
  getUnreadCounter,
  markRead,
  markAllRead
} = require("../controllers/notification");
const { protect } = require("../middleware/auth");

router.route("/categories/:userRole").get(getNotificationCategories);
router.route("/types").get(getNotificationTypes);
router.route("/").get(protect,getNotifications);
router.route("/unread-count").get(protect,getUnreadCounter);
router.route("/mark-read/:id").put(protect,markRead);
router.route("/mark-all-read").get(protect,markAllRead);
router.route("/create-categories-types").get(createNotificationCategoryAndTypes);

module.exports = router;
