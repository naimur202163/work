const nodemailer = require('nodemailer');
const config = require('../../config/config');
const htmlToText = require('nodemailer-html-to-text').htmlToText;

const emailConfigs = {
  supportEmailAddresses: ['support@isutra.tv'],
  emailService: {
    // service: 'gmail',
    host: 'smtp.gmail.com',
    port: '465',
    secure: true,
    auth: {
      type: 'OAuth2',
      user: 'support@isutra.tv',
      serviceClient: config.EMAILER_CLIENT_ID,
      privateKey: config.EMAILER_PRIVATE_ID,
      // user: 'iSutra.tv@gmail.com',
      // pass: 'Fr#3d0m@02!',
    },
  },
  sendEmailFrom: 'iSUTRA.tv <support@isutra.tv',
};

const transporter = nodemailer.createTransport({
  ...emailConfigs.emailService,
});

transporter.use('compile', htmlToText());

const sendEmail = function (mailOptions) {
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
  });
};

module.exports = mailer = {
  sendEmail,
  emailConfigs,
};
