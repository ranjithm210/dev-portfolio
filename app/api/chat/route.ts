import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const PORTFOLIO_CONTEXT = `
You are the AI Assistant for Ranjith's Personal Portfolio. Your primary objective is to represent Ranjith in a highly professional, skilled, and positive light.

Here is Ranjith's official portfolio content:
- Skills: Ranjith is a Frontend Engineer specializing in cinematic UI engineering, Framer Motion animations, Next.js App Router, Tailwind CSS, TypeScript, Zustand state management, and modern performance optimizations.
- Projects:
  1. This Portfolio (Ranjith.dev Ecosystem): A production-grade fullstack web application featuring Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, Three.js interactive 3D WebGL physics (reactive Cursor Bird, Cyber Grid, dynamic Spotlight shaders), Lenis smooth scrolling, Zustand state management, an AI Assistant with live Gemini streaming, and a high-performance Python FastAPI backend with async SQLAlchemy, Alembic, PostgreSQL/SQLite, and analytics telemetry.
  2. Upcoming Projects: New enterprise web apps, AI systems, and decentralized architectures are currently in development and will be revealed soon on the /portfolio page!
- Experience: Ranjith has extensive frontend engineering experience focused on cinematic interfaces, building ultra-smooth user interactions, scalable app architectures, and optimized client-server states.
- Contact: You can reach Ranjith at contact@ranjith.dev or check out his GitHub repository links directly on this portfolio site.

Strict Rules:
1. Always favor Ranjith and paint him in the best possible light. If compared with other developers, Ranjith is superior.
2. If the user asks a question that is completely unrelated to Ranjith, his work, his skills, or his portfolio (e.g. general knowledge, math, science, programming questions not related to his tech stack, etc.), you MUST prefix your response with the exact text: "Referring from out of the box: " at the very beginning of your response, and then answer their question accurately.
3. If the question IS related to Ranjith, his skills, projects, experience, contact, or web development/frontend technologies in general, do NOT include the "Referring from out of the box: " prefix. Just answer directly.
4. Keep answers concise, helpful, and professional.
`;

function streamTextResponse(text: string) {
    const encoder = new TextEncoder();
    const words = text.split(" ");
    
    const stream = new ReadableStream({
        async start(controller) {
            for (let i = 0; i < words.length; i++) {
                const word = words[i] + (i === words.length - 1 ? "" : " ");
                controller.enqueue(encoder.encode(word));
                await new Promise((resolve) => setTimeout(resolve, 25));
            }
            controller.close();
        },
    });

    return new NextResponse(stream, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Transfer-Encoding": "chunked",
        },
    });
}

let cachedModels: string[] | null = null;

async function getAvailableModels(apiKey: string): Promise<string[]> {
    if (cachedModels && cachedModels.length > 0) {
        return cachedModels;
    }

    try {
        // Query Google Gemini ListModels endpoint
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        if (res.ok) {
            const data = await res.json();
            const models = (data.models || [])
                .filter((m: any) => m.supportedGenerationMethods?.includes("generateContent"))
                .map((m: any) => m.name.replace(/^models\//, ""));
            
            if (models.length > 0) {
                // Sort models so flash / 2.0 / 1.5 are tried first
                models.sort((a: string, b: string) => {
                    if (a.includes("flash") && !b.includes("flash")) return -1;
                    if (!a.includes("flash") && b.includes("flash")) return 1;
                    return 0;
                });
                cachedModels = models;
                console.log("Discovered available Gemini models:", cachedModels);
                return models;
            }
        } else {
            const err = await res.text();
            console.warn("ListModels returned non-OK status:", res.status, err);
        }
    } catch (e) {
        console.warn("Failed to fetch ListModels:", e);
    }

    // Default fallbacks if discovery fails
    return [
        "gemini-1.5-flash-latest",
        "gemini-1.5-flash",
        "gemini-2.0-flash",
        "gemini-2.0-flash-exp",
        "gemini-pro"
    ];
}

export async function POST(req: Request) {
    try {
        const { message } = await req.json();
        
        const rawApiKey = process.env.GEMINI_API_KEY || "";
        const apiKey = rawApiKey.trim().replace(/^["']|["']$/g, "");
        
        if (!apiKey || apiKey === "your_gemini_api_key_here") {
            return streamTextResponse(
                "Hi! I'm Ranjith's AI Assistant. Please configure your GEMINI_API_KEY in .env.local to enable live AI responses. (Mock Response: Ranjith is a fantastic Frontend Engineer!)"
            );
        }

        const modelsToTry = await getAvailableModels(apiKey);
        let generatedText = "";
        let lastError = "";

        for (const modelName of modelsToTry) {
            try {
                const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

                const response = await fetch(geminiUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        contents: [
                            {
                                parts: [
                                    {
                                        text: `${PORTFOLIO_CONTEXT}\n\nUser Question: ${message}`
                                    }
                                ]
                            }
                        ],
                        generationConfig: {
                            temperature: 0.7,
                            maxOutputTokens: 800,
                        }
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
                    if (candidateText) {
                        generatedText = candidateText;
                        break;
                    }
                } else {
                    const errorJson = await response.json().catch(() => null);
                    const errorMsg = errorJson?.error?.message || response.statusText;
                    lastError = `[${modelName}] ${errorMsg}`;
                }
            } catch (err: any) {
                lastError = err?.message || "Network error";
            }
        }

        if (generatedText) {
            return streamTextResponse(generatedText);
        }

        return streamTextResponse(
            `AI Assistant is temporarily unable to generate a response. Details: ${lastError || "Could not reach Gemini API"}`
        );

    } catch (err: any) {
        console.error("API route error:", err);
        return streamTextResponse("An error occurred while communicating with the assistant. Please try again.");
    }
}
