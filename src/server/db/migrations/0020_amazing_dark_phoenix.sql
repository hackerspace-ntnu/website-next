ALTER TABLE "groups" ADD COLUMN "leader_id" integer;--> statement-breakpoint
ALTER TABLE "groups" ADD COLUMN "deputy_leader_id" integer;--> statement-breakpoint
ALTER TABLE "groups" ADD CONSTRAINT "groups_leader_id_users_id_fk" FOREIGN KEY ("leader_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "groups" ADD CONSTRAINT "groups_deputy_leader_id_users_id_fk" FOREIGN KEY ("deputy_leader_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
