'use strict'

const express = require('express');
const app = express();
const PORT = 8080;
const mysql = require('mysql');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const path = require('path');
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

app.use('/assets', express.static('assets'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/add-post', (req, res) => {
  res.sendFile(path.join(__dirname, 'add-post.html'));
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
  connection.query(`INSERT INTO posts (title, url) VALUES ('${req.body.title}','${req.body.url}');`, (error, result) => {
    if (error) {
      res.status(404).send('Please add correct title and value!')
    } else {
      connection.query(`SELECT * FROM posts WHERE id=${result.insertId};`, (err, result) => {
        if (err) {
          res.status(404).send('Query error');
        } else {
          res.status(200).json(result);
        }
      });
    }
  });
});

app.put('/posts/:id/upvote', jsonParser, (req, res) => {
  connection.query(`UPDATE posts SET score = score + 1 WHERE id=${req.params.id};`, (err, voteresult) => {
    if (err) {
      res.status(404).send('Cannot find post')
    } else {
      connection.query(`SELECT * FROM posts WHERE id=${req.params.id};`, (err, queryresult) => {
        if (err) {
          res.status(404).send('Cannot find post')
        } else {
          res.status(200).json(queryresult);
        }
      });
    }
  });
})

app.put('/posts/:id/downvote', jsonParser, (req, res) => {
  connection.query(`UPDATE posts SET score = score - 1 WHERE id=${req.params.id};`, (err, voteresult) => {
    if (err) {
      res.status(404).send('Cannot find post')
    } else {
      connection.query(`SELECT * FROM posts WHERE id=${req.params.id};`, (err, queryresult) => {
        if (err) {
          res.status(404).send('Cannot find post')
        } else {
          res.status(200).json(queryresult);
        }
      });
    }
  });
})

app.delete('/posts/:id', (req, res) => {
  connection.query(`DELETE FROM posts WHERE id=${req.params.id};`, (err, voteresult) => {
    if (err) {
      res.status(404).send('Cannot find post!')
    } else {
      res.status(404).json('Post is deleted');
    }
  });
});

app.put('/posts/:id', jsonParser, (req, res) => {
  let newTitle = req.body.title;
  let newURL = req.body.url;
  connection.query(`UPDATE posts SET title = '${newTitle}', url = '${newURL}' WHERE id=${req.params.id};`, (err, result) => {
    if (err) {
      res.status(404).send('Please insert a correct title and url!')
    } else {
      connection.query(`SELECT * FROM posts WHERE id=${req.params.id};`, (err, queryresult) => {
        if (err) {
          res.status(500).send('Database error!')
        } else {
          res.status(200).json(queryresult);
        }
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on the PORT: ${PORT}`);
});