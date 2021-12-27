const router = require('express').Router();

const auth = require('../middlewares/auth.middleware');

const productController = require('../controllers/product.controller');

router.delete('/:id', auth, productController.deleteProduct);

router.put('/:id', auth, productController.update);

router.get('/', auth, productController.index);

router.post('/', auth, productController.create);

module.exports = router;