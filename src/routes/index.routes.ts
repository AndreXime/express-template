import { Router } from 'express';
import type { Response, Request } from 'express';
import authRoutes from './auth.routes.js';
import postsRouter from './posts.routes.js';
import usersRouter from './user.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', usersRouter);
router.use('/posts', postsRouter);

router.all('/', async (req: Request, res: Response) => {
	res.status(200).json({ message: 'Ping pong' });
});

router.use(async (req: Request, res: Response) => {
	res.status(404).json({ message: 'Rota não encontrado' });
});

router.use((err: unknown, req: Request, res: Response) => {
	res.status(500).json({ message: 'Erro interno do servidor' });
});

export default router;
