const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const mysqlConnection  = require('../configurations/mysql');

router.get('/functions/all', verifyToken, (req, res) => {
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

router.post('/functions', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (req, rest) => {
        if(!err) {

        } else {
            res.sendStatus(403);
        }
    });
});

router.get('/functions/:id', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (req, rest) => {
        if(!err) {

        } else {
            res.sendStatus(403);
        }
    });
});

router.post('/functions/room/:roomId/version/:versionId', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (req, rest) => {
        if(!err) {

        } else {
            res.sendStatus(403);
        }
    });
});

router.put('/functions/:id/room/:roomId/version/:versionId', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (req, rest) => {
        if(!err) {

        } else {
            res.sendStatus(403);
        }
    });
});

router.delete('/functions/:id', verifyToken, (req, res) => {
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