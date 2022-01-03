const router = require('express').Router();

const auth = require('../middlewares/auth.middleware');

const categoryController = require('../controllers/category.controller');

const upload = require('../configs/multer.config')

router.delete('/:id', auth, categoryController.deleteCategory);
//any one can access
router.get('/', categoryController.index);

router.post('/', auth, upload.single('image'), categoryController.createOrUpdate);


module.exports = router;
