
var mappoints = require('./mappoints.json')

var commitments = require('./commitments.json')
var id = 0;
var cmps = commitments.map(p => {
  var index = Math.floor(Math.random() * Math.floor(mappoints.length))

  return {
    commitment: `C-${(++id).pad(4)}`,
    mappoint: mappoints[index].place_id
  }
});

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('commitment_mappoint').del()
    .then(_ => knex('commitment_mappoint').insert(cmps));
};
