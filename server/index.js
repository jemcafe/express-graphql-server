const express = require('express');
const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');

// Graphql schema
const schema = buildSchema(`
   type Query {
      message: String
   }
`);

// Resolver
const rootResolver = {
   message: () => 'Hey there!'
};

// server
const app = express();

// graphql endpoint
app.use('/graphql', express_graphql({
   schema: schema,
   rootValue: rootResolver,
   graphiql: true
}));

const port = 3040;
app.listen(port, () => console.log(`Listening on port: ${port}`));

