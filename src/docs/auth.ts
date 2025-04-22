/**
 * @openapi
 * components:
 *   securitySchemes:
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: token
 *       description: Token JWT armazenado em cookie HTTP-only
 *
 *   responses:
 *     UnauthorizedError:
 *       description: Token inválido ou ausente
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Acesso não autorizado
 *
 */

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Realiza login do usuário
 *     description: Verifica as credenciais e retorna um cookie com JWT se forem válidas.
 *     tags:
 *       - Autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: usuario@exemplo.com
 *               senha:
 *                 type: string
 *                 format: password
 *                 example: senha123
 *     responses:
 *       '200':
 *         description: Logado com sucesso
 *         headers:
 *           Set-Cookie:
 *             description: Cookie de autenticação (JWT)
 *             schema:
 *               type: string
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logado com sucesso
 *       '400':
 *         description: Credenciais inválidas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Credenciais inválidas
 */

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Registra um novo usuário
 *     description: Cria uma nova conta de usuário com email, senha e nome, retornando um cookie com JWT.
 *     tags:
 *       - Autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *               - nome
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: novo.usuario@exemplo.com
 *               senha:
 *                 type: string
 *                 format: password
 *                 example: senhaSegura123
 *               nome:
 *                 type: string
 *                 example: João Silva
 *     responses:
 *       '200':
 *         description: Registrado com sucesso
 *         headers:
 *           Set-Cookie:
 *             description: Cookie de autenticação (JWT)
 *             schema:
 *               type: string
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Registrado com sucesso
 *       '401':
 *         description: Usuário já existe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Esse usuario já existe
 */
