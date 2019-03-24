
exports.up = function(knex, Promise) {
    return knex.schema.createTable('commitment', function(t) {
        t.string('id').primary()
        t.string('title', 512)
        t.text('description')
        t.string('cost', 512)
        t.string('date', 512)
        t.string('announcedby', 512)
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('commitment')
};
