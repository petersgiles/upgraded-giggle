
const TABLES = require("../table-names.js");
const data = require("./source/deckitems.json")
const bulkInsert = require("../bulkInsert.js").bulkInsert;

var deckItems = data.reduce(function(acc, item){
  acc.push({
       'id': item.Id,
       'title': item.Title,
       'description': item.SupportingText,
       'size': item.Size,
       'type': item.CardType,
       'sortorder': item.SortOrder,
       'colour': item.Colour,
       'media': item.Media,
       'data': item.Data,
       'created_at': item.Created_x0020_Date,
       'parent': item.Parent
  })
  return acc
}, [])

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex(TABLES.DECK_ITEM).del()
  .then(_ => bulkInsert(knex, TABLES.DECK_ITEM, deckItems));
};
