const express = require('express');
const { getAllUsers, createUser, getOneUser, deleteUser, updateUser, login } = require('../controllers/user.controller');

const routerUser = express.Router();

routerUser.route("/")
    .get(getAllUsers)
    .post(createUser);

routerUser.route("/login")
    .post(login);

routerUser.route("/:id")
    .get(getOneUser)
    .delete(deleteUser)
    .put(updateUser);

module.exports = routerUser;