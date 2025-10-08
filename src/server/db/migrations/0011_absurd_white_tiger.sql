CREATE TABLE "quote_localizations" (
	"quote_id" integer NOT NULL,
	"content" text NOT NULL,
	"locale" "locale" NOT NULL,
	CONSTRAINT "quote_localizations_quote_id_locale_pk" PRIMARY KEY("quote_id","locale")
);
--> statement-breakpoint
CREATE TABLE "quotes" (
	"id" serial PRIMARY KEY NOT NULL,
	"internal" boolean NOT NULL,
	"heard_by" integer NOT NULL,
	"said_by" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "quote_localizations" ADD CONSTRAINT "quote_localizations_quote_id_quotes_id_fk" FOREIGN KEY ("quote_id") REFERENCES "public"."quotes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quotes" ADD CONSTRAINT "quotes_heard_by_users_id_fk" FOREIGN KEY ("heard_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quotes" ADD CONSTRAINT "quotes_said_by_users_id_fk" FOREIGN KEY ("said_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "quote_localizations_quote_id_locale_unique_idx" ON "quote_localizations" USING btree ("quote_id","locale");