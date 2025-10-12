ALTER TYPE "public"."directories" ADD VALUE 'tools' BEFORE 'rich-input';--> statement-breakpoint
ALTER TYPE "public"."directories" ADD VALUE 'home-carousel-slides';--> statement-breakpoint
CREATE TABLE "banner_localizations" (
	"banner_id" integer NOT NULL,
	"content" text NOT NULL,
	"locale" "locale" NOT NULL,
	CONSTRAINT "banner_localizations_banner_id_locale_pk" PRIMARY KEY("banner_id","locale")
);
--> statement-breakpoint
CREATE TABLE "banners" (
	"id" serial PRIMARY KEY NOT NULL,
	"active" boolean NOT NULL,
	"expires_at" timestamp,
	"pages_match" text DEFAULT '*' NOT NULL,
	"pages_regex" text DEFAULT '.*' NOT NULL,
	"class_name" text
);
--> statement-breakpoint
CREATE TABLE "home_carousel_slide_localizations" (
	"slide_id" integer NOT NULL,
	"img_alt" varchar(255),
	"heading" varchar(63) NOT NULL,
	"description" varchar(255) NOT NULL,
	"locale" "locale" NOT NULL,
	CONSTRAINT "home_carousel_slide_localizations_slide_id_locale_pk" PRIMARY KEY("slide_id","locale")
);
--> statement-breakpoint
CREATE TABLE "home_carousel_slides" (
	"id" serial PRIMARY KEY NOT NULL,
	"active" boolean NOT NULL,
	"image_id" integer
);
--> statement-breakpoint
ALTER TABLE "news_article_localizations" ADD COLUMN "preamble" text NOT NULL;--> statement-breakpoint
ALTER TABLE "banner_localizations" ADD CONSTRAINT "banner_localizations_banner_id_banners_id_fk" FOREIGN KEY ("banner_id") REFERENCES "public"."banners"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "home_carousel_slide_localizations" ADD CONSTRAINT "home_carousel_slide_localizations_slide_id_home_carousel_slides_id_fk" FOREIGN KEY ("slide_id") REFERENCES "public"."home_carousel_slides"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "home_carousel_slides" ADD CONSTRAINT "home_carousel_slides_image_id_files_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."files"("id") ON DELETE set null ON UPDATE no action;
