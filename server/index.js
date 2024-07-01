const express = require('express');
var MongoClient = require('mongodb').MongoClient;
var mongodb = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

const url = 'mongodb://admin:password@localhost:27017';
const dbName = 'phonebook';

let db;

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((client) => {
    console.log('Connected to Database');
    db = client.db(dbName);
  })
  .catch((error) => console.error(error));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/phonebook-entries', async (req, res) => {
  try {
    const collection = db.collection('phonebook-entries');
    const data = await collection.find().toArray();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});

app.post('/api/phonebook-entries', async (req, res) => {
  try {
    const collection = db.collection('phonebook-entries');
    const newData = req.body;
    const result = await collection.insertOne(newData);
    res.status(201);
    res.send(newData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while saving data' });
  }
});

app.delete('/api/phonebook-entries/:id', async (req, res) => {
  try {
    const collection = db.collection('phonebook-entries');
    const idToDelete = req.params.id;
    const query = { _id: mongodb.ObjectId.createFromHexString(idToDelete) };
    const result = await collection.findOneAndDelete(query);
    res.status(201);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting data' });
  }
});

app.put('/api/phonebook-entries/:id', async (req, res) => {
  try {
    const collection = db.collection('phonebook-entries');
    const updatedEntry = req.body;
    const idToUpdate = req.params.id;
    const query = { _id: mongodb.ObjectId.createFromHexString(idToUpdate) };
    const result = await collection.replaceOne(query, updatedEntry);
    res.status(201);
    res.send({ ...updatedEntry, _id: idToUpdate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting data' });
  }
});

app.listen(3000, () => {
  console.log('app listening on port 3000!');
});
