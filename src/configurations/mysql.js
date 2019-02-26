const mysql = require('mysql');

mysqlConnection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'cinema'
});

mysqlConnection.connect(function (err) {
    if (err) {
      console.error(err);
      return;
    } else {
      console.log('db is connected');
    }
  });
  
module.exports = mysqlConnection;