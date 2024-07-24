const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const entriesRouter = require('./controllers/entries');

app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

const connectDB = async () => {
  try {
    await mongoose.connect(config.DB_URL);
    console.log('MongoDB connected!');
  } catch (err) {
    console.log('Failed to connect to MongoDB', err);
  }
};

connectDB();

app.use('/api/phonebook-entries', entriesRouter);

module.exports = app;
