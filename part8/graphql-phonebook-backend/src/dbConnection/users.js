const config = require('../utils/config');
const nano = require('nano')(config.DB_HOST_AUTH);
const { usersDesignDoc } = require('./designDocs');

module.exports = (async function () {
  const dbName = config.DB_USERS;

  const dbList = await nano.db.list();

  try {
    if (!dbList.includes(dbName)) {
      // create a new DB if database doesn't exist.
      await nano.db.create(dbName);
      const db = nano.use(dbName);
      console.log(`database ${dbName} created successfully`);

      const { users } = require('./data');

      await db.insert(usersDesignDoc, '_design/user');
      await db.bulk({ docs: users });

      return db;
    } else {
      const db = nano.use(dbName);
      console.log(`connected to database ${dbName} successfully`);
      return db;
    }
  } catch (err) {
    throw new Error(err);
  }
})();
