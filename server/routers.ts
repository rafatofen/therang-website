import { COOKIE_NAME } from "@shared/const";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { adminAuthProcedure, hashPassword, verifyPassword, createAdminToken, ADMIN_COOKIE_NAME } from "./adminAuth";
import {
  getAdminByUsername, updateAdminPassword,
  getAllContent, getContentByKey, upsertContent,
  getAllTestimonials, getVisibleTestimonials, createTestimonial, updateTestimonial, deleteTestimonial,
  getAllPartners, getVisiblePartners, createPartner, updatePartner, deletePartner,
  getAllSeoSettings, getSeoByPage, upsertSeo,
  getAllLinks, upsertLink,
} from "./db";
import { storagePut } from "./storage";
import { nanoid } from "nanoid";

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // ===== ADMIN AUTH =====
  admin: router({
    login: publicProcedure
      .input(z.object({ username: z.string(), password: z.string() }))
      .mutation(async ({ input, ctx }) => {
        const admin = await getAdminByUsername(input.username);
        if (!admin) {
          throw new Error("Invalid credentials");
        }
        const valid = await verifyPassword(input.password, admin.passwordHash);
        if (!valid) {
          throw new Error("Invalid credentials");
        }
        const token = await createAdminToken(admin.id);
        // Set cookie
        ctx.res.cookie(ADMIN_COOKIE_NAME, token, {
          httpOnly: true,
          secure: ctx.req.protocol === "https",
          sameSite: ctx.req.protocol === "https" ? "none" : "lax",
          path: "/",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        return {
          success: true,
          admin: { id: admin.id, username: admin.username, displayName: admin.displayName },
        };
      }),

    me: adminAuthProcedure.query(({ ctx }) => {
      const admin = (ctx as any).admin;
      return { id: admin.id, username: admin.username, displayName: admin.displayName };
    }),

    logout: publicProcedure.mutation(({ ctx }) => {
      ctx.res.clearCookie(ADMIN_COOKIE_NAME, {
        httpOnly: true,
        secure: ctx.req.protocol === "https",
        sameSite: ctx.req.protocol === "https" ? "none" : "lax",
        path: "/",
        maxAge: -1,
      });
      return { success: true };
    }),

    changePassword: adminAuthProcedure
      .input(z.object({ currentPassword: z.string(), newPassword: z.string().min(6) }))
      .mutation(async ({ input, ctx }) => {
        const admin = (ctx as any).admin;
        const valid = await verifyPassword(input.currentPassword, admin.passwordHash);
        if (!valid) throw new Error("Current password is incorrect");
        const newHash = await hashPassword(input.newPassword);
        await updateAdminPassword(admin.id, newHash);
        return { success: true };
      }),
  }),

  // ===== CONTENT MANAGEMENT =====
  content: router({
    // Public: get all content
    getAll: publicProcedure.query(async () => {
      return getAllContent();
    }),
    getByKey: publicProcedure
      .input(z.object({ sectionKey: z.string() }))
      .query(async ({ input }) => {
        return getContentByKey(input.sectionKey);
      }),
    // Admin: update content
    update: adminAuthProcedure
      .input(z.object({
        sectionKey: z.string(),
        title: z.string().optional(),
        subtitle: z.string().optional(),
        body: z.string().optional(),
        buttonText: z.string().optional(),
        buttonLink: z.string().optional(),
        imageUrl: z.string().optional(),
        extraData: z.any().optional(),
      }))
      .mutation(async ({ input }) => {
        await upsertContent(input);
        return { success: true };
      }),
  }),

  // ===== TESTIMONIALS =====
  testimonials: router({
    // Public: visible only
    getVisible: publicProcedure.query(async () => {
      return getVisibleTestimonials();
    }),
    // Admin: all
    getAll: adminAuthProcedure.query(async () => {
      return getAllTestimonials();
    }),
    create: adminAuthProcedure
      .input(z.object({
        name: z.string(),
        source: z.string().default("Google"),
        text: z.string(),
        rating: z.number().min(1).max(5).default(5),
        sortOrder: z.number().default(0),
        visible: z.number().default(1),
      }))
      .mutation(async ({ input }) => {
        await createTestimonial(input);
        return { success: true };
      }),
    update: adminAuthProcedure
      .input(z.object({
        id: z.number(),
        name: z.string().optional(),
        source: z.string().optional(),
        text: z.string().optional(),
        rating: z.number().min(1).max(5).optional(),
        sortOrder: z.number().optional(),
        visible: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await updateTestimonial(id, data);
        return { success: true };
      }),
    delete: adminAuthProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteTestimonial(input.id);
        return { success: true };
      }),
  }),

  // ===== PARTNERS =====
  partners: router({
    getVisible: publicProcedure.query(async () => {
      return getVisiblePartners();
    }),
    getAll: adminAuthProcedure.query(async () => {
      return getAllPartners();
    }),
    create: adminAuthProcedure
      .input(z.object({
        name: z.string(),
        type: z.string(),
        perk: z.string().optional(),
        description: z.string().optional(),
        imageUrl: z.string().optional(),
        website: z.string().optional(),
        address: z.string().optional(),
        sortOrder: z.number().default(0),
        visible: z.number().default(1),
      }))
      .mutation(async ({ input }) => {
        await createPartner(input);
        return { success: true };
      }),
    update: adminAuthProcedure
      .input(z.object({
        id: z.number(),
        name: z.string().optional(),
        type: z.string().optional(),
        perk: z.string().optional(),
        description: z.string().optional(),
        imageUrl: z.string().optional(),
        website: z.string().optional(),
        address: z.string().optional(),
        sortOrder: z.number().optional(),
        visible: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await updatePartner(id, data);
        return { success: true };
      }),
    delete: adminAuthProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deletePartner(input.id);
        return { success: true };
      }),
  }),

  // ===== SEO SETTINGS =====
  seo: router({
    getAll: publicProcedure.query(async () => {
      return getAllSeoSettings();
    }),
    getByPage: publicProcedure
      .input(z.object({ pageKey: z.string() }))
      .query(async ({ input }) => {
        return getSeoByPage(input.pageKey);
      }),
    update: adminAuthProcedure
      .input(z.object({
        pageKey: z.string(),
        title: z.string().optional(),
        description: z.string().optional(),
        ogImage: z.string().optional(),
        keywords: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await upsertSeo(input);
        return { success: true };
      }),
  }),

  // ===== SITE LINKS =====
  links: router({
    getAll: publicProcedure.query(async () => {
      return getAllLinks();
    }),
    update: adminAuthProcedure
      .input(z.object({
        linkKey: z.string(),
        label: z.string(),
        url: z.string(),
      }))
      .mutation(async ({ input }) => {
        await upsertLink(input);
        return { success: true };
      }),
  }),

  // ===== IMAGE UPLOAD =====
  upload: router({
    image: adminAuthProcedure
      .input(z.object({
        base64: z.string(),
        filename: z.string(),
        contentType: z.string().default("image/jpeg"),
      }))
      .mutation(async ({ input }) => {
        const buffer = Buffer.from(input.base64, "base64");
        const key = `uploads/${nanoid()}-${input.filename}`;
        const { url } = await storagePut(key, buffer, input.contentType);
        return { url };
      }),
  }),
});

export type AppRouter = typeof appRouter;
