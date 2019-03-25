var data = require('./mappoints.json')
var mappoints = data.map(p => {
  return {
...p
  }
});
  
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('mappoint').del()
    .then(_ => knex('mappoint').insert(mappoints));
};
