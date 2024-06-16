import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
  email: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  address?: string;
  dateOfBirth?: Date;
  interestedProducts?: string[];
  occupation?: string;
  googleId?: string;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  phoneNumber: { type: String },
  address: { type: String },
  dateOfBirth: { type: Date },
  interestedProducts: [{ type: String }],
  occupation: { type: String },
  googleId: { type: String },
});

const User = model<IUser>('User', userSchema);

export default User;