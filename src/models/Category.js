const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

// Model body
const Category = sequelize.define('category', {
    // Define your model attributes here
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // Add more attributes as needed
});

module.exports = Category;