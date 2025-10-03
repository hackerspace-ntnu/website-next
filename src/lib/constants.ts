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
  { key: 'requires', label: 'requires' },
  { key: 'difficulty', label: 'difficulty' },
  { key: 'filamentSize', label: 'filamentSize' },
  { key: 'filamentType', label: 'filamentType' },
  { key: 'slicer', label: 'slicer' },
] as const;

const toolStatus = [
  'available',
  'unavailable',
  'out_of_order',
  'requires_supervision',
] as const;

const tooltype = ['3dprinter', 'other'] as const;

export {
  groupIdentifiers,
  days,
  timeslots,
  toolDescriptionFields,
  tooltype,
  toolStatus,
};
