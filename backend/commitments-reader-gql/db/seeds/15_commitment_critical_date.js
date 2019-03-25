
var tags = require('./tags.json')
var criticalDateGroup = tags.filter((t) => t.parent === 'critical-date-group')

var commitments = require('./commitments.json')
var id = 0;
var cmps = commitments.map(p => {
  var index = Math.floor(Math.random() * Math.floor(criticalDateGroup.length))

  return {
    commitment: `C-${(++id).pad(4)}`,
    critical_date: criticalDateGroup[index].id
  }
});


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('commitment_critical_date').del()
    .then(_ => knex('commitment_critical_date').insert(cmps));
};
