const User = require("../models/user.js");
const catchError = require("../utils/catchError.js");

const getAllUsers = catchError(async (req, res) => {
    const result = await User.findAll();
    return res.json(result);
})

const getOneUser = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await User.findByPk(id);

    if (!result) return res.send("User not found").status(404);
    return res.json(result);
})

const createUser = catchError(async (req, res) => {
    const result = await User.create(req.body);
    return res.status(201).json(result);
})

const deleteUser = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await User.destroy({where: {id}});

    if(!result) return res.send("User not Found").status(404);
    return res.status(204).send("User deleted");
})

const updateUser = catchError(async (req, res) => {
    const { id } = req.params;
    const newBody = req.body;

    const idUser = await User.findByPk(id);

    if(!idUser) return res.send("User not Found").status(404);

    const result = await User.update(
        newBody,
        {
            where: { id },
            returning: true
        }
    );

    return res.json(result[1][0]);
})

//only to create a lot of Users
const bulkCreatedUsers = catchError(async (req, res) => {
    const result = await User.bulkCreate(req.body);
    return res.status(201).json(result);
})

module.exports = {
    getAllUsers,
    getOneUser,
    createUser,
    deleteUser,
    updateUser,
    bulkCreatedUsers
}