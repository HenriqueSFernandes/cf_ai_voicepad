import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const temp = sqliteTable("temp", {
	id: integer("id").primaryKey(),
	name: text("name").notNull(),
});
