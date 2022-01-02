const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const brandController = require('../controllers/brand.controller');

const upload = require('../configs/multer.config')

router.delete('/:id', auth, brandController.deleteBrand);
router.get('/', brandController.index);
router.post('/', auth, upload.single('image'), brandController.createOrUpdate);


module.exports = router;
