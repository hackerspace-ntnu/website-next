const tools = [
  {
    type: 'printer',
    title: 'Bambu lab X1 Carbon',
    slug: 'bambux1',
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
    type: 'printer',
    title: 'Prusa i3 MK3',
    slug: 'prusamk3',
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
    type: 'printer',
    title: 'Prusa MK4',
    slug: 'prusamk4',
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
    type: 'printer',
    title: 'Creality Printmill Belt Printer',
    slug: 'creality',
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
  {
    type: 'annet',
    title: 'Loddestasjon',
    slug: 'loddestasjon',
    description: 'null',
    photoUrl: '/mock.jpg',
    textContent: `
      Vi har et stort sortiment med utstyr som hjelper deg å lodde.
      Med både varmepistol, loddebolt og loddetinn kan du prototype på et nytt nivå!
      `,
  },
  {
    type: 'annet',
    title: 'Fiberlaser',
    slug: 'fiberlaser',
    description: 'null',
    photoUrl: '/unknown.png',
    textContent: 'null',
  },
];

export { tools };
