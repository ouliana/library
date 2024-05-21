const booksService = {
  findAll,
  findByAuthor,
  findByTitle,
  save
};

module.exports = booksService;

async function findAll() {
  try {
    const books = await prisma.book.findMany();
    return books;
  } catch (e) {
    let message = 'Ошибка в базе данных. Невозможно получить список книг';
    if (e instanceof Error) {
      message += 'Error: ' + e.message;
    }
    throw new Error(message);
  }
}

async function findByAuthor(author) {
  try {
    const books = await prisma.book.findMany({
      where: {
        author
      }
    });
    return books;
  } catch (e) {
    let message = 'Ошибка в базе данных. Невозможно получить книгу';
    if (e instanceof Error) {
      message += 'Error: ' + e.message;
    }
    throw new Error(message);
  }
}

async function findByTitle(title) {
  try {
    const books = await prisma.book.findMany({
      where: {
        title
      }
    });
    return books;
  } catch (e) {
    let message = 'Ошибка в базе данных. Невозможно получить книгу';
    if (e instanceof Error) {
      message += 'Error: ' + e.message;
    }
    throw new Error(message);
  }
}

async function save(book) {
  // const db = await dbBooks;
  // const response = await db.insert(book);
  // const savedBook = await db.view('book', 'by_id', { key: response.id });
  // return savedBook.rows[0].value;
}
