ALTER TYPE "public"."directories" ADD VALUE 'events' BEFORE 'groups';--> statement-breakpoint
CREATE TABLE "event_localizations" (
	"event_id" integer NOT NULL,
	"name" varchar(63) NOT NULL,
	"summary" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"location" varchar(255) NOT NULL,
	"locale" "locale" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" serial PRIMARY KEY NOT NULL,
	"start_time" timestamp NOT NULL,
	"end_time" timestamp NOT NULL,
	"location_map_link" text,
	"internal" boolean DEFAULT false NOT NULL,
	"sign_up_deadline" timestamp,
	"image_id" integer,
	"skill_id" integer
);
--> statement-breakpoint
CREATE TABLE "users_events" (
	"user_id" integer NOT NULL,
	"event_id" integer NOT NULL,
	"attended" boolean DEFAULT false NOT NULL,
	CONSTRAINT "users_events_user_id_event_id_pk" PRIMARY KEY("user_id","event_id")
);
--> statement-breakpoint
CREATE TABLE "news_article_localizations" (
	"article_id" integer,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"locale" "locale" NOT NULL,
	CONSTRAINT "news_article_localizations_article_id_locale_pk" PRIMARY KEY("article_id","locale")
);
--> statement-breakpoint
CREATE TABLE "news_articles" (
	"id" serial PRIMARY KEY NOT NULL,
	"image_id" integer,
	"author_id" integer NOT NULL,
	"views" integer DEFAULT 0 NOT NULL,
	"internal" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user_groups" RENAME TO "users_groups";--> statement-breakpoint
ALTER TABLE "user_skills" RENAME TO "users_skills";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "notification_settings" TO "notification_setting";--> statement-breakpoint
ALTER TABLE "users_groups" DROP CONSTRAINT "user_groups_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "users_groups" DROP CONSTRAINT "user_groups_group_id_groups_id_fk";
--> statement-breakpoint
ALTER TABLE "users_skills" DROP CONSTRAINT "user_skills_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "users_skills" DROP CONSTRAINT "user_skills_skill_id_skills_id_fk";
--> statement-breakpoint
ALTER TABLE "users_groups" DROP CONSTRAINT "user_groups_user_id_group_id_pk";--> statement-breakpoint
ALTER TABLE "users_skills" DROP CONSTRAINT "user_skills_user_id_skill_id_pk";--> statement-breakpoint
ALTER TABLE "skills" ALTER COLUMN "identifier" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "users_groups" ADD CONSTRAINT "users_groups_user_id_group_id_pk" PRIMARY KEY("user_id","group_id");--> statement-breakpoint
ALTER TABLE "users_skills" ADD CONSTRAINT "users_skills_user_id_skill_id_pk" PRIMARY KEY("user_id","skill_id");--> statement-breakpoint
ALTER TABLE "skills" ADD COLUMN "name_english" text NOT NULL;--> statement-breakpoint
ALTER TABLE "skills" ADD COLUMN "name_norwegian" text NOT NULL;--> statement-breakpoint
ALTER TABLE "event_localizations" ADD CONSTRAINT "event_localizations_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_image_id_files_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."files"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_skill_id_skills_id_fk" FOREIGN KEY ("skill_id") REFERENCES "public"."skills"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_events" ADD CONSTRAINT "users_events_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_events" ADD CONSTRAINT "users_events_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "news_article_localizations" ADD CONSTRAINT "news_article_localizations_article_id_news_articles_id_fk" FOREIGN KEY ("article_id") REFERENCES "public"."news_articles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "news_articles" ADD CONSTRAINT "news_articles_image_id_files_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."files"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "news_articles" ADD CONSTRAINT "news_articles_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "user_events_user_id_idx" ON "users_events" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "user_events_event_id_idx" ON "users_events" USING btree ("event_id");--> statement-breakpoint
CREATE INDEX "news_article_localizations_article_id_locale_unique_idx" ON "news_article_localizations" USING btree ("article_id","locale");--> statement-breakpoint
ALTER TABLE "users_groups" ADD CONSTRAINT "users_groups_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_groups" ADD CONSTRAINT "users_groups_group_id_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_skills" ADD CONSTRAINT "users_skills_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_skills" ADD CONSTRAINT "users_skills_skill_id_skills_id_fk" FOREIGN KEY ("skill_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "public"."users" ALTER COLUMN "notification_setting" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."notifications";--> statement-breakpoint
CREATE TYPE "public"."notifications" AS ENUM('all', 'useful', 'essential');--> statement-breakpoint
ALTER TABLE "public"."users" ALTER COLUMN "notification_setting" SET DATA TYPE "public"."notifications" USING "notification_setting"::"public"."notifications";--> statement-breakpoint
DROP TYPE "public"."skill_identifiers";
