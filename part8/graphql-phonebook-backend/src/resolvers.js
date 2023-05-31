const couch = require('./dbConnection/couch');

let persons;

const resolvers = {
  Query: {
    personCount: async () => {
      const response = await (await couch).view('person', 'by_id');
      return response.rows.length;
    },
    allPersons: async (root, args) => {
      const response = await (await couch).view('person', 'by_id');
      const persons = response.rows.map(r => r.value);
      console.log({ persons });

      if (!args.phone) {
        return persons;
      }
      const byPhone = person =>
        args.phone === 'YES' ? person.phone : !person.phone;
      return persons.filter(byPhone);
    },
    findPerson: async (root, args) => {
      const response = await (
        await couch
      ).view('person', 'by_name', { key: args.name });
      return response.rows[0].value;
    },
  },
  Person: {
    address: ({ street, city }) => {
      return {
        street,
        city,
      };
    },
  },
  Mutation: {
    addPerson: async (root, args) => {
      var response = await (
        await couch
      ).view('person', 'by_name', { key: args.name });

      if (response.rows.length) {
        throw new GraphQLError('Name must be unique', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
          },
        });
      }
      const person = { ...args };
      try {
        response = await (await couch).insert(person);
      } catch (error) {
        throw new GraphQLError('Saving person failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        });
      }

      const savedPerson = await (
        await couch
      ).view('person', 'by_id', {
        key: response.id,
      });

      return savedPerson.rows[0].value;
    },
    editNumber: async (root, args) => {
      const id = await (
        await couch
      ).view('person', 'id_by_name', { key: args.name });

      if (!id.rows.length) {
        return null;
      }

      const doc = await (await couch).get(id.rows[0].value);
      const personToUpdate = { ...doc, phone: args.phone };

      try {
        var response = await (await couch).insert(personToUpdate);
      } catch (error) {
        throw new GraphQLError('Saving person failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        });
      }

      const updatedPerson = await (
        await couch
      ).view('person', 'by_id', {
        key: response.id,
      });

      return updatedPerson.rows[0].value;
    },
  },
};

module.exports = resolvers;
