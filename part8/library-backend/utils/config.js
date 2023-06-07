require('dotenv').config();

const PORT = process.env.PORT;
const DB_HOST_AUTH = process.env.DB_HOST_AUTH;

const DB_BOOKS = process.env.NODE_ENV === 'test' ? 'test_blbr' : 'books';
const DB_AUTHORS = process.env.NODE_ENV === 'test' ? 'test_albr' : 'authors';
const DB_USERS = process.env.NODE_ENV === 'test' ? 'test_ulbr' : 'users_lbr';

module.exports = {
  PORT,
  DB_HOST_AUTH,
  DB_BOOKS,
  DB_AUTHORS,
  DB_USERS,
};
