const genresService = {
  findAll,
  findAllBooks
};

module.exports = genresService;

async function findAll() {
  try {
    const genres = await prisma.genre.findMany({
      select: {
        id: true,
        name: true
      }
    });
    return genres;
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
