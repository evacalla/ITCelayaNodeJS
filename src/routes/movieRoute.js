const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const mysqlConnection  = require('../configurations/mysql');


router.get('/movies/all', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err => {
    if(!err){
      mysqlConnection.query('SELECT * FROM Movie', (err, rows, fields) => {
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

router.post('/movies', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err => {
    if(!err) {
      mysqlConnection.query('INSERT INTO Movie(name, director, gender, classification, duration, description) VALUES ('
        + "'"+ req.body.name + "', '" + req.body.director + "', '" + req.body.gender + "', '" + req.body.classification + "', " 
        + req.body.duration + ", '" + req.body.description + "')",  
           (err, result) => {
              if (err) {
                return res.status(500).send(err);
            } else {
                return res.status(200).send("Added Movie");
            }});
    } else {
      res.sendStatus(403);
    }
  }));
});

router.get('/movies/:id', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err) => {
    if(!err) {
      let id = req.params.id;
      mysqlConnection.query('SELECT * FROM Movie WHERE id  = ' + id , 
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

router.delete('/movies/:id', (req, res) => {
  jwt.verify(req.token, 'secretkey', (err) => {
    if(!err) {
      mysqlConnection.query('DELETE FROM Movie WHERE id = '  + req.params.id, 
        (err, result) => {
          if (!err) {
            return res.status(200).send("Deleted Movie, id :" + req.params.id);
          } else {
            return res.status(500).send(err);
          }});
    } else {
      res.sendStatus(403);
    }})
});

router.put('/movies/:id', (req, res) => {
  jwt.verify(req.token, 'secretkey', (err) => {
    if(!err) {
      mysqlConnection.query("UPDATE Movie SET name = '" +  req.body.name + "', director = '" 
      + req.body.director + "', gender = '"
      + req.body.gender +"', classification = '" + req.body.classification + "', duration = " 
      + req.body.duration + " , description = '" + req.body.description + "'WHERE id = " + req.params.id, 
        (err, result) => {
          if (!err) {
            return res.status(200).send("Updated Movie, id :" + req.params.id);
          } else {
            return res.status(500).send(err);
          }});
    } else {
      res.sendStatus(403);
    }});
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