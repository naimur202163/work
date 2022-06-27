const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
    createNewSchedule,
    updateScheduleById,
    deleteScheduleById,
    getMonthSchedules,
    getCategoryByClass
} = require('../controllers/liveClassSchedule');

router.route('/').post(protect, createNewSchedule);
router.route('/:month').get(protect, getMonthSchedules);
router.route('/getCategoryById/:categoryId').get(protect, getCategoryByClass);
router.route('/:scheduleId').delete(protect, deleteScheduleById);
router.route('/:scheduleId').patch(protect, updateScheduleById);

module.exports = router;
