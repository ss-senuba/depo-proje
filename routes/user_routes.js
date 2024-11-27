const express = require('express');
const router = express.Router();
const { register, login ,update,delete_user,get_list} = require('../controllers/user_controller');
const { protect} = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.put('/update/:userId',protect,update);
router.delete('/delete/:userId',protect,delete_user);
router.get('/get-list',protect,get_list);

module.exports = router;
