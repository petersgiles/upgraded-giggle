var db = require('diskdb');

db.connect('./diskdb', [
  'commitments', 
  'commitment-comments', 
  'commitment-contacts', 
  'commitment-portfolios', 
  'commitment-whoAnnouncedTypes',
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
    whoAnnouncedTypes: () => db['commitment-whoAnnouncedTypes'].find(),
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

      const c = db['commitment-comments'].findOne(query)
      const result = { ...c, id: c._id }
      db['commitment-comments'].remove(query, false);

      console.log('deleteComment =>', result)
      return result
    }
  },
  Commitment: {
    party(commitment: any) {
      return db['commitment-parties'].findOne({ id: commitment.party })
    },
    whoAnnouncedType(commitment: any) {
      return db['commitment-whoAnnouncedTypes'].findOne({ id: commitment.whoAnnouncedType })
    },
    announcementType(commitment: any) {
      return db['commitment-announcementTypes'].findOne({ id: commitment.announcementType })
    },
    commitmentType(commitment: any) {
      return db['commitment-commitmentTypes'].findOne({ id: commitment.commitmentType })
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
      if(found.length) { console.log('contacts =>', found) }
      var contacts = found.map((c: any) => ({ ...c, id: c._id }))

      return contacts
    },
    tags(commitment: any) {
      var found = db['commitment-tags'].find({ id: commitment.tags })
      if(found.length) { console.log('tags =>', found) }
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