const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const prompts = require('./prompts');

app.get('/api/prompts', (req, res) => {
  res.json(prompts);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});