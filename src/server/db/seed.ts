import {
  type InsertSkill,
  type InsertUser,
  type InsertUserSkill,
  skills,
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
  const skillsdata: InsertSkill[] = [
    {
      identifier: 'printing',
    },
    {
      identifier: 'unix',
    },
    {
      identifier: 'raspberry',
    },
    {
      identifier: 'laser',
    },
    {
      identifier: 'arduino',
    },
    {
      identifier: 'souldering',
    },
    {
      identifier: 'workshop',
    },
  ];
  const insertedSkills = await db.insert(skills).values(skillsdata).returning();
  console.log('Skills inserted');

  if (insertedUser.length === 0 || insertedSkills.length < 5) {
    console.error('Error: Inserted user or skills data is incomplete.');
    process.exit(1);
  }

  console.log('Inserting userskills...');
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
  console.log('Userskills inserted');
}

await main();
process.exit();
