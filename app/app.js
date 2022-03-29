require('dotenv').config('../.env');
const {notFoundHandler, errorHandler} = require('./error');
const express = require('express');

const app = express();

//Middlewares
app.use(require('./middleware'));

// Router
app.use(require('./routes'));

// Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;