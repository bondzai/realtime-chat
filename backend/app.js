require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello from express');
  });

module.exports = app;