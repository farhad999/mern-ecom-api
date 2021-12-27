const authRoute = require('./auth.route')
const router = require('express').Router();
const brandRoute = require('./brand.route');

router.use('/auth',  authRoute);

router.use('/brand', brandRoute);

module.exports = router;