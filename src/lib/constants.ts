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

const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'] as const;

const timeslots = ['1', '2', '3', '4'] as const;

const toolDescriptionFields = [
  'krever',
  'difficulty',
  'filamentSize',
  'filamentType',
  'slicer',
] as const;

const tooltype = ['3dprinter', 'other'] as const;

export { groupIdentifiers, days, timeslots, toolDescriptionFields, tooltype };
