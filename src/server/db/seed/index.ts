import { fakerEN, fakerNB_NO } from '@faker-js/faker';
import { reset } from 'drizzle-seed';
import { routing } from '@/lib/locale';
import { db } from '@/server/db';
import {
  eventLocalizationsData,
  eventsData,
  groupLocalizationsData,
  groupsData,
  homeCarouselSlideLocalizationsData,
  homeCarouselSlidesData,
  shiftsData,
  skillsData,
  storageItemCategories,
  storageItemLocalizations,
  storageItemsData,
  usersData,
  usersGroupsData,
  usersSkillsData,
} from '@/server/db/seed/data';
import * as schema from '@/server/db/tables';
import {
  eventLocalizations,
  events,
  groupLocalizations,
  groups,
  homeCarouselSlideLocalizations,
  homeCarouselSlides,
  itemCategories,
  itemLocalizations,
  shifts,
  skills,
  storageItems,
  users,
  usersGroups,
  usersSkills,
} from '@/server/db/tables';

// To generate fake data use these helpers
// biome-ignore-start lint/correctness/noUnusedVariables: These may be used in the future
const locales = routing.locales;
const faker = {
  en: fakerEN,
  no: fakerNB_NO,
};
// biome-ignore-end lint/correctness/noUnusedVariables: These may be used in the future

async function main() {
  console.log('Resetting database...');
  await reset(db, schema);
  console.log('Database reset.');

  console.log('Inserting users...');

  const insertedUsers = await db.insert(users).values(usersData).returning();

  if (insertedUsers.length < 5) {
    console.error('Error: Inserted users data is incomplete.');
    process.exit(1);
  }
  console.log('Users inserted');

  console.log('Inserting groups...');

  const insertedGroups = await db.insert(groups).values(groupsData).returning();
  await db.insert(groupLocalizations).values(groupLocalizationsData);

  if (insertedGroups.length < 9) {
    console.error('Error: Inserted groups data is incomplete.');
    process.exit(1);
  }
  console.log('Groups inserted');

  console.log('Inserting usersGroups...');
  await db.insert(usersGroups).values(usersGroupsData);
  console.log('UsersGroups inserted');

  console.log('Inserting skills...');

  const insertedSkills = await db.insert(skills).values(skillsData).returning();

  if (insertedSkills.length < 7) {
    console.error('Error: Inserted skills data is incomplete.');
    process.exit(1);
  }
  console.log('Skills inserted');

  console.log('Inserting user skills...');
  await db.insert(usersSkills).values(usersSkillsData);
  console.log('User skills inserted');

  console.log('Inserting home carousel slides...');
  await db.insert(homeCarouselSlides).values(homeCarouselSlidesData);
  console.log('Home carousel slides inserted');

  console.log('Inserting home carousel slide localizations...');
  await db
    .insert(homeCarouselSlideLocalizations)
    .values(homeCarouselSlideLocalizationsData);
  console.log('Home carousel slide localizations inserted');

  console.log('Inserting storage item categories...');
  await db.insert(itemCategories).values(storageItemCategories);
  console.log('Storage item categories inserted');

  console.log('Inserting storage items...');
  await db.insert(storageItems).values(storageItemsData);
  console.log('Storage items inserted');

  console.log('Inserting storage item localizations...');
  await db.insert(itemLocalizations).values(storageItemLocalizations);
  console.log('Storage item localizations inserted');

  console.log('Inserting shifts...');
  await db.insert(shifts).values(shiftsData);
  console.log('Shifts inserted');

  console.log('Inserting events...');
  await db.insert(events).values(eventsData);
  console.log('Events inserted');

  console.log('Inserting event localizations...');
  await db.insert(eventLocalizations).values(eventLocalizationsData);
  console.log('Event localizations inserted');
}

await main();
process.exit();
