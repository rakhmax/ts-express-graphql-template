import { Schema, model } from 'mongoose';

const UserSchema: Schema = new Schema({
  firstname: String,
  lastname: String,
  username: String,
  email: { 
    type: String, 
    unique: true 
  },
  password: String
}, { timestamps: true });

UserSchema.set('toJSON', { virtuals: true });

export const User = model("User", UserSchema);
