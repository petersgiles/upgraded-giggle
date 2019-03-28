exports.up = function(knex, Promise) {
    return knex.schema.createTable('commitment_who_announced', function(t) {
        t.string('commitment')
            .notNullable()
        t.string('who_announced').notNullable()
        t.foreign('commitment')
            .references('id')
            .inTable('commitment')
        t.foreign('who_announced')
            .references('id')
            .inTable('tag')
    })
};

exports.down = function(knex, Promise) {
    knex.schema.dropTable('commitment_who_announced')
};
