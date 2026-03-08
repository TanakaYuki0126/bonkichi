CREATE TYPE "public"."photo_category" AS ENUM('build', 'exterior', 'interior', 'travel');--> statement-breakpoint
CREATE TABLE "photos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"url" text NOT NULL,
	"category" "photo_category" NOT NULL,
	"width" integer,
	"height" integer,
	"created_at" timestamp DEFAULT now() NOT NULL
);
