const { Op, Sequelize } = require('sequelize');
const {
  User,
  Subscription,
  Video,
  Referrals,
  Notification,
  NotificationType,
  Emailer,
  StoragePackages,
  UserDisplaySettings,
  VisitorBadge,
} = require('../sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('../middleware/async-handler');
const config = require('../config/config');
const Stripe = require('stripe');
const { addToQue } = require('../services/EmailService/addToQue');
const {
  sendNotificationToOnlineUsers,
} = require('../socket/emit-events');

const stripe = Stripe(config.STRIPE_SECRET_KEY);
const {
  STATUS_CODE,
  MESSAGES,
  EMAIL_STATUS,
  EMAIL_TYPE,
} = require('../constants');
const { v4: uuidv4 } = require('uuid');

const { WEB_SOCKET_EVENTS } = require('../constants/web-socket-keys');
const TRANSFER_TYPES = require('../utils/transferType');


const transferFund = async (stripeAccountId, amount, referralPayload) => {
  try {
    const transfer = await stripe.transfers.create({
      amount: parseInt(amount * 100),
      currency: 'usd',
      destination: stripeAccountId,
      metadata: {
        referred_username: referralPayload.referred_user.username, //reffered user's username
        sender_email: referralPayload.referred_user.email,
        content_creator_userId: referralPayload.referred_by_user.id,
        videoId: null,
        transferType: TRANSFER_TYPES.REFERRAL, // 0.Referral 1.Tip
        referredByUsername: referralPayload.referred_by_user.username,
        referredUsername: referralPayload.referred_user.username,
      },
    });
    return true;
  } catch (e) {
    return false;
  }
};

exports.signup = asyncHandler(async (req, res, next) => {
  try {
    const { firstname, email, code, userrole, paymentMethodId } = req.body;
    let referredBy;
    if (code) {
      referredBy = await User.findOne({ where: { username: code } });
    }

    const user = await User.create(req.body);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user.email_verify_token = uuidv4();
    await user.save();
    await addToQue({
      email: user.email,
      userId: user.id,
      status: EMAIL_STATUS.QUEUED,
      emailType: EMAIL_TYPE.SIGN_UP,
    });
    const token = jwt.sign({ id: user.id }, config.JWT_SECRET, {
      expiresIn: config.JWT_EXPIRE,
    });
    const usId = user.dataValues.id;
    const customer = await stripe.customers.create({
      name: firstname,
      email: email,
    });
    await User.update(
      { stripe_customer_id: customer.id },
      {
        where: { id: usId },
      }
    );

    if (req.body.userrole == 0) {
      await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: config.SUBSCRIPTION_PLAN_0 }], // $0
      });
    }
    if (paymentMethodId) {
      const paymentMethodAttach = await stripe.paymentMethods.attach(
        paymentMethodId,
        { customer: customer.id }
      );

      await stripe.customers.update(customer.id, {
        invoice_settings: {
          default_payment_method: paymentMethodAttach.id,
        },
      });
    }

    if (userrole == 1) {
      await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: config.SUBSCRIPTION_PLAN_5 }], // $5
      });
    } else if (userrole == 2) {
      const storageOptions = await StoragePackages.findOne({
        where: { id: req.body.storagePackageId },
      });
      if (!storageOptions) {
        return res.status(500).json('No storage options');
      }
      await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: storageOptions.stripeProduct }], // $10
      });
    }

    let referredByUserDetail;
    if (referredBy && referredBy.id) {
      let amountToBeTransferer;
      if (userrole == 1) {
        amountToBeTransferer = 5 / 2; // here amount is in dollar (5$ for tribe) and we transfer 50% amount to referred person
      } else if (userrole == 2) {
        amountToBeTransferer = 5 / 2; // here amount is in dollar (10$ for warrior) and we transfer 50% amount to referred person
      }
      Referrals.create({ refer_by: referredBy.id, refer_to: usId });
      if (amountToBeTransferer) {
        // usId => id of the user who creates account using referral link
        let referralPayload = {
          referred_by_user: referredBy,
          referred_user: user,
        };
        transferFund(
          referredBy.stripe_account_id,
          amountToBeTransferer,
          referralPayload
        );
        // send bell notification to the referrer
        const notification_type = await NotificationType.findOne({
          where: { name: 'referral_payment' },
        });
        await Notification.create({
          actorid: usId,
          notifierid: referredBy.id,
          readStatus: 0,
          entityid: usId,
          typeid: notification_type.id,
        });
        sendNotificationToOnlineUsers(
          null,
          WEB_SOCKET_EVENTS.INCREMENT_NOTIFICATION_COUNT,
          referredBy.id
        );
      }
    }

    if (user.userrole === 2) {
      const notificationType = await NotificationType.findOne({
        where: { name: 'stripe_onboarding' },
      });
      await Notification.create({
        actorid: user.id,
        notifierid: user.id,
        readStatus: 0,
        entityid: user.id,
        typeid: notificationType.id,
      });
      sendNotificationToOnlineUsers(
        null,
        WEB_SOCKET_EVENTS.INCREMENT_NOTIFICATION_COUNT,
        user.id
      );
    }

    // Referral notification

    res.status(STATUS_CODE.SUCCESS).json({ success: true, data: token });
  } catch (e) {
    res.status(STATUS_CODE.ERROR).json({ message: e.message });
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

    res.status(STATUS_CODE.SUCCESS).json({ success: true, category });
  } catch (e) {
    res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
});

exports.isEmailExist = asyncHandler(async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(STATUS_CODE.NOT_FOUND).json({
        status: RESPONSE_STATUS.ERROR,
        message: MESSAGES.INVALID_EMAIL,
      });
    }
    const user = await User.findOne({
      attributes: ['email'],
      where: {
        $and: Sequelize.where(
          Sequelize.fn('lower', Sequelize.col('email')),
          Sequelize.fn('lower', email)
        ),
      },
    });
    res.status(STATUS_CODE.SUCCESS).json({ success: true, data: user });
  } catch (e) {
    res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
});

exports.isUserNameExist = asyncHandler(async (req, res) => {
  try {
    const { userName } = req.query;
    if (!userName) {
      return res.status(STATUS_CODE.NOT_FOUND).json({
        status: RESPONSE_STATUS.ERROR,
        message: MESSAGES.INVALID_USER_NAME,
      });
    }
    const user = await User.findOne({
      attributes: ['username'],
      where: {
        $and: Sequelize.where(
          Sequelize.fn('lower', Sequelize.col('username')),
          Sequelize.fn('lower', userName)
        ),
      },
    });

    res.status(STATUS_CODE.SUCCESS).json({ success: true, data: user });
  } catch (e) {
    res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
});

exports.isReferralCodeExist = asyncHandler(async (req, res) => {
  try {
    const { referralCode } = req.query;

    const user = await User.findOne({
      attributes: ['username'],
      where: {
        $and: Sequelize.where(
          Sequelize.fn('lower', Sequelize.col('username')),
          Sequelize.fn('lower', referralCode)
        ),
      },
    });

    res.status(STATUS_CODE.SUCCESS).json({ success: true, data: user });
  } catch (e) {
    res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
});

exports.login = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;

    let user;
    if (email) {
      user = await User.findOne({ where: { email } });
    }

    if (username) {
      user = await User.findOne({ where: { username } });
    }

    if (!user) {
      return next({
        message: MESSAGES.AUTH.USER_NOT_FOUND,
        statusCode: STATUS_CODE.BAD,
      });
    }

    const passwordMatch = await bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      return next({
        message: MESSAGES.AUTH.PASSWORD_NOT_MATCH,
        statusCode: STATUS_CODE.BAD,
      });
    }

    const payload = { id: user.id };
    const token = jwt.sign(payload, config.JWT_SECRET, {
      expiresIn: config.JWT_EXPIRE,
    });

    res.status(STATUS_CODE.SUCCESS).json({ success: true, data: token });
  } catch (e) {
    res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
};

exports.findGoogleId = async (req, res, next) => {
  try {
    const { googleId } = req.params;
    const user = await User.findOne({
      where: { googleId },
      attributes: ['googleId'],
    });

    res.status(STATUS_CODE.SUCCESS).json({ success: true, data: user });
  } catch (e) {
    res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
};

exports.findFacebookId = async (req, res, next) => {
  try {
    const { facebookId } = req.params;
    const user = await User.findOne({
      where: { facebookId },
      attributes: ['facebookId'],
    });

    res.status(STATUS_CODE.SUCCESS).json({ success: true, data: user });
  } catch (e) {
    console.log(e);
    res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
};

exports.loginGoogle = async (req, res, next) => {
  try {
    const { googleId } = req.body;

    let user;
    if (googleId) {
      user = await User.findOne({ where: { googleId } });
    }

    if (!user) {
      return next({
        message: MESSAGES.AUTH.USER_NOT_FOUND,
        statusCode: STATUS_CODE.BAD,
      });
    }

    const payload = { id: user.id };
    const token = jwt.sign(payload, config.JWT_SECRET, {
      expiresIn: config.JWT_EXPIRE,
    });

    res.status(STATUS_CODE.SUCCESS).json({ success: true, data: token });
  } catch (e) {
    res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
};

exports.loginFacebook = async (req, res, next) => {
  try {
    const { id } = req.body;

    let user;
    if (id) {
      user = await User.findOne({ where: { facebookId: id } });
    }

    if (!user) {
      return next({
        message: MESSAGES.AUTH.USER_NOT_FOUND,
        statusCode: STATUS_CODE.BAD,
      });
    }

    const payload = { id: user.id };
    const token = jwt.sign(payload, config.JWT_SECRET, {
      expiresIn: config.JWT_EXPIRE,
    });

    res.status(STATUS_CODE.SUCCESS).json({ success: true, data: token });
  } catch (e) {
    res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
};

exports.me = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: [
        'id',
        'firstname',
        'lastname',
        'username',
        'email',
        'avatar',
        'cover',
        'channelDescription',
        'isAdmin',
        'userrole',
        'stripe_account_id',
        'stripe_customer_id',
      ],
    });

    const subscriptions = await Subscription.findAll({
      where: { subscriber: req.user.id },
    });

    const userIds = subscriptions.map((sub) => sub.subscribeTo);

    try {
      const userSettings = await UserDisplaySettings.findOne({
        where: { userId: req.user.id },
        include: [
          {
            model: VisitorBadge,
            attributes: ['imgPath'],
          },
        ],
      });

      user.setDataValue('userSettings', userSettings);
      user.setDataValue('badge', userSettings.VisitorBadge.imgPath);
    } catch (e) { }

    const channels = await User.findAll({
      attributes: ['id', 'avatar', 'username'],
      where: {
        id: {
          [Op.in]: userIds,
        },
      },
    });

    for (let index = 0; index < channels.length; index++) {
      const channel = channels[index];
      const userSetting = await UserDisplaySettings.findOne({
        where: { userId: channel.id },
        include: VisitorBadge,
      });
      channel.setDataValue('visitorBadge', userSetting.VisitorBadge);
    }

    try {
      user.setDataValue('channels', channels);
      // Get Payment Methods of the user
      const paymentMethods = await stripe.paymentMethods.list({
        customer: user.stripe_customer_id,
        type: 'card',
      });
      user.setDataValue('paymentMethods', paymentMethods);
    } catch (ex) {
      throw ex;
    }
    res.status(STATUS_CODE.SUCCESS).json({ success: true, data: user });
  } catch (e) {
    res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
};
