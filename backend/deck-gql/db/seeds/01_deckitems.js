const TABLES = require('../table-names.js')
const data = require('./source/deckitems.json')
const bulkInsert = require('../bulkInsert.js').bulkInsert

var deckItems = data.reduce(function(acc, item) {
	acc.push({
		id: item.Id,
		parent: item.Parent,
		title: item.Title,
		cardType: item.CardType,
		supportingText: item.SupportingText,
		size: item.Size,
		sortOrder: item.SortOrder,
		colour: item.Colour,
		titleClass: '',
		media: item.Media,
		data: item.Data,
		created_at: item.Created_x0020_Date,
	})
	return acc
}, [])

exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex(TABLES.DECK_ITEM_ACTION).del()
		.then((_) => bulkInsert(knex, TABLES.DECK_ITEM, deckItems))
}
