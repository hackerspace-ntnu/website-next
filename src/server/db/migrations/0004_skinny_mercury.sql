ALTER TABLE "public"."storage_item_localizations" ALTER COLUMN "locale" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."locale";--> statement-breakpoint
CREATE TYPE "public"."locale" AS ENUM('en-GB', 'nb-NO');--> statement-breakpoint
ALTER TABLE "public"."storage_item_localizations" ALTER COLUMN "locale" SET DATA TYPE "public"."locale" USING "locale"::"public"."locale";
