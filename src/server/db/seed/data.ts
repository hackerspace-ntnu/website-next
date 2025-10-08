import { fakerEN, fakerNB_NO } from '@faker-js/faker';
import type { Locale } from 'next-intl';
import { groupIdentifiers } from '@/lib/constants';
import { hashPassword } from '@/server/auth/password';
import type {
  InsertEvent,
  InsertEventLocalization,
  InsertGroup,
  InsertGroupLocalization,
  InsertItemCategory,
  InsertItemLocalization,
  InsertNewsArticle,
  InsertNewsArticleLocalization,
  InsertQuote,
  InsertQuoteLocalization,
  InsertRuleLocalizations,
  InsertRules,
  InsertShift,
  InsertSkill,
  InsertStorageItem,
  InsertUser,
  InsertUserGroup,
  InsertUserSkill,
} from '@/server/db/tables';

// To generate fake data use these helpers
const faker = {
  'en-GB': fakerEN,
  'nb-NO': fakerNB_NO,
};

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
    description: [
      {
        children: [
          {
            text: 'The DevOps group is responsible for managing the infrastructure and operations of Hackerspace. They work on automating processes, managing servers, and ensuring smooth operations.',
          },
        ],
        type: 'p',
      },
    ],
    locale: 'en-GB',
  },
  {
    groupId: 1,
    name: 'DevOps',
    summary: 'DevOps fokuserer på infrastruktur og drift.',
    description: [
      {
        children: [
          {
            text: 'DevOps er ansvarlig for å administrere infrastruktur og drift av Hackerspace. De jobber med automatisering av prosesser, serveradministrasjon og sikrer smidig drift.',
          },
        ],
        type: 'p',
      },
    ],
    locale: 'nb-NO',
  },
  {
    groupId: 2,
    name: 'LabOps',
    summary: "LabOps handles Hackerspace's operations.",
    description: [
      {
        children: [
          {
            text: 'The LabOps group is responsible for managing the operations of Hackerspace. They work on maintaining equipment, ensuring safety protocols, and facilitating events.',
          },
        ],
        type: 'p',
      },
    ],
    locale: 'en-GB',
  },
  {
    groupId: 2,
    name: 'LabOps',
    summary: 'LabOps driver verkstedet.',
    description: [
      {
        children: [
          {
            text: 'LabOps-gruppen er ansvarlig for å administrere driften av Hackerspace. De jobber med vedlikehold av utstyr, sikkerhetsprotokoller og tilrettelegging av arrangementer.',
          },
        ],
        type: 'p',
      },
    ],
    locale: 'nb-NO',
  },
  {
    groupId: 3,
    name: 'Leadership',
    summary: 'Leadership group focused on strategic direction.',
    description: [
      {
        children: [
          {
            text: 'The Leadership group is responsible for setting the strategic direction of Hackerspace. They work on long-term planning, community engagement, and overall management.',
          },
        ],
        type: 'p',
      },
    ],
    locale: 'en-GB',
  },
  {
    groupId: 3,
    name: 'Lederskap',
    summary: 'Lederskapsgruppen er fokusert på strategisk retning.',
    description: [
      {
        children: [
          {
            text: 'Lederskapsgruppen er ansvarlig for å sette den strategiske retningen for Hackerspace. De jobber med langsiktig planlegging, samfunnsengasjement og overordnet ledelse.',
          },
        ],
        type: 'p',
      },
    ],
    locale: 'nb-NO',
  },
  {
    groupId: 4,
    name: 'Management',
    summary: 'Management group focused on organizational oversight.',
    description: [
      {
        children: [
          {
            text: 'The Management group is consists of all leaders from the different groups in Hackerspace.',
          },
        ],
        type: 'p',
      },
    ],
    locale: 'en-GB',
  },
  {
    groupId: 4,
    name: 'Styret',
    summary: 'Styret er fokusert på organisatorisk tilsyn.',
    description: [
      {
        children: [
          {
            text: 'Styret består av alle ledere fra de forskjellige gruppene i Hackerspace.',
          },
        ],
        type: 'p',
      },
    ],
    locale: 'nb-NO',
  },
  {
    groupId: 5,
    name: 'Trusted Representative',
    summary: 'A selected member which can be contacted for various inquiries.',
    description: [
      {
        children: [
          {
            text: 'Hackerspace shall have a representative who is appointed during the general assembly. This representative has no voting rights on the board but is a contact person for Hackerspace members regarding issues they do not wish to address directly with the board. The representative has a duty of confidentiality and will, if necessary, relay issues anonymized to the board.',
          },
        ],
        type: 'p',
      },
    ],
    locale: 'en-GB',
  },
  {
    groupId: 5,
    name: 'Tillitsvalgt',
    summary: 'Et utvalgt medlem som kan kontaktes for ulike henvendelser.',
    description: [
      {
        children: [
          {
            text: 'Hackerspace skal ha en tillitsvalgt som blir utnevnt under generalforsamlingen. Denne tillitsvalgte har ingen stemme i styret, men er en kontaktperson for medlemmer av Hackerspace for saker de ikke ønsker å ta direkte opp med styret. Tillitsvalgt har taushetsplikt, og vil ved behov videreformidle saker anonymisert til styret.',
          },
        ],
        type: 'p',
      },
    ],
    locale: 'nb-NO',
  },
  {
    groupId: 6,
    name: 'TTRPG',
    summary: 'TTRPG group focused on tabletop role-playing games.',
    description: [
      {
        children: [
          {
            text: 'The TTRPG group is dedicated to tabletop role-playing games. They organize game sessions, create campaigns, and foster a community of gamers.',
          },
        ],
        type: 'p',
      },
    ],
    locale: 'en-GB',
  },
  {
    groupId: 6,
    name: 'TTRPG',
    summary: 'TTRPG-gruppa er fokusert på bordrollespill.',
    description: [
      {
        children: [
          {
            text: 'TTRPG-gruppa er dedikert til bordrollespill. De organiserer spillsesjoner, lager kampanjer og fremmer et fellesskap av spillere.',
          },
        ],
        type: 'p',
      },
    ],
    locale: 'nb-NO',
  },
  {
    groupId: 7,
    name: 'Breadboard',
    summary: 'Breadboard group focused on electronics prototyping.',
    description: [
      {
        children: [
          {
            text: 'The Breadboard group is focused on electronics prototyping and experimentation. They work on building circuits, testing components, and sharing knowledge about electronics.',
          },
        ],
        type: 'p',
      },
    ],
    locale: 'en-GB',
  },
  {
    groupId: 7,
    name: 'Breadboard',
    summary: 'Breadboard-gruppe fokusert på elektronikkprototyping.',
    description: [
      {
        children: [
          {
            text: 'Breadboard-gruppen er fokusert på elektronikkprototyping og eksperimentering. De jobber med å bygge kretser, teste komponenter og dele kunnskap om elektronikk.',
          },
        ],
        type: 'p',
      },
    ],
    locale: 'nb-NO',
  },
  {
    groupId: 8,
    name: 'Pang',
    summary:
      'Members which have fulfilled their duties and are now retired from Hackerspace.',
    description: [
      {
        children: [
          {
            text: 'The Pang group consists of members who have fulfilled their duties and are now retired from the Hackerspace. They are recognized for their contributions and continue to be part of the community.',
          },
        ],
        type: 'p',
      },
    ],
    locale: 'en-GB',
  },
  {
    groupId: 8,
    name: 'Pang',
    summary:
      'Medlemmer som har fullført sine plikter og er nå pensjonert fra Hackerspace.',
    description: [
      {
        children: [
          {
            text: 'Pang-gruppen består av medlemmer som har fullført sine plikter og er nå pensjonert fra Hackerspace. De anerkjennes for sine bidrag og fortsetter å være en del av fellesskapet.',
          },
        ],
        type: 'p',
      },
    ],
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
    userId: 1,
    groupId: 1,
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
    description: [
      {
        children: [
          {
            text: "Join us for an introductory workshop on 3D printing! Learn about the various types of 3D printers, materials, and software needed to design and print your own projects. By the end of the session, you'll be able to print your first 3D object!",
          },
        ],
        type: 'p',
      },
    ],
    location: 'Hackerspace workshop',
    locale: 'en-GB',
  },
  {
    eventId: 1,
    name: 'Introduksjon til 3D-utskrift',
    summary: 'En nybegynnervennlig workshop om grunnleggende 3D-utskrift.',
    description: [
      {
        children: [
          {
            text: 'Bli med på en introduksjonsworkshop om 3D-utskrift! Lær om ulike typer 3D-skrivere, materialer og programvare som trengs for å designe og skrive ut dine egne prosjekter. Ved slutten av økten vil du være i stand til å skrive ut ditt første 3D-objekt!',
          },
        ],
        type: 'p',
      },
    ],
    location: 'Hackerspace-verkstedet',
    locale: 'nb-NO',
  },
  {
    eventId: 2,
    name: 'Build Your First Circuit',
    summary:
      'Hands-on workshop to design and build a simple electronic circuit.',
    description: [
      {
        children: [
          {
            text: "Ever wanted to create your own electronics? In this workshop, we'll guide you through building your first circuit! You'll learn about the basics of circuit components and practice your soldering skills to create a simple LED light setup.",
          },
        ],
        type: 'p',
      },
    ],
    location: 'R50',
    locale: 'en-GB',
  },
  {
    eventId: 2,
    name: 'Bygg din første krets',
    summary:
      'Praktisk workshop for å designe og bygge en enkel elektronisk krets.',
    description: [
      {
        children: [
          {
            text: 'Har du alltid ønsket å lage din egen elektronikk? I denne workshopen guider vi deg gjennom byggingen av din første krets! Du lærer om grunnleggende kretskomponenter og får øve på loddeferdighetene dine for å lage et enkelt LED-lys oppsett.',
          },
        ],
        type: 'p',
      },
    ],
    location: 'R50',
    locale: 'nb-NO',
  },
  {
    eventId: 3,
    name: 'AI in Robotics: Applications and Future Trends',
    summary: 'A talk on the role of AI in robotics and its future.',
    description: [
      {
        children: [
          {
            text: "This session explores the impact of artificial intelligence in the field of robotics. We'll discuss recent advancements, applications in industry and academia, and potential future directions. A Q&A session will follow.",
          },
        ],
        type: 'p',
      },
    ],
    location: 'Smia',
    locale: 'en-GB',
  },
  {
    eventId: 3,
    name: 'AI i robotikk: Anvendelser og fremtidige trender',
    summary:
      'En samtale om rollen til kunstig intelligens i robotikk og dens fremtid.',
    description: [
      {
        children: [
          {
            text: 'Denne sesjonen utforsker påvirkningen av kunstig intelligens innen robotikkfeltet. Vi diskuterer nylige fremskritt, anvendelser i industri og akademia, samt potensielle fremtidige retninger. En spørsmål-og-svar-sesjon vil følge.',
          },
        ],
        type: 'p',
      },
    ],
    location: 'Smia',
    locale: 'nb-NO',
  },
  {
    eventId: 4,
    name: 'Hackathon NTNU 2024 Kickoff',
    summary:
      'Kickoff meeting for Hackathon NTNU 2024 with information on teams, rules, and prizes.',
    description: [
      {
        children: [
          {
            text: "Get ready for the biggest Hackathon of the year! Join us for the Hackathon NTNU 2024 kickoff event where you'll learn about the competition structure, form teams, and get all the essential details for the event. Don't miss out on a chance to showcase your skills and win prizes!",
          },
        ],
        type: 'p',
      },
    ],
    location: 'Hackerspace workshop',
    locale: 'en-GB',
  },
  {
    eventId: 4,
    name: 'Hackathon NTNU 2024 Oppstart',
    summary:
      'Oppstartsmøte for Hackathon NTNU 2024 med informasjon om lag, regler og premier.',
    description: [
      {
        children: [
          {
            text: 'Gjør deg klar for årets største Hackathon! Bli med på Hackathon NTNU 2024 oppstartsarrangement hvor du vil lære om konkurransestrukturen, danne lag, og få alle viktige detaljer for arrangementet. Ikke gå glipp av muligheten til å vise frem ferdighetene dine og vinne premier!',
          },
        ],
        type: 'p',
      },
    ],
    location: 'Hackerspace-verkstedet',
    locale: 'nb-NO',
  },
  {
    eventId: 5,
    name: 'Basics of Python for Data Science',
    summary: 'An introductory workshop on Python programming for data science.',
    description: [
      {
        children: [
          {
            text: "Learn Python fundamentals with a focus on data science! In this beginner-friendly session, we'll cover essential Python libraries and data manipulation techniques using pandas, NumPy, and matplotlib. Perfect for anyone interested in getting started with data analysis!",
          },
        ],
        type: 'p',
      },
    ],
    location: 'Hackerspace workshop',
    locale: 'en-GB',
  },
  {
    eventId: 5,
    name: 'Grunnleggende Python for datanalyse',
    summary: 'En introduksjonsworkshop om Python-programmering for datanalyse.',
    description: [
      {
        children: [
          {
            text: 'Lær Python-grunnlag med fokus på datanalyse! I denne nybegynnervennlige økten vil vi gå gjennom essensielle Python-biblioteker og datateknikker ved hjelp av pandas, NumPy og matplotlib. Perfekt for alle som er interessert i å komme i gang med dataanalyse!',
          },
        ],
        type: 'p',
      },
    ],
    location: 'Hackerspace-verkstedet',
    locale: 'nb-NO',
  },
  {
    eventId: 6,
    name: 'Soldering 101: Building Your Own Sensor Kit',
    summary: 'Learn the basics of soldering and create a custom sensor kit.',
    description: [
      {
        children: [
          {
            text: "In this hands-on workshop, we'll cover the basics of soldering and guide you through creating your own temperature and humidity sensor kit. You'll walk away with valuable soldering skills and a working sensor to use in future projects!",
          },
        ],
        type: 'p',
      },
    ],
    location: 'R51',
    locale: 'en-GB',
  },
  {
    eventId: 6,
    name: 'Lodding 101: Bygg din egen sensorkit',
    summary:
      'Lær det grunnleggende om lodding og lag et egendefinert sensorkit.',
    description: [
      {
        children: [
          {
            text: 'I denne praktiske workshopen vil vi gå gjennom grunnleggende loddingsteknikker og guide deg gjennom å lage ditt eget temperatur- og fuktighetssensorkit. Du går hjem med verdifulle loddingsferdigheter og en fungerende sensor til bruk i fremtidige prosjekter!',
          },
        ],
        type: 'p',
      },
    ],
    location: 'R51',
    locale: 'nb-NO',
  },
  {
    eventId: 7,
    name: 'Advanced 3D Modeling in Fusion 360',
    summary: 'A session on advanced 3D modeling techniques using Fusion 360.',
    description: [
      {
        children: [
          {
            text: "Take your 3D modeling skills to the next level with our advanced workshop in Fusion 360! We'll cover complex shapes, custom design features, and optimization tips. Ideal for those with some prior experience in 3D modeling who want to enhance their capabilities.",
          },
        ],
        type: 'p',
      },
    ],
    location: 'Hackerspace workshop',
    locale: 'en-GB',
  },
  {
    eventId: 7,
    name: 'Avansert 3D-modellering i Fusion 360',
    summary: 'En økt om avanserte 3D-modelleringsteknikker med Fusion 360.',
    description: [
      {
        children: [
          {
            text: 'Ta dine 3D-modelleringsferdigheter til neste nivå med vår avanserte workshop i Fusion 360! Vi vil dekke komplekse former, tilpassede designfunksjoner og optimaliseringstips. Ideelt for de med noe tidligere erfaring innen 3D-modellering som ønsker å forbedre sine ferdigheter.',
          },
        ],
        type: 'p',
      },
    ],
    location: 'Hackerspace-verkstedet',
    locale: 'nb-NO',
  },
  {
    eventId: 8,
    name: 'Cybersecurity Basics: Protecting Your Digital Life',
    summary:
      'Learn the basics of cybersecurity and best practices for online safety.',
    description: [
      {
        children: [
          {
            text: "In this workshop, we'll go over the essential cybersecurity concepts and teach you how to protect yourself online. Topics will include password security, recognizing phishing attempts, and maintaining secure communications. A must-attend for anyone wanting to safeguard their digital presence.",
          },
        ],
        type: 'p',
      },
    ],
    location: 'R50',
    locale: 'en-GB',
  },
  {
    eventId: 8,
    name: 'Grunnleggende cybersikkerhet: Beskytt ditt digitale liv',
    summary:
      'Lær det grunnleggende om cybersikkerhet og beste praksis for nettsikkerhet.',
    description: [
      {
        children: [
          {
            text: 'I denne workshopen går vi gjennom grunnleggende cybersikkerhetskonsepter og lærer deg hvordan du beskytter deg på nett. Emner vil inkludere passord-sikkerhet, gjenkjenning av phishing-forsøk og opprettholdelse av sikker kommunikasjon. Et must for alle som ønsker å beskytte sin digitale tilstedeværelse.',
          },
        ],
        type: 'p',
      },
    ],
    location: 'R50',
    locale: 'nb-NO',
  },
];

const articleData: InsertNewsArticle[] = [
  {
    internal: true,
    createdAt: faker['en-GB'].date.past(),
    views: faker['en-GB'].number.int({ min: 0, max: 10_000 }),
    authorId: faker['en-GB'].number.int({ min: 1, max: usersData.length }),
  },
  {
    internal: false,
    createdAt: faker['en-GB'].date.past(),
    views: faker['en-GB'].number.int({ min: 0, max: 10_000 }),
    authorId: faker['en-GB'].number.int({ min: 1, max: usersData.length }),
  },
  {
    internal: false,
    createdAt: faker['en-GB'].date.past(),
    views: faker['en-GB'].number.int({ min: 0, max: 10_000 }),
    authorId: faker['en-GB'].number.int({ min: 1, max: usersData.length }),
  },
  {
    internal: true,
    createdAt: faker['en-GB'].date.past(),
    views: faker['en-GB'].number.int({ min: 0, max: 10_000 }),
    authorId: faker['en-GB'].number.int({ min: 1, max: usersData.length }),
  },
  {
    internal: false,
    createdAt: faker['en-GB'].date.past(),
    views: faker['en-GB'].number.int({ min: 0, max: 10_000 }),
    authorId: faker['en-GB'].number.int({ min: 1, max: usersData.length }),
  },
  {
    internal: true,
    createdAt: faker['en-GB'].date.past(),
    views: faker['en-GB'].number.int({ min: 0, max: 10_000 }),
    authorId: faker['en-GB'].number.int({ min: 1, max: usersData.length }),
  },
  {
    internal: false,
    createdAt: faker['en-GB'].date.past(),
    views: faker['en-GB'].number.int({ min: 0, max: 10_000 }),
    authorId: faker['en-GB'].number.int({ min: 1, max: usersData.length }),
  },
  {
    internal: false,
    createdAt: faker['en-GB'].date.past(),
    views: faker['en-GB'].number.int({ min: 0, max: 10_000 }),
    authorId: faker['en-GB'].number.int({ min: 1, max: usersData.length }),
  },
  {
    internal: true,
    createdAt: faker['en-GB'].date.past(),
    authorId: faker['en-GB'].number.int({ min: 1, max: usersData.length }),
  },
  {
    internal: true,
    createdAt: faker['en-GB'].date.past(),
    authorId: faker['en-GB'].number.int({ min: 1, max: usersData.length }),
  },
  {
    internal: false,
    createdAt: faker['en-GB'].date.past(),
    authorId: faker['en-GB'].number.int({ min: 1, max: usersData.length }),
  },
  {
    internal: false,
    createdAt: faker['en-GB'].date.past(),
    authorId: faker['en-GB'].number.int({ min: 1, max: usersData.length }),
  },
  {
    internal: true,
    createdAt: faker['en-GB'].date.past(),
    authorId: faker['en-GB'].number.int({ min: 1, max: usersData.length }),
  },
  {
    internal: false,
    createdAt: faker['en-GB'].date.past(),
    authorId: faker['en-GB'].number.int({ min: 1, max: usersData.length }),
  },
  {
    internal: true,
    createdAt: faker['en-GB'].date.past(),
    authorId: faker['en-GB'].number.int({ min: 1, max: usersData.length }),
  },
  {
    internal: false,
    createdAt: faker['en-GB'].date.past(),
    authorId: faker['en-GB'].number.int({ min: 1, max: usersData.length }),
  },
  {
    internal: false,
    createdAt: faker['en-GB'].date.past(),
    authorId: faker['en-GB'].number.int({ min: 1, max: usersData.length }),
  },
  {
    internal: false,
    createdAt: faker['en-GB'].date.past(),
    authorId: faker['en-GB'].number.int({ min: 1, max: usersData.length }),
  },
  {
    internal: false,
    createdAt: faker['en-GB'].date.past(),
    authorId: faker['en-GB'].number.int({ min: 1, max: usersData.length }),
  },
  {
    internal: false,
    createdAt: faker['en-GB'].date.past(),
    authorId: faker['en-GB'].number.int({ min: 1, max: usersData.length }),
  },
  {
    internal: false,
    createdAt: faker['en-GB'].date.past(),
    authorId: faker['en-GB'].number.int({ min: 1, max: usersData.length }),
  },
  {
    internal: true,
    createdAt: faker['en-GB'].date.past(),
    authorId: faker['en-GB'].number.int({ min: 1, max: usersData.length }),
  },
  {
    internal: false,
    createdAt: faker['en-GB'].date.past(),
    authorId: faker['en-GB'].number.int({ min: 1, max: usersData.length }),
  },
];

const articleLocalizationsData: InsertNewsArticleLocalization[] = [
  {
    articleId: 1,
    title: 'Gruppestatus: Prosjekt spill',
    content: [
      {
        children: [
          {
            text: faker['nb-NO'].lorem.paragraphs(3),
          },
        ],
        type: 'p',
      },
    ],
    locale: 'nb-NO',
  },
  {
    articleId: 1,
    title: 'Group status: Project Game',
    content: [
      {
        children: [
          {
            text: faker['en-GB'].lorem.paragraphs(3),
          },
        ],
        type: 'p',
      },
    ],
    locale: 'en-GB',
  },
  {
    articleId: 2,
    title: 'DevOps-møtet',
    content: [
      {
        children: [
          {
            text: faker['nb-NO'].lorem.paragraphs(3),
          },
        ],
        type: 'p',
      },
    ],
    locale: 'nb-NO',
  },
  {
    articleId: 2,
    title: 'DevOps Meeting',
    content: [
      {
        children: [
          {
            text: faker['en-GB'].lorem.paragraphs(3),
          },
        ],
        type: 'p',
      },
    ],
    locale: 'en-GB',
  },
  {
    articleId: 3,
    title: 'Jonas er kul',
    content: [
      {
        children: [
          {
            text: faker['nb-NO'].lorem.paragraphs(3),
          },
        ],
        type: 'p',
      },
    ],
    locale: 'nb-NO',
  },
  {
    articleId: 3,
    title: 'Jonas is cool',
    content: [
      {
        children: [
          {
            text: faker['en-GB'].lorem.paragraphs(3),
          },
        ],
        type: 'p',
      },
    ],
    locale: 'en-GB',
  },
  {
    articleId: 4,
    title: 'Iskrem er godt',
    content: [
      {
        children: [
          {
            text: faker['nb-NO'].lorem.paragraphs(3),
          },
        ],
        type: 'p',
      },
    ],
    locale: 'nb-NO',
  },
  {
    articleId: 4,
    title: 'Ice cream is good',
    content: [
      {
        children: [
          {
            text: faker['en-GB'].lorem.paragraphs(3),
          },
        ],
        type: 'p',
      },
    ],
    locale: 'en-GB',
  },
  {
    articleId: 5,
    title: 'Hvorfor er jeg her?',
    content: [
      {
        children: [
          {
            text: faker['nb-NO'].lorem.paragraphs(3),
          },
        ],
        type: 'p',
      },
    ],
    locale: 'nb-NO',
  },
  {
    articleId: 5,
    title: 'Why am I here?',
    content: [
      {
        children: [
          {
            text: faker['en-GB'].lorem.paragraphs(3),
          },
        ],
        type: 'p',
      },
    ],
    locale: 'en-GB',
  },
  {
    articleId: 6,
    title: 'Hvorfor er jeg her?',
    content: [
      {
        children: [
          {
            text: faker['nb-NO'].lorem.paragraphs(3),
          },
        ],
        type: 'p',
      },
    ],
    locale: 'nb-NO',
  },
  {
    articleId: 6,
    title: 'Why am I here?',
    content: [
      {
        children: [
          {
            text: faker['en-GB'].lorem.paragraphs(3),
          },
        ],
        type: 'p',
      },
    ],
    locale: 'en-GB',
  },
  {
    articleId: 7,
    title: 'Hvorfor er jeg her?',
    content: [
      {
        children: [
          {
            text: faker['nb-NO'].lorem.paragraphs(3),
          },
        ],
        type: 'p',
      },
    ],
    locale: 'nb-NO',
  },
  {
    articleId: 7,
    title: 'Why am I here?',
    content: [
      {
        children: [
          {
            text: faker['en-GB'].lorem.paragraphs(3),
          },
        ],
        type: 'p',
      },
    ],
    locale: 'en-GB',
  },
  {
    articleId: 8,
    title: 'Dette er en veeeeldig lang overskrift som skal testes',
    content: [
      {
        children: [
          {
            text: faker['nb-NO'].lorem.paragraphs(3),
          },
        ],
        type: 'p',
      },
    ],
    locale: 'nb-NO',
  },
  {
    articleId: 8,
    title: 'This is a veeeery long headline that should be tested',
    content: [
      {
        children: [
          {
            text: faker['en-GB'].lorem.paragraphs(3),
          },
        ],
        type: 'p',
      },
    ],
    locale: 'en-GB',
  },
  {
    articleId: 9,
    title: faker['nb-NO'].lorem.sentence(),
    content: [
      {
        children: [
          {
            text: faker['nb-NO'].lorem.paragraphs(3),
          },
        ],
        type: 'p',
      },
    ],
    locale: 'nb-NO',
  },
  {
    articleId: 9,
    title: faker['en-GB'].lorem.sentence(),
    content: [
      {
        children: [
          {
            text: faker['en-GB'].lorem.paragraphs(3),
          },
        ],
        type: 'p',
      },
    ],
    locale: 'en-GB',
  },
  {
    articleId: 10,
    title: faker['nb-NO'].lorem.sentence(),
    content: [
      {
        children: [
          {
            text: faker['nb-NO'].lorem.paragraphs(3),
          },
        ],
        type: 'p',
      },
    ],
    locale: 'nb-NO',
  },
  {
    articleId: 10,
    title: faker['en-GB'].lorem.sentence(),
    content: [
      {
        children: [
          {
            text: faker['en-GB'].lorem.paragraphs(3),
          },
        ],
        type: 'p',
      },
    ],
    locale: 'en-GB',
  },
  {
    articleId: 11,
    title: faker['nb-NO'].lorem.sentence(),
    content: [
      {
        children: [
          {
            text: faker['nb-NO'].lorem.paragraphs(3),
          },
        ],
        type: 'p',
      },
    ],
    locale: 'nb-NO',
  },
  {
    articleId: 11,
    title: faker['en-GB'].lorem.sentence(),
    content: [
      {
        children: [
          {
            text: faker['en-GB'].lorem.paragraphs(3),
          },
        ],
        type: 'p',
      },
    ],
    locale: 'en-GB',
  },
  {
    articleId: 12,
    title: faker['nb-NO'].lorem.sentence(),
    content: [
      {
        children: [
          {
            text: faker['nb-NO'].lorem.paragraphs(3),
          },
        ],
        type: 'p',
      },
    ],
    locale: 'nb-NO',
  },
  {
    articleId: 12,
    title: faker['en-GB'].lorem.sentence(),
    content: [
      {
        children: [
          {
            text: faker['en-GB'].lorem.paragraphs(3),
          },
        ],
        type: 'p',
      },
    ],
    locale: 'en-GB',
  },
  {
    articleId: 13,
    title: faker['nb-NO'].lorem.sentence(),
    content: [
      {
        children: [
          {
            text: faker['nb-NO'].lorem.paragraphs(3),
          },
        ],
        type: 'p',
      },
    ],
    locale: 'nb-NO',
  },
  {
    articleId: 13,
    title: faker['en-GB'].lorem.sentence(),
    content: [
      {
        children: [
          {
            text: faker['en-GB'].lorem.paragraphs(3),
          },
        ],
        type: 'p',
      },
    ],
    locale: 'en-GB',
  },
  {
    articleId: 14,
    title: faker['nb-NO'].lorem.sentence(),
    content: [
      {
        children: [
          {
            text: faker['nb-NO'].lorem.paragraphs(3),
          },
        ],
        type: 'p',
      },
    ],
    locale: 'nb-NO',
  },
  {
    articleId: 14,
    title: faker['en-GB'].lorem.sentence(),
    content: [
      {
        children: [
          {
            text: faker['en-GB'].lorem.paragraphs(3),
          },
        ],
        type: 'p',
      },
    ],
    locale: 'en-GB',
  },
  {
    articleId: 15,
    title: faker['nb-NO'].lorem.sentence(),
    content: [
      {
        children: [
          {
            text: faker['nb-NO'].lorem.paragraphs(3),
          },
        ],
        type: 'p',
      },
    ],
    locale: 'nb-NO',
  },
  {
    articleId: 15,
    title: faker['en-GB'].lorem.sentence(),
    content: [
      {
        children: [
          {
            text: faker['en-GB'].lorem.paragraphs(3),
          },
        ],
        type: 'p',
      },
    ],
    locale: 'en-GB',
  },
  {
    articleId: 16,
    title: faker['nb-NO'].lorem.sentence(),
    content: [
      {
        children: [
          {
            text: faker['nb-NO'].lorem.paragraphs(3),
          },
        ],
        type: 'p',
      },
    ],
    locale: 'nb-NO',
  },
  {
    articleId: 16,
    title: faker['en-GB'].lorem.sentence(),
    content: [
      {
        children: [
          {
            text: faker['en-GB'].lorem.paragraphs(3),
          },
        ],
        type: 'p',
      },
    ],
    locale: 'en-GB',
  },
  {
    articleId: 17,
    title: faker['nb-NO'].lorem.sentence(),
    content: [
      {
        children: [
          {
            text: faker['nb-NO'].lorem.paragraphs(3),
          },
        ],
        type: 'p',
      },
    ],
    locale: 'nb-NO',
  },
  {
    articleId: 17,
    title: faker['en-GB'].lorem.sentence(),
    content: [
      {
        children: [
          {
            text: faker['en-GB'].lorem.paragraphs(3),
          },
        ],
        type: 'p',
      },
    ],
    locale: 'en-GB',
  },
  {
    articleId: 18,
    title: faker['nb-NO'].lorem.sentence(),
    content: [
      {
        children: [
          {
            text: faker['nb-NO'].lorem.paragraphs(3),
          },
        ],
        type: 'p',
      },
    ],
    locale: 'nb-NO',
  },
  {
    articleId: 18,
    title: faker['en-GB'].lorem.sentence(),
    content: [
      {
        children: [
          {
            text: faker['en-GB'].lorem.paragraphs(3),
          },
        ],
        type: 'p',
      },
    ],
    locale: 'en-GB',
  },
  {
    articleId: 19,
    title: faker['nb-NO'].lorem.sentence(),
    content: [
      {
        children: [
          {
            text: faker['nb-NO'].lorem.paragraphs(3),
          },
        ],
        type: 'p',
      },
    ],
    locale: 'nb-NO',
  },
  {
    articleId: 19,
    title: faker['en-GB'].lorem.sentence(),
    content: [
      {
        children: [
          {
            text: faker['en-GB'].lorem.paragraphs(3),
          },
        ],
        type: 'p',
      },
    ],
    locale: 'en-GB',
  },
  {
    articleId: 20,
    title: faker['nb-NO'].lorem.sentence(),
    content: [
      {
        children: [
          {
            text: faker['nb-NO'].lorem.paragraphs(3),
          },
        ],
        type: 'p',
      },
    ],
    locale: 'nb-NO',
  },
  {
    articleId: 20,
    title: faker['en-GB'].lorem.sentence(),
    content: [
      {
        children: [
          {
            text: faker['en-GB'].lorem.paragraphs(3),
          },
        ],
        type: 'p',
      },
    ],
    locale: 'en-GB',
  },
  {
    articleId: 21,
    title: faker['nb-NO'].lorem.sentence(),
    content: [
      {
        children: [
          {
            text: faker['nb-NO'].lorem.paragraphs(3),
          },
        ],
        type: 'p',
      },
    ],
    locale: 'nb-NO',
  },
  {
    articleId: 21,
    title: faker['en-GB'].lorem.sentence(),
    content: [
      {
        children: [
          {
            text: faker['en-GB'].lorem.paragraphs(3),
          },
        ],
        type: 'p',
      },
    ],
    locale: 'en-GB',
  },
  {
    articleId: 22,
    title: faker['nb-NO'].lorem.sentence(),
    content: [
      {
        children: [
          {
            text: faker['nb-NO'].lorem.paragraphs(3),
          },
        ],
        type: 'p',
      },
    ],
    locale: 'nb-NO',
  },
  {
    articleId: 22,
    title: faker['en-GB'].lorem.sentence(),
    content: [
      {
        children: [
          {
            text: faker['en-GB'].lorem.paragraphs(3),
          },
        ],
        type: 'p',
      },
    ],
    locale: 'en-GB',
  },
  {
    articleId: 23,
    title: faker['nb-NO'].lorem.sentence(),
    content: [
      {
        children: [
          {
            text: faker['nb-NO'].lorem.paragraphs(3),
          },
        ],
        type: 'p',
      },
    ],
    locale: 'nb-NO',
  },
  {
    articleId: 23,
    title: faker['en-GB'].lorem.sentence(),
    content: [
      {
        children: [
          {
            text: faker['en-GB'].lorem.paragraphs(3),
          },
        ],
        type: 'p',
      },
    ],
    locale: 'en-GB',
  },
];

const quotesData: InsertQuote[] = [
  {
    saidBy: 1,
    heardBy: 2,
    internal: false,
  },
  {
    saidBy: 5,
    heardBy: 2,
    internal: false,
  },
];

const quoteLocalizationsData: InsertQuoteLocalization[] = [
  {
    quoteId: 1,
    content: 'Hvordan kan speil være ekte?',
    locale: 'nb-NO',
  },
  {
    quoteId: 1,
    content: 'How can mirrors be real?',
    locale: 'en-GB',
  },
  {
    quoteId: 2,
    content: 'Jeg har en drøm',
    locale: 'nb-NO',
  },
  {
    quoteId: 2,
    content: 'I have a dream',
    locale: 'en-GB',
  },
];

for (let i = 3; i < 100; i++) {
  quotesData.push({
    heardBy: Math.floor(Math.random() * 5) + 1,
    saidBy: Math.floor(Math.random() * 5) + 1,
    internal: i > 50,
  });
  quoteLocalizationsData.push(
    ...[
      {
        quoteId: i,
        content: faker['nb-NO'].lorem.sentence(),
        locale: 'nb-NO' as Locale,
      },
      {
        quoteId: i,
        content: faker['en-GB'].lorem.sentence(),
        locale: 'en-GB' as Locale,
      },
    ],
  );
}

const rulesData: InsertRules[] = [
  { internal: true },
  { internal: true },
  { internal: false },
  { internal: true },
  { internal: false },
  { internal: true },
  { internal: true },
  { internal: true },
  { internal: true },
  { internal: false },
  { internal: false },
  { internal: true },
  { internal: false },
  { internal: true },
];

const ruleLocalizationData: InsertRuleLocalizations[] = [
  {
    ruleId: 1,
    name: 'Regler for regler',
    content:
      'Reglene eksisterer av en grunn, overhold dem! • For din egen sikkerhet, andre sin sikkerhet og for at utstyr skal vare. • Regler håndheves av LabOps, Styret og Ledelsen • Si ifra hvis du ser regelbrudd. Ta ansvar. • Hvis du ikke vil si ifra selv, kan du gå via tillitsvalgt, som har taushetsplikt • Hvis reglene ikke følges, kan det føre til at man ikke får bruke utstyret, eller at man blir utestengt. • Regler kan foreslås endret og/eller fremlegges av hvem som helst, men godkjennes av styret.',
    locale: 'nb-NO',
  },
  {
    ruleId: 1,
    name: 'Rules for rules',
    content:
      "The rules exist for a reason, adhere to them! • For your own safety, the safety of others, and to ensure the equipment lasts. • Rules are enforced by LabOps, the Board, and Management • Report any rule violations you see. Take responsibility. • If you don't want to report it yourself, you can go through a union representative, who is bound by confidentiality • If the rules are not followed, it may result in losing access to the equipment or being banned. • Rules can be proposed for change and/or presented by anyone, but must be approved by the board.",
    locale: 'en-GB',
  },
  {
    ruleId: 2,
    name: 'Etiske retningslinjer',
    content:
      'Disse retningslinjene gjelder for alle medlemmer av fellesskapet. • Behandle andre med respekt og verdighet. • Unngå diskriminering og trakassering. • Ta ansvar for egne handlinger. • Rapportere uetisk atferd.',
    locale: 'nb-NO',
  },
  {
    ruleId: 2,
    name: 'Ethical guidelines',
    content:
      'These guidelines apply to all members of the community. • Treat others with respect and dignity. • Avoid discrimination and harassment. • Take responsibility for your actions. • Report unethical behavior.',
    locale: 'en-GB',
  },
  {
    ruleId: 3,
    name: 'Regler for verkstedet',
    content:
      'Disse reglene gjelder for alle som bruker verkstedet. • Rydd opp etter deg. • Følg instruksjoner fra veiledere. • Bruk verneutstyr når det er påkrevd.',
    locale: 'nb-NO',
  },
  {
    ruleId: 3,
    name: 'Rules for the workshop',
    content:
      'These rules apply to everyone using the workshop. • Clean up after yourself. • Follow instructions from supervisors. • Wear protective equipment when required.',
    locale: 'en-GB',
  },
  {
    ruleId: 4,
    name: 'Regler for vakt',
    content:
      'Disse reglene gjelder for alle som er på vakt. • Vær oppmerksom og tilstede. • Rapportere mistenkelig aktivitet. • Følg prosedyrer for nødsituasjoner.',
    locale: 'nb-NO',
  },
  {
    ruleId: 4,
    name: 'Rules for the shifts',
    content:
      'These rules apply to everyone on duty. • Be alert and present. • Report suspicious activity. • Follow emergency procedures.',
    locale: 'en-GB',
  },
  {
    ruleId: 5,
    name: 'Regler for bruk av 3D-printer',
    content:
      'Disse reglene gjelder for alle som bruker 3D-printeren. • Følg instruksjoner fra veiledere. • Bruk verneutstyr når det er påkrevd.',
    locale: 'nb-NO',
  },
  {
    ruleId: 5,
    name: 'Rules for using the 3D printer',
    content:
      'These rules apply to everyone using the 3D printer. • Follow instructions from supervisors. • Wear protective equipment when required.',
    locale: 'en-GB',
  },
  {
    ruleId: 6,
    name: 'Regler for kaffemaskin',
    content:
      'Disse reglene gjelder for alle som bruker kaffemaskinen. • Rengjør etter deg. • Følg instruksjoner fra veiledere.',
    locale: 'nb-NO',
  },
  {
    ruleId: 6,
    name: 'Rules for the coffee machine',
    content:
      'These rules apply to everyone using the coffee machine. • Clean up after yourself. • Follow instructions from supervisors.',
    locale: 'en-GB',
  },
  {
    ruleId: 7,
    name: 'Regler for utlån',
    content:
      'Disse reglene gjelder for alle som låner utstyr. • Følg prosedyrene for utlån. • Ta ansvar for utstyret du låner.',
    locale: 'nb-NO',
  },
  {
    ruleId: 7,
    name: 'Rules for lending',
    content:
      'These rules apply to everyone borrowing equipment. • Follow the borrowing procedures. • Take responsibility for the equipment you borrow.',
    locale: 'en-GB',
  },
  {
    ruleId: 8,
    name: 'Regler for kurs',
    content:
      'Disse reglene gjelder for alle som deltar på kurs. • Møt presis. • Delta aktivt. • Respekter instruktører og medstudenter.',
    locale: 'nb-NO',
  },
  {
    ruleId: 8,
    name: 'Rules for courses',
    content:
      'These rules apply to everyone attending courses. • Be on time. • Participate actively. • Respect instructors and fellow students.',
    locale: 'en-GB',
  },
  {
    ruleId: 9,
    name: 'Regler for arrangement',
    content:
      'Disse reglene gjelder for alle som deltar på arrangementer. • Møt presis. • Delta aktivt. • Respekter arrangører og meddeltakere.',
    locale: 'nb-NO',
  },
  {
    ruleId: 9,
    name: 'Rules for events',
    content:
      'These rules apply to everyone attending events. • Be on time. • Participate actively. • Respect organizers and fellow participants.',
    locale: 'en-GB',
  },
  {
    ruleId: 10,
    name: 'Regler for VR briller',
    content:
      'Disse reglene gjelder for alle som bruker VR-briller. • Følg instruksjoner fra veiledere. • Bruk verneutstyr når det er påkrevd.',
    locale: 'nb-NO',
  },
  {
    ruleId: 10,
    name: 'Rules for VR',
    content:
      'These rules apply to everyone using VR. • Follow instructions from supervisors. • Wear protective equipment when required.',
    locale: 'en-GB',
  },
  {
    ruleId: 11,
    name: 'Regler for verksted-PC',
    content:
      'Disse reglene gjelder for alle som bruker verksted-PCen. • Følg instruksjoner fra veiledere. • Bruk verneutstyr når det er påkrevd.',
    locale: 'nb-NO',
  },
  {
    ruleId: 11,
    name: 'Rules for workshop PC',
    content:
      'These rules apply to everyone using the workshop PC. • Follow instructions from supervisors. • Wear protective equipment when required.',
    locale: 'en-GB',
  },
  {
    ruleId: 12,
    name: 'Regler for kjøkkenet',
    content:
      'Disse reglene gjelder for alle som bruker kjøkkenet. • Rengjør etter deg. • Følg instruksjoner fra veiledere.',
    locale: 'nb-NO',
  },
  {
    ruleId: 12,
    name: 'Rules for the kitchen',
    content:
      'These rules apply to everyone using the kitchen. • Clean up after yourself. • Follow instructions from supervisors.',
    locale: 'en-GB',
  },
  {
    ruleId: 13,
    name: 'Regler for loddestasjon',
    content:
      'Disse reglene gjelder for alle som bruker loddestasjonen. • Følg instruksjoner fra veiledere. • Bruk verneutstyr når det er påkrevd.',
    locale: 'nb-NO',
  },
  {
    ruleId: 13,
    name: 'Rules for soldering station',
    content:
      'These rules apply to everyone using the soldering station. • Follow instructions from supervisors. • Wear protective equipment when required.',
    locale: 'en-GB',
  },
  {
    ruleId: 14,
    name: 'Regler for Drive',
    content:
      'Disse reglene gjelder for alle som bruker Drive. • Følg instruksjoner fra veiledere. • Bruk verneutstyr når det er påkrevd.',
    locale: 'nb-NO',
  },
  {
    ruleId: 14,
    name: 'Rules for Drive',
    content:
      'These rules apply to everyone using Drive. • Follow instructions from supervisors. • Wear protective equipment when required.',
    locale: 'en-GB',
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
  articleData,
  articleLocalizationsData,
  quotesData,
  quoteLocalizationsData,
  rulesData,
  ruleLocalizationData,
};
