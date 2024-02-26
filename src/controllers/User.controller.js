const User = require("../models/user.js");
const catchError = require("../utils/catchError.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


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
    const { firstName, lastName, email, password, phone } = req.body;
    const newBody = { firstName, lastName, email, password, phone };
    const result = await User.update(
        newBody,
        {
            where: { id },
            returning: true
        }
    );
    if (result[0] === 0) {
        // No se encontró ningún usuario para actualizar
        return res.sendStatus(404);
    }
    return res.json(result[1][0]);
});

//only to create a lot of Users
const bulkCreatedUsers = catchError(async (req, res) => {
    const result = await User.bulkCreate(req.body);
    return res.status(201).json(result);
})

//verify password

const login = catchError(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })
    if(!user) return res.sendStatus(401).json({error: 'Invalid credentials'})

   const isValid = await bcrypt.compare(password, user.password)
    if(!isValid) return res.sendStatus(401).json({error: 'Invalid credentials'})
    

    const token = jwt.sign({ user }, process.env.TOKEN_SECRET, { expiresIn: '24h' });
    return res.json({ user, token })
})

module.exports = {
    getAllUsers,
    getOneUser,
    createUser,
    deleteUser,
    updateUser,
    bulkCreatedUsers,
    login
}