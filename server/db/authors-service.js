const prisma = require('./prisma');

const authorsService = {
  findAll,
  findByName,
  findById,
  save
};

module.exports = authorsService;

async function findAll() {
  try {
    const authorsWithCount = await prisma.author.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        born: true,
        _count: {
          select: { books: true }
        }
      },
      orderBy: {
        lastName: 'asc'
      }
    });
    const authorWithBookCount = authorsWithCount.map(author => {
      const result = {
        ...author,
        bookCount: author._count.books
      };
      delete result._count;
      return result;
    });
    return authorWithBookCount;
  } catch (e) {
    let message = 'Ошибка в базе данных. Невозможно получить список авторов';
    if (e instanceof Error) {
      message += 'Error: ' + e.message;
    }
    throw new Error(message);
  }
}

async function findById(id) {
  try {
    const author = await prisma.author.findUnique({
      where: {
        id
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

async function save(args) {
  console.log(args);
  const {
    firstName,
    lastName,
    born,
    profile,
    creditText,
    creditLink,
    annotation
  } = args;

  try {
    const createdAuthor = await prisma.author.create({
      data: {
        firstName,
        lastName,
        born,
        profile,
        creditText,
        creditLink,
        annotation
      }
    });
    return createdAuthor;
  } catch (error) {
    let message = 'Ошибка в базе данных. Не удалось создать автора';
    if (e instanceof Error) {
      message += 'Error: ' + e.message;
    }
    throw new Error(message);
  }
}
