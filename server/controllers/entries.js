const entriesRouter = require('express').Router();
const PhonebookEntry = require('../models/entryModel');

entriesRouter.get('/', async (req, res) => {
  try {
    const entries = await PhonebookEntry.find({});
    res.send(entries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});

entriesRouter.post('/', async (req, res) => {
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

entriesRouter.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await PhonebookEntry.findByIdAndDelete(id);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

entriesRouter.put('/:id', async (req, res) => {
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

module.exports = entriesRouter;
