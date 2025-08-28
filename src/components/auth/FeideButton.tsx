'use client';

import { useRouter } from 'next/navigation';
import { FeideLogo } from '@/components/assets/logos';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { api } from '@/lib/api/client';

function FeideButton({ redirectTo }: { redirectTo?: string }) {
  const router = useRouter();
  const signInMutation = api.auth.signInFeide.useMutation({
    onSuccess: (data) => {
      router.push(data);
    },
  });

  return (
    <Button
      className='w-full bg-[#3FACC2]/90 hover:bg-[#3FACC2] dark:bg-[#222832] hover:dark:bg-[#222832]/40'
      onClick={() => signInMutation.mutate(redirectTo)}
      aria-label='Feide'
      title='Feide'
    >
      {signInMutation.isPending ? <Spinner /> : <FeideLogo />}
    </Button>
  );
}

export { FeideButton };
