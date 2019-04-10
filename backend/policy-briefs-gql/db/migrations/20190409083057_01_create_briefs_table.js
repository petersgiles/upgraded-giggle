var TABLE_POLICY_BRIEFS = 'PolicyBrief'
var TABLE_BRIEF_STATUS = 'BriefStatus'
var TABLE_SECURITY_CLASSIFICATION = 'SecurityClassification'
var TABLE_BRIEF_DIVISION = 'BriefDivision'
var TABLE_BRIEF_DLM = 'Dlm'
var TABLE_USER = 'SharePointUser'
var TABLE_POLICY = 'Policy'
var TABLE_SUBPOLICY = 'SubPolicy'

exports.up = function(knex, Promise) {
	return new Promise(async (resolve, reject) => {
		try {
			await knex.schema.createTable(TABLE_USER, (table) => {
				table.increments('id').primary()
				table.string('account', 512)
				table.string('name', 512)
				table.string('eMail', 512)
				table.string('mobileNumber', 512)
				table.string('aboutMe', 512)
				table.string('picture', 512)
				table.string('department', 512)
				table.string('jobTitle', 512)
				table.string('sIPAddress', 512)
			})

			console.log(`${TABLE_USER} created successfully!`)

			await knex.schema.createTable(TABLE_SECURITY_CLASSIFICATION, (table) => {
				table.increments('id').primary()
				table.string('title', 512)
			})

			console.log(`${TABLE_SECURITY_CLASSIFICATION} created successfully!`)

			await knex.schema.createTable(TABLE_BRIEF_DLM, (table) => {
				table.increments('id').primary()
				table.string('title', 512)
			})

			console.log(`${TABLE_BRIEF_DLM} created successfully!`)

			await knex.schema.createTable(TABLE_BRIEF_STATUS, (table) => {
				table.increments('id').primary()
				table.string('title', 512)
			})

			console.log(`${TABLE_BRIEF_STATUS} created successfully!`)

			await knex.schema.createTable(TABLE_BRIEF_DIVISION, (table) => {
				table.integer('id').primary()
				table.string('title', 512)
			})

			console.log(`${TABLE_BRIEF_DIVISION} created successfully!`)

			await knex.schema.createTable(TABLE_POLICY, (table) => {
				table.increments('id').primary()
				table.string('title', 512)
			})

			console.log(`${TABLE_POLICY} created successfully!`)

			await knex.schema.createTable(TABLE_SUBPOLICY, (table) => {
				table.increments('id').primary()
				table.string('title', 512)
			})

			console.log(`${TABLE_SUBPOLICY} created successfully!`)

			await knex.schema.createTable(TABLE_POLICY_BRIEFS, (table) => {
				table.increments('id').primary()
				table.string('title', 512)
				table.string('reference', 512)
				table.string('notify', 512)
				table.string('policyDirection', 512)
				table.integer('sortOrder')
				table.text('briefHtml')
				table.string('created', 512)
				table.string('dueDate', 512)
				table.string('modified', 512)

				table.integer('briefStatus').unsigned()
				table.integer('securityClassification').unsigned()
				table.integer('briefDivision').unsigned()
				table.integer('contactOfficer').unsigned()
				table.integer('dLM').unsigned()
				table.integer('policy').unsigned()
				table.integer('subPolicy').unsigned()
				table.integer('createdBy').unsigned()
				table.integer('modifiedBy').unsigned()

				table
					.foreign('briefStatus')
					.references('id')
					.inTable(TABLE_BRIEF_STATUS)
				table
					.foreign('securityClassification')
					.references('id')
					.inTable(TABLE_SECURITY_CLASSIFICATION)
				table
					.foreign('briefDivision')
					.references('id')
					.inTable(TABLE_BRIEF_DIVISION)
				table
					.foreign('contactOfficer')
					.references('id')
					.inTable(TABLE_USER)
				table
					.foreign('dLM')
					.references('id')
					.inTable(TABLE_BRIEF_DLM)
				table
					.foreign('policy')
					.references('id')
					.inTable(TABLE_POLICY)
				table
					.foreign('subPolicy')
					.references('id')
					.inTable(TABLE_SUBPOLICY)
				table
					.foreign('createdBy')
					.references('id')
					.inTable(TABLE_USER)
				table
					.foreign('modifiedBy')
					.references('id')
					.inTable(TABLE_USER)
			})

			console.log(`${TABLE_POLICY_BRIEFS} created successfully!`)

			resolve()
		} catch (error) {
			reject(error)
		}
	})
}

exports.down = function(knex, Promise) {
	return new Promise(async (resolve, reject) => {
		try {
			await knex.schema.dropTable(TABLE_POLICY_BRIEFS)
			await knex.schema.dropTable(TABLE_BRIEF_STATUS)
			await knex.schema.dropTable(TABLE_SECURITY_CLASSIFICATION)
			await knex.schema.dropTable(TABLE_BRIEF_DIVISION)
			await knex.schema.dropTable(TABLE_BRIEF_DLM)
			await knex.schema.dropTable(TABLE_USER)
			await knex.schema.dropTable(TABLE_POLICY)
			await knex.schema.dropTable(TABLE_SUBPOLICY)

			resolve()
		} catch (error) {
			reject(error)
		}
	})
}
