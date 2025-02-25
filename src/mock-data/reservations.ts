const tools = {
  printer: [
    {
      typeId: 1,
      id: 1,
      title: 'Bambu lab X1 Carbon',
      description: 'Geir Ove Mjølsnes',
      krever: 'SD-kort eller sky-overføring',
      photoUrl: '/bg.jpg',
      difficulty: 3,
      filamentSize: '1.75mm',
      filamentType: 'Any',
      slicer: 'Bambu studio',
      available: true,
      textContent: `
      Bambu lab X1 Carbon FDM 3D-printer med mulighet for flerfarget utskrift.
      Bruker 1.75mm filament.
      Bruk av fleksible eller skjøre filamenter skal kun gjøres med klarsignal fra vakthavende medlemmer.
      Anbefalt slicer: Bambu studio
    `,
    },
    {
      typeId: 1,
      id: 2,
      title: 'Prusa i3 MK3',
      description: 'Petter',
      krever: 'SD-kort',
      photoUrl: '/bg.jpg',
      difficulty: 1,
      filamentSize: '1,75mm',
      filamentType: 'Any',
      slicer: 'PrusaSlicer',
      available: true,
      textContent: `
      Den originale Prusa i3 MK3. En pålitelig printer av høy kvalitet.
      Sett slicet modell på SD-kort og print ut.
      SD-kort finner du på verkstedet.
      `,
    },
    {
      typeId: 1,
      id: 3,
      type: 'priner',
      title: 'Prusa MK4',
      description: 'Kurt Kåre Rogers',
      krever: 'USB-stick',
      photoUrl: '/bg.jpg',
      difficulty: 1,
      filamentSize: '1,75mm',
      filamentType: 'Any',
      slicer: 'PrusaSlicer',
      available: true,
      textContent: `
      Den originale Prusa MK4.
      En pålitelig printer av høy kvalitet.
      Sett slicet modell på USB og start.
      USB-stick ligger på verkstedet.
      `,
    },
    {
      typeId: 1,
      id: 4,
      title: 'Creality Printmill Belt Printer',
      description: 'Gerd Gunda Brunsnes',
      photoUrl: '/authorMock.jpg',
      difficulty: 5,
      filamentSize: 'Any',
      filamentType: 'PLA',
      slicer: 'null',
      available: false,
      textContent: `
      Med Gerd Gunda har du mulighet for å 3D-printe i uendelig lengde,
      eller masseprodusere en utskrift takket være belte som byggeplate.
      Dette spesielle infinite-Z-beltet er det første i sitt slag i verden.
      Produser lange deler uten å måtte lime sammen flere biter.
      It's time to go even further beyond.

      Dysen skiller seg ut fra andre 3D-printere ved at den printer i en 45 graders vinkel.
      NB! Bare PLA-filament kan brukes.
      `,
    },
  ],
  otherTools: [
    {
      typeId: 2,
      id: 5,
      title: 'Loddestasjon',
      description: 'null',
      photoUrl: '/mock.jpg',
      textContent: `
      Vi har et stort sortiment med utstyr som hjelper deg å lodde.
      Med både varmepistol, loddebolt og loddetinn kan du prototype på et nytt nivå!
      `,
    },
    {
      typeId: 2,
      id: 6,
      title: 'Fiberlaser',
      description: 'null',
      photoUrl: '/unknown.png',
      textContent: 'null',
    },
  ],
};

const reservations = [
  {
    id: 1,
    toolName: 'Prusa MK4',
    toolDescription: '3D Printer',
    fromDate: '29.10.95 23:10',
    toDate: '24.12.26 23:40',
  },
  {
    id: 2,
    toolName: 'Bambu X1C',
    toolDescription: '3D Printer',
    fromDate: '01.01.24 08:00',
    toDate: '05.01.24 18:00',
  },
  {
    id: 3,
    toolName: 'Bambu X1C',
    toolDescription: '3D Printer',
    fromDate: '01.01.24 08:00',
    toDate: '05.01.24 18:00',
  },
  {
    id: 4,
    toolName: 'Bambu X1C',
    toolDescription: '3D Printer',
    fromDate: '01.01.24 08:00',
    toDate: '05.01.24 18:00',
  },
  {
    id: 5,
    toolName: 'Bambu X1C',
    toolDescription: '3D Printer',
    fromDate: '01.01.24 08:00',
    toDate: '05.01.24 18:00',
  },
];

export { tools, reservations };
