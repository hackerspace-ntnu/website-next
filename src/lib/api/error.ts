import { toast } from '@/components/ui/Toaster';
import type { TRPCClientError } from '@/lib/api/types';

function handleGlobalError(error: Error) {
  const TRPCError = error as TRPCClientError;
  const toastType = TRPCError.data?.toast;

  if (toastType) {
    switch (toastType) {
      case 'success':
        toast.success(TRPCError.message, { richColors: true });
        break;
      case 'info':
        toast.info(TRPCError.message, { richColors: true });
        break;
      case 'warning':
        toast.warning(TRPCError.message, { richColors: true });
        break;
      default:
        toast.error(TRPCError.message, { richColors: true });
        break;
    }
  } else {
    throw error;
  }
}

export { handleGlobalError };
