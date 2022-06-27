const asyncHandler = require('../middleware/async-handler');
const { Playlist, LiveClassSchedule, PlaylistVideos, Video, User, View, VideoSubCategories } = require('../sequelize');
const { STATUS_CODE } = require('../constants');

const formatTime = (num) => {
  num = parseInt(num)
  num < 10 ? num = `0${num}` : num = `${num}`
  return num
}

exports.createNewSchedule = asyncHandler(async (req, res, next) => {
  try {
    let { title, categoryId, startHour, endHour, startMinute, endMinute, month, day, categoryList } = req.body;
    const userId = req.user.id;

    if (!title) {
      return res.status(STATUS_CODE.ERROR).json({
        success: false,
        message: 'Please give live class a name.',
      });
    }

    startHour = formatTime(startHour);
    endHour = formatTime(endHour);
    startMinute = formatTime(startMinute);
    endMinute = formatTime(endMinute);

    const newSchedule = {
      title,
      categoryId,
      userId,
      startHour,
      endHour,
      startMinute,
      endMinute,
      day,
      month
    };

    const result = await LiveClassSchedule.create(newSchedule);

    if(categoryList != undefined && categoryList.length > 0){
      categoryList.forEach(cat => {
        cat['videoId'] = result.id;
      })
      await VideoSubCategories.bulkCreate(categoryList);  
    }

    return res.status(STATUS_CODE.SUCCESS).json({
      success: true,
      message: 'Live class schedule created successfully',
      result,
    });
  } catch (e) {
    return res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
});

exports.getCategoryByClass = asyncHandler(async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    const videoSubCategories = await VideoSubCategories.findAll({
      attributes: ['videoCategoryId', 'subCategOneId', 'subCategTwoId'],
      where: {
        videoId: categoryId,
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

exports.deleteScheduleById = asyncHandler(async (req, res, next) => {
  const scheduleId = req.params.scheduleId;
  const userId = req.user.id;

  try {
    const scheduleExists = await LiveClassSchedule.findOne({
      where: { id: scheduleId, userId },
      attributes: ['id'],
    });

    if (!scheduleExists) {
      return res.status(STATUS_CODE.ERROR).json({
        message: 'schedule does not exists',
      });
    }

    await LiveClassSchedule.destroy({
      where: { id: scheduleId },
    });

    return res.status(STATUS_CODE.SUCCESS).json({
      success: true,
      message: 'Live class schedule deleted',
    });
  } catch (e) {
    return res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
});

exports.updateScheduleById = asyncHandler(async (req, res, next) => {
  try {
    let { title, categoryId, startHour, endHour, startMinute, endMinute, month, day, categoryList } = req.body;
    const scheduleId = req.params.scheduleId;
    const userId = req.user.id;

    startHour = formatTime(startHour);
    endHour = formatTime(endHour);
    startMinute = formatTime(startMinute);
    endMinute = formatTime(endMinute);

    const scheduleExists = await LiveClassSchedule.findOne({
      where: { id: scheduleId, userId },
      attributes: ['id', 'title', 'categoryId', 'startHour', 'endHour', 'startMinute', 'endMinute', 'month', 'day'],
    });

    await LiveClassSchedule.update(
      {
        title: title ? title : scheduleExists.title,
        categoryId: categoryId ? categoryId : scheduleExists.categoryId,
        startHour: startHour ? startHour : scheduleExists.startHour,
        startMinute: startMinute ? startMinute : scheduleExists.startMinute,
        endHour: endHour ? endHour : scheduleExists.endHour,
        endMinute: endMinute ? endMinute : scheduleExists.endMinute,
        month: month ? month: scheduleExists.month,
        day: day ? day: scheduleExists.day
      },
      {
        where: {
          id: scheduleExists.id,
        },
      }
    );

    if (categoryList != undefined && categoryList.length > 0) {
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

    return res.status(STATUS_CODE.SUCCESS).json({
      success: true,
      message: 'Live Class schedule updated',
    });
  } catch (e) {
    return res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
});

exports.getMonthSchedules = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.user.id;
    const month = req.params.month
    let schedules;
    schedules = await LiveClassSchedule.findAll({
      where: {
        userId,
        month
      },
    });

    return res.status(STATUS_CODE.SUCCESS).json({
      success: true,
      schedules,
    });

  } catch (e) {
    console.log(e)
    return res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
});

