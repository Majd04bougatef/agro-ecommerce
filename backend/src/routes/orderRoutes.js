const router = require('express').Router();
const { create, getMyOrders, getAll, updateStatus } = require('../controllers/orderController');
const auth = require('../middleware/auth');

router.post('/', auth, create);
router.get('/my', auth, getMyOrders);
router.get('/', auth, getAll);
router.patch('/:id/status', auth, updateStatus);

module.exports = router;
