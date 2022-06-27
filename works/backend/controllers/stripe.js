const { Op } = require('sequelize');
const {
  User,
  Notification,
  NotificationType,
  StoragePackages,
  Library,
} = require('../sequelize');
const asyncHandler = require('../middleware/async-handler');
const Stripe = require('stripe');
const config = require('../config/config');
const {
  STATUS_CODE,
  MESSAGES,
  RESPONSE_STATUS,
  EMAIL_STATUS,
  EMAIL_TYPE,
} = require('../constants');
const { WEB_SOCKET_EVENTS } = require('../constants/web-socket-keys');
const stripe = Stripe(config.STRIPE_SECRET_KEY); // iSutra
const { isWarriorPlan } = require('../utils');
const { addToQue } = require('../services/EmailService/addToQue');
const { setValue } = require('../utils/cacheProvide');
const TRANSFER_TYPES = require('../utils/transferType');


exports.stripe = asyncHandler(async (req, res, next) => {
  try {
    const { code } = req.body.payload;

    const notificationTypeStripeOnboarding = await NotificationType.findOne({
      where: { name: 'stripe_onboarding' },
    });

    const notificationTypeStripeConnected = await NotificationType.findOne({
      where: { name: 'stripe_connected' },
    });

    const response = await stripe.oauth.token({
      grant_type: 'authorization_code',
      code: code,
    });
    const user = { stripe_account_id: response.stripe_user_id };
    User.update(user, {
      where: { id: req.user.id },
    });

    // Renove stripe_onboarding notification
    Notification.destroy({
      where: {
        notifierid: req.user.id,
        typeid: notificationTypeStripeOnboarding.id,
      },
    });

    // Add stripe_connected notification
    Notification.create({
      actorid: req.user.id,
      notifierid: req.user.id,
      readStatus: 0,
      entityid: req.user.id,
      typeid: notificationTypeStripeConnected.id,
    });
    res.status(STATUS_CODE.SUCCESS).json({ success: true, data: response });
  } catch (e) {
    res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
});

exports.secret = asyncHandler(async (req, res, next) => {
  try {
    const { amount, customer, paymentMethodId, savePaymentMethod } =
      req.body.payload;
    if (!amount) {
      return res.status(STATUS_CODE.ERROR).json({
        status: RESPONSE_STATUS.ERROR,
        message: MESSAGES.INVALID_PARAMETERS,
      });
    }
    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(amount * 100),
      currency: 'usd',
      metadata: { integration_check: 'accept_a_payment' },
      customer,
    });

    //Attach the new payment method as the default payment method
    if (paymentMethodId && savePaymentMethod) {
      const paymentMethods = await stripe.paymentMethods.list({
        customer: customer,
        type: 'card',
      });
      const paymentMethodAttach = await stripe.paymentMethods.attach(
        paymentMethodId,
        { customer: customer }
      );

      await stripe.customers.update(customer, {
        invoice_settings: {
          default_payment_method: paymentMethodAttach.id,
        },
      });
    }

    res
      .status(STATUS_CODE.SUCCESS)
      .json({ success: true, data: paymentIntent });
  } catch (e) {
    res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
});

exports.transfers = asyncHandler(async (req, res, next) => {
  try {
    const { amount, currency, destination, toUserId, videoId } =
      req.body.payload;
    const { user } = req;
    const transfer = await stripe.transfers.create({
      amount: parseInt(amount * 100),
      currency: currency,
      destination: destination,
      metadata: {
        sender_userId: user.id,
        sender_firstname: user.firstname,
        sender_lastname: user.lastname,
        sender_username: user.username,
        sender_email: user.email,
        videoId: videoId,
        content_creator_userId: toUserId,
        transferType: TRANSFER_TYPES.TIP, // 0.Referral 1.Tip
      },
    });

    setValue('sender_username', user.username);

    const notificationType = await NotificationType.findOne({
      where: { name: 'tip' },
    });
    const tipReceiver = await User.findOne({
      where: { id: toUserId },
    });

    const libraryExist = await Library.findOne({
      where: {
        userId: user.id,
        videoId: videoId,
      },
    });

    if (!libraryExist) {
      await Library.create({
        userId: user.id,
        videoId: videoId,
      });
    }

    await Notification.create({
      actorid: user.id,
      notifierid: toUserId,
      readStatus: 0,
      entityid: toUserId,
      typeid: notificationType.id,
      data: { tip_amount: amount },
    });

    // send email to the user who receives tip
    await addToQue({
      email: tipReceiver.email,
      userId: tipReceiver.id,
      status: EMAIL_STATUS.QUEUED,
      emailType: EMAIL_TYPE.TIP,
    });
    //cache
    let tip_obj = { videoId: videoId, tipAmount: amount.toFixed(2) };
    setValue('tipInfo', tip_obj);
    sendNotificationToOnlineUsers(
      null,
      WEB_SOCKET_EVENTS.INCREMENT_NOTIFICATION_COUNT,
      toUserId
    );
    res.status(STATUS_CODE.SUCCESS).json({ success: true, data: transfer });
  } catch (error) {
    return res.status(STATUS_CODE.BAD).json({
      status: RESPONSE_STATUS.ERROR,
      message: error.message,
    });
  }
});
exports.seriesTransfers = asyncHandler(async (req, res, next) => {
  try {
    const { amount, currency, destination, toUserId } = req.body.payload;
    const { user } = req;
    const transfer = await stripe.transfers.create({
      amount: parseInt(amount * 100),
      currency: currency,
      destination: destination,
      metadata: {
        sender_userId: user.id,
        sender_firstname: user.firstname,
        sender_lastname: user.lastname,
        sender_username: user.username,
        sender_email: user.email,
        content_creator_userId: toUserId,
        transferType: TRANSFER_TYPES.SERIES, // 0.Referral 1.Tip 2.Series
      },
    });

    setValue('sender_username', user.username);

    const notificationType = await NotificationType.findOne({
      where: { name: 'tip' },
    });
    const tipReceiver = await User.findOne({
      where: { id: toUserId },
    });

    await Notification.create({
      actorid: user.id,
      notifierid: toUserId,
      readStatus: 0,
      entityid: toUserId,
      typeid: notificationType.id,
      data: { tip_amount: amount },
    });

    // send email to the user who receives tip
    await addToQue({
      email: tipReceiver.email,
      userId: tipReceiver.id,
      status: EMAIL_STATUS.QUEUED,
      emailType: EMAIL_TYPE.TIP,
    });
    //cache
    let tip_obj = { tipAmount: amount.toFixed(2) };
    setValue('tipInfo', tip_obj);
    sendNotificationToOnlineUsers(
      null,
      WEB_SOCKET_EVENTS.INCREMENT_NOTIFICATION_COUNT,
      toUserId
    );
    res.status(STATUS_CODE.SUCCESS).json({ success: true, data: transfer });
  } catch (error) {
    return res.status(STATUS_CODE.BAD).json({
      status: RESPONSE_STATUS.ERROR,
      message: error.message,
    });
  }
});
exports.createCustomerPortalSession = asyncHandler(async (req, res, next) => {
  try {
    const { stripe_customer_id, userId } = req.body;
    const session = await stripe.billingPortal.sessions.create({
      customer: stripe_customer_id,
      return_url: `${config.BASE_URL}/update_subscription/${userId}`,
    });
    return res.status(200).json({ success: true, data: session });
  } catch (e) {
    return res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
});

exports.handleStripeHooks = async (req, res) => {
  try {
    const event = req.body;
    // Handle the event
    switch (event.type) {
      case 'customer.subscription.updated':
        const subscription = event.data.object;
        if (
          subscription.items.data[0].price.id ===
          config.SUBSCRIPTION_PLAN_0
        ) {
          await User.update(
            { userrole: 0 },
            { where: { stripe_customer_id: subscription.customer } }
          );
        } else if (
          subscription.items.data[0].price.id ===
          config.SUBSCRIPTION_PLAN_5
        ) {
          await User.update(
            { userrole: 1 },
            { where: { stripe_customer_id: subscription.customer } }
          );
        }
        // if (
        //   subscription.items.data[0].price.id ===
        //   process.env.SUBSCRIPTION_PLAN_10
        // ) {
        //   await User.update(
        //     { userrole: 2 },
        //     { where: { stripe_customer_id: subscription.customer } }
        //   );
        // }
        else if (isWarriorPlan(subscription.items.data[0].price.id)) {
          const storagePackage = await StoragePackages.findOne({
            where: {
              stripeProduct: subscription.items.data[0].price.id,
            },
          });
          await User.update(
            { userrole: 2, storagePackageId: storagePackage.id },
            { where: { stripe_customer_id: subscription.customer } }
          );
        }
        break;

      default:
    }

    // Return a response to acknowledge receipt of the event
    res.json({ received: true });
  } catch (e) {
    res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
};
