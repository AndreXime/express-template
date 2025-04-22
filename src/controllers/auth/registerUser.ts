import { Request, Response } from 'express';
import { Users } from '../../db/models.js';
import { generateToken } from '../../middlewares/index.js';
import argon2 from 'argon2';
import { ARGON_OPTIONS, COOKIE_OPTIONS } from '../../config.js';
import tryCatch from '../../lib/tryCatch.js';

const registerUser = async (req: Request, res: Response): Promise<void> => {
	const { email, senha, nome } = req.body;

	const senhaHashed = await argon2.hash(senha, ARGON_OPTIONS);

	const { data, error } = await tryCatch(
		Users.create({
			data: { email, senha: senhaHashed, nome },
			select: { id: true },
		})
	);

	if (error) {
		res.status(401).json({ message: 'Esse usuario já existe' });
		return;
	}

	const token = generateToken(data.id);

	res.cookie('token', token, COOKIE_OPTIONS);
	res.status(200).json({ message: 'Registrado com sucesso' });
};

export default registerUser;
