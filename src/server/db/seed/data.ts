import { groupIdentifiers } from '@/lib/constants';
import { hashPassword } from '@/server/auth/password';
import type {
  InsertEvent,
  InsertEventLocalization,
  InsertGroup,
  InsertGroupLocalization,
  InsertItemCategory,
  InsertItemLocalization,
  InsertShift,
  InsertSkill,
  InsertStorageItem,
  InsertUser,
  InsertUserGroup,
  InsertUserSkill,
} from '@/server/db/tables';

const usersData: InsertUser[] = [
  // Groups: Admin + Management
  // Skills: All skills (printing, soldering, raspberry, unix, laser, workshop, microcontroller)
  {
    username: 'fransina',
    firstName: 'Frank',
    lastName: 'Sinatra',
    email: 'frank@sinatra.com',
    emailVerifiedAt: new Date(),
    birthDate: new Date('1915-12-12'),
    phoneNumber: '+13212342342',
    passwordHash: await hashPassword('pass1'),
  },
  // Groups: DevOps
  // Skills: printing, soldering, unix
  {
    username: 'fredmerc',
    firstName: 'Freddie',
    lastName: 'Mercury',
    email: 'freddie@queen.com',
    emailVerifiedAt: new Date(),
    birthDate: new Date('1946-09-05'),
    phoneNumber: '+13212342341',
    passwordHash: await hashPassword('pass1'),
  },
  // Groups: LabOps + Management
  // Skills: raspberry, laser, workshop
  {
    username: 'johnlenn',
    firstName: 'John',
    lastName: 'Lennon',
    email: 'john@beatles.com',
    emailVerifiedAt: new Date(),
    birthDate: new Date('1940-10-09'),
    phoneNumber: '+13212342348',
    passwordHash: await hashPassword('pass1'),
  },
  // Groups: TTRPG
  // Skills: None
  {
    username: 'elvipres',
    firstName: 'Elvis',
    lastName: 'Presley',
    email: 'elvis@presley.com',
    emailVerifiedAt: new Date(),
    birthDate: new Date('1935-01-08'),
    phoneNumber: '+13212342347',
    passwordHash: await hashPassword('pass1'),
  },
  // Groups: Representative
  // Skills: microcontroller, unix
  {
    username: 'taylswif',
    firstName: 'Taylor',
    lastName: 'Swift',
    email: 'taylor@swift.com',
    emailVerifiedAt: new Date(),
    birthDate: new Date('1989-12-13'),
    phoneNumber: '+13212342346',
    passwordHash: await hashPassword('pass1'),
  },
  // Under here you can change or define any other user you need for your testing. Feel free to change whatever you want.
  {
    username: 'michbrus',
    firstName: 'Michael',
    lastName: 'Brusegard',
    email: 'michbrus69@gard.com',
    emailVerifiedAt: new Date(),
    birthDate: new Date('2002-05-06'),
    phoneNumber: '+13212342345',
    passwordHash: await hashPassword('pass1'),
  },
];

const groupsData: InsertGroup[] = groupIdentifiers.map((identifier) => ({
  identifier,
}));

const groupLocalizationsData: InsertGroupLocalization[] = [
  {
    groupId: 1,
    name: 'DevOps',
    summary: 'DevOps group focused on infrastructure and operations.',
    description:
      'The DevOps group is responsible for managing the infrastructure and operations of Hackerspace. They work on automating processes, managing servers, and ensuring smooth operations.',
    locale: 'en-GB',
  },
  {
    groupId: 1,
    name: 'DevOps',
    summary: 'DevOps fokuserer på infrastruktur og drift.',
    description:
      'DevOps er ansvarlig for å administrere infrastruktur og drift av Hackerspace. De jobber med automatisering av prosesser, serveradministrasjon og sikrer smidig drift.',
    locale: 'nb-NO',
  },
  {
    groupId: 2,
    name: 'LabOps',
    summary: "LabOps handles Hackerspace's operations.",
    description:
      'The LabOps group is responsible for managing the operations of Hackerspace. They work on maintaining equipment, ensuring safety protocols, and facilitating events.',
    locale: 'en-GB',
  },
  {
    groupId: 2,
    name: 'LabOps',
    summary: 'LabOps driver verkstedet.',
    description:
      'LabOps-gruppen er ansvarlig for å administrere driften av Hackerspace. De jobber med vedlikehold av utstyr, sikkerhetsprotokoller og tilrettelegging av arrangementer.',
    locale: 'nb-NO',
  },
  {
    groupId: 3,
    name: 'Leadership',
    summary: 'Leadership group focused on strategic direction.',
    description:
      'The Leadership group is responsible for setting the strategic direction of Hackerspace. They work on long-term planning, community engagement, and overall management.',
    locale: 'en-GB',
  },
  {
    groupId: 3,
    name: 'Lederskap',
    summary: 'Lederskapsgruppen er fokusert på strategisk retning.',
    description:
      'Lederskapsgruppen er ansvarlig for å sette den strategiske retningen for Hackerspace. De jobber med langsiktig planlegging, samfunnsengasjement og overordnet ledelse.',
    locale: 'nb-NO',
  },
  {
    groupId: 5,
    name: 'Trusted Representative',
    summary: 'A selected member which can be contacted for various inquiries.',
    description:
      'Hackerspace shall have a representative who is appointed during the general assembly. This representative has no voting rights on the board but is a contact person for Hackerspace members regarding issues they do not wish to address directly with the board. The representative has a duty of confidentiality and will, if necessary, relay issues anonymized to the board.',
    locale: 'en-GB',
  },
  {
    groupId: 5,
    name: 'Tillitsvalgt',
    summary: 'Et utvalgt medlem som kan kontaktes for ulike henvendelser.',
    description:
      'Hackerspace skal ha en tillitsvalgt som blir utnevnt under generalforsamlingen. Denne tillitsvalgte har ingen stemme i styret, men er en kontaktperson for medlemmer av Hackerspace for saker de ikke ønsker å ta direkte opp med styret. Tillitsvalgt har taushetsplikt, og vil ved behov videreformidle saker anonymisert til styret.',
    locale: 'nb-NO',
  },
  {
    groupId: 6,
    name: 'TTRPG',
    summary: 'TTRPG group focused on tabletop role-playing games.',
    description:
      'The TTRPG group is dedicated to tabletop role-playing games. They organize game sessions, create campaigns, and foster a community of gamers.',
    locale: 'en-GB',
  },
  {
    groupId: 7,
    name: 'Breadboard',
    summary: 'Breadboard group focused on electronics prototyping.',
    description:
      'The Breadboard group is focused on electronics prototyping and experimentation. They work on building circuits, testing components, and sharing knowledge about electronics.',
    locale: 'en-GB',
  },
  {
    groupId: 7,
    name: 'Breadboard',
    summary: 'Breadboard-gruppe fokusert på elektronikkprototyping.',
    description:
      'Breadboard-gruppen er fokusert på elektronikkprototyping og eksperimentering. De jobber med å bygge kretser, teste komponenter og dele kunnskap om elektronikk.',
    locale: 'nb-NO',
  },
  {
    groupId: 8,
    name: 'Pang',
    summary:
      'Members which have fulfilled their duties and are now retired from Hackerspace.',
    description:
      'The Pang group consists of members who have fulfilled their duties and are now retired from the Hackerspace. They are recognized for their contributions and continue to be part of the community.',
    locale: 'en-GB',
  },
  {
    groupId: 8,
    name: 'Pang',
    summary:
      'Medlemmer som har fullført sine plikter og er nå pensjonert fra Hackerspace.',
    description:
      'Pang-gruppen består av medlemmer som har fullført sine plikter og er nå pensjonert fra Hackerspace. De anerkjennes for sine bidrag og fortsetter å være en del av fellesskapet.',
    locale: 'nb-NO',
  },
];

const usersGroupsData: InsertUserGroup[] = [
  {
    userId: 1,
    groupId: 9,
  },
  {
    userId: 1,
    groupId: 4,
  },
  {
    userId: 2,
    groupId: 1,
  },
  {
    userId: 3,
    groupId: 2,
  },
  {
    userId: 3,
    groupId: 4,
  },
  {
    userId: 4,
    groupId: 6,
  },
  {
    userId: 5,
    groupId: 5,
  },
];

const skillsData: InsertSkill[] = [
  {
    identifier: 'printing',
    nameEnglish: '3D Printing',
    nameNorwegian: '3D-printing',
  },
  {
    identifier: 'soldering',
    nameEnglish: 'Soldering',
    nameNorwegian: 'Lodding',
  },
  {
    identifier: 'raspberry',
    nameEnglish: 'Raspberry Pi',
    nameNorwegian: 'Raspberry Pi',
  },
  {
    identifier: 'unix',
    nameEnglish: 'Unix/Linux',
    nameNorwegian: 'Unix/Linux',
  },
  {
    identifier: 'laser',
    nameEnglish: 'Laser Cutting',
    nameNorwegian: 'Laserkutting',
  },
  {
    identifier: 'workshop',
    nameEnglish: 'Workshop',
    nameNorwegian: 'Verksted',
  },
  {
    identifier: 'microcontroller',
    nameEnglish: 'Microcontrollers',
    nameNorwegian: 'Mikrokontrollere',
  },
  {
    identifier: 'webdevelopment',
    nameEnglish: 'Web Development',
    nameNorwegian: 'Webutvikling',
  },
] as const;

const usersSkillsData: InsertUserSkill[] = [
  ...Array.from({ length: skillsData.length }).map((_, index) => ({
    userId: 1,
    skillId: index + 1,
  })),
  {
    userId: 2,
    skillId: 1,
  },
  {
    userId: 2,
    skillId: 2,
  },
  {
    userId: 2,
    skillId: 4,
  },
  {
    userId: 3,
    skillId: 3,
  },
  {
    userId: 3,
    skillId: 5,
  },
  {
    userId: 3,
    skillId: 6,
  },
  {
    userId: 5,
    skillId: 7,
  },
  {
    userId: 5,
    skillId: 4,
  },
];

const storageItemCategories: InsertItemCategory[] = [
  {
    nameEnglish: 'Cables',
    nameNorwegian: 'Kabler',
  },
  { nameEnglish: 'Sensors', nameNorwegian: 'Sensorer' },
  {
    nameEnglish: 'PC peripherals',
    nameNorwegian: 'PC-tilbehør',
  },
  { nameEnglish: 'Mini PC', nameNorwegian: 'Mini PC' },
];

const storageItemsData: InsertStorageItem[] = [
  {
    quantity: 15,
    categoryId: 4,
  },
  {
    quantity: 10,
    categoryId: 4,
  },
  {
    quantity: 20,
    categoryId: 3,
  },
  {
    quantity: 50,
    categoryId: 3,
  },
  {
    quantity: 50,
    categoryId: 3,
  },
  {
    quantity: 5,
    categoryId: 3,
  },
  {
    quantity: 100,
    categoryId: 1,
  },
  {
    quantity: 25,
    categoryId: 3,
  },
  {
    quantity: 75,
    categoryId: 3,
  },
  {
    quantity: 30,
    categoryId: 3,
  },
  {
    quantity: 12,
    categoryId: 3,
  },
  {
    quantity: 40,
    categoryId: 3,
  },
  {
    quantity: 10,
    categoryId: 3,
  },
  {
    quantity: 10,
    categoryId: 3,
  },
  {
    quantity: 20,
    categoryId: 3,
  },
  {
    quantity: 5,
    categoryId: 3,
  },
  {
    quantity: 8,
    categoryId: 1,
  },
  {
    quantity: 10,
    categoryId: 3,
  },
  {
    quantity: 20,
    categoryId: 3,
  },
  {
    quantity: 15,
    categoryId: 3,
  },
];

const storageItemLocalizations: InsertItemLocalization[] = [
  {
    name: 'Laptop',
    location: 'Storage Room A',
    locale: 'en-GB',
    itemId: 1,
  },
  {
    name: 'Laptop',
    location: 'Lagerrom A',
    locale: 'nb-NO',
    itemId: 1,
  },
  {
    name: 'Desktop PC',
    location: 'Workstation Area 1',
    locale: 'en-GB',
    itemId: 2,
  },
  {
    name: 'Stasjonær PC',
    location: 'Verksted 1',
    locale: 'nb-NO',
    itemId: 2,
  },
  {
    name: 'Monitor',
    location: 'Storage Room B',
    locale: 'en-GB',
    itemId: 3,
  },
  {
    name: 'Monitor',
    location: 'Lagerrom B',
    locale: 'nb-NO',
    itemId: 3,
  },
  {
    name: 'Keyboard',
    location: 'Storage Room A',
    locale: 'en-GB',
    itemId: 4,
  },
  {
    name: 'Tastatur',
    location: 'Lagerrom A',
    locale: 'nb-NO',
    itemId: 4,
  },
  {
    name: 'Mouse',
    location: 'Storage Room A',
    locale: 'en-GB',
    itemId: 5,
  },
  {
    name: 'Mus',
    location: 'Lagerrom A',
    locale: 'nb-NO',
    itemId: 5,
  },
  {
    name: 'Router',
    location: 'Networking Room',
    locale: 'en-GB',
    itemId: 6,
  },
  {
    name: 'Ruter',
    location: 'Nettverksrom',
    locale: 'nb-NO',
    itemId: 6,
  },
  {
    name: 'Ethernet Cable',
    location: 'Networking Room',
    locale: 'en-GB',
    itemId: 7,
  },
  {
    name: 'Ethernet-kabel',
    location: 'Nettverksrom',
    locale: 'nb-NO',
    itemId: 7,
  },
  {
    name: 'External Hard Drive',
    location: 'Storage Room B',
    locale: 'en-GB',
    itemId: 8,
  },
  {
    name: 'Ekstern harddisk',
    location: 'Lagerrom B',
    locale: 'nb-NO',
    itemId: 8,
  },
  {
    name: 'USB Flash Drive',
    location: 'Storage Room B',
    locale: 'en-GB',
    itemId: 9,
  },
  {
    name: 'USB minnepinne',
    location: 'Lagerrom B',
    locale: 'nb-NO',
    itemId: 9,
  },
  {
    name: 'Power Supply Unit (PSU)',
    location: 'Storage Room C',
    locale: 'en-GB',
    itemId: 10,
  },
  {
    name: 'Strømforsyning (PSU)',
    location: 'Lagerrom C',
    locale: 'nb-NO',
    itemId: 10,
  },
  {
    name: 'Graphics Card',
    location: 'Storage Room C',
    locale: 'en-GB',
    itemId: 11,
  },
  {
    name: 'Grafikkort',
    location: 'Lagerrom C',
    locale: 'nb-NO',
    itemId: 11,
  },
  {
    name: 'RAM Module',
    location: 'Storage Room C',
    locale: 'en-GB',
    itemId: 12,
  },
  {
    name: 'RAM-modul',
    location: 'Lagerrom C',
    locale: 'nb-NO',
    itemId: 12,
  },
  {
    name: 'Motherboard',
    location: 'Storage Room C',
    locale: 'en-GB',
    itemId: 13,
  },
  {
    name: 'Hovedkort',
    location: 'Lagerrom C',
    locale: 'nb-NO',
    itemId: 13,
  },
  {
    name: 'CPU',
    location: 'Storage Room C',
    locale: 'en-GB',
    itemId: 14,
  },
  {
    name: 'CPU',
    location: 'Lagerrom C',
    locale: 'nb-NO',
    itemId: 14,
  },
  {
    name: 'SSD',
    location: 'Storage Room C',
    locale: 'en-GB',
    itemId: 15,
  },
  {
    name: 'SSD',
    location: 'Lagerrom C',
    locale: 'nb-NO',
    itemId: 15,
  },
  {
    name: 'Network Switch',
    location: 'Networking Room',
    locale: 'en-GB',
    itemId: 16,
  },
  {
    name: 'Nettverksswitch',
    location: 'Nettverksrom',
    locale: 'nb-NO',
    itemId: 16,
  },
  {
    name: 'Soldering Iron',
    location: 'Repair Station',
    locale: 'en-GB',
    itemId: 17,
  },
  {
    name: 'Loddejern',
    location: 'Fiks-selv stasjon',
    locale: 'nb-NO',
    itemId: 17,
  },
  {
    name: 'Multimeter',
    location: 'Repair Station',
    locale: 'en-GB',
    itemId: 18,
  },
  {
    name: 'Multimeter',
    location: 'Fiks-selv stasjon',
    locale: 'nb-NO',
    itemId: 18,
  },
  {
    name: 'Screwdriver Set',
    location: 'Toolbox 1',
    locale: 'en-GB',
    itemId: 19,
  },
  {
    name: 'Skrutrekkere',
    location: 'Verktøykasse 1',
    locale: 'nb-NO',
    itemId: 19,
  },
  {
    name: 'Anti-static Wrist Strap',
    location: 'Toolbox 2',
    locale: 'en-GB',
    itemId: 20,
  },
  {
    name: 'Antistatisk armbånd',
    location: 'Verktøykasse 2',
    locale: 'nb-NO',
    itemId: 20,
  },
];

const shiftsData: InsertShift[] = [
  {
    day: 'monday',
    timeslot: '1',
    userId: 1,
  },
  {
    day: 'tuesday',
    timeslot: '2',
    userId: 4,
  },
  {
    day: 'wednesday',
    timeslot: '2',
    userId: 4,
  },
  {
    day: 'wednesday',
    timeslot: '2',
    userId: 1,
  },
  {
    day: 'wednesday',
    timeslot: '3',
    userId: 2,
  },
  {
    day: 'thursday',
    timeslot: '4',
    userId: 2,
  },
  {
    day: 'friday',
    timeslot: '1',
    userId: 2,
  },
  {
    day: 'friday',
    timeslot: '1',
    userId: 5,
  },
  {
    // Past end date, shouldn't be displayed
    day: 'friday',
    timeslot: '4',
    userId: 1,
    endDate: new Date(0),
  },
];

const eventsData: InsertEvent[] = [
  {
    startTime: new Date('2025-01-12T17:00:00+02:00'),
    endTime: new Date('2025-01-12T19:00:00+02:00'),
    internal: true,
    locationMapLink:
      'https://use.mazemap.com/?v=1&campusid=1&sharepoitype=identifier&sharepoi=360-A2-116',
  },
  {
    startTime: new Date('2025-01-14T18:00:00+02:00'),
    endTime: new Date('2025-01-14T20:30:00+02:00'),
    internal: false,
  },
  {
    startTime: new Date('2025-01-16T16:00:00+02:00'),
    endTime: new Date('2025-01-16T17:30:00+02:00'),
    internal: false,
  },

  {
    startTime: new Date('2025-01-20T10:00:00+02:00'),
    endTime: new Date('2025-01-22T21:00:00+02:00'),
    internal: false,
  },

  {
    startTime: new Date('2025-01-22T17:30:00+02:00'),
    endTime: new Date('2025-01-22T19:30:00+02:00'),
    internal: false,
  },

  {
    startTime: new Date('2024-10-09T15:00:00+02:00'),
    endTime: new Date('2024-10-09T17:30:00+02:00'),
    internal: true,
  },

  {
    startTime: new Date('2024-10-11T17:00:00+02:00'),
    endTime: new Date('2024-10-11T19:00:00+02:00'),
    internal: true,
  },

  {
    startTime: new Date('2024-10-14T18:30:00+02:00'),
    endTime: new Date('2024-10-14T20:00:00+02:00'),
    internal: false,
  },
];

const eventLocalizationsData: InsertEventLocalization[] = [
  {
    eventId: 1,
    name: 'Intro to 3D Printing Workshop',
    summary: 'A beginner-friendly workshop on the basics of 3D printing.',
    description:
      "Join us for an introductory workshop on 3D printing! Learn about the various types of 3D printers, materials, and software needed to design and print your own projects. By the end of the session, you'll be able to print your first 3D object!",
    location: 'Hackerspace workshop',
    locale: 'en-GB',
  },
  {
    eventId: 1,
    name: 'Introduksjon til 3D-utskrift',
    summary: 'En nybegynnervennlig workshop om grunnleggende 3D-utskrift.',
    description:
      'Bli med på en introduksjonsworkshop om 3D-utskrift! Lær om ulike typer 3D-skrivere, materialer og programvare som trengs for å designe og skrive ut dine egne prosjekter. Ved slutten av økten vil du være i stand til å skrive ut ditt første 3D-objekt!',
    location: 'Hackerspace-verkstedet',
    locale: 'nb-NO',
  },
  {
    eventId: 2,
    name: 'Build Your First Circuit',
    summary:
      'Hands-on workshop to design and build a simple electronic circuit.',
    description:
      "Ever wanted to create your own electronics? In this workshop, we'll guide you through building your first circuit! You'll learn about the basics of circuit components and practice your soldering skills to create a simple LED light setup.",
    location: 'R50',
    locale: 'en-GB',
  },
  {
    eventId: 2,
    name: 'Bygg din første krets',
    summary:
      'Praktisk workshop for å designe og bygge en enkel elektronisk krets.',
    description:
      'Har du alltid ønsket å lage din egen elektronikk? I denne workshopen guider vi deg gjennom byggingen av din første krets! Du lærer om grunnleggende kretskomponenter og får øve på loddeferdighetene dine for å lage et enkelt LED-lys oppsett.',
    location: 'R50',
    locale: 'nb-NO',
  },
  {
    eventId: 3,
    name: 'AI in Robotics: Applications and Future Trends',
    summary: 'A talk on the role of AI in robotics and its future.',
    description:
      "This session explores the impact of artificial intelligence in the field of robotics. We'll discuss recent advancements, applications in industry and academia, and potential future directions. A Q&A session will follow.",
    location: 'Smia',
    locale: 'en-GB',
  },
  {
    eventId: 3,
    name: 'AI i robotikk: Anvendelser og fremtidige trender',
    summary:
      'En samtale om rollen til kunstig intelligens i robotikk og dens fremtid.',
    description:
      'Denne sesjonen utforsker påvirkningen av kunstig intelligens innen robotikkfeltet. Vi diskuterer nylige fremskritt, anvendelser i industri og akademia, samt potensielle fremtidige retninger. En spørsmål-og-svar-sesjon vil følge.',
    location: 'Smia',
    locale: 'nb-NO',
  },
  {
    eventId: 4,
    name: 'Hackathon NTNU 2024 Kickoff',
    summary:
      'Kickoff meeting for Hackathon NTNU 2024 with information on teams, rules, and prizes.',
    description:
      "Get ready for the biggest Hackathon of the year! Join us for the Hackathon NTNU 2024 kickoff event where you'll learn about the competition structure, form teams, and get all the essential details for the event. Don't miss out on a chance to showcase your skills and win prizes!",
    location: 'Hackerspace workshop',
    locale: 'en-GB',
  },
  {
    eventId: 4,
    name: 'Hackathon NTNU 2024 Oppstart',
    summary:
      'Oppstartsmøte for Hackathon NTNU 2024 med informasjon om lag, regler og premier.',
    description:
      'Gjør deg klar for årets største Hackathon! Bli med på Hackathon NTNU 2024 oppstartsarrangement hvor du vil lære om konkurransestrukturen, danne lag, og få alle viktige detaljer for arrangementet. Ikke gå glipp av muligheten til å vise frem ferdighetene dine og vinne premier!',
    location: 'Hackerspace-verkstedet',
    locale: 'nb-NO',
  },
  {
    eventId: 5,
    name: 'Basics of Python for Data Science',
    summary: 'An introductory workshop on Python programming for data science.',
    description:
      "Learn Python fundamentals with a focus on data science! In this beginner-friendly session, we'll cover essential Python libraries and data manipulation techniques using pandas, NumPy, and matplotlib. Perfect for anyone interested in getting started with data analysis!",
    location: 'Hackerspace workshop',
    locale: 'en-GB',
  },
  {
    eventId: 5,
    name: 'Grunnleggende Python for datanalyse',
    summary: 'En introduksjonsworkshop om Python-programmering for datanalyse.',
    description:
      'Lær Python-grunnlag med fokus på datanalyse! I denne nybegynnervennlige økten vil vi gå gjennom essensielle Python-biblioteker og datateknikker ved hjelp av pandas, NumPy og matplotlib. Perfekt for alle som er interessert i å komme i gang med dataanalyse!',
    location: 'Hackerspace-verkstedet',
    locale: 'nb-NO',
  },
  {
    eventId: 6,
    name: 'Soldering 101: Building Your Own Sensor Kit',
    summary: 'Learn the basics of soldering and create a custom sensor kit.',
    description:
      "In this hands-on workshop, we'll cover the basics of soldering and guide you through creating your own temperature and humidity sensor kit. You'll walk away with valuable soldering skills and a working sensor to use in future projects!",
    location: 'R51',
    locale: 'en-GB',
  },
  {
    eventId: 6,
    name: 'Lodding 101: Bygg din egen sensorkit',
    summary:
      'Lær det grunnleggende om lodding og lag et egendefinert sensorkit.',
    description:
      'I denne praktiske workshopen vil vi gå gjennom grunnleggende loddingsteknikker og guide deg gjennom å lage ditt eget temperatur- og fuktighetssensorkit. Du går hjem med verdifulle loddingsferdigheter og en fungerende sensor til bruk i fremtidige prosjekter!',
    location: 'R51',
    locale: 'nb-NO',
  },
  {
    eventId: 7,
    name: 'Advanced 3D Modeling in Fusion 360',
    summary: 'A session on advanced 3D modeling techniques using Fusion 360.',
    description:
      "Take your 3D modeling skills to the next level with our advanced workshop in Fusion 360! We'll cover complex shapes, custom design features, and optimization tips. Ideal for those with some prior experience in 3D modeling who want to enhance their capabilities.",
    location: 'Hackerspace workshop',
    locale: 'en-GB',
  },
  {
    eventId: 7,
    name: 'Avansert 3D-modellering i Fusion 360',
    summary: 'En økt om avanserte 3D-modelleringsteknikker med Fusion 360.',
    description:
      'Ta dine 3D-modelleringsferdigheter til neste nivå med vår avanserte workshop i Fusion 360! Vi vil dekke komplekse former, tilpassede designfunksjoner og optimaliseringstips. Ideelt for de med noe tidligere erfaring innen 3D-modellering som ønsker å forbedre sine ferdigheter.',
    location: 'Hackerspace-verkstedet',
    locale: 'nb-NO',
  },
  {
    eventId: 8,
    name: 'Cybersecurity Basics: Protecting Your Digital Life',
    summary:
      'Learn the basics of cybersecurity and best practices for online safety.',
    description:
      "In this workshop, we'll go over the essential cybersecurity concepts and teach you how to protect yourself online. Topics will include password security, recognizing phishing attempts, and maintaining secure communications. A must-attend for anyone wanting to safeguard their digital presence.",
    location: 'R50',
    locale: 'en-GB',
  },
  {
    eventId: 8,
    name: 'Grunnleggende cybersikkerhet: Beskytt ditt digitale liv',
    summary:
      'Lær det grunnleggende om cybersikkerhet og beste praksis for nettsikkerhet.',
    description:
      'I denne workshopen går vi gjennom grunnleggende cybersikkerhetskonsepter og lærer deg hvordan du beskytter deg på nett. Emner vil inkludere passord-sikkerhet, gjenkjenning av phishing-forsøk og opprettholdelse av sikker kommunikasjon. Et must for alle som ønsker å beskytte sin digitale tilstedeværelse.',
    location: 'R50',
    locale: 'nb-NO',
  },
];

export {
  usersData,
  groupsData,
  groupLocalizationsData,
  usersGroupsData,
  skillsData,
  usersSkillsData,
  storageItemCategories,
  storageItemsData,
  storageItemLocalizations,
  shiftsData,
  eventsData,
  eventLocalizationsData,
};
