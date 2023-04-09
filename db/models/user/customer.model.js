import { Schema } from 'mongoose';

import UserModel from './user.model.js';

const CustomerSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  owner_phone: { type: String, default: '' },
  shops: [{ type: String }],
});

const CustomerModel = UserModel.discriminator('Customer', CustomerSchema);

export default CustomerModel;
