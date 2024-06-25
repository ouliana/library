const booksService = {
  findAll,
  findById,
  findByAuthorId,
  findByTitle,
  findByGenres,
  save
};

module.exports = booksService;

async function findAll() {
  try {
    const books = await prisma.book.findMany({
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true
          }
        },
        genres: true
      }
    });
    return books;
  } catch (e) {
    let message = 'Ошибка в базе данных. Невозможно получить список книг';
    if (e instanceof Error) {
      message += 'Error: ' + e.message;
    }
    throw new Error(message);
  }
}
async function findByGenres(genres) {
  try {
    const books = await prisma.book.findMany({
      where: {
        genres: {
          some: {
            id: {
              in: genres
            }
          }
        }
      },
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true
          }
        },
        genres: true
      }
    });
    console.log(books);
    return books;
  } catch (e) {
    let message = 'Ошибка в базе данных. Невозможно получить список книг';
    if (e instanceof Error) {
      message += 'Error: ' + e.message;
    }
    throw new Error(message);
  }
}

async function findById(id) {
  try {
    const book = await prisma.book.findUnique({
      where: {
        id
      },
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true
          }
        },
        genres: true
      }
    });
    return book;
  } catch (e) {
    let message = 'Ошибка в базе данных. Невозможно получить книгу';
    if (e instanceof Error) {
      message += 'Error: ' + e.message;
    }
    throw new Error(message);
  }
}

async function findByAuthorId(authorId) {
  try {
    const books = await prisma.book.findMany({
      where: {
        authorId
      },
      select: {
        id: true,
        title: true
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
