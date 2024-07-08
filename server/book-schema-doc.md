# Book Schema Documentation

### Field Name: `title`
- **Description**: Название книги
- **Data Type**: string
- **Required**: Yes
- **Validation Constraints**:
  - **min**: {"limit":3}
- **Error Messages**:
  - string.base: "Значение поля "Название" должно быть строкой"
  - string.empty: "Поле "Название" не должно быть пустым"
  - any.required: ""Название" — обязательное поле"

### Field Name: `published`
- **Description**: Год первой публикации
- **Data Type**: number
- **Required**: No
- **Validation Constraints**:
  - **integer**: 
  - **min**: {"limit":1000}
  - **max**: {"limit":2024}
- **Error Messages**:
  - number.base: "Тип значения поля "Год первой публикации" должен быть числом ('number')"
  - number.integer: ""Год первой публикации" должен быть целым числом (integer)"
  - number.min: ""Год первой публикации" должен быть больше либо равен {#limit}"
  - number.max: ""Год первой публикации" должен быть меньше либо равен {#limit}"

### Field Name: `authorId`
- **Description**: N/A
- **Data Type**: number
- **Required**: Yes
- **Validation Constraints**:
  - **integer**: 
  - **min**: {"limit":1}
- **Error Messages**:
  - any.required: ""Автор" — обязательное поле"

### Field Name: `annotation`
- **Description**: N/A
- **Data Type**: string
- **Required**: No
- **Validation Constraints**:
- **Error Messages**:
  - string.base: "Значение поля annotation должно быть строкой"

### Field Name: `genres`
- **Description**: N/A
- **Data Type**: array
- **Required**: No
- **Validation Constraints**:

