const express = require('express');

const router = express.Router();
const {
  getChannel,
  createChannel,
  updateChannel,
  deleteChannel,
  getStream,
  listStreams,
  stopStream,
  importPlayBackKeyPair,
  getPlaybackKeyPair,
  getRecordingConfiguration,
  deletePlaybackKeyPair,
  createRecordingConfiguration,
  listRecordingConfiguration,
  deletRecordingConfiguration,
} = require('../controllers/live-stream');

router.route('/getChannel').post(getChannel);
router.route('/createChannel').post(createChannel);
router.route('/updateChannel').post(updateChannel);
router.route('/deleteChannel').post(deleteChannel);
router.route('/getStream').post(getStream);
router.route('/listStreams').post(listStreams);
router.route('/stopStream').post(stopStream);
router.route('/importPlayBackKeyPair').post(importPlayBackKeyPair);
router.route('/getPlaybackKeyPair').post(getPlaybackKeyPair);
router.route('/deletePlaybackKeyPair').post(deletePlaybackKeyPair);
router
  .route('/createRecordingConfiguration')
  .post(createRecordingConfiguration);
router.route('/getRecordingConfiguration').post(getRecordingConfiguration);
router.route('/listRecordingConfiguration').post(listRecordingConfiguration);
router.route('/deletRecordingConfiguration').post(deletRecordingConfiguration);

module.exports = router;
