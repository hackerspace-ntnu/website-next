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

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV SKIP_ENV_VALIDATION=true

# Set environment variables during the build
ARG NEXT_PUBLIC_SITE_URL
ARG DATABASE_USER
ARG DATABASE_PASSWORD
ARG DATABASE_HOST
ARG DATABASE_PORT
ARG DATABASE_NAME

ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV DATABASE_USER=$DATABASE_USER
ENV DATABASE_PASSWORD=$DATABASE_PASSWORD
ENV DATABASE_HOST=$DATABASE_HOST
ENV DATABASE_PORT=$DATABASE_PORT
ENV DATABASE_NAME=$DATABASE_NAME

# Build the application
RUN bunx next build


# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV SKIP_ENV_VALIDATION=true

RUN addgroup --system --gid 1002 nodejs && \
  adduser --system --uid 1002 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next && chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

# server.js is created by next build from the standalone output
CMD ["bun", "run", "server.js"]
