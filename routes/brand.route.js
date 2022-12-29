const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const brandController = require('../controllers/brand.controller');

router.delete('/:id', auth, brandController.deleteBrand);

router.post('/', auth, brandController.createOrUpdate);


module.exports = router;