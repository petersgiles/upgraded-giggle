
exports.up = function(knex, Promise) {
    return knex.schema.createTable('tag', function(t) {
        t.increments('id').primary()
        t.string('title', 512)
        t.text('description')
        t.integer('sortorder')
        t.string('colour', 512)
        t.string('icon', 512)
        t.integer('parent').unsigned()

        t.foreign('parent')
            .references('id')
            .inTable('tag')
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tag')
};
