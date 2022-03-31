const express = require('express');

const router = express.Router();
const products = require('../controllers/product/index');
const middleware = require('../middlewares/productMiddleware');

router.get('/:id', products.getByIdProduct);

router.get('/', products.getAllProduct);
router.post('/',
  middleware.validateName,
  middleware.validateQuantity,
  products.registerPoduct);

module.exports = router;