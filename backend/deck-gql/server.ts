/* app/server.ts */

// Import everything from express and assign it to the express variable
import { ApolloServer } from 'apollo-server-express'
import * as path from 'path' // normalize the paths : http://stackoverflow.com/questions/9756567/do-you-need-to-use-path-join-in-node-js
import * as bodyParser from 'body-parser' // pull information from HTML POST (express4)
import * as methodOverride from 'method-override' // simulate DELETE and PUT (express4)
import * as compression from 'compression'
import * as helmet from 'helmet' // Security
import * as express from 'express'
import * as morgan from 'morgan'
import * as knex from 'knex'

import { logger } from '../shared/logger'
import { importSchema } from 'graphql-import'
import { DeckItem, createDeckItemTable } from './resolvers'
import { HomeController } from './controllers'
import { allowCrossDomain } from '../shared/cors'

const typeDefs = importSchema('./deck-gql/schema.graphql')

const sqlDB = knex({
	client: 'sqlite3',
	connection: { filename: './db/deck.db' },
	useNullAsDefault: true,
})

createDeckItemTable(sqlDB)

class SqlConnector {
	connection: any
	constructor(connection: knex) {
		this.connection = connection
	}
	closeConnection() {
		this.connection.close()
	}
	collection(collectionName: any) {
		return this.connection.collection(collectionName)
	}
}

const app: express.Application = express()
const port: number = 3002

app.use(allowCrossDomain)
app.use(helmet())
app.use(morgan('combined'))
app.use(express.json())
app.use(express.static(path.join(process.cwd(), 'deck-gql', 'public')))
app.use('/home', HomeController)

// app.use(function(req: any, res: any, next: any){
//   logger.error('404 page requested');
//   res.status(404).send('This page does not exist!');
// });

export const resolvers = {
	Query: {
		deckItem: async (obj: any, args: any, context: any, info: any) => {
			let result = await context.models.DeckItem.getById(args.id, context)
			console.log('deckItem', result)
			return result
		},
		deckItems: async (obj: any, args: any, context: any, info: any) => {
      let result = await context.models.DeckItem.getByParent(args.parent, context)
			console.log('deckItems', result)
			return result
		},
	},
	Mutation: {
		upsertDeckItem: async (obj: any, args: any, context: any, info: any) => {
			context.models.DeckItem.upsert(args, context).then((res: any) => {
				let result: any = {
					success: true,
					error: null,
				}

				return result
			})
		},
		deleteDeckItem: async (obj: any, args: any, context: any, info: any) => {
			context.models.DeckItem.delete(args.id, context).then((res: any) => {
				let result: any = {
					success: true,
					error: null,
				}

				return result
			})
		},
	},
}

const server = new ApolloServer({
	typeDefs,
	resolvers: resolvers,
	context: {
		connectors: {
			sql: new SqlConnector(sqlDB),
		},
		models: {
			DeckItem: new DeckItem({ db: 'sql' }),
		},
	},
})

server.applyMiddleware({ app: app }) // app is from an existing express app

app.listen({ port: port }, () => {
	logger.info(`${path.join(process.cwd(), 'public')}`)
	logger.info(
		`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
	)
})
