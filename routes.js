const express = require('express');
const router = express.Router();
const {login,register} = require('./src/modules/user/controller/user.controller')
// User Registration
router.post('/register', async (req, res) => {
    try {
        const response = await register(req.body)
        res.status(response.statusCode).json({message:response.message})
    } catch (e) {
        console.log(e)
        res.status(e.statusCode).json({message:e.message})
    }
});

// User Login
router.post('/login', async (req, res) => {
    try {
        const response = await login(req.body)
        res.status(response.statusCode).json({...response})

    } catch (e) {
        console.log(e)
        res.status(e.statusCode).json({message:e.message})
    }
});

module.exports = router;
