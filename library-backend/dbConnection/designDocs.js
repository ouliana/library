const booksDesignDoc = {
  _id: '_design/book',
  views: {
    by_id: {
      map: 'function(doc){ emit(doc._id, {title: doc.title, published: doc.published, author: doc.author, genres: doc.genres, id: doc._id})}',
    },
    by_author: {
      map: 'function(doc){ emit(doc.author, {title: doc.title, published: doc.published, author: doc.author, genres: doc.genres, id: doc._id})}',
    },
    by_title: {
      map: 'function(doc){ emit(doc.title, {title: doc.title, published: doc.published, author: doc.author, genres: doc.genres, id: doc._id})}',
    },
  },
};

const authorsDesignDoc = {
  _id: '_design/author',
  views: {
    by_id: {
      map: 'function(doc){ emit(doc._id, {name: doc.name, born: doc.born, id: doc._id})}',
    },
    by_name: {
      map: 'function(doc){ emit(doc.name, {name: doc.name, born: doc.born, id: doc._id})}',
    },
  },
};

const usersDesignDoc = {
  _id: '_design/user',
  views: {
    by_id: {
      map: 'function(doc){ emit(doc._id, { username: doc.username, favoriteGenre: doc.favoriteGenre, id: doc._id})}',
    },
    by_username: {
      map: 'function(doc){ emit(doc.username, { username: doc.username, favoriteGenre: doc.favoriteGenre, id: doc._id})}',
    },
    details_by_id: {
      map: 'function(doc){ emit(doc._id, {id: doc._id, username: doc.username, passwordHash: doc.passwordHash})}',
    },
    details_by_username: {
      map: 'function(doc){ emit(doc.username, {id: doc._id, username: doc.username, passwordHash: doc.passwordHash})}',
    },
    id_by_username: {
      map: 'function(doc){ emit(doc.username, doc._id)}',
    },
  },
};

module.exports = {
  booksDesignDoc,
  authorsDesignDoc,
  usersDesignDoc,
};
