const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = express.Router();

const mysqlConnection  = require('../configurations/mysql');

router.post('/login', (req, res) => {
    
    let username  = req.body.username;
    let password = req.body.password; 

    getPassword = mysqlConnection.query("SELECT s.password FROM User s WHERE s.username = '" + username + "'" , (err, rows) => {
        if(!err) {
            var isValid = bcrypt.compareSync(password, rows[0].password);
            if(!isValid) {
                return res.status(401).send({ auth: false })
            } else {
                jwt.sign({username}, 'secretkey', (err, token) => {
                    res.status(200).send({ auth: true, token: token });
                });   
            }
        } else {
            return err;
        }
    });
});

module.exports = router;