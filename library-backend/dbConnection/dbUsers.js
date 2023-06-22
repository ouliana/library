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
      console.log(`database ${dbName} created successfully`);

      const db = nano.use(dbName);
      await db.insert(usersDesignDoc, '_design/user');

      return db;
    } else {
      const db = nano.use(dbName);
      console.log(`connected to database ${dbName} successfully`);
      return db;
    }
  } catch (error) {
    throw new Error(error);
  }
})();
