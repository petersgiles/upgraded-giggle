
exports.up = function(knex, Promise) {
  return knex.schema.createTable('navigation', function(t) {
    t.increments('id').primary()
    t.string('title', 1024)
    t.text('description')
    t.string('icon', 256)
})
};

exports.down = function(knex, Promise) {
    knex.schema.dropTable('navigation')
};
