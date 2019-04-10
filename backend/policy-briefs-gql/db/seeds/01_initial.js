const bulkInsert = require('../bulkInsert.js').bulkInsert
const faker = require('faker')

var TABLE_USER = 'SharePointUser'

const createFakeUser = () => {

  const fn = faker.name.firstName();
  const ln = faker.name.lastName()

  return {
    account:  `user${faker.random.alphaNumeric(6)}`,
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

exports.seed = function(knex, Promise) {
	return new Promise(async (resolve, reject) => {
		try {
			const fakeUsers = []
			const desiredFakeUsers = 1000

			for (let i = 0; i < desiredFakeUsers; i++) {
				fakeUsers.push(createFakeUser())
      }
      
			await knex(TABLE_USER)
				.del()
				.then((_) => bulkInsert(knex, TABLE_USER, fakeUsers))

			console.log(`${TABLE_USER} users inserted!`)

			resolve()
		} catch (error) {
			reject(error)
		}
	})
}
