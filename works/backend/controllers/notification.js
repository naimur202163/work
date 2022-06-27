const { Op } = require('sequelize');
const {
  User,
  Notification,
  NotificationType,
  NotificationCategory,
  Comment,
  Video,
  Subscription,
  UserDisplaySettings,
  VisitorBadge,
} = require('../sequelize');
const asyncHandler = require('../middleware/async-handler');
const Helper = require('../helper');
const { STATUS_CODE, MESSAGES, RESPONSE_STATUS } = require('../constants');

exports.getNotifications = asyncHandler(async (req, res, next) => {
  try {
    const { limit } = req.query;
    const notifications = await Notification.findAndCountAll({
      where: { notifierid: req.user.id },
      limit: limit,
      include: [
        { model: User, as: 'Actor', attributes: ['id', 'avatar', 'username', 'userrole'] },
        { model: User, as: 'Notifier', attributes: ['avatar', 'username'] },
        { model: NotificationType, attributes: ['name', 'sentence'] },
      ],
      order: [['createdAt', 'DESC']],
    });

    const counter = await Notification.count({
      where: { notifierid: req.user.id, readstatus: false },
    });

    if (notifications.rows.length > 0) {
      for (let index = 0; index < notifications.rows.length; index++) {
        const notification = notifications.rows[index];

        let message;
        let type = notification.NotificationType.name;
        if (type === 'new_comment') {
          let comment = await Comment.findOne({
            where: { id: notification.entityid },
            attributes: ['text'],
            include: [{ model: Video, attributes: ['title', 'id'] }],
          });
          message = `${notification.Actor === null ? 'User Removed' : notification.Actor.username} ${notification.NotificationType.sentence} ${comment !== null ? comment.Video.title : "some video"} (${comment !== null ? comment.text : "comment removed"})`;
          if (!!comment) {
            notification.setDataValue('videoId', comment.Video.id);
          }
        } else if (type === 'new_subscription') {
          let subscription = await Subscription.findOne({
            where: { id: notification.entityid },
          });
          message = `${notification.Actor === null ? 'User Removed' : notification.Actor.username} ${notification.NotificationType.sentence}`;
          notification.setDataValue(
            'subscriptionId',
            subscription && subscription.id ? subscription.id : ''
          );
        } else if (type === 'stripe_onboarding') {
          message = notification.NotificationType.sentence;
        } else if (type === 'tip') {
          message = notification.NotificationType.sentence
            .replace('$1', notification.Actor.username)
            .replace(
              '$2',
              notification.data.tip_amount
                ? notification.data.tip_amount.toFixed(2)
                : ''
            );
        } else if (type === 'stripe_connected') {
          message = notification.NotificationType.sentence;
        } else if (type === 'referral_payment') {
          let referralAmt = 0;
          let actor = notification.Actor;
          if (actor) {
            if (actor.userrole == 2) referralAmt = 2.50; // warrrior user
            if (actor.userrole == 1) referralAmt = 2.50; // tribe user
            message = notification.NotificationType.sentence
              .replace('<username_from_referral>', actor.username)
              .replace('2.50', referralAmt);
          }
        }

        if (!!notification.Actor) {
          const actorSettings = await UserDisplaySettings.findOne({
            where: { 'userId': notification.Actor.id },
            include: [{
              model: VisitorBadge,
              attributes: ['imgPath']
            }]
          })
          notification.Actor.setDataValue('badge', actorSettings.VisitorBadge.imgPath)
        }

        notification.setDataValue('message', message);
        if (index === notifications.rows.length - 1) {
          return res.status(STATUS_CODE.SUCCESS).json({
            success: true,
            data: { notifications: notifications, counter: counter },
          });
        }

      }
    } else {
      return res.status(STATUS_CODE.SUCCESS).json({ success: true });
    }
  } catch (e) {
    res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
});

exports.getUnreadCounter = asyncHandler(async (req, res, next) => {
  try {
    const counter = await Notification.count({
      where: { notifierid: req.user.id, readstatus: false },
    });
    return res
      .status(STATUS_CODE.SUCCESS)
      .json({ success: true, data: counter });
  } catch (e) {
    return res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
});

exports.markRead = asyncHandler(async (req, res, next) => {
  try {
    const notification = await Notification.update(req.body, {
      where: { id: req.params.id },
    });
    return res
      .status(STATUS_CODE.SUCCESS)
      .json({ success: true, data: notification });
  } catch (e) {
    return res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
});

exports.markAllRead = asyncHandler(async (req, res, next) => {
  try {
    const notifications = await Notification.update(
      { readstatus: true },
      {
        where: { notifierid: req.user.id },
      }
    );
    return res
      .status(STATUS_CODE.SUCCESS)
      .json({ success: true, data: notifications });
  } catch (e) {
    return res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
});

exports.getNotificationCategories = asyncHandler(async (req, res, next) => {
  try {
    const userRole = req.params.userRole;
    let whereCause = {};
    if (userRole === '0' || userRole === '1') {
      whereCause = {
        name: 'Comment',
      };
    }
    if (userRole === '2') {
      whereCause = {
        name: {
          [Op.or]: ['Comment', 'Subscription', 'tip'],
        },
      };
    }

    const categories = await NotificationCategory.findAll({
      where: whereCause,
      include: [{ model: NotificationType }],
    });
    res.status(STATUS_CODE.SUCCESS).json({ success: true, data: categories });
  } catch (e) {
    res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
});

exports.getNotificationTypes = asyncHandler(async (req, res, next) => {
  try {
    const types = await NotificationType.findAll({});
    res.status(STATUS_CODE.SUCCESS).json({ success: true, data: types });
  } catch (e) {
    res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
});

exports.createNotificationCategoryAndTypes = asyncHandler(
  async (req, res, next) => {
    try {
      let category, notificationCategory;
      notificationCategory = await NotificationCategory.findOne({
        where: { name: 'Comment' },
      });
      if (notificationCategory == null) {
        category = await NotificationCategory.create({
          name: 'Comment',
          description: 'Notification For Comment Operations',
        });
        let type;
        type = await NotificationType.create({
          name: 'new_comment',
          sentence: 'commented on:',
          description: 'Notification For New Comment',
          categoryid: category.id,
        });
      }
      // notificationCategory = await NotificationCategory.findOne({
      //   where: { name: 'Payment' },
      // });
      // if (notificationCategory == null) {
      //   category = await NotificationCategory.create({
      //     name: 'Payment',
      //     description: 'Notification For Payment Operations',
      //   });
      // }

      notificationCategory = await NotificationCategory.findOne({
        where: { name: 'Subscription' },
      });
      if (notificationCategory == null) {
        category = await NotificationCategory.create({
          name: 'Subscription',
          description: 'Notification For Subscription Operations',
        });
        let type;
        type = await NotificationType.create({
          name: 'new_subscription',
          sentence: ' has followed your Channel Stream',
          description: 'Notification For New Subscription',
          categoryid: category.id,
        });
      }
      const categories = await NotificationCategory.findAll({
        include: [{ model: NotificationType }],
      });
      res.status(STATUS_CODE.SUCCESS).json({ success: true, data: categories });
    } catch (e) {
      res.status(STATUS_CODE.ERROR).json({ message: e.message });
    }
  }
);
