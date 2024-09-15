Relay GraphQL TypeScript Example

This project demonstrates a basic setup of a Relay GraphQL application using TypeScript. It includes both a server and a client to simulate the interaction between a GraphQL API and a Relay-powered React frontend.

Prerequisites

# Install core dependencies
npm install express apollo-server-express graphql-tag

# Install TypeScript and ts-node
npm install typescript ts-node

# Install type declarations (without @types/graphql-tag)
npm install @types/express @types/node --save-dev

# Install development dependencies (if needed)
npm install eslint prettier --save-dev


for client
npm install --save-dev babel-plugin-relay


Before you start, make sure you have the following installed:

- Node.js (>= 14.x recommended)
- npm (comes with Node.js) or yarn (optional)
- TypeScript (installed globally with 
- npm install -g typescript 
- or locally per project)
- ts-node (installed globally with 
- npm install -g ts-node 
- r locally per project)

## Dependencies

### Server Dependencies
- Install the server-side dependencies using npm:

cd src
npm install


- Dependencies for the server include:

- express: Web framework for Node.js
- apollo-server-express: Apollo Server integration with Express 
- graphql: JavaScript implementation of GraphQL 
- graphql-tag: A library to parse GraphQL queries 
- Client Dependencies 
- Install the client-side dependencies using npm:

cd client
npm install

## Dependencies for the client include:

- react: JavaScript library for building user interfaces 
- react-dom: React package for working with the DOM
- react-relay: Relay hooks and components for React
- relay-runtime: Core runtime for Relay
- typescript: TypeScript language support
- @types/react, @types/react-dom: TypeScript type definitions for React
  npm install @mui/material @emotion/react @emotion/styled



### Running the Project

### Step 1: Start the Server
- Navigate to the server directory and start the server using ts-node:

```bash
Copy code
cd src
npx ts-node server.ts
```
- The server will start and listen on port 4000. You should see the following output:

```bash
Server ready at http://localhost:4000/graphql
```
Step 2: Start the Client
In a separate terminal, navigate to the client directory and start the client:
```graphql
query ExampleQuery {
  teams {
    id,
    activityStatus {
      hasChannelMention
    }, 
    name
  }
}

```

```bash

cd client
npm start
````

This will start the React application, and it should open in your browser at http://localhost:3000.

Step 3: Interacting with the App
In the browser, you will see a list of teams with their unread message status.
Clicking on a team's name will trigger a mutation that updates the hasUnreadMessage field to false, causing the team's name to no longer be bold.
Project Structure

src/server.ts: The server code that sets up an Express server with Apollo Server to serve the GraphQL API.
src/graphql/schema.graphql: The GraphQL schema defining the types, queries, and mutations.
client/src/App.tsx: The main React component that queries and mutates the GraphQL data using Relay.
client/src/RelayEnvironment.ts: The Relay environment configuration for making GraphQL requests.
Troubleshooting

If you encounter issues, consider the following:

Ensure both the server and client are running in separate terminals.
Verify that the GraphQL server is accessible at http://localhost:4000/graphql.
Check the console output in both the terminal and the browser for any error messages.
Additional Notes

This project uses Relay to manage GraphQL data on the client side. Ensure that your Relay queries are correctly defined and that the generated files (in __generated__) are up-to-date.
TypeScript types are automatically generated for GraphQL queries and mutations. If you make changes to the schema or queries, run the Relay compiler to regenerate these types:
bash
Copy code
npx relay-compiler


NODE_NO_WARNINGS=1 npx ts-node src/server.ts


```bash

#!/bin/bash

# Script: setup.sh
# Purpose: Set up environment, install dependencies, and configure a Relay GraphQL TypeScript project.

# Step 1: Install nvm (Node Version Manager) if not already installed
echo "Installing nvm..."
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
source ~/.bashrc

# Step 2: Install Node.js using nvm
echo "Installing Node.js version 16 using nvm..."
nvm install 16
nvm use 16

# Verify Node.js and npm installation
echo "Verifying Node.js and npm installation..."
node -v
npm -v

# Step 3: Set up project directory
echo "Setting up project directory..."
mkdir -p relay-graphql-typescript-example
cd relay-graphql-typescript-example

# Step 4: Initialize a new Node.js project
echo "Initializing new Node.js project..."
npm init -y

# Step 5: Install necessary dependencies
echo "Installing project dependencies..."
npm install apollo-server-express express graphql graphql-tag

# Step 6: Install development dependencies
echo "Installing development dependencies..."
npm install --save-dev @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript @types/express @types/node babel-loader eslint nodemon prettier relay-compiler ts-node typescript webpack webpack-cli webpack-dev-server

# Step 7: Set up project structure
echo "Setting up project structure..."
mkdir -p src/graphql client/src
touch src/server.ts client/src/index.tsx client/relay.config.json client/tsconfig.json webpack.config.js

# Populate basic files with boilerplate content
echo "Populating basic files with boilerplate content..."

# tsconfig.json
cat <<EOT > tsconfig.json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "jsx": "react",
    "strict": true,
    "moduleResolution": "node",
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*.ts", "src/**/*.tsx"]
}
EOT

# webpack.config.js
cat <<EOT > webpack.config.js
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './client/src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
};
EOT

# server.ts
cat <<EOT > src/server.ts
import { ApolloServer } from 'apollo-server-express';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { gql } from 'graphql-tag';
import express, { Application } from 'express';

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
const app: Application = express();

// Apply Apollo GraphQL middleware
server.start().then(() => {
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () => {
    console.log(\`Server ready at http://localhost:4000\${server.graphqlPath}\`);
  });
});
EOT

# Step 8: Final output
echo "Setup complete! Your project is ready."
echo "Run 'npm run start' to start the GraphQL server."

```



````bash
#!/bin/bash
# Project Setup Instructions

# 1. Install Node Version Manager (nvm)
# This command downloads and installs nvm, which is used to manage Node.js versions
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
source ~/.bashrc

# 2. Install Node.js Using nvm
# This command installs Node.js version 18 and sets it as the active version
nvm install 18
nvm use 18

# 3. Install npm (If Needed)
# This command updates npm to the latest version (optional, only if necessary)
npm install -g npm@latest

# 4. Install Project Dependencies
# Run this command in the root directory to install all necessary dependencies
npm install

# 5. Running the Server
# Start the GraphQL server from the project root
ts-node src/server.ts

# 6. Running the Client
# Navigate to the client directory, install dependencies if not already done, and start the client application
cd client
npm install  # Only run if dependencies are not already installed
npm start

````

