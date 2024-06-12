const genresService = {
  findAll,
  findAllBooks
};

module.exports = genresService;

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
async function findAllBooks(id) {
  try {
    const genre = await prisma.genre.findUnique({
      where: {
        id
      },
      select: {
        name: true,
        books: {
          select: {
            id: true,
            title: true,
            authorId: true,
            published: true,
            author: {
              select: {
                firstName: true,
                lastName: true
              }
            }
          }
        }
      }
    });

    return genre;
  } catch (e) {
    let message = 'Ошибка в базе данных. Невозможно получить книгу';
    if (e instanceof Error) {
      message += 'Error: ' + e.message;
    }
    throw new Error(message);
  }
}
