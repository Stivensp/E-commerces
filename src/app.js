const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const router = require('./routes');
const errorHandler = require('./utils/errorHandler');
require('dotenv').config();
const path = require("path")


const app = express();
app.use(express.json());
app.use(helmet({
    crossOriginResourcePolicy: false,
}));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(router);
app.get('/', (req, res) => {
    return res.send("Welcome to express!");
})

app.use(errorHandler)

module.exports = app;
