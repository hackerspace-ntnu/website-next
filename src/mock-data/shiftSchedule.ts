const shiftScheduleMockData = {
  monday: {
    first: {
      members: [{ name: 'En person' }],
    },
    second: {
      members: [{ name: 'En person' }],
    },
    third: {
      members: [
        { name: 'En person' },
        { name: 'En annen person' },
        { name: 'Person 3' },
      ],
    },
    fourth: {
      members: [{ name: 'En person' }],
    },
  },
  tuesday: {
    first: {
      members: [{ name: 'En person' }],
    },
    second: {
      members: [{ name: 'En person' }],
    },
    third: {
      members: [
        { name: 'En person' },
        { name: 'En annen person' },
        { name: 'Person 3' },
      ],
    },
    fourth: {
      members: [{ name: 'En person' }],
    },
  },
  wednesday: {
    first: {
      members: [{ name: 'En person' }, { name: 'En annen person' }],
    },
    second: {
      members: [],
    },
    third: {
      members: [{ name: 'En person' }, { name: 'En annen person' }],
    },
    fourth: {
      members: [{ name: 'En person' }, { name: 'En annen person' }],
    },
  },
  thursday: {
    first: {
      members: [{ name: 'En person' }],
    },
    second: {
      members: [
        { name: 'En person' },
        { name: 'En annen person' },
        { name: 'Person 3' },
      ],
    },
    third: {
      members: [],
    },
    fourth: {
      members: [],
    },
  },
  friday: {
    first: {
      members: [],
    },
    second: {
      members: [
        {
          name: 'En person med veldig langt navn så jeg kan teste navn som bruker to linjer',
        },
        { name: 'En annen person' },
      ],
    },
    third: {
      members: [{ name: 'En person' }],
    },
    fourth: {
      members: [{ name: 'En person' }],
    },
  },
};

export { shiftScheduleMockData };
