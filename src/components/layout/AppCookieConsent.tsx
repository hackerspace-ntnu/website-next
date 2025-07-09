'use client';

import CookieConsent from '@/components/ui/CookieConsent';
import posthog from 'posthog-js';

function AppCookieConsent({ description }: { description: React.ReactNode }) {
  return (
    <CookieConsent
      variant='mini'
      description={description}
      onAcceptCallback={() => posthog.opt_in_capturing}
      onDeclineCallback={() => posthog.opt_out_capturing}
    />
  );
}

export { AppCookieConsent };
