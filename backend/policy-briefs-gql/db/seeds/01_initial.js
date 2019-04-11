const bulkInsert = require('../bulkInsert.js').bulkInsert
const faker = require('faker')

var TABLE_POLICY_BRIEFS = 'PolicyBrief'
var TABLE_BRIEF_STATUS = 'BriefStatus'
var TABLE_SECURITY_CLASSIFICATION = 'SecurityClassification'
var TABLE_BRIEF_DIVISION = 'BriefDivision'
var TABLE_BRIEF_DLM = 'Dlm'
var TABLE_USER = 'SharePointUser'
var TABLE_POLICY = 'Policy'
var TABLE_SUBPOLICY = 'SubPolicy'

const createFakeUser = (index) => {
	const fn = faker.name.firstName()
	const ln = faker.name.lastName()
	return {
		id: index,
		account: `user${faker.random.alphaNumeric(6)}`,
		name: `${fn} ${ln}`,
		eMail: faker.internet.email(fn, ln, 'org.gov'),
		mobileNumber: faker.phone.phoneNumber(),
		aboutMe: faker.random.words(),
		picture: faker.internet.avatar(),
		department: faker.name.jobArea(),
		jobTitle: faker.name.jobDescriptor(),
		sIPAddress: faker.random.uuid(),
	}
}

const createFakeHtmlDoc = (buzz, noun) => {
	return `
  <html>
  <head>
  <title>
  ${buzz} ${noun}
  </title>
  </head>
  <body>
  <h1>${buzz} ${noun}</h1>
  <p>${faker.lorem.text(1)}</p>
  <p>${faker.lorem.text(1)}</p>
  <img src="${faker.image.imageUrl()}" alt="image">
  <p>${faker.lorem.text(1)}</p>
  <p>${faker.lorem.text(1)}</p>
  <img src="${faker.image.imageUrl()}" alt="image">
  <p>${faker.lorem.text(1)}</p>
  </body>
  </html>
  `
}
const policyChoices = [{ id: 1, title: 'Sample Policy' }]

const subpolicyChoices = [
	{ id: 1, title: 'Sample Sub Policy A', policy: 1 },
	{ id: 2, title: 'Sample Sub Policy B', policy: 1 },
]

const briefDivisionChoices = [{ id: 1, title: 'Division' }]

const dlmChoices = [
	{ id: 1, title: 'Not for tabling - For Official Use Only' },
	{ id: 2, title: 'For Official Use Only' },
	{ id: 3, title: 'Sensitive' },
	{ id: 4, title: 'Sensitive Cabinet' },
	{ id: 5, title: 'Sensitive Legal' },
	{ id: 6, title: 'Sensitive Personal' },
]

const securityClassificationChoices = [
	{ id: 1, title: 'UNCLASSIFIED' },
	{ id: 2, title: 'IN CONFIDENCE' },
	{ id: 3, title: 'PROTECTED' },
]

const statusChoices = [
	{ id: 1, title: 'Draft', sortorder: 1, enumeration: 1, icon: 'people', colour: 'Tomato', publish: false },
	{ id: 2, title: 'Done', sortorder: 2, enumeration: 2, icon: 'people', colour: 'Wheat', publish: false },
	{ id: 3, title: 'Ready', sortorder: 3, enumeration: 3, icon: 'people', colour: 'WhiteSmoke', publish: true },
]

const createFakeBrief = (index) => {
	try {
		let created = faker.date.past()
    let due = faker.date.future(1, created)
    let noun = faker.company.bsNoun()
    let buzz = faker.company.bsBuzz()

		let spid = faker.random.number({ min: 1, max: 2 })

		const subpolicyChoices = [
			{ id: 1, title: 'Sample Sub Policy A', policy: 1 },
			{ id: 2, title: 'Sample Sub Policy B', policy: 1 },
    ]
    
		let subpolicy = subpolicyChoices.find((item) => item.id == spid)

		let brief = {
			title: `${buzz} ${noun}`,
			reference: `IB-${faker.random.number(999)}`,
			notify: faker.random.word(),
			policyDirection: faker.random.word(),
			sortOrder: faker.random.number(999),
			briefHtml: createFakeHtmlDoc(buzz, noun),
			created: created,
			dueDate: due,
			modified: faker.date.between(created, due),
			policy: subpolicy.policy,
      subpolicy: subpolicy.id,
      briefStatus: faker.random.number({
				min: 1,
				max: 3,
			}),
			dLM: faker.random.number({
				min: 1,
				max: 6,
			}),
			securityClassification: faker.random.number({
				min: 1,
				max: 3,
			}),
			briefDivision: faker.random.number({
				min: 1,
				max: 1,
			}),
			contactOfficer: faker.random.number({
				min: 1,
				max: 99,
			}),
			createdBy: faker.random.number({
				min: 1,
				max: 99,
			}),
			modifiedBy: faker.random.number({
				min: 1,
				max: 99,
			}),
		}

		return brief
	} catch {
		return null
	}
}

exports.seed = function(knex, Promise) {
	return new Promise(async (resolve, reject) => {
		try {
			const users = []

			for (let i = 1; i < 100; i++) {
				let result = createFakeUser(i)
				if (result) {
					users.push(result)
				}
			}

			await knex(TABLE_USER)
				.del()
				.then((_) => bulkInsert(knex, TABLE_USER, users))

			await knex(TABLE_BRIEF_DIVISION)
				.del()
				.then((_) =>
					bulkInsert(knex, TABLE_BRIEF_DIVISION, briefDivisionChoices)
				)

			await knex(TABLE_SECURITY_CLASSIFICATION)
				.del()
				.then((_) =>
					bulkInsert(
						knex,
						TABLE_SECURITY_CLASSIFICATION,
						securityClassificationChoices
					)
				)

			await knex(TABLE_BRIEF_STATUS)
				.del()
				.then((_) => bulkInsert(knex, TABLE_BRIEF_STATUS, statusChoices))

			await knex(TABLE_BRIEF_DLM)
				.del()
				.then((_) => bulkInsert(knex, TABLE_BRIEF_DLM, dlmChoices))

			await knex(TABLE_POLICY)
				.del()
				.then((_) => bulkInsert(knex, TABLE_POLICY, policyChoices))

			await knex(TABLE_SUBPOLICY)
				.del()
				.then((_) => bulkInsert(knex, TABLE_SUBPOLICY, subpolicyChoices))

			const briefs = []

			for (let i = 1; i < 10; i++) {
				let result = createFakeBrief(i)
				if (result) {
					briefs.push(result)
				}
			}

			if (briefs) {
				await knex(TABLE_POLICY_BRIEFS)
					.del()
					.then((_) => bulkInsert(knex, TABLE_POLICY_BRIEFS, briefs))
			}
			resolve()
		} catch (error) {
			reject(error)
		}
	})
}
