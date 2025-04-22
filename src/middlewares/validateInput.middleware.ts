import type { Request, Response, NextFunction } from 'express';
import { validateFields, validateEmail, validateString } from '../lib/validators.js';

type SchemaNomes = 'loginUser' | 'registerUser' | 'createPost';

export default function validateInput(schemaNome: SchemaNomes) {
	return (req: Request, res: Response, next: NextFunction): void => {
		const schema = schemas[schemaNome];

		if (!req.body || typeof req.body !== 'object') {
			res.status(400).json({ message: 'A requisição deve ser um objeto válido.' });
			return;
		}
		try {
			const errors = schema(req.body);
			if (errors.length > 0) {
				res.status(400).json({ message: errors.join(' - ') });
				return;
			}
		} catch {
			res.status(400).json({ message: 'Erro ao validar os dados' });
			return;
		}
		next();
	};
}

type SchemaType = Record<string, (data: Record<string, unknown>) => string[]>;

const schemas: SchemaType = {
	registerUser: (data) => [
		...validateFields(data, ['email', 'senha', 'nome']),
		...validateEmail('email', data.email),
		...validateString('senha', data.senha, 6),
		...validateString('nome', data.nome, 6),
	],
	loginUser: (data) => [
		...validateFields(data, ['email', 'senha']),
		...validateEmail('email', data.email),
		...validateString('senha', data.senha, 6),
	],
	createPost: (data) => [
		...validateFields(data, ['titulo', 'conteudo']),
		...validateString('titulo', data.titulo, 6),
		...validateString('conteudo', data.conteudo, 25),
	],
};
