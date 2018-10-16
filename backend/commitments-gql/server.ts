/* app/server.ts */

// Import everything from express and assign it to the express variable
import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema/typedefs';
import { resolvers } from './schema/resolvers';

const server = new ApolloServer({
  cors: true,
  typeDefs,
  resolvers,
  introspection: true,
  playground: true
  });


  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
  });