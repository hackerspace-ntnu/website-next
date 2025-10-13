CREATE TYPE "public"."days" AS ENUM('monday', 'tuesday', 'wednesday', 'thursday', 'friday');--> statement-breakpoint
CREATE TYPE "public"."timeslots" AS ENUM('1', '2', '3', '4');--> statement-breakpoint
CREATE TABLE "shifts" (
	"day" "days" NOT NULL,
	"timeslot" timeslots NOT NULL,
	"user_id" integer NOT NULL,
	"end_date" timestamp,
	CONSTRAINT "shifts_day_timeslot_user_id_pk" PRIMARY KEY("day","timeslot","user_id")
);
--> statement-breakpoint
ALTER TABLE "shifts" ADD CONSTRAINT "shifts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
