const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');

const router = require('express').Router();

// Auth Routes 
router.use('/api/v1/auth', require('../routes/authRoutes'));

router.get('/health', (req, res) => {
    res.status(200).json({
        status: "OK"
    })
})

router.get('/public', authenticate, (req, res) => {
    res.status(200).json({
        message: "This is public route",
    })
})

router.get('/private', authenticate, authorize(['admin', 'doctor']), (_req, res) => {
    res.status(200).json({
        message: "This is a private route"
    })
})

module.exports = router;