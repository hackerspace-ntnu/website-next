'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { useRouter } from '@/lib/locale/navigation';

function CookieConsentTrigger() {
  const t = useTranslations('settings.profile');
  const [_, setOptedOut] = useLocalStorage<boolean | undefined>(
    'opted-out',
    undefined,
  );
  const router = useRouter();

  return (
    <Button
      variant='secondary'
      size='sm'
      onClick={() => {
        setOptedOut(undefined);
        router.refresh();
      }}
      className='w-fit'
    >
      {t('showCookieConsent')}
    </Button>
  );
}

export { CookieConsentTrigger };
