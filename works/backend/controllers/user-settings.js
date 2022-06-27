const asyncHandler = require('../middleware/async-handler');
const { UserDisplaySettings, VisitorBadge } = require('../sequelize');
const { MESSAGES, RESPONSE_STATUS, STATUS_CODE } = require('../constants');

exports.createUserSettings = asyncHandler(async (req, res) => {
  try {
    const {
      outOfThisWorld,
      country,
      city,
      state,
      proContentProducer,
      partnerContentCreator,
      contactViaEmail,
      visitorBadgeId,
      userId,
    } = req.body;

    const userSettingsObj = {
      outOfThisWorld,
      country,
      city,
      state,
      proContentProducer,
      partnerContentCreator,
      contactViaEmail,
      visitorBadgeId,
      userId,
    };

    if (!visitorBadgeId || !userId) {
      return res.status(STATUS_CODE.BAD).json({
        status: RESPONSE_STATUS.ERROR,
        message: MESSAGES.USER_SETTING.FIELD_IS_REQUIRED,
      });
    }

    const result = await UserDisplaySettings.create(userSettingsObj);

    res.status(STATUS_CODE.CREATED).json({
      status: RESPONSE_STATUS.SUCCESS,
      result,
    });
  } catch (e) {
    res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
});

exports.deleteUserSettingsById = asyncHandler(async (req, res) => {
  try {
    const userSettingId = req.params.id;
    const isUserSettingExist = await UserDisplaySettings.findByPk(
      userSettingId
    );

    if (!isUserSettingExist) {
      return res.status(STATUS_CODE.NOT_FOUND).json({
        status: RESPONSE_STATUS.ERROR,
        message: MESSAGES.USER_SETTING.NO_USER_SETTING_FOUND,
      });
    }

    await UserDisplaySettings.destroy({
      where: { id: userSettingId },
    });

    res.status(STATUS_CODE.SUCCESS).json({
      status: RESPONSE_STATUS.SUCCESS,
      message: MESSAGES.USER_SETTING.USER_SETTING_DELETED,
    });
  } catch (e) {
    res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
});

exports.updateUserSettingsById = asyncHandler(async (req, res) => {
  try {
    const userSettingId = req.params.id;
    const isUserSettingExist = await UserDisplaySettings.findByPk(
      userSettingId
    );
    const { country, city, state, outOfThisWorld } = req.body;

    if (!isUserSettingExist) {
      return res.status(STATUS_CODE.NOT_FOUND).json({
        status: RESPONSE_STATUS.ERROR,
        message: MESSAGES.USER_SETTING.NO_USER_SETTING_FOUND,
      });
    }

    let updatedObj;
    if (outOfThisWorld === true) {
      updatedObj = {
        country: null,
        city: null,
        state: null,
        outOfThisWorld:
          typeof outOfThisWorld === 'boolean'
            ? outOfThisWorld
            : isUserSettingExist.outOfThisWorld,
      };
    } else {
      updatedObj = {
        country: country ? country : isUserSettingExist.country,
        city: city ? city : isUserSettingExist.city,
        state: state ? state : isUserSettingExist.state,
        outOfThisWorld: false,
      };
    }

    await UserDisplaySettings.update(updatedObj, {
      where: {
        id: userSettingId,
      },
    });

    res.status(STATUS_CODE.SUCCESS).json({
      status: RESPONSE_STATUS.SUCCESS,
      message: MESSAGES.USER_SETTING.USER_SETTING_UPDATED,
    });
  } catch (e) {
    res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
});

exports.getAllUserSettingsById = asyncHandler(async (req, res) => {
  try {
    const Usersettings = await UserDisplaySettings.findAll({
      attributes: [
        'id',
        'outOfThisWorld',
        'country',
        'state',
        'city',
        'proContentProducer',
        'partnerContentCreator',
        'contactViaEmail',
        'visitorBadgeId',
        'userId',
      ],
    });

    return res.status(STATUS_CODE.SUCCESS).json({
      status: RESPONSE_STATUS.SUCCESS,
      Usersettings,
    });
  } catch (e) {
    res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
});

exports.getSingleUserSettingsById = asyncHandler(async (req, res) => {
  try {
    const userSettingId = req.params.id;
    const isUserSettingExist = await UserDisplaySettings.findByPk(
      userSettingId
    );

    if (!isUserSettingExist) {
      return res.status(STATUS_CODE.NOT_FOUND).json({
        status: RESPONSE_STATUS.ERROR,
        message: MESSAGES.USER_SETTING.NO_USER_SETTING_FOUND,
      });
    }

    res.status(STATUS_CODE.SUCCESS).json({
      status: RESPONSE_STATUS.SUCCESS,
      userSetting: isUserSettingExist,
    });
  } catch (e) {
    res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
});

exports.getSingleUserSettingByUserId = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.userId;
    const isUserSettingExist = await UserDisplaySettings.findAll({
      where: { userId },
      attributes: [
        'id',
        'outOfThisWorld',
        'country',
        'city',
        'state',
        'proContentProducer',
        'partnerContentCreator',
        'contactViaEmail',
        'userId',
      ],
      include: [
        {
          model: VisitorBadge,
          attributes: ['imgPath'],
        },
      ],
    });

    if (!isUserSettingExist) {
      return res.status(STATUS_CODE.NOT_FOUND).json({
        status: RESPONSE_STATUS.ERROR,
        message: MESSAGES.USER_SETTING.NO_USER_SETTING_FOUND,
      });
    }

    res.status(STATUS_CODE.SUCCESS).json({
      status: RESPONSE_STATUS.SUCCESS,
      userSetting: isUserSettingExist,
    });
  } catch (e) {
    res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
});

exports.updateVisitorBadge = asyncHandler(async (req, res, next) => {
  try {
    const { userId, visitorBadgeId } = req.body;

    const isUserSettingExist = await UserDisplaySettings.findOne({
      where: { userId: userId },
    });
    if (!isUserSettingExist) {
      return res.status(STATUS_CODE.NOT_FOUND).json({
        status: RESPONSE_STATUS.ERROR,
        message: MESSAGES.USER_SETTING.NO_USER_SETTING_FOUND,
      });
    }
    isUserSettingExist.visitorBadgeId = visitorBadgeId;
    await isUserSettingExist.save();
    await isUserSettingExist.reload();
    res.status(STATUS_CODE.SUCCESS).json({
      status: RESPONSE_STATUS.SUCCESS,
      userSetting: isUserSettingExist,
    });
  } catch (e) {
    res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
});

exports.updateUserSettingsByUserId = asyncHandler(async (req, res) => {
  try {
    const {
      outOfThisWorld,
      country,
      city,
      state,
      proContentProducer,
      partnerContentCreator,
      contactViaEmail,
      visitorBadgeId,
      userId,
    } = req.body;

    const isUserSettingExist = await UserDisplaySettings.findOne({
      where: { userId: userId },
    });

    if (!isUserSettingExist) {
      return res.status(STATUS_CODE.NOT_FOUND).json({
        status: RESPONSE_STATUS.ERROR,
        message: MESSAGES.USER_SETTING.NO_USER_SETTING_FOUND,
      });
    }

    const updatedObj = {
      country: country ? country : isUserSettingExist.country,
      city: city ? city : isUserSettingExist.city,
      state: state ? state : isUserSettingExist.state,
      outOfThisWorld: outOfThisWorld
        ? outOfThisWorld
        : isUserSettingExist.outOfThisWorld,
      proContentProducer: proContentProducer
        ? proContentProducer
        : isUserSettingExist.proContentProducer,
      partnerContentCreator: partnerContentCreator
        ? partnerContentCreator
        : isUserSettingExist.partnerContentCreator,
      contactViaEmail: contactViaEmail
        ? contactViaEmail
        : isUserSettingExist.contactViaEmail,
      visitorBadgeId: visitorBadgeId,
    };

    await UserDisplaySettings.update(updatedObj, {
      where: {
        userId: userId,
      },
    });

    res.status(STATUS_CODE.SUCCESS).json({
      status: RESPONSE_STATUS.SUCCESS,
      message: MESSAGES.USER_SETTING.USER_SETTING_UPDATED,
    });
  } catch (e) {
    res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
});
