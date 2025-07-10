ALTER TYPE "public"."directories" ADD VALUE 'storage-items';--> statement-breakpoint
CREATE TABLE "item_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name_english" varchar(128) NOT NULL,
	"name_norwegian" varchar(128) NOT NULL,
	CONSTRAINT "item_categories_name_english_unique" UNIQUE("name_english"),
	CONSTRAINT "item_categories_name_norwegian_unique" UNIQUE("name_norwegian")
);
--> statement-breakpoint
CREATE TABLE "storage_item_localizations" (
	"itemId" integer NOT NULL,
	"name" varchar(128) NOT NULL,
	"description" varchar(512),
	"location" varchar(256),
	"locale" "locale" NOT NULL,
	CONSTRAINT "storage_item_localizations_itemId_locale_pk" PRIMARY KEY("itemId","locale")
);
--> statement-breakpoint
CREATE TABLE "storage_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"quantity" integer NOT NULL,
	"category_id" integer,
	"imageId" integer
);
--> statement-breakpoint
CREATE TABLE "item_loans" (
	"id" serial PRIMARY KEY NOT NULL,
	"item_id" integer NOT NULL,
	"lender_id" integer NOT NULL,
	"units_borrowed" integer NOT NULL,
	"borrow_from" timestamp NOT NULL,
	"borrow_until" timestamp NOT NULL,
	"approved_at" timestamp,
	"returned_at" timestamp,
	"notes" varchar(512),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "storage_item_localizations" ADD CONSTRAINT "storage_item_localizations_itemId_storage_items_id_fk" FOREIGN KEY ("itemId") REFERENCES "public"."storage_items"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "storage_items" ADD CONSTRAINT "storage_items_category_id_item_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."item_categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "item_loans" ADD CONSTRAINT "item_loans_item_id_storage_items_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."storage_items"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "item_loans" ADD CONSTRAINT "item_loans_lender_id_users_id_fk" FOREIGN KEY ("lender_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;