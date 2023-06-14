const dbPersons = require('./persons');
const Joi = require('joi');
const { ValidationError, UniquenessError } = require('../utils/errors');

// public API
const personService = {
  findAll,
  findByName,
  findById,
  findIdByName,
  save,
};

module.exports = personService;

// implementarion
const schema = Joi.object({
  name: Joi.string().min(3).required(),
  phone: Joi.string().allow('').optional(),
  street: Joi.string().min(3).required(),
  city: Joi.string().min(3).required(),
});

function validate(person) {
  var result = schema.validate(person, { abortEarly: false });
  if (result.error) {
    var message = result.error.details.map(d => d.message).join(', ');
    throw new ValidationError(message);
  }
  return result;
}

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

async function findIdByName(name) {
  const response = await (
    await dbPersons
  ).view('person', 'id_by_name', { key: name });

  if (!response.rows.length) return null;

  return response.rows[0].value;
}

async function save(person) {
  var validation = validate(person);
  if (validation.error) throw new Error(validation.error);

  const response = await (await dbPersons).insert(person);
  return response;
}
