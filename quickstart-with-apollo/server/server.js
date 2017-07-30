import express from 'express';
import graphqlHTTP from 'express-graphql';
import cors from 'cors';

import schema from './schema';

const PORT = 8000;

const app = express();
app.use('/graphql', cors(), graphqlHTTP({
  schema: schema,
  graphiql: false
}));
app.listen(PORT);

console.log(`Running a GraphQL API server at localhost:${PORT}/graphql`);
