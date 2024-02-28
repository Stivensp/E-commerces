const Category = require("../models/Category.js");
const catchError = require("../utils/catchError.js");

const getAllCategorys = catchError(async (req, res) => {
    const result = await Category.findAll();
    return res.json(result);
})


const createCategory = catchError(async (req, res) => {
    const { name } = req.body;
    const newBody = { name};
    const Categorys = await Category.create(newBody);
    return res.status(201).json(Categorys);
})

const deleteCategory = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await Category.destroy({where: {id}});

    if(!result) return res.send("Category not Found").status(404);
    return res.status(204).send("Category deleted");
})
module.exports = {
    getAllCategorys,
    createCategory,
    deleteCategory,
}