import { Schema } from 'mongoose';

import UserModel from './user.model.js';

const RootAdminSchema = new Schema({
  role: { type: String, default: 'root', required: true },
});

const AdminSchema = new Schema({
  cities: [{ type: String }],
  role: { type: String, default: 'admin', required: true },
});

export const RootAdminModel = UserModel.discriminator('RootAdmin', RootAdminSchema);

export const AdminModel = UserModel.discriminator('Admin', AdminSchema);
