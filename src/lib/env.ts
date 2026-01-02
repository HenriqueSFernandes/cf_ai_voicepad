import { getCloudflareContext } from "@opennextjs/cloudflare";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "@/db/schema";

export function getDB() {
	const d1 = getCloudflareContext().env.DB as unknown as D1Database;

	return drizzle(d1, { schema });
}
