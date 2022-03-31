const express = require('express');

const router = express.Router();
const products = require('../controllers/product/index');

router.get('/:id', products.getByIdProduct);
router.get('/', products.getAllProduct);

module.exports = router;