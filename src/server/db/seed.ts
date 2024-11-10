import {
  type InsertSkill,
  type InsertUser,
  type InsertUserSkill,
  locales,
  skills,
  users,
  usersSkills,
} from '@/server/db/tables';
import { fakerEN, fakerNB_NO, fakerSV } from '@faker-js/faker';

import { routing } from '@/lib/locale';

import { hashPassword } from '@/server/auth/password';
import { db } from '@/server/db';

const fakerMap = {
  en: fakerEN,
  no: fakerNB_NO,
  sv: fakerSV,
};

console.log('Deleting existing data...');
await db.delete(users);
await db.delete(locales);
console.log('Existing data deleted.');

console.log('Inserting locales...');
const insertedLocales = await db
  .insert(locales)
  .values(routing.locales.map((locale) => ({ locale })))
  .returning();
console.log('Locales inserted:', insertedLocales);

console.log('Inserting user...');
const user: InsertUser = {
  name: 'Frank Sinatra',
  username: 'fransin',
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

process.exit();
