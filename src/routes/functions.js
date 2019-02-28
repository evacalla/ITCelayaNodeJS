const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const mysqlConnection  = require('../configurations/mysql');

router.get('/functions/all', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err => {
        if(!err){
          mysqlConnection.query('', (err, rows, fields) => {
            if(!err) {
              res.json(rows);
            } else {
              console.log(err);
            }});  
        } else {
          res.sendStatus(403);
        }
      }));
});

router.post('/functions/room/:idRoom/version/:idVersion:', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err => {
        if(!err){
          mysqlConnection.query("INSERT INTO Function (room, version) VALUES (" + req.params.idRoom + ", " 
            + req.params.idVersion + ")", (err, result) => {
            if (err) {
              return res.status(500).send(err);
          } else {
              return res.status(200).send("Added Function");
            }});
        } else {
          res.sendStatus(403);
        }
      }));
});

router.get('/functions/:id', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err) => {
        if(!err) {
          mysqlConnection.query('' + req.params.id, 
          (err, row) => {
            if(!err) {
              res.json(row);
            } else { 
              console.log(err);
            }});
        } else {
          res.sendStatus(403);
        }
      });
    });


router.put('/functions/:id/room/:roomId/version/:versionId', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err => {
    if(!err){
      mysqlConnection.query("UDAPTE Function SET room = "  +  req.params.roomId + ",  version = " + req.params.versionId +  
        " WHERE id = " + req.params.idVersion , (err, result) => {
        if (err) {
          return res.status(500).send(err);
      } else {
          return res.status(200).send("Added Function");
        }});
    } else {
      res.sendStatus(403);
    }
  }));
});

router.delete('/functions/:id', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err) => {
        if(!err) {
          mysqlConnection.query('DELETE FROM Function WHERE id = '  + req.params.id, 
            (err, result) => {
              if (!err) {
                return res.status(200).send("Deleted Function, id :" + req.params.id);
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