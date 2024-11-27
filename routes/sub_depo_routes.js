const express = require('express');
const router = express.Router();
const { create_sub_depo, request_product,update_sub_depo,delete_sub_depo,list_sub_depos } = require('../controllers/sub_depo_controller');
const { protect} = require('../middleware/authMiddleware');

// Alt depo rotaları
router.post('/create',protect, create_sub_depo);
router.post('/:subWarehouseId/request-product',protect, request_product); 
router.put('/:subWarehouseId/update',protect,update_sub_depo);
router.delete('/:subWarehouseId/delete',protect, delete_sub_depo);
router.get('/:parentWarehouseId/subs',protect,list_sub_depos);

module.exports = router;
