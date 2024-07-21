import axios from 'axios';
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const getAll = () => {
  return axios(baseUrl);
};

export const addNewEntry = (name, phone) => {
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
