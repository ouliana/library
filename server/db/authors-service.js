const prisma = require('./prisma');

const authorsService = {
  findAll,
  findByName,
  findById,
  save,
  update
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

async function findByName({ firstName, lastName }) {
  try {
    const author = await prisma.author.findFirst({
      where: {
        firstName,
        lastName
      },
      select: {
        id: true
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

async function update(args) {
  const {
    id,
    firstName,
    lastName,
    born,
    profile,
    creditText,
    creditLink,
    annotation
  } = args;

  try {
    const updatedAuthor = await prisma.author.update({
      where: {
        id
      },
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
    return updatedAuthor;
  } catch (error) {
    let message = 'Ошибка в базе данных. Не удалось создать автора';
    if (e instanceof Error) {
      message += 'Error: ' + e.message;
    }
    throw new Error(message);
  }
}
