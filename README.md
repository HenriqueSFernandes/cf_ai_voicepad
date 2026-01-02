# Warning

**This project is currently under development and is a prototype. It is not 100% functional and may contain bugs or incomplete features.**

# Cloudflare AI Voicepad

This project is a submission for the Cloudflare Summer Internship Program application.

## Tech Stack

This project is built using the following technologies:

- **Cloudflare Workers:** For serverless backend logic.
- **Cloudflare Workers AI:** For running the AI model.
- **Next.js:** The framework.

## Project Overview

Voicepad is an application that transcribes spoken audio into text. This text is then processed and summarized into Markdown format. The summary includes key ideas and can generate actionable items as a todo list. The primary goal is to convert spoken input into organized, written notes.

A deployed version can be found here: [voicepad.henriquesf.me](https://voicepad.henriquesf.me)

## Running Instructions

To run this project locally, follow these steps:

1.  **Install dependencies:**
    ```bash
    pnpm install
    ```
2.  **Start the development server:**

    ```bash
    pnpm dev
    ```

3.  **Build for production:**

    ```bash
    pnpm build
    ```

4.  **Deploy to Cloudflare Workers:**
    ```bash
    pnpm deploy
    ```
    This command builds the project and deploys the Cloudflare Worker to your Cloudflare account.

## Future Work

- Realtime transcription and summarization.
- Improved UI/UX design.
- Data persistence and user authentication.

## Use of AI

AI was used in the development of this project, but all code was manually written. It assisted in brainstorming ideas and in the architecture of the project.

