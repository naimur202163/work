const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  createNewPlaylist,
  deletePlaylistById,
  updatePlaylistById,
  getPlaylistById,
  getAllPlaylist,

  addVideoToPlaylist,
  removeVideoFromPlaylist,
} = require('../controllers/playlist');

router.route('/').post(protect, createNewPlaylist);
router.route('/').get(protect, getAllPlaylist);
router.route('/:playlistId').delete(protect, deletePlaylistById);
router.route('/:playlistId').patch(protect, updatePlaylistById);
router.route('/:playlistId').get(protect, getPlaylistById);

// video routes
router.route('/:playlistId/addVideo').post(protect, addVideoToPlaylist);
router.route('/:playlistId/removeVideo').post(protect, removeVideoFromPlaylist);

module.exports = router;
