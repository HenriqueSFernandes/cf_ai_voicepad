import { temp } from "@/db/schema/temp";
import { getDB } from "@/lib/env";

export async function GET() {
	const db = getDB();

	const result = await db.select().from(temp).all();

	return Response.json({ data: result });
}
