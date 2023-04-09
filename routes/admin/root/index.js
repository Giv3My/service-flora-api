import express from 'express';

import * as rootAdminController from '../../../controllers/admin/rootAdmin.controller.js';

const router = express.Router();

router.post('/create-admin', rootAdminController.createAdmin);
// router.post('/create-root', adminController.createRootAdmin);

export default router;
