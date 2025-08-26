'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { toast } from '@/components/ui/Toaster';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/Tooltip';
import { api } from '@/lib/api/client';
import { useRouter } from '@/lib/locale/navigation';
import type { RouterOutput } from '@/server/api';

function SignUpButton({
  event,
  signedUp,
  disabled,
}: {
  event: NonNullable<RouterOutput['events']['fetchEvent']>;
  signedUp: boolean;
  disabled?: boolean;
}) {
  const router = useRouter();
  const t = useTranslations('events.attendance');
  const pastSignUpDeadline =
    event?.signUpDeadline && new Date() > new Date(event.signUpDeadline);
  const pastStartTime = new Date() > new Date(event.startTime);
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

  if (pastSignUpDeadline || pastStartTime) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className='my-4 cursor-not-allowed hover:bg-destructive disabled:pointer-events-auto'
              variant='destructive'
              disabled
            >
              {t('signUpClosed')}
            </Button>
          </TooltipTrigger>
          <TooltipContent className='bg-destructive text-destructive-foreground'>
            <p>
              {pastSignUpDeadline
                ? t('pastSignUpDeadline')
                : t('eventStartedAlready')}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <Button
      className='my-4'
      variant={signedUp ? 'destructive' : 'default'}
      onClick={async () => toggleEventSignUp.mutate(event.id)}
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
