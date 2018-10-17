var db = require('diskdb');

db.connect('./diskdb', [
  'commitment-artifact', 
  'commitment-comments', 
  'commitment-contacts', 
  'commitment-portfolios', 
  'commitment-announcementTypes', 
  'commitment-parties', 
  'commitment-electorates'
]);

// A map of functions which return data for the schema.
export const resolvers = {
  Query: {
    commitments: () => db['commitment-artifact'].find(),
    commitment: (_obj: any, args: any, _context: any, _info: any) => db['commitment-comments'].findOne({ id: args.id }),
    parties: () => db['commitment-parties'].find(),
    portfolios: () => db['commitment-portfolios'].find(),
    announcementTypes: () => db['commitment-announcementTypes'].find(),
    contacts: () => db['commitment-contacts'].find(),
    comments: () => {
      var found = db['commitment-comments'].find();
      var comments = found.map((c: any) => ({ ...c, id: c._id }));
      return comments
    },
    locations: () => db['commitment-electorates'].find(),
  },
  Mutation: {
    upsertCommitment: (_root: any, args: any) => {

      var id = args.id;

      var query = {
        id: id
      };

      var author = db['commitment-contacts'].find({ username: args.author })

      const data = { ...args, author: author };
      var updated = db['commitment-artifact'].update(query, data, { multi: false, upsert: true });
      console.log(updated);

      return data;
    },

    addComment: (_root: any, args: any) => {
 
      const data = { ...args };
      var saved = db['commitment-comments'].save([data]);

      console.log('saved =>', saved, data)
      return { ...data, id: data.commitment }
    },

    deleteComment: (_root: any, args: any) => {

      var query = {
        _id: args.id
      };

      db['commitment-comments'].remove(query, false);

      var result = { id: args.id, commitment: args.commitment }

      console.log('removed =>', result)
      return result
    }
  },
  Commitment: {
    party(commitment: any) {
      return db['commitment-parties'].findOne({ id: commitment.party })
    },
    type(commitment: any) {
      return db['commitment-announcementTypes'].findOne({ id: commitment.type })
    },
    portfolio(commitment: any) {
      return db['commitment-portfolios'].findOne({ id: commitment.portfolio })
    },
    location(commitment: any) {
      return db['commitment-electorates'].findOne({ id: commitment.location })
    },
    comments(commitment: any) {
      var found = db['commitment-comments'].find({ commitment: commitment.id })
      console.log('comments =>', found)
      var comments = found.map((c: any) => ({ ...c, id: c._id }))

      return comments
    }
  },
  Comment: {
    author(comment: any) {
      return db['commitment-contacts'].findOne({ username: comment.author })
    }
  }

};