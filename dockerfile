# Instancia somente para fazer build
FROM node:22-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install --frozen-lockfile

COPY tsconfig.json ./
COPY src ./src
COPY prisma ./prisma/

RUN npx prisma generate
RUN npm run build

# Instancia restrito para execução
FROM node:22-alpine AS runner

WORKDIR /app

COPY package*.json ./
RUN npm install --frozen-lockfile --omit=dev

COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist

CMD ["npm", "start"]