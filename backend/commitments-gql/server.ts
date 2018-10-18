/* app/server.ts */

// Import everything from express and assign it to the express variable
import { ApolloServer } from 'apollo-server-express'
import * as path from "path"; // normalize the paths : http://stackoverflow.com/questions/9756567/do-you-need-to-use-path-join-in-node-js
import * as bodyParser from "body-parser"; // pull information from HTML POST (express4)
import * as methodOverride from "method-override"; // simulate DELETE and PUT (express4)
import * as compression from "compression";
import * as helmet from "helmet"; // Security
import * as express from 'express'
import * as morgan from 'morgan'
import { logger } from '../shared/logger'
import { allowCrossDomain } from '../shared/cors';

import { typeDefs, resolvers } from './schema'
import { HomeController } from './controllers'

const app: express.Application = express();
const port: number = 3001;

app.use(allowCrossDomain)
app.use(helmet());
app.use(morgan('combined'))
app.use(express.json())
app.use(express.static(path.join(process.cwd(), 'commitments-gql', 'public')))
app.use('/hello', HomeController)

// app.use(function(req: any, res: any, next: any){
//   logger.error('404 page requested');
//   res.status(404).send('This page does not exist!');
// });

const server = new ApolloServer({
  typeDefs,
  resolvers
  });

server.applyMiddleware({ app: app }); // app is from an existing express app

app.listen({ port: port }, () =>
  {
    logger.info(`${path.join(process.cwd(), 'public')}`)
    logger.info(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
  }
)