const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const mysqlConnection  = require('../configurations/mysql');

router.get('/tickets/all', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (req, rest) => {
        if(!err) {
            mysqlConnection.query('', (err, rows) => {
                if(!err) {
                    res.json(rows);
                } else {
                    console.log(err);
                }});
            } else {
                res.sendStatus(403);
            }})
});

router.post('/tickets', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (req, rest) => {
        if(!err) {

        } else {
            res.sendStatus(403);
        }
    });
});

router.get('/tickets/:id', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (req, rest) => {
        if(!err) {

        } else {
            res.sendStatus(403);
        }
    });
});

router.post('/tickets/function/:functionId/seat/:seatId', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (req, rest) => {
        if(!err) {

        } else {
            res.sendStatus(403);
        }
    });
});

router.put('/tickets/:ticketId/function/:functionId/seat/:seatId', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (req, rest) => {
        if(!err) {

        } else {
            res.sendStatus(403);
        }
    });
});

router.delete('/tickets/:id', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (req, rest) => {
        if(!err) {

        } else {
            res.sendStatus(403);
        }
    });
});



function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    
    if(typeof bearerHeader != 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
  };
  
  module.exports = router