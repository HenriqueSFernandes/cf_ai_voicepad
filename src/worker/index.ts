import { Hono } from "hono";
const app = new Hono<{ Bindings: Env }>();

app.get("/api/", (c) => c.json({ message: "VoicePad backend ready" }));

app.post("/api/transcribe", async (c) => {
	const file = await c.req.parseBody();
	const audio = file["audio"];

	if (!(audio instanceof File)) {
		return c.json({ error: "No audio file provided" }, 400);
	}

	const ai = c.env.AI;

	const transcription = await ai.run("@cf/openai/whisper", {
		audio: [...new Uint8Array(await audio.arrayBuffer())],
	});

	const inputText = transcription.text;


	return c.json({ transcription: inputText });
});

export default app;
