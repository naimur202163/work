const { Op, Sequelize } = require('sequelize');
const {
  VideoLike,
  Video,
  User,
  Subscription,
  View,
  UserNotificationStatus,
  NotificationType,
  Notification,
  VideoHashTag,
  HashTag,
  NotificationCategory,
  VideoAccessOverlay,
  StoragePackages,
  PPVUnlocks,
  WidgetBannerSlider,
  WidgetFeaturedWarrior,
  UserDisplaySettings,
  VisitorBadge,
  Library,
  OnlineUsers,
  VideoCategoryRequest,
  ContentFlag,
  FlagType,
  VideoSubCategories,
  VideoCategory,
  KarmaFilterSettings
} = require('../sequelize');
const cloudinary = require('cloudinary');
const bcrypt = require('bcryptjs');
const asyncHandler = require('../middleware/async-handler');
const { WEB_SOCKET_EVENTS } = require('../constants/web-socket-keys');
const {
  STATUS_CODE,
  MESSAGES,
  RESPONSE_STATUS,
  EMAIL_STATUS,
  EMAIL_TYPE,
  FILTER_TYPES,
} = require('../constants');
const { v4: uuidv4 } = require('uuid');
const { addToQue } = require('../services/EmailService/addToQue');
const Stripe = require('stripe');
const mailer = require('../services/EmailService/mailer');
const { getLastWeeksDate, getPreviousMonth } = require('../utils');
const { isTokenExpired } = require('../utils');
const config = require('../config/config');

const stripe = Stripe(config.STRIPE_SECRET_KEY);

exports.toggleSubscribe = asyncHandler(async (req, res, next) => {
  try {
    if (req.user.id === req.params.id) {
      return next({
        message: MESSAGES.USER.CANNOT_SUBSCRIBE_OWN_CHANNEL,
        statusCode: STATUS_CODE.BAD,
      });
    }

    const user = await User.findByPk(req.params.id);

    if (!user) {
      return next({
        message: MESSAGES.USER.NOT_FOUND,
        statusCode: STATUS_CODE.NOT_FOUND,
      });
    }

    const isSubscribed = await Subscription.findOne({
      where: {
        subscriber: req.user.id,
        subscribeTo: req.params.id,
      },
    });

    if (isSubscribed) {
      await Subscription.destroy({
        where: {
          subscriber: req.user.id,
          subscribeTo: req.params.id,
        },
      });
    } else {
      const subscription = await Subscription.create({
        subscriber: req.user.id,
        subscribeTo: req.params.id,
      });

      const notificationCategory = await NotificationCategory.findOne({
        where: { name: 'Subscription' },
      });
      const userNotificationStatus = await UserNotificationStatus.findOne({
        where: {
          userId: user.id,
          categoryId: notificationCategory.id,
        },
      });
      if (userNotificationStatus && userNotificationStatus.status) {
        const notificationType = await NotificationType.findOne({
          where: { name: 'new_subscription' },
        });
        const notification = await Notification.create({
          actorid: req.user.id,
          notifierid: req.params.id,
          readStatus: 0,
          entityid: subscription.id,
          typeid: notificationType.id,
        });
        sendNotificationToOnlineUsers(
          null,
          WEB_SOCKET_EVENTS.INCREMENT_NOTIFICATION_COUNT,
          req.params.id
        );
      }
    }

    res.status(STATUS_CODE.SUCCESS).json({ success: true, data: {} });
  } catch (e) {
    res.status(STATUS_CODE.BAD).json({ message: e.message });
  }
});

exports.getFeed = asyncHandler(async (req, res, next) => {
  try {
    const subscribedTo = await Subscription.findAll({
      where: {
        subscriber: req.user.id,
      },
    });

    const subscriptions = subscribedTo.map((sub) => sub.subscribeTo);

    const feed = await Video.findAll({
      include: {
        model: User,
        attributes: ['id', 'avatar', 'username', 'stripe_account_id'],
      },
      where: {
        userId: {
          [Op.in]: subscriptions,
        },
      },
      order: [['createdAt', 'DESC']],
    });

    if (!feed.length) {
      return res
        .status(STATUS_CODE.SUCCESS)
        .json({ success: true, data: feed });
    }

    feed.forEach(async (video, index) => {
      const views = await View.count({ where: { videoId: video.id } });
      video.setDataValue('views', views);

      if (index === feed.length - 1) {
        return res
          .status(STATUS_CODE.SUCCESS)
          .json({ success: true, data: feed });
      }
    });
  } catch (e) {
    res.status(STATUS_CODE.BAD).json({ message: e.message });
  }
});

exports.editUser = asyncHandler(async (req, res, next) => {
  try {
    // handle Reset password
    let newPassword;
    if (!!req.body.password) {
      const salt = await bcrypt.genSalt(10);
      newPassword = await bcrypt.hash(req.body.password, salt);
      await User.update(
        { ...req.body, password: newPassword },
        { where: { id: req.user.id } }
      );
    } else {
      await User.update(req.body, {
        where: { id: req.user.id },
      });
    }

    const user = await User.findByPk(req.user.id, {
      attributes: [
        'id',
        'firstname',
        'lastname',
        'username',
        'channelDescription',
        'avatar',
        'avatarPublicId',
        'cover',
        'coverPublicId',
        'email',
        'stripe_account_id',
        'stripe_customer_id',
      ],
    });

    res.status(STATUS_CODE.SUCCESS).json({ success: true, data: user });
  } catch (e) {
    res.status(STATUS_CODE.BAD).json({ message: e.message });
  }
});

exports.updateNotification = asyncHandler(async (req, res, next) => {
  try {
    let notificationSetting = await UserNotificationStatus.findOne({
      where: {
        userId: req.user.id,
        categoryId: req.params.id,
      },
    });

    if (notificationSetting) {
      notificationSetting = await notificationSetting.update(req.body, {
        where: {
          userId: req.user.id,
          categoryId: req.params.id,
        },
      });
    } else {
      notificationSetting = await UserNotificationStatus.create({
        userId: req.user.id,
        categoryId: req.params.id,
        status: req.body.status,
      });
    }

    res
      .status(STATUS_CODE.SUCCESS)
      .json({ success: true, data: notificationSetting });
  } catch (e) {
    res.status(STATUS_CODE.BAD).json({ message: e.message });
  }
});

exports.editCoverPhoto = asyncHandler(async (req, res, next) => {
  try {
    const { url, publicId } = req.body;
    const photo = await User.findByPk(req.user.id, {
      attributes: ['coverPublicId'],
    });

    const { coverPublicId } = JSON.parse(JSON.stringify(photo, null, 4));

    if (coverPublicId) {
      cloudinary.v2.uploader.destroy(coverPublicId, (error, result) => { });
    }
    await User.update(
      { cover: url, coverPublicId: publicId },
      {
        where: { id: req.user.id },
      }
    );

    const user = await User.findByPk(req.user.id, {
      attributes: [
        'id',
        'firstname',
        'lastname',
        'username',
        'channelDescription',
        'avatar',
        'avatarPublicId',
        'cover',
        'coverPublicId',
        'email',
      ],
    });

    res.status(STATUS_CODE.SUCCESS).json({ success: true, data: user });
  } catch (e) {
    res.status(STATUS_CODE.BAD).json({ message: e.message });
  }
});

exports.editAvatar = asyncHandler(async (req, res, next) => {
  try {
    const { url, publicId } = req.body;

    const photo = await User.findByPk(req.user.id, {
      attributes: ['avatarPublicId'],
    });

    const { avatarPublicId } = JSON.parse(JSON.stringify(photo, null, 4));
    if (avatarPublicId) {
      // await cloudinary.v2.uploader.destroy(avatarPublicId);

      cloudinary.v2.uploader.destroy(avatarPublicId, (error, result) => { });
    }

    await User.update(
      { avatar: url, avatarPublicId: publicId },
      {
        where: { id: req.user.id },
      }
    );

    const user = await User.findByPk(req.user.id, {
      attributes: [
        'id',
        'firstname',
        'lastname',
        'username',
        'channelDescription',
        'avatar',
        'avatarPublicId',
        'cover',
        'coverPublicId',
        'email',
      ],
    });

    res.status(STATUS_CODE.SUCCESS).json({ success: true, data: user });
  } catch (e) {
    res.status(STATUS_CODE.BAD).json({ message: e.message });
  }
});

exports.searchUser = asyncHandler(async (req, res, next) => {
  try {
    if (!req.query.searchterm) {
      return next({
        message: 'Please enter your search term',
        statusCode: 400,
      });
    }

    const users = await User.findAll({
      attributes: ['id', 'username', 'avatar', 'channelDescription'],
      where: {
        username: {
          [Op.substring]: req.query.searchterm,
        },
        userrole: 2,
      },
    });

    if (!users.length)
      return res
        .status(STATUS_CODE.SUCCESS)
        .json({ success: true, data: users });

    users.forEach(async (user, index) => {
      const subscribersCount = await Subscription.count({
        where: { subscribeTo: user.id },
      });

      const videosCount = await Video.count({
        where: { userId: user.id },
      });

      const isSubscribed = await Subscription.findOne({
        where: {
          [Op.and]: [{ subscriber: req.user.id }, { subscribeTo: user.id }],
        },
      });

      const userSettings = await UserDisplaySettings.findOne({
        where: {
          userId: user.id,
        },
        include: [
          {
            model: VisitorBadge,
            attributes: ['imgPath'],
          },
        ],
      });

      const isMe = req.user.id === user.id;

      user.setDataValue('subscribersCount', subscribersCount);
      user.setDataValue('videosCount', videosCount);
      user.setDataValue('isSubscribed', !!isSubscribed);
      user.setDataValue('isMe', isMe);
      user.setDataValue('badge', userSettings.VisitorBadge.imgPath);
      user.setDataValue('userSettings', userSettings);

      if (index === users.length - 1) {
        return res
          .status(STATUS_CODE.SUCCESS)
          .json({ success: true, data: users });
      }
    });
  } catch (e) {
    res.status(STATUS_CODE.BAD).json({ message: e.message });
  }
});

exports.getProfile = asyncHandler(async (req, res, next) => {
  try {
    const { id: loggedInUserId = null, userrole: userRole = 0 } =
      req.user || {};
    const { userIdOrUserName } = req.params;
    let whereCondition = {};
    const uuidV4Regex =
      /^[A-F\d]{8}-[A-F\d]{4}-4[A-F\d]{3}-[89AB][A-F\d]{3}-[A-F\d]{12}$/i;
    if (uuidV4Regex.test(userIdOrUserName)) {
      whereCondition = { id: userIdOrUserName };
    } else {
      whereCondition = Sequelize.where(
        Sequelize.fn('lower', Sequelize.col('username')),
        Sequelize.fn('lower', userIdOrUserName)
      );
    }

    const user = await User.findOne({
      where: whereCondition,
      attributes: [
        'id',
        'firstname',
        'lastname',
        'username',
        'cover',
        'avatar',
        'email',
        'channelDescription',
        'stripe_account_id',
        'stripe_customer_id',
        'storagePackageId',
        'userrole',
        'tagline',
      ],
    });

    if (!user) {
      return next({
        message: MESSAGES.USER.NOT_FOUND,
        statusCode: STATUS_CODE.NOT_FOUND,
      });
    }

    user.setDataValue(
      'userNotificationStatus',
      await getUserNotificationStatus(UserNotificationStatus, user.id)
    );

    const subscribersCount = await Subscription.count({
      where: { subscribeTo: user.id },
    });
    user.setDataValue('subscribersCount', subscribersCount);

    const isMe = loggedInUserId === user.id;
    user.setDataValue('isMe', isMe);

    const isSubscribed = await Subscription.findOne({
      where: {
        [Op.and]: [{ subscriber: loggedInUserId }, { subscribeTo: user.id }],
      },
    });
    user.setDataValue('isSubscribed', !!isSubscribed);

    // find the channels this user is subscribed to
    const subscriptions = await Subscription.findAll({
      where: { subscriber: user.id },
    });
    const channelIds = subscriptions.map((sub) => sub.subscribeTo);

    const channels = await User.findAll({
      attributes: ['id', 'avatar', 'username', 'userrole', 'createdAt'],
      where: {
        id: { [Op.in]: channelIds },
      },
    });

    for (let index = 0; index < channels.length; index++) {
      const channel = channels[index];
      const subscribersCount = await Subscription.count({
        where: { subscribeTo: channel.id },
      });

      channel.setDataValue('subscribersCount', subscribersCount);
      const userSetting = await UserDisplaySettings.findOne({
        where: { userId: channel.id },
        include: VisitorBadge,
      });

      channel.setDataValue('visitorBadge', userSetting.VisitorBadge);
    }

    user.setDataValue('channels', channels);

    const videos = await Video.findAll({
      where: { userId: user.id },
      attributes: [
        'id',
        'title',
        'description',
        'thumbnail',
        'userId',
        'keyVideoAccess',
        'createdAt',
        'amount',
        'customThumbnail',
        'filesize',
        'featuredWarriorPortal',
        'videoLength',
        'url',
        [
          Sequelize.literal(`CASE
        when "Video"."userId" = ${!loggedInUserId ? loggedInUserId : `'${loggedInUserId}'`
            } then false 
        WHEN "PPVUnlocks"."id" is null and "Video"."keyVideoAccess" = 2 THEN true
        when "Video"."keyVideoAccess" = 0 then false
        when "Video"."keyVideoAccess" = 1 and ${+userRole} = 0 then true
        else false
        END`),
          'isVideoLocked',
        ],
      ],
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: PPVUnlocks,
          as: 'PPVUnlocks',
          where: { userId: loggedInUserId },
          attributes: [],
          required: false,
        },
        {
          model: User,
          attributes: ['id', 'avatar', 'username', 'stripe_account_id'],
        },
        {
          model: VideoHashTag,
        },
        {
          model: VideoAccessOverlay,
          attributes: [
            'keyVideoAccess',
            'name',
            'description',
            'imgPathFreeLoader',
            'imgPathMember',
          ],
        },
      ],
    });

    user.setDataValue('totalFileSize', 0);
    if (user.storagePackageId) {
      const storagePackage = await StoragePackages.findByPk(
        user.storagePackageId,
        {
          attributes: ['size'],
        }
      );
      user.setDataValue(
        'totalFileSize',
        storagePackage ? storagePackage.size : 0
      );
    }

    const userSettings = await UserDisplaySettings.findOne({
      where: { userId: user.id },
      include: [
        {
          model: VisitorBadge,
          attributes: ['imgPath'],
        },
      ],
    });
    user.setDataValue('userSettings', userSettings);
    user.setDataValue('badge', userSettings.VisitorBadge.imgPath);

    let usedFileSize = 0;
    user.setDataValue('usedFileSize', usedFileSize);
    for (let index = 0; index < videos.length; index++) {
      const video = videos[index];
      const views = await View.count({ where: { videoId: video.id } });
      video.setDataValue('views', views);

      const { VideoHashTags } = video;
      if (VideoHashTags.length > 0) {
        let hashTagIds = [];
        for (let index = 0; index < VideoHashTags.length; index++) {
          const tag = VideoHashTags[index];
          hashTagIds.push(tag.hashTagId);
        }
        const hashTags = await HashTag.findAll({
          where: {
            id: {
              [Op.or]: hashTagIds,
            },
          },
          attributes: ['name'],
        });

        video.setDataValue('hashTags', hashTags);
      }
      usedFileSize =
        usedFileSize + (video.filesize ? parseFloat(video.filesize) : 0);
      if (index === videos.length - 1) {
        user.setDataValue('videos', videos);
        user.setDataValue('usedFileSize', usedFileSize);
      }
    }
    return res.status(STATUS_CODE.SUCCESS).json({ success: true, data: user });
  } catch (e) {
    res.status(STATUS_CODE.BAD).json({ message: e.message });
  }
});

exports.recommendedVideos = asyncHandler(async (req, res, next) => {
  try {
    const { featured } = req.query;
    const { id: userId, userrole: userRole } = req.user;
    let videos;
    if (featured === 'true') {
      videos = await Video.findAll({
        attributes: [
          'id',
          'title',
          'description',
          'thumbnail',
          'userId',
          'categoryId',
          'keyVideoAccess',
          'createdAt',
          'amount',
          'videoLength',
          [
            Sequelize.literal(`CASE
          When "Video"."userId" = '${userId}' then false 
          WHEN "PPVUnlocks"."id" is null and "Video"."keyVideoAccess" = 2 THEN true
          when "Video"."keyVideoAccess" = 0 then false
          when "Video"."keyVideoAccess" = 1 and ${+userRole} = 0 then true
          else false
          END`),
            'isVideoLocked',
          ],
        ],
        include: [
          {
            model: PPVUnlocks,
            as: 'PPVUnlocks',
            where: { userId },
            attributes: [],
            required: false,
          },
          {
            model: User,
            attributes: ['id', 'avatar', 'username', 'stripe_account_id'],
          },
          {
            model: VideoAccessOverlay,
            attributes: [
              'keyVideoAccess',
              'name',
              'description',
              'imgPathFreeLoader',
              'imgPathMember',
            ],
          },
        ],
        where: {
          featured: true,
        },
        order: [
          ['featuredFormorder', 'ASC'],
          ['createdAt', 'DESC'],
        ],
      });
    } else {
      videos = await Video.findAll({
        attributes: [
          'id',
          'title',
          'description',
          'thumbnail',
          'filesize',
          'userId',
          'keyVideoAccess',
          'categoryId',
          'createdAt',
          'amount',
          'videoLength',
          [
            Sequelize.literal(`CASE
          When "Video"."userId" = '${userId}' then false 
          WHEN "PPVUnlocks"."id" is null and "Video"."keyVideoAccess" = 2 THEN true
          when "Video"."keyVideoAccess" = 0 then false
          when "Video"."keyVideoAccess" = 1 and ${+userRole} = 0 then true
          else false
          END`),
            'isVideoLocked',
          ],
        ],
        include: [
          {
            model: PPVUnlocks,
            as: 'PPVUnlocks',
            where: { userId },
            attributes: [],
            required: false,
          },
          {
            model: User,
            attributes: ['id', 'avatar', 'username', 'stripe_account_id'],
          },
          {
            model: VideoAccessOverlay,
            attributes: [
              'keyVideoAccess',
              'name',
              'description',
              'imgPathFreeLoader',
              'imgPathMember',
            ],
          },
        ],
        order: [['createdAt', 'DESC']],
      });
    }
    if (!videos.length) {
      return res
        .status(STATUS_CODE.SUCCESS)
        .json({ success: true, data: videos });
    }

    videos.forEach(async (video, index) => {
      const { id: videoId } = video;
      const views = await View.count({ where: { videoId } });
      video.setDataValue('views', views);

      const videoCategory = await VideoCategory.findOne({
        where: { id: video.categoryId },
      });
      video.setDataValue('category', videoCategory?.name || '');

      const userSettings = await UserDisplaySettings.findOne({
        where: { userId: video.User.id },
        include: [
          {
            model: VisitorBadge,
            attributes: ['imgPath'],
          },
        ],
      });
      video.setDataValue('userSettings', userSettings);

      if (index === videos.length - 1) {
        return res
          .status(STATUS_CODE.SUCCESS)
          .json({ success: true, data: videos });
      }
    });
  } catch (e) {
    res.status(STATUS_CODE.BAD).json({ message: e.message });
  }
});

exports.videosStaffPicks = asyncHandler(async (req, res, next) => {
  try {
    const { id: userId, userrole: userRole } = req.user;
    const videos = await Video.findAll({
      attributes: [
        'id',
        'title',
        'description',
        'thumbnail',
        'filesize',
        'userId',
        'keyVideoAccess',
        'createdAt',
        'amount',
        [
          Sequelize.literal(`CASE
          when "Video"."userId" = '${userId}' then false
          WHEN "PPVUnlocks"."id" is null and "Video"."keyVideoAccess" = 2 THEN true
          when "Video"."keyVideoAccess" = 0 then false
          when "Video"."keyVideoAccess" = 1 and ${+userRole} = 0 then true
          else false
        END`),
          'isVideoLocked',
        ],
      ],
      include: [
        {
          model: PPVUnlocks,
          as: 'PPVUnlocks',
          where: { userId },
          attributes: [],
          required: false,
        },
        {
          model: User,
          attributes: ['id', 'avatar', 'username', 'stripe_account_id'],
        },
        {
          model: VideoAccessOverlay,
          attributes: [
            'keyVideoAccess',
            'name',
            'description',
            'imgPathFreeLoader',
            'imgPathMember',
          ],
        },
      ],
      where: {
        staffPick: true,
      },
      order: [
        ['staffPickFormOrder', 'ASC'],
        ['createdAt', 'DESC'],
      ],
    });

    if (!videos.length)
      return res
        .status(STATUS_CODE.SUCCESS)
        .json({ success: false, videos: null });

    videos.forEach(async (video, index) => {
      const { id: videoId } = video;
      const views = await View.count({ where: { videoId } });
      video.setDataValue('views', views);
      const userSettings = await UserDisplaySettings.findOne({
        where: { userId: video.User.id },
        include: [
          {
            model: VisitorBadge,
            attributes: ['imgPath'],
          },
        ],
      });
      video.setDataValue('userSettings', userSettings);

      if (index === videos.length - 1) {
        return res
          .status(STATUS_CODE.SUCCESS)
          .json({ success: true, data: videos });
      }
    });
  } catch (e) {
    res.status(STATUS_CODE.BAD).json({ message: e.message });
  }
});

exports.getVideosByFeaturedCategory = asyncHandler(async (req, res, next) => {
  try {
    const { id: userId, userrole: userRole } = req.user;
    const { categoryID: categoryId } = req.params;

    const videos = await Video.findAll({
      attributes: [
        'id',
        'title',
        'description',
        'thumbnail',
        'userId',
        'keyVideoAccess',
        'createdAt',
        'amount',
        'videoLength',
        [
          Sequelize.literal(`CASE
        when "Video"."userId" = '${userId}' then false
        WHEN "PPVUnlocks"."id" is null and "Video"."keyVideoAccess" = 2 THEN true
        when "Video"."keyVideoAccess" = 0 then false
        when "Video"."keyVideoAccess" = 1 and ${+userRole} = 0 then true
        else false
        END`),
          'isVideoLocked',
        ],
      ],
      include: [
        {
          model: PPVUnlocks,
          as: 'PPVUnlocks',
          where: { userId },
          attributes: [],
          required: false,
        },
        {
          model: User,
          attributes: ['id', 'avatar', 'username', 'stripe_account_id'],
        },
        {
          model: VideoAccessOverlay,
          attributes: [
            'keyVideoAccess',
            'name',
            'description',
            'imgPathFreeLoader',
            'imgPathMember',
          ],
        },
      ],
      where: {
        featured: true,
        categoryId,
      },
      order: [
        ['featuredFormorder', 'ASC'],
        ['createdAt', 'DESC'],
      ],
    });

    if (!videos.length)
      return res
        .status(STATUS_CODE.SUCCESS)
        .json({ success: false, videos: null });

    videos.forEach(async (video, index) => {
      const { id: videoId } = video;
      const views = await View.count({ where: { videoId } });
      video.setDataValue('views', views);

      const userSettings = await UserDisplaySettings.findOne({
        where: { userId: video.User.id },
        include: [
          {
            model: VisitorBadge,
            attributes: ['imgPath'],
          },
        ],
      });
      video.setDataValue('userSettings', userSettings);

      if (index === videos.length - 1) {
        return res
          .status(STATUS_CODE.SUCCESS)
          .json({ success: true, data: videos });
      }
    });
  } catch (e) {
    res.status(STATUS_CODE.BAD).json({ message: e.message });
  }
});

exports.getVideosByStaffPickCategory = asyncHandler(async (req, res, next) => {
  try {
    const { categoryID: categoryId } = req.params;
    const { id: userId, userrole: userRole } = req.user;

    const videos = await Video.findAll({
      attributes: [
        'id',
        'title',
        'description',
        'thumbnail',
        'filesize',
        'userId',
        'keyVideoAccess',
        'createdAt',
        'amount',
        'videoLength',
        [
          Sequelize.literal(`CASE
        when "Video"."userId" = '${userId}' then false
        WHEN "PPVUnlocks"."id" is null and "Video"."keyVideoAccess" = 2 THEN true
        when "Video"."keyVideoAccess" = 0 then false
        when "Video"."keyVideoAccess" = 1 and ${+userRole} = 0 then true
        else false
        END`),
          'isVideoLocked',
        ],
      ],
      include: [
        {
          model: PPVUnlocks,
          as: 'PPVUnlocks',
          where: { userId },
          attributes: [],
          required: false,
        },
        {
          model: User,
          attributes: ['id', 'avatar', 'username', 'stripe_account_id'],
        },
        {
          model: VideoAccessOverlay,
          attributes: [
            'keyVideoAccess',
            'name',
            'description',
            'imgPathFreeLoader',
            'imgPathMember',
          ],
        },
      ],
      where: {
        staffPick: true,
        categoryId,
      },
      order: [['createdAt', 'DESC']],
    });

    if (!videos.length)
      return res
        .status(STATUS_CODE.SUCCESS)
        .json({ success: false, videos: null });

    videos.forEach(async (video, index) => {
      const { id: videoId } = video;
      const views = await View.count({ where: { videoId } });
      video.setDataValue('views', views);

      const userSettings = await UserDisplaySettings.findOne({
        where: { userId: video.User.id },
        include: [
          {
            model: VisitorBadge,
            attributes: ['imgPath'],
          },
        ],
      });
      video.setDataValue('userSettings', userSettings);

      if (index === videos.length - 1) {
        return res
          .status(STATUS_CODE.SUCCESS)
          .json({ success: true, data: videos });
      }
    });
  } catch (e) {
    res.status(STATUS_CODE.BAD).json({ message: e.message });
  }
});

exports.recommendChannels = asyncHandler(async (req, res, next) => {
  try {
    const channels = await User.findAll({
      attributes: [
        'id',
        'username',
        'avatar',
        'userrole',
        'channelDescription',
      ],
      where: {
        id: {
          [Op.not]: req.user.id,
        },
        userrole: 2,
      },
    });

    if (!channels.length)
      return res
        .status(STATUS_CODE.SUCCESS)
        .json({ success: true, data: channels });

    channels.forEach(async (channel, index) => {
      const subscribersCount = await Subscription.count({
        where: { subscribeTo: channel.id },
      });
      channel.setDataValue('subscribersCount', subscribersCount);

      const isSubscribed = await Subscription.findOne({
        where: {
          subscriber: req.user.id,
          subscribeTo: channel.id,
        },
      });

      const userSettings = await UserDisplaySettings.findOne({
        where: { userId: channel.id },
        attributes: [],
        include: {
          model: VisitorBadge,
          attributes: ['imgPath'],
        },
      });
      if (!userSettings)
        channel.setDataValue('badge', userSettings.VisitorBadge.imgPath);
      channel.setDataValue('isSubscribed', !!isSubscribed);

      const videosCount = await Video.count({ where: { userId: channel.id } });
      channel.setDataValue('videosCount', videosCount);

      if (index === channels.length - 1) {
        return res
          .status(STATUS_CODE.SUCCESS)
          .json({ success: true, data: channels });
      }
    });
  } catch (e) {
    res.status(STATUS_CODE.BAD).json({ message: e.message });
  }
});

exports.getVideosByCategory = asyncHandler(async (req, res, next) => {
  try {
    const { categoryID } = req.params;
    const { id: userId, userrole: userRole } = req.user;

    const vsc = await VideoSubCategories.findAll({
      attributes: ['videoId'],
      where: {
        videoCategoryId: categoryID,
      },
      raw: true,
    });

    const videoIdsArr = vsc.map((v) => v.videoId);
    const uniqueVidIds = [...new Set(videoIdsArr)];

    const videos = await Video.findAll({
      attributes: [
        'id',
        'title',
        'description',
        'thumbnail',
        'filesize',
        'userId',
        'keyVideoAccess',
        'createdAt',
        'amount',
        'videoLength',
        [
          Sequelize.literal(`CASE
        when "Video"."userId" = '${userId}' then false
        WHEN "PPVUnlocks"."id" is null and "Video"."keyVideoAccess" = 2 THEN true
        when "Video"."keyVideoAccess" = 0 then false
        when "Video"."keyVideoAccess" = 1 and ${+userRole} = 0 then true
        else false
        END`),
          'isVideoLocked',
        ],
      ],
      include: [
        {
          model: PPVUnlocks,
          as: 'PPVUnlocks',
          where: { userId },
          attributes: [],
          required: false,
        },
        {
          model: User,
          attributes: ['id', 'avatar', 'username', 'stripe_account_id'],
        },
        {
          model: VideoAccessOverlay,
          attributes: [
            'keyVideoAccess',
            'name',
            'description',
            'imgPathFreeLoader',
            'imgPathMember',
          ],
        },
      ],
      where: {
        id: uniqueVidIds,
      },
      order: [['createdAt', 'DESC']],
    });

    if (!videos.length)
      return res
        .status(STATUS_CODE.SUCCESS)
        .json({ success: false, videos: null });

    videos.forEach(async (video, index) => {
      const { id: videoId } = video;
      const views = await View.count({ where: { videoId } });
      video.setDataValue('views', views);

      const userSettings = await UserDisplaySettings.findOne({
        where: { userId: video.User.id },
        include: [
          {
            model: VisitorBadge,
            attributes: ['imgPath'],
          },
        ],
      });
      video.setDataValue('userSettings', userSettings);

      if (index === videos.length - 1) {
        return res
          .status(STATUS_CODE.SUCCESS)
          .json({ success: true, data: videos });
      }
    });
  } catch (e) {
    res.status(STATUS_CODE.BAD).json({ message: e.message });
  }
});

exports.getLikedVideos = asyncHandler(async (req, res, next) => {
  try {
    const { id: userId, userrole: userRole } = req.user;
    const videoRelations = await VideoLike.findAll({
      where: {
        userId,
        like: {
          [Op.gt]: 0, // soon to be replaced by
        },
      },
      order: [['createdAt', 'ASC']],
    });

    const videoIds = videoRelations.map(
      (videoRelation) => videoRelation.videoId
    );

    const videos = await Video.findAll({
      attributes: [
        'id',
        'title',
        'description',
        'createdAt',
        'thumbnail',
        'url',
        'amount',
        'videoLength',
        [
          Sequelize.literal(`CASE
        when "Video"."userId" = '${userId}' then false
        WHEN "PPVUnlocks"."id" is null and "Video"."keyVideoAccess" = 2 THEN true
        when "Video"."keyVideoAccess" = 0 then false
        when "Video"."keyVideoAccess" = 1 and ${+userRole} = 0 then true
        else false
        END`),
          'isVideoLocked',
        ],
      ],
      include: [
        {
          model: PPVUnlocks,
          as: 'PPVUnlocks',
          where: { userId },
          attributes: [],
          required: false,
        },
        {
          model: User,
          attributes: ['id', 'username', 'avatar', 'stripe_account_id'],
        },
        {
          model: VideoAccessOverlay,
          attributes: [
            'keyVideoAccess',
            'name',
            'description',
            'imgPathFreeLoader',
            'imgPathMember',
          ],
        },
      ],
      where: {
        id: {
          [Op.in]: videoIds,
        },
      },
    });

    if (!videos.length) {
      return res
        .status(STATUS_CODE.SUCCESS)
        .json({ success: true, data: videos });
    }

    videos.forEach(async (video, index) => {
      const { id: videoId } = video;
      const views = await View.count({ where: { videoId } });
      video.setDataValue('views', views);

      const userSettings = await UserDisplaySettings.findOne({
        where: { userId: video.User.id },
        include: [
          {
            model: VisitorBadge,
            attributes: ['imgPath'],
          },
        ],
      });
      video.setDataValue('userSettings', userSettings);

      if (index === videos.length - 1) {
        return res
          .status(STATUS_CODE.SUCCESS)
          .json({ success: true, data: videos });
      }
    });
  } catch (e) {
    res.status(STATUS_CODE.BAD).json({ message: e.message });
  }
});

exports.getHistory = asyncHandler(async (req, res, next) => {
  try {
    const { id: userId, userrole: userRole } = req.user;
    const videoRelations = await View.findAll({
      where: { userId },
      order: [['createdAt', 'ASC']],
    });

    const videoIds = videoRelations.map(
      (videoRelation) => videoRelation.videoId
    );

    const videos = await Video.findAll({
      attributes: [
        'id',
        'title',
        'description',
        'createdAt',
        'thumbnail',
        'url',
        'amount',
        'videoLength',
        [
          Sequelize.literal(`CASE
        when "Video"."userId" = '${userId}' then false
        WHEN "PPVUnlocks"."id" is null and "Video"."keyVideoAccess" = 2 THEN true
        when "Video"."keyVideoAccess" = 0 then false
        when "Video"."keyVideoAccess" = 1 and ${+userRole} = 0 then true
        else false
        END`),
          'isVideoLocked',
        ],
      ],
      include: [
        {
          model: PPVUnlocks,
          as: 'PPVUnlocks',
          where: { userId },
          attributes: [],
          required: false,
        },
        {
          model: User,
          attributes: ['id', 'username', 'avatar', 'stripe_account_id'],
        },
        {
          model: VideoAccessOverlay,
          attributes: [
            'keyVideoAccess',
            'name',
            'description',
            'imgPathFreeLoader',
            'imgPathMember',
          ],
        },
      ],
      where: {
        id: {
          [Op.in]: videoIds,
        },
      },
    });

    if (!videos.length) {
      return res
        .status(STATUS_CODE.SUCCESS)
        .json({ success: true, data: videos });
    }

    videos.forEach(async (video, index) => {
      const { id: videoId } = video;
      const views = await View.count({ where: { videoId } });
      video.setDataValue('views', views);

      const userSettings = await UserDisplaySettings.findOne({
        where: { userId: video.User.id },
        include: [
          {
            model: VisitorBadge,
            attributes: ['imgPath'],
          },
        ],
      });

      video.setDataValue('userSettings', userSettings);

      if (index === videos.length - 1) {
        return res
          .status(STATUS_CODE.SUCCESS)
          .json({ success: true, data: videos });
      }
    });
  } catch (e) {
    res.status(STATUS_CODE.BAD).json({ message: e.message });
  }
});

exports.spaceLeft = asyncHandler(async (req, res, next) => {
  try {
    let usedVideoSize = await Video.sum('filesize', {
      where: { userId: req.user.id },
    });

    if (!usedVideoSize) usedVideoSize = 0;
    const user = await User.findByPk(req.user.id, {
      attributes: ['storagePackageId'],
    });
    const storagePackage = await StoragePackages.findByPk(
      user.storagePackageId,
      {
        attributes: ['size'],
      }
    );

    const totalVideoSize = storagePackage ? storagePackage.size : 0;

    let status = false;
    if (totalVideoSize - usedVideoSize > 0) status = true;
    return res
      .status(STATUS_CODE.SUCCESS)
      .json({ success: true, data: status });
  } catch (e) {
    res.status(STATUS_CODE.BAD).json({ message: e.message });
  }
});

exports.verifyEmail = async (req, res) => {
  try {
    const { email_verify_token } = req.body;
    const user = await User.findOne({ where: { email_verify_token } });
    if (!user) {
      return res.status(STATUS_CODE.NOT_FOUND).json({
        message: MESSAGES.EMAILER.INVALID_EMAIL_TOKEN,
        statusCode: STATUS_CODE.BAD,
      });
    }
    const temp_user = { is_email_verified: true };
    await User.update(temp_user, {
      where: { email_verify_token: email_verify_token },
    });
    await user.reload();
    return res.status(STATUS_CODE.SUCCESS).json({ success: true, data: user });
  } catch (e) {
    res.status(STATUS_CODE.BAD).json({ message: e.message });
  }
};

const getUserNotificationStatus = async (model, userId) => {
  let notificationSetting = await model.findAll({ where: { userId: userId } });
  let notificationCategory = await NotificationCategory.findAll({ where: {} });

  if (notificationSetting.length < notificationCategory.length) {
    const userCategoryIds = notificationSetting.map((sub) => sub.categoryId);
    const categoryIds = notificationCategory.map((sub) => sub.id);

    let arr = [];
    for (let i = 0; i < categoryIds.length; i++) {
      if (!userCategoryIds.includes(categoryIds[i])) {
        arr.push({
          userId: userId,
          categoryId: categoryIds[i],
          status: 1,
        });
      }
    }
    notificationSetting = await UserNotificationStatus.bulkCreate(arr);
    notificationSetting = await model.findAll({ where: { userId: userId } });
  }

  return notificationSetting;
};

exports.sendPasswordResetLink = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(STATUS_CODE.NOT_FOUND).json({
        status: RESPONSE_STATUS.NOT_FOUND,
        message: 'This email does not exist',
      });
    }
    //send email to the user with password reset link
    await User.update(
      { password_reset_token: uuidv4(), resetpw_token_created: Date.now() },
      { where: { id: user.id } }
    );
    await addToQue({
      email: user.email,
      userId: user.id,
      status: EMAIL_STATUS.QUEUED,
      emailType: EMAIL_TYPE.FORGET_PASSWORD,
    });
    return res.status(STATUS_CODE.SUCCESS).json({ success: true, data: user });
  } catch (e) {
    res.status(STATUS_CODE.BAD).json({ message: e.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { password_reset_token, email, password } = req.body;
    const user = await User.findOne({ where: { email, password_reset_token } });
    if (!user) {
      return res.status(STATUS_CODE.NOT_FOUND).json({
        status: RESPONSE_STATUS.NOT_FOUND,
        message: 'Email or password reset token is invalid',
      });
    }
    if (!!user.resetpw_token_created) {
      if (isTokenExpired(user.resetpw_token_created)) {
        return res.status(STATUS_CODE.UNAUTHORIZED).json({
          status: RESPONSE_STATUS.UNAUTHORIZED,
          message: 'Password reset token is expired',
        });
      }
    }
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);
    await User.update({ password: newPassword }, { where: { id: user.id } });
    user.reload();
    return res.status(STATUS_CODE.SUCCESS).json({ success: true, data: user });
  } catch (e) {
    res.status(STATUS_CODE.BAD).json({ message: e.message });
  }
};

exports.moreVideos = asyncHandler(async (req, res, next) => {
  try {
    const { id: userId, userrole: userRole } = req.user;
    const id = req.params.userID;

    if (!id) {
      throw new Error('Please provide valid user id');
    }

    videos = await Video.findAll({
      attributes: [
        'id',
        'title',
        'description',
        'thumbnail',
        'userId',
        'keyVideoAccess',
        'createdAt',
        'amount',
        'videoLength',
        [
          Sequelize.literal(`CASE
        when "Video"."userId" = '${userId}' then false
        WHEN "PPVUnlocks"."id" is null and "Video"."keyVideoAccess" = 2 THEN true
        when "Video"."keyVideoAccess" = 0 then false
        when "Video"."keyVideoAccess" = 1 and ${+userRole} = 0 then true
        else false
        END`),
          'isVideoLocked',
        ],
      ],
      include: [
        {
          model: PPVUnlocks,
          as: 'PPVUnlocks',
          where: { userId },
          attributes: [],
          required: false,
        },
        {
          model: User,
          attributes: ['id', 'avatar', 'username', 'stripe_account_id'],
        },
        {
          model: VideoAccessOverlay,
          attributes: [
            'keyVideoAccess',
            'name',
            'description',
            'imgPathFreeLoader',
            'imgPathMember',
          ],
        },
      ],
      where: {
        userId: id,
      },
      order: [['createdAt', 'DESC']],
    });

    if (!videos.length)
      return res
        .status(STATUS_CODE.SUCCESS)
        .json({ success: true, data: videos });

    videos.forEach(async (video, index) => {
      const { id: videoId } = video;
      const views = await View.count({ where: { videoId } });
      video.setDataValue('views', views);

      const userSettings = await UserDisplaySettings.findOne({
        where: { userId: video.User.id },
        include: [
          {
            model: VisitorBadge,
            attributes: ['imgPath'],
          },
        ],
      });
      video.setDataValue('userSettings', userSettings);

      if (index === videos.length - 1) {
        return res
          .status(STATUS_CODE.SUCCESS)
          .json({ success: true, data: videos });
      }
    });
  } catch (e) {
    res.status(STATUS_CODE.BAD).json({ message: e.message });
  }
});

exports.getKarmaSentTranansations = asyncHandler(async (req, res, next) => {
  try {
    let user = await User.findByPk(req.body.userId);
    if (!user) {
      return res.status(500).json('No user with this email');
    }
    const filterSetting = await KarmaFilterSettings.findOne({ where: { userId: req.body.userId, filterType: FILTER_TYPES.KARMA_FILTERS } });

    let karmaSentByUserList = [];
    let karmaSentObj;
    let lastObj = null;
    do {
      let payload = { limit: 100 };
      if (!!lastObj) {
        payload.starting_after = lastObj.id;
      }
      if (filterSetting) {
        if (filterSetting.timeFrame == 'last7days') {
          payload.created = {
            gte: getLastWeeksDate()
          }
        }
        if (filterSetting.timeFrame == 'lastMonth') {
          payload.created = {
            gte: getPreviousMonth().firstDay,
            lte: getPreviousMonth().lastDay
          }
        }
        if (filterSetting.timeFrame == 'lastYear') {
          payload.created = {
            gte: getFirstandLastDateOfLastYear().startDate,
            lte: getFirstandLastDateOfLastYear().lastDate
          }
        }
      }
      karmaSentObj = await stripe.transfers.list(payload);
      if (karmaSentObj.data.length) {
        karmaSentByUserList.push(...karmaSentObj.data);
        lastObj = karmaSentByUserList.slice(-1).pop();
      }
    } while (karmaSentObj.has_more);
    let karmaSentByLoggedInUser = [];
    let userWithTransactionDetails = [];
    if (karmaSentByUserList.length) {
      karmaSentByLoggedInUser = karmaSentByUserList.filter(
        (tr) => tr.metadata.sender_userId === user.id
      );
    }
    // get video and content creator information
    if (karmaSentByLoggedInUser.length) {
      tr_user_info = await karmaSentByLoggedInUser.map(async (transaction) => {
        if (!!transaction.metadata.content_creator_userId) {
          let user = await User.findOne({
            where: { id: transaction.metadata.content_creator_userId },
            attributes: ['id', 'username'],
          });
          transaction.user = user;
        }
        if (!!transaction.metadata.videoId) {
          let video = await Video.findOne({
            where: { id: transaction.metadata.videoId },
          });
          transaction.video = video;
        }
        return transaction;
      });
      userWithTransactionDetails = await Promise.all(tr_user_info)
        .then((rs) => rs)
        .catch((err) => {
          throw err;
        });
    }
    if (filterSetting) {
      if (filterSetting.source === 'karma') {
        const karmaTransactions = userWithTransactionDetails.filter(tr => tr.metadata.transferType == '3');
        return res.json(karmaTransactions);
      }
    }
    return res.json(userWithTransactionDetails);
  } catch (err) { }
});

exports.getUserTransactions = asyncHandler(async (req, res, next) => {
  try {
    //get user info
    let user = await User.findByPk(req.body.userId);
    if (!user) {
      return res.status(500).json('No user with this email');
    }

    const filterSetting = await KarmaFilterSettings.findOne({ where: { userId: req.body.userId, filterType: FILTER_TYPES.TRANSACTIONS_FILTERS } });


    if (user.stripe_account_id) {
      let payload = {
        destination: user.stripe_account_id,
        limit: req.body.limit,
      };
      if (filterSetting) {
        if (filterSetting.timeFrame == 'last7days') {
          payload.created = {
            gte: getLastWeeksDate()
          }
        }
        if (filterSetting.timeFrame == 'lastMonth') {
          payload.created = {
            gte: getPreviousMonth().firstDay,
            lte: getPreviousMonth().lastDay
          }
        }
        if (filterSetting.timeFrame == 'lastYear') {
          payload.created = {
            gte: getFirstandLastDateOfLastYear().startDate,
            lte: getFirstandLastDateOfLastYear().lastDate
          }
        }
      }
      if (req.body.starting_after) {
        payload.starting_after = req.body.starting_after;
      }

      const transfers = await stripe.transfers.list(payload);
      // Retrireve account information of destination
      let transactionsList = [];
      let tData = [];
      let tr_user_info = [];
      let userWithTransactionDetails = [];
      if (transfers.data.length) {
        let newPromiseArr = await transfers.data.map(async (transferItem) => {
          let acc = await stripe.accounts.retrieve(transferItem.destination);
          transactionsList.push(acc);
          transferItem.dest_account_info = acc;
          return transferItem;
        });
        tData = await Promise.all(newPromiseArr).then((rest) => rest);
        if (tData.length) {
          tr_user_info = await tData.map(async (transaction) => {
            let user = await User.findOne({
              where: { email: transaction.dest_account_info.email },
              attributes: ['id', 'username'],
            });
            transaction.user = user;
            if (transaction.metadata.videoId) {
              let video = await Video.findOne({
                where: { id: transaction.metadata.videoId },
                attributes: ['id', 'title'],
              });
              transaction.video = video;
            }
            return transaction;
          });
          userWithTransactionDetails = await Promise.all(tr_user_info)
            .then((rs) => rs)
            .catch((err) => {
              throw err;
            });
        }
      }
      if (filterSetting) {
        if (filterSetting.source === 'tip') {
          const tipTransaction = userWithTransactionDetails.filter(tr => tr.metadata.transferType == '1');
          return res.json(tipTransaction);
        }
        if (filterSetting.source === 'referral') {
          const refTransactions = userWithTransactionDetails.filter(tr => tr.metadata.transferType == '2');
          return res.json(refTransactions);
        }
        if (filterSetting.source === 'karma') {
          const karmaTransactions = userWithTransactionDetails.filter(tr => tr.metadata.transferType == '3');
          return res.json(karmaTransactions);
        }
      }
      return res.json(userWithTransactionDetails);
    } else {
      return res
        .status(500)
        .json('User account is not connected to the stripe');
    }
  } catch (err) {
    res.status(STATUS_CODE.BAD).json({ message: err.message });
  }
});

exports.getWarriorPageBanner = asyncHandler(async (req, res) => {
  const sliderItems = await WidgetBannerSlider.findAll({
    attributes: [
      'id',
      'title',
      'description',
      'button1Text',
      'button1Url',
      'button2Text',
      'button2Url',
      'bannerImgPathInternal_XL_1920x400',
      'bannerImgPathBackup',
      'categoryId',
      'bannerLocation',
    ],
    where: {
      bannerLocation: 2,
    },
    order: [['order', 'ASC']],
  });

  if (sliderItems.length > 0) {
    return res.status(STATUS_CODE.SUCCESS).json({
      success: true,
      data: sliderItems,
    });
  } else {
    return res.status(STATUS_CODE.BAD).json({
      success: false,
      message: 'no slider found',
    });
  }
});

exports.getFeaturedWarriors = asyncHandler(async (req, res) => {
  const featuredWarriors = await WidgetFeaturedWarrior.findAll({
    attributes: [
      'id',
      'title',
      'description',
      'featured',
      'customUrl',
      'order',
      'featuredWarriorImgPathInternal',
      'featuredWarriorImgPathExternal',
      'featuredWarriorWidgetLocation',
      'userId',
      'categoryId',
      'warriorUserName',
    ],
    where: {
      featuredWarriorWidgetLocation: 2,
    },
    order: [['order', 'ASC']],
  });

  if (featuredWarriors.length > 0) {
    return res.status(STATUS_CODE.SUCCESS).json({
      success: true,
      data: featuredWarriors,
    });
  } else {
    return res.status(STATUS_CODE.BAD).json({
      success: false,
      message: 'no featured warriors found',
    });
  }
});

exports.getIsutraMarketingBanners = asyncHandler(async (req, res) => {
  const banners = await WidgetBannerSlider.findAll({
    attributes: [
      'id',
      'bannerImgPathInternal_XL_1920x400',
      'bannerImgPathInternal_L_1366x400',
      'bannerImgPathInternal_L_1280x400',
      'bannerImgPathInternal_L_1024x400',
      'bannerImgPathInternal_MD_834x400',
      'bannerImgPathInternal_MD_768x400',
      'bannerImgPathInternal_SM_428x250',
      'bannerImgPathInternal_SM_414x250',
      'bannerImgPathInternal_SM_375x250',
      'bannerImgPathBackup',
      'categoryId',
      'bannerLocation',
      'title',
      'description',
      'button1Text',
      'button1Url',
      'button2Text',
      'button2Url',
    ],
    order: [['order', 'ASC']],
  });

  if (banners.length > 0) {
    return res.status(STATUS_CODE.SUCCESS).json({
      success: true,
      data: banners,
    });
  } else {
    return res.status(STATUS_CODE.BAD).json({
      success: false,
      message: 'no banners found',
    });
  }
});

exports.contactIsutra = asyncHandler(async (req, res, next) => {
  const { name, email, subject, message } = req.body;

  try {
    let info = await mailer.sendEmail({
      from: `${name} <${email}>`,
      to: mailer.emailConfigs.supportEmailAddresses,
      subject: subject,
      text: `${message}`,
      html: `<p>${message}</p>`,
    });
    return res.json(info);
  } catch (err) {
    throw new Error('Failed to send email');
  }
});

exports.getLibraryVideos = asyncHandler(async (req, res, next) => {
  const { userId, offset } = req.query;
  try {
    const videoIdsList = await Library.findAll({
      attributes: ['videoId'],
      where: {
        userId,
      },
      order: [['updatedAt', 'DESC']],
      limit: offset,
    });
    const videosCount = await Library.count({ where: { userId } });
    const hasMore = videosCount > offset ? true : false;
    let videosPromiseList = videoIdsList.map(async (v) => {
      let vid = await Video.findOne({
        include: {
          model: User,
          attributes: ['id', 'username', 'avatar', 'stripe_account_id'],
        },
        where: { id: v.videoId },
      });

      const userSettings = await UserDisplaySettings.findOne({
        where: { userId: vid.User.id },
        attributes: ['outOfThisWorld', 'city', 'state'],
      });

      vid.setDataValue('userSettings', userSettings);
      return vid;
    });
    const videos = await Promise.all(videosPromiseList);
    return res.json({ videos: videos, hasMore: hasMore });
  } catch (err) {
    throw new Error('Failed to get Library videos' + err);
  }
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  try {
    const { user_id } = req.body;

    const user = await User.findOne({
      where: { id: user_id },
      attributes: [
        'stripe_customer_id',
        'stripe_account_id',
        'avatarPublicId',
        'coverPublicId',
      ],
    });

    //Delete stripe user and account
    if (user.stripe_customer_id != null) {
      const StripeUserdeleted = await stripe.customers.del(
        user.stripe_customer_id
      );
    }
    if (user.stripe_account_id != null) {
      const stripeUserAccountDeleted = await stripe.accounts.del(
        user.stripe_account_id
      );
    }
    //Delete user's cloudinary data
    const userVideos = await Video.findAll({
      where: { userId: user_id },
      attributes: ['publicId'],
    });
    // Delete user's avatar
    if (user.avatarPublicId) {
      await cloudinary.v2.uploader.destroy(user.avatarPublicId);
    }
    // Delete Cover image
    if (user.coverPublicId) {
      await cloudinary.v2.uploader.destroy(user.coverPublicId);
    }
    // Delete user's Videos
    if (userVideos.length) {
      let userVideoPublicIdsList = userVideos.map(async (uv) => {
        await cloudinary.v2.uploader.destroy(uv.publicId, {
          resource_type: 'video',
        });

        return uv.publicId;
      });
    }
    await OnlineUsers.destroy({
      where: { userid: user_id },
    });

    await User.destroy({
      where: { id: user_id },
    });
    return res.status(STATUS_CODE.SUCCESS).json('Account deleted!');
  } catch (e) {
    res.status(STATUS_CODE.SUCCESS).json({
      success: true,
    });
  }
});

exports.checkResetPasswordTokenExpiry = asyncHandler(async (req, res, next) => {
  const { reset_pw_token } = req.body;
  if (!reset_pw_token) {
    return res.status(STATUS_CODE.BAD).json({
      success: false,
      message: 'No userId or reset password token provided',
    });
  }
  const user = await User.findOne({
    where: { password_reset_token: reset_pw_token },
    attributes: ['resetpw_token_created', 'password_reset_token'],
  });
  if (!!user.resetpw_token_created) {
    const isExpired = isTokenExpired(user.resetpw_token_created);
    if (isExpired) {
      return res.status(STATUS_CODE.UNAUTHORIZED).json({
        success: false,
        message: 'Password reset token is expired',
      });
    } else {
      return res.status(STATUS_CODE.SUCCESS).json({
        success: true,
        message: 'Password reset token is not expired',
      });
    }
  }
});

exports.newCategoryRequest = asyncHandler(async (req, res, next) => {
  const {
    categoryTitle,
    categoryDescription,
    requestedUser,
    requestedUserEmail,
  } = req.body;

  const requestObj = {
    categoryTitle,
    categoryDescription,
    requestedUser,
    requestedUserEmail,
  };

  const newCategoryRequest = await VideoCategoryRequest.create(requestObj);
  const requestedUserObj = await User.findByPk(requestedUser, {
    attributes: ['id', 'firstname', 'lastname', 'username'],
  });

  if (newCategoryRequest && newCategoryRequest.id) {
    await mailer.sendEmail({
      from: `${requestedUserObj.firstname + requestedUserObj.lastname
        } <${requestedUserEmail}>`,
      to: [
        mailer.emailConfigs.supportEmailAddresses,
        'techymanjil96@gmail.com',
      ],
      subject: 'iSUTRA - New Category Requested!',
      html: `<p>A new category was just requested by <a href="https://isutra.online/channel/${requestedUserObj.username}">${requestedUserObj.username}</a>! Please review the details below: 
        
        <ul>
          <li>Category Name: ${categoryTitle}</li>
          <li>Category Description: ${categoryDescription}</li>
        </ul>
      </p>`,
    });

    return res.status(STATUS_CODE.SUCCESS).json({
      success: true,
      message: 'New category request submitted successfully',
    });
  } else {
    return res.status(STATUS_CODE.ERROR).json({
      success: false,
      message: 'Server error occured',
    });
  }
});

exports.videoReport = asyncHandler(async (req, res, next) => {
  const {
    warriorUserId,
    warriorUsername,
    warriorFirstName,
    warriorLastName,
    warriorEmail,
    userUserId,
    userUsername,
    userFirstName,
    userLastName,
    userEmail,
    videoId,
    videoTitle,
    flagType,
    flagTimestamp,
    flagMessage,
  } = req.body;

  if (!warriorUserId || !userUserId || !videoId || !flagType) {
    return res.status(STATUS_CODE.ERROR).json({
      success: false,
      message:
        'All fields are required. warriorUserId, userUserId, videoId, flagType',
    });
  }

  try {
    const contentFlagObj = {
      warriorUserId,
      flagSubmitterUserId: userUserId,
      videoId,
      flagTypeId: flagType,
      flagTimestamp,
      flagMessage,
    };

    const result = await ContentFlag.create(contentFlagObj);

    if (result && result.id) {
      await mailer.sendEmail({
        from: `${userFirstName + userLastName} <${userEmail}>`,
        to: [
          mailer.emailConfigs.supportEmailAddresses,
          'techymanjil96@gmail.com',
        ],
        subject: 'Flagged Video Content! Please moderate',
        html: `<p> A user has just flagged the below video on the iSUTRA platform. Please review the content submitted below and check the video and details submitted below:

            <ul>
              <h3>Video Details</h3>
<<<<<<< HEAD
              <li><a href="${process.env.BASE_URL
          }/watch/${videoId}">Video Title: ${videoTitle}</a></li>
              <li>Warrior Username: ${warriorUsername}</li>
              <li><a href="${process.env.BASE_URL
          }/channel/${warriorUsername}">Warrior Profile</a></li>
              <li>Warrior Fullname: ${warriorFirstName + ' ' + warriorLastName
          }</li>
=======
              <li><a href="${config.BASE_URL
          }/watch/${videoId}">Video Title: ${videoTitle}</a></li>
              <li>Warrior Username: ${warriorUsername}</li>
              <li><a href="${config.BASE_URL
          }/channel/${warriorUsername}">Warrior Profile</a></li>
              <li>Warrior Fullname: ${warriorFirstName + ' ' + warriorLastName
          }</li>
>>>>>>> ecf17969871786b467eb57330975a220b2d33407
              <li>Warrior Email: ${warriorEmail}</li>
            </ul>

            <ul>
              <h3>Flag Submitter User Details</h3>
              <li>Submitter Username: ${userUsername}</li>
<<<<<<< HEAD
              <li><a href="${process.env.BASE_URL
          }/channel/${userUsername}">Submitter Profile</a></li>
=======
              <li><a href="${config.BASE_URL
          }/channel/${userUsername}">Submitter Profile</a></li>
>>>>>>> ecf17969871786b467eb57330975a220b2d33407
              <li>Submitter Fullname: ${userFirstName + ' ' + userLastName}</li>
              <li>Submitter Email: ${userEmail}</li>
            </ul>

            <ul>
              <h3>Flag Submitted details</h3>
              <li><b>Flag Type:</b> ${flagType}</li>
              <li><b>Timestamp:</b> ${flagTimestamp} || Hours : Minutes: Seconds</li>
              <li>
                <p>
                  <b>Message</b>
                  ${flagMessage}
                </p>
              </li>
          </ul>
          </p>`,
      });

      return res.status(STATUS_CODE.SUCCESS).json({
        success: true,
        message: 'Video reported successfully',
        result,
      });
    }
  } catch (error) {
    return res.status(STATUS_CODE.ERROR).json({
      success: false,
      message: 'Server error occurred',
      error,
    });
  }
});

exports.addFlagType = asyncHandler(async (req, res, next) => {
  const { flagTypeName, flagTypeInfo } = req.body;

  if (!flagTypeName || !flagTypeInfo) {
    return res.status(STATUS_CODE.ERROR).json({
      success: false,
      message: 'All fields are required. flagTypeName, flagTypeInfo',
    });
  }

  try {
    const result = await FlagType.create({
      flagTypeName,
      flagTypeInfo,
    });

    if (result && result.id) {
      return res.status(STATUS_CODE.SUCCESS).json({
        success: true,
        message: 'Flag type created successfully',
        result,
      });
    }
  } catch (error) {
    return res.status(STATUS_CODE.ERROR).json({
      success: false,
      message: 'Server error occurred',
      error,
    });
  }
});

exports.getFlagTypes = asyncHandler(async (req, res, next) => {
  try {
    const results = await FlagType.findAll({
      attributes: ['id', 'flagTypeName', 'flagTypeInfo'],
      order: [['createdAt', 'DESC']],
    });

    if (results && results.length > 0) {
      return res.status(STATUS_CODE.SUCCESS).json({
        success: true,
        message: 'Flag type created successfully',
        results,
      });
    } else {
      return res.status(STATUS_CODE.ERROR).json({
        success: false,
        message: 'No flag type available to display',
      });
    }
  } catch (error) {
    return res.status(STATUS_CODE.ERROR).json({
      success: false,
      message: 'Server error occurred',
      error,
    });
  }
});

exports.filterVideos = asyncHandler(async (req, res, next) => {
  try {
    const { id: userId, userrole: userRole } = req.user;
    const categoryIdsList = req.body.data;
    let videoIdsArr = [];
    if (categoryIdsList.length) {
      for (item of categoryIdsList) {
        let whereSt = {};
        if (!!item.videoCategoryId && !!item.subCategTwoId) {
          whereSt.videoCategoryId = item.videoCategoryId;
          whereSt.subCategTwoId = item.subCategTwoId;
        } else if (!!item.videoCategoryId) {
          whereSt.videoCategoryId = item.videoCategoryId;
        } else if (!!item.subCategTwoId) {
          whereSt.subCategTwoId = item.subCategTwoId;
        }

        const videoSubCategories = await VideoSubCategories.findAll({
          attributes: ['videoId'],
          where: whereSt,
          raw: true,
        });

        if (videoSubCategories.length) {
          for (videoSubCat of videoSubCategories) {
            videoIdsArr.push(videoSubCat.videoId);
          }
        }
      }
      const uniqueVidIds = [...new Set(videoIdsArr)];
      if (!uniqueVidIds.length)
        return res
          .status(STATUS_CODE.SUCCESS)
          .json({ success: false, data: null });

      const videos = await getVideos(uniqueVidIds, userId, userRole);

      if (!videos.length)
        return res
          .status(STATUS_CODE.SUCCESS)
          .json({ success: false, data: null });

      videos.forEach(async (video, index) => {
        const { id: videoId } = video;
        const views = await View.count({ where: { videoId } });
        video.setDataValue('views', views);

        const userSettings = await UserDisplaySettings.findOne({
          where: { userId: video.User.id },
          include: [
            {
              model: VisitorBadge,
              attributes: ['imgPath'],
            },
          ],
        });
        video.setDataValue('userSettings', userSettings);

        if (index === videos.length - 1) {
          return res
            .status(STATUS_CODE.SUCCESS)
            .json({ success: true, data: videos });
        }
      });
    } else {
      let videos = await getVideos([], userId, userRole);
      await videos.forEach(async (video, index) => {
        const { id: videoId } = video;
        const views = await View.count({ where: { videoId } });
        video.setDataValue('views', views);

        const userSettings = await UserDisplaySettings.findOne({
          where: { userId: video.User.id },
          include: [
            {
              model: VisitorBadge,
              attributes: ['imgPath'],
            },
          ],
        });
        video.setDataValue('userSettings', userSettings);

        if (index === videos.length - 1) {
          return res
            .status(STATUS_CODE.SUCCESS)
            .json({ success: true, data: videos });
        }
      });
    }
  } catch (error) {
    console.log('ERROR****', error);
    return res.status(STATUS_CODE.ERROR).json({
      success: false,
      message: 'Server error occurred',
      error,
    });
  }
});

const getVideos = async (uniqueVidIds, userId, userRole) => {
  let whereStatement = {};
  if (uniqueVidIds.length > 0) whereStatement.id = uniqueVidIds;
  return await Video.findAll({
    attributes: [
      'id',
      'title',
      'description',
      'thumbnail',
      'filesize',
      'userId',
      'keyVideoAccess',
      'createdAt',
      'amount',
      'videoLength',
      [
        Sequelize.literal(`CASE
      when "Video"."userId" = '${userId}' then false
      WHEN "PPVUnlocks"."id" is null and "Video"."keyVideoAccess" = 2 THEN true
      when "Video"."keyVideoAccess" = 0 then false
      when "Video"."keyVideoAccess" = 1 and ${+userRole} = 0 then true
      else false
      END`),
        'isVideoLocked',
      ],
    ],
    include: [
      {
        model: PPVUnlocks,
        as: 'PPVUnlocks',
        where: { userId },
        attributes: [],
        required: false,
      },
      {
        model: User,
        attributes: ['id', 'avatar', 'username', 'stripe_account_id'],
      },
      {
        model: VideoAccessOverlay,
        attributes: [
          'keyVideoAccess',
          'name',
          'description',
          'imgPathFreeLoader',
          'imgPathMember',
        ],
      },
    ],
    where: whereStatement,
    order: [['createdAt', 'DESC']],
  });
};
