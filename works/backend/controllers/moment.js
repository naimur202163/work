const asyncHandler = require('../middleware/async-handler');
const { STATUS_CODE } = require('../constants');
const {
  Moments,
  User,
  UserDisplaySettings,
  VisitorBadge,
  MomentsTagPeople,
  Connections,
  HashTag,
  VideoHashTag,
} = require('../sequelize');
const { Op } = require('sequelize');

exports.uploadMoment = asyncHandler(async (req, res, next) => {
  try {
    const {
      caption,
      whoCanWatch,
      whoCanMessage,
      featured,
      featuredFormorder,
      staffPick,
      staffPickFormOrder,
      videoUrl,
      fileSize,
      videoLength,
      coverImgUrl,
      categoryId,
      hashTags,
    } = req.body;

    if (!whoCanMessage || !whoCanWatch || !coverImgUrl || !videoUrl) {
      return next({
        message:
          'These are the required fields: whoCanMessage, whoCanWatch, coverImgUrl, videoUrl',
        statusCode: 400,
      });
    }

    const newMoment = await Moments.create({
      caption,
      whoCanMessage: parseInt(whoCanMessage),
      whoCanWatch: parseInt(whoCanWatch),
      featured,
      featuredFormorder,
      staffPick,
      staffPickFormOrder,
      videoUrl,
      fileSize,
      coverImgUrl,
      videoLength,
      categoryId,
      userId: req.user.id,
    });

    // add new hashtags
    let newHashTags = [];
    let hashTagNameFilters = [];
    for (let i = 0; i < hashTags.length; i++) {
      hashTagNameFilters.push(hashTags[i].name);
      if (!hashTags[i].id) {
        newHashTags.push({ name: hashTags[i].name });
      }
    }

    // check hashtags and if new hashtag is found then insert it into hashtag table
    if (newHashTags.length > 0) {
      await HashTag.bulkCreate(newHashTags);
    }

    // hashtags link to moment in video hashtag table
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
          momentId: newMoment.id,
          hashTagId: newHashTags[i].id,
          videoContentType: 1,
        });
      }

      newHashTags = [];
      newHashTags = await VideoHashTag.bulkCreate(videoHashTags);
    }

    res.status(STATUS_CODE.SUCCESS).json({ success: true, data: newMoment });
  } catch (e) {
    res.status(STATUS_CODE.BAD).json({ message: e.message });
  }
});

exports.getMoments = asyncHandler(async (req, res, next) => {
  try {
    const allMoments = await Moments.findAll({
      attributes: [
        'id',
        'caption',
        'whoCanMessage',
        'whoCanWatch',
        'videoUrl',
        'fileSize',
        'coverImgUrl',
        'videoLength',
        'categoryId',
      ],
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: User,
          attributes: ['id', 'avatar', 'username'],
        },
        {
          model: VideoHashTag,
        },
      ],
    });

    if (!allMoments.length) {
      return next({
        message: 'No moments found',
        statusCode: 404,
      });
    }

    res.status(STATUS_CODE.SUCCESS).json({ success: true, data: allMoments });
  } catch (e) {
    res.status(STATUS_CODE.BAD).json({ message: e.message });
  }
});

exports.deleteMoment = asyncHandler(async (req, res, next) => {
  try {
    const momentId = req.params.momentId;

    const moment = await Moments.findOne({
      where: {
        id: momentId,
      },
      attributes: ['id', 'videoUrl', 'coverImgUrl'],
    });

    if (!moment) {
      return next({
        message: 'No moment found',
        statusCode: 404,
      });
    }

    await Moments.destroy({
      where: {
        id: moment.id,
      },
    });

    res
      .status(STATUS_CODE.SUCCESS)
      .json({ success: true, message: 'Moment deleted successfully' });
  } catch (e) {
    res.status(STATUS_CODE.BAD).json({ message: e.message });
  }
});

exports.getMoment = asyncHandler(async (req, res, next) => {
  try {
    const momentId = req.params.momentId;

    const moment = await Moments.findOne({
      where: {
        id: momentId,
      },
      attributes: [
        'id',
        'caption',
        'whoCanMessage',
        'whoCanWatch',
        'videoUrl',
        'fileSize',
        'coverImgUrl',
        'videoLength',
      ],
      include: [
        {
          model: User,
          attributes: ['id', 'username', 'avatar'],
        },
      ],
    });

    if (!moment) {
      return next({
        message: 'No moment found',
        statusCode: 404,
      });
    }

    const userSettings = await UserDisplaySettings.findOne({
      where: { userId: moment.User.id },
      attributes: [],
      include: [
        {
          model: VisitorBadge,
          attributes: ['imgPath'],
        },
      ],
    });

    const isVideoMine = req.user.id === moment.User.id;

    moment.setDataValue('userSettings', userSettings);
    moment.setDataValue('isVideoMine', isVideoMine);

    res.status(STATUS_CODE.SUCCESS).json({ success: true, data: moment });
  } catch (e) {
    res.status(STATUS_CODE.BAD).json({ message: e.message });
  }
});

exports.updateMoment = asyncHandler(async (req, res, next) => {
  try {
    const momentId = req.params.momentId;

    const {
      caption,
      whoCanWatch,
      whoCanMessage,
      featured,
      featuredFormorder,
      staffPick,
      staffPickFormOrder,
      videoUrl,
      fileSize,
      videoLength,
      coverImgUrl,
      categoryId,
    } = req.body;

    const moment = await Moments.findOne({
      where: {
        id: momentId,
      },
      attributes: [
        'id',
        'caption',
        'whoCanMessage',
        'whoCanWatch',
        'videoUrl',
        'fileSize',
        'coverImgUrl',
        'videoLength',
      ],
    });

    if (!moment) {
      return next({
        message: 'No moment found',
        statusCode: 404,
      });
    }

    await Moments.update(
      {
        caption: caption ? caption : moment.caption,
        whoCanMessage: whoCanMessage ? whoCanMessage : moment.whoCanMessage,
        whoCanWatch: whoCanWatch ? whoCanWatch : moment.whoCanWatch,
        featured: featured ? featured : moment.featured,
        featuredFormorder: featuredFormorder
          ? featuredFormorder
          : moment.featuredFormorder,
        staffPick: staffPick ? staffPick : moment.staffPick,
        staffPickFormOrder: staffPickFormOrder
          ? staffPickFormOrder
          : moment.staffPickFormOrder,
        videoUrl: videoUrl ? videoUrl : moment.videoUrl,
        videoLength: videoLength ? videoLength : moment.videoLength,
        fileSize: fileSize ? fileSize : moment.fileSize,
        coverImgUrl: coverImgUrl ? coverImgUrl : moment.coverImgUrl,
        categoryId: categoryId ? categoryId : moment.categoryId,
      },
      {
        where: {
          id: moment.id,
        },
      }
    );

    res
      .status(STATUS_CODE.SUCCESS)
      .json({ success: true, message: 'Moment updated successfully' });
  } catch (e) {
    res.status(STATUS_CODE.BAD).json({ message: e.message });
  }
});

exports.tagPeopleInMoment = asyncHandler(async (req, res, next) => {
  try {
    const momentId = req.params.momentId;
    const { tagUser } = req.body;

    const moment = await Moments.findOne({
      where: {
        id: momentId,
      },
      attributes: ['id'],
      include: [
        {
          model: User,
          attributes: ['id', 'username', 'avatar'],
        },
      ],
    });

    if (!moment) {
      return next({
        message: 'Moment not found',
        statusCode: 404,
      });
    }

    const isConnected = await Connections.findOne({
      where: {
        isApproved: true,
        [Op.or]: [
          {
            WarriorUserId: tagUser,
          },
          {
            CollaboratorUserId: tagUser,
          },
        ],
      },

      attributes: ['id'],
    });

    if (isConnected) {
      const isAlreadyTagged = await MomentsTagPeople.findOne({
        where: {
          momentId,
          TaggedUserId: tagUser,
        },
        attributes: ['id'],
      });

      if (isAlreadyTagged) {
        return next({
          message: 'User is already tagged to this Moment',
        });
      }

      await MomentsTagPeople.create({
        momentId,
        WarriorUserId: moment.User.id,
        TaggedUserId: tagUser,
      });

      res.status(STATUS_CODE.SUCCESS).json({
        success: true,
        message: 'User tagged successfully',
      });
    } else {
      return next({
        message: 'You are not connected with this user to tag',
        statusCode: 404,
      });
    }
  } catch (e) {
    res.status(STATUS_CODE.BAD).json({ message: e.message });
  }
});

exports.getAllTaggedUsers = asyncHandler(async (req, res, next) => {
  try {
    const momentId = req.params.momentId;
    const { tagUser } = req.body;

    const moment = await Moments.findOne({
      where: {
        id: momentId,
      },
      attributes: ['id'],
      include: [
        {
          model: User,
          attributes: ['id', 'username', 'avatar'],
        },
      ],
    });

    if (!moment) {
      return next({
        message: 'Moment not found',
        statusCode: 404,
      });
    }

    const findAllTaggedUsers = await MomentsTagPeople.findAll({
      where: {
        momentId,
      },

      attributes: ['momentId', 'TaggedUserId', 'WarriorUserId'],
    });

    if (!findAllTaggedUsers.length) {
      return next({
        message: 'No tagged users in moment',
        statusCode: 404,
      });
    }

    res.status(STATUS_CODE.SUCCESS).json({
      success: true,
      data: findAllTaggedUsers,
    });
  } catch (e) {
    res.status(STATUS_CODE.BAD).json({ message: e.message });
  }
});
