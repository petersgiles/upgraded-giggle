
exports.up = function(knex, Promise) {
   return  knex.schema.createTable('mappoint', function(t) {
        t.string('place_id').primary()
        t.string('address', 1024)
        t.string('latitude', 512)
        t.string('longitude', 512)
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('mappoint')
};
