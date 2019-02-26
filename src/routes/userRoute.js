const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/login', (req, res) => {
    
    const user = {
        username : req.body.username,
        password : req.body.password
    }
    jwt.sign({user}, 'secretkey', (err, token) => {
        res.json({token})
    });
});

module.exports = router;