const asyncHandler = require('../middleware/async-handler');
const { Playlist, PlaylistVideos, Video, User, View, UserDisplaySettings, VisitorBadge } = require('../sequelize');
const { STATUS_CODE } = require('../constants');

exports.createNewPlaylist = asyncHandler(async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.id;

    if (!title) {
      return res.status(STATUS_CODE.ERROR).json({
        success: false,
        message: 'Please give playlist name.',
      });
    }

    const isPlaylistExists = await Playlist.findOne({
      where: { title: title, userId },
      attributes: ['title'],
    });

    if (isPlaylistExists) {
      return res.status(STATUS_CODE.ERROR).json({
        message: 'Playlist with same title already exists',
      });
    }

    const newPlaylistObj = {
      title,
      description,
      userId,
    };

    const result = await Playlist.create(newPlaylistObj);

    return res.status(STATUS_CODE.SUCCESS).json({
      success: true,
      message: 'Playlist created successfully',
      result,
    });
  } catch (e) {
    return res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
});

exports.deletePlaylistById = asyncHandler(async (req, res, next) => {
  const playlistId = req.params.playlistId;
  const userId = req.user.id;

  try {
    const isPlaylistExists = await Playlist.findOne({
      where: { id: playlistId, userId },
      attributes: ['id'],
    });

    if (!isPlaylistExists) {
      return res.status(STATUS_CODE.ERROR).json({
        message: 'Playlist does not exists',
      });
    }

    await Playlist.destroy({
      where: { id: playlistId },
    });

    await PlaylistVideos.destroy({
      where: {
        playlistId: isPlaylistExists.id,
      },
    });

    return res.status(STATUS_CODE.SUCCESS).json({
      success: true,
      message: 'Playlist deleted',
    });
  } catch (e) {
    return res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
});

exports.updatePlaylistById = asyncHandler(async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const playlistId = req.params.playlistId;
    const userId = req.user.id;

    const isPlaylistExists = await Playlist.findOne({
      where: { id: playlistId, userId },
      attributes: ['id', 'title', 'description'],
    });

    await Playlist.update(
      {
        title: title ? title : isPlaylistExists.title,
        description: description ? description : isPlaylistExists.description,
      },
      {
        where: {
          id: isPlaylistExists.id,
        },
      }
    );

    return res.status(STATUS_CODE.SUCCESS).json({
      success: true,
      message: 'Playlist updated',
    });
  } catch (e) {
    return res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
});

exports.getPlaylistById = asyncHandler(async (req, res, next) => {
  try {
    const playlistId = req.params.playlistId;
    const userId = req.user.id;
    const sort = req.query.sort;
    const popularity = req.query.popularity;

    const isPlaylistExists = await Playlist.findOne({
      where: { id: playlistId, userId },
    });

    if (!isPlaylistExists) {
      return res.status(STATUS_CODE.SUCCESS).json({
        success: false,
        message: 'Playlist not found',
      });
    }

    let videosIds;

    // desc = newest first
    // asc = newest last
    if (sort && sort === 'ASC') {
      videosIds = await PlaylistVideos.findAll({
        where: {
          playlistId: playlistId,
        },
        attributes: ['id', 'videoId', 'updatedAt'],
        order: [['createdAt', 'ASC']],
      });
    } else if (sort && sort === 'DESC') {
      videosIds = await PlaylistVideos.findAll({
        where: {
          playlistId: playlistId,
        },
        attributes: ['id', 'videoId', 'updatedAt'],
        order: [['createdAt', 'DESC']],
      });
    } else {
      videosIds = await PlaylistVideos.findAll({
        where: {
          playlistId: playlistId,
        },
        attributes: ['id', 'videoId', 'updatedAt'],
        order: [['createdAt', 'DESC']],
      });
    }

    const detailedVideos = async () => {
      let videos = [];

      for (const item of videosIds) {
        const singleDetailedVideo = await Video.findOne({
          where: {
            id: item.videoId,
          },
          attributes: ['id', 'title', 'thumbnail', 'url'],
          include: [
            {
              model: User,
              attributes: ['id', 'username', 'avatar'],
            },
          ],
        });

        const views = await View.count({
          where: {
            videoId: singleDetailedVideo.id,
          },
        });

        singleDetailedVideo.setDataValue('views', views);

        videos = [
          ...videos,
          {
            singleDetailedVideo,
            columnId: item.id,
            date: item.updatedAt,
          },
        ];
      }

      if (popularity && popularity === 'HIGH') {
        return videos.sort(
          (a, b) => b.singleDetailedVideo.views - a.singleDetailedVideo.views
        );
      } else if (popularity && popularity === 'LOW') {
        return videos.sort(
          (a, b) => a.singleDetailedVideo.views - b.singleDetailedVideo.views
        );
      } else {
        return videos;
      }
    };

    return res.status(STATUS_CODE.SUCCESS).json({
      success: true,
      playlist: isPlaylistExists,
      videosOfPlaylist: await detailedVideos(),
    });
  } catch (e) {
    return res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
});

exports.getAllPlaylist = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.user.id;
    let allPlaylist;
    allPlaylist = await Playlist.findAll({
      where: {
        userId,
      },
    });

    if (allPlaylist.length > 0) {
      let playlists = [];

      for (let playlist of allPlaylist) {
        const videosRes = await PlaylistVideos.findAll({
          where: {
            playlistId: playlist.id,
          },
          attributes: ['videoId'],
        });

        const detailedVideos = async () => {
          let videos = [];

          for (const item of videosRes) {
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

            const views = await View.count({
              where: {
                videoId: singleDetailedVideo.id,
              },
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

            singleDetailedVideo.setDataValue('views', views);
            singleDetailedVideo.setDataValue(
              'userSettings',
              userSettings
            );

            videos = [
              ...videos,
              {
                ...singleDetailedVideo.dataValues,
              },
            ];
          }

          return videos;
        };

        const obj = {
          id: playlist.id,
          title: playlist.title,
          description: playlist.description,
          createdAt: playlist.createdAt,
          videos: await detailedVideos(),
        };

        playlists.push(obj);
      }

      return res.status(STATUS_CODE.SUCCESS).json({
        success: true,
        playlists,
      });
    } else {
      return res.status(STATUS_CODE.ERROR).json({
        success: false,
        message: 'No playlist found',
      });
    }
  } catch (e) {
    return res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
});

exports.addVideoToPlaylist = asyncHandler(async (req, res, next) => {
  try {
    const playlistId = req.params.playlistId;
    const { videoId } = req.body;
    const userId = req.user.id;

    const isPlaylistExists = await Playlist.findOne({
      where: { id: playlistId, userId },
      attributes: ['id', 'title'],
    });

    if (isPlaylistExists) {
      await PlaylistVideos.create({
        videoId: videoId,
        playlistId: isPlaylistExists.id,
      });

      await Playlist.update(
        {
          title: isPlaylistExists.title,
        },
        {
          where: {
            id: isPlaylistExists.id,
          },
        }
      );

      return res.status(STATUS_CODE.SUCCESS).json({
        success: true,
        message: `Video added to ${isPlaylistExists.title} Playlist`,
      });
    } else {
      return res.status(STATUS_CODE.ERROR).json({
        success: false,
        message: 'No playlist found',
      });
    }
  } catch (e) {
    return res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
});

exports.removeVideoFromPlaylist = asyncHandler(async (req, res, next) => {
  try {
    const playlistId = req.params.playlistId;
    const userId = req.user.id;
    const { videoId } = req.body;
    const isPlaylistExists = await Playlist.findOne({
      where: { id: playlistId, userId },
      attributes: ['id', 'title'],
    });
    if (isPlaylistExists) {
      await PlaylistVideos.destroy({
        where: {
          videoId: videoId,
          playlistId: playlistId,
        },
      });
      return res.status(STATUS_CODE.SUCCESS).json({
        success: true,
        message: `Video removed from ${isPlaylistExists.title} playlist`,
      });
    } else {
      return res.status(STATUS_CODE.ERROR).json({
        success: false,
        message: 'No playlist found',
      });
    }
  } catch (e) {
    return res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
});
