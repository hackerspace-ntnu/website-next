'use client';

import { Button } from '@/components/ui/Button';
import { toast } from '@/components/ui/Toaster';
import { api } from '@/lib/api/client';
import { useRouter } from '@/lib/locale/navigation';

function SignUpButton({
  eventId,
  signedUp,
  t,
}: {
  eventId: number;
  signedUp: boolean;
  t: {
    signUp: string;
    cancelSignUp: string;
    signUpSuccess: string;
    cancelSignUpSuccess: string;
  };
}) {
  const router = useRouter();
  const toggleEventSignUp = api.events.toggleEventSignUp.useMutation({
    onSuccess: (newState) => {
      if (newState) {
        toast.success(t.signUpSuccess);
      } else {
        toast.success(t.cancelSignUpSuccess);
      }
      router.refresh();
    },
  });

  return (
    <Button
      className='my-4'
      variant={signedUp ? 'destructive' : 'default'}
      onClick={async () => toggleEventSignUp.mutate(eventId)}
    >
      {signedUp ? t.cancelSignUp : t.signUp}
    </Button>
  );
}

export { SignUpButton };
