var db = require('diskdb');

db.connect('./diskdb', ['todo-artifact', 'todo-case', 'todo-activity' ]);

// A map of functions which return data for the schema.
export const resolvers = {
  Query: {
    artifacts: () => db['todo-artifact'].find(),
  },
  // Mutation: {
   
  // }
};