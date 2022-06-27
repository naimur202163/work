
const express = require("express");
const { fileuploadingAWS, listFiles, deleteFile, downloadFile } = require("../controllers/fileoperations-S3");
const router = express.Router();

router.route('/fileUpload').post(fileuploadingAWS)
router.route('/listFiles').get(listFiles)
router.route('/deleteFile/:filename').delete(deleteFile)
router.route('/downloadFile/:filename').get(downloadFile)

module.exports = router;
