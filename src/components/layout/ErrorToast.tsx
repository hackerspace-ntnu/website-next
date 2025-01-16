'use client';

import { toast } from '@/components/ui/Toaster';
import { useMounted } from '@/lib/hooks/useMounted';
import { useRouter } from '@/lib/locale/navigation';
import { useEffect } from 'react';

function ErrorToast({
  error,
  cleanPath,
}: { error?: string; cleanPath?: string }) {
  const isMounted = useMounted();
  const router = useRouter();

  useEffect(() => {
    if (isMounted) {
      if (error) {
        toast.error(error, { richColors: true });
      }
      if (cleanPath) {
        // @ts-expect-error: HACK: should probably get the correct path type instead of string
        router.replace(cleanPath);
      }
    }
  }, [error, isMounted, cleanPath, router]);

  return null;
}

export { ErrorToast };
