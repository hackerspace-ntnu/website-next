const groupIdentifiers = [
  'devops',
  'labops',
  'leadership',
  'management',
  'representative',
  'ttrpg',
  'breadboard',
  'pang',
  'admin',
] as const;

const notificationSettings = ['all', 'useful', 'essential'] as const;

const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'] as const;

const timeslots = ['1', '2', '3', '4'] as const;
const timeslotTimes = {
  '1': {
    start: new Date(0, 0, 0, 10, 15, 0, 0),
    end: new Date(0, 0, 0, 12, 0, 0, 0),
  },
  '2': {
    start: new Date(0, 0, 0, 12, 0, 0, 0),
    end: new Date(0, 0, 0, 14, 0, 0, 0),
  },
  '3': {
    start: new Date(0, 0, 0, 14, 0, 0, 0),
    end: new Date(0, 0, 0, 16, 0, 0, 0),
  },
  '4': {
    start: new Date(0, 0, 0, 16, 0, 0, 0),
    end: new Date(0, 0, 0, 18, 0, 0, 0),
  },
} as const;

const studyYears = ['1', '2', '3', '4', '5', 'other'] as const;

const toolDescriptionFields = [
  'krever',
  'difficulty',
  'filamentSize',
  'filamentType',
  'slicer',
] as const;

// All pages where a banner can be shown
const bannerPages = [
  '/',
  '/slides',
  '/slides/[slideId]/edit',
  '/slides/new',
  '/about',
  '/about/group/[name]',
  '/about/group/[name]/edit',
  '/about/group/new',
  '/applications/apply',
  '/applications/thank-you',
  '/applications/view',
  '/applications/view/[appId]',
  '/events',
  '/events/[eventId]',
  '/events/[eventId]/edit',
  '/events/new',
  '/management',
  '/management/skills',
  '/management/skills/[skillIdentifier]',
  '/management/skills/new',
  '/management/users',
  '/members',
  '/members/[memberId]',
  '/news',
  '/news/[articleId]',
  '/news/[articleId]/edit',
  '/news/new',
  '/privacy-policy',
  '/quotes',
  '/quotes/[quoteId]/edit',
  '/quotes/new',
  '/reservations',
  '/reservations/[reservationId]',
  '/rules',
  '/rules/[subsetId]',
  '/rules/[subsetId]/edit',
  '/rules/new',
  '/shift-schedule',
  '/storage',
  '/storage/categories',
  '/storage/item/[itemId]',
  '/storage/item/[itemId]/edit',
  '/storage/item/new',
  '/storage/loans',
  '/storage/loans/user',
  '/storage/shopping-cart',
  '/settings',
  '/settings/account',
  '/settings/notifications',
] as const;

export {
  groupIdentifiers,
  notificationSettings,
  days,
  timeslots,
  timeslotTimes,
  studyYears,
  toolDescriptionFields,
  bannerPages,
};
