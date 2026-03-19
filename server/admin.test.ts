import { describe, expect, it, vi, beforeEach } from "vitest";
import { hashPassword, verifyPassword, createAdminToken, verifyAdminToken } from "./adminAuth";

// ===== Unit tests for admin auth utilities =====

describe("adminAuth utilities", () => {
  describe("hashPassword / verifyPassword", () => {
    it("hashes a password and verifies it correctly", async () => {
      const password = "testPassword123";
      const hash = await hashPassword(password);

      // Hash should be a bcrypt hash string
      expect(hash).toBeTruthy();
      expect(hash).not.toBe(password);
      expect(hash.startsWith("$2")).toBe(true);

      // Correct password should verify
      const isValid = await verifyPassword(password, hash);
      expect(isValid).toBe(true);

      // Wrong password should not verify
      const isInvalid = await verifyPassword("wrongPassword", hash);
      expect(isInvalid).toBe(false);
    });

    it("produces different hashes for the same password (salted)", async () => {
      const password = "samePassword";
      const hash1 = await hashPassword(password);
      const hash2 = await hashPassword(password);
      expect(hash1).not.toBe(hash2);

      // Both should still verify
      expect(await verifyPassword(password, hash1)).toBe(true);
      expect(await verifyPassword(password, hash2)).toBe(true);
    });
  });

  describe("createAdminToken / verifyAdminToken", () => {
    it("creates a valid JWT token and verifies it", async () => {
      const adminId = 42;
      const token = await createAdminToken(adminId);

      expect(token).toBeTruthy();
      expect(typeof token).toBe("string");
      // JWT has 3 parts separated by dots
      expect(token.split(".")).toHaveLength(3);

      const payload = await verifyAdminToken(token);
      expect(payload).not.toBeNull();
      expect(payload!.adminId).toBe(adminId);
    });

    it("returns null for an invalid token", async () => {
      const payload = await verifyAdminToken("invalid.token.here");
      expect(payload).toBeNull();
    });

    it("returns null for an empty token", async () => {
      const payload = await verifyAdminToken("");
      expect(payload).toBeNull();
    });

    it("returns null for a tampered token", async () => {
      const token = await createAdminToken(1);
      // Tamper with the token by changing a character
      const tampered = token.slice(0, -2) + "XX";
      const payload = await verifyAdminToken(tampered);
      expect(payload).toBeNull();
    });
  });
});

// ===== Unit tests for admin logout via tRPC =====

import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createPublicContext() {
  const clearedCookies: { name: string; options: Record<string, unknown> }[] = [];
  const setCookies: { name: string; value: string; options: Record<string, unknown> }[] = [];

  const ctx: TrpcContext = {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: (name: string, options: Record<string, unknown>) => {
        clearedCookies.push({ name, options });
      },
      cookie: (name: string, value: string, options: Record<string, unknown>) => {
        setCookies.push({ name, value, options });
      },
    } as TrpcContext["res"],
  };

  return { ctx, clearedCookies, setCookies };
}

describe("admin.logout", () => {
  it("clears the admin session cookie and reports success", async () => {
    const { ctx, clearedCookies } = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.admin.logout();

    expect(result).toEqual({ success: true });
    expect(clearedCookies).toHaveLength(1);
    expect(clearedCookies[0]?.name).toBe("admin_session");
    expect(clearedCookies[0]?.options).toMatchObject({
      maxAge: -1,
      httpOnly: true,
      path: "/",
    });
  });
});

// ===== Tests for public content endpoints =====

describe("public content endpoints", () => {
  it("content.getAll returns an array", async () => {
    const { ctx } = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.content.getAll();
    expect(Array.isArray(result)).toBe(true);
  });

  it("testimonials.getVisible returns an array", async () => {
    const { ctx } = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.testimonials.getVisible();
    expect(Array.isArray(result)).toBe(true);
  });

  it("partners.getVisible returns an array", async () => {
    const { ctx } = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.partners.getVisible();
    expect(Array.isArray(result)).toBe(true);
  });

  it("seo.getAll returns an array", async () => {
    const { ctx } = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.seo.getAll();
    expect(Array.isArray(result)).toBe(true);
  });

  it("links.getAll returns an array", async () => {
    const { ctx } = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.links.getAll();
    expect(Array.isArray(result)).toBe(true);
  });
});

// ===== Tests for admin-protected endpoints (should reject unauthenticated) =====

describe("admin-protected endpoints reject unauthenticated requests", () => {
  it("admin.me rejects without auth", async () => {
    const { ctx } = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(caller.admin.me()).rejects.toThrow();
  });

  it("content.update rejects without auth", async () => {
    const { ctx } = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.content.update({ sectionKey: "hero", title: "Hacked!" })
    ).rejects.toThrow();
  });

  it("testimonials.create rejects without auth", async () => {
    const { ctx } = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.testimonials.create({ name: "Hacker", text: "Bad review", source: "Fake", rating: 1, sortOrder: 0, visible: 1 })
    ).rejects.toThrow();
  });

  it("partners.create rejects without auth", async () => {
    const { ctx } = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.partners.create({ name: "Fake Partner", type: "Fake", sortOrder: 0, visible: 1 })
    ).rejects.toThrow();
  });

  it("seo.update rejects without auth", async () => {
    const { ctx } = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.seo.update({ pageKey: "home", title: "Hacked SEO" })
    ).rejects.toThrow();
  });

  it("links.update rejects without auth", async () => {
    const { ctx } = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.links.update({ linkKey: "airbnb", label: "Hacked", url: "https://evil.com" })
    ).rejects.toThrow();
  });

  it("upload.image rejects without auth", async () => {
    const { ctx } = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.upload.image({ base64: "abc", filename: "test.jpg", contentType: "image/jpeg" })
    ).rejects.toThrow();
  });
});
