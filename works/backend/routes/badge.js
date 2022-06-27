const express = require('express');
const {
  createNewBadge,
  getAllBadges,
  deleteBadge,
} = require('../controllers/badge');
const router = express.Router();

router.post('/add', createNewBadge);
router.get('/:badgeType?', getAllBadges);
router.delete('/delete/:id', deleteBadge);

module.exports = router;
