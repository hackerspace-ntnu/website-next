import { type InsertUser, locales, users } from '@/server/db/tables';
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
// eslint-disable-next-line drizzle/enforce-delete-with-where
await db.delete(locales);
console.log('Existing data deleted.');

console.log('Inserting locales...');
const insertedLocales = await db
  .insert(locales)
  .values(routing.locales.map((locale) => ({ locale })))
  .returning();
console.log('Locales inserted:', insertedLocales);

const user: InsertUser = {
  name: 'Frank Sinatra',
  username: 'fransin',
  passwordHash: await hashPassword('Password1!'),
};

console.log('Inserting user...');
await db.insert(users).values(user);
console.log('User inserted');

process.exit();
