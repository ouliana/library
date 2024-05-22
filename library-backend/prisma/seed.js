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
