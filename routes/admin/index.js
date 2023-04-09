import express from 'express';

import * as adminController from '../../controllers/admin/admin.controller.js';

const router = express.Router();

router.post('/create-customer', adminController.createCustomer);

export default router;
