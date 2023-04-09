import * as rootAdminService from '../../services/admin/rootAdmin.service.js';

import { success } from '../../helpers/constants/index.js';

export const createAdmin = async (req, res, next) => {
  try {
    const admin = await rootAdminService.createAdmin(req.body);

    return res.status(success.created).json(admin);
  } catch (e) {
    return next(e);
  }
};

// export const createRootAdmin = async (req, res, next) => {
//   try {
//     const admin = await userService.createRootAdmin(req.body);

//     return res.status(200).json(admin);
//   } catch (e) {
//     return next(e);
//   }
// };
