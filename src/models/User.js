const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

// Model body
const User = sequelize.define('user', {
    // Define your model attributes here
    FirtsName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    LastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    Password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // Add more attributes as needed
});
User.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    delete values.Password;
    return values;
}

User.beforeCreate(async(user)=>{
const hashedPassword= await bcrypt.hash(password,10)
user.password= hashedPassword
})

module.exports = User;