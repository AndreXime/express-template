/**
 * @openapi
 * /posts:
 *   post:
 *     summary: Cria um novo post
 *     description: Cria um novo post associado ao usuário autenticado.
 *     tags:
 *       - Posts
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - conteudo
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: Meu primeiro post
 *               conteudo:
 *                 type: string
 *                 example: Conteúdo do meu post...
 *     responses:
 *       '200':
 *         description: Post criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Post criado com sucesso
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "cln4a9p8z0000tkv8q1q2q3r4"
 *       '400':
 *         description: Dados inválidos (faltando título ou conteúdo)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Os campos titulo e conteudo são obrigatórios
 *       '401':
 *         description: Não autenticado (cookie JWT ausente/inválido)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Acesso não autorizado
 *       '500':
 *         description: Erro interno ao criar o post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Falha ao criar post
 */

/**
 * @openapi
 * /posts/{id}:
 *   delete:
 *     summary: Exclui um post específico
 *     description: |
 *       Exclui um post existente.
 *       Requer que o usuário seja o autor do post.
 *     tags:
 *       - Posts
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do post a ser excluído
 *         example: "cln4a9p8z0000tkv8q1q2q3r4"
 *     responses:
 *       '200':
 *         description: Post excluído com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Post deletado com sucesso
 *       '401':
 *         description: |
 *           Não autenticado (cookie JWT ausente/inválido) ou
 *           usuário não é o autor do post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Post não encontrado ou você não tem permissão
 *       '404':
 *         description: Post não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Post não encontrado ou você não tem permissão
 */

/**
 * @openapi
 * /posts:
 *   get:
 *     summary: Lista todos os posts
 *     description: |
 *       Retorna uma lista de posts paginada.
 *       Pode ser filtrada por autor e possui um limite máximo de resultados.
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *           maximum: 100  # Assumindo que LIMITE_MAXIMO seja 100
 *         description: Número máximo de posts a serem retornados
 *       - in: query
 *         name: autor
 *         schema:
 *           type: string
 *         description: Filtra posts por nome do autor
 *         example: "João Silva"
 *     responses:
 *       '200':
 *         description: Lista de posts retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Posts encontrados com sucesso
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "cln4a9p8z0000tkv8q1q2q3r4"
 *                       titulo:
 *                         type: string
 *                         example: "Título do post"
 *                       conteudo:
 *                         type: string
 *                         example: "Conteúdo do post..."
 *                       author:
 *                         type: object
 *                         properties:
 *                           nome:
 *                             type: string
 *                             example: "João Silva"
 *       '404':
 *         description: Nenhum post encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Nenhum post encontrado
 *       '500':
 *         description: Erro interno ao buscar posts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Erro interno ao buscar posts
 */

/**
 * @openapi
 * /posts/{id}:
 *   get:
 *     summary: Obtém um post específico
 *     description: Retorna os detalhes de um post específico pelo seu ID, incluindo informações do autor.
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do post a ser recuperado
 *         example: "cln4a9p8z0000tkv8q1q2q3r4"
 *     responses:
 *       '200':
 *         description: Post encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Post encontrado com sucesso
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "cln4a9p8z0000tkv8q1q2q3r4"
 *                     titulo:
 *                       type: string
 *                       example: "Título do post"
 *                     conteudo:
 *                       type: string
 *                       example: "Conteúdo completo do post..."
 *                     author:
 *                       type: object
 *                       properties:
 *                         nome:
 *                           type: string
 *                           example: "João Silva"
 *       '400':
 *         description: ID do post não fornecido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: ID do post é obrigatório
 *       '404':
 *         description: Post não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Post não encontrado
 *       '500':
 *         description: Erro interno ao buscar o post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Erro interno ao buscar post
 */

/**
 * @openapi
 * /posts/{id}:
 *   patch:
 *     summary: Atualiza um post existente
 *     description: |
 *       Atualiza um post específico.
 *       Requer que o usuário seja o autor do post.
 *     tags:
 *       - Posts
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do post a ser atualizado
 *         example: "cln4a9p8z0000tkv8q1q2q3r4"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: Novo título do post
 *                 example: "Título atualizado"
 *               conteudo:
 *                 type: string
 *                 description: Novo conteúdo do post
 *                 example: "Conteúdo atualizado..."
 *     responses:
 *       '200':
 *         description: Post atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Post atualizado com sucesso
 *       '400':
 *         description: |
 *           Bad Request (quando faltar ID ou post não existir)
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: ID do post é obrigatório
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: Esse post não existe
 *       '401':
 *         description: Não autorizado (usuário não é o autor)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Você não tem permissão para atualizar este post
 */
