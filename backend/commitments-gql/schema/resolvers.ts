var db = require('diskdb');

db.connect('./diskdb', [
  'commitments',
  'commitment-comments',
  'commitment-contacts',
  'commitment-commitment-contacts',
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
    commitment: (obj: any, args: any, context: any, info: any) => {
      let found = db.commitments.findOne({ id: args.id })
      console.log("commitment => ", found)
      return found
    },
    commitmentContacts: (obj: any, args: any, context: any, info: any) => {
      let commitmentcontacts = db['commitment-commitment-contacts'].find({ commitment: args.commitment })
      let found = commitmentcontacts.map((f: any) => db['commitment-contacts'].findOne({ _id: f.contact })).map((c: any) => ({...c, id: c._id}))
      console.log('commitmentContacts => ', commitmentcontacts, found)
      return found
    },
    parties: () => db['commitment-parties'].find(),
    portfolios: () => db['commitment-portfolios'].find(),
    announcementTypes: () => db['commitment-announcementTypes'].find(),
    commitmentTypes: () => db['commitment-commitmentTypes'].find(),
    whoAnnouncedTypes: () => db['commitment-whoAnnouncedTypes'].find(),
    contacts: () => {
      var contacts = db['commitment-contacts'].find().map((c: any) => ({ ...c, id: c._id }))
      console.log('contacts =>', contacts)
      return contacts
    },
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
      console.log('upsertCommitment =>', updated, data);

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
    },
    storeContact: (_root: any, args: any) => {
      // id:  Int!, name: String  username: String email: String  phone: String, portfolio: Int)
      const data = { ...args };
      var saved = db['commitment-contacts'].save(data);
      var result = { ...saved, id: saved._id }
      console.log('storeContact =>', result, data)
      return result
    },
    deleteContact: (_root: any, args: any) => {
      //(id:  Int!): Contact,

      var query = {
        id: args.id
      };

      const c = db['commitment-contacts'].findOne(query)
      var result = db['commitment-contacts'].remove({ _id: c._id }, false);
      console.log('deleteContact =>', result)
      return { ...c }

    },
    storeCommitmentContact: (_root: any, args: any) => {
      //(commitment: Int!, contact: Int!): Commitment,
      const data = { ...args };
      const ccc = db['commitment-commitment-contacts'].findOne(data)
      var saved = null
      if (ccc) {
        saved = db['commitment-commitment-contacts'].update({ _id: ccc._id }, data, { multi: false, upsert: true });
      } else {
        saved = db['commitment-commitment-contacts'].save([data]);
      }

      const c = db.commitments.findOne({ id: args.commitment })
      console.log('storeCommitmentContact =>', saved, c)
      return c
    },
    deleteCommitmentContact: (_root: any, args: any) => {
      //(commitment: Int!, contact: Int!): Commitment,
      const cc = db['commitment-commitment-contacts'].findOne({ ...args })
      var result = db['commitment-commitment-contacts'].remove({ _id: cc._id }, false);
      const c = db.commitments.findOne({ id: args.commitment })
      console.log('deleteCommitmentContact =>', result, c)
      return c
    }

  },
  Commitment: {
    party(commitment: any) {
      return db['commitment-parties'].findOne({ id: commitment.party })
    },
    whoAnnouncedType(commitment: any) {
      let wat = db['commitment-whoAnnouncedTypes'].findOne({ id: commitment.whoAnnouncedType })
      console.log('whoAnnouncedType =>', wat)
      return wat
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
      let commitmentcontacts = db['commitment-commitment-contacts'].find({ commitment: commitment })
      let found = commitmentcontacts.map((f: any) => db['commitment-contacts'].findOne({ _id: f.contact })).map((c: any) => ({...c, id: c._id}))
      console.log('commitmentContacts => ', commitmentcontacts, found)
      return found
    },
    tags(commitment: any) {
      var found = db['commitment-tags'].find({ id: commitment.tags })
      if (found.length) { console.log('tags =>', found) }
      var tags = found.map((c: any) => ({ ...c, id: c._id }))

      return tags
    }
  },
  Comment: {
    author(comment: any) {
      return db['commitment-contacts'].findOne({ username: comment.author })
    }
  },
  Contact: {
    portfolio(contact: any) {
      let found = db['commitment-portfolios'].findOne({ id: contact.portfolio })
      console.log('commitment-portfolios', { id: contact.portfolio }, found )
      return found
    }
  }

};