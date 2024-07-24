const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

describe('Sample Test', () => {
  //   it('should create a new item', async () => {
  //     const res = await request(app).post('/api/phonebook-entries').send({ name: 'Test Item' }).expect(201);

  //     expect(res.body.name).toBe('Test Item');
  //   });

  it('should retrieve all items', async () => {
    const res = await request(app).get('/api/phonebook-entries').expect(200);

    expect(res.body.length).toBe(4);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
