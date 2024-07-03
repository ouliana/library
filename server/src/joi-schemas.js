const Joi = require('joi');
const sanitizeHtml = require('sanitize-html');

const date = new Date();

const authorSchema = Joi.object({
  firstName: Joi.string().min(3).required(),
  lastName: Joi.string().min(3).required(),
  born: Joi.number().integer().min(1000).max(date.getFullYear()),
  profile: Joi.string().uri().allow('').optional().messages({
    'string.base': 'URL должен быть строкой'
  }),
  creditText: Joi.string().allow('').optional().messages({
    'string.base': 'Значение creditText должно быть строкой'
  }),
  creditLink: Joi.string().allow('').optional().messages({
    'string.base': 'Значение creditLink должно быть строкой'
  }),
  annotation: Joi.string().allow('').optional().messages({
    'string.base': 'Значение поля annotation должно быть строкой'
  })
});

const bookSchema = Joi.object({
  title: Joi.string().min(3).required(),
  published: Joi.number().integer().min(1000).max(date.getFullYear()),
  authorId: Joi.number().integer().min(1),
  annotation: Joi.string().allow('').optional().messages({
    'string.base': 'Значение поля annotation должно быть строкой'
  }),
  genres: Joi.array().items(Joi.number())
});

const sanitizeInput = input => {
  return sanitizeHtml(input, {
    allowedTags: [],
    allowedAttributes: {}
  });
};

module.exports = { sanitizeInput, authorSchema, bookSchema };
