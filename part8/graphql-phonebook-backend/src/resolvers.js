const jwt = require('jsonwebtoken');
const { PubSub } = require('graphql-subscriptions');

const personService = require('./dbConnection/person-service');
const userService = require('./dbConnection/user-service');
const { GraphQLError } = require('graphql');

const pubsub = new PubSub();

let persons;

const resolvers = {
  Query: {
    personCount: async () => {
      const persons = await personService.findAll();
      return persons;
    },
    allPersons: async (root, args) => {
      const persons = await personService.findAll();

      if (!args.phone) {
        return persons;
      }
      const byPhone = person =>
        args.phone === 'YES' ? person.phone : !person.phone;
      return persons.filter(byPhone);
    },
    findPerson: async (root, args) => {
      const person = personService.findByName(args.name);
      return person;
    },
    me: (root, args, context) => {
      return context.currentUser;
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
    addPerson: async (root, args, context) => {
      const personToCheck = await personService.findByName(args.name);

      if (personToCheck) {
        throw new GraphQLError('Name must be unique', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
          },
        });
      }
      const person = { ...args };
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      try {
        var response = await personService.save(person);

        await userService.updateFriends(currentUser.id, response.id);
        currentUser.friends = currentUser.friends.concat(person);
      } catch (error) {
        throw new GraphQLError(`${error.message}`, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        });
      }

      const savedPerson = await personService.findById(response.id);

      pubsub.publish('PERSON_ADDED', { personAdded: person });

      return savedPerson;
    },
    addAsFriend: async (root, args, { currentUser }) => {
      const isFriend = person =>
        currentUser.friends.map(f => f.id).includes(person.id);

      if (!currentUser) {
        throw new GraphQLError('wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' },
        });
      }

      const person = await personService.findByName(args.name);
      if (!isFriend(person)) {
        await personService.updateFriends(currentUser.id, person.id);
        currentUser.friends = currentUser.friends.concat(person);
      }

      return currentUser;
    },

    editNumber: async (root, args) => {
      const id = await personService.findIdByName(args.name);

      if (!id) {
        return null;
      }

      const doc = await personService.findDocById(id);
      const personToUpdate = { ...doc, phone: args.phone };

      try {
        var response = await personService.save(personToUpdate);
      } catch (error) {
        throw new GraphQLError('Saving person failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        });
      }

      const updatedPerson = await personService.findById(response.id);

      return updatedPerson;
    },

    createUser: async (root, args) => {
      var response = await userService.findByUsername(args.username);

      if (response) {
        throw new GraphQLError(`User ${args.username} already exists`, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
          },
        });
      }
      const user = { ...args, friends: [] };
      try {
        response = await userService.save(user);
      } catch (error) {
        throw new GraphQLError('Saving user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error,
          },
        });
      }
    },

    login: async (root, args) => {
      const user = await userService.findByUsername(args.username);

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user.id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },

  Subscription: {
    personAdded: {
      subscribe: () => pubsub.asyncIterator('PERSON_ADDED'),
    },
  },
};

module.exports = resolvers;
