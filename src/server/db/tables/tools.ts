import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  varchar,
} from 'drizzle-orm/pg-core';
import { toolType } from '@/lib/constants';
import { files, localesEnum, users } from '@/server/db/tables';

const toolTypeEnum = pgEnum('toolType', toolType);

const tools = pgTable('tools', {
  id: serial('id').primaryKey(),
  type: toolTypeEnum('type').notNull(),
  slug: varchar('slug', { length: 64 }).unique(),
  nickName: varchar('nick_name', { length: 128 }),
  difficulty: integer('difficulty'),
  requires: varchar('requires', { length: 256 }),
  imageId: integer('image_id'),
  available: boolean('available').default(false).notNull(),
});

const toolLocalizations = pgTable(
  'tool_localizations',
  {
    toolId: integer('tool_id')
      .references(() => tools.id, { onDelete: 'cascade' })
      .notNull(),
    name: varchar('name', { length: 128 }).notNull(),
    description: varchar('description', { length: 1024 }),
    locale: localesEnum('locale').notNull(),
  },
  (table) => [primaryKey({ columns: [table.toolId, table.locale] })],
);

const tools3DPrinterSpecs = pgTable('tools_3d_printer_specs', {
  printerId: integer('printer_id')
    .primaryKey()
    .references(() => tools.id, { onDelete: 'cascade' }),
  filamentSize: varchar('filament_size', { length: 32 }),
  filamentType: varchar('filament_type', { length: 64 }),
  slicer: varchar('slicer', { length: 64 }),
});
