'use strict'

const express = require('express');
const app = express();
const PORT = 8080;
const mysql = require('mysql');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
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

app.get('/posts', (req, res) => {
  connection.query(`SELECT * FROM posts`, (err, result) => {
    if (err) {
      res.status(500).send('Database error')
    }
    res.json(result);
  }
  )
});

app.post('/posts', jsonParser, (req, res) => {
  if (req.body) {
    connection.query(`INSERT INTO posts (title, url) VALUES ('${req.body.title}','${req.body.url}');`, (error, result) => {
      connection.query(`SELECT * FROM posts WHERE id=${result.insertId};`, (err, result) => {
        res.status(200).json(result);
      });
    });
  } else {
    res.send('Please insert a title and a URL!');
  }
})

app.put('/posts/:id/upvote', jsonParser, (req, res) => {
  connection.query(`UPDATE posts SET score = score + 1 WHERE id=${req.params.id};`, (err, voteresult) => {
    connection.query(`SELECT * FROM posts WHERE id=${req.params.id};`, (err, queryresult) => {
      res.status(200).json(queryresult);
    });
  });
})

app.put('/posts/:id/downvote', jsonParser, (req, res) => {
  connection.query(`UPDATE posts SET score = score - 1 WHERE id=${req.params.id};`, (err, voteresult) => {
    connection.query(`SELECT * FROM posts WHERE id=${req.params.id};`, (err, queryresult) => {
      res.status(200).json(queryresult);
    });
  });
});

app.delete('/posts/:id', jsonParser, (req, res) => {
  connection.query(`DELETE FROM posts WHERE id=${req.params.id};`, (err, voteresult) => {
    res.status(404).json('Post is deleted');
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on the PORT: ${PORT}`);
});