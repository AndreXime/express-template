import { Posts } from '../..//db/models.js';
import tryCatch from '../..//lib/tryCatch.js';
import type { Request, Response } from 'express';

const LIMITE_MAXIMO = 25;

const getAllPosts = async (req: Request, res: Response): Promise<void> => {
	const { limit = 10, autor } = req.query;

	// Pega todos os posts junto com o autor dentro do limite maximo e opcionalmente somente de um autor
	const queryOptions = {
		include: { author: { select: { nome: true } } },
		take: Number(limit) < LIMITE_MAXIMO ? Number(limit) : LIMITE_MAXIMO,
		...(autor && {
			where: { author: { nome: autor as string } },
		}),
	};

	const { data, error } = await tryCatch(Posts.findMany(queryOptions));

	if (error) {
		res.status(500).json({ message: 'Erro interno ao buscar posts' });
		return;
	}

	if (!data.length) {
		res.status(404).json({ message: 'Nenhum post encontrado' });
		return;
	}

	res.status(200).json({ message: 'Posts encontrado com sucesso', data });
};

export default getAllPosts;
