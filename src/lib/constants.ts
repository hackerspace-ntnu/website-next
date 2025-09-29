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

const skillIdentifiers = [
  'printing',
  'soldering',
  'raspberry',
  'unix',
  'laser',
  'workshop',
  'microcontroller',
  'webdevelopment',
] as const;

const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'] as const;

const timeslots = ['1', '2', '3', '4'] as const;

const studyYears = ['1', '2', '3', '4', '5', 'other'] as const;

export { groupIdentifiers, skillIdentifiers, days, timeslots, studyYears };
