import type { Request, Response } from 'express';
import { Users } from '../..//db/models.js';
import tryCatch from '../..//lib/tryCatch.js';

const deleteUser = async (req: Request, res: Response): Promise<void> => {
	const { error } = await tryCatch(Users.delete({ where: { id: req.userId } }));

	if (error) {
		res.status(400).json({ message: 'Não foi possivel deletar' });
		return;
	}

	res.status(200).json({ message: 'Usuario deletado com sucesso' });
};

export default deleteUser;
