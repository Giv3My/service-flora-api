import { hash } from 'bcrypt';

import { UserModel, CustomerModel } from '../../db/models/user/index.js';

import { getUserDto } from '../../helpers/index.js';

export const createCustomer = async (user) => {
  const candidate = await UserModel.findOne({
    email: user.email,
  });

  if (candidate) {
    throw new Error('User with this email address already exists');
  }

  const hashedPassword = await hash(user.password, 5);

  const newUser = await CustomerModel.create({
    ...user,
    password: hashedPassword,
  });

  return getUserDto(newUser);
};