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
