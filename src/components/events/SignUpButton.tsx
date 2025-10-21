'use client';

import { useTranslations } from 'next-intl';
import {
  ResponsiveDialog,
  ResponsiveDialogClose,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from '@/components/composites/ResponsiveDialog';
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
  signUpInfo,
  user,
}: {
  event: NonNullable<RouterOutput['events']['fetchEvent']>;
  signUpInfo: RouterOutput['events']['fetchUserSignUp'];
  user: RouterOutput['auth']['state']['user'];
}) {
  const router = useRouter();
  const t = useTranslations('events.attendance');
  const tUi = useTranslations('ui');

  const pastSignUpDeadline =
    event?.signUpDeadline && new Date() > new Date(event.signUpDeadline);
  const pastStartTime = new Date() > new Date(event.startTime);
  const pastEndTime = new Date() > new Date(event.endTime);

  const eventFull =
    event.maxParticipants && event.participantsCount >= event.maxParticipants;
  const hasWaitlist =
    event.maxParticipants && event.participantsCount > event.maxParticipants;

  const { signedUp, waitlisted } = signUpInfo ?? {};

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
              {pastEndTime
                ? t('eventFinishedAlready')
                : pastSignUpDeadline
                  ? t('pastSignUpDeadline')
                  : t('eventStartedAlready')}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  if (signedUp && !waitlisted && hasWaitlist) {
    return (
      <ResponsiveDialog>
        <ResponsiveDialogTrigger asChild>
          <Button className='my-4' variant='destructive'>
            {t('cancelSignUp')}
          </Button>
        </ResponsiveDialogTrigger>
        <ResponsiveDialogContent>
          <ResponsiveDialogHeader>
            <ResponsiveDialogTitle>{t('confirmLeave')}</ResponsiveDialogTitle>
            <ResponsiveDialogDescription>
              {t('confirmLeaveDescription')}
            </ResponsiveDialogDescription>
          </ResponsiveDialogHeader>
          <ResponsiveDialogFooter>
            <ResponsiveDialogClose asChild>
              <Button variant='secondary'>{tUi('cancel')}</Button>
            </ResponsiveDialogClose>
            <ResponsiveDialogClose asChild>
              <Button
                variant='destructive'
                onClick={async () => toggleEventSignUp.mutate(event.id)}
              >
                {tUi('confirm')}
              </Button>
            </ResponsiveDialogClose>
          </ResponsiveDialogFooter>
        </ResponsiveDialogContent>
      </ResponsiveDialog>
    );
  }

  return (
    <Button
      className='my-4'
      variant={signedUp ? 'destructive' : 'default'}
      onClick={async () => toggleEventSignUp.mutate(event.id)}
      disabled={!user || toggleEventSignUp.isPending}
    >
      {!user ? (
        t('mustBeLoggedIn')
      ) : toggleEventSignUp.isPending ? (
        <Spinner
          className={
            signedUp ? 'text-destructive-foreground' : 'text-primary-foreground'
          }
        />
      ) : signedUp && waitlisted ? (
        t('cancelWaitlistSignUp')
      ) : signedUp && !waitlisted ? (
        t('cancelSignUp')
      ) : !signedUp && eventFull ? (
        t('signUpForWaitlist')
      ) : (
        t('signUp')
      )}
    </Button>
  );
}

export { SignUpButton };
