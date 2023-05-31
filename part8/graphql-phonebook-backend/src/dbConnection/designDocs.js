const personsDesignDoc = {
  _id: '_design/person',
  views: {
    by_id: {
      map: 'function(doc){ emit(doc._id, { name:doc.name, phone: doc.phone, street: doc.street, city: doc.city, id: doc._id})}',
    },
    by_name: {
      map: 'function(doc){ emit(doc.name, { name:doc.name, phone: doc.phone, street: doc.street, city: doc.city, id: doc._id})}',
    },
    id_by_name: {
      map: 'function(doc){ emit(doc.name, doc._id)}',
    },
  },
  updates: {
    inplace:
      'function(doc, req) { var body=JSON.parse(req.body); var field = body.field; var value = body.value; doc[field] = value; return [doc, JSON.stringify(doc)]}',
  },
};

const usersDesignDoc = {
  _id: '_design/user',
  views: {
    by_id: {
      map: 'function(doc){ emit(doc._id, { username: doc.username, friends: doc.frends, id: doc._id})}',
    },
    details_by_id: {
      map: 'function(doc){ emit(doc._id, {id: doc._id, username: doc.username, friends: doc.friends, passwordHash: doc.passwordHash})}',
    },
    details_by_username: {
      map: 'function(doc){ emit(doc.username, {id: doc._id, username: doc.username, friends: doc.friends, passwordHash: doc.passwordHash})}',
    },
    id_by_username: {
      map: 'function(doc){ emit(doc.username, doc._id)}',
    },
  },
  updates: {
    inplace:
      'function(doc, req) { var body=JSON.parse(req.body); var field = body.field; var value = body.value; doc[field] = value; return [doc, JSON.stringify(doc)]}',
  },
};

module.exports = {
  personsDesignDoc,
  usersDesignDoc,
};
