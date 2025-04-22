import { Posts } from '../..//db/models.js';
import tryCatch from '../..//lib/tryCatch.js';
import type { Request, Response } from 'express';

const getPosts = async (req: Request, res: Response): Promise<void> => {
	const { id } = req.params;

	if (!id) {
		res.status(400).json({ message: 'ID do post é obrigatório' });
		return;
	}

	const { data, error } = await tryCatch(
		Posts.findUnique({ where: { id }, include: { author: { select: { nome: true } } } })
	);

	if (error) {
		res.status(500).json({ message: 'Erro interno ao buscar post' });
		return;
	}

	if (!data) {
		res.status(404).json({ message: 'Post não encontrado' });
		return;
	}

	res.status(200).json({ message: 'Post encontrado com sucesso', data });
};

export default getPosts;
