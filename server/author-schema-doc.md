# Author Schema Documentation

### Field Name: `firstName`
- **Description**: Имя автора
- **Data Type**: string
- **Required**: Yes
- **Validation Constraints**:
  - **min**: {"limit":3}
- **Error Messages**:
  - string.base: "Тип значения поля "Имя" должно быть строкой"
  - string.empty: "Поле "Имя" не должно быть пустым"
  - string.min: "Имя должно состоять из {#limit} и более символов"
  - any.required: ""Имя" — обязательное поле"

### Field Name: `lastName`
- **Description**: Фамилия автора
- **Data Type**: string
- **Required**: No
- **Validation Constraints**:
  - **min**: {"limit":3}
- **Error Messages**:
  - string.base: ""Имя" должно быть строкой"

### Field Name: `born`
- **Description**: Год рождения автора
- **Data Type**: number
- **Required**: No
- **Validation Constraints**:
  - **integer**: 
  - **min**: {"limit":1000}
  - **max**: {"limit":2024}
- **Error Messages**:
  - number.base: "Тип значения поля "Год рождения" должен быть числом ('number')"
  - number.integer: ""Год рождения" должен быть целым числом (integer)"
  - number.min: ""Год рождения" должен быть больше либо равен {#limit}"
  - number.max: ""Год рождения" должен быть меньше либо равен {#limit}"

### Field Name: `profile`
- **Description**: Ссылка на ресурс, содержащий изображение автора
- **Data Type**: string
- **Required**: No
- **Validation Constraints**:
  - **uri**: 
- **Error Messages**:
  - string.base: "Значение поля "Изображение" должно быть строкой ('string')"
  - string.uri: "Значение поля "Изображение" должно быть корректным URL"

### Field Name: `creditText`
- **Description**: Текст ссылки для упоминания автора изображения (credits)
- **Data Type**: string
- **Required**: No
- **Validation Constraints**:
- **Error Messages**:
  - string.base: "Значение поля "Признание авторства (текст)" должно быть строкой"

### Field Name: `creditLink`
- **Description**: URL ссылки для упоминания автора изображения (credits)
- **Data Type**: string
- **Required**: No
- **Validation Constraints**:
  - **uri**: 
- **Error Messages**:
  - string.base: "Значение поля "Признание авторства (url)" должно быть строкой"
  - string.uri: "Значение поля "Признание авторства (url)" должно быть корректным URL"

### Field Name: `annotation`
- **Description**: N/A
- **Data Type**: string
- **Required**: No
- **Validation Constraints**:
- **Error Messages**:
  - string.base: "Значение поля "Аннотация" должно быть строкой"

