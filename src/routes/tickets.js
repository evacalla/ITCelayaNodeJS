const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const mysqlConnection  = require('../configurations/mysql');

router.get('/tickets/all', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err) => {
        if(!err) {
            mysqlConnection.query('', (err, rows) => {
                if(!err) {
                    res.json(rows);
                } else {
                    console.log(err);
                }});
        } else {
           res.sendStatus(403);
        }});
});

router.post('/tickets/function/:functionId/seat/:seatId', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err) => {
        if(!err){
            mysqlConnection.query("INSERT INTO Ticket (function, seat) VALUES (" + req.params.functionId + ", " 
              + req.params.seatId + ")", (err, result) => {
              if (err) {
                return res.status(500).send(err);
            } else {
                return res.status(200).send("Added Ticket");
              }});
          } else {
            res.sendStatus(403);
          }
    });
});

router.get('/tickets/:id', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err) => {
        if(!err) {

        } else {
            res.sendStatus(403);
        }
    });
});

router.put('/tickets/:ticketId/function/:functionId/seat/:seatId', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err) => {
        if(!err){
            mysqlConnection.query("UDAPTE Ticket SET function = "  +  req.params.functionId + ",  seat = " + req.params.seatId +  
              " WHERE id = " + req.params.ticketId , (err, result) => {
              if (err) {
                return res.status(500).send(err);
            } else {
                return res.status(200).send("Edit Ticket");
              }});
          } else {
            res.sendStatus(403);
          }
    });
});

router.delete('/tickets/:id', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err) => {
        if(!err) {
            mysqlConnection.query('DELETE FROM Ticket WHERE id = '  + req.params.id, 
              (err, result) => {
                if (!err) {
                  return res.status(200).send("Deleted Ticket, id :" + req.params.id);
                } else {
                  return res.status(500).send(err);
                }});
        } else {
            res.sendStatus(403);
        }})
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