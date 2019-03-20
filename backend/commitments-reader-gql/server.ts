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
import { Commitment } from './resolvers'
import { HomeController } from './controllers'
import { allowCrossDomain } from '../shared/cors'
import { createDB } from './sqllite-schema';

const typeDefs = importSchema('./commitments-reader-gql/schema.graphql')

const sqlDB = knex({
	client: 'sqlite3',
	connection: { filename: './db/commitments-reader.db' },
	useNullAsDefault: true,
})

createDB(sqlDB)

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
const port: number = 3008

app.use(allowCrossDomain)
app.use(helmet())
app.use(morgan('combined'))
app.use(express.json())
app.use(express.static(path.join(process.cwd(), 'commitment-reader-gql', 'public')))
app.use('/home', HomeController)

// app.use(function(req: any, res: any, next: any){
//   logger.error('404 page requested');
//   res.status(404).send('This page does not exist!');
// });

export const resolvers = {
	Query: {
		commitment: async (obj: any, args: any, context: any, info: any) => {
			let result = await context.models.Commitment.getById(args.id, context)
			console.log('Commitment', result)
			return result
		},
		commitments: async (obj: any, args: any, context: any, info: any) => {
      let result = await context.models.Commitment.getAll(context)
			console.log('Commitments', result)
			return result
		},
	},
	Mutation: {
		upsertCommitment: async (obj: any, args: any, context: any, info: any) => {
      let result = await context.models.Commitment.upsert(args, context)
        .then((res: any) => {
          let result: any = {
            success: true,
            error: null,
          }

			  	return result
      })
      
      return result
		},
		deleteCommitment: async (obj: any, args: any, context: any, info: any) => {
      let result = await context.models.Commitment.delete(args.id, context)
      .then((res: any) => {
				let result: any = {
					success: true,
					error: null,
				}
				return result
      })
      return result
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
			Commitment: new Commitment({ db: 'sql' }),
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
