ALTER TABLE "users" ADD COLUMN "member_since" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "bio" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "field_of_study" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "github_username" varchar(52);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "discord_username" varchar(52);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "instagram_username" varchar(52);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "linkedin_username" varchar(52);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "private" boolean DEFAULT false NOT NULL;