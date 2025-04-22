import { Posts } from '../..//db/models.js';
import tryCatch from '../..//lib/tryCatch.js';
import type { Request, Response } from 'express';

const deletePost = async (req: Request, res: Response): Promise<void> => {
	const { id } = req.params;
	const { data, error } = await tryCatch(Posts.delete({ where: { id, authorId: req.userId } }));

	if (error || !data.id) {
		res.status(404).json({ message: 'Post não encontrado ou você não tem permissão' });
		return;
	}

	res.status(200).json({ message: 'Post deletado com sucesso' });
};

export default deletePost;
