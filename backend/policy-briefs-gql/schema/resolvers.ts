var db = require('diskdb');

db.connect('./diskdb', ['brief-artifact', 'brief-case', 'brief-activity' ]);

// A map of functions which return data for the schema.
export const resolvers = {
  Query: {
    artifacts: () => db['brief-artifact'].find(),
  },
  // Mutation: {
   
  // }
};