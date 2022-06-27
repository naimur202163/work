const asyncHandler = require('../middleware/async-handler');
const { VisitorBadge } = require('../sequelize');
const { STATUS_CODE, MESSAGES, RESPONSE_STATUS } = require('../constants');

exports.createNewBadge = asyncHandler(async (req, res, next) => {
  try {
    const { visitorBadgeType, name, imgPath } = req.body;

    if (!name || !imgPath) {
      return res.status(STATUS_CODE.BAD).json({
        status: RESPONSE_STATUS.ERROR,
        message: MESSAGES.BADGE.FIELD_IS_REQUIRED,
      });
    }

    if (isNaN(visitorBadgeType)) {
      return res.status(STATUS_CODE.BAD).json({
        status: RESPONSE_STATUS.ERROR,
        message: MESSAGES.BADGE.BADGE_TYPE_SHOULD_NUMBER,
      });
    }

    const isBadgeExistsWithImagePath = await VisitorBadge.findOne({
      where: { imgPath },
    });

    if (isBadgeExistsWithImagePath) {
      return res.status(STATUS_CODE.BAD).json({
        status: RESPONSE_STATUS.ERROR,
        message: MESSAGES.BADGE.BADGE_ALREADY_EXISTS,
      });
    }

    const badge = await VisitorBadge.create({
      visitorBadgeType,
      name,
      imgPath,
    });

    res.status(STATUS_CODE.CREATED).json({
      status: RESPONSE_STATUS.SUCCESS,
      badge,
    });
  } catch (e) {
    res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
});

exports.getAllBadges = asyncHandler(async (req, res, next) => {
  try {
    const badges = await VisitorBadge.findAll({
      attributes: ['id', 'visitorBadgeType', 'name', 'imgPath'],
    });

    const badgeType = req.params.badgeType;

    if (badgeType) {
      if (badgeType === 'free') {
        const freeBadges = badges.filter((el) => {
          return el.visitorBadgeType === 0;
        });

        return res.status(STATUS_CODE.SUCCESS).json({
          status: RESPONSE_STATUS.SUCCESS,
          badges: freeBadges,
        });
      }

      if (badgeType === 'basic') {
        const basicBadges = badges.filter((el) => {
          return el.visitorBadgeType === 1;
        });

        return res.status(STATUS_CODE.SUCCESS).json({
          status: RESPONSE_STATUS.SUCCESS,
          badges: basicBadges,
        });
      }

      if (badgeType === 'premium') {
        const premiumBadges = badges.filter((el) => {
          return el.visitorBadgeType === 2;
        });

        return res.status(STATUS_CODE.SUCCESS).json({
          status: RESPONSE_STATUS.SUCCESS,
          badges: premiumBadges,
        });
      }

      if (badgeType !== 'free' || 'basic' || 'premium') {
        return res.status(STATUS_CODE.BAD).json({
          status: RESPONSE_STATUS.ERROR,
          message: MESSAGES.BADGE.BADGE_TYPE_INVALID,
        });
      }
    } else {
      res.status(STATUS_CODE.SUCCESS).json({
        status: RESPONSE_STATUS.SUCCESS,
        badges,
      });
    }
  } catch (e) {
    res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
});

exports.deleteBadge = asyncHandler(async (req, res, next) => {
  try {
    const badgeID = req.params.id;

    const isBadgeExist = await VisitorBadge.findByPk(badgeID);

    if (!isBadgeExist) {
      return res.status(RESPONSE_STATUS.NOT_FOUND).json({
        status: RESPONSE_STATUS.ERROR,
        message: MESSAGES.BAD.BADGE_NOT_FOUND,
      });
    }

    await VisitorBadge.destroy({
      where: { id: badgeID },
    });

    res.status(STATUS_CODE.SUCCESS).json({
      status: RESPONSE_STATUS.SUCCESS,
      message: MESSAGES.BADGE.BADGE_DELETED,
    });
  } catch (e) {
    res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
});
