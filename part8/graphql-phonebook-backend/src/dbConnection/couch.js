const config = require('../utils/config');
const nano = require('nano')(config.DB_HOST_AUTH);

module.exports = (async function () {
  const dbName = config.DB_NAME;

  const dbList = await nano.db.list();

  try {
    if (!dbList.includes(dbName)) {
      // create a new DB if database doesn't exist.
      await nano.db.create(dbName);
      const db = nano.use(dbName);
      console.log('database created successfully');

      const persons = require('../utils/persons');
      const personsDesignDoc = {
        _id: '_design/person',
        views: {
          by_id: {
            map: 'function(doc){ emit(doc._id, { name:doc.name, phone: doc.phone, street: doc.street, city: doc.city, id: doc._id})}',
          },
        },
        updates: {
          inplace:
            'function(doc, req) { var body=JSON.parse(req.body); var field = body.field; var value = body.value; doc[field] = value; return [doc, JSON.stringify(doc)]}',
        },
      };
      await db.insert(personsDesignDoc, '_design/person');
      await db.bulk({ docs: persons });

      return db;
    } else {
      const db = nano.use(dbName);
      console.log('connected to database successfully');
      return db;
    }
  } catch (err) {
    throw new Error(err);
  }
})();
