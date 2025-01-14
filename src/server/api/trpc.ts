import type { createContext } from '@/server/api/context';
import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { ZodError } from 'zod';

type ToastType = 'info' | 'error' | 'warning' | 'success';

const trpc = initTRPC.context<typeof createContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error, ctx }) {
    if (error.cause instanceof ZodError) {
      const firstError = error.cause.errors[0];
      return {
        ...shape,
        message: ctx?.t(firstError?.message as keyof Messages),
        data: {
          ...shape.data,
          toast: 'error',
        },
      };
    }

    return {
      ...shape,
      message: ctx?.t(shape.message as keyof Messages),
      data: {
        ...shape.data,
        toast: (error.cause as { toast?: ToastType })?.toast,
      },
    };
  },
});

const createCallerFactory = trpc.createCallerFactory;

const createRouter = trpc.router;

export { createRouter, createCallerFactory, trpc };
