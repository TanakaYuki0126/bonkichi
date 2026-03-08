ALTER TABLE "photos" ADD COLUMN "title" text;--> statement-breakpoint
ALTER TABLE "photos" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "photos" ADD COLUMN "order" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "photos" ADD COLUMN "taken_at" timestamp;