exports.up = function(knex, Promise) {
    return knex.schema.createTable('commitment_commitment_type', function(t) {
        t.string('commitment')
            .notNullable()
        t.string('commitment_type').notNullable()
        t.foreign('commitment')
            .references('id')
            .inTable('commitment')
        t.foreign('commitment_type')
            .references('id')
            .inTable('tag')
    })
};

exports.down = function(knex, Promise) {
    knex.schema.dropTable('commitment_commitment_type')
};
