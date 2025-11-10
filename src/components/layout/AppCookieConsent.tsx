'use client';

import posthog from 'posthog-js';
import { CookieConsent } from '@/components/ui/CookieConsent';

function AppCookieConsent({
  t,
}: {
  t: {
    title: React.ReactNode;
    description: React.ReactNode;
    accept: React.ReactNode;
    decline: React.ReactNode;
  };
}) {
  return (
    <CookieConsent
      variant='mini'
      t={t}
      onAcceptCallback={posthog.opt_in_capturing}
      onDeclineCallback={posthog.opt_out_capturing}
    />
  );
}

export { AppCookieConsent };
