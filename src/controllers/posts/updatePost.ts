import { Posts } from '../..//db/models.js';
import tryCatch from '../..//lib/tryCatch.js';
import type { Request, Response } from 'express';

const updatePost = async (req: Request, res: Response): Promise<void> => {
	const { id } = req.params;
	const { titulo, conteudo } = req.body;

	if (!id) {
		res.status(400).json({ message: 'ID do post é obrigatório' });
		return;
	}

	const { error } = await tryCatch(Posts.update({ where: { id, authorId: req.userId }, data: { titulo, conteudo } }));

	if (error) {
		res.status(400).json({ message: 'Esse post não existe' });
		return;
	}

	res.status(200).json({ message: 'Post atualizado com sucesso' });
};

export default updatePost;
