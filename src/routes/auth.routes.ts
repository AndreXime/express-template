import { Router } from 'express';
import { validateInput } from '../middlewares/index.js';

import loginUser from '../controllers/auth/loginUser.js';
import registerUser from '../controllers/auth/registerUser.js';
import { catchAsync } from '../middlewares/errorHandler.middleware.js';

const router = Router();

router.post('/login', validateInput('loginUser'), catchAsync(loginUser));
router.post('/register', validateInput('registerUser'), catchAsync(registerUser));

export default router;
