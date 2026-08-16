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

    // Default fallbacks if discovery fails (gemini-3.5-flash confirmed active)
    return [
        "gemini-3.5-flash",
        "gemini-3.7-flash",
        "gemini-3-flash-preview",
        "gemini-flash-latest",
        "gemini-pro-latest",
        "gemini-2.5-flash-lite",
    ];
export async function POST(req: Request) {
    try {
        const { message } = await req.json();
        
        const backendUrl = process.env.BACKEND_API_URL || "http://127.0.0.1:8000";

        // Call FastAPI Backend (which holds the GEMINI_API_KEY and logs to Supabase)
        try {
            const backendRes = await fetch(`${backendUrl}/chat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ question: message }),
            });

            if (backendRes.ok) {
                const data = await backendRes.json();
                if (data && data.answer) {
                    return streamTextResponse(data.answer);
                }
            }
        } catch (backendErr) {
            console.warn("[FRONTEND_CHAT] FastAPI backend unreachable, attempting direct fallback:", backendErr);
        }

        // Fallback response if backend is offline
        return streamTextResponse(
            "Hello! I am Ranjith's AI Assistant. I can tell you about Ranjith's fullstack projects, skills, and experience. How can I help you today?"
        );
    } catch (e: any) {
        console.error("Error in chat route:", e);
        return streamTextResponse(
            "I encountered a temporary connection issue. Please try asking your question again!"
        );
    }
}
