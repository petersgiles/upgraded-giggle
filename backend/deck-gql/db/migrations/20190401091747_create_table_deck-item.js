
const TABLES = require("../table-names.js");

exports.up = function(knex, Promise) {
    return knex.schema.createTable(TABLES.DECK_ITEM, function(t) {
        t.increments('id').primary()
        t.string('title', 512)
        t.text('description')
        t.integer('size')
        t.integer('type')
        t.integer('sortorder')
        t.string('colour', 32)
        t.string('media', 512)
        t.json('data')
        t.timestamp('created_at').defaultTo(knex.fn.now())
        t.integer('parent').unsigned()

        t.foreign('parent')
            .references('id')
            .inTable(TABLES.DECK_ITEM)
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable(TABLES.DECK_ITEM)
};
