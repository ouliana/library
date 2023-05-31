require('dotenv').config();

const PORT = process.env.PORT;
const DB_HOST_AUTH = process.env.DB_HOST_AUTH;

const DB_NAME = process.env.NODE_ENV === 'test' ? 'test_pphb' : 'persons_phb';
const DB_USERS = process.env.NODE_ENV === 'test' ? 'test_uphb' : 'users_phb';

module.exports = {
  PORT,
  DB_HOST_AUTH,
  DB_NAME,
  DB_USERS,
};
