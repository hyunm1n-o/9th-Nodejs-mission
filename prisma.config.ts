import { defineConfig, env } from "prisma/config";
import "dotenv/config";
import dotenv from "dotenv";
import path from "node:path";

dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
  override: true,
});

console.log("[DEBUG] DATABASE_URL =", env("DATABASE_URL"));
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
