const { Emailer } = require("../../sequelize")


exports.addToQue = async ({ email, status, template, userId, emailType }) => {
    try {
        const data = await Emailer.create({
            email,
            status,
            template,
            userId,
            emailType
        })
    } catch (error) {
    }
}
