Number.prototype.pad = function(size) {
	var s = String(this);
	while (s.length < (size || 2)) {s = "0" + s;}
	return s;
  }


var data = require('./commitments.json')
var id = 0;
var commitments = data.map(p => {
	return {
			id: `C-${(++id).pad(4)}`,
			title: p.Title,
			description: p.Description,
			cost: p.Cost,
			date: p.Date,
			// costingRequired: p.CostingRequired
			// x: p.Location,
			// x: p.AnnouncedBy,
			// x: p.Portfolio,
			// x: p.AnnouncementType,
			// x: p.WhoAnnouncedType,
			// x: p.CommitmentType,
			// x: p.CriticalDate,
			// x: p.ThemeType,
			// x: p.PackageType,
			// x: p.OfficialCosting,
			// x: p.CostingRequired,
			// x: p.Status
		
	}
})

exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('commitment')
		.del()
		.then(_ => knex('commitment').insert(commitments))
}
