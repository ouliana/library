const dbAuthors = require('./dbAuthors');

const authorsService = {
  findAll,
  findByName,
  findDocByName,
  save,
};

module.exports = authorsService;

async function findAll() {
  const response = await (await dbAuthors).view('author', 'by_id');
  return response.rows.map(r => r.value);
}

async function findByName(name) {
  const response = await (
    await dbAuthors
  ).view('author', 'by_name', { key: name });

  if (!response.rows.length) return null;

  return response.rows[0].value;
}

async function findDocByName(name) {
  const response = await (
    await dbAuthors
  ).view('author', 'doc_by_name', { key: name });

  if (!response.rows.length) return null;

  return response.rows[0].value;
}

async function save(author) {
  const db = await dbAuthors;
  const response = await db.insert(author);

  const savedAuthor = await db.view('author', 'by_id', { key: response.id });
  return savedAuthor.rows[0].value;
}
