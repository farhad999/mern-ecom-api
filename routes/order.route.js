const router = require('express').Router();
const orderController = require('../controllers/order.controller');
const auth = require('../middlewares/auth.middleware');

router.put('/:id', auth, orderController.cancelledOrder);

router.get('/all', auth, orderController.getAllOrders);

router.get('/:id', auth, orderController.viewOrder);

router.get('/', auth, orderController.getOrders);



router.post('/', auth, orderController.placeOrder);

module.exports = router;
