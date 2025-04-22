/**
 * @openapi
 * /users:
 *   delete:
 *     summary: Exclui a conta do usuário autenticado
 *     description: |
 *       Remove permanentemente a conta do usuário que está autenticado.
 *       Requer autenticação via cookie JWT.
 *     tags:
 *       - Usuários
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       '200':
 *         description: Usuário excluído com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario deletado com sucesso
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *             description: Cookie de autenticação é invalidado/apagado
 *       '400':
 *         description: Falha ao excluir usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Não foi possivel deletar
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 */

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Obtém os dados do usuário autenticado
 *     description: Retorna as informações do perfil do usuário atualmente autenticado
 *     tags:
 *       - Usuários
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       '200':
 *         description: Dados do usuário retornados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario encontrado
 *                 data:
 *                   type: object
 *                   properties:
 *                     nome:
 *                       type: string
 *                       example: João Silva
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: joao@exemplo.com
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-01-01T00:00:00Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-01-02T00:00:00Z"
 *       '400':
 *         description: Erro ao buscar usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error ao procurar usuario
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '404':
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario não existe
 */

/**
 * @openapi
 * /users:
 *   patch:
 *     summary: Atualiza os dados do usuário autenticado
 *     description: Permite a atualização parcial dos dados do usuário logado
 *     tags:
 *       - Usuários
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 nullable: true
 *                 example: "Novo Nome"
 *               email:
 *                 type: string
 *                 format: email
 *                 nullable: true
 *                 example: "novo@email.com"
 *               senha:
 *                 type: string
 *                 format: password
 *                 nullable: true
 *                 example: "novaSenha123"
 *     responses:
 *       '200':
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario atualizado com sucesso
 *       '400':
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Pelo menos um campo deve ser fornecido para atualização
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '409':
 *         description: Conflito (email já em uso)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Este email já está em uso
 *       '500':
 *         description: Erro interno ao atualizar usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Erro ao atualizar
 */
