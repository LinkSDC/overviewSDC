require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const port = process.env.PORT || 3001;
const app = express();
app.use(cors());
app.use(express.json());

app.use('/products', routes);
app.listen(port, (err) => {
  if (err) {
    console.log('Error connecting to localhost', err);
  }
  console.log(`Listening at http://localhost:${port}`);
});
