require('dotenv').config('../.env');
const {notFoundHandler, errorHandler} = require('./error');
const express = require('express');

const app = express();


// Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;