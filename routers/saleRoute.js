const express = require('express');

const router = express.Router();
const sales = require('../controllers/sales/index');
const middleware = require('../middlewares/saleMiddleware');

router.get('/:id', sales.getByIdSale);
router.put('/:id',
  middleware.validateProductId,
  middleware.validateQuantity,
  sales.updateSales);

router.get('/', sales.getAllSales);
router.post('/',
    middleware.validateProductId,
    middleware.validateQuantity,
    sales.createSales);
module.exports = router;