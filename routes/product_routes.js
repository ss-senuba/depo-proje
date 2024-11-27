const express = require('express');
const router = express.Router();
const { create_product,update_product,delete_product,list_products } = require('../controllers/product_controller');
const { protect} = require('../middleware/authMiddleware');

// Ürün rotaları
router.post('/create', protect,create_product);
router.put('/:id',protect, update_product);
router.delete('/:id',protect,delete_product);
router.get('/get-products',list_products);
module.exports = router;
