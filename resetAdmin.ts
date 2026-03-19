// resetAdmin.ts
import "dotenv/config";
import bcrypt from "bcryptjs";
import { getDb } from "./server/db.ts";        // ← add .ts here
import { adminUsers } from "./drizzle/schema.ts"; // ← add .ts if schema is TS
import { eq } from "drizzle-orm";

(async () => {
  const db = await getDb();
  if (!db) {
    console.error("Database not available");
    process.exit(1);
  }

  const hash = await bcrypt.hash("admin123", 12);
  await db.update(adminUsers).set({ passwordHash: hash }).where(eq(adminUsers.username, "admin"));
  console.log("✅ Admin password reset to 'admin123'");
  process.exit(0);
})();