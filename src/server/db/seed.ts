import { groupIdentifiers, skillIdentifiers } from '@/lib/constants';
import { routing } from '@/lib/locale';
import {
  type InsertGroup,
  type InsertItemCategory,
  type InsertSkill,
  type InsertStorageItem,
  type InsertUser,
  type InsertUserGroup,
  type InsertUserSkill,
  groups,
  itemCategories,
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
      name: 'Cables',
    },
    { name: 'Sensors' },
    {
      name: 'PC peripherals',
    },
    { name: 'Mini PC' },
  ];

  await db.insert(itemCategories).values(storageItemCategories);
  console.log('Storage item categories inserted');

  console.log('Inserting storage items...');
  const storageItemsData: InsertStorageItem[] = [
    {
      name: 'Laptop',
      quantity: 15,
      location: 'Storage Room A',
      categoryId: 4,
    },
    {
      name: 'Desktop PC',
      quantity: 10,
      location: 'Workstation Area 1',
      categoryId: 4,
    },
    {
      name: 'Monitor',
      quantity: 20,
      location: 'Storage Room B',
      categoryId: 3,
    },
    {
      name: 'Keyboard',
      quantity: 50,
      location: 'Storage Room A',
      categoryId: 3,
    },
    {
      name: 'Mouse',
      quantity: 50,
      location: 'Storage Room A',
      categoryId: 3,
    },
    {
      name: 'Router',
      quantity: 5,
      location: 'Networking Room',
      categoryId: 3,
    },
    {
      name: 'Ethernet Cable',
      quantity: 100,
      location: 'Networking Room',
      categoryId: 1,
    },
    {
      name: 'External Hard Drive',
      quantity: 25,
      location: 'Storage Room B',
      categoryId: 3,
    },
    {
      name: 'USB Flash Drive',
      quantity: 75,
      location: 'Storage Room B',
      categoryId: 3,
    },
    {
      name: 'Power Supply Unit (PSU)',
      quantity: 30,
      location: 'Storage Room C',
      categoryId: 3,
    },
    {
      name: 'Graphics Card',
      quantity: 12,
      location: 'Storage Room C',
      categoryId: 3,
    },
    {
      name: 'RAM Module',
      quantity: 40,
      location: 'Storage Room C',
      categoryId: 3,
    },
    {
      name: 'Motherboard',
      quantity: 10,
      location: 'Storage Room C',
      categoryId: 3,
    },
    {
      name: 'CPU',
      quantity: 10,
      location: 'Storage Room C',
      categoryId: 3,
    },
    {
      name: 'SSD',
      quantity: 20,
      location: 'Storage Room C',
      categoryId: 3,
    },
    {
      name: 'Network Switch',
      quantity: 5,
      location: 'Networking Room',
      categoryId: 3,
    },
    {
      name: 'Soldering Iron',
      quantity: 8,
      location: 'Repair Station',
      categoryId: 1,
    },
    {
      name: 'Multimeter',
      quantity: 10,
      location: 'Repair Station',
      categoryId: 3,
    },
    {
      name: 'Screwdriver Set',
      quantity: 20,
      location: 'Toolbox 1',
      categoryId: 3,
    },
    {
      name: 'Anti-static Wrist Strap',
      quantity: 15,
      location: 'Toolbox 2',
      categoryId: 3,
    },
  ];
  await db.insert(storageItems).values(storageItemsData);
  console.log('Storage items inserted');
}

await main();
process.exit();
