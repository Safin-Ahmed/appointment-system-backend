const {Schema, model, SchemaTypes} = require('mongoose');

const appointmentSchema = new Schema({
    serviceName: String,
    date: Date,
    appointedDoctor: SchemaTypes.ObjectId
})

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum: ['admin', 'user', 'doctor'],
        default: 'user'
    },
    appointments: [appointmentSchema],
})

const User = model('User', userSchema);

module.exports = User;