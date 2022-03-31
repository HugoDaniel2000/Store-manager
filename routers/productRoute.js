const express = require('express');

const router = express.Router();
const productController = require('../controllers/product/getAllProduct');

router.get('/', productController.getAll);

module.exports = router;