FROM oven/bun:1

WORKDIR /app

COPY package.json bun.lockb ./

RUN bun install --frozen-lockfile --production

COPY . .

RUN bun run build

EXPOSE 3000

ENTRYPOINT [ "bun", "start" ]