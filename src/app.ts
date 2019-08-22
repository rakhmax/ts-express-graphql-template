import express from 'express';
import cors from 'cors';
import compression from 'compression';
import bodyParser from "body-parser";
import { ApolloServer } from 'apollo-server-express';
import database from './utils/database';
import { APP_MODE, PORT } from './utils/config';
import schema from './graphql/schema';
import isAuth from './middleware/isAuth';

const app: express.Application = express();

const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    return req;
  }
});

app
  .use(bodyParser.json())
  .use(cors())
  .use(compression())
  .use(isAuth)

server.applyMiddleware({ app });

database
  .then(() => {
    console.clear();
    app.listen(PORT, () => console.log(`GraphQL is now running on http://localhost:${PORT}/graphql in ${APP_MODE} mode`));
  })
  .catch(error => {
    console.error('Unable to connect to database\n');
    console.error(error);
    process.exit(1);
  })

export default app;