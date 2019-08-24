import 'graphql-import-node';
import { makeExecutableSchema } from "graphql-tools";
import { GraphQLSchema } from 'graphql';
import resolvers from './resolverMap';
import * as rootTypeDefs from './schema.gql';
import * as userTypeDefs from './schemas/user.gql';

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs: [
    rootTypeDefs,
    userTypeDefs
  ],
  resolvers
});

export default schema;