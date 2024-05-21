const usersService = {
  findUserById,
  findByUsername,
  findDocByUsername,
  save
};

module.exports = usersService;

async function findUserById(id) {
  const response = await (await dbUsers).view('user', 'by_id', { key: id });

  if (!response.rows.length) return null;

  return response.rows[0].value;
}

async function findByUsername(username) {
  const response = await (
    await dbUsers
  ).view('user', 'by_username', { key: username });

  if (!response.rows.length) return null;

  return response.rows[0].value;
}

async function findDocByUsername(username) {
  const response = await (
    await dbUsers
  ).view('user', 'doc_by_username', { key: username });

  if (!response.rows.length) return null;

  return response.rows[0].value;
}

async function save(user) {
  const db = await dbUsers;
  const response = await db.insert(user);

  const savedUser = await db.view('user', 'by_id', { key: response.id });
  return savedUser.rows[0].value;
}

// async function populate(id) {

// }
