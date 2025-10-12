CREATE TYPE "public"."study_year" AS ENUM('1', '2', '3', '4', '5', 'other');--> statement-breakpoint
CREATE TABLE "applications" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone_number" text NOT NULL,
	"study_program" text NOT NULL,
	"study_year" "study_year" NOT NULL,
	"group_id" integer NOT NULL,
	"learned_about_us_how" text NOT NULL,
	"about" text NOT NULL,
	"motivation" text NOT NULL,
	"other_projects" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "groups" ADD COLUMN "open_for_applications" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "applications" ADD CONSTRAINT "applications_group_id_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE no action ON UPDATE no action;
