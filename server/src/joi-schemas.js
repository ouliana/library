const Joi = require('joi');
const sanitizeHtml = require('sanitize-html');
const fs = require('fs');

const date = new Date();

const authorSchema = Joi.object({
  firstName: Joi.string().required().min(3).description('Имя автора').messages({
    'string.base': 'Тип значения поля "Имя" должно быть строкой',
    'string.empty': 'Поле "Имя" не должно быть пустым',
    'string.min': 'Имя должно состоять из {#limit} и более символов',
    'any.required': '"Имя" — обязательное поле'
  }),
  lastName: Joi.string()
    .min(3)
    .allow('')
    .description('Фамилия автора')
    .messages({
      'string.base': '"Имя" должно быть строкой'
    }),
  born: Joi.number()
    .integer()
    .min(1000)
    .max(date.getFullYear())
    .allow('')
    .description('Год рождения автора')
    .messages({
      'number.base':
        'Тип значения поля "Год рождения" должен быть числом (\'number\')',
      'number.integer': '"Год рождения" должен быть целым числом (integer)',
      'number.min': '"Год рождения" должен быть больше либо равен {#limit}',
      'number.max': '"Год рождения" должен быть меньше либо равен {#limit}'
    }),
  profile: Joi.string()
    .uri()
    .description('Ссылка на ресурс, содержащий изображение автора')
    .allow('')
    .messages({
      'string.base':
        'Значение поля "Изображение" должно быть строкой (\'string\')',
      'string.uri': 'Значение поля "Изображение" должно быть корректным URL'
    }),
  creditText: Joi.string()
    .allow('')
    .description('Текст ссылки для упоминания автора изображения (credits)')
    .messages({
      'string.base':
        'Значение поля "Признание авторства (текст)" должно быть строкой'
    }),
  creditLink: Joi.string()
    .uri()
    .allow('')
    .description('URL ссылки для упоминания автора изображения (credits)')
    .messages({
      'string.base':
        'Значение поля "Признание авторства (url)" должно быть строкой',
      'string.uri':
        'Значение поля "Признание авторства (url)" должно быть корректным URL'
    }),
  annotation: Joi.string().allow('').optional().messages({
    'string.base': 'Значение поля "Аннотация" должно быть строкой'
  })
});

const bookSchema = Joi.object({
  title: Joi.string().min(3).required().description('Название книги').messages({
    'string.base': 'Значение поля "Название" должно быть строкой',
    'string.empty': 'Поле "Название" не должно быть пустым',
    'any.required': '"Название" — обязательное поле'
  }),
  published: Joi.number()
    .integer()
    .min(1000)
    .max(date.getFullYear())
    .allow('')
    .description('Год первой публикации')
    .messages({
      'number.base':
        'Тип значения поля "Год первой публикации" должен быть числом (\'number\')',
      'number.integer':
        '"Год первой публикации" должен быть целым числом (integer)',
      'number.min':
        '"Год первой публикации" должен быть больше либо равен {#limit}',
      'number.max':
        '"Год первой публикации" должен быть меньше либо равен {#limit}'
    }),
  authorId: Joi.number().integer().required().min(1).messages({
    'any.required': '"Автор" — обязательное поле'
  }),
  annotation: Joi.string().allow('').messages({
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

const generateDoc = (schema, name = 'Schema') => {
  let doc = `# ${name} Documentation\n\n`;

  const describe = schema.describe();
  const keys = describe.keys;

  for (const key in keys) {
    const field = keys[key];
    doc += `### Field Name: \`${key}\`\n`;
    doc += `- **Description**: ${field.flags?.description || 'N/A'}\n`;
    doc += `- **Data Type**: ${field.type}\n`;
    doc += `- **Required**: ${
      field.flags?.presence === 'required' ? 'Yes' : 'No'
    }\n`;
    doc += `- **Validation Constraints**:\n`;

    if (field.rules) {
      field.rules.forEach(rule => {
        doc += `  - **${rule.name}**: ${
          rule.args ? JSON.stringify(rule.args) : ''
        }\n`;
      });
    }

    const messages = field.preferences?.messages;

    if (messages) {
      doc += `- **Error Messages**:\n`;
      for (const messageKey in messages) {
        doc += `  - ${messageKey}: "${messages[messageKey]}"\n`;
      }
    }

    doc += '\n';
  }

  return doc;
};

// Generate documentation
let documentation = generateDoc(authorSchema, 'Author Schema');
fs.writeFileSync('author-schema-doc.md', documentation);

documentation = generateDoc(bookSchema, 'Book Schema');
fs.writeFileSync('book-schema-doc.md', documentation);

console.info('Documentation generated successfully.');

module.exports = { sanitizeInput, authorSchema, bookSchema };
