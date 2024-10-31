import { trpc } from '@/server/api/trpc';

const timingMiddleware = trpc.middleware(async ({ next, path }) => {
  const start = Date.now();

  if (trpc._config.isDev) {
    const waitMs = Math.floor(Math.random() * 400) + 100;
    await new Promise((resolve) => setTimeout(resolve, waitMs));
  }

  const result = await next();

  const end = Date.now();
  console.log(`[TRPC] ${path} took ${end - start}ms to execute`);

  return result;
});

const publicProcedure = trpc.procedure.use(timingMiddleware);

export { publicProcedure };
