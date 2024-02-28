const express = require('express');
const { getAllCategorys, createCategory, deleteCategory,  } = require('../controllers/Category.controller');
const verifyJWT = require('../utils/verifyJWT.js');
const routerCategory = express.Router();

routerCategory.route("/")
    .get(getAllCategorys)
    .post(verifyJWT,createCategory);

routerCategory.route("/:id")
    .delete(verifyJWT,deleteCategory)
  

module.exports = routerCategory;