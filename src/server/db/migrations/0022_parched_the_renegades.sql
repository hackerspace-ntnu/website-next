CREATE TABLE "door_status" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"open" boolean NOT NULL
);
