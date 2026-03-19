import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { ENV } from "./_core/env";
import { publicProcedure } from "./_core/trpc";
import type { TrpcContext } from "./_core/context";
import { getAdminById } from "./db";

const ADMIN_COOKIE_NAME = "admin_session";
const SECRET = new TextEncoder().encode(ENV.cookieSecret || "fallback-secret-change-me");

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createAdminToken(adminId: number): Promise<string> {
  return new SignJWT({ adminId })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .setIssuedAt()
    .sign(SECRET);
}

export async function verifyAdminToken(token: string): Promise<{ adminId: number } | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return { adminId: payload.adminId as number };
  } catch {
    return null;
  }
}

/** Extract admin from cookie or Authorization header */
export async function getAdminFromRequest(ctx: TrpcContext) {
  // Try cookie first
  const cookieHeader = ctx.req.headers.cookie || "";
  const cookies = Object.fromEntries(
    cookieHeader.split(";").map(c => {
      const [k, ...v] = c.trim().split("=");
      return [k, v.join("=")];
    })
  );
  let token = cookies[ADMIN_COOKIE_NAME];

  // Fallback to Authorization header
  if (!token) {
    const authHeader = ctx.req.headers.authorization;
    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.slice(7);
    }
  }

  if (!token) return null;

  const payload = await verifyAdminToken(token);
  if (!payload) return null;

  const admin = await getAdminById(payload.adminId);
  return admin || null;
}

/** tRPC middleware that requires admin authentication */
export const adminAuthProcedure = publicProcedure.use(async ({ ctx, next }) => {
  const admin = await getAdminFromRequest(ctx);
  if (!admin) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Admin login required" });
  }
  return next({
    ctx: { ...ctx, admin },
  });
});

export { ADMIN_COOKIE_NAME };
