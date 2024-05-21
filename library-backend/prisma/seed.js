const { PrismaClient } = require('@prisma/client');
// import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // await prisma.book.create({
  //   data: {
  //     title: 'Clean Code',
  //     published: 2008,
  //     author: {
  //       connect: {
  //         id: 1
  //       }
  //     },
  //     genres: {
  //       connect: [{ id: 1 }]
  //     }
  //   }
  // });

  // await prisma.book.create({
  //   data: {
  //     title: 'Agile software development',
  //     published: 2002,
  //     author: {
  //       connect: {
  //         id: 2
  //       }
  //     },
  //     genres: {
  //       connect: [{ id: 2 }, { id: 3 }, { id: 4 }]
  //     }
  //   }
  // });

  // await prisma.book.create({
  //   data: {
  //     title: 'Agile software development',
  //     published: 2002,
  //     author: {
  //       connect: {
  //         id: 1
  //       }
  //     },
  //     genres: {
  //       connect: [{ id: 1 }]
  //     }
  //   }
  // });

  // await prisma.book.create({
  //   data: {
  //     title: 'Refactoring, edition 2',
  //     published: 2018,
  //     author: {
  //       connect: {
  //         id: 2
  //       }
  //     },
  //     genres: {
  //       connect: [{ id: 1 }]
  //     }
  //   }
  // });

  // await prisma.book.create({
  //   data: {
  //     title: 'Refactoring to patterns',
  //     published: 2008,
  //     author: {
  //       connect: {
  //         id: 3
  //       }
  //     },
  //     genres: {
  //       connect: [{ id: 1 }, { id: 3 }]
  //     }
  //   }
  // });

  await prisma.book.create({
    data: {
      title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
      published: 2012,
      author: {
        connect: {
          id: 4
        }
      },
      genres: {
        connect: [{ id: 1 }, { id: 4 }]
      }
    }
  });
  await prisma.book.create({
    data: {
      title: 'Преступление и наказание',
      published: 1866,
      author: {
        connect: {
          id: 5
        }
      },
      genres: {
        connect: [{ id: 5 }, { id: 6 }]
      }
    }
  });
  await prisma.book.create({
    data: {
      title: 'Бесы',
      published: 1872,
      author: {
        connect: {
          id: 5
        }
      },
      genres: {
        connect: [{ id: 5 }, { id: 7 }]
      }
    }
  });
  await prisma.book.create({
    data: {
      title: 'Project Hail Mary',
      published: 2021,
      author: {
        connect: {
          id: 6
        }
      },
      genres: {
        connect: [{ id: 8 }]
      }
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    await prisma.$disconnect();
    process.exit(1);
    throw new Error(e);
  });
