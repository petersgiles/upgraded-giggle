
const TABLES = require("../table-names.js");

exports.up = function(knex, Promise) {
    return knex.schema.createTable(TABLES.DECK_ITEM, function(t) {
        t.integer('id').primary()
        t.integer('parent').unsigned()
        t.string('title', 512)
        t.integer('cardType', 32)
        t.text('supportingText')
        t.string('size')
        t.string('sortOrder')
        t.string('colour', 32)
        t.string('titleClass')
        t.string('media', 512)
        t.json('data')
        t.timestamp('created_at').defaultTo(knex.fn.now())

        t.foreign('parent')
            .references('id')
            .inTable(TABLES.DECK_ITEM)
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable(TABLES.DECK_ITEM)
};
