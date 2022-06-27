const asyncHandler = require('../middleware/async-handler');
const { KarmaFilterSettings } = require('../sequelize');
const { STATUS_CODE } = require('../constants');


exports.editOrCreateFilterSetting = asyncHandler(async (req, res, next) => {
    try {
        // FilterType: 1= transaction filter, 2 = karma filter
        const { timeFrame, amount, source, filterType } = req.body;
        const userId = req.user.id;
        if (!timeFrame || !source) {
            return res.status(STATUS_CODE.ERROR).json({
                success: false,
                message: 'Time frame, Amount and Source are mandatory fields',
            });
        }
        const existingKFSetting = await KarmaFilterSettings.findOne({
            where: { userId, filterType },
        });
        if (!existingKFSetting) {
            // create new Karma setting for the user 
            const karmaSettingSaved = await KarmaFilterSettings.create({ timeFrame, amount, source, userId, filterType })
            return res.status(STATUS_CODE.SUCCESS).json(karmaSettingSaved);
        } else {
            // update the existing karma/transaction setting of the user
            await KarmaFilterSettings.update({
                timeFrame, amount, source
            }, { where: { userId, filterType } })
            const updatedKarmaSetting = await KarmaFilterSettings.findOne({ where: { userId } });
            return res.status(STATUS_CODE.SUCCESS).json(updatedKarmaSetting);
        }

    } catch (e) {
        return res.status(STATUS_CODE.ERROR).json({ message: e.message });
    }
})

exports.getKarmaFilterByUserId = asyncHandler(async (req, res, next) => {
    try {
        const userId = req.user.id;
        const filterType = req.params.filterType;
        const kFSetting = await KarmaFilterSettings.findOne({ where: { userId, filterType } });
        if (!kFSetting)
            return res.status(STATUS_CODE.NOT_FOUND).json({ message: 'No Karam filter settings exists for this user' });
        else return res.status(STATUS_CODE.SUCCESS).json(kFSetting);
    } catch (e) {
        return res.status(STATUS_CODE.ERROR).json({ message: e.message })
    }
})