const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function authenticate (req, res, next) {
    let token = req.headers.authorization;
    if(!token) {
        return res.status(400).json({message: "Invalid Token!"})
    }

    try {
        console.log(token);
        token = token.split(' ')[1];
        const decode = jwt.verify(token, 'JWT_SECRET_KEY');
        const user = await User.findById(decode._id).select('-password');
        req.user = user;
        next();
    }
    catch (e) {
        return res.status(400).json({
            message: "Invalid Token!"
        })
    }
}

module.exports = authenticate;