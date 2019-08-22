import bcrypt from 'bcrypt';
import { AuthenticationError, ValidationError ,UserInputError } from 'apollo-server-express'
import jwt from 'jsonwebtoken';
import { User } from '../../models/User';

interface IUser {
  userId: String
  firstname: String
  lastname: String
  username: String
  email: String
  password: String
  userInput: any
}

export const mutations = {
  createUser: async (_: void, { userInput }: IUser): Promise<{}> => {
    try {
      const user = await User.findOne({ username: userInput.username });

      if (user) {
        throw new UserInputError('User already exists.');
      }

      userInput.password = await bcrypt.hash(userInput.password, 10);

      const res: {} = await User.create(userInput);

      return res;
    } catch (error) {
      throw error;
    }
  },

  authUser: async (_: void, { userInput }: IUser): Promise<{}> => {
    try {
      const user: any = await User.findOne({ username: userInput.username });

      if (!user) {
        throw new UserInputError('User does not exist.');
      }

      const isPasswordCorrect: boolean = await bcrypt.compare(userInput.password, user.password);

      if (!isPasswordCorrect) {
        throw new UserInputError("Password is incorrect!");
      }

      const token: string = jwt.sign(
        { userId: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: `1h` }
      );

      return { userId: user.id, token: token, tokenExpiration: 1 };
    } catch (error) {
      throw error;
    }
  },

  updateUser: async (_: void, { userInput }: IUser, { isAuth, userId }: any): Promise<{}> => {
    if (!isAuth) {
      throw new AuthenticationError('Unauthorized');
    }

    try {
      const res: {} = await User.findByIdAndUpdate(userId, userInput, { new: true });

      if (!res) {
        throw new Error('Could not update user data.');
      }

      return res;
    } catch (error) {
      throw error;
    }
  },

  deleteUser: async (_: void, args: IUser, { isAuth, userId }: any): Promise<{}> => {
    if (!isAuth) {
      throw new AuthenticationError('Unauthorized');
    }

    try {
      const res: {} = await User.findByIdAndDelete(userId);

      if (!res) {
        throw new Error('Could not delete user.');
      }

      return res;
    } catch (error) {
      throw error;
    }
  }
}