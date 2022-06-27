const asyncHandler = require('../middleware/async-handler');
const { UserDisplaySettings } = require('../sequelize');
const Stripe = require('stripe');
const { RESPONSE_STATUS, STATUS_CODE } = require('../constants');
const config = require('../config/config');
const stripe = Stripe(config.STRIPE_SECRET_KEY);

exports.secretSub = asyncHandler(async (req, res, next) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.payload.amount * 100,
      currency: 'usd',
      metadata: { integration_check: 'accept_a_payment' },
      payment_method: req.body.payload.payment_method,
    });
    res
      .status(STATUS_CODE.SUCCESS)
      .json({ success: true, data: paymentIntent });
  } catch (e) {
    res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
});

exports.createCustomer = asyncHandler(async (req, res) => {
  try {
    const { firstname, email } = req.body;

    const customer = await stripe.customers.create({
      name: firstname,
      email: email,
    });
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: 'price_1IQV5WFrBwhwu8k5ZQviAva7' }],
    });
    res.status(STATUS_CODE.SUCCESS).json({ success: true, data: customer });
  } catch (e) {
    res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
});
