var db = require('diskdb');

db.connect('./diskdb', ['artifact', 'case', 'activity' ]);

// A map of functions which return data for the schema.
export const resolvers = {
  Query: {

  },
  Mutation: {
   
  }
};