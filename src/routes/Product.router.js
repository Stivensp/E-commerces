const express = require('express');
const { getAllProducts, createProduct, getOneProduct, deleteProduct, updateProduct } = require('../controllers/Product.controller');

const routerProduct = express.Router();

routerProduct.route("/")
    .get(getAllProducts)
    .post(createProduct);
routerProduct.route("/:id")
    .get(getOneProduct)
    .delete(deleteProduct)
    .put(updateProduct);

module.exports = routerProduct;