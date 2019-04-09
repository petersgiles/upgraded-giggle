
exports.up = function(knex, Promise) {
    return knex.schema.createTable('PolicyBrief', function(t) {
        t.string('id').primary()
        t.string('title', 512)
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('PolicyBrief')
};