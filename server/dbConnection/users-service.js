const prisma = require('./prisma');
const { hash } = require('bcrypt');

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

async function save({ username, password, role }) {
  const passwordHash = await hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: {
        username,
        password: passwordHash,
        role
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
