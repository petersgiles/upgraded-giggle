const TABLES = require('../table-names.js')
const data = require('./source/deckitems.json')
const bulkInsert = require('../bulkInsert.js').bulkInsert

var deckItemActions = data.reduce(function(acc, item) {
  if (!item.Actions) return acc
  
  console.log(item.Actions)
	return item.Actions.split(';').reduce((actacc, actitem) => {
    const [url, title, ...cruft] = actitem.split('|')
    
    console.log(url, title, cruft)

		acc.push({
			deckItem: item.Id,
			title: title,
			url: url,
		})
		return actacc
	}, acc)
}, [])

exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex(TABLES.DECK_ITEM_ACTION).del()
		.then((_) => bulkInsert(knex, TABLES.DECK_ITEM_ACTION, deckItemActions))
}
