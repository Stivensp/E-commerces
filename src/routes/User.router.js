const express = require('express');
const { getAllUsers, createUser, getOneUser, deleteUser, updateUser, login } = require('../controllers/user.controller.js');

const verifyJWT = require('../utils/verifyJWT.js');

const routerUser = express.Router();

routerUser.route("/")
    .get(verifyJWT, getAllUsers)
    .post(createUser);

routerUser.route("/login")
    .post(login);
routerUser.route("/:id")
    .get(getOneUser)
    .delete(verifyJWT,deleteUser)
    .put(verifyJWT,updateUser);

module.exports = routerUser;