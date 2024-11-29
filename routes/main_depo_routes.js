const express = require('express');
const router = express.Router();
const { create, add_product, update, delete_depo, list } = require('../controllers/main_depo_controller');
const { protect} = require('../middleware/authMiddleware');

// Depo rotaları
router.post('/create',protect, create);
router.post('/:warehouseId/add-product',protect, add_product);
router.put('/update/:warehouseId',protect, update);
router.delete('/delete/:warehouseId',protect,delete_depo);
router.get('/get-list',protect,list); 

module.exports = router;
