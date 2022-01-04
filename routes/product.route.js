const router = require('express').Router();

const auth = require('../middlewares/auth.middleware');

const productController = require('../controllers/product.controller');

const upload = require('../configs/multer.config');

router.delete('/:id', auth, productController.deleteProduct);

router.put('/:id', auth, productController.update);

router.get('/:slug', productController.view);

router.get('/', productController.index);

router.post('/', auth, upload.single('thumbImage'), productController.create);

module.exports = router;
