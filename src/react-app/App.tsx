"use client";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function App() {
	const [username, setUsername] = useState("");
	const [userSet, setUserSet] = useState(false);
	const [recording, setRecording] = useState(false);
	const [markdown, setMarkdown] = useState("");

	const mediaRecorder = useRef<MediaRecorder | null>(null);
	const chunks = useRef<BlobPart[]>([]);

	async function startRecording() {
		setRecording(true);
		const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
		mediaRecorder.current = new MediaRecorder(stream);

		mediaRecorder.current.ondataavailable = (e) => chunks.current.push(e.data);
		mediaRecorder.current.onstop = async () => {
			console.log("hello");
			const audioBlob = new Blob(chunks.current, { type: "audio/webm" });
			chunks.current = [];
			const formData = new FormData();
			formData.append("audio", audioBlob, "recording.webm");
			formData.append("username", username);

			const res = await fetch("/api/process", {
				method: "POST",
				body: formData,
			});
			const data = await res.json();

			setMarkdown(data.result);
			setRecording(false);
		};

		mediaRecorder.current.start();
	}

	function stopRecording() {
		if (mediaRecorder.current && mediaRecorder.current.state === "recording") {
			mediaRecorder.current.stop();
		}
	}

	if (!userSet) {
		return (
			<div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 p-4">
				<Card className="p-8 w-full max-w-md">
					<h1 className="text-2xl font-bold mb-4">🎙 VoicePad</h1>
					<Input
						placeholder="Enter your username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className="mb-4"
					/>
					<Button
						onClick={() => setUserSet(true)}
						disabled={!username}
						className="w-full"
					>
						Continue
					</Button>
				</Card>
			</div>
		);
	}

	return (
		<div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 p-4">
			<Card className="p-8 w-full max-w-md">
				<h1 className="text-2xl font-bold mb-2">🎙 VoicePad</h1>
				<p className="text-sm text-gray-600 mb-4">User: {username}</p>
				{!recording ? (
					<Button
						onClick={startRecording}
						disabled={recording}
						className="w-full mb-4"
					>
						Start Recording
					</Button>
				) : (
					<Button
						onClick={stopRecording}
						variant="destructive"
						className="w-full mb-4"
					>
						Stop Recording
					</Button>
				)}
				{markdown && (
					<Card className="bg-gray-50 p-4 overflow-auto max-h-96">
						<pre className="text-sm whitespace-pre-wrap">{markdown}</pre>
					</Card>
				)}
			</Card>
		</div>
	);
}
