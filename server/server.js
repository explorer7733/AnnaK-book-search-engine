const express = require('express');
const path = require('path');

const { AppoloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;
// Apollo server setup
const server = new AppoloServer({
  typeDefs,
  resolvers,
});
const startApolloServer = async () => {
  await server.start(); // start Apollo server
// Apply the Apollo GraphQL middleware and set the path to /graphql
  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: authMiddleware,
    })
  );
};
startApolloServer();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
