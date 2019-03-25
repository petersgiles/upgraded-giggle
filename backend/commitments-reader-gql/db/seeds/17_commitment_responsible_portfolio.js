
var tags = require('./tags.json')
var portfolioGroup = tags.filter((t) => t.parent === 'portfolio-group')

var commitments = require('./commitments.json')
var id = 0;
var cmps = commitments.map(p => {
  var index = Math.floor(Math.random() * Math.floor(portfolioGroup.length))

  return {
    commitment: `C-${(++id).pad(4)}`,
    responsible_portfolio: portfolioGroup[index].id
  }
});


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('commitment_responsible_portfolio').del()
    .then(_ => knex('commitment_responsible_portfolio').insert(cmps));
};