FROM imbios/bun-node:20-slim

WORKDIR /app

COPY package.json bun.lockb ./

RUN bun install --production

COPY . .

ENV NODE_ENV=production
RUN bun run build

EXPOSE 3000

ENTRYPOINT [ "bun", "run", "start" ]