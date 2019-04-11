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
import { toTree } from '../shared/utils'
import { logger } from '../shared/logger'
import { importSchema } from 'graphql-import'
import { PolicyBrief, TABLE } from './resolvers'
import { allowCrossDomain } from '../shared/cors'
import { getById, getByAll, upsert, remove, getByParent } from './resolvers'
import { Lookups } from './resolvers/lookups';


const typeDefs = importSchema('./policy-briefs-gql/schema.graphql')

const sqlDB = knex({
	client: 'sqlite3',
	connection: { filename: './policy-briefs-gql/db/dev.sqlite3' },
	useNullAsDefault: true,
})

sqlDB.on('query', function(queryData: any) {
	logger.info(`🕳️ - ${JSON.stringify(queryData)}`)
})

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
const port: number = 3202

app.use(allowCrossDomain)
app.use(helmet())
app.use(morgan('combined'))
app.use(express.json())

var cors = require('cors')
app.use(cors())
// app.use(function(req: any, res: any, next: any){
//   logger.error('404 page requested');
//   res.status(404).send('This page does not exist!');
// });

export const resolvers: any = {
	Query: {
		brief: async (obj: any, args: any, context: any, info: any) =>
			getById('PolicyBrief', obj, args, context, info),
    	briefs: async (obj: any, args: any, context: any, info: any) =>
			getByAll('PolicyBrief', obj, args, context, info),
		policies: async (obj: any, args: any, context: any, info: any) =>
			await context.models['Lookups'].getAll(context, TABLE.POLICY),
		sidebar: async (obj: any, args: any, context: any, info: any) =>
			await context.models['Lookups'].getPackNavigation(context),
	},
	Brief: {
		securityClassification: async (obj: any, args: any, context: any, info: any) => 
			await context.models['Lookups'].getLookupByKey(obj.securityClassification, context, TABLE.SECURITY_CLASSIFICATION, 'id'),
		dLM: async (obj: any, args: any, context: any, info: any) => 
			await context.models['Lookups'].getLookupByKey(obj.dLM, context, TABLE.BRIEF_DLM, 'id'),
		policy: async (obj: any, args: any, context: any, info: any) => 
			await context.models['Lookups'].getLookupByKey(obj.policy, context, TABLE.POLICY, 'id'),
		subPolicy: async (obj: any, args: any, context: any, info: any) => 
			await context.models['Lookups'].getLookupByKey(obj.subPolicy, context, TABLE.SUBPOLICY, 'id'),
		briefStatus: async (obj: any, args: any, context: any, info: any) => 
			await context.models['Lookups'].getLookupByKey(obj.briefStatus, context, TABLE.BRIEF_STATUS, 'id'),
		briefDivision: async (obj: any, args: any, context: any, info: any) => 
			await context.models['Lookups'].getLookupByKey(obj.briefDivision, context, TABLE.BRIEF_DIVISION, 'id'),
		contactOfficer: async (obj: any, args: any, context: any, info: any) => 
			await context.models['Lookups'].getLookupByKey(obj.contactOfficer, context, TABLE.USER, 'id'),
		createdBy: async (obj: any, args: any, context: any, info: any) => 
			await context.models['Lookups'].getLookupByKey(obj.createdBy, context, TABLE.USER, 'id'),
		modifiedBy: async (obj: any, args: any, context: any, info: any) => 
			await context.models['Lookups'].getLookupByKey(obj.modifiedBy, context, TABLE.USER, 'id'),
	},
	Policy: {
		subPolicies: async (obj: any, args: any, context: any, info: any) => 
			await context.models['Lookups'].getLookupsByKey(obj.id, context, TABLE.SUBPOLICY, 'policy'),
	},
	SubPolicy: {
		policy: async (obj: any, args: any, context: any, info: any) => 
			await context.models['Lookups'].getLookupByKey(obj.policy, context, TABLE.POLICY, 'id'),
		briefs: async (obj: any, args: any, context: any, info: any) => 
			await context.models['Lookups'].getLookupsByKey(obj.id, context, TABLE.POLICY_BRIEF, 'subPolicy'),
	}
}

const server = new ApolloServer({
	typeDefs,
	resolvers: resolvers,
	context: {
		connectors: {
			sql: new SqlConnector(sqlDB),
		},
		models: {
			PolicyBrief: new PolicyBrief({ db: 'sql' }),
			Lookups: new Lookups({ db: 'sql' })
		},
	},
})

server.applyMiddleware({ app: app }) // app is from an existing express app

app.use(express.static(__dirname + '/public'))
app.use(express.static(process.cwd()))

app.route('/*').get(function(req, res) {
	res.sendFile(__dirname + '/public/index.html')
})

app.listen({ port: port }, () => {
	logger.info(`${path.join(process.cwd(), 'public')}`)
	logger.info(
		`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
	)
})
