import axios from 'axios';
const baseUrl = 'http://localhost:3000/api/phonebook-entries';

const getAll = () => {
  return axios(baseUrl);
};

const exportedObject = {
  getAll,
};

export default exportedObject;
