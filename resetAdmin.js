import { getDb } from "./db/index.js";        // <-- add index.js or index.ts
import { adminUsers } from "./drizzle/schema.js"; // <-- make sure path matches
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

async function resetAdmin() {
  const db = await getDb();
  if (!db) {
    console.error("Database not available");
    process.exit(1);
  }

  const hash = await bcrypt.hash("admin123", 12);
  await db.update(adminUsers).set({ passwordHash: hash }).where(eq(adminUsers.username, "admin"));
  console.log("✅ Admin password reset to 'admin123'");
  process.exit(0);
}

resetAdmin().catch(err => {
  console.error("Failed:", err);
  process.exit(1);
});