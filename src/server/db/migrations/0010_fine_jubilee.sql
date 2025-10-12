CREATE TABLE "rule_localizations" (
	"rule_id" integer NOT NULL,
	"name" text NOT NULL,
	"content" text NOT NULL,
	"locale" "locale" NOT NULL,
	CONSTRAINT "rule_localizations_rule_id_locale_pk" PRIMARY KEY("rule_id","locale")
);
--> statement-breakpoint
CREATE TABLE "rules" (
	"id" serial PRIMARY KEY NOT NULL,
	"internal" boolean NOT NULL,
	"image_id" integer,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "skills" ALTER COLUMN "identifier" SET DATA TYPE varchar(51);--> statement-breakpoint
ALTER TABLE "skills" ALTER COLUMN "name_english" SET DATA TYPE varchar(51);--> statement-breakpoint
ALTER TABLE "skills" ALTER COLUMN "name_norwegian" SET DATA TYPE varchar(51);--> statement-breakpoint
ALTER TABLE "rule_localizations" ADD CONSTRAINT "rule_localizations_rule_id_rules_id_fk" FOREIGN KEY ("rule_id") REFERENCES "public"."rules"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rules" ADD CONSTRAINT "rules_image_id_files_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."files"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "rule_localizations_rule_id_locale_unique_idx" ON "rule_localizations" USING btree ("rule_id","locale");--> statement-breakpoint
ALTER TABLE "public"."files" ALTER COLUMN "directory" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."directories";--> statement-breakpoint
CREATE TYPE "public"."directories" AS ENUM('profile-pictures', 'news', 'storage-items', 'groups', 'rules', 'events');--> statement-breakpoint
ALTER TABLE "public"."files" ALTER COLUMN "directory" SET DATA TYPE "public"."directories" USING "directory"::"public"."directories";
