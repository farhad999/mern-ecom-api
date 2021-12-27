const router = require('express').Router();

const auth = require('../middlewares/auth.middleware');

const categoryController = require('../controllers/category.controller');

router.delete('/:id', auth, categoryController.deleteCategory);

router.get('/', auth, categoryController.index);

router.post('/', auth, categoryController.createOrUpdate);


module.exports = router;
