import { eq, asc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser, users,
  adminUsers, InsertAdminUser, AdminUser,
  siteContent, InsertSiteContent, SiteContent,
  testimonials, InsertTestimonial, Testimonial,
  partners, InsertPartner, Partner,
  seoSettings, InsertSeoSetting, SeoSetting,
  siteLinks, InsertSiteLink, SiteLink,
} from "../drizzle/schema.ts";
import { ENV } from './_core/env.ts';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ===== USER HELPERS (Manus OAuth) =====

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }
  const db = await getDb();
  if (!db) { console.warn("[Database] Cannot upsert user: database not available"); return; }

  try {
    const values: InsertUser = { openId: user.openId };
    const updateSet: Record<string, unknown> = {};
    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];
    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };
    textFields.forEach(assignNullable);
    if (user.lastSignedIn !== undefined) { values.lastSignedIn = user.lastSignedIn; updateSet.lastSignedIn = user.lastSignedIn; }
    if (user.role !== undefined) { values.role = user.role; updateSet.role = user.role; }
    else if (user.openId === ENV.ownerOpenId) { values.role = 'admin'; updateSet.role = 'admin'; }
    if (!values.lastSignedIn) { values.lastSignedIn = new Date(); }
    if (Object.keys(updateSet).length === 0) { updateSet.lastSignedIn = new Date(); }
    await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) { console.warn("[Database] Cannot get user: database not available"); return undefined; }
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ===== ADMIN USER HELPERS =====

export async function getAdminByUsername(username: string): Promise<AdminUser | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(adminUsers).where(eq(adminUsers.username, username)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getAdminById(id: number): Promise<AdminUser | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(adminUsers).where(eq(adminUsers.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createAdmin(data: InsertAdminUser): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(adminUsers).values(data);
}

export async function updateAdminPassword(id: number, passwordHash: string): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(adminUsers).set({ passwordHash }).where(eq(adminUsers.id, id));
}

export async function getAdminCount(): Promise<number> {
  const db = await getDb();
  if (!db) return 0;
  const result = await db.select().from(adminUsers);
  return result.length;
}

// ===== SITE CONTENT HELPERS =====

export async function getAllContent(): Promise<SiteContent[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(siteContent);
}

export async function getContentByKey(sectionKey: string): Promise<SiteContent | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(siteContent).where(eq(siteContent.sectionKey, sectionKey)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function upsertContent(data: InsertSiteContent): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(siteContent).values(data).onDuplicateKeyUpdate({
    set: {
      title: data.title,
      subtitle: data.subtitle,
      body: data.body,
      buttonText: data.buttonText,
      buttonLink: data.buttonLink,
      imageUrl: data.imageUrl,
      extraData: data.extraData,
    },
  });
}

// ===== TESTIMONIAL HELPERS =====

export async function getAllTestimonials(): Promise<Testimonial[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(testimonials).orderBy(asc(testimonials.sortOrder));
}

export async function getVisibleTestimonials(): Promise<Testimonial[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(testimonials).where(eq(testimonials.visible, 1)).orderBy(asc(testimonials.sortOrder));
}

export async function createTestimonial(data: InsertTestimonial): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(testimonials).values(data);
}

export async function updateTestimonial(id: number, data: Partial<InsertTestimonial>): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(testimonials).set(data).where(eq(testimonials.id, id));
}

export async function deleteTestimonial(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(testimonials).where(eq(testimonials.id, id));
}

// ===== PARTNER HELPERS =====

export async function getAllPartners(): Promise<Partner[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(partners).orderBy(asc(partners.sortOrder));
}

export async function getVisiblePartners(): Promise<Partner[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(partners).where(eq(partners.visible, 1)).orderBy(asc(partners.sortOrder));
}

export async function createPartner(data: InsertPartner): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(partners).values(data);
}

export async function updatePartner(id: number, data: Partial<InsertPartner>): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(partners).set(data).where(eq(partners.id, id));
}

export async function deletePartner(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(partners).where(eq(partners.id, id));
}

// ===== SEO SETTINGS HELPERS =====

export async function getAllSeoSettings(): Promise<SeoSetting[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(seoSettings);
}

export async function getSeoByPage(pageKey: string): Promise<SeoSetting | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(seoSettings).where(eq(seoSettings.pageKey, pageKey)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function upsertSeo(data: InsertSeoSetting): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(seoSettings).values(data).onDuplicateKeyUpdate({
    set: {
      title: data.title,
      description: data.description,
      ogImage: data.ogImage,
      keywords: data.keywords,
    },
  });
}

// ===== SITE LINKS HELPERS =====

export async function getAllLinks(): Promise<SiteLink[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(siteLinks);
}

export async function upsertLink(data: InsertSiteLink): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(siteLinks).values(data).onDuplicateKeyUpdate({
    set: { label: data.label, url: data.url },
  });
}
