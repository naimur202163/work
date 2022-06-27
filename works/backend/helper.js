const { User, Notification, Video } = require("./sequelize");
const { emailTemplates } = require("./services/EmailService/EmailTemplates/emailTemplates");
const { getValue } = require("./utils/cacheProvide");



exports.getPagination = (page, size) => {
    const limit = size ? +size : 5;
    const offset = page ? page * limit : 0;
    return { limit, offset };
};
exports.getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: records } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, records, totalPages, currentPage };
};

exports.getEmailTemplate = async (emailInfoObj) => {
    switch (emailInfoObj.emailType) {
        case 0:
            try {
                let user = await User.findOne({ where: { id: emailInfoObj.userId } });
                var { subject, html } = emailTemplates.newUserRegistration(user.email_verify_token);
                return { subject, html };
            } catch (err) {
            }

        case 1:
            try {
                let user = await User.findOne({ where: { id: emailInfoObj.userId } });
                var { subject, html } = emailTemplates.passwordReset(user.password_reset_token);
                return { subject, html };
            } catch (err) {
            }
        case 2:
            try {
                let user = await User.findOne({ where: { id: emailInfoObj.userId } });
                let tipinfo = getValue("tipInfo")
                if (tipinfo !== undefined && tipinfo !== null) {
                    const video = await Video.findOne({ where: { id: tipinfo.videoId } });
                    var { subject, html } = emailTemplates.tipReceived(user.username, tipinfo.videoId, tipinfo.tipAmount, video.title, user.id, user.username);
                    return { subject, html };
                } else {
                    return
                }
            } catch (err) {
            }
    }
}