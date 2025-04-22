# Express API Template

API RESTful em **TypeScript** com **Express 5**, padrões modernos e boa escalabilidade.

---

## 🛠️ Tecnologias e Dependências

- **Language & Runtime**

  - `typescript`
  - `ts-node`, `ts-jest`

- **Framework & Middlewares**

  - `express@^5.0.0`
  - `cors`, `cookie‑parser`
  - Logger: `logger.middleware.ts`
  - Tratamento de erros: `errorHandler.middleware.ts`
  - Validação de entrada: `validateInput.middleware.ts`

- **Banco de Dados**

  - ORM: `@prisma/client` + CLI `prisma`
  - Driver Postgres: `pg`

- **Autenticação & Segurança**

  - Hash de senhas: `argon2`
  - JWT: `jsonwebtoken` + `auth.middleware.ts`

- **Documentação**

  - OpenAPI via `swagger-jsdoc` + `swagger-ui-express`

- **Testes**

  - Runner: `jest` + `ts-jest` + `jest-extended`
  - Integração: `supertest`

- **Devtools & Lint**
  - `eslint` + `@typescript-eslint`
  - `nodemon`
  - `dotenv`

---
