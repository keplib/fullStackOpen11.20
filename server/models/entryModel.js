const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  name: String,
  number: String,
});

entrySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const PhonebookEntry = mongoose.model('Entry', entrySchema);

module.exports = PhonebookEntry;
