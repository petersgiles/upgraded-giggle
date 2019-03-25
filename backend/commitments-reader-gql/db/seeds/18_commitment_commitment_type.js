
var tags = require('./tags.json')
var commitmentTypeGroup = tags.filter((t) => t.parent === 'commitment-type-group')

var commitments = require('./commitments.json')
var id = 0;
var cmps = commitments.map(p => {
  var index = Math.floor(Math.random() * Math.floor(commitmentTypeGroup.length))

  return {
    commitment: `C-${(++id).pad(4)}`,
    commitment_type: commitmentTypeGroup[index].id
  }
});


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('commitment_commitment_type').del()
    .then(_ => knex('commitment_commitment_type').insert(cmps));
};