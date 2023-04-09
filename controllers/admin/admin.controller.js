import * as adminService from '../../services/admin/admin.service.js';

import { success } from '../../helpers/constants/index.js';

export const createCustomer = async (req, res, next) => {
  try {
    const user = await adminService.createCustomer(req.body);

    return res.status(success.created).json(user);
  } catch (e) {
    return next(e);
  }
};
