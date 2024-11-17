'use client';
import { FeideLogo } from '@/components/assets/logos/FeideLogo';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { api } from '@/lib/api/client';
import { useRouter } from 'next/navigation';

function FeideButton() {
  const router = useRouter();
  const signInMutation = api.auth.signInFeide.useMutation({
    onSuccess: (data) => {
      router.push(data);
    },
  });

  return (
    <Button
      className='w-full bg-[#3FACC2]/90 hover:bg-[#3FACC2] dark:bg-[#222832] hover:dark:bg-[#222832]/40'
      onClick={() => signInMutation.mutate()}
    >
      {signInMutation.isPending ? <Spinner /> : <FeideLogo title='Feide' />}
    </Button>
  );
}

export { FeideButton };
