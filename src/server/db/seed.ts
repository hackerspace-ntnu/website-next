import { groupIdentifiers, skillIdentifiers } from '@/lib/constants';
import { routing } from '@/lib/locale';
import {
  type InsertGroup,
  type InsertItemCategory,
  type InsertItemLocalization,
  type InsertShift,
  type InsertSkill,
  type InsertStorageItem,
  type InsertUser,
  type InsertUserGroup,
  type InsertUserSkill,
  groups,
  itemCategories,
  itemLocalizations,
  shifts,
  skills,
  storageItems,
  userGroups,
  userSkills,
  users,
} from '@/server/db/tables';
import * as schema from '@/server/db/tables';
import { fakerEN, fakerNB_NO } from '@faker-js/faker';
import { reset } from 'drizzle-seed';

import { hashPassword } from '@/server/auth/password';
import { db } from '@/server/db';

// To generate fake data use these helpers
const locales = routing.locales;
const faker = {
  en: fakerEN,
  no: fakerNB_NO,
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
  const groupsData: InsertGroup[] = groupIdentifiers.map((identifier) => ({
    identifier,
  }));
  const insertedGroups = await db.insert(groups).values(groupsData).returning();

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
      locale: 'en',
      itemId: 1,
    },
    {
      name: 'Laptop',
      location: 'Lagerrom A',
      locale: 'no',
      itemId: 1,
    },
    {
      name: 'Desktop PC',
      location: 'Workstation Area 1',
      locale: 'en',
      itemId: 2,
    },
    {
      name: 'Stasjonær PC',
      location: 'Verksted 1',
      locale: 'no',
      itemId: 2,
    },
    {
      name: 'Monitor',
      location: 'Storage Room B',
      locale: 'en',
      itemId: 3,
    },
    {
      name: 'Monitor',
      location: 'Lagerrom B',
      locale: 'no',
      itemId: 3,
    },
    {
      name: 'Keyboard',
      location: 'Storage Room A',
      locale: 'en',
      itemId: 4,
    },
    {
      name: 'Tastatur',
      location: 'Lagerrom A',
      locale: 'no',
      itemId: 4,
    },
    {
      name: 'Mouse',
      location: 'Storage Room A',
      locale: 'en',
      itemId: 5,
    },
    {
      name: 'Mus',
      location: 'Lagerrom A',
      locale: 'no',
      itemId: 5,
    },
    {
      name: 'Router',
      location: 'Networking Room',
      locale: 'en',
      itemId: 6,
    },
    {
      name: 'Ruter',
      location: 'Nettverksrom',
      locale: 'no',
      itemId: 6,
    },
    {
      name: 'Ethernet Cable',
      location: 'Networking Room',
      locale: 'en',
      itemId: 7,
    },
    {
      name: 'Ethernet-kabel',
      location: 'Nettverksrom',
      locale: 'no',
      itemId: 7,
    },
    {
      name: 'External Hard Drive',
      location: 'Storage Room B',
      locale: 'en',
      itemId: 8,
    },
    {
      name: 'Ekstern harddisk',
      location: 'Lagerrom B',
      locale: 'no',
      itemId: 8,
    },
    {
      name: 'USB Flash Drive',
      location: 'Storage Room B',
      locale: 'en',
      itemId: 9,
    },
    {
      name: 'USB minnepinne',
      location: 'Lagerrom B',
      locale: 'no',
      itemId: 9,
    },
    {
      name: 'Power Supply Unit (PSU)',
      location: 'Storage Room C',
      locale: 'en',
      itemId: 10,
    },
    {
      name: 'Strømforsyning (PSU)',
      location: 'Lagerrom C',
      locale: 'no',
      itemId: 10,
    },
    {
      name: 'Graphics Card',
      location: 'Storage Room C',
      locale: 'en',
      itemId: 11,
    },
    {
      name: 'Grafikkort',
      location: 'Lagerrom C',
      locale: 'no',
      itemId: 11,
    },
    {
      name: 'RAM Module',
      location: 'Storage Room C',
      locale: 'en',
      itemId: 12,
    },
    {
      name: 'RAM-modul',
      location: 'Lagerrom C',
      locale: 'no',
      itemId: 12,
    },
    {
      name: 'Motherboard',
      location: 'Storage Room C',
      locale: 'en',
      itemId: 13,
    },
    {
      name: 'Hovedkort',
      location: 'Lagerrom C',
      locale: 'no',
      itemId: 13,
    },
    {
      name: 'CPU',
      location: 'Storage Room C',
      locale: 'en',
      itemId: 14,
    },
    {
      name: 'CPU',
      location: 'Lagerrom C',
      locale: 'no',
      itemId: 14,
    },
    {
      name: 'SSD',
      location: 'Storage Room C',
      locale: 'en',
      itemId: 15,
    },
    {
      name: 'SSD',
      location: 'Lagerrom C',
      locale: 'no',
      itemId: 15,
    },
    {
      name: 'Network Switch',
      location: 'Networking Room',
      locale: 'en',
      itemId: 16,
    },
    {
      name: 'Nettverksswitch',
      location: 'Nettverksrom',
      locale: 'no',
      itemId: 16,
    },
    {
      name: 'Soldering Iron',
      location: 'Repair Station',
      locale: 'en',
      itemId: 17,
    },
    {
      name: 'Loddejern',
      location: 'Fiks-selv stasjon',
      locale: 'no',
      itemId: 17,
    },
    {
      name: 'Multimeter',
      location: 'Repair Station',
      locale: 'en',
      itemId: 18,
    },
    {
      name: 'Multimeter',
      location: 'Fiks-selv stasjon',
      locale: 'no',
      itemId: 18,
    },
    {
      name: 'Screwdriver Set',
      location: 'Toolbox 1',
      locale: 'en',
      itemId: 19,
    },
    {
      name: 'Skrutrekkere',
      location: 'Verktøykasse 1',
      locale: 'no',
      itemId: 19,
    },
    {
      name: 'Anti-static Wrist Strap',
      location: 'Toolbox 2',
      locale: 'en',
      itemId: 20,
    },
    {
      name: 'Antistatisk armbånd',
      location: 'Verktøykasse 2',
      locale: 'no',
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
}

await main();
process.exit();
