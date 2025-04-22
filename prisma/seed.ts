import { PrismaClient } from '@prisma/client';
import argon2 from 'argon2';

const ARGON_SECRET = Buffer.from(process.env.ARGON2_KEY || '123');

const ARGON_OPTIONS = {
	type: argon2.argon2id,
	memoryCost: 19456, // 19MB (recomendado OWASP)
	timeCost: 2, // (recomendado OWASP)
	parallelism: 1,
	secret: ARGON_SECRET,
	hashLength: 32, // Tamanho do hash em bytes
};

const prisma = new PrismaClient();
const { user } = prisma;

async function main() {
	await prisma.user.deleteMany({ where: {} });
	const senha = await argon2.hash('senha123', ARGON_OPTIONS);
	await user.createMany({
		data: [
			{
				nome: 'Usuario1',
				email: 'email@email.com',
				senha: senha,
			},
		],
	});
}
try {
	await main();
	console.log('Seed ocorreu com sucesso');
} catch {
	console.log('Ocorreu um erro na seed mas o processo continuara');
}

await prisma.$disconnect();
