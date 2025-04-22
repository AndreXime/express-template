import { ChildProcess, execSync, spawn } from 'child_process';
import express from 'express';
export default async function globalSetup(): Promise<void> {
	console.log('\nIniciando servidor...\n');

	let serverProcess: ChildProcess;

	spawn('node', ['--no-warnings', '--loader', 'ts-node/esm', 'prisma/seed.ts']);

	serverProcess = spawn(
		'node',
		['--no-warnings', '--loader', 'ts-node/esm', '--require', 'dotenv/config', 'src/server.ts'],
		{ stdio: ['ignore', 'pipe', 'pipe'] }
	);

	// Atualmente o servidor leva 20 segundos com ts-node pra iniciar
	execSync('sleep 20');

	const app = express();
	const server = app.listen(3001, () => {});

	app.post('/shutdown', (_req, res) => {
		server.close(() => {
			if (serverProcess) {
				try {
					serverProcess.kill('SIGKILL'); // Mais agressivo, evita processos "zumbis"
				} catch (error) {
					console.error('Erro ao finalizar servidor:', error);
				}
			}
		});
		process.exit(0);
	});
}
