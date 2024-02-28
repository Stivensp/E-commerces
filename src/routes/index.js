const express = require('express');
const routerUser = require('./User.router');
const router = express.Router();
const routerCategory = require('./Category.router');
// colocar las rutas aquí
router.use('/users', routerUser);
router.use('/category', routerCategory);
module.exports = router;