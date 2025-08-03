'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { toast } from '@/components/ui/Toaster';
import { api } from '@/lib/api/client';
import { useRouter } from '@/lib/locale/navigation';

function SignUpButton({
  eventId,
  signedUp,
  disabled,
}: {
  eventId: number;
  signedUp: boolean;
  disabled?: boolean;
}) {
  const router = useRouter();
  const t = useTranslations('events.attendance');
  const toggleEventSignUp = api.events.toggleEventSignUp.useMutation({
    onSuccess: (newState) => {
      if (newState) {
        toast.success(t('signUpSuccess'));
      } else {
        toast.success(t('cancelSignUpSuccess'));
      }
      router.refresh();
    },
  });

  return (
    <Button
      className='my-4'
      variant={signedUp ? 'destructive' : 'default'}
      onClick={async () => toggleEventSignUp.mutate(eventId)}
      disabled={disabled}
    >
      {disabled ? (
        t('mustBeLoggedIn')
      ) : toggleEventSignUp.isPending ? (
        <Spinner
          className={
            signedUp ? 'text-destructive-foreground' : 'text-primary-foreground'
          }
        />
      ) : signedUp ? (
        t('cancelSignUp')
      ) : (
        t('signUp')
      )}
    </Button>
  );
}

export { SignUpButton };
