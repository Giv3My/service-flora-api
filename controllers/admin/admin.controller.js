import * as adminService from '../../services/admin/admin.service.js';

export const createCustomer = async (req, res) => {
  try {
    const user = await adminService.createCustomer(req.body);

    return res.status(200).json(user);
  } catch (e) {
    return res.status(400).send(e.message);
  }
};
