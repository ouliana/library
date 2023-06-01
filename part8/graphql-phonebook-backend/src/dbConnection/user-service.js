const dbUsers = require('./users');

const userService = {
  findAll,
  findById,
  findByUsername,
  save,
  populate,
  findDocById,
  updateFriends,
};

async function findAll() {
  const response = await (await dbUsers).view('user', 'by_id');
  if (!response.rows.length) return null;

  return response.rows.map(r => r.value);
}

async function findDocById(id) {
  const response = await (await dbUsers).get(id);
  return response;
}

async function findById(id) {
  const response = await (await dbUsers).view('user', 'by_id', { key: id });
  if (!response.rows.length) return null;

  return response.rows[0].value;
}

async function findByUsername(userame) {
  const response = await (
    await dbUsers
  ).view('user', 'details_by_username', { key: userame });

  if (!response.rows.length) return null;

  return response.rows[0].value;
}

async function save(user) {
  const response = await (await dbUsers).insert(user);
  return response;
}

async function populate(id) {
  const dbPersons = require('./persons');

  const user = await findById(id);
  const response = await (await dbUsers).view('user', 'friends', { key: id });
  const friendsIds = response.rows[0].value;

  const promises = friendsIds.map(async id => {
    const doc = await (await dbPersons).view('person', 'by_id', { key: id });
    return doc.rows[0].value;
  });

  const friends = await Promise.all(promises);

  return { ...user, friends };
}

async function updateFriends(id, friendId) {
  const doc = await (await dbUsers).get(id);

  const docToUpdate = {
    ...doc,
    friends: doc.friends.concat(friendId),
  };

  const response = await (await dbUsers).insert(docToUpdate);
}

module.exports = userService;
