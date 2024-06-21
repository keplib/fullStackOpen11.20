const express = require('express');
var MongoClient = require('mongodb').MongoClient;
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
    const collection = db.collection('phonebook-entries'); // Replace with your collection name
    const newData = req.body;
    const result = await collection.insertOne(newData);
    res.status(201); // Respond with the newly created document
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while saving data' });
  }
});

app.listen(3000, () => {
  console.log('app listening on port 3000!');
});
