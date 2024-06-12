require('dotenv').config();

const PORT = process.env.PORT;
const DB_HOST_AUTH = process.env.DB_HOST_AUTH;

module.exports = {
  PORT,
  DB_HOST_AUTH
};
