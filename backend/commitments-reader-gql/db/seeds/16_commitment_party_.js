var bulkInsert = require("../bulkInsert.js").bulkInsert;

var tags = require("./tags.json");
var partyGroup = tags.filter(t => t.parent === "party-group");

var commitments = require("../../data/commitments.json");
var id = 0;
var cmps = commitments.map(p => {
  var index = Math.floor(Math.random() * Math.floor(partyGroup.length));

  return {
    commitment: `C-${(++id).pad(4)}`,
    party: partyGroup[index].id
  };
});

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("commitment_party")
    .del()
    .then(_ => bulkInsert(knex, "commitment_party", cmps));
};
