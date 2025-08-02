import type { TRPCError } from '@trpc/server';
import { ZodError } from 'zod';
import type { TRPCContext } from '@/server/api/context';

type ToastType = 'info' | 'error' | 'warning' | 'success';

type ErrorShape = {
  message: string;
  code: number;
  data: {
    code: string;
    httpStatus: number;
    path?: string;
    toast?: ToastType;
    [key: string]: unknown;
  };
};

function errorFormatter({
  shape,
  error,
}: {
  shape: ErrorShape;
  error: TRPCError;
  ctx: TRPCContext | undefined;
}) {
  if (error.cause instanceof ZodError) {
    const firstError = error.cause.errors[0];
    if (firstError) {
      const message = firstError.message;
      return {
        ...shape,
        message,
        data: {
          ...shape.data,
          toast: 'error',
        },
      };
    }
  }

  return {
    ...shape,
    data: {
      ...shape.data,
      toast: (error.cause as { toast?: ToastType })?.toast,
    },
  };
}

export { errorFormatter };
