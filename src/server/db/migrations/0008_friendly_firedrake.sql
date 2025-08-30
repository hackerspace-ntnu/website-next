CREATE TYPE "public"."notifications" AS ENUM('all', 'essential', 'useful');--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "notification_settings" "notifications" DEFAULT 'all' NOT NULL;