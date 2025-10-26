import { Hono } from "hono";
const app = new Hono<{ Bindings: Env }>();

app.get("/api/", (c) => c.json({ message: "VoicePad backend ready" }));

app.post("/api/process", async (c) => {
	const file = await c.req.parseBody();
	const audio = file["audio"];

	if (!(audio instanceof File)) {
		return c.json({ error: "No audio file provided" }, 400);
	}

	const ai = c.env.AI;

	const transcription = await ai.run(
		"@cf/openai/whisper",
		{
			audio: [...new Uint8Array(await audio.arrayBuffer())],
		},
		{
			gateway: {
				id: "gateway",
			},
		},
	);

	const inputText = transcription.text;

	const prompt = `
You are VoicePad, an assistant that turns spoken notes into organized Markdown.
Summarize the following transcription clearly.
Extract key ideas, structure them hierarchically, and list actionable items as checkboxes.

Return the result **only in Markdown**.

Transcription:
"""
${inputText}
"""
`;

	const result = await ai.run("@cf/meta/llama-3.2-3b-instruct", {
		messages: [
			{
				role: "system",
				content: "You are VoicePad, a Markdown note assistant.",
			},
			{ role: "user", content: prompt },
		],
	});

	return c.json({ result: result.response });
});

export default app;
