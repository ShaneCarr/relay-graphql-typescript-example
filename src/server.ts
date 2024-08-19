import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { gql } from 'graphql-tag';

// Load GraphQL Schema
const typeDefs = gql(
  readFileSync(resolve(__dirname, './graphql/schema.graphql'), {
    encoding: 'utf8',
  })
);

let teams = [
  {
    id: '1',
    name: 'Team Alpha',
    activityStatus: {
      hasPersonalMention: true,
      hasChannelMention: false,
      hasTeamMention: false,
      hasUnreadMessage: true,
      isNewForUser: true,
    },
  },
  {
    id: '2',
    name: 'Team Beta',
    activityStatus: {
      hasPersonalMention: false,
      hasChannelMention: true,
      hasTeamMention: true,
      hasUnreadMessage: false,
      isNewForUser: false,
    },
  },
];

// Define ActivityStatus type
type ActivityStatus = {
  hasPersonalMention: boolean;
  hasChannelMention: boolean;
  hasTeamMention: boolean;
  hasUnreadMessage: boolean;
  isNewForUser: boolean;
};

// Define Team type
type Team = {
  id: string;
  name: string;
  activityStatus: ActivityStatus;
};


const resolvers = {
  Query: {
    teams: () => teams,
  },
  Mutation: {
    updateTeamStatus: (
      _parent: any,
      { id, hasUnreadMessage }: { id: string; hasUnreadMessage: boolean }
    ): Team | undefined => {
      const team = teams.find((team) => team.id === id);
      if (team) {
        team.activityStatus.hasUnreadMessage = hasUnreadMessage;
      }
      return team;
    },
    markTeamAsRead: (_parent: any, { id }: { id: string }): Team | undefined => {
      const team = teams.find((team) => team.id === id);
      if (team) {
        team.activityStatus.hasUnreadMessage = false;
      }
      return team;
    },
  },
};

// Setup Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// Setup Express App
const app = express();

// Apply Apollo GraphQL middleware
server.start().then(() => {
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () => {
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
  });
});


// import express from 'express';
// import { ApolloServer } from 'apollo-server-express';
// import { readFileSync } from 'fs';
// import { resolve } from 'path';
// import { gql } from 'graphql-tag';

// // Define ActivityStatus type
// type ActivityStatus = {
//   hasPersonalMention: boolean;
//   hasChannelMention: boolean;
//   hasTeamMention: boolean;
//   hasUnreadMessage: boolean;
//   isNewForUser: boolean;
// };

// // Define Team type
// type Team = {
//   id: string;
//   name: string;
//   activityStatus: ActivityStatus;
// };

// // Load GraphQL Schema
// const typeDefs = gql(
//   readFileSync(resolve(__dirname, './graphql/schema.graphql'), {
//     encoding: 'utf8',
//   })
// );

// // Sample data
// let teams: Team[] = [
//   {
//     id: '1',
//     name: 'Team Alpha',
//     activityStatus: {
//       hasPersonalMention: true,
//       hasChannelMention: false,
//       hasTeamMention: false,
//       hasUnreadMessage: true,
//       isNewForUser: true,
//     },
//   },
//   {
//     id: '2',
//     name: 'Team Beta',
//     activityStatus: {
//       hasPersonalMention: false,
//       hasChannelMention: true,
//       hasTeamMention: true,
//       hasUnreadMessage: false,
//       isNewForUser: false,
//     },
//   },
// ];

// const resolvers = {
//   Query: {
//     teams: (): Team[] => teams,
//   },
//   Mutation: {
//     updateTeamStatus: (
//       _parent: any,
//       { id, hasUnreadMessage }: { id: string; hasUnreadMessage: boolean }
//     ): Team | undefined => {
//       const team = teams.find((team) => team.id === id);
//       if (team) {
//         team.activityStatus.hasUnreadMessage = hasUnreadMessage;
//       }
//       return team;
//     },
//     markTeamAsRead: (_parent: any, { id }: { id: string }): Team | undefined => {
//       const team = teams.find((team) => team.id === id);
//       if (team) {
//         team.activityStatus.hasUnreadMessage = false;
//       }
//       return team;
//     },
//   },
// };

// // Setup Apollo Server
// const server = new ApolloServer({ typeDefs, resolvers });

// // Setup Express App
// const app = express();

// // Apply Apollo GraphQL middleware
// server.start().then(() => {
//   server.applyMiddleware({ app });

//   app.listen({ port: 4000 }, () => {
//     console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
//   });
// });
