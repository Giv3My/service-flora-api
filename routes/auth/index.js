import express from 'express';

import * as authController from '../../controllers/auth.controller.js';

const router = express.Router();

router.post('/sign-in', authController.signIn);
router.post('/logout', authController.logout);
router.get('/refresh', authController.refreshTokens);

export default router;
