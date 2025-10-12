CREATE TABLE "group_localizations" (
	"group_id" integer NOT NULL,
	"name" varchar(100) NOT NULL,
	"summary" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"locale" "locale" NOT NULL,
	CONSTRAINT "group_localizations_group_id_locale_pk" PRIMARY KEY("group_id","locale")
);
--> statement-breakpoint
ALTER TABLE "groups" ALTER COLUMN "identifier" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "groups" ADD COLUMN "image_id" integer;--> statement-breakpoint
ALTER TABLE "group_localizations" ADD CONSTRAINT "group_localizations_group_id_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "group_localizations_group_id_locale_unique_idx" ON "group_localizations" USING btree ("group_id","locale");--> statement-breakpoint
ALTER TABLE "groups" ADD CONSTRAINT "groups_image_id_files_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."files"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
DROP TYPE "public"."group_identifiers";
