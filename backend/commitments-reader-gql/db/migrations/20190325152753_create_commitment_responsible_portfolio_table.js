exports.up = function(knex, Promise) {
    return knex.schema.createTable('commitment_responsible_portfolio', function(t) {
        t.string('commitment')
            .notNullable()
        t.string('responsible_portfolio').notNullable()
        t.foreign('commitment')
            .references('id')
            .inTable('commitment')
        t.foreign('responsible_portfolio')
            .references('id')
            .inTable('tag')
    })
};

exports.down = function(knex, Promise) {
    knex.schema.dropTable('commitment_responsible_portfolio')
};