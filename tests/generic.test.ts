import request from 'supertest';

describe('Testando rotas genericas', () => {
	it('Deve responder com ping pong pra rota raiz', async () => {
		const response = await request('http://localhost:4000').get('/');
		// Responde message: ping pong
		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty('message', 'Ping pong');
	});

	it('Deve responder que uma rota não existe', async () => {
		const response = await request('http://localhost:4000').get('/udsaidbasu');

		expect(response.status).toBe(404);
		expect(response.body).toHaveProperty('message', 'Rota não encontrado');
	});
});
