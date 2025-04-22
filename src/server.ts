import express from 'express';
import cookieParser from 'cookie-parser';
import routes from './routes/index.routes.js';
import { middlewareLogger } from './middlewares/index.js';
import cors from 'cors';
import './lib/checkEnv.js';

const app = express();

app.use(
	cors({
		origin: process.env.CLIENT_DOMAIN,
		methods: ['GET', 'POST', 'PATCH', 'DELETE'],
		allowedHeaders: ['Content-Type', 'Authorization'],
		credentials: true,
	})
);

app.set('x-powered-by', false); // Desativa assinatura do express nas requisiçoes
app.set('trust proxy', 1); // Para lidar com proxies
app.use(middlewareLogger); // Mede o tempo de que o servidor demora em cada requisição
app.use(cookieParser()); // Para pode usar cookies entre o client e o server
app.use(express.json({ limit: '5mb' })); // Para entender requisições JSON
app.use(express.urlencoded({ extended: true, limit: '5mb' })); // Para entender dados de formulários

// Somente durante o desenvolvimento pode ter acesso a documentação
if (process.env.NODE_ENV !== 'production') {
	const { setupSwagger } = await import('./docs/docsConfig.js');
	await setupSwagger(app);
}

app.use('/', routes);

const port = Number(process.env.PORT) || 4000;
app.listen(port, '0.0.0.0', () => {
	console.log(`Servidor na porta ${port}\n`);
});
