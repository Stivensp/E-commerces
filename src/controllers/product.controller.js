const Product = require("../models/Product.js");
const catchError = require("../utils/catchError.js");

const getAllProducts = catchError(async (req, res) => {
    const result = await Product.findAll();
    return res.json(result);
})

const getOneProduct = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await Product.findByPk(id);

    if (!result) return res.send("Product not found").status(404);
    return res.json(result);
})

const createProduct = catchError(async (req, res) => {
    const { title, description, price, categoryId } = req.body;
    const newBody = { title, description, price,categoryId};
    const Products = await Product.create(newBody);
    return res.status(201).json(Products);
})

const deleteProduct = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await Product.destroy({where: {id}});

    if(!result) return res.send("Product not Found").status(404);
    return res.status(204).send("Product deleted");
})

const updateProduct = catchError(async (req, res) => {
    const { id } = req.params;
    const { title, description, price} = req.body;
    const newBody = { title, description, price };
    const result = await Product.update(
        newBody,
        {
            where: { id },
            returning: true
        }
    );
    if (result[0] === 0) {
        return res.sendStatus(404);
    }
    return res.json(result[1][0]);
});

const bulkCreatedProducts = catchError(async (req, res) => {
    const result = await Product.bulkCreate(req.body);
    return res.status(201).json(result);
})

module.exports = {
    getAllProducts,
    getOneProduct,
    createProduct,
    deleteProduct,
    updateProduct,
    bulkCreatedProducts
}