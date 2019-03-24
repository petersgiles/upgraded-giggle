
exports.up = function(knex, Promise) {
    return knex.schema.createTable('commitment_mappoint', function(
        t
    ) {
        t.string('commitment')
            .notNullable()
        t.string('mappoint').notNullable()
        t.foreign('commitment')
            .references('id')
            .inTable('commitment')
        t.foreign('mappoint')
            .references('place_id')
            .inTable('mappoint')
    })
};

exports.down = function(knex, Promise) {
    knex.schema.dropTable('commitment_mappoint')
};
