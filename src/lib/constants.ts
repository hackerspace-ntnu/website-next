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

const toolDescriptionFields = [
  'krever',
  'difficulty',
  'filamentSize',
  'filamentType',
  'slicer',
] as const;

const toolType = ['3d_printer', 'other'] as const;

export {
  groupIdentifiers,
  skillIdentifiers,
  days,
  timeslots,
  toolDescriptionFields,
  toolType,
};
