const sqlite3 = require('sqlite3').verbose();

var DB_COMMITMENTS_USER = 'commitments-user'
var DB_COMMITMENTS_CARD = 'commitments-card'

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
      // const found = db[DB_COMMITMENTS_USER].findOne({ id: args.id })
      // return mapId(found)   
    },
    cards: (obj: any, args: any, context: any, info: any) => {
      let found = null
      // if(args.parent) {
      //   found = db[DB_COMMITMENTS_CARD].find({ parent: args.parent })
      // } else {
      //   found = db[DB_COMMITMENTS_CARD].find({ parent: null })
      // }
      
      return mapIds(found)
    }
  },
  Mutation: {
    storeCard: (_root: any, args: any) => {
         const response = {
        code: '1',
        success: true,
        message: 'OK',
        card: {}
      }
      return response
    },
    removeCard: (_root: any, args: any) => {

      const response = {
        code: '',
        success: true,
        message: 'OK'
      }

      return response
    },
  }
};