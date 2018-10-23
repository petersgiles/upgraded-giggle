var db = require('diskdb');

db.connect('./diskdb', [
  'commitments', 
  'commitment-comments', 
  'commitment-contacts', 
  'commitment-portfolios', 
  'commitment-announcementTypes', 
  'commitment-commitmentTypes',
  'commitment-parties', 
  'commitment-tags', 
  'commitment-electorates'
]);

// A map of functions which return data for the schema.
export const resolvers = {
  Query: {
    commitments: () => db.commitments.find(),
    commitment: (obj: any, args: any, context: any, info: any) => db.commitments.findOne({ id: args.id }),
    parties: () => db['commitment-parties'].find(),
    portfolios: () => db['commitment-portfolios'].find(),
    announcementTypes: () => db['commitment-announcementTypes'].find(),
    commitmentTypes: () => db['commitment-commitmentTypes'].find(),
    contacts: () => db['commitment-contacts'].find(),
    comments: (obj: any, args: any, context: any, info: any) => {
      var found = db['commitment-comments'].find({ commitment: args.commitment })
      console.log('comments =>', found)
      var comments = found.map((c: any) => ({ ...c, id: c._id }))
      return comments
    },
    locations: () => db['commitment-electorates'].find(),
    tags: () => db['commitment-tags'].find(),
  },
  Mutation: {
    upsertCommitment: (_root: any, args: any) => {

      var id = args.id;

      var query = {
        id: id
      };

      var author = db['commitment-contacts'].find({ username: args.author })

      const data = { ...args, author: author };
      var updated = db.commitments.update(query, data, { multi: false, upsert: true });
      console.log('upsertCommitment =>', updated);

      return data;
    },

    addComment: (_root: any, args: any) => {
 
      const data = { ...args };
      var saved = db['commitment-comments'].save([data]);

      console.log('addComment =>', saved, data)
      return { ...data, id: data.commitment }
    },

    deleteComment: (_root: any, args: any) => {

      var query = {
        _id: args.id
      };

      db['commitment-comments'].remove(query, false);

      var result = { id: args.id, commitment: args.commitment }

      console.log('deleteComment =>', result)
      return result
    }
  },
  Commitment: {
    party(commitment: any) {
      return db['commitment-parties'].findOne({ id: commitment.party })
    },
    announcementType(commitment: any) {
      return db['commitment-announcementTypes'].findOne({ id: commitment.type })
    },
    commitmentType(commitment: any) {
      return db['commitment-commitmentTypes'].findOne({ id: commitment.type })
    },
    portfolio(commitment: any) {
      return db['commitment-portfolios'].findOne({ id: commitment.portfolio })
    },
    location(commitment: any) {
      return db['commitment-electorates'].findOne({ id: commitment.location })
    },
    comments(commitment: any) {
      var found = db['commitment-comments'].find({ commitment: commitment.id })
      var comments = found.map((c: any) => ({ ...c, id: c._id }))
      return comments
    },
    contacts(commitment: any) {
      var found = db['commitment-contacts'].find({ id: commitment.contacts })
      console.log('contacts =>', found)
      var contacts = found.map((c: any) => ({ ...c, id: c._id }))

      return contacts
    },
    tags(commitment: any) {
      var found = db['commitment-tags'].find({ id: commitment.tags })
      console.log('tags =>', found)
      var tags = found.map((c: any) => ({ ...c, id: c._id }))

      return tags
    }
  },
  Comment: {
    author(comment: any) {
      return db['commitment-contacts'].findOne({ username: comment.author })
    }
  }

};