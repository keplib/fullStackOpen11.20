const request = require('supertest');
const mongoose = require('mongoose');
const PhonebookEntry = require('../models/entryModel');
const app = require('../app');

const initialEntries = [
  {
    name: 'Teszt Elek',
    number: '123445',
  },
  {
    name: 'Mekk Elek',
    number: '32435435',
  },
];

beforeEach(async () => {
  await PhonebookEntry.deleteMany({});
  let phonebookObject = new PhonebookEntry(initialEntries[0]);
  await phonebookObject.save();
  phonebookObject = new PhonebookEntry(initialEntries[1]);
  await phonebookObject.save();
});

describe('API endpoint test', () => {
  it('should retrieve all items', async () => {
    const res = await request(app).get('/api/phonebook-entries').expect(200);

    expect(res.body.length).toBe(2);
  });

  it('should create a new phonebook item', async () => {
    const res = await request(app)
      .post('/api/phonebook-entries')
      .send({ name: 'Test Item', number: '12345' })
      .expect(201);

    expect(res.body.name).toBe('Test Item');
    const allItems = await request(app).get('/api/phonebook-entries').expect(200);

    expect(allItems.body.length).toBe(3);
  });

  it('items can be modified', async () => {
    const allEntries = await request(app).get('/api/phonebook-entries');
    const entryToModify = allEntries.body[0];
    const res = await request(app)
      .put(`/api/phonebook-entries/${entryToModify.id}`)
      .send({ name: 'Test Item', number: '12345' });

    const allEntriesAfterPut = await request(app).get('/api/phonebook-entries');
    expect(allEntriesAfterPut.body[0].name).toBe('Test Item');
  });

  it('items can be deleted', async () => {
    const allEntries = await request(app).get('/api/phonebook-entries');
    const entryToDelete = allEntries.body[0];
    const res = await request(app).delete(`/api/phonebook-entries/${entryToDelete.id}`);

    const allEntriesAfterDelete = await request(app).get('/api/phonebook-entries');

    expect(allEntriesAfterDelete.body.length).toBe(1);
  });
});

afterAll(async () => {
  await PhonebookEntry.deleteMany({});
  await mongoose.connection.close();
});
