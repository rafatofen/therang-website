import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

const connectionString = process.env.DATABASE_URL || 'sqlite:./dev.db';

export default defineConfig({
  schema: './drizzle/schema.ts',
  out: './drizzle/migrations',
  dialect: 'sqlite',          // <-- use sqlite locally
  dbCredentials: {
    url: connectionString,
  },
});