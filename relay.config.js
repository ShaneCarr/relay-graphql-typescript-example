module.exports = {
  src: './client/src', // Point to the source where your Relay queries live
  schema: './src/graphql/schema.graphql', // Point to the GraphQL schema
  language: 'typescript', // Specify TypeScript for the generated files
  artifactDirectory: './client/src/__generated__', // This is where generated files will go
  exclude: ['**/node_modules/**', '**/__mocks__/**', '**/__generated__/**'],
};
