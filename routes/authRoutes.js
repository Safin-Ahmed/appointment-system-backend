const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/register', async (req, res) => {
    const {username, email, password, role} = req.body;
    let user = await User.findOne({email});
    if(user){
        return res.status(400).json({message: "Email Already Exists!"})
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    user = new User({
        username,
        email,
        password: hash,
        role
    });

    await user.save();
    res.status(201).json(user);
})

router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({message: "User not Found"});
    }

    const passwordMatched = await bcrypt.compare(password, user.password);
    if(!passwordMatched){
        return res.status(400).json({message: "Invalid Password"})
    }

    const token = jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.email
        },
        'JWT_SECRET_KEY',
        {
            expiresIn: "2h"
        }
    )

    res.status(200).json({token})
})

module.exports = router;