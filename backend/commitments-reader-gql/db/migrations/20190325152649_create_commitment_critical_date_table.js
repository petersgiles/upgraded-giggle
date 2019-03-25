exports.up = function(knex, Promise) {
    return knex.schema.createTable('commitment_critical_date', function(t) {
        t.string('commitment')
            .notNullable()
        t.string('critical_date').notNullable()
        t.foreign('commitment')
            .references('id')
            .inTable('commitment')
        t.foreign('critical_date')
            .references('id')
            .inTable('tag')
    })
};

exports.down = function(knex, Promise) {
    knex.schema.dropTable('commitment_critical_date')
};
