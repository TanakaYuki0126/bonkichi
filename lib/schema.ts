import {
  pgTable,
  uuid,
  text,
  timestamp,
  pgEnum,
  integer,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").default("admin"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const posts = pgTable("posts", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  eyecatchFileName: text("eyecatch_file_name"),
  status: text("status").default("draft"),
  authorId: uuid("author_id").references(() => users.id),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const contacts = pgTable("contacts", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  ip: text("ip"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const photoCategoryEnum = pgEnum("photo_category", [
  "build",
  "exterior",
  "interior",
  "travel",
]);

export const photos = pgTable("photos", {
  id: uuid("id").defaultRandom().primaryKey(),
  fileName: text("file_name").notNull(),
  category: photoCategoryEnum("category").notNull(),
  title: text("title"),
  description: text("description"),
  width: integer("width").notNull(),
  height: integer("height").notNull(),
  displayOrder: integer("display_order").default(0),
  location: text("location"),
  takenAt: timestamp("taken_at"),
  camera: text("camera"),
  lens: text("lens"),
  aperture: text("aperture"),
  shutter: text("shutter"),
  iso: text("iso"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
