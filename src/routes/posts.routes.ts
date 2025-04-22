import { Router } from 'express';
import { validateInput, verifyAuth } from '../middlewares/index.js';

import createPost from '../controllers/posts/createPost.js';
import updatePost from '../controllers/posts/updatePost.js';
import deletePost from '../controllers/posts/deletePost.js';
import getPost from '../controllers/posts/getPost.js';
import { catchAsync } from '../middlewares/errorHandler.middleware.js';

const router = Router();

router
	.get('/', catchAsync(getPost))
	.get('/:id', catchAsync(getPost))
	.post('/', validateInput('createPost'), verifyAuth, catchAsync(createPost))
	.patch('/:id', validateInput('createPost'), verifyAuth, catchAsync(updatePost))
	.delete('/:id', verifyAuth, catchAsync(deletePost));

export default router;
