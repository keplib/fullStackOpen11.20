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

const updateEntry = (persons, name, updatedNumber) => {
  const entryToUpdate = persons.filter((person) => person.name.toLowerCase() === name.toLowerCase())[0];
  if (window.confirm(`${entryToUpdate.name} is already in the phone book. Do you really want to update the numeber?`)) {
    return axios.put(`${baseUrl}/${entryToUpdate.id}`, { ...entryToUpdate, number: updatedNumber });
  }
};

const exportedObject = {
  getAll,
  addNewEntry,
  deleteEntry,
  updateEntry,
};

export default exportedObject;
