import {
  type InferInsertModel,
  type InferSelectModel,
  relations,
} from 'drizzle-orm';
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  varchar,
} from 'drizzle-orm/pg-core';
import { tooltype } from '@/lib/constants';
import { files } from '@/server/db/tables/files';
import { localesEnum } from '@/server/db/tables/locales';

const toolTypeEnum = pgEnum('tooltype', tooltype);

const tools = pgTable('tools', {
  id: serial('id').primaryKey(),
  type: toolTypeEnum('type').notNull(),
  nickName: varchar('nick_name', { length: 128 }),
  difficulty: integer('difficulty'),
  requires: varchar('requires', { length: 256 }),
  imageId: integer('image_id'),
  available: boolean('available').default(false).notNull(),
});

const toolsRelations = relations(tools, ({ one, many }) => ({
  localizations: many(toolsLocalizations),
  imageId: one(files, {
    fields: [tools.imageId],
    references: [files.id],
  }),
}));

const toolsLocalizations = pgTable(
  'tools_localizations',
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

const toolsLocalizationsRelations = relations(
  toolsLocalizations,
  ({ one }) => ({
    tool: one(tools, {
      fields: [toolsLocalizations.toolId],
      references: [tools.id],
    }),
  }),
);

const printerSpecs = pgTable('printer_specs', {
  printerId: integer('printerId')
    .primaryKey()
    .references(() => tools.id, { onDelete: 'cascade' }),
  filamentSize: varchar('filament_size', { length: 32 }),
  filamentType: varchar('filament_type', { length: 64 }),
  slicer: varchar('slicer', { length: 64 }),
});

const printerSpecsRelations = relations(printerSpecs, ({ one }) => ({
  tool: one(tools, {
    fields: [printerSpecs.printerId],
    references: [tools.id],
  }),
}));

type SelectTool = InferSelectModel<typeof tools>;
type InsertTool = InferInsertModel<typeof tools>;
type SelectToolLocalization = InferSelectModel<typeof toolsLocalizations>;
type InsertToolLocalization = InferInsertModel<typeof toolsLocalizations>;
type SelectPrinterSpecs = InferSelectModel<typeof printerSpecs>;
type InsertPrinterSpecs = InferInsertModel<typeof printerSpecs>;

export {
  toolTypeEnum,
  tools,
  toolsRelations,
  toolsLocalizations,
  toolsLocalizationsRelations,
  printerSpecs,
  printerSpecsRelations,
  type SelectTool,
  type InsertTool,
  type SelectToolLocalization,
  type InsertToolLocalization,
  type SelectPrinterSpecs,
  type InsertPrinterSpecs,
};
