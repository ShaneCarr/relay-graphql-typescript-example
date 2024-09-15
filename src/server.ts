// server.ts

import { ApolloServer } from 'apollo-server-express';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { gql } from 'graphql-tag';
import express, { Application } from 'express';
import teamResolvers from './graphql/resolvers/teamResolvers';
import groupResolvers from './graphql/resolvers/groupResolvers';
import userResolvers from './graphql/resolvers/userResolvers';
import groupMemberResolvers from './graphql/resolvers/groupMemberResolvers';


console.log('Starting server setup...');
// Load GraphQL Schema
const typeDefs = gql(
    readFileSync(resolve(__dirname, './graphql/schema.graphql'), {
      encoding: 'utf8',
    })
);

// Merge resolvers
const resolvers = {
  Query: {
    ...teamResolvers.Query,
    ...groupResolvers.Query,
  },
  Mutation: {
    ...teamResolvers.Mutation,
    ...groupResolvers.Mutation,
  },
};

// Set up Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// Set up Express application
const app: Application = express();

server.start().then(() => {
  server.applyMiddleware({ app });
  app.listen({ port: 4000 }, () => {
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
  });
});
