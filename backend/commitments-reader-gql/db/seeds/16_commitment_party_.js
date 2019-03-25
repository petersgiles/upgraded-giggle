
var tags = require('./tags.json')
var partyGroup = tags.filter((t) => t.parent === 'party-group')

var commitments = require('./commitments.json')
var id = 0;
var cmps = commitments.map(p => {
  var index = Math.floor(Math.random() * Math.floor(partyGroup.length))

  return {
    commitment: `C-${(++id).pad(4)}`,
    party: partyGroup[index].id
  }
});


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('commitment_party').del()
    .then(_ => knex('commitment_party').insert(cmps));
};