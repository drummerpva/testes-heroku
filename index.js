// require('dotenv/config');
// const { ApolloServer } = require('apollo-server');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { importSchema } = require('graphql-import');
const resolvers = require('./resolvers');
const context = require('./config/context');

const schemaPath = './schema/index.graphql';
const app = express();

const port = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs: importSchema(schemaPath),
  resolvers,
  context,
  playground: true,
  introspection: true,
  cors: {
    origin: '*',
  },
});

app.get('/', (req, res) => {
  res.send('Hello Nodejs!' + process.env.PORT);
});

server.applyMiddleware({ app });

app.listen(port, err => {
  if (!err) console.log('Apollo server on');
  else console.log(err);
});
