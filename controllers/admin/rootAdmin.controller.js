import * as rootAdminService from '../../services/admin/rootAdmin.service.js';

export const createAdmin = async (req, res) => {
  try {
    const admin = await rootAdminService.createAdmin(req.body);

    return res.status(200).json(admin);
  } catch (e) {
    return res.status(400).send(e.message);
  }
};

// export const createRootAdmin = async (req, res) => {
//   try {
//     const admin = await userService.createRootAdmin(req.body);

//     return res.status(200).json(admin);
//   } catch (e) {
//     return res.status(400).send(e.message);
//   }
// };
