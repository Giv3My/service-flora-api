import { hash } from 'bcrypt';

import { UserModel, AdminModel } from '../../db/models/user/index.js';

import { getUserDto } from '../../helpers/index.js';
import ApiError from './../../errors/api.errors.js';

export const createAdmin = async (user) => {
  const candidate = await UserModel.findOne({
    email: user.email,
  });

  if (candidate) {
    throw ApiError.BadRequest('Admin with this email address already exists');
  }

  const hashedPassword = await hash(user.password, 5);

  const newAdmin = await AdminModel.create({
    ...user,
    password: hashedPassword,
  });

  return getUserDto(newAdmin);
};
