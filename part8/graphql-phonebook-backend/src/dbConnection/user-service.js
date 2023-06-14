const dbUsers = require('./users');
const Joi = require('joi');
const { ValidationError, UniquenessError } = require('../utils/errors');

// public API

const userService = {
  findAll,
  findById,
  findByUsername,
  save,
  populate,
  findDocById,
  updateFriends,
};

module.exports = userService;

// implementarion
const schema = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(6).required(),
  frends: Joi.array(),
});

function validate(user) {
  var result = schema.validate(user, { abortEarly: false });
  if (result.error) {
    var message = result.error.details.map(d => d.message).join(', ');
    throw new ValidationError(message);
  }
  return result;
}

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
  var validation = validate(user);
  if (validation.error) throw new Error(validation.error);

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
