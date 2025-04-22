import type { Request, Response } from 'express';
import { Users } from '../..//db/models.js';
import tryCatch from '../..//lib/tryCatch.js';

const updateUser = async (req: Request, res: Response): Promise<void> => {
	const { nome, email, senha } = req.body;

	const { error } = await tryCatch(
		Users.update({
			where: { id: req.userId },
			data: {
				nome,
				email,
				senha,
			},
		})
	);

	if (error) {
		res.status(500).json({ message: 'Erro ao atualizar' });
		return;
	}

	res.status(200).json({ message: 'Usuario atualizado com sucesso' });
};

export default updateUser;
