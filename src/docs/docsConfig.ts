import type { Express } from 'express';

async function setupSwagger(app: Express) {
	const swaggerUi = await import('swagger-ui-express');
	const swaggerJSDoc = await import('swagger-jsdoc');

	const swaggerSpec = swaggerJSDoc.default({
		definition: {
			openapi: '3.0.0',
			info: {
				title: 'Api Template',
				version: '1.0.0',
			},
			servers: [{ url: 'http://localhost:4000' }],
		},
		apis: ['./src/docs/*.ts'],
	});

	app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

	console.log('Documentação inicializada em /api-docs\n');
}

export { setupSwagger };
