import { Request, Response } from 'express';
import { Users } from '../../db/models.js';
import { generateToken } from '../..//middlewares/index.js';
import { COOKIE_OPTIONS, ARGON_SECRET } from '../../config.js';
import argon2 from 'argon2';

const loginUser = async (req: Request, res: Response): Promise<void> => {
	const { email, senha } = req.body;

	const user = await Users.findUnique({ where: { email }, select: { id: true, senha: true } });

	const credenciaisValidas =
		user &&
		(await argon2.verify(user.senha, senha, {
			secret: ARGON_SECRET,
		}));

	if (!credenciaisValidas) {
		res.status(401).json({ message: 'Credenciais inválidas' });
		return;
	}

	const token = generateToken(user.id);
	res.cookie('token', token, COOKIE_OPTIONS);
	res.status(200).json({ message: 'Logado com sucesso' });
};

export default loginUser;
