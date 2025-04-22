import { Posts } from '../../db/models.js';
import tryCatch from '../../lib/tryCatch.js';
import type { Request, Response } from 'express';

const createPost = async (req: Request, res: Response): Promise<void> => {
	const { titulo, conteudo } = req.body;

	const { data, error } = await tryCatch(
		Posts.create({
			data: { titulo, conteudo, author: { connect: { id: req.userId } } },
			select: { id: true },
		})
	);

	if (error) {
		res.status(500).json({ message: 'Falha ao criar post' });
		return;
	}

	res.status(200).json({ message: 'Post criado com sucesso', data });
};

export default createPost;
