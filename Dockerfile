FROM imbios/bun-node:22-slim AS base

# Install dependencies only when needed
FROM base AS deps

WORKDIR /app

ENV NODE_ENV=production

# Install dependencies
COPY package.json bun.lockb ./
RUN bun install  --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV CI=true
ENV NODE_ENV=production
ENV SKIP_ENV_VALIDATION=true

# Build the application
RUN bun run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV CI=true
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=true
ENV SKIP_ENV_VALIDATION=true

RUN addgroup --system --gid 1002 nodejs && \
  adduser --system --uid 1002 nextjs

# Set the correct permission for prerender cache
RUN mkdir .next && chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

USER nextjs

EXPOSE 3000

# server.js is created by next build from the standalone output
CMD ["bun", "run", "server.js"]
