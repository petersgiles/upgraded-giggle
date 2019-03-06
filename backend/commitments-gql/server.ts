/* app/server.ts */

// Import everything from express and assign it to the express variable
import { ApolloServer } from 'apollo-server-express'
import * as path from "path"; // normalize the paths : http://stackoverflow.com/questions/9756567/do-you-need-to-use-path-join-in-node-js
import * as bodyParser from "body-parser"; // pull information from HTML POST (express4)
import * as methodOverride from "method-override"; // simulate DELETE and PUT (express4)
import * as fs from 'fs'
import * as https from 'https'
import * as http from 'http'
import * as helmet from "helmet"; // Security
import * as express from 'express'
import * as morgan from 'morgan'
import { logger } from '../shared/logger'
import { allowCrossDomain } from '../shared/cors';

import { HomeController, AboutController } from './controllers'
import { importSchema } from 'graphql-import';

import { resolvers } from './schema'
const typeDefs = importSchema('./commitments-gql/schema/schema.graphql')
const port: number = 3001;

const configurations: any = {
  // Note: You may need sudo to run on port 443
  production: { ssl: true, port: 443, hostname: 'localhost' },
  development: { ssl: false, port: port, hostname: 'localhost' }
}

const environment = process.env.NODE_ENV || 'development'
const config: any = configurations[environment]


const app: express.Application = express();


app.use(allowCrossDomain)
app.use(helmet());
app.use(morgan('combined'))
app.use(express.json())
app.use(express.static(path.join(process.cwd(), 'commitments-gql', 'public')))
app.use('/about', AboutController)
app.use('/hello', HomeController)

// app.use(function(req: any, res: any, next: any){
//   logger.error('404 page requested');
//   res.status(404).send('This page does not exist!');
// });

const apollo = new ApolloServer({
  typeDefs,
  resolvers
});

apollo.applyMiddleware({ app: app }); // app is from an existing express app

// Create the HTTPS or HTTP server, per configuration
var server: any
if (config.ssl) {
  // Assumes certificates are in .ssl folder from package root. Make sure the files
  // are secured.
  server = https.createServer(
    {
      key: fs.readFileSync(`./../ssl/${environment}/server.key`),
      cert: fs.readFileSync(`./../ssl/${environment}/server.crt`)
    },
    app
  )
} else {
  server = http.createServer(app)
}

// Add subscription support
apollo.installSubscriptionHandlers(server)

server.listen({ port: config.port }, () =>
  console.log(
    '🚀 Server ready at',
    `http${config.ssl ? 's' : ''}://${config.hostname}:${config.port}${apollo.graphqlPath}`
  )
)