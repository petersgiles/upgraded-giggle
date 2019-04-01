
const TABLES = require("../table-names.js");

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex(TABLES.DECK_ITEM).del()
    .then(function () {
      // Inserts seed entries
      return knex(TABLES.DECK_ITEM).insert([
        {id: 1, colName: 'rowValue1'}
      ]);
    });
};
