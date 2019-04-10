import { logger } from "../../shared/logger";

const arrayToHash = (array: any[], id: string = 'id') =>  (array || []).reduce((obj, item) =>  (obj[item[id]] = item , obj), {})

var db = require('diskdb');

db.connect('./diskdb/commitments', [
  'commitments',
  'commitment-comments',
  'commitment-contacts',
  'commitment-commitment-contacts',
  'commitment-map-locations',
  'commitment-commitment-map-locations',
  'commitment-map-points',
  'commitment-critical-dates',
  'commitment-commitment-map-points',
  'commitment-portfolios',
  'commitment-statuses',
  'commitment-whoAnnouncedTypes',
  'commitment-packageTypes',
  'commitment-announcementTypes',
  'commitment-commitmentTypes',
  'commitment-parties',
  'commitment-tags',
  'commitment-electorates',
  'commitment-commitment-portfolios',
  'commitment-commitment-packages',
  'commitment-commitment-electorates',
  'commitment-related-commitments',
  'commitment-related-links',
  'commitment-subscriptions',
  'commitment-commitment-actions',
  'commitment-group-permissions',
  'commitment-related-portfolios',
  'commitment-related-packages'
]);

const commitmentSubscriptionTable = 'commitment-subscriptions';
// A map of functions which return data for the schema.
export const resolvers = {
  Query: {
    commitmentSubscription: (obj: any, args: any, context: any, info: any) => {
      var criteria = { commitment: args.commitment, subscriber: args.user }
      let found = db["commitment-subscriptions"].find(criteria)
      return found
    },
    groupPermissions: () => {
      return db["commitment-group-permissions"].find().map((f: any) => ({ id: f._id, ...f }))
    },
    commitments: () => {
      return db.commitments.find()
    },
    commitment: (obj: any, args: any, context: any, info: any) => {
      let found = db.commitments.findOne({ id: args.id })
      return found
    },
    commitmentContacts: (obj: any, args: any, context: any, info: any) => {
      let set = db['commitment-commitment-contacts'].find({ commitment: args.commitment })
      let found = set.map((f: any) => db['commitment-contacts'].findOne({ _id: f.contact })).map((c: any) => ({ ...c, id: c._id }))
      return found
    },
    commitmentActions: (obj: any, args: any, context: any, info: any) => {
      let set = db['commitment-commitment-actions'].find({ commitment: args.commitment })
      let found = set.map((c: any) => ({ ...c, id: c._id }))
      logger.info('commitmentActions => ', found, args)

      return found
    },    
    commitmentMapPoints: (obj: any, args: any, context: any, info: any) => {

      let set = db['commitment-commitment-map-points'].find({ commitment: args.commitment })
      logger.info('commitment MapPoints => ', set)
      let found = set
        .map(
          (f: any) => {

            let mpfound = db['commitment-map-points'].findOne({ place_id: f.mapPoint })
            return {
              ...mpfound, id: mpfound._id
            }
          }
        )
      logger.info('commitment MapPoints found => ', found)
      // logger.info('commitment => ', commitment, 'commitmentMapPoints => ', set, 'found => ', found)
      return found
    },    
    mapPointCommitments: (obj: any, args: any, context: any, info: any) => {

      let set = db['commitment-commitment-map-points'].find({ mapPoint: args.mapPoint })
      logger.info('commitment MapPoints => ', set)
      let found = set
        .map(
          (f: any) => {

            let cfound = db['commitments'].findOne({ id: f.commitment })
            return {
              ...cfound
            }
          }
        )
      logger.info('MapPoint commitments => ', set, 'found => ', found)
      return found
    },
    commitmentPortfolios: (obj: any, args: any, context: any, info: any) => {
      // (commitment: ID!): [Portfolio]
      let set = db['commitment-commitment-portfolios'].find({ commitment: args.commitment })
      let found = set.map((f: any) => db['commitment-portfolios'].findOne({ id: f.portfolio }))
      return found

    },
    commitmentPackages: (obj: any, args: any, context: any, info: any) => {
      // (commitment: ID!): [packages]
      let set = db['commitment-commitment-packages'].find({ commitment: args.commitment })
      let found = set.map((f: any) => db['commitment-packageTypes'].findOne({ id: f.package }))
      return found

    },
    commitmentElectorates: (obj: any, args: any, context: any, info: any) => {
      let set = db['commitment-commitment-electorates'].find({ commitment: args.commitment })
      let found = set.map((f: any) => db['commitment-electorates'].findOne({ id: f.electorate })).map((c: any) => ({ ...c  }))
      return found

    },
    commitmentRelatedLinks: (obj: any, args: any, context: any, info: any) => {
      let found = db['commitment-related-links'].find({ commitment: args.commitment }).map((c: any) => ({ ...c, id: c._id }))
      return found
    },
    commitmentRelatedCommitments: (obj: any, args: any, context: any, info: any) => {
      let set = db['commitment-related-commitments'].find({ commitment: args.commitment })
      let found = set.map((f: any) => db['commitments'].findOne({ id: f.relatedTo })).map((c: any) => ({ ...c }))
      return found

    },
    parties: () => db['commitment-parties'].find(),
    portfolios: () =>  {
      return  db['commitment-portfolios'].find().filter((p: any) => (p.type || []))
     },
    statuses: () => db['commitment-statuses'].find(),
    announcementTypes: () => db['commitment-announcementTypes'].find(),
    packageTypes: () => db['commitment-packageTypes'].find(),
    criticalDates: () => db['commitment-critical-dates'].find(),
    commitmentTypes: () => db['commitment-commitmentTypes'].find(),
    whoAnnouncedTypes: () => db['commitment-whoAnnouncedTypes'].find(),
    allCommitmentMapPoints:() => {
      
      var mapPoints = arrayToHash(db['commitment-map-points'].find(), 'place_id')
      var commitments = arrayToHash(db['commitments'].find())
      logger.info('allCommitmentMapPoints', mapPoints, commitments)
      var found = db['commitment-commitment-map-points'].find().map((mp: any) =>({
        mapPoint: mapPoints[mp.mapPoint],
        commitment: commitments[mp.commitment],
      }))

      return found
    },
    contacts: () => {
      var contacts = db['commitment-contacts'].find().map((c: any) => ({ ...c, id: c._id }))
      return contacts
    },
    comments: (obj: any, args: any, context: any, info: any) => {
      var found = db['commitment-comments'].find({ commitment: args.commitment })
      var comments = found.map((c: any) => ({ ...c, id: c._id }))
      return comments
    },
    mapPoints: () => db['commitment-map-points'].find(),
    relatedCommitment: () => db['commitment-related-commitments'].find(),
    relatedLinks: () => {
      var found = db['commitment-related-links'].find().map((c: any) => ({ ...c, id: c._id }))
      return found
    },
    relatedPortfolios: () => db['commitment-related-portfolios'].find(),
    relatedPackages: () => db['commitment-related-packages'].find(),
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


      }

      var author = db['commitment-contacts'].find({ username: args.author })

      const data = { ...args, author: author };
      db.commitments.update(query, data, { multi: false, upsert: true });

      return data;
    },

    addComment: (_root: any, args: any) => {

      const data = { ...args };
      var saved = db['commitment-comments'].save([data]);

      return { ...data, id: data.commitment }
    },

    deleteComment: (_root: any, args: any) => {

      var query = {
        _id: args.id
      };

      const c = db['commitment-comments'].findOne(query)
      const result = { ...c, id: c._id }
      db['commitment-comments'].remove(query, false);

      return result
    },
    storeContact: (_root: any, args: any) => {
      const data = { ...args };
      var saved = db['commitment-contacts'].save(data);
      var result = { ...saved, id: saved._id }
      return result
    },
    deleteContact: (_root: any, args: any) => {
      //(id:  Int!): Contact,

      var query = {
        id: args.id
      };

      const c = db['commitment-contacts'].findOne(query)
      var result = db['commitment-contacts'].remove({ _id: c._id }, false);
      return { ...c }

    },
    storeCommitmentAction: (_root: any, args: any) => {
      //(commitment: Int!, contact: Int!): Commitment,
      const data = { ...args };
      const ccc = db['commitment-commitment-actions'].findOne({ commitment: args.commitment, _id: args.id })
      var saved = null
      if (ccc) {
        saved = db['commitment-commitment-actions'].update({ _id: ccc._id }, data, { multi: false, upsert: true });
      } else {
        saved = db['commitment-commitment-actions'].save([data]);
      }

      return db.commitments.findOne({ id: args.commitment })
    },
    deleteCommitmentAction: (_root: any, args: any) => {
      var cc = db['commitment-commitment-actions'].findOne({ commitment: args.commitment, _id: args.action });
      var result = db['commitment-commitment-actions'].remove({ _id: cc._id }, false);
      const c = db.commitments.findOne({ id: cc.commitment })
      logger.info('deleteCommitmentAction =>', result, c)
      return c
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

      return db.commitments.findOne({ id: args.commitment })
    },
    deleteCommitmentContact: (_root: any, args: any) => {
      var cc = db['commitment-commitment-contacts'].findOne({ commitment: args.commitment, contact: args.contact });
      var result = db['commitment-commitment-contacts'].remove({ _id: cc._id }, false);
      const c = db.commitments.findOne({ id: cc.commitment })
      logger.info('deleteCommitmentContact =>', result, c)
      return c
    },
    storeMapPoint: (_root: any, args: any) => {
      const data = { ...args };
      var saved = db['commitment-map-points'].save([data]);
      var result = { ...saved }
      return result
    },
    deleteMapPoint: (_root: any, args: any) => {

      var query = {
        place_id: args.place_id
      };

      const c = db['commitment-map-points'].findOne(query)
      db['commitment-map-points'].remove({ _id: c._id }, false);
      return { ...c }

    },
    storeRelatedCommitment: (_root: any, args: any) => {
      const data = { ...args };
      const ccc = db['commitment-related-commitments'].findOne(data)
      var saved = null
      if (ccc) {
        saved = db['commitment-related-commitments'].update({ _id: ccc._id }, data, { multi: false, upsert: true });
      } else {
        saved = db['commitment-related-commitments'].save([data]);
      }

      return db.commitments.findOne({ id: args.commitment })
    },
    storeRelatedLink: (_root: any, args: any) => {
      const data = { ...args };

      logger.info('storeRelatedLink', data)
      const ccc = db['commitment-related-links'].findOne(data)
      if (!ccc) {
        db['commitment-related-links'].save([data]);
      }
      return db.commitments.findOne({ id: args.commitment })
    },
    deleteRelatedLink: (_root: any, args: any) => {
      var cc = db['commitment-related-links'].findOne({ _id: args.id,  });
      db['commitment-related-links'].remove({ _id: cc._id }, false);
      return db.commitments.findOne({ id: cc.commitment })
    },
    deleteRelatedCommitment: (_root: any, args: any) => {
      var cc = db['commitment-related-commitments'].findOne({ commitment: args.commitment, relatedTo: args.relatedTo });
      db['commitment-related-commitments'].remove({ _id: cc._id }, false);
      return db.commitments.findOne({ id: cc.commitment })
    },
    storeCommitmentMapPoint: (_root: any, args: any) => {
      const data = { ...args };
      const found = db['commitment-commitment-map-points'].findOne(data)
      if (found) {
        db['commitment-commitment-map-points'].update({ _id: found._id }, data, { multi: false, upsert: true });
      } else {
        db['commitment-commitment-map-points'].save([data]);
      }

      return db.commitments.findOne({ id: args.commitment })
    },
    deleteCommitmentMapPoint: (_root: any, args: any) => {
      var cc = db['commitment-commitment-map-points'].findOne({ commitment: args.commitment, mapPoint: args.mapPoint });
      db['commitment-commitment-map-points'].remove({ _id: cc._id }, false);
      return db.commitments.findOne({ id: cc.commitment })
    },
    storeCommitmentElectorate: (_root: any, args: any) => {
      //(commitment: Int!, contact: Int!): Commitment,
      const data = { ...args };
      const found = db['commitment-commitment-electorates'].findOne(data)
      if (found) {
        db['commitment-commitment-electorates'].update({ _id: found._id }, data, { multi: false, upsert: true });
      } else {
        db['commitment-commitment-electorates'].save([data]);
      }

      return db.commitments.findOne({ id: args.commitment })
    },
    deleteCommitmentElectorate: (_root: any, args: any) => {
      var cc = db['commitment-commitment-electorates'].findOne({ commitment: args.commitment, electorate: args.electorate });
      db['commitment-commitment-electorates'].remove({ _id: cc._id }, false);
      return db.commitments.findOne({ id: cc.commitment })
    },
    storeCommitmentPortfolio: (_root: any, args: any) => {
      //(commitment: Int!, contact: Int!): Commitment,
      const data = { ...args };
      const found = db['commitment-commitment-portfolios'].findOne(data)
      if (found) {
        db['commitment-commitment-portfolios'].update({ _id: found._id }, data, { multi: false, upsert: true });
      } else {
        db['commitment-commitment-portfolios'].save([data]);
      }

      return db.commitments.findOne({ id: args.commitment })
    },
    deleteCommitmentPortfolio: (_root: any, args: any) => {
      var cc = db['commitment-commitment-portfolios'].findOne({ commitment: args.commitment, portfolio: args.portfolio });
      logger.info('deleteCommitmentPortfolio', cc, args)
      var result = db['commitment-commitment-portfolios'].remove({ _id: cc._id }, false);
      logger.info('deleteCommitmentPortfolio result', result)
      return db.commitments.findOne({ id: cc.commitment })
    },
    storeCommitmentPackage: (_root: any, args: any) => {
      //(commitment: Int!, contact: Int!): Commitment,
      const data = { ...args };
      const found = db['commitment-commitment-packages'].findOne(data)
      if (found) {
        db['commitment-commitment-packages'].update({ _id: found._id }, data, { multi: false, upsert: true });
      } else {
        db['commitment-commitment-packages'].save([data]);
      }

      const c = db.commitments.findOne({ id: args.commitment })
      return c
    },
    deleteCommitmentPackage: (_root: any, args: any) => {
      var cc = db['commitment-commitment-packages'].findOne({ commitment: args.commitment, pachage: args.package });
      db['commitment-commitment-packages'].remove({ _id: cc._id }, false);
      return db.commitments.findOne({ id: cc.commitment })
    },
    storeCommitmentSubscription: (_root: any, args: any) => {
      const data = { ...args, Title: `${args.commitment} - ${args.subscriber}` }
      const found = db[commitmentSubscriptionTable].findOne(data)

      if (found) {
        db[commitmentSubscriptionTable].update({ _id: found._id }, data, { multi: false, upsert: true })
      }
      else {
        db[commitmentSubscriptionTable].save([data])
      }
      return db.commitments.findOne({ id: args.commitment })
    },
    deleteCommitmentSubscription: (_root: any, args: any) => {
      const where = { commitment: args.commitment, subscriber: args.subscriber }
      return deleteCommitementRelatedEntity(commitmentSubscriptionTable, where);
    }

  },
  Commitment: {
    party(commitment: any) {
      return db['commitment-parties'].findOne({ id: commitment.party })
    },
    whoAnnouncedType(commitment: any) {
      let wat = db['commitment-whoAnnouncedTypes'].findOne({ id: commitment.whoAnnouncedType })
      return wat
    },
    announcementType(commitment: any) {
      return db['commitment-announcementTypes'].findOne({ id: commitment.announcementType })
    },
    packageType(commitment: any) {
      return db['commitment-packageTypes'].findOne({ id: commitment.packageType })
    },
    criticalDate(commitment: any) {
      return db['commitment-critical-dates'].findOne({ id: commitment.criticalDate })
    },
    commitmentType(commitment: any) {
      return db['commitment-commitmentTypes'].findOne({ id: commitment.commitmentType })
    },
    status(commitment: any) {
      return db['commitment-statuses'].findOne({ id: commitment.status })
    },
    portfolio(commitment: any) {
      let found = db['commitment-portfolios'].findOne({ id: commitment.portfolio })
      return found
    },
    electorates(commitment: any) {

      let set = db['commitment-commitment-electorates'].find({ commitment: commitment.id })
      let found = set.map((electorate: any) => {
        return db['commitment-electorates'].findOne({ id: electorate.electorate })
      })

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
      return found
    },
    mapPoints(commitment: any) {
      let set = db['commitment-commitment-map-points'].find({ commitment: commitment.id })
      let found = set
        .map(
          (f: any) => {

            let mpfound = db['commitment-map-points'].findOne({ place_id: f.mapPoint })
            return {
              ...mpfound, id: mpfound._id
            }
          }
        )
      logger.info('commitment MapPoints found => ', found)
      // logger.info('commitment => ', commitment, 'commitmentMapPoints => ', set, 'found => ', found)
      return found
    },
    tags(commitment: any) {
      var found = db['commitment-tags'].find({ id: commitment.tags })
      if (found.length) {
        // logger.info('tags =>', found) 
      }
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
      // logger.info('commitment-portfolios', { id: contact.portfolio }, found)
      return found
    }
  },
  CommitmentAction: {
    portfolio(action: any) {
      let found = db['commitment-portfolios'].findOne({ id: action.portfolio })
      // logger.info('commitment-portfolios', { id: contact.portfolio }, found)
      return found
    }
  }

};

function deleteCommitementRelatedEntity(tableName: string, where: any) {
  var found = db[tableName].findOne(where);
  if (found) {
    var result = db[tableName].remove({ _id: found._id }, false);
  }
  return db.commitments.findOne({ id: where.commitment });
}
