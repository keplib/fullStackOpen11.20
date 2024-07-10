require('dotenv').config();

const PORT = process.env.PORT;
const DB_URL = process.env.MONGODB_URL;

module.exports = {
  DB_URL,
  PORT,
};
