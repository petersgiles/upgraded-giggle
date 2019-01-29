var db = require('diskdb');

var DB_DECK_ARTIFACT = 'deck-artifact'

db.connect('./diskdb/deck', [DB_DECK_ARTIFACT]);

// A map of functions which return data for the schema.
export const resolvers = {
  Query: {
    artifacts: () => db[DB_DECK_ARTIFACT].find(),
  },
  Mutation: {
    storeArtifact: (_root: any, args: any) => {
      const data = { ...args };
      db[DB_DECK_ARTIFACT].save([data]);
      return db[DB_DECK_ARTIFACT].find()
    },
    removeArtifact: (_root: any, args: any) => {

      var query = {
        _id: args.id
      };
      db[DB_DECK_ARTIFACT].remove(query, false);

      return db[DB_DECK_ARTIFACT].find()
    },
  }
};