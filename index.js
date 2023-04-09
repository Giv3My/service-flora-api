import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import connectDB from './db/connectDB.js';

import { authRouter, rootAdminRouter, adminRouter } from './routes/index.js';

import {
  authMiddleware,
  checkRolesMiddleware,
  errorMiddleware,
} from './middlewares/index.js';

import { roles } from './helpers/constants/index.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/root', [authMiddleware, checkRolesMiddleware([roles.root])], rootAdminRouter);
app.use(
  '/admin',
  [authMiddleware, checkRolesMiddleware([roles.root, roles.admin])],
  adminRouter
);
app.use('/auth', authRouter);

app.use(errorMiddleware);

const start = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => console.log(`Server has been started on PORT: ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
