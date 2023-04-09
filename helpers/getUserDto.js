import { AdminDto, CustomerDto } from '../dtos/user.dto.js';

import { roles } from './constants/roles.js';

export const getUserDto = (user) => {
  switch (user.role) {
    case roles.root:
    case roles.admin:
      return new AdminDto(user);
    default:
      return new CustomerDto(user);
  }
};
