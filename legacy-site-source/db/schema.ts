import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const evidenceSubmissions = sqliteTable("evidence_submissions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  laureateName: text("laureate_name").notNull(),
  bloodType: text("blood_type").notNull(),
  sourceUrl: text("source_url").notNull(),
  sourceKind: text("source_kind").notNull(),
  ancestryContext: text("ancestry_context").notNull().default(""),
  notes: text("notes").notNull().default(""),
  contactEmail: text("contact_email").notNull().default(""),
  reviewStatus: text("review_status").notNull().default("pending"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
