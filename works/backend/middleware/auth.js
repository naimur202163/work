const { request } = require('express');
const jwt = require('jsonwebtoken');
const { User, Video, PPVUnlocks } = require('../sequelize');
const { STATUS_CODE, MESSAGES, RESPONSE_STATUS } = require('../constants');
const config = require('../config/config');

exports.protect = async (req, res, next) => {
  if (!req.headers.authorization) {
    return next({
      message: MESSAGES.MUST_BE_LOGGED_IN,
      statusCode: STATUS_CODE.UNAUTHORIZED,
    });
  }
  const token = req.headers.authorization.replace('Bearer', '').trim();

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);

    const user = await User.findOne({
      attributes: [
        'id',
        'isAdmin',
        'firstname',
        'lastname',
        'username',
        'email',
        'avatar',
        'cover',
        'channelDescription',
        'userrole',
      ],
      where: {
        id: decoded.id,
      },
    });

    req.user = user;
    next();
  } catch (err) {
    next({
      message: MESSAGES.MUST_BE_LOGGED_IN,
      statusCode: STATUS_CODE.UNAUTHORIZED,
    });
  }
};


exports.withAndWithoutLogin = async (req, res, next) => {
  const token = req.headers.authorization ? req.headers.authorization.replace('Bearer', '').trim() : '';
  if (!token || token === 'undefined') {
    req.user = {};
  } else {
    const token = req.headers.authorization.replace('Bearer', '').trim();
    const decoded = jwt.verify(token, config.JWT_SECRET);

    const user = await User.findOne({
      attributes: [
        'id',
        'isAdmin',
        'firstname',
        'lastname',
        'username',
        'email',
        'avatar',
        'cover',
        'channelDescription',
        'userrole',
      ],
      where: {
        id: decoded.id,
      },
    });
    req.user = user;
  }
  next();
};

exports.userrole = async (req, res, next) => {
  if (req.user.userrole) {
    return next();
  }

  return next({
    message: MESSAGES.ACCESS_DENIED,
    statusCode: STATUS_CODE.UNAUTHORIZED,
  });
};

exports.admin = async (req, res, next) => {
  if (req.user.isAdmin) {
    return next();
  }
  return next({
    message: MESSAGES.ACCESS_DENIED_ONLY_ADMIN_ALLOWED,
    statusCode: STATUS_CODE.UNAUTHORIZED,
  });
};
