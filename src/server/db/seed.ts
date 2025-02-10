import { skillIdentifiers } from '@/lib/constants';
import {
  type InsertItemCategory,
  type InsertSkill,
  type InsertStorageItem,
  type InsertUser,
  type InsertUserSkill,
  itemCategories,
  skills,
  storageItems,
  users,
  usersSkills,
} from '@/server/db/tables';
import * as schema from '@/server/db/tables';
import { fakerEN, fakerNB_NO, fakerSV } from '@faker-js/faker';
import { reset } from 'drizzle-seed';

import { hashPassword } from '@/server/auth/password';
import { db } from '@/server/db';

const faker = {
  en: fakerEN,
  no: fakerNB_NO,
  sv: fakerSV,
};

async function main() {
  console.log('Resetting database...');
  await reset(db, schema);
  console.log('Database reset.');

  console.log('Inserting user...');
  const user: InsertUser = {
    username: 'fransina',
    firstName: 'Frank',
    lastName: 'Sinatra',
    email: 'frank@sinatra.com',
    emailVerifiedAt: new Date(),
    birthDate: new Date('1915-12-12'),
    phoneNumber: '+11234567890',
    passwordHash: await hashPassword('Password1!'),
  };

  const insertedUser = await db.insert(users).values(user).returning();
  console.log('User inserted');

  console.log('Inserting skills...');
  const skillsdata: InsertSkill[] = skillIdentifiers.map((identifier) => ({
    identifier,
  }));
  const insertedSkills = await db.insert(skills).values(skillsdata).returning();
  console.log('Skills inserted');

  if (insertedUser.length === 0 || insertedSkills.length < 5) {
    console.error('Error: Inserted user or skills data is incomplete.');
    process.exit(1);
  }

  console.log('Inserting user skills...');
  const usersSkillsData: InsertUserSkill[] = [
    {
      userId: insertedUser[0]?.id ?? 0,
      skillId: insertedSkills[0]?.id ?? 0,
    },
    {
      userId: insertedUser[0]?.id ?? 0,
      skillId: insertedSkills[1]?.id ?? 0,
    },
    {
      userId: insertedUser[0]?.id ?? 0,
      skillId: insertedSkills[2]?.id ?? 0,
    },
    {
      userId: insertedUser[0]?.id ?? 0,
      skillId: insertedSkills[4]?.id ?? 0,
    },
  ];
  await db.insert(usersSkills).values(usersSkillsData);
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
