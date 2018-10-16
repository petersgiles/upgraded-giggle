var db = require('diskdb');

db.connect('./diskdb', ['commitments', 'comments', 'contacts', 'portfolios', 'announcementTypes', 'parties', 'electorates']);

// A map of functions which return data for the schema.
export const resolvers = {
  Query: {
    commitments: () => db.commitments.find(),
    commitment: (_obj: any, args: any, _context: any, _info: any) => db.commitments.findOne({ id: args.id }),
    parties: () => db.parties.find(),
    portfolios: () => db.portfolios.find(),
    announcementTypes: () => db.announcementTypes.find(),
    contacts: () => db.contacts.find(),
    comments: () => {
      var found = db.comments.find();
      var comments = found.map((c: any) => ({ ...c, id: c._id }));
      return comments
    },
    locations: () => db.electorates.find(),
  },
  Mutation: {
    upsertCommitment: (_root: any, args: any) => {

      var id = args.id;

      var query = {
        id: id
      };

      var author = db.contacts.find({ username: args.author })

      const data = { ...args, author: author };
      var updated = db.commitments.update(query, data, { multi: false, upsert: true });
      console.log(updated);

      return data;
    },

    addComment: (_root: any, args: any) => {
 
      const data = { ...args };
      var saved = db.comments.save([data]);

      console.log('saved =>', saved, data)
      return { ...data, id: data.commitment }
    },

    deleteComment: (_root: any, args: any) => {

      var query = {
        _id: args.id
      };

      db.comments.remove(query, false);

      var result = { id: args.id, commitment: args.commitment }

      console.log('removed =>', result)
      return result
    }
  },
  Commitment: {
    party(commitment: any) {
      return db.parties.findOne({ id: commitment.party })
    },
    type(commitment: any) {
      return db.announcementTypes.findOne({ id: commitment.type })
    },
    portfolio(commitment: any) {
      return db.portfolios.findOne({ id: commitment.portfolio })
    },
    location(commitment: any) {
      return db.electorates.findOne({ id: commitment.location })
    },
    comments(commitment: any) {
      var found = db.comments.find({ commitment: commitment.id })
      console.log('comments =>', found)
      var comments = found.map((c: any) => ({ ...c, id: c._id }))

      return comments
    }
  },
  Comment: {
    author(comment: any) {
      return db.contacts.findOne({ username: comment.author })
    }
  }

};