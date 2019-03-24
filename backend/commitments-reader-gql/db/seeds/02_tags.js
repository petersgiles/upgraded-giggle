var tags = require('./tags.json')

var parents = tags.filter((t) => !t.parent)
var portfolioGroup = tags.filter((t) => t.parent === 'portfolio-group')
var criticalDateGroup = tags.filter((t) => t.parent === 'critical-date-group')
var statusGroup = tags.filter((t) => t.parent === 'status-group')

var partyGroup = tags.filter((t) => t.parent === 'party-group')
var statesGroup = tags.filter((t) => t.parent === 'states-group')
var electorateGroups = statesGroup.map(s=>s.id).reduce((acc, item) => {
	acc[item] = tags.filter((t) => t.parent === item)
	return acc
}, {})

exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('tag')
		.del()
		.then(_ => knex('tag').insert(parents))
		.then(_ => knex('tag').insert(criticalDateGroup))
		.then(_ => knex('tag').insert(partyGroup))
		.then(_ => knex('tag').insert(portfolioGroup))
		.then(_ => knex('tag').insert(statusGroup))
		.then(_ => knex('tag').insert(statesGroup))
		.then(_ => knex('tag').insert(electorateGroups['ACT']))
		.then(_ => knex('tag').insert(electorateGroups['NSW']))
		.then(_ =>  knex('tag').insert(electorateGroups['NT']))
		.then(_ => knex('tag').insert(electorateGroups['Qld']))
		.then(_ => knex('tag').insert(electorateGroups['WA']))
		.then(_ => knex('tag').insert(electorateGroups['VIC']))
		.then(_ => knex('tag').insert(electorateGroups['TAS']))
}
