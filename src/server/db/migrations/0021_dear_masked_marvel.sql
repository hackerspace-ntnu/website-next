ALTER TABLE "events" ADD COLUMN "max_participants" integer;--> statement-breakpoint
ALTER TABLE "users_events" ADD COLUMN "waitlisted_at" timestamp;
