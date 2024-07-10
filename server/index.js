const express = require('express');
const mongoose = require('mongoose');
const config = require('./utils/config');
const cors = require('cors');
const bodyParser = require('body-parser');
const PhonebookEntry = require('./models/entryModel');

const app = express();

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

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/phonebook-entries', async (req, res) => {
  try {
    const entries = await PhonebookEntry.find({});
    res.send(entries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});

app.post('/api/phonebook-entries', async (req, res) => {
  try {
    const { name, number } = req.body;

    const newEntry = new PhonebookEntry({
      name: name,
      number: number,
    });

    const result = await newEntry.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete('/api/phonebook-entries/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await PhonebookEntry.findByIdAndDelete(id);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.put('/api/phonebook-entries/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await PhonebookEntry.findOneAndUpdate(
      { _id: id },
      { name: req.body.name, number: req.body.number },
      { new: true }
    );
    res.status(201).json(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(process.env.PORT, () => {
  console.log('app listening on port 3000!');
});
