import { int, json, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing Manus OAuth auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Admin users table — standalone JWT auth for the CMS dashboard.
 * Completely independent from Manus OAuth. Works on any hosting.
 */
export const adminUsers = mysqlTable("admin_users", {
  id: int("id").autoincrement().primaryKey(),
  username: varchar("username", { length: 64 }).notNull().unique(),
  passwordHash: varchar("passwordHash", { length: 255 }).notNull(),
  displayName: varchar("displayName", { length: 128 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AdminUser = typeof adminUsers.$inferSelect;
export type InsertAdminUser = typeof adminUsers.$inferInsert;

/**
 * Site content — stores editable text content for each section of each page.
 * sectionKey format: "home.hero", "home.philosophy", "space.overview", etc.
 */
export const siteContent = mysqlTable("site_content", {
  id: int("id").autoincrement().primaryKey(),
  sectionKey: varchar("sectionKey", { length: 128 }).notNull().unique(),
  title: text("title"),
  subtitle: text("subtitle"),
  body: text("body"),
  buttonText: varchar("buttonText", { length: 128 }),
  buttonLink: varchar("buttonLink", { length: 512 }),
  imageUrl: text("imageUrl"),
  extraData: json("extraData"),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SiteContent = typeof siteContent.$inferSelect;
export type InsertSiteContent = typeof siteContent.$inferInsert;

/**
 * Testimonials — guest reviews displayed on the home page.
 */
export const testimonials = mysqlTable("testimonials", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 128 }).notNull(),
  source: varchar("source", { length: 64 }).notNull().default("Google"),
  text: text("text").notNull(),
  rating: int("rating").notNull().default(5),
  sortOrder: int("sortOrder").notNull().default(0),
  visible: int("visible").notNull().default(1),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = typeof testimonials.$inferInsert;

/**
 * Partners — partner venues with photos and perks.
 */
export const partners = mysqlTable("partners", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 128 }).notNull(),
  type: varchar("type", { length: 128 }).notNull(),
  perk: text("perk"),
  description: text("description"),
  imageUrl: text("imageUrl"),
  website: varchar("website", { length: 512 }),
  address: varchar("address", { length: 512 }),
  sortOrder: int("sortOrder").notNull().default(0),
  visible: int("visible").notNull().default(1),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Partner = typeof partners.$inferSelect;
export type InsertPartner = typeof partners.$inferInsert;

/**
 * SEO settings — per-page meta tags.
 */
export const seoSettings = mysqlTable("seo_settings", {
  id: int("id").autoincrement().primaryKey(),
  pageKey: varchar("pageKey", { length: 64 }).notNull().unique(),
  title: varchar("title", { length: 256 }),
  description: text("description"),
  ogImage: text("ogImage"),
  keywords: text("keywords"),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SeoSetting = typeof seoSettings.$inferSelect;
export type InsertSeoSetting = typeof seoSettings.$inferInsert;

/**
 * Site links — external links used across the site (Airbnb, Instagram, etc.)
 */
export const siteLinks = mysqlTable("site_links", {
  id: int("id").autoincrement().primaryKey(),
  linkKey: varchar("linkKey", { length: 64 }).notNull().unique(),
  label: varchar("label", { length: 128 }).notNull(),
  url: text("url").notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SiteLink = typeof siteLinks.$inferSelect;
export type InsertSiteLink = typeof siteLinks.$inferInsert;
