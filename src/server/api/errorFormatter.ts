import type { TRPCContext } from '@/server/api/context';
import type { TRPCError } from '@trpc/server';
import type { Formats, MessageKeys, TranslationValues } from 'next-intl';
import { ZodError } from 'zod';

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
  ctx,
}: {
  shape: ErrorShape;
  error: TRPCError;
  ctx: TRPCContext | undefined;
}) {
  if (error.cause instanceof ZodError) {
    const firstError = error.cause.errors[0];
    if (firstError?.message) {
      const { key, values, formats } = JSON.parse(firstError.message) as {
        key: MessageKeys<Messages, keyof Messages>;
        values?: TranslationValues;
        formats?: Formats;
      };
      const message = ctx?.t(key, values, formats);
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
