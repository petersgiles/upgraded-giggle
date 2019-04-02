
exports.up = function(knex, Promise) {
    return knex.schema.createTable('commitment_party', function(t) {
        t.string('commitment')
            .notNullable()
        t.string('party').notNullable()
        t.foreign('commitment')
            .references('id')
            .inTable('commitment')
        t.foreign('party')
            .references('id')
            .inTable('tag')
    })
};

exports.down = function(knex, Promise) {
    knex.schema.dropTable('commitment_party')
};
