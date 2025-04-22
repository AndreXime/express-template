import { Router } from 'express';

import getUser from '../controllers/users/getUser.js';
import updateUser from '../controllers/users/updateUser.js';
import deleteUser from '../controllers/users/deleteUser.js';

import { verifyAuth } from '../middlewares/index.js';
import { catchAsync } from '../middlewares/errorHandler.middleware.js';

const router = Router();

router.get('/', verifyAuth, catchAsync(getUser));
router.patch('/', verifyAuth, catchAsync(updateUser));
router.delete('/', verifyAuth, catchAsync(deleteUser));

export default router;
