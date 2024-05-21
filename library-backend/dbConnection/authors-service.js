const prisma = require('./prisma');

const authorsService = {
  findAll,
  findByName,
  save
};

module.exports = authorsService;

async function findAll() {
  try {
    const authors = await prisma.author.findMany();
    return authors;
  } catch (e) {
    let message = 'Ошибка в базе данных. Невозможно получить список авторов';
    if (e instanceof Error) {
      message += 'Error: ' + e.message;
    }
    throw new Error(message);
  }
}

async function getCount() {
  try {
    const count = await prisma.author.count();
    return count;
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
