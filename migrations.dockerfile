FROM imbios/bun-node:22-slim

WORKDIR /app

COPY package.json bun.lock tsconfig.json ./
RUN bun install  --frozen-lockfile

COPY drizzle.config.ts ./
COPY src/server/db ./src/server/db
COPY src/env.ts ./src/env.ts
COPY .env ./.env

CMD bun run db:migrate && exit 0
