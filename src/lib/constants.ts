const fileDirectories = [
  'profile-pictures',
  'news',
  'storage-items',
  'events',
  'groups',
  'rich-input',
] as const;

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

const studyYears = ['1', '2', '3', '4', '5', 'other'] as const;

const toolDescriptionFields = [
  'krever',
  'difficulty',
  'filamentSize',
  'filamentType',
  'slicer',
] as const;

export {
  fileDirectories,
  groupIdentifiers,
  notificationSettings,
  days,
  timeslots,
  studyYears,
  toolDescriptionFields,
};
