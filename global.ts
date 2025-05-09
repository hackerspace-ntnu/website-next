import type { routing } from '@/lib/locale';
import type { formats } from '@/lib/locale/request';
import type messages from './messages/en.json';

declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
    Formats: typeof formats;
  }
}
