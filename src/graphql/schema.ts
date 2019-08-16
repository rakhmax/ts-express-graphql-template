import 'graphql-import-node';
import { makeExecutableSchema } from "graphql-tools";
import { GraphQLSchema } from 'graphql';
import resolvers from './resolverMap';
import * as rootTypeDefs from './schema.graphql';
import * as userTypeDefs from './schemas/user.graphql';

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs: [
    rootTypeDefs,
    userTypeDefs
  ],
  resolvers
});

export default schema;