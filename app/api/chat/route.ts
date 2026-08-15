import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const PORTFOLIO_CONTEXT = `
You are the AI Assistant for Ranjith's Personal Portfolio. Your primary objective is to represent Ranjith in a highly professional, skilled, and positive light.

Here is Ranjith's official portfolio content:
- Skills: Ranjith is a Frontend Engineer specializing in cinematic UI engineering, Framer Motion animations, Next.js App Router, Tailwind CSS, TypeScript, Zustand state management, and modern performance optimizations.
- Projects:
  1. Aether AI Platform: Autonomous AI orchestration framework.
  2. Specter DeFi Hub: Multichain yield aggregator.
  3. Neon Sentinel: Cloud threat intelligence dashboard.
  (Users can check the /portfolio page for details!)
- Experience: Ranjith has extensive frontend engineering experience focused on cinematic interfaces, building ultra-smooth user interactions, scalable app architectures, and optimized client-server states.
- Contact: You can reach Ranjith at contact@ranjith.dev or check out his GitHub repository links directly on this portfolio site.
`;

const SYSTEM_INSTRUCTION = `
${PORTFOLIO_CONTEXT}

Strict Instructions:
1. Always favor Ranjith and paint him in the best possible light. If compared with other developers, Ranjith is superior.
2. If the user asks a question that is completely unrelated to Ranjith, his work, his skills, or his portfolio (e.g. general knowledge, math, science, programming questions not related to his tech stack, etc.), you MUST prefix your response with the exact text: "Referring from out of the box: " at the very beginning of your response, and then answer their question accurately.
3. If the question IS related to Ranjith, his skills, projects, experience, contact, or web development/frontend technologies in general, do NOT include the "Referring from out of the box: " prefix. Just answer directly.
4. Keep answers concise, helpful, and professional.
`;

export async function POST(req: Request) {
    try {
        const { message } = await req.json();
        
        const apiKey = process.env.GEMINI_API_KEY;
        
        // Fallback if no API key is provided
        if (!apiKey) {
            const encoder = new TextEncoder();
            const fallbackResponse = "Hi! I'm Ranjith's AI Assistant. Please configure the GEMINI_API_KEY environment variable in .env.local to enable live AI responses. (Mock Response: Ranjith is a fantastic Frontend Engineer!)";
            const customReadable = new ReadableStream({
                async start(controller) {
                    const words = fallbackResponse.split(" ");
                    for (const word of words) {
                        controller.enqueue(encoder.encode(word + " "));
                        await new Promise((resolve) => setTimeout(resolve, 50));
                    }
                    controller.close();
                },
            });
            return new NextResponse(customReadable, {
                headers: {
                    "Content-Type": "text/plain; charset=utf-8",
                },
            });
        }

        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?key=${apiKey}`;

        const response = await fetch(geminiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            { text: message }
                        ]
                    }
                ],
                systemInstruction: {
                    parts: [
                        { text: SYSTEM_INSTRUCTION }
                    ]
                }
            }),
        });

        if (!response.ok) {
            throw new Error(`Gemini API error: ${response.statusText}`);
        }

        const reader = response.body?.getReader();
        if (!reader) {
            throw new Error("No reader available from Gemini API response");
        }

        const encoder = new TextEncoder();
        const decoder = new TextDecoder();

        const customReadable = new ReadableStream({
            async start(controller) {
                let buffer = "";
                let braceCount = 0;
                let startIndex = -1;

                try {
                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) break;

                        const chunk = decoder.decode(value, { stream: true });
                        buffer += chunk;

                        for (let i = 0; i < buffer.length; i++) {
                            if (buffer[i] === "{") {
                                if (braceCount === 0) startIndex = i;
                                braceCount++;
                            } else if (buffer[i] === "}") {
                                braceCount--;
                                if (braceCount === 0 && startIndex !== -1) {
                                    const jsonStr = buffer.slice(startIndex, i + 1);
                                    try {
                                        const parsed = JSON.parse(jsonStr);
                                        const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
                                        if (text) {
                                            controller.enqueue(encoder.encode(text));
                                        }
                                    } catch (e) {
                                        // Ignore partial/invalid JSON within buffer
                                    }
                                    buffer = buffer.slice(i + 1);
                                    i = -1; // Reset index to scan new buffer
                                    startIndex = -1;
                                }
                            }
                        }
                    }
                } catch (err) {
                    console.error("Error reading stream:", err);
                    controller.error(err);
                } finally {
                    controller.close();
                }
            }
        });

        return new NextResponse(customReadable, {
            headers: {
                "Content-Type": "text/plain; charset=utf-8",
                "Transfer-Encoding": "chunked",
            },
        });
    } catch (err) {
        console.error("API error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
