CREATE TYPE "public"."directories" AS ENUM('profile-pictures', 'news');--> statement-breakpoint
CREATE TYPE "public"."group_identifiers" AS ENUM('devops', 'labops', 'leadership', 'management', 'representative', 'ttrpg', 'breadboard', 'pang', 'admin');--> statement-breakpoint
ALTER TYPE "public"."skill_identifiers" ADD VALUE 'webdevelopment';--> statement-breakpoint
CREATE TABLE "files" (
	"id" serial PRIMARY KEY NOT NULL,
	"directory" "directories" NOT NULL,
	"content_type" varchar(127) NOT NULL,
	"byte_size" integer NOT NULL,
	"uploaded_by" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"matrix_media_id" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "groups" (
	"id" serial PRIMARY KEY NOT NULL,
	"identifier" "group_identifiers" NOT NULL,
	CONSTRAINT "groups_identifier_unique" UNIQUE("identifier")
);
--> statement-breakpoint
CREATE TABLE "user_groups" (
	"user_id" integer NOT NULL,
	"group_id" integer NOT NULL,
	CONSTRAINT "user_groups_user_id_group_id_pk" PRIMARY KEY("user_id","group_id")
);
--> statement-breakpoint
CREATE TABLE "user_skills" (
	"user_id" integer NOT NULL,
	"skill_id" integer NOT NULL,
	CONSTRAINT "user_skills_user_id_skill_id_pk" PRIMARY KEY("user_id","skill_id")
);
--> statement-breakpoint
ALTER TABLE "users_skills" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "users_skills" CASCADE;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "profile_picture_id" integer;--> statement-breakpoint
ALTER TABLE "files" ADD CONSTRAINT "files_uploaded_by_users_id_fk" FOREIGN KEY ("uploaded_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_groups" ADD CONSTRAINT "user_groups_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_groups" ADD CONSTRAINT "user_groups_group_id_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_skills" ADD CONSTRAINT "user_skills_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_skills" ADD CONSTRAINT "user_skills_skill_id_skills_id_fk" FOREIGN KEY ("skill_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "user_groups_user_id_idx" ON "user_groups" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "user_groups_skill_id_idx" ON "user_groups" USING btree ("group_id");--> statement-breakpoint
CREATE INDEX "user_skills_user_id_idx" ON "user_skills" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "user_skills_skill_id_idx" ON "user_skills" USING btree ("skill_id");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_profile_picture_id_files_id_fk" FOREIGN KEY ("profile_picture_id") REFERENCES "public"."files"("id") ON DELETE set null ON UPDATE restrict;--> statement-breakpoint
CREATE INDEX "users_profile_picture_id_idx" ON "users" USING btree ("profile_picture_id");
