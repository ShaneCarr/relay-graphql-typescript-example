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

Node.js (>= 14.x recommended)
npm (comes with Node.js) or yarn (optional)
TypeScript (installed globally with npm install -g typescript or locally per project)
ts-node (installed globally with npm install -g ts-node or locally per project)

Dependencies

Server Dependencies
Install the server-side dependencies using npm:

cd src
npm install


Dependencies for the server include:

express: Web framework for Node.js
apollo-server-express: Apollo Server integration with Express
graphql: JavaScript implementation of GraphQL
graphql-tag: A library to parse GraphQL queries
Client Dependencies
Install the client-side dependencies using npm:

cd client
npm install

Dependencies for the client include:

react: JavaScript library for building user interfaces
react-dom: React package for working with the DOM
react-relay: Relay hooks and components for React
relay-runtime: Core runtime for Relay
typescript: TypeScript language support
@types/react, @types/react-dom: TypeScript type definitions for React



Running the Project

Step 1: Start the Server
Navigate to the server directory and start the server using ts-node:

bash
Copy code
cd src
npx ts-node server.ts
The server will start and listen on port 4000. You should see the following output:

arduino
Copy code
Server ready at http://localhost:4000/graphql
Step 2: Start the Client
In a separate terminal, navigate to the client directory and start the client:

bash
Copy code
cd client
npm start
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

