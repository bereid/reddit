'use strict'

const express = require('express');
const app = express();
const PORT = 8080;
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Bereid+123',
  database: 'reddit',
});

connection.connect((err) => {
  if (err) {
    console.log('Connection failed to database: ' + err);
    return;
  }
  console.log('Connection established');
});

app.get('/post', (req, res) => {
  connection.query(`SELECT * FROM posts`, (err, result) => {
      if(err){
        res.status(500).send('Database error')
      }
      res.json(result);
    }
  )
});

app.listen(PORT, ()=> {
  console.log(`Server is running on the PORT: ${PORT}`);
});