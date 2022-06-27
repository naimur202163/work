const { Op, Sequelize } = require('sequelize');
const cloudinary = require('cloudinary');
const {
  User,
  Video,
  VideoLike,
  Comment,
  View,
  Subscription,
  Notification,
  NotificationType,
  NotificationCategory,
  UserDisplaySettings,
  UserNotificationStatus,
  VideoCategory,
  VideoAccessOverlay,
  HashTag,
  VisitorBadge,
  VideoHashTag,
  PPVUnlocks,
  TipAfterTwo,
  Library,
  SubCategOne,
  SubCategTwo,
  VideoSubCategories,
} = require('../sequelize');
const asyncHandler = require('../middleware/async-handler');
const {
  sendNotificationToOnlineUsers,
} = require('../socket/emit-events');
const { WEB_SOCKET_EVENTS } = require('../constants/web-socket-keys');
const { bytesToMegaBytes } = require('../utils/index');
const { MESSAGES, RESPONSE_STATUS, STATUS_CODE } = require('../constants');
const { request } = require('express');

exports.selectCategory = asyncHandler(async (req, res, next) => {
  try {
    const newCategories = await VideoCategory.findAll({
      include: [
        {
          model: SubCategOne,
          as: 'subCategOne',
          include: [
            {
              model: SubCategTwo,
              as: 'subCategTwo',
            },
          ],
        },
      ],
      order: [['order', 'ASC']],
    });

    res
      .status(STATUS_CODE.SUCCESS)
      .json({ success: true, data: newCategories });
  } catch (e) {
    res.status(STATUS_CODE.BAD).json({ message: e.message });
  }
});

exports.selectHashtag = asyncHandler(async (req, res, next) => {
  try {
    const hashTags = await HashTag.findAll({
      attributes: ['id', 'name'],
    });
    res.status(STATUS_CODE.SUCCESS).json({ success: true, data: hashTags });
  } catch (e) {
    res.status(STATUS_CODE.BAD).json({ message: e.message });
  }
});

exports.videoAccessOverlays = asyncHandler(async (req, res, next) => {
  try {
    const videoAccessOverlays = await VideoAccessOverlay.findAll({
      attributes: ['keyVideoAccess', 'name'],
    });
    res
      .status(STATUS_CODE.SUCCESS)
      .json({ success: true, data: videoAccessOverlays });
  } catch (e) {
    res.status(STATUS_CODE.BAD).json({ message: e.message });
  }
});

exports.newVideo = asyncHandler(async (req, res, next) => {
  try {
    const {
      title,
      description,
      url,
      publicId,
      thumbnail,
      categoryId,
      keyVideoAccess,
      hashTags,
      ppvAmount,
      customThumbnail,
      featuredWarriorPortal,
      videoLength,
      categoryList,
    } = req.body || null;

    const video = await Video.create({
      title: title,
      description: description,
      url: url,
      publicId: 0,
      thumbnail: thumbnail,
      categoryId: categoryId,
      keyVideoAccess: keyVideoAccess,
      filesize: bytesToMegaBytes(req.body.filesize, 2),
      userId: req.user.id,
      amount: ppvAmount,
      customThumbnail,
      featuredWarriorPortal,
      videoLength: Math.round(videoLength),
    });

    // save subcategories with with video id
    categoryList.forEach((cat) => {
      cat['videoId'] = video.id;
    });
    await VideoSubCategories.bulkCreate(categoryList);

    let newHashTags = [];
    let hashTagNameFilters = [];

    if (hashTags) {
      for (let i = 0; i < hashTags.length; i++) {
        hashTagNameFilters.push(hashTags[i].name);
        if (!hashTags[i].id) {
          newHashTags.push({ name: hashTags[i].name });
        }
      }
    }

    await HashTag.bulkCreate(newHashTags);

    newHashTags = [];

    if (hashTagNameFilters.length > 0) {
      newHashTags = await HashTag.findAll({
        attributes: ['id', 'name'],
        where: {
          name: {
            [Op.or]: hashTagNameFilters,
          },
        },
      });

      let videoHashTags = [];
      for (let i = 0; i < newHashTags.length; i++) {
        videoHashTags.push({
          videoId: video.id,
          hashTagId: newHashTags[i].id,
          videoContentType: 0,
        });
      }

      await VideoHashTag.bulkCreate(videoHashTags);
    }

    const vid = await Video.findByPk(video.id, {
      include: [
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
    });

    res.status(STATUS_CODE.SUCCESS).json({ success: true, data: vid });
  } catch (e) {
    res.status(STATUS_CODE.BAD).json({ message: e.message });
  }
});

exports.getVideo = asyncHandler(async (req, res, next) => {
  try {
    const { id: userId, userrole: userRole } = req.user;
    const { id: videoId } = req.params;
    const video = await Video.findByPk(videoId, {
      attributes: [
        'id',
        'categoryId',
        'title',
        'description',
        'thumbnail',
        'userId',
        'keyVideoAccess',
        'createdAt',
        'amount',
        'url',
        'featuredWarriorPortal',
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
        [
          Sequelize.literal(`CASE
        when "Video"."userId" = '${userId}' then false
        WHEN "TipAfterTwoUnlocks"."id" is null and "Video"."keyVideoAccess" = 3 THEN true
        else false
        END`),
          'isTATVideoLocked',
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
          model: TipAfterTwo,
          as: 'TipAfterTwoUnlocks',
          where: { userId },
          attributes: [],
          required: false,
        },
        {
          model: User,
          attributes: [
            'id',
            'username',
            'avatar',
            'stripe_account_id',
            'userrole',
            'tagline',
            'cover',
          ],
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

    if (!video) {
      return next({
        message: MESSAGES.VIDEO.NO_VIDEO_FOUND,
        statusCode: STATUS_CODE.NOT_FOUND,
      });
    }

    const comments = await video.getComments({
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'text', 'parent_id', 'createdAt'],
      include: [
        {
          model: User,
          attributes: ['id', 'avatar', 'username', 'stripe_account_id'],
        },
      ],
    });
    comments.forEach(async (comment) => {
      if (!!comment.User) {
        const userSettings = await UserDisplaySettings.findOne({
          where: { userId: comment.User.id },
          include: [
            {
              model: VisitorBadge,
              attributes: ['imgPath'],
            },
          ],
        });

        comment.User.setDataValue('badge', userSettings.VisitorBadge.imgPath);
      }
    });

    const isLiked = await VideoLike.findOne({
      where: {
        [Op.and]: [{ videoId }, { userId }, { like: 1 }],
      },
    });

    const isDisliked = await VideoLike.findOne({
      where: {
        [Op.and]: [{ videoId }, { userId }, { like: -1 }],
      },
    });

    const commentsCount = await Comment.count({
      where: {
        videoId,
      },
    });

    const likesCount = await VideoLike.count({
      where: {
        [Op.and]: [{ videoId }, { like: 1 }],
      },
    });

    const dislikesCount = await VideoLike.count({
      where: {
        [Op.and]: [{ videoId }, { like: -1 }],
      },
    });

    const userSettings = await UserDisplaySettings.findOne({
      where: { userId: video.userId },
      attributes: [],
      include: [
        {
          model: VisitorBadge,
          attributes: ['imgPath'],
        },
      ],
    });

    const views = await View.count({
      where: {
        videoId,
      },
    });

    const isSubscribed = await Subscription.findOne({
      where: {
        subscriber: userId,
        subscribeTo: video.userId,
      },
    });

    const isViewed = await View.findOne({
      where: {
        userId: userId,
        videoId: video.id,
      },
    });

    const subscribersCount = await Subscription.count({
      where: { subscribeTo: video.userId },
    });

    const isVideoMine = req.user.id === video.userId;

    const videoHashTags = await VideoHashTag.findAll({
      attributes: ['hashTagId'],
      where: {
        videoId: video.id,
      },
    });

    let hashTags = [];
    if (videoHashTags.length > 0) {
      let hashTagIdFilters = [];
      for (let i = 0; i < videoHashTags.length; i++) {
        hashTagIdFilters.push(videoHashTags[i].hashTagId);
      }

      hashTags = await HashTag.findAll({
        attributes: ['id', 'name'],
        where: {
          id: {
            [Op.or]: hashTagIdFilters,
          },
        },
      });
    }

    // likesCount, disLikesCount, views
    video.setDataValue('comments', comments);
    video.setDataValue('commentsCount', commentsCount);
    video.setDataValue('isLiked', !!isLiked);
    video.setDataValue('isDisliked', !!isDisliked);
    video.setDataValue('likesCount', likesCount);
    video.setDataValue('dislikesCount', dislikesCount);
    video.setDataValue('views', views);
    video.setDataValue('isVideoMine', isVideoMine);
    video.setDataValue('isSubscribed', !!isSubscribed);
    video.setDataValue('isViewed', !!isViewed);
    video.setDataValue('subscribersCount', subscribersCount);
    video.setDataValue('hashTags', hashTags);
    video.setDataValue('userSettings', userSettings);

    res.status(STATUS_CODE.SUCCESS).json({ success: true, data: video });
  } catch (e) {
    res.status(STATUS_CODE.BAD).json({ message: e.message });
  }
});

exports.likeVideo = asyncHandler(async (req, res, next) => {
  try {
    const video = await Video.findByPk(req.params.id);

    if (!video) {
      return next({
        message: MESSAGES.VIDEO.NO_VIDEO_FOUND,
        statusCode: STATUS_CODE.NOT_FOUND,
      });
    }

    const liked = await VideoLike.findOne({
      where: {
        userId: req.user.id,
        videoId: req.params.id,
        like: 1,
      },
    });

    const disliked = await VideoLike.findOne({
      where: {
        userId: req.user.id,
        videoId: req.params.id,
        like: -1,
      },
    });

    if (liked) {
      await liked.destroy();
    } else if (disliked) {
      disliked.like = 1;
      await disliked.save();
    } else {
      await VideoLike.create({
        userId: req.user.id,
        videoId: req.params.id,
        like: 1,
      });
    }

    res.status(STATUS_CODE.SUCCESS).json({ success: true, data: {} });
  } catch (e) {
    res.status(STATUS_CODE.BAD).json({ message: e.message });
  }
});

exports.dislikeVideo = asyncHandler(async (req, res, next) => {
  try {
    const video = await Video.findByPk(req.params.id);

    if (!video) {
      return next({
        message: MESSAGES.VIDEO.NO_VIDEO_FOUND,
        statusCode: STATUS_CODE.NOT_FOUND,
      });
    }

    const liked = await VideoLike.findOne({
      where: {
        userId: req.user.id,
        videoId: req.params.id,
        like: 1,
      },
    });

    const disliked = await VideoLike.findOne({
      where: {
        userId: req.user.id,
        videoId: req.params.id,
        like: -1,
      },
    });

    if (disliked) {
      await disliked.destroy();
    } else if (liked) {
      liked.like = -1;
      await liked.save();
    } else {
      await VideoLike.create({
        userId: req.user.id,
        videoId: req.params.id,
        like: -1,
      });
    }

    res.status(STATUS_CODE.SUCCESS).json({ success: true, data: {} });
  } catch (e) {
    res.status(STATUS_CODE.BAD).json({ message: e.message });
  }
});

exports.addComment = asyncHandler(async (req, res, next) => {
  try {
    const video = await Video.findByPk(req.params.id);

    if (!video) {
      return next({
        message: MESSAGES.VIDEO.NO_VIDEO_FOUND,
        statusCode: STATUS_CODE.NOT_FOUND,
      });
    }

    const comment = await Comment.create({
      text: req.body.text,
      parent_id: req.body.parentId,
      userId: req.user.id,
      videoId: req.params.id,
    });

    const User = {
      id: req.user.id,
      avatar: req.user.avatar,
      username: req.user.username,
    };
    const userDisplaySettings = await UserDisplaySettings.findOne({
      where: { userId: req.user.id },
      include: [
        {
          model: VisitorBadge,
          attributes: ['imgPath'],
        },
      ],
    });
    User['badge'] = userDisplaySettings.VisitorBadge.imgPath;

    comment.setDataValue('User', User);

    if (req.user.id !== video.userId) {
      const userNotificationStatus = await getUserNotificationStatus(
        video.userId
      );
      if (userNotificationStatus && userNotificationStatus.status) {
        const notificationType = await getNotificationType();
        const notification = await createNotification({
          actorid: req.user.id,
          notifierid: video.userId,
          readStatus: 0,
          entityid: comment.id,
          typeid: notificationType.id,
        });

        // notify the parent comment user
        if (req.body.parentId !== null && req.body.parentId != undefined) {
          const th_comment = await Comment.findOne({
            where: {
              id: req.body.parentId,
            },
          });
          if (th_comment.userId != req.user.id) {
            const threadNotification = await createNotification({
              actorid: req.user.id,
              notifierid: th_comment.userId,
              readStatus: 0,
              entityid: comment.id,
              typeid: notificationType.id,
            });

            sendNotificationToOnlineUsers(
              null,
              WEB_SOCKET_EVENTS.INCREMENT_NOTIFICATION_COUNT,
              th_comment.userId
            );
          }
        }
        sendNotificationToOnlineUsers(
          null,
          WEB_SOCKET_EVENTS.INCREMENT_NOTIFICATION_COUNT,
          video.userId
        );
      }
    } else {
      // when content creator replies to a comment
      // the comment must have a parentId
      // if parentId !== contentcreator's id then send the notifcation to parent id
      if (req.body.parentId != null && req.body.parentId != undefined) {
        const th_comment2 = await Comment.findOne({
          where: {
            id: req.body.parentId,
          },
        });
        const userNotificationStatus2 = await getUserNotificationStatus(
          video.userId
        );
        if (userNotificationStatus2 && userNotificationStatus2.status) {
          const notificationType2 = await getNotificationType();
          const notification = await createNotification({
            actorid: comment.userId,
            notifierid: th_comment2.userId,
            readStatus: 0,
            entityid: comment.id,
            typeid: notificationType2.id,
          });

          sendNotificationToOnlineUsers(
            null,
            WEB_SOCKET_EVENTS.INCREMENT_NOTIFICATION_COUNT,
            th_comment2.userId
          );
        }
      }
    }
    sendNotificationToOnlineUsers(comment.dataValues,WEB_SOCKET_EVENTS.ADD_COMMENT)

    res.status(STATUS_CODE.SUCCESS).json({ success: true, data: comment });
  } catch (e) {
    res.status(STATUS_CODE.BAD).json({ message: e.message });
  }
});

const getUserNotificationStatus = async (userId) => {
  try {
    const notificationCategory = await NotificationCategory.findOne({
      where: { name: 'Comment' },
    });
    const userNotificationStatus = await UserNotificationStatus.findOne({
      where: {
        userId: userId,
        categoryId: notificationCategory.id,
      },
    });
    return userNotificationStatus;
  } catch (e) {
    throw e;
  }
};

const getNotificationType = async () => {
  try {
    const notificationType = await NotificationType.findOne({
      where: { name: 'new_comment' },
    });
    return notificationType;
  } catch (err) {
    throw err;
  }
};

const createNotification = async ({
  actorid,
  notifierid,
  readStatus,
  entityid,
  typeid,
}) => {
  try {
    const notification = await Notification.create({
      actorid,
      notifierid,
      readStatus,
      entityid,
      typeid,
    });
    return notification;
  } catch (err) {
    throw err;
  }
};

exports.newView = asyncHandler(async (req, res, next) => {
  try {
    const video = await Video.findByPk(req.params.id);

    if (!video) {
      return next({
        message: MESSAGES.VIDEO.NO_VIDEO_FOUND,
        statusCode: STATUS_CODE.NOT_FOUND,
      });
    }

    const viewed = await View.findOne({
      where: {
        userId: req.user.id,
        videoId: req.params.id,
      },
    });

    if (viewed) {
      return next({
        message: MESSAGES.VIDEO.ALREADY_VIEWED,
        statusCode: STATUS_CODE.BAD,
      });
    }

    await View.create({
      userId: req.user.id,
      videoId: req.params.id,
    });

    res.status(STATUS_CODE.SUCCESS).json({ success: true, data: {} });
  } catch (e) {
    res.status(STATUS_CODE.BAD).json({ message: e.message });
  }
});

exports.searchVideo = asyncHandler(async (req, res, next) => {
  try {
    const { id: userId, userrole: userRole } = req.user;
    const { searchterm: searchText } = req.query;
    if (!searchText) {
      return next({
        message: MESSAGES.VIDEO.ENTER_SEARCH_TERM,
        statusCode: STATUS_CODE.BAD,
      });
    }

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
        'featuredWarriorPortal',
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
        [
          Sequelize.literal(`CASE
        when "Video"."userId" = '${userId}' then false
        WHEN "TipAfterTwoUnlocks"."id" is null and "Video"."keyVideoAccess" = 3 THEN true
        else false
        END`),
          'isTATVideoLocked',
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
          model: TipAfterTwo,
          as: 'TipAfterTwoUnlocks',
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
        [Op.or]: {
          title: {
            [Op.iLike]: `%${searchText}%`,
          },
          description: {
            [Op.iLike]: `%${searchText}%`,
          },
        },
      },
    });

    if (!videos.length)
      return res
        .status(STATUS_CODE.SUCCESS)
        .json({ success: true, data: videos });

    for (let index = 0; index < videos.length; index++) {
      const video = videos[index];
      const { id: videoId } = video;
      const views = await View.count({ where: { videoId } });
      const userSettings = await UserDisplaySettings.findOne({
        where: {
          userId: video.User.id,
        },
        include: [
          {
            model: VisitorBadge,
            attributes: ['imgPath'],
          },
        ],
      });
      video.User.setDataValue('badge', userSettings.VisitorBadge.imgPath);
      video.User.setDataValue('userSettings', userSettings);
      video.setDataValue('views', views);
      if (index === videos.length - 1) {
        return res
          .status(STATUS_CODE.SUCCESS)
          .json({ success: true, data: videos });
      }
    }
  } catch (e) {
    res.status(STATUS_CODE.BAD).json({ message: e.message });
  }
});

exports.editVideo = asyncHandler(async (req, res, next) => {
  try {
    const {
      title,
      thumbnail,
      description,
      categoryId,
      keyVideoAccess,
      hashTags,
      url,
      customThumbnail,
      amount,
      featuredWarriorPortal,
      videoLength,
      categoryList,
    } = req.body || null;

    await Video.update(
      {
        title: title,
        description: description,
        categoryId: categoryId,
        keyVideoAccess: keyVideoAccess,
        amount,
        featuredWarriorPortal,
        url,
        thumbnail,
        customThumbnail,
        videoLength,
      },
      {
        where: { id: req.params.id },
      }
    );
    if (categoryList.length) {
      categoryList.forEach(async (cat) => {
        cat['videoId'] = req.params.id;
        await VideoSubCategories.destroy({
          where: {
            videoCategoryId: cat.videoCategoryId,
            subCategOneId: cat.subCategOneId,
            SubCategTwoId: cat.subCategTwoId,
          },
        });
      });
      await VideoSubCategories.bulkCreate(categoryList);
    }

    //remove existing hashtags
    await VideoHashTag.destroy({
      where: {
        videoId: req.params.id,
      },
    });

    // addn new hashtags
    let newHashTags = [];
    let hashTagNameFilters = [];
    for (let i = 0; i < hashTags.length; i++) {
      hashTagNameFilters.push(hashTags[i].name);
      if (!hashTags[i].id) {
        newHashTags.push({ name: hashTags[i].name });
      }
    }

    //check hash tags if new hashtag found then insert in hash tag table
    if (newHashTags.length > 0) {
      await HashTag.bulkCreate(newHashTags);
    }

    // hashtags link to video in videohashtag table
    if (hashTagNameFilters.length > 0) {
      newHashTags = [];
      newHashTags = await HashTag.findAll({
        attributes: ['id', 'name'],
        where: {
          name: {
            [Op.or]: hashTagNameFilters,
          },
        },
      });

      let videoHashTags = [];
      for (let i = 0; i < newHashTags.length; i++) {
        videoHashTags.push({
          videoId: req.params.id,
          hashTagId: newHashTags[i].id,
          videoContentType: 0,
        });
      }

      newHashTags = [];
      newHashTags = await VideoHashTag.bulkCreate(videoHashTags);
    }

    const video = await Video.findByPk(req.params.id, {
      attributes: [
        'id',
        'title',
        'description',
        'url',
        'thumbnail',
        'featured',
      ],
    });

    res.status(STATUS_CODE.SUCCESS).json({ success: true, data: video });
  } catch (e) {
    res.status(STATUS_CODE.BAD).json({ message: e.message });
  }
});

exports.deleteVideo = asyncHandler(async (req, res, next) => {
  try {
    const video = await Video.findByPk(req.params.id, {
      attributes: ['publicId'],
    });

    const { publicId } = JSON.parse(JSON.stringify(video, null, 4));

    await cloudinary.v2.uploader.destroy(publicId, { resource_type: 'video' });

    await Video.destroy({
      where: { id: req.params.id },
    });

    res
      .status(STATUS_CODE.SUCCESS)
      .json({ success: true, data: { message: 'Video deleted' } });
  } catch (e) {
    res.status(STATUS_CODE.BAD).json({ message: e.message });
  }
});

exports.deleteCloudinaryVideo = asyncHandler(async (req, res, next) => {
  try {
    const video = await Video.findByPk(req.params.id, {
      attributes: ['publicId'],
    });
    const { publicId } = JSON.parse(JSON.stringify(video, null, 4));
    await cloudinary.v2.uploader.destroy(publicId, { resource_type: 'video' });

    res.status(STATUS_CODE.SUCCESS).json({
      success: true,
      data: { message: 'Video deleted from cloudinary' },
    });
  } catch (e) {
    res.status(STATUS_CODE.BAD).json({ message: e.message });
  }
});

exports.getVideoCategories = asyncHandler(async (req, res, next) => {
  try {
    const categories = await VideoCategory.findAll({
      attributes: ['id', 'name', 'featured', 'iconPath'],
      order: [['order', 'ASC']],
    });

    if (!categories.length) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json({ success: false, categories: null });
    }

    res.status(STATUS_CODE.SUCCESS).json({
      success: true,
      categories,
    });
  } catch (e) {
    res.status(STATUS_CODE.BAD).json({ message: e.message });
  }
});

exports.getVideoCategoriesFeatured = asyncHandler(async (req, res, next) => {
  try {
    const categories = await VideoCategory.findAll({
      attributes: ['id', 'name', 'featured', 'iconPath'],
      order: [['order', 'ASC']],
      where: {
        featured: true,
      },
    });

    if (!categories.length) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json({ success: false, categories: null });
    }

    res.status(STATUS_CODE.SUCCESS).json({
      success: true,
      categories,
    });
  } catch (e) {
    res.status(STATUS_CODE.BAD).json({ message: e.message });
  }
});

exports.getCategoryById = asyncHandler(async (req, res, next) => {
  try {
    const id = req.params.id;
    const category = await VideoCategory.findByPk(id, {
      attributes: ['id', 'name'],
    });

    if (!category) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json({ success: false, category: null });
    }

    res.status(STATUS_CODE.SUCCESS).json({
      success: true,
      category,
    });
  } catch (e) {
    res.status(STATUS_CODE.BAD).json({ message: e.message });
  }
});

exports.savePPVUnlockInformation = asyncHandler(async (req, res, next) => {
  try {
    const { userId, videoId, seriesId } = req.body;
    if (!userId) {
      return res.status(STATUS_CODE.ERROR).json({
        status: RESPONSE_STATUS.ERROR,
        message: MESSAGES.INVALID_PARAMETERS,
      });
    }
    await PPVUnlocks.create({
      userId,
      videoId,
      seriesId,
    });
    res.status(STATUS_CODE.SUCCESS).json({
      success: true,
    });
  } catch (e) {
    res.status(STATUS_CODE.BAD).json({ message: e.message });
  }
});

exports.saveTipAfterTwoInfo = asyncHandler(async (req, res, next) => {
  try {
    const { userId, videoId } = req.body;
    if (!userId || !videoId) {
      return res.status(STATUS_CODE.ERROR).json({
        status: RESPONSE_STATUS.ERROR,
        message: MESSAGES.INVALID_PARAMETERS,
      });
    }
    let existingTipRecord = await TipAfterTwo.findOne({
      where: {
        userId: userId,
        videoId: videoId,
      },
    });
    if (!existingTipRecord) {
      await TipAfterTwo.create({
        userId,
        videoId,
      });
    }

    res.status(STATUS_CODE.SUCCESS).json({
      success: true,
    });
  } catch (e) {
    res.status(STATUS_CODE.BAD).json({ message: e.message });
  }
});

exports.postVideoCategory = asyncHandler(async (req, res, next) => {
  try {
    const { name, featured, iconPath } = req.body;

    await VideoCategory.update(
      {
        name: name,
        featured: featured,
        iconPath: iconPath,
      },
      {
        where: { id: req.params.id },
      }
    );

    res
      .status(STATUS_CODE.SUCCESS)
      .json({ message: 'Category updated successfully' });
  } catch (e) {
    res.status(STATUS_CODE.BAD).json({ message: e.message });
  }
});

exports.postVideoCategory = asyncHandler(async (req, res, next) => {
  try {
    const { name, featured, iconPath } = req.body;

    await VideoCategory.update(
      {
        name: name,
        featured: featured,
        iconPath: iconPath,
      },
      {
        where: { id: req.params.id },
      }
    );

    res
      .status(STATUS_CODE.SUCCESS)
      .json({ message: 'Category updated successfully' });
  } catch (e) {
    res.status(STATUS_CODE.BAD).json({ message: e.message });
  }
});

exports.getCategoryByVideo = asyncHandler(async (req, res, next) => {
  try {
    const { videoId } = req.params;

    const videoSubCategories = await VideoSubCategories.findAll({
      attributes: ['videoCategoryId', 'subCategOneId', 'subCategTwoId'],
      where: {
        videoId: videoId,
      },
      raw: true,
    });
    if (!videoSubCategories) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json({ success: false, videoSubCategories: null });
    }

    res.status(STATUS_CODE.SUCCESS).json({
      success: true,
      videoSubCategories,
    });
  } catch (e) {
    res.status(STATUS_CODE.BAD).json({ message: e.message });
  }
});
