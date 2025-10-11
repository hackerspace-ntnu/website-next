ALTER TYPE "public"."directories" ADD VALUE 'groups';--> statement-breakpoint
ALTER TABLE "email_verification_requests" DROP CONSTRAINT "email_verification_requests_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "files" DROP CONSTRAINT "files_uploaded_by_users_id_fk";
--> statement-breakpoint
ALTER TABLE "groups" DROP CONSTRAINT "groups_image_id_files_id_fk";
--> statement-breakpoint
ALTER TABLE "session" DROP CONSTRAINT "session_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "item_loans" DROP CONSTRAINT "item_loans_lender_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "shifts" DROP CONSTRAINT "shifts_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "groups" ADD COLUMN "internal" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "email_verification_requests" ADD CONSTRAINT "email_verification_requests_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "files" ADD CONSTRAINT "files_uploaded_by_users_id_fk" FOREIGN KEY ("uploaded_by") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "groups" ADD CONSTRAINT "groups_image_id_files_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."files"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "item_loans" ADD CONSTRAINT "item_loans_lender_id_users_id_fk" FOREIGN KEY ("lender_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shifts" ADD CONSTRAINT "shifts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
