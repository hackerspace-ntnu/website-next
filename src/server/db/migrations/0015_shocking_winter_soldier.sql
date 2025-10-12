CREATE TYPE "public"."tool_status" AS ENUM('available', 'unavailable', 'out_of_order', 'requires_supervision');--> statement-breakpoint
CREATE TYPE "public"."tooltype" AS ENUM('3dprinter', 'other');--> statement-breakpoint
CREATE TABLE "tool_reservations" (
	"id" serial PRIMARY KEY NOT NULL,
	"tool_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"reservered_from" timestamp NOT NULL,
	"reserved_till" timestamp NOT NULL,
	"notes" text,
	"reserved_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "printer_specs" (
	"printerId" integer PRIMARY KEY NOT NULL,
	"filament_size" varchar(32),
	"filament_type" varchar(64),
	"slicer" varchar(64)
);
--> statement-breakpoint
CREATE TABLE "tools_localizations" (
	"tool_id" integer NOT NULL,
	"name" varchar(128) NOT NULL,
	"description" varchar(1024),
	"locale" "locale" NOT NULL,
	CONSTRAINT "tools_localizations_tool_id_locale_pk" PRIMARY KEY("tool_id","locale")
);
--> statement-breakpoint
CREATE TABLE "tools" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" "tooltype" NOT NULL,
	"nick_name" varchar(128),
	"difficulty" integer,
	"requires" varchar(256),
	"image_id" integer,
	"status" "tool_status" DEFAULT 'unavailable' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "event_localizations" ALTER COLUMN "description" SET DATA TYPE json;--> statement-breakpoint
ALTER TABLE "group_localizations" ALTER COLUMN "description" SET DATA TYPE json;--> statement-breakpoint
ALTER TABLE "news_article_localizations" ALTER COLUMN "content" SET DATA TYPE json;--> statement-breakpoint
ALTER TABLE "rule_localizations" ALTER COLUMN "content" SET DATA TYPE json;--> statement-breakpoint
ALTER TABLE "tool_reservations" ADD CONSTRAINT "tool_reservations_tool_id_tools_id_fk" FOREIGN KEY ("tool_id") REFERENCES "public"."tools"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tool_reservations" ADD CONSTRAINT "tool_reservations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "printer_specs" ADD CONSTRAINT "printer_specs_printerId_tools_id_fk" FOREIGN KEY ("printerId") REFERENCES "public"."tools"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tools_localizations" ADD CONSTRAINT "tools_localizations_tool_id_tools_id_fk" FOREIGN KEY ("tool_id") REFERENCES "public"."tools"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tools" ADD CONSTRAINT "tools_image_id_files_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."files"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "public"."files" ALTER COLUMN "directory" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."directories";--> statement-breakpoint
CREATE TYPE "public"."directories" AS ENUM('profile-pictures', 'news', 'storage-items', 'events', 'groups', 'rules', 'rich-input');--> statement-breakpoint
ALTER TABLE "public"."files" ALTER COLUMN "directory" SET DATA TYPE "public"."directories" USING "directory"::"public"."directories";
