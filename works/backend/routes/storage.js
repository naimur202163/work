const express = require('express');
const router = express.Router();
const {
  getAllStorage,
  getStorageById,
  createStoragePackage,
  deleteStoragePackage,
} = require('../controllers/storage');

router.get('/get-all', getAllStorage);
router.get('/:id', getStorageById);
router.post('/add', createStoragePackage);
router.delete('/delete/:id', deleteStoragePackage);
module.exports = router;
