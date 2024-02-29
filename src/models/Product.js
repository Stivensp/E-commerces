const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

// 
const Product = sequelize.define('Product', {
    // Define your attributes here
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
       
    },
    // Add more attributes as needed

});

module.exports = Product;