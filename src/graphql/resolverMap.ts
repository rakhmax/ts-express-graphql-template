import { IResolvers } from 'graphql-tools';
import { mutations as userMutation } from './resolvers/user';

const resolverMap: IResolvers = {
  Query: {
    getHelloWorld: () => {
      return 'Hello World';
    }
  },
  Mutation: {
    ...userMutation
  }
}

export default resolverMap;