const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Thing = require('./models/thing');
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');
const path = require('path');

const app = express();

app.use(bodyParser.json());



app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/stuff', stuffRoutes);

// mongodb+s@cluster0-cbigc.mongodb.net/test?retryWrites=true
mongoose.connect('mongodb://localhost/sellingdb')
  .then(() => {
    console.log('Successfully connected to MongoDB');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB');
    console.error(error);
  });




module.exports = app;
