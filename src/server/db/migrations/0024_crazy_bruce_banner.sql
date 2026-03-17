CREATE TYPE "public"."drink_type" AS ENUM('coffee', 'coffee_milk', 'cappuccino', 'chocolate_milk', 'wiener_melange', 'coffee_chocolate', 'latte_macchiato', 'hot_water');--> statement-breakpoint
ALTER TABLE "coffee" ADD COLUMN "drink_type" "drink_type" NOT NULL;--> statement-breakpoint
ALTER TABLE "coffee" ADD COLUMN "card_id" varchar(32) NOT NULL;