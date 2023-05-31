const dbPersons = require('./persons');

const personService = {
  findAll,
  findByName,
  findById,
  findIdByName,
  findDocById,
  save,
};

async function findAll() {
  const response = await (await dbPersons).view('person', 'by_id');
  return response.rows.map(r => r.value);
}

async function findByName(name) {
  const response = await (
    await dbPersons
  ).view('person', 'by_name', { key: name });

  if (!response.rows.length) return null;

  return response.rows[0].value;
}

async function findById(id) {
  const response = await (await dbPersons).view('person', 'by_id', { key: id });

  if (!response.rows.length) return null;

  return response.rows[0].value;
}

async function findDocById(id) {
  const doc = await (await dbPersons).get(id);

  return doc;
}

async function findIdByName(name) {
  const response = await (
    await dbPersons
  ).view('person', 'id_by_name', { key: name });

  if (!response.rows.length) return null;

  return response.rows[0].value;
}

async function save(person) {
  const response = await (await dbPersons).insert(person);
  return response;
}

module.exports = personService;
