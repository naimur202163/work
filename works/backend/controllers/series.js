const asyncHandler = require('../middleware/async-handler');
const cloudinary = require('cloudinary');
const { Op, Sequelize } = require('sequelize');
const { STATUS_CODE } = require('../constants');
const {
  PPVUnlocks,
  Series,
  SeriesVideos,
  Video,
  User,
  View,
  UserDisplaySettings,
  VisitorBadge,
  Subscription,
  VideoLike,
  SeriesProgress,
  ProgressVideo,
} = require('../sequelize');

exports.getAllSeries = asyncHandler(async (req, res, next) => {
  try {
    let allSeries;

    allSeries = await Series.findAll({
      attributes: [
        'id',
        'title',
        'price',
        'thumbnail',
        'description',
        'userId',
      ],
      order: [['createdAt', 'DESC']],
    });

    if (allSeries.length > 0) {
      let series = [];

      for (let item of allSeries) {
        const videosRes = await SeriesVideos.findAll({
          where: {
            seriesId: item.id,
          },
          attributes: ['videoId'],
        });

        const userInfo = await User.findByPk(item.userId, {
          attributes: ['firstname', 'lastname', 'username'],
        });

        const obj = {
          id: item.id,
          title: item.title,
          price: item.price,
          thumbnail: item.thumbnail,
          description: item.description,
          userInfo: {
            firstname: userInfo.firstname,
            lastname: userInfo.lastname,
            username: userInfo.username,
          },
          videos: videosRes,
        };

        series.push(obj);
      }

      return res.status(STATUS_CODE.SUCCESS).json({
        success: true,
        series,
      });
    } else {
      return res.status(STATUS_CODE.ERROR).json({
        success: false,
        message: 'No series found',
      });
    }
  } catch (e) {
    return res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
});

exports.getAllSeriesOfUser = asyncHandler(async (req, res, next) => {
  try {
    const username = req.params.username;

    const user = await User.findOne({
      where: {
        username,
      },
      attributes: ['id', 'username'],
    });

    if (!user) {
      return res.status(STATUS_CODE.ERROR).json({
        success: false,
        message: 'No user found',
      });
    }

    let allSeries;

    allSeries = await Series.findAll({
      where: {
        userId: user.id,
      },
      attributes: [
        'id',
        'title',
        'price',
        'thumbnail',
        'description',
        'publicId',
        'createdAt',
      ],
    });

    if (allSeries.length > 0) {
      let series = [];

      for (let item of allSeries) {
        const videosRes = await SeriesVideos.findAll({
          where: {
            seriesId: item.id,
          },
          attributes: ['videoId'],
        });

        const obj = {
          id: item.id,
          title: item.title,
          price: item.price,
          thumbnail: item.thumbnail,
          description: item.description,
          publicId: item.publicId,
          createdAt: item.createdAt,
          videos: videosRes,
          user,
        };

        series.push(obj);
      }

      return res.status(STATUS_CODE.SUCCESS).json({
        success: true,
        series,
      });
    } else {
      return res.status(STATUS_CODE.ERROR).json({
        success: false,
        message: 'No series found',
      });
    }
  } catch (e) {
    return res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
});

exports.createNewSeries = asyncHandler(async (req, res, next) => {
  try {
    const { title, description, thumbnail, price, publicId } = req.body;
    const userId = req.user.id;

    if (!title || !thumbnail) {
      return res.status(STATUS_CODE.ERROR).json({
        success: false,
        message: 'Title and Thumbnail are mandatory fields',
      });
    }

    const isSeriesExist = await Series.findOne({
      where: { title: title, userId },
      attributes: ['title'],
    });

    if (isSeriesExist) {
      return res.status(STATUS_CODE.ERROR).json({
        message: 'Series with same title already exists',
      });
    }

    const newSeriesObj = {
      title,
      description,
      userId,
      thumbnail,
      price,
      publicId,
    };

    const result = await Series.create(newSeriesObj);

    return res.status(STATUS_CODE.SUCCESS).json({
      success: true,
      message: 'Series created successfully',
      result,
    });
  } catch (e) {
    return res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
});

exports.getSeriesById = asyncHandler(async (req, res, next) => {
  try {
    const seriesId = req.params.seriesId;
    let seriesInfo = {};

    const isSeriesExist = await Series.findOne({
      where: { id: seriesId },
    });

    if (!isSeriesExist) {
      return res.status(STATUS_CODE.SUCCESS).json({
        success: false,
        message: 'Series not found',
      });
    }

    const userInfo = await User.findByPk(isSeriesExist.userId, {
      attributes: ['firstname', 'lastname', 'username', 'avatar'],
    });

    seriesInfo = {
      ...isSeriesExist.dataValues,
      userInfo: {
        firstname: userInfo.firstname,
        lastname: userInfo.lastname,
        username: userInfo.username,
        avatar: userInfo.avatar,
      },
    };

    const videosIds = await SeriesVideos.findAll({
      where: {
        seriesId,
      },
      attributes: ['id', 'videoId', 'updatedAt'],
      order: [['order', 'ASC']],
    });

    const detailedVideos = async () => {
      let videos = [];

      for (const item of videosIds) {
        const singleDetailedVideo = await Video.findOne({
          where: {
            id: item.videoId,
          },
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
          ],
          include: [
            {
              model: User,
              attributes: ['id', 'username', 'avatar', 'stripe_account_id'],
            },
          ],
        });

        const userSettings = await UserDisplaySettings.findOne({
          where: { userId: singleDetailedVideo.User.id },
          attributes: [],
          include: [
            {
              model: VisitorBadge,
              attributes: ['imgPath'],
            },
          ],
        });

        const isVideoMine = req.user.id === singleDetailedVideo.User.id;

        const isSubscribed = await Subscription.findOne({
          where: {
            subscriber: req.user.id,
            subscribeTo: singleDetailedVideo.User.id,
          },
        });

        const isLiked = await VideoLike.findOne({
          where: {
            [Op.and]: [
              { videoId: singleDetailedVideo.id },
              { userId: req.user.id },
              { like: 1 },
            ],
          },
        });

        const isDisliked = await VideoLike.findOne({
          where: {
            [Op.and]: [
              { videoId: singleDetailedVideo.id },
              { userId: req.user.id },
              { like: -1 },
            ],
          },
        });

        const views = await View.count({
          where: {
            videoId: singleDetailedVideo.id,
          },
        });

        singleDetailedVideo.setDataValue('views', views);
        singleDetailedVideo.setDataValue('userSettings', userSettings);
        singleDetailedVideo.setDataValue('isVideoMine', isVideoMine);
        singleDetailedVideo.setDataValue('isSubscribed', !!isSubscribed);
        singleDetailedVideo.setDataValue('isLiked', !!isLiked);
        singleDetailedVideo.setDataValue('isDisliked', !!isDisliked);

        videos = [
          ...videos,
          {
            singleDetailedVideo,
            columnId: item.id,
            date: item.updatedAt,
          },
        ];
      }

      return videos;
    };

    res.status(STATUS_CODE.SUCCESS).json({
      success: true,
      message: 'Series found successfully',
      seriesVideos: await detailedVideos(),
      seriesInfo,
    });
  } catch (e) {
    return res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
});

exports.dragDropSeriesVideos = asyncHandler(async (req, res, next) => {
  try {
    const { videoId, order } = req.body;
    const seriesId = req.params.seriesId;

    const seriesVideo = await SeriesVideos.findAll({
      where: {
        seriesId,
        videoId,
      },
    });

    if (!seriesVideo) {
      return res.status(STATUS_CODE.SUCCESS).json({
        success: false,
        message: 'No series to sort',
      });
    }

    await SeriesVideos.update(
      {
        order,
      },
      {
        where: {
          seriesId,
          videoId,
        },
      }
    );

    return res.status(STATUS_CODE.SUCCESS).json({
      success: true,
      message: 'Videos sorted successfully',
    });
  } catch (error) {
    return res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
});

exports.updateSeriesById = asyncHandler(async (req, res, next) => {
  try {
    const { title, description, price, thumbnail, publicId } = req.body;
    const seriesId = req.params.seriesId;
    const userId = req.user.id;

    const isSeriesExist = await Series.findOne({
      where: { id: seriesId, userId },
      attributes: ['id', 'title', 'description', 'price', 'publicId'],
    });

    if (!isSeriesExist) {
      return res.status(STATUS_CODE.SUCCESS).json({
        success: false,
        message: 'Series not found',
      });
    }

    if (thumbnail) {
      await cloudinary.v2.uploader.destroy(isSeriesExist.publicId, {
        resource_type: 'image',
      });
    }

    await Series.update(
      {
        title: title ? title : isSeriesExist.title,
        description: description ? description : isSeriesExist.description,
        price: price ? price : isSeriesExist.price,
        thumbnail: thumbnail ? thumbnail : isSeriesExist.thumbnail,
        publicId: publicId ? publicId : isSeriesExist.publicId,
      },
      {
        where: {
          id: isSeriesExist.id,
        },
      }
    );

    return res.status(STATUS_CODE.SUCCESS).json({
      success: true,
      message: 'Series updated',
    });
  } catch (e) {
    return res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
});

exports.deleteSeriesById = asyncHandler(async (req, res, next) => {
  const seriesId = req.params.seriesId;
  const userId = req.user.id;

  try {
    const isSeriesExist = await Series.findOne({
      where: { id: seriesId, userId },
      attributes: ['id', 'publicId'],
    });

    if (!isSeriesExist) {
      return res.status(STATUS_CODE.ERROR).json({
        message: 'Series does not exists',
      });
    }

    await cloudinary.v2.uploader.destroy(isSeriesExist.publicId, {
      resource_type: 'image',
    });

    await Series.destroy({
      where: { id: seriesId },
    });

    await SeriesVideos.destroy({
      where: {
        seriesId: isSeriesExist.id,
      },
    });

    return res.status(STATUS_CODE.SUCCESS).json({
      success: true,
      message: 'Series deleted',
    });
  } catch (e) {
    return res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
});

exports.addVideoToSeries = asyncHandler(async (req, res, next) => {
  try {
    const seriesId = req.params.seriesId;
    const { videoId } = req.body;
    const userId = req.user.id;

    const isSeriesExist = await Series.findOne({
      where: { id: seriesId, userId },
      attributes: ['id', 'title'],
    });

    if (isSeriesExist) {
      const numVideos = await SeriesVideos.count({
        where: {
          seriesId: isSeriesExist.id,
        },
      });

      await SeriesVideos.create({
        videoId,
        seriesId: isSeriesExist.id,
        order: numVideos + 1,
      });

      return res.status(STATUS_CODE.SUCCESS).json({
        success: true,
        message: `Video added to ${isSeriesExist.title} Series`,
      });
    } else {
      return res.status(STATUS_CODE.ERROR).json({
        success: false,
        message: 'No Series found',
      });
    }
  } catch (e) {
    return res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
});

exports.removeVideoFromSeries = asyncHandler(async (req, res, next) => {
  try {
    const seriesId = req.params.seriesId;
    const userId = req.user.id;
    const { videoId } = req.body;
    const isSeriesExist = await Series.findOne({
      where: { id: seriesId, userId },
      attributes: ['id', 'title'],
    });
    if (isSeriesExist) {
      await SeriesVideos.destroy({
        where: {
          videoId,
          seriesId,
        },
      });
      return res.status(STATUS_CODE.SUCCESS).json({
        success: true,
        message: `Video removed from ${isSeriesExist.title} series`,
      });
    } else {
      return res.status(STATUS_CODE.ERROR).json({
        success: false,
        message: 'No series found',
      });
    }
  } catch (e) {
    return res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
});

exports.getAllPurchasedSeries = asyncHandler(async (req, res, next) => {
  try {
    const userUnlocks = await PPVUnlocks.findAll({
      where: {
        userId: req.user.id,
      },
    });

    const allSeries = userUnlocks.filter((item) => item.seriesId !== null);

    const detailedSeries = async () => {
      let series = [];

      for (const item of allSeries) {
        const singleDetailedSeries = await Series.findOne({
          where: {
            id: item.seriesId,
          },
          attributes: ['id', 'title', 'description', 'thumbnail', 'price'],
        });

        const userInfo = await User.findByPk(item.userId, {
          attributes: ['firstname', 'lastname', 'username', 'avatar'],
        });

        const seriesProgress = await SeriesProgress.findOne({
          where: {
            seriesId: singleDetailedSeries.id,
            userId: req.user.id,
          },
          attributes: ['percentage'],
        });

        const videosIds = await SeriesVideos.findAll({
          where: {
            seriesId: singleDetailedSeries.id,
          },
          attributes: ['id', 'videoId', 'updatedAt'],
          order: [['order', 'ASC']],
        });

        const detailedVideos = async () => {
          let videos = [];

          for (const item of videosIds) {
            const singleDetailedVideo = await Video.findOne({
              where: {
                id: item.videoId,
              },
              attributes: ['id', 'url', 'videoLength'],
            });

            videos = [
              ...videos,
              {
                singleDetailedVideo,
                columnId: item.id,
                date: item.updatedAt,
              },
            ];
          }

          return videos;
        };

        series = [
          ...series,
          {
            singleDetailedSeries,
            userInfo,
            seriesProgress,
            seriesVideos: await detailedVideos(),
          },
        ];
      }

      return series;
    };

    if (allSeries.length > 0) {
      res.status(STATUS_CODE.SUCCESS).json({
        allSeries: await detailedSeries(),
      });
    } else {
      return res.status(STATUS_CODE.ERROR).json({
        success: false,
        message: 'No series found',
      });
    }
  } catch (error) {
    res.status(STATUS_CODE.BAD).json({ message: e.message });
  }
});

exports.getSinglePurchasedCourse = asyncHandler(async (req, res, next) => {
  // n
  try {
    const seriesId = req.params.id;

    const purchasedSeries = await PPVUnlocks.findOne({
      where: {
        seriesId,
        userId: req.user.id,
      },
    });

    if (purchasedSeries) {
      res.status(STATUS_CODE.SUCCESS).json({
        status: true,
        purchasedSeries,
      });
    } else {
      res.status(STATUS_CODE.SUCCESS).json({
        status: false,
        message: 'Series not purchased',
      });
    }
  } catch (e) {
    res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
});

exports.createSeriesProgress = asyncHandler(async (req, res, next) => {
  // n
  try {
    const seriesId = req.params.seriesId;

    const series = await Series.findByPk(seriesId, {
      attributes: ['id'],
    });

    if (!series) {
      return res.status(400).json({
        status: false,
        message: 'Series not found',
      });
    }

    const isProgressExist = await SeriesProgress.findOne({
      where: {
        seriesId,
        userId: req.user.id,
      },
    });

    if (isProgressExist) {
      return res.status(400).json({
        status: false,
        message: 'Progress already exists for this series',
      });
    }

    const purchasedSeries = await PPVUnlocks.findOne({
      where: {
        userId: req.user.id,
        seriesId: series.id,
      },
    });

    if (!purchasedSeries) {
      return res.status(400).json({
        status: false,
        message: 'You have not purchased this series yet',
      });
    }

    await SeriesProgress.create({
      userId: req.user.id,
      seriesId: seriesId,
    });

    res.status(201).json({
      status: true,
      message: 'Progress created for the purchased series',
    });
  } catch (e) {
    res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
});

exports.updateSeriesProgress = asyncHandler(async (req, res, next) => {
  //n

  try {
    const seriesId = req.params.seriesId;
    const videoId = req.params.videoId;
    const userId = req.user.id;

    const seriesProgress = await SeriesProgress.findOne({
      where: {
        seriesId,
        userId,
      },

      attributes: ['id', 'seriesId', 'percentage'],
    });

    const video = await SeriesVideos.findOne({
      where: {
        seriesId,
        videoId,
      },
    });

    if (!video || !seriesProgress) {
      return res.status(400).json({
        status: false,
        message: 'Corresponding series or video not found',
      });
    }

    const isVideoAlreadyAdded = await ProgressVideo.findOne({
      where: {
        seriesProgressId: seriesProgress.id,
        videoId,
        userId,
      },
    });

    if (isVideoAlreadyAdded) {
      return res.status(400).json({
        status: false,
        message: 'Video already added to the progress',
      });
    }

    const actualVideo = await Video.findByPk(videoId, {
      attributes: ['id', 'videoLength'],
    });

    const seriesVideosIds = await SeriesVideos.findAll({
      where: { seriesId },
      attributes: ['id', 'videoId'],
    });

    const calculateTotalDuration = async () => {
      let totalDuration = 0;

      for (const item of seriesVideosIds) {
        const singleDetailedVideo = await Video.findOne({
          where: {
            id: item.videoId,
          },
          attributes: ['videoLength'],
        });

        totalDuration += +singleDetailedVideo.videoLength;
      }

      return totalDuration;
    };

    const calculatePercentage = async () => {
      const totalDuration = await calculateTotalDuration();
      const videoDuration = +actualVideo.videoLength;
      let percentage;

      if (totalDuration > 0 && videoDuration > 0) {
        percentage = (100 * videoDuration) / totalDuration;
      } else {
        percentage = 0;
      }

      return percentage;
    };

    const currentPercent = await calculatePercentage();

    if (currentPercent !== 0) {
      const percentage = +seriesProgress.percentage + +currentPercent.toFixed();

      await SeriesProgress.update(
        {
          percentage: percentage,
        },
        {
          where: {
            seriesId,
            userId: req.user.id,
          },
        }
      );
    }

    await ProgressVideo.create({
      videoId: actualVideo.id,
      seriesProgressId: seriesProgress.id,
      userId,
    });

    res.status(201).json({
      status: true,
      message: 'Progress updated successfully',
    });
  } catch (e) {
    res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
});
