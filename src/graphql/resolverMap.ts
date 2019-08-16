import { IResolvers } from 'graphql-tools';
import os from 'os';

import { 
  mutations as userMutation, 
  queries as userQuery 
} from './resolvers/user';

const resolverMap: IResolvers = {
  Query: {
    getHost: () => {
      return os.hostname();
    },
    ...userQuery
  },
  Mutation: {
    ...userMutation
  }
}

export default resolverMap;