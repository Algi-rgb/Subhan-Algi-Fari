const express = require('express');
const router = express.Router();
const stokController = require('../controllers/stokController');

router.get('/', stokController.index);
router.get('/create', stokController.create);
router.post('/store', stokController.store);
router.get('/edit/:id', stokController.edit);
router.post('/update/:id', stokController.update);
router.get('/delete/:id', stokController.delete);

module.exports = router;