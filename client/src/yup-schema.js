import * as Yup from 'yup';

const date = new Date();

export const authorSchema = Yup.object({
  firstName: Yup.string()
    .required('"Имя" — обязательное поле')
    .typeError('Значение должно быть строкой')
    .min(3, 'Имя должно состоять из 3 и более символов'),
  lastName: Yup.string().min(3, 'Имя должно состоять из 3 и более символов'),
  born: Yup.number()
    .integer()
    .typeError('Значение должно быть целым числом')
    .min(1000, `Год публикации должен быть между 1000 и ${date.getFullYear()}`)
    .max(
      date.getFullYear(),
      `Год публикации должен быть между 1000 и ${date.getFullYear()}`
    ),
  profile: Yup.string()
    .typeError('Значение должно быть строкой')
    .url('Значение поля "Изображение" должно быть корректрым URL'),
  creditText: Yup.string(
    'Значение поля "Признание авторства (текст)" должно быть строкой'
  ),
  creditLink: Yup.string()
    .typeError('Значение должно быть строкой')
    .url(
      'Значение поля "Признание авторства (url)" должно быть корректрым URL'
    ),
  annotation: Yup.string().typeError('Значение должно быть строкой')
});

export const bookSchema = Yup.object({
  authorId: Yup.number().integer().required('"Автор" — обязательное поле'),
  title: Yup.string()
    .required('"Название" — обязательное поле')
    .typeError('Значение должно быть строкой')
    .min(3, 'Имя должно состоять из 3 и более символов'),
  published: Yup.number()
    .integer()
    .typeError('Значение должно быть целым числом')
    .min(1000, `Год публикации должен быть между 1000 и ${date.getFullYear()}`)
    .max(
      date.getFullYear(),
      `Год публикации должен быть между 1000 и ${date.getFullYear()}`
    ),
  annotation: Yup.string().typeError('Значение должно быть строкой'),
  genres: Yup.array()
    .of(
      Yup.number()
        .integer()
        .required(
          'Поле "Жанры" не может быть пустым. Необходимо выбрать хотя бы одно значение из списка.'
        ) // Validation for each tag
    )
    .min(1, 'Необходимо выбрать хотя бы одно значение из списка.')
});
