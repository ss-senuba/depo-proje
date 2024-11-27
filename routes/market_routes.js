const express = require('express');
const router = express.Router();
const { create_market, request_product,update_market,delete_market,list_markets } = require('../controllers/market_controller');
const { protect} = require('../middleware/authMiddleware');

// Market rotaları
router.post('/create',protect, create_market);
router.post('/:marketId/request-product',protect, request_product);
router.put('/:marketId/update',protect, update_market);
router.delete('/:marketId/delete',protect, delete_market);
router.get('/list',protect, list_markets);

module.exports = router;
