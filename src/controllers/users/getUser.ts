import type { Request, Response } from 'express';
import { Users } from '../..//db/models.js';
import tryCatch from '../..//lib/tryCatch.js';

const getUser = async (req: Request, res: Response): Promise<void> => {
	const { data, error } = await tryCatch(
		Users.findUnique({
			where: { id: req.userId },
			select: { nome: true, email: true, updatedAt: true, createdAt: true },
		})
	);

	if (!data) {
		res.status(404).json({ message: 'Usuario não existe' });
		return;
	}

	if (error) {
		res.status(400).json({ message: 'Error ao procurar usuario' });
		return;
	}

	res.status(200).json({ message: 'Usuario encontrado', data });
};

export default getUser;
