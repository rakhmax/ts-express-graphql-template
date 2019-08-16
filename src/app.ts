import express from 'express';
import cors from 'cors';
import compression from 'compression';
import { ApolloServer } from 'apollo-server-express';
import database from './utils/database';
import { APP_MODE, PORT } from './utils/config';
import schema from './graphql/schema';

const app = express();

const server = new ApolloServer({
  schema
});

app
  .use(cors())
  .use(compression())

server.applyMiddleware({ app });

database
  .then(() => {
    console.clear()
    app.listen(PORT, () => console.log(`\nGraphQL is now running on http://localhost:${PORT}/graphql in ${APP_MODE} mode`))
  })
  .catch(error => {
    console.error('Unable to connect to database\n');
    console.error(error);
    process.exit(1);
  })

export default app;