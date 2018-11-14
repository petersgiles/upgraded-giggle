var db = require('diskdb');

db.connect('./diskdb/commitments', [
  'commitments',
  'commitment-comments',
  'commitment-contacts',
  'commitment-commitment-contacts',
  'commitment-map-locations',
  'commitment-commitment-map-locations',
  'commitment-map-points',
  'commitment-commitment-map-points',
  'commitment-portfolios',
  'commitment-whoAnnouncedTypes',
  'commitment-announcementTypes',
  'commitment-commitmentTypes',
  'commitment-parties',
  'commitment-tags',
  'commitment-electorates',
  'commitment-commitment-portfolios',
  'commitment-commitment-electorates'
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
      let set = db['commitment-commitment-contacts'].find({ commitment: args.commitment })
      let found = set.map((f: any) => db['commitment-contacts'].findOne({ _id: f.contact })).map((c: any) => ({ ...c, id: c._id }))
      console.log('commitmentContacts => ', set, found)
      return found
    },
    commitmentMapPoints: (obj: any, args: any, context: any, info: any) => {
      // (commitment: ID!): [MapPoint]
      let set = db['commitment-commitment-map-points'].find({ commitment: args.commitment })
      let found = set.map((f: any) => db['commitment-map-points'].findOne({ _id: f.mapPoint })).map((c: any) => ({ ...c, id: c._id }))
      console.log('commitment MapPoints => ', set, found)
      return found

    },
    commitmentPortfolios: (obj: any, args: any, context: any, info: any) => {
      // (commitment: ID!): [MapPoint]
      let set = db['commitment-commitment-portfolios'].find({ commitment: args.commitment })
      let found = set.map((f: any) => db['commitment-portfolios'].findOne({ _id: f.portfolio })).map((c: any) => ({ ...c, id: c._id }))
      console.log('commitment Portfolios => ', set, found)
      return found

    },
    commitmentElectorates: (obj: any, args: any, context: any, info: any) => {
      // (commitment: ID!): [MapPoint]
      let set = db['commitment-commitment-electorates'].find({ commitment: args.commitment })
      let found = set.map((f: any) => db['commitment-electorates'].findOne({ id: f.electorate })).map((c: any) => ({ ...c }))
      console.log('commitment Locations => ', set, found)
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
      }

      if (!id) {

        const max = db.commitments.find().reduce((prev: any, current: any) => (Number(prev.id) > Number(current.id) ? prev : current))

        args.id = `${Number(max.id) + 1}`

        console.log('query =>', max.id, args.id);

      }

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
      var cc = db['commitment-commitment-contacts'].findOne({ _id: args.id });
      var result = db['commitment-commitment-contacts'].remove({ _id: args.id }, false);
      const c = db.commitments.findOne({ id: cc.commitment })
      console.log('deleteCommitmentContact =>', result, c)
      return c
    },
    storeCommitmentMapPoint: (_root: any, args: any) => {
      //(commitment: Int!, contact: Int!): Commitment,
      const data = { ...args };
      const ccc = db['commitment-commitment-map-points'].findOne(data)
      var saved = null
      if (ccc) {
        saved = db['commitment-commitment-map-points'].update({ _id: ccc._id }, data, { multi: false, upsert: true });
      } else {
        saved = db['commitment-commitment-map-points'].save([data]);
      }

      const c = db.commitments.findOne({ id: args.commitment })
      console.log('storeCommitmentMapPoint =>', saved, c)
      return c
    },
    deleteCommitmentMapPoint: (_root: any, args: any) => {
      var cc = db['commitment-commitment-map-points'].findOne({ _id: args.id });
      var result = db['commitment-commitment-map-points'].remove({ _id: args.id }, false);
      const c = db.commitments.findOne({ id: cc.commitment })
      console.log('deleteCommitmentContact =>', result, c)
      return c
    },
    storeCommitmentElectorate: (_root: any, args: any) => {
      //(commitment: Int!, contact: Int!): Commitment,
      const data = { ...args };
      const ccc = db['commitment-commitment-electorates'].findOne(data)
      var saved = null
      if (ccc) {
        saved = db['commitment-commitment-electorates'].update({ _id: ccc._id }, data, { multi: false, upsert: true });
      } else {
        saved = db['commitment-commitment-electorates'].save([data]);
      }

      const c = db.commitments.findOne({ id: args.commitment })
      console.log('storeCommitmentElectorates =>', saved, c)
      return c
    },
    deleteCommitmentElectorate: (_root: any, args: any) => {
      var cc = db['commitment-commitment-electorates'].findOne({ commitment: args.commitment, electorate: args.electorate });
      var result = db['commitment-commitment-electorates'].remove({ _id: cc._id }, false);
      const c = db.commitments.findOne({ id: cc.commitment })
      console.log('deleteCommitmentElectorates =>', result, c)
      return c
    },
    storeCommitmentPortfolio: (_root: any, args: any) => {
      //(commitment: Int!, contact: Int!): Commitment,
      const data = { ...args };
      const ccc = db['commitment-commitment-map-points'].findOne(data)
      var saved = null
      if (ccc) {
        saved = db['commitment-commitment-map-points'].update({ _id: ccc._id }, data, { multi: false, upsert: true });
      } else {
        saved = db['commitment-commitment-map-points'].save([data]);
      }

      const c = db.commitments.findOne({ id: args.commitment })
      console.log('storeCommitmentMapPoint =>', saved, c)
      return c
    },
    deleteCommitmentPortfolio: (_root: any, args: any) => {
      var cc = db['commitment-commitment-map-points'].findOne({ _id: args.id });
      var result = db['commitment-commitment-map-points'].remove({ _id: args.id }, false);
      const c = db.commitments.findOne({ id: cc.commitment })
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
    portfolios(commitment: any) {
      let set = db['commitment-commitment-portfolios'].find({ commitment: commitment.id })
      let found = set
        .map(
          (f: any) => ({
            ...db['commitment-portfolios'].findOne({ _id: f.portfolio }),
            ccid: f._id
          })
        )
        .map((c: any) => ({ ...c, id: c._id }))
      console.log('commitment => ', commitment, 'commitmentportfolios => ', set, 'found => ', found)
      return found
    },
    electorates(commitment: any) {

      let set = db['commitment-commitment-electorates'].find({ commitment: commitment.id })
      let found = set.map((electorate: any) => {
        return db['commitment-electorates'].findOne({ id: electorate.electorate })
      })

      console.log('commitment-electorates => ', set, 'found => ', found)
      return found
    },
    comments(commitment: any) {
      var found = db['commitment-comments'].find({ commitment: commitment.id })
      var comments = found.map((c: any) => ({ ...c, id: c._id }))
      return comments
    },
    contacts(commitment: any) {
      let commitmentcontacts = db['commitment-commitment-contacts'].find({ commitment: commitment.id })
      let found = commitmentcontacts
        .map(
          (f: any) => ({
            ...db['commitment-contacts'].findOne({ _id: f.contact }),
            ccid: f._id
          })
        )
        .map((c: any) => ({ ...c, id: c._id }))
      console.log('commitment => ', commitment, 'commitmentContacts => ', commitmentcontacts, 'found => ', found)
      return found
    },
    mapPoints(commitment: any) {
      let set = db['commitment-commitment-map-points'].find({ commitment: commitment.id })
      let found = set
        .map(
          (f: any) => ({
            ...db['commitment-map-points'].findOne({ _id: f.mapPoint }),
            ccid: f._id
          })
        )
        .map((c: any) => ({ ...c, id: c._id }))
      console.log('commitment => ', commitment, 'commitmentMapPoints => ', set, 'found => ', found)
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
      console.log('commitment-portfolios', { id: contact.portfolio }, found)
      return found
    }
  }

};