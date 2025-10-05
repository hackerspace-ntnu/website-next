import { reset } from 'drizzle-seed';
import { db } from '@/server/db';
import {
  articleData,
  articleLocalizationsData,
  eventLocalizationsData,
  eventsData,
  groupLocalizationsData,
  groupsData,
  printerSpecsData,
  quoteLocalizationsData,
  quotesData,
  reservationsData,
  ruleLocalizationData,
  rulesData,
  shiftsData,
  skillsData,
  storageItemCategories,
  storageItemLocalizations,
  storageItemsData,
  toolLocalizationsData,
  toolsData,
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
  itemCategories,
  itemLocalizations,
  newsArticleLocalizations,
  newsArticles,
  printerSpecs,
  quoteLocalizations,
  quotes,
  reservations,
  ruleLocalizations,
  rules,
  shifts,
  skills,
  storageItems,
  toolLocalizations,
  tools,
  users,
  usersGroups,
  usersSkills,
} from '@/server/db/tables';

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

  console.log('Inserting news articles...');
  await db.insert(newsArticles).values(articleData);
  console.log('News articles inserted');

  console.log('Inserting news article localizations...');
  await db.insert(newsArticleLocalizations).values(articleLocalizationsData);
  console.log('News article localizations inserted');

  console.log('Inserting tools...');
  await db.insert(tools).values(toolsData);
  console.log('Tools inserted');

  console.log('Inserting printer specs...');
  await db.insert(printerSpecs).values(printerSpecsData);
  console.log('Printer specs inserted');

  console.log('Inserting tools localizations...');
  await db.insert(toolLocalizations).values(toolLocalizationsData);
  console.log('Tools localizations inserted');

  console.log('Inserting reservations...');
  await db.insert(reservations).values(reservationsData);
  console.log('Reservations inserted');

  console.log('Inserting quotes...');
  await db.insert(quotes).values(quotesData);
  console.log('Quotes inserted');

  console.log('Inserting quote localizations...');
  await db.insert(quoteLocalizations).values(quoteLocalizationsData);
  console.log('Quote localizations inserted');

  console.log('Inserting rules...');
  await db.insert(rules).values(rulesData);
  console.log('Rules inserted');

  console.log('Insert rule localizations...');
  await db.insert(ruleLocalizations).values(ruleLocalizationData);
  console.log('Rule localizations inserted');
}

await main();
process.exit();
