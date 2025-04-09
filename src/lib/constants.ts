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

const toolDescriptionFields = [
  'krever',
  'difficulty',
  'filamentSize',
  'filamentType',
  'slicer',
] as const;

export { groupIdentifiers, skillIdentifiers, toolDescriptionFields };
