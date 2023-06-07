const dbBooks = require('./dbBooks');

const booksService = {
  findAll,
  findByAuthor,
  findByTitle,
  save,
};

module.exports = booksService;

async function findAll() {
  const response = await (await dbBooks).view('book', 'by_id');
  return response.rows.map(r => r.value);
}

async function findByAuthor(author) {
  const response = await (
    await dbBooks
  ).view('book', 'by_author', { key: author });

  if (!response.rows.length) return null;

  return response.rows.map(r => r.value);
}

async function findByTitle(title) {
  const response = await (
    await dbBooks
  ).view('book', 'by_title', { key: title });

  if (!response.rows.length) return null;

  return response.rows[0].value;
}

async function save(book) {
  const db = await dbBooks;
  const response = await db.insert(book);
  const savedBook = await db.view('book', 'by_id', { key: response.id });
  return savedBook.rows[0].value;
}
