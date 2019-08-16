import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../../models/User';

interface IUser {
  userId: String
  firstname: String
  lastname: String
  username: String
  email: String
  password: String
  userInput: Object
}

export const mutations = {
  createUser: async (_: void, args: IUser): Promise<{}> => {
    try {
      args = JSON.parse(JSON.stringify(args)).userInput;

      const user = await User.findOne({ username: args.username });

      if (user) {
        throw new Error('User already exists.');
      }

      args.password = await bcrypt.hash(args.password, 10);

      const res: {} = await User.create(args);

      return res;
    } catch (error) {
      throw error;
    }
  },

  updateUser: async (_: void, args: IUser): Promise<{}> => {
    try {
      args = JSON.parse(JSON.stringify(args));

      const res: {} = await User.findByIdAndUpdate(args.userId, args.userInput, { new: true });

      if(!res) {
        throw new Error('Could not update user data.');
      }

      return res;
    } catch (error) {
      throw error;
    }
  },

  deleteUser: async (_: void, args: IUser): Promise<{}> => {
    try {
      const res: {} = await User.findByIdAndDelete(args.userId);

      if(!res) {
        throw new Error('Could not delete user.');
      }

      return res;
    } catch (error) {
      throw error;
    }
  }
}

export const queries = {
  getAuthData: async (_: void, args: IUser): Promise<{}> => {
    try {
      const user: any = await User.findOne({ username: args.username });

      if (!user) {
        throw new Error('User does not exist.');
      }

      const isPasswordCorrect: Boolean = await bcrypt.compare(args.password, user.password);

      if (!isPasswordCorrect) {
        throw new Error("Password is incorrect!");
      }

      const token: String = jwt.sign(
        { userId: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: `1h` });

      return { userId: user.id, token: token, tokenExpiration: 1 };
    } catch (error) {
      throw error;
    }
  }
}