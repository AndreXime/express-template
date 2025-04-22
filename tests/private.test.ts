import request from 'supertest';

/* Contas existentes na seed  
nome: 'Usuario1',
email: 'email@email.com',
senha: senha */

const baseURL = 'http://localhost:4000';

describe('Testando Registro autenticação', () => {
	it('Deve responder um token ao se registrar', async () => {
		const input = { email: 'conta@email.com', senha: 'senha123', nome: 'Andre Xi' };

		const response = await request(baseURL).post('/auth/register').send(input);

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty('message', 'Registrado com sucesso');
		expect(response.headers['set-cookie']).toEqual(expect.arrayContaining([expect.stringContaining('token=')]));
	});

	it('Deve responder que negativo para uma conta que já existe', async () => {
		const inputbody = { email: 'conta@email.com', senha: 'senha123', nome: 'Nome que nao existe' };

		const response = await request(baseURL).post('/auth/register').send(inputbody);

		expect(response.status).toBe(401);
		expect(response.body).toHaveProperty('message', 'Esse usuario já existe');
	});
});

describe('Testando Login autenticação', () => {
	it('Deve responder um token se crendenciais corretas', async () => {
		const input = { email: 'conta@email.com', senha: 'senha123' };

		const response = await request(baseURL).post('/auth/login').send(input);

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty('message', 'Logado com sucesso');
		expect(response.headers['set-cookie']).toEqual(expect.arrayContaining([expect.stringContaining('token=')]));
	});

	it('Deve responder que crendeciais invalidas ao fazer login', async () => {
		const inputbody = { email: 'conta@email.com', senha: 'senhaErrada' };

		const response = await request(baseURL).post('/auth/login').send(inputbody);

		expect(response.status).toBe(401);
		expect(response.body).toHaveProperty('message', 'Credenciais inválidas');
	});
});
