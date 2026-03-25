import { GB, KP, NO } from 'country-flag-icons/react/1x1';
import type { useTranslations } from 'next-intl';
import { defineRouting } from 'next-intl/routing';
import type { getTranslations } from 'next-intl/server';
import {
  enGB as enDayPicker,
  ko as koDayPicker,
  nb as noDayPicker,
} from 'react-day-picker/locale';
import enPhoneNumberInput from 'react-phone-number-input/locale/en';
import koPhoneNumberInput from 'react-phone-number-input/locale/ko';
import noPhoneNumberInput from 'react-phone-number-input/locale/nb';

type Translations =
  | ReturnType<typeof useTranslations<never>>
  | Awaited<ReturnType<typeof getTranslations<never>>>;

const localeIcons = { 'en-GB': GB, 'nb-NO': NO, 'ko-KP': KP };

const dayPickerLocales = {
  'en-GB': enDayPicker,
  'nb-NO': noDayPicker,
  'ko-KP': koDayPicker,
};

const phoneNumberInputLocales = {
  'en-GB': enPhoneNumberInput,
  'nb-NO': noPhoneNumberInput,
  'ko-KP': koPhoneNumberInput,
};

const routing = defineRouting({
  locales: ['en-GB', 'nb-NO', 'ko-KP'],
  defaultLocale: 'ko-KP',
  localePrefix: {
    mode: 'as-needed',
    prefixes: {
      'en-GB': '/en',
      'nb-NO': '/no',
      'ko-KP': '/ko',
    },
  },
  localeCookie: {
    name: 'locale',
  },
  pathnames: {
    '/': '/',
    '/too-many-requests': {
      'en-GB': '/too-many-requests',
      'nb-NO': '/for-mange-forespørsler',
      'ko-KP': '/요청-초과',
    },
    '/about': {
      'en-GB': '/about',
      'nb-NO': '/om-oss',
      'ko-KP': '/소개',
    },
    '/about/group/new': {
      'en-GB': '/about/group/new',
      'nb-NO': '/om-oss/gruppe/ny',
      'ko-KP': '/소개/그룹/새로만들기',
    },
    '/about/group/[name]': {
      'en-GB': '/about/group/[name]',
      'nb-NO': '/om-oss/gruppe/[name]',
      'ko-KP': '/소개/그룹/[name]',
    },
    '/about/group/[name]/edit': {
      'en-GB': '/about/group/[name]/edit',
      'nb-NO': '/om-oss/gruppe/[name]/rediger',
      'ko-KP': '/소개/그룹/[name]/편집',
    },
    '/auth': {
      'en-GB': '/auth',
      'nb-NO': '/autentisering',
      'ko-KP': '/인증',
    },
    '/auth/account': {
      'en-GB': '/auth/account',
      'nb-NO': '/autentisering/konto',
      'ko-KP': '/인증/계정',
    },
    '/auth/create-account': {
      'en-GB': '/auth/create-account',
      'nb-NO': '/autentisering/opprett-konto',
      'ko-KP': '/인증/계정-만들기',
    },
    '/auth/forgot-password': {
      'en-GB': '/auth/forgot-password',
      'nb-NO': '/autentisering/glemt-passord',
      'ko-KP': '/인증/비밀번호-분실',
    },
    '/auth/forgot-password/[requestId]': {
      'en-GB': '/auth/forgot-password/[requestId]',
      'nb-NO': '/autentisering/glemt-passord/[requestId]',
      'ko-KP': '/인증/비밀번호-분실/[requestId]',
    },
    '/auth/verify-email': {
      'en-GB': '/auth/verify-email',
      'nb-NO': '/autentisering/bekreft-epost',
      'ko-KP': '/인증/이메일-인증',
    },
    '/auth/success': {
      'en-GB': '/auth/success',
      'nb-NO': '/autentisering/suksess',
      'ko-KP': '/인증/성공',
    },
    '/settings': {
      'en-GB': '/settings',
      'nb-NO': '/innstillinger',
      'ko-KP': '/설정',
    },
    '/settings/account': {
      'en-GB': '/settings/account',
      'nb-NO': '/innstillinger/konto',
      'ko-KP': '/설정/계정',
    },
    '/settings/notifications': {
      'en-GB': '/settings/notifications',
      'nb-NO': '/innstillinger/notifikasjoner',
      'ko-KP': '/설정/알림',
    },
    '/events': {
      'en-GB': '/events',
      'nb-NO': '/arrangementer',
      'ko-KP': '/이벤트',
    },
    '/events/new': {
      'en-GB': '/events/new',
      'nb-NO': '/arrangementer/ny',
      'ko-KP': '/이벤트/새로만들기',
    },
    '/events/[eventId]': {
      'en-GB': '/events/[eventId]',
      'nb-NO': '/arrangementer/[eventId]',
      'ko-KP': '/이벤트/[eventId]',
    },
    '/events/[eventId]/edit': {
      'en-GB': '/events/[eventId]/edit',
      'nb-NO': '/arrangementer/[eventId]/rediger',
      'ko-KP': '/이벤트/[eventId]/편집',
    },
    '/news': {
      'en-GB': '/news',
      'nb-NO': '/nyheter',
      'ko-KP': '/뉴스',
    },
    '/news/new': {
      'en-GB': '/news/new',
      'nb-NO': '/nyheter/ny',
      'ko-KP': '/뉴스/새로만들기',
    },
    '/news/[articleId]': {
      'en-GB': '/news/[articleId]',
      'nb-NO': '/nyheter/[articleId]',
      'ko-KP': '/뉴스/[articleId]',
    },
    '/news/[articleId]/edit': {
      'en-GB': '/news/[articleId]/edit',
      'nb-NO': '/nyheter/[articleId]/rediger',
      'ko-KP': '/뉴스/[articleId]/편집',
    },
    '/members': {
      'en-GB': '/members',
      'nb-NO': '/medlemmer',
      'ko-KP': '/회원',
    },
    '/members/[memberId]': {
      'en-GB': '/members/[memberId]',
      'nb-NO': '/medlemmer/[memberId]',
      'ko-KP': '/회원/[memberId]',
    },
    '/storage': {
      'en-GB': '/storage',
      'nb-NO': '/lager',
      'ko-KP': '/창고',
    },
    '/storage/shopping-cart': {
      'en-GB': '/storage/shopping-cart',
      'nb-NO': '/lager/handlekurv',
      'ko-KP': '/창고/장바구니',
    },
    '/storage/item/new': {
      'en-GB': '/storage/item/new',
      'nb-NO': '/lager/gjenstand/ny',
      'ko-KP': '/창고/항목/새로만들기',
    },
    '/storage/item/[itemId]': {
      'en-GB': '/storage/item/[itemId]',
      'nb-NO': '/lager/gjenstand/[itemId]',
      'ko-KP': '/창고/항목/[itemId]',
    },
    '/storage/item/[itemId]/edit': {
      'en-GB': '/storage/item/[itemId]/edit',
      'nb-NO': '/lager/gjenstand/[itemId]/rediger',
      'ko-KP': '/창고/항목/[itemId]/편집',
    },
    '/storage/loans': {
      'en-GB': '/storage/loans',
      'nb-NO': '/lager/lån',
      'ko-KP': '/창고/대여',
    },
    '/storage/loans/user': {
      'en-GB': '/storage/loans/user',
      'nb-NO': '/lager/lån/bruker',
      'ko-KP': '/창고/대여/사용자',
    },
    '/storage/categories': {
      'en-GB': '/storage/categories',
      'nb-NO': '/lager/kategorier',
      'ko-KP': '/창고/카테고리',
    },
    '/rules': {
      'en-GB': '/rules',
      'nb-NO': '/regler',
      'ko-KP': '/규칙',
    },
    '/rules/[subsetId]': {
      'en-GB': '/rules/[subsetId]',
      'nb-NO': '/regler/[subsetId]',
      'ko-KP': '/규칙/[subsetId]',
    },
    '/rules/new': {
      'en-GB': '/rules/new',
      'nb-NO': '/regler/ny',
      'ko-KP': '/규칙/새로만들기',
    },
    '/rules/[subsetId]/edit': {
      'en-GB': '/rules/[subsetId]/edit',
      'nb-NO': '/regler/[subsetId]/rediger',
      'ko-KP': '/규칙/[subsetId]/편집',
    },
    '/shift-schedule': {
      'en-GB': '/shift-schedule',
      'nb-NO': '/vaktliste',
      'ko-KP': '/근무-일정',
    },
    '/applications/apply': {
      'en-GB': '/applications/apply',
      'nb-NO': '/opptak/søk',
      'ko-KP': '/지원서/지원하기',
    },
    '/applications/thank-you': {
      'en-GB': '/applications/thank-you',
      'nb-NO': '/opptak/takk',
      'ko-KP': '/지원서/감사합니다',
    },
    '/applications/view': {
      'en-GB': '/applications/view',
      'nb-NO': '/opptak/vis',
      'ko-KP': '/지원서/보기',
    },
    '/applications/view/[appId]': {
      'en-GB': '/applications/view/[appId]',
      'nb-NO': '/opptak/vis/[appId]',
      'ko-KP': '/지원서/보기/[appId]',
    },
    '/quotes': {
      'en-GB': '/quotes',
      'nb-NO': '/sitater',
      'ko-KP': '/인용구',
    },
    '/quotes/new': {
      'en-GB': '/quotes/new',
      'nb-NO': '/sitater/ny',
      'ko-KP': '/인용구/새로만들기',
    },
    '/quotes/[quoteId]/edit': {
      'en-GB': '/quotes/[quoteId]/edit',
      'nb-NO': '/sitater/[quoteId]/rediger',
      'ko-KP': '/인용구/[quoteId]/편집',
    },
    '/privacy-policy': {
      'en-GB': '/privacy-policy',
      'nb-NO': '/personvern',
      'ko-KP': '/개인정보-보호정책',
    },
    '/management': {
      'en-GB': '/management',
      'nb-NO': '/administrasjon',
      'ko-KP': '/관리',
    },
    '/management/banners': {
      'en-GB': '/management/banners',
      'nb-NO': '/administrasjon/bannere',
      'ko-KP': '/관리/배너',
    },
    '/management/banners/[bannerId]/edit': {
      'en-GB': '/management/banners/[bannerId]/edit',
      'nb-NO': '/administrasjon/bannere/[bannerId]/rediger',
      'ko-KP': '/관리/배너/[bannerId]/편집',
    },
    '/management/banners/new': {
      'en-GB': '/management/banners/new',
      'nb-NO': '/administrasjon/bannere/ny',
      'ko-KP': '/관리/배너/새로만들기',
    },
    '/management/skills': {
      'en-GB': '/management/skills',
      'nb-NO': '/administrasjon/ferdigheter',
      'ko-KP': '/관리/기술',
    },
    '/management/skills/[skillIdentifier]': {
      'en-GB': '/management/skills/[skillIdentifier]',
      'nb-NO': '/administrasjon/ferdigheter/[skillIdentifier]',
      'ko-KP': '/관리/기술/[skillIdentifier]',
    },
    '/management/skills/new': {
      'en-GB': '/management/skills/new',
      'nb-NO': '/administrasjon/ferdigheter/ny',
      'ko-KP': '/관리/기술/새로만들기',
    },
    '/management/users': {
      'en-GB': '/management/users',
      'nb-NO': '/administrasjon/brukere',
      'ko-KP': '/관리/사용자',
    },
    '/management/slides': {
      'en-GB': '/management/slides',
      'nb-NO': '/management/slides',
      'ko-KP': '/관리/슬라이드',
    },
    '/management/slides/[slideId]/edit': {
      'en-GB': '/management/slides/[slideId]/edit',
      'nb-NO': '/management/slides/[slideId]/rediger',
      'ko-KP': '/관리/슬라이드/[slideId]/편집',
    },
    '/management/slides/new': {
      'en-GB': '/management/slides/new',
      'nb-NO': '/management/slides/ny',
      'ko-KP': '/관리/슬라이드/새로만들기',
    },
    '/reservations': {
      'en-GB': '/reservations',
      'nb-NO': '/reservasjoner',
      'ko-KP': '/예약',
    },
    '/reservations/[toolId]': {
      'en-GB': '/reservations/[toolId]',
      'nb-NO': '/reservasjoner/[toolId]',
      'ko-KP': '/예약/[toolId]',
    },
    '/reservations/tools/new': {
      'en-GB': '/reservations/tools/new',
      'nb-NO': '/reservasjoner/verktøy/ny',
      'ko-KP': '/예약/도구/새로만들기',
    },
    '/reservations/tools/[toolId]/edit': {
      'en-GB': '/reservations/tools/[toolId]/edit',
      'nb-NO': '/reservasjoner/verktøy/[toolId]/rediger',
      'ko-KP': '/예약/도구/[toolId]/편집',
    },
  },
});

export {
  localeIcons,
  dayPickerLocales,
  phoneNumberInputLocales,
  routing,
  type Translations,
};
