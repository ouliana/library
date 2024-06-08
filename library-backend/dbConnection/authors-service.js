const prisma = require('./prisma');

const authorsService = {
  findAll,
  findByName,
  save
};

module.exports = authorsService;

async function findAll() {
  await new Promise(resolve => setTimeout(resolve, 3000));

  try {
    const authorsWithCount = await prisma.author.findMany({
      include: {
        _count: {
          select: { books: true }
        }
      }
    });
    const authorWithBookCOunt = authorsWithCount.map(author => {
      const result = {
        ...author,
        bookCount: author._count.books
      };
      delete result._count;
      return result;
    });
    return authorWithBookCOunt;
  } catch (e) {
    let message = 'Ошибка в базе данных. Невозможно получить список авторов';
    if (e instanceof Error) {
      message += 'Error: ' + e.message;
    }
    throw new Error(message);
  }
}

async function findByName(name) {
  try {
    const author = await prisma.author.findFirst({
      where: {
        name
      }
    });
    return author;
  } catch (e) {
    let message = 'Ошибка в базе данных. Невозможно получить автора';
    if (e instanceof Error) {
      message += 'Error: ' + e.message;
    }
    throw new Error(message);
  }
}

async function save(author) {
  // const db = await dbAuthors;
  // const response = await db.insert(author);
  // const savedAuthor = await db.view('author', 'by_id', { key: response.id });
  // return savedAuthor.rows[0].value;
}

// async function populate(author) {
//   const dbBooks = require('./dbBooks');

//   // const count = response.rows.map(r => r.value);

//   const response = await (
//     await dbBooks
//   ).view('book', 'book_count_by_author', { key: author.name });

//   return { ...author, bookCount: response.rows.length };
// }
