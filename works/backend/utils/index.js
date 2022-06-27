const { EMAIL_STATUS } = require('../constants');
const { getEmailTemplate } = require('../helper');
const { User, Emailer, StoragePackages } = require('../sequelize');
const {
  emailTemplates,
} = require('../services/EmailService/EmailTemplates/emailTemplates');
const mailer = require('../services/EmailService/mailer');
const cloudinary = require('cloudinary');
const { STATUS_CODE } = require('../constants');

const bytesToMegaBytes = (bytes, digits) => {
  if (!bytes) {
    return 0;
  }
  return digits && (digits > 0 || digits === 0)
    ? +(bytes / (1024 * 1024)).toFixed(digits)
    : +(bytes / (1024 * 1024));
};

const checkForNewEmails = async () => {
  setInterval(async () => {
    const data = await Emailer.findAll({ where: { sentAt: null } });
    if (data.length) {
      data.forEach(async (item) => {
        let emailInfo = await getEmailTemplate(item);
        try {
          await mailer.sendEmail({
            from: mailer.emailConfigs.sendEmailFrom,
            to: item.email,
            subject: emailInfo.subject,
            html: emailInfo.html,
          });
          const sentTime = new Date();
          item.dataValues.sentAt = sentTime;
          item.dataValues.status = EMAIL_STATUS.SENT;
          await Emailer.update(item.dataValues, {
            where: { id: item.dataValues.id },
          });
        } catch (e) {
          item.dataValues.status = EMAIL_STATUS.FAILED;
          await Emailer.update(item.dataValues, {
            where: { id: item.dataValues.id },
          });
        }
      });
    }
  }, 30000);
};

const isWarriorPlan = async (productId) => {
  const storagePlan = await StoragePackages.findOne({
    where: {
      stripeProduct: productId,
    },
  });
  if (!storagePlan) {
    return false;
  } else {
    return true;
  }
};
const isTokenExpired = (tokenCreatedDate) => {
  // password reset token expired after 24 hours
  const tokenCreationTime = new Date(tokenCreatedDate).getTime();
  let timeDiff = Math.abs(Date.now() - tokenCreationTime);
  const diffDays = timeDiff / (1000 * 3600 * 24);
  if (diffDays > 1) {
    return true;
  } else {
    return false;
  }
};

const destryCloudinaryResourceHandler = async (req, res) => {
  try {
    const { publicId, resourceType } = req.body;
    await cloudinary.v2.uploader.destroy(publicId, {
      resource_type: 'image',
    });

    res.status(STATUS_CODE.SUCCESS).json({
      success: true,
      message: 'Removed from cloudinary',
    });
  } catch (e) {
    return res.status(STATUS_CODE.ERROR).json({ message: e.message });
  }
};

function getLastWeeksDate() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7).getTime() / 1000;
}

function getPreviousMonth() {
  const date = new Date('2022-01-17');
  const firstDayPrevMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1).getTime() / 1000;
  const lastDayPrevMonth = new Date(date.getFullYear(), date.getMonth(), 0).getTime() / 1000;
  return {
    firstDay: firstDayPrevMonth,
    lastDay: lastDayPrevMonth
  }
}

function getFirstandLastDateOfLastYear() {
  const currentYear = new Date().getFullYear();
  const firstDay = new Date(currentYear, 0, 1).getTime() / 1000;
  const lastDay = new Date(currentYear, 11, 31).getTime() / 1000;
  const lastYear = {
    startDate: firstDay,
    endDate: lastDay,
  }
  return lastYear;
}


module.exports = {
  bytesToMegaBytes,
  checkForNewEmails,
  isWarriorPlan,
  isTokenExpired,
  destryCloudinaryResourceHandler,
  getLastWeeksDate,
  getPreviousMonth,
  getFirstandLastDateOfLastYear

};
