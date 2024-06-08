const prisma = require('./prisma');

const usersService = {
  findUserById,
  findByUsername,
  save
};

module.exports = usersService;

async function findUserById(id) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    });
    return user;
  } catch (e) {
    let message = 'Ошибка в базе данных. Невозможно получить пользователя';
    if (e instanceof Error) {
      message += 'Error: ' + e.message;
    }
    throw new Error(message);
  }
}

async function findByUsername(username) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username
      }
    });
    return user;
  } catch (e) {
    let message = 'Ошибка в базе данных. Невозможно получить пользователя';
    if (e instanceof Error) {
      message += 'Error: ' + e.message;
    }
    throw new Error(message);
  }
}

async function save({ username }) {
  try {
    const user = await prisma.user.create({
      data: {
        username
      }
    });
    return user;
  } catch (e) {
    let message = 'Ошибка в базе данных. Невозможно содзать пользователя';
    if (e instanceof Error) {
      message += 'Error: ' + e.message;
    }
    throw new Error(message);
  }
}
