'use client';

import { useEffect } from 'react';
import { toast } from '@/components/ui/Toaster';
import { useMounted } from '@/lib/hooks/useMounted';
import { useRouter } from '@/lib/locale/navigation';

function ErrorToast({
  error,
  cleanPath,
}: {
  error?: string;
  cleanPath?: string;
}) {
  const isMounted = useMounted();
  const router = useRouter();

  // biome-ignore lint/correctness/useExhaustiveDependencies: should only show error message once on first render
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
  }, [isMounted]);

  return null;
}

export { ErrorToast };
