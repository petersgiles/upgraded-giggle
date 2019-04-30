
const TABLES = require("../table-names.js");

exports.up = function(knex, Promise) {
    return knex.schema.createTable(TABLES.DECK_ITEM_ACTION, function(t) {
        t.increments('id').primary()
        t.integer('deckItem').unsigned()
        t.string('url', 512)
        t.text('title')
        t.timestamp('created_at').defaultTo(knex.fn.now())

        t.foreign('deckItem')
            .references('id')
            .inTable(TABLES.DECK_ITEM)
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable(TABLES.DECK_ITEM_ACTION)
};
