const express = require('express');
const routerUser = require('./User.router');
const router = express.Router();

// colocar las rutas aquí
router.use('/User', routerUser);

module.exports = router;