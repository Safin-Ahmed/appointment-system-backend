const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://localhost:27017/appointment-system');
module.exports = db;

