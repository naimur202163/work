const { MESSAGES, RESPONSE_STATUS, STATUS_CODE } = require('../constants');
const asyncHandler = require('../middleware/async-handler');
const { StoragePackages } = require('../sequelize');
const op = require('sequelize').Op;

exports.createStoragePackage = asyncHandler(async (req, res, next) => {
  try {
    const { size, name, cost, period, order, stripeProduct } = req.body;

    if (!name || !size || !cost || !period) {
      return res.status(STATUS_CODE.BAD).json({
        status: RESPONSE_STATUS.ERROR,
        message: MESSAGES.STORAGE.FIELD_IS_REQUIRED,
      });
    }

    const isStoragePackageExist = await StoragePackages.findOne({
      where: {
        [op.or]: [{ name }, { size }, { cost }],
      },
    });

    if (isStoragePackageExist) {
      return res.status(STATUS_CODE.NOT_FOUND).json({
        status: RESPONSE_STATUS.ERROR,
        message: MESSAGES.STORAGE.PACKAGE_IS_ALREADY_EXISTS,
      });
    }

    const storagePackage = await StoragePackages.create(req.body);

    return res.status(STATUS_CODE.SUCCESS).json({
      status: RESPONSE_STATUS.SUCCESS,
      data: storagePackage,
    });
  } catch (e) {
    return res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
});

exports.getAllStorage = asyncHandler(async (req, res, next) => {
  try {
    const storagePackages = await StoragePackages.findAll({
      attributes: ['id', 'size', 'name', 'cost', 'period', 'stripeProduct'],
      order: [['order', 'ASC']],
    });

    return res.status(STATUS_CODE.SUCCESS).json({
      status: RESPONSE_STATUS.SUCCESS,
      data: storagePackages,
    });
  } catch (e) {
    return res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
});

exports.deleteStoragePackage = asyncHandler(async (req, res, next) => {
  try {
    const storagePackageId = req.params.id;

    if (!storagePackageId) {
      return res.status(STATUS_CODE.NOT_FOUND).json({
        status: RESPONSE_STATUS.ERROR,
        message: MESSAGES.STORAGE.INVALID_ID,
      });
    }

    const isStoragePackageExist = await StoragePackages.findByPk(
      storagePackageId
    );

    if (!isStoragePackageExist) {
      return res.status(STATUS_CODE.NOT_FOUND).json({
        status: RESPONSE_STATUS.ERROR,
        message: MESSAGES.STORAGE.PACKAGE_NOT_EXISTS,
      });
    }

    await StoragePackages.destroy({
      where: { id: storagePackageId },
    });

    return res.status(STATUS_CODE.SUCCESS).json({
      status: RESPONSE_STATUS.SUCCESS,
      message: MESSAGES.STORAGE.PACKAGE_DELETED,
    });
  } catch (e) {
    return res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
});

exports.getStorageById = asyncHandler(async (req, res, next) => {
  try {
    const storageId = req.params.id;

    if (!storageId) {
      throw new Error('No id provided!');
    }

    const storagePackage = await StoragePackages.findAll({
      attributes: ['id', 'size', 'name', 'cost', 'period'],
      where: {
        id: storageId,
      },
    });

    return res.status(STATUS_CODE.SUCCESS).json({
      status: RESPONSE_STATUS.SUCCESS,
      storage: storagePackage,
    });
  } catch (e) {
    return res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
});
