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

export { groupIdentifiers, days, timeslots, timeslotTimes };
