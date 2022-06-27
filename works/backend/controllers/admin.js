const { User, Video } = require('../sequelize');
const asyncHandler = require('../middleware/async-handler');
const { STATUS_CODE } = require('../constants');

exports.getUsers = asyncHandler(async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'firstname', 'lastname', 'username', 'email'],
    });

    res.status(STATUS_CODE.SUCCESS).json({ success: true, data: users });
  } catch (e) {
    res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
});

exports.removeUser = asyncHandler(async (req, res, next) => {
  try {
    await User.destroy({
      where: { username: req.params.username },
    });

    res.status(STATUS_CODE.SUCCESS).json({ success: true, data: {} });
  } catch (e) {
    res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
});

exports.removeVideo = asyncHandler(async (req, res, next) => {
  try {
    await Video.destroy({
      where: { id: req.params.id },
    });

    res.status(STATUS_CODE.SUCCESS).json({ success: true, data: {} });
  } catch (e) {
    res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
});

exports.getVideos = asyncHandler(async (req, res, next) => {
  try {
    const videos = await Video.findAll({
      attributes: ['id', 'title', 'description', 'url', 'thumbnail', 'userId'],
    });

    res.status(STATUS_CODE.SUCCESS).json({ success: true, data: videos });
  } catch (e) {
    res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
});
