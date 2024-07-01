import axios from 'axios';
const baseUrl = 'http://localhost:3000/api/phonebook-entries';

const getAll = () => {
  return axios(baseUrl);
};

const addNewEntry = (name, phone) => {
  return axios.post(baseUrl, name, phone);
};

const deleteEntry = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const updateEntry = (id, updatedEntry) => {
  return axios.put(`${baseUrl}/${id}`, updatedEntry);
};

const exportedObject = {
  getAll,
  addNewEntry,
  deleteEntry,
  updateEntry,
};

export default exportedObject;
