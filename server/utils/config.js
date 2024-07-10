require('dotenv').config();

const PORT = process.env.PORT;
const DB_URL = process.env.NODE_ENV === 'development' ? process.env.MONGODB_URL_DEV : process.env.MONGODB_URL;

module.exports = {
  DB_URL,
  PORT,
};
