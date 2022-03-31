const express = require('express');

const router = express.Router();
const sales = require('../controllers/sales/index');

router.get('/:id', sales.getByIdSale);
router.get('/', sales.getAllSales);

module.exports = router;