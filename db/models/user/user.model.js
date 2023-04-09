import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user', required: true },
});

const UserModel = model('User', UserSchema);

export default UserModel;
