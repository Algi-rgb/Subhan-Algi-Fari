const express = require('express');
const router = express.Router();
const pelangganController = require('../controllers/pelangganController');

// TAMPIL DATA
router.get('/', pelangganController.index);

// FORM TAMBAH
router.get('/create', pelangganController.create);

// SIMPAN DATA
router.post('/store', pelangganController.store);

// FORM EDIT
router.get('/edit/:id', pelangganController.edit);

// UPDATE DATA
router.post('/update/:id', pelangganController.update);

// HAPUS DATA
router.get('/delete/:id', pelangganController.delete);

module.exports = router;