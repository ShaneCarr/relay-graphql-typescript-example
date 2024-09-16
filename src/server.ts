import { ApolloServer } from 'apollo-server-express';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { gql } from 'graphql-tag';
import express, { Application } from 'express';
import { IResolvers } from '@graphql-tools/utils';
import teamResolvers from './graphql/resolvers/teamResolvers';
import groupResolvers from './graphql/resolvers/groupResolvers';
import groupMemberResolvers from './graphql/resolvers/groupMemberResolvers';

// Load GraphQL Schema
const typeDefs = gql(
    readFileSync(resolve(__dirname, './graphql/schema.graphql'), {
      encoding: 'utf8',
    })
);

// Create resolvers manually
const resolvers: IResolvers = {
  Query: {
    teams: teamResolvers.Query.teams,
    groups: groupResolvers.Query.groups,  // This should now work with adjusted typing
  },
  Mutation: {
    updateTeamStatus: teamResolvers.Mutation.updateTeamStatus,
    markTeamAsRead: teamResolvers.Mutation.markTeamAsRead,
    addMessageToThread: groupResolvers.Mutation.addMessageToThread,
  },
  Group: {
    members: (parent: any) => groupMemberResolvers.Query.groupMembers(null, { groupId: parent.id }),
  },
};

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Set up Express application
const app: Application = express();

server.start().then(() => {
  server.applyMiddleware({ app });
  app.listen({ port: 4000 }, () => {
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
  });
});
