var db = require('diskdb');

var DB_DECK_USER = 'deck-user'
var DB_DECK_CARD = 'deck-card'

db.connect('./diskdb/deck', [DB_DECK_CARD]);

var mapId = (item :any) => {
  if(item) {
    return ({ id: item._id, ...item})
  }
}

var mapIds = (items :any[]) => {
  if(items) {
    return items.map(mapId)
  }
}

// A map of functions which return data for the schema.
export const resolvers = {
  Query: {
    userProfile: (obj: any, args: any, context: any, info: any) => {
      const found = db[DB_DECK_USER].findOne({ id: args.id })
      return mapId(found)   
    },
    cards: (obj: any, args: any, context: any, info: any) => {
      let found = null
      if(args.parentId) {
        found = db[DB_DECK_CARD].find({ parentId: args.parentId })
      } else {
        found = db[DB_DECK_CARD].find({ parentId: "" })
      }
      
      return mapIds(found)
    }
  },
  Mutation: {
    storeCard: (_root: any, args: any) => {
      let { id, ...data } = args.card ;
      data = { parentId: "", ...data}

      const found = db[DB_DECK_CARD].findOne({ _id: id })
      let result = null
      let results = null
      if (found) {
        result = db[DB_DECK_CARD].update({ _id: found._id }, data, { multi: false, upsert: true });
        const updated = db[DB_DECK_CARD].findOne({ _id: id })
        results = mapId(updated)
      } else {
        result = db[DB_DECK_CARD].save([data]);
        results = mapId(result[0])
      }

      const response = {
        code: '1',
        success: true,
        message: 'OK',
        card: results
      }
      return response
    },
    removeCard: (_root: any, args: any) => {
      const query = {
        _id: args.id
      };

      const result = db[DB_DECK_CARD].remove(query, false);

      console.log(result)

      const response = {
        code: '',
        success: true,
        message: 'OK'
      }

      return response
    },
  }
};