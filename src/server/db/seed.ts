import { fakerEN, fakerNB_NO } from '@faker-js/faker';
import { reset } from 'drizzle-seed';
import { groupIdentifiers, skillIdentifiers } from '@/lib/constants';
import { routing } from '@/lib/locale';
import { hashPassword } from '@/server/auth/password';
import { db } from '@/server/db';
import * as schema from '@/server/db/tables';
import {
  groupLocalizations,
  groups,
  type InsertGroup,
  type InsertGroupLocalization,
  type InsertItemCategory,
  type InsertItemLocalization,
  type InsertQuotes,
  type InsertShift,
  type InsertSkill,
  type InsertStorageItem,
  type InsertUser,
  type InsertUserGroup,
  type InsertUserSkill,
  itemCategories,
  itemLocalizations,
  quotes,
  shifts,
  skills,
  storageItems,
  userGroups,
  userSkills,
  users,
} from '@/server/db/tables';

// To generate fake data use these helpers
const locales = routing.locales;
const faker = {
  'en-GB': fakerEN,
  'nb-NO': fakerNB_NO,
};
async function main() {
  console.log('Resetting database...');
  await reset(db, schema);
  console.log('Database reset.');

  console.log('Inserting users...');
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

  const insertedUsers = await db.insert(users).values(usersData).returning();

  if (insertedUsers.length < 5) {
    console.error('Error: Inserted users data is incomplete.');
    process.exit(1);
  }
  console.log('Users inserted');

  console.log('Inserting groups...');
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
      summary:
        'A selected member which can be contacted for various inquiries.',
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
  const groupsData: InsertGroup[] = groupIdentifiers.map((identifier) => ({
    identifier,
  }));
  const insertedGroups = await db.insert(groups).values(groupsData).returning();
  await db.insert(groupLocalizations).values(groupLocalizationsData);

  if (insertedGroups.length < 9) {
    console.error('Error: Inserted groups data is incomplete.');
    process.exit(1);
  }
  console.log('Groups inserted');

  console.log('Inserting usergroups...');
  const userGroupsData: InsertUserGroup[] = [
    {
      userId: insertedUsers[0]?.id ?? 0,
      groupId: insertedGroups[8]?.id ?? 0,
    },
    {
      userId: insertedUsers[0]?.id ?? 0,
      groupId: insertedGroups[3]?.id ?? 0,
    },
    {
      userId: insertedUsers[1]?.id ?? 0,
      groupId: insertedGroups[0]?.id ?? 0,
    },
    {
      userId: insertedUsers[2]?.id ?? 0,
      groupId: insertedGroups[1]?.id ?? 0,
    },
    {
      userId: insertedUsers[2]?.id ?? 0,
      groupId: insertedGroups[3]?.id ?? 0,
    },
    {
      userId: insertedUsers[3]?.id ?? 0,
      groupId: insertedGroups[5]?.id ?? 0,
    },
    {
      userId: insertedUsers[4]?.id ?? 0,
      groupId: insertedGroups[4]?.id ?? 0,
    },
  ];
  await db.insert(userGroups).values(userGroupsData);
  console.log('Usergroups inserted');

  console.log('Inserting skills...');
  const skillsdata: InsertSkill[] = skillIdentifiers.map((identifier) => ({
    identifier,
  }));
  const insertedSkills = await db.insert(skills).values(skillsdata).returning();

  if (insertedSkills.length < 7) {
    console.error('Error: Inserted skills data is incomplete.');
    process.exit(1);
  }
  console.log('Skills inserted');

  console.log('Inserting user skills...');
  const userSkillsData: InsertUserSkill[] = [
    ...insertedSkills.map((skill) => ({
      userId: insertedUsers[0]?.id ?? 0,
      skillId: skill.id,
    })),
    {
      userId: insertedUsers[1]?.id ?? 0,
      skillId: insertedSkills[0]?.id ?? 0,
    },
    {
      userId: insertedUsers[1]?.id ?? 0,
      skillId: insertedSkills[1]?.id ?? 0,
    },
    {
      userId: insertedUsers[1]?.id ?? 0,
      skillId: insertedSkills[3]?.id ?? 0,
    },
    {
      userId: insertedUsers[2]?.id ?? 0,
      skillId: insertedSkills[2]?.id ?? 0,
    },
    {
      userId: insertedUsers[2]?.id ?? 0,
      skillId: insertedSkills[4]?.id ?? 0,
    },
    {
      userId: insertedUsers[2]?.id ?? 0,
      skillId: insertedSkills[5]?.id ?? 0,
    },
    {
      userId: insertedUsers[4]?.id ?? 0,
      skillId: insertedSkills[6]?.id ?? 0,
    },
    {
      userId: insertedUsers[4]?.id ?? 0,
      skillId: insertedSkills[3]?.id ?? 0,
    },
  ];
  await db.insert(userSkills).values(userSkillsData);
  console.log('User skills inserted');

  console.log('Inserting storage item categories...');
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

  await db.insert(itemCategories).values(storageItemCategories);
  console.log('Storage item categories inserted');

  console.log('Inserting storage items...');
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
  await db.insert(storageItems).values(storageItemsData);
  console.log('Storage items inserted');

  console.log('Inserting storage item localizations...');

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

  await db.insert(itemLocalizations).values(storageItemLocalizations);
  console.log('Storage item localizations inserted');

  console.log('Inserting shifts...');
  const shiftsData: InsertShift[] = [
    {
      day: 'monday',
      timeslot: '1',
      userId: insertedUsers[0]?.id ?? 0,
    },
    {
      day: 'tuesday',
      timeslot: '2',
      userId: insertedUsers[3]?.id ?? 0,
    },
    {
      day: 'wednesday',
      timeslot: '2',
      userId: insertedUsers[3]?.id ?? 0,
    },
    {
      day: 'wednesday',
      timeslot: '2',
      userId: insertedUsers[0]?.id ?? 0,
    },
    {
      day: 'wednesday',
      timeslot: '3',
      userId: insertedUsers[1]?.id ?? 0,
    },
    {
      day: 'thursday',
      timeslot: '4',
      userId: insertedUsers[1]?.id ?? 0,
    },
    {
      day: 'friday',
      timeslot: '1',
      userId: insertedUsers[1]?.id ?? 0,
    },
    {
      day: 'friday',
      timeslot: '1',
      userId: insertedUsers[4]?.id ?? 0,
    },
    {
      // Past end date, shouldn't be displayed
      day: 'friday',
      timeslot: '4',
      userId: insertedUsers[0]?.id ?? 0,
      endDate: new Date(0),
    },
  ];
  await db.insert(shifts).values(shiftsData);
  console.log('Shifts inserted');

  console.log('Inserting quotes...');
  const quotesData: InsertQuotes[] = [
    {
      saidBy: insertedUsers[0]?.id ?? 0,
      heardBy: insertedUsers[1]?.id ?? 0,
      contentNorwegian: 'Hvordan kan speil være ekte?',
      contentEnglish: 'How can mirrors be real?',
      internal: false,
    },
    {
      saidBy: insertedUsers[4]?.id ?? 0,
      heardBy: insertedUsers[1]?.id ?? 0,
      contentNorwegian: 'Jeg har en drøm',
      contentEnglish: 'I have a dream',
      internal: false,
    },
  ];

  for (let i = 0; i < 100; i++) {
    const locale = Math.random() > 0.5 ? locales[0] : locales[1];
    quotesData.push({
      heardBy: insertedUsers[i % 5]?.id ?? 0,
      saidBy: insertedUsers[i % 5]?.id ?? 0,
      contentNorwegian: faker[locale].lorem.sentence(),
      contentEnglish: faker[locale].lorem.sentence(),
      internal: i > 50,
    });
  }

  await db.insert(quotes).values(quotesData);
  console.log('Quotes inserted');
}

await main();
process.exit();
