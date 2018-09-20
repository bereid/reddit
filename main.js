'use strict'

const express = require('express');
const app = express();
const PORT = 8080;

app.get('/hello', (req, res) => {
  res.send('hello world');
})

app.listen(PORT, ()=> {
  console.log(`Server is running on the PORT: ${PORT}`);
});