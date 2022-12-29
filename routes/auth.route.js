const router = require('express').Router();
const authController = require('../controllers/auth.controller')
const auth = require('../middlewares/auth.middleware')

router.post('/register', authController.register);

router.post('/login', authController.login);

router.get('/user', auth, authController.getUser);

module.exports = router;