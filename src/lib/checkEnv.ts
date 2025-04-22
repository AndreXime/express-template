const requiredEnv = ['DATABASE_URL', 'ARGON_KEY', 'JWT_KEY', 'CLIENT_DOMAIN', 'NODE_ENV'];

const missing = requiredEnv.filter((key) => !process.env[key]);

if (missing.length > 0) {
	console.error(`Variáveis de ambiente faltando: ${missing.join(', ')}`);
	process.exit(1);
}
