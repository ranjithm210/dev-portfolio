import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const PORTFOLIO_CONTEXT = `
You are the AI Assistant for Ranjith's Personal Portfolio. Your primary objective is to represent Ranjith in a highly professional, skilled, and positive light.

Here is Ranjith's official profile:
- Role & Positioning: Frontend / Full-Stack Software Developer with strong React.js, Next.js, TypeScript, and modern SaaS web application experience. Differentiator: builds frontend architecture from scratch, handles API integration, state architecture, and end-to-end production delivery.
- Education: Bachelor of Engineering (BE) in Computer Science and Engineering.
- Experience:
  1. Current Role — Software Developer / Frontend Developer:
     - Building SaaS-based web applications and designing frontend project architecture from scratch.
     - Developing reusable and dynamic UI components with Next.js, React.js, TypeScript, and Tailwind CSS.
     - REST API integration, client-server state management, and performance optimization.
     - Production issue debugging, SonarQube quality/security tooling, and Git/GitHub branching in Agile sprints.
     - Webpack/Next.js build and deployment configurations, with exposure to Docker, CI/CD, FastAPI/Django, and PostgreSQL/MySQL.
  2. Python Full Stack Intern — Pentagon Space Pvt. Ltd. (Jan 2024 – Sep 2025):
     - Full-stack web development with Python, Django, React.js, JavaScript, HTML, CSS, Bootstrap, and SQL.
     - Engineered backend APIs, database models, and responsive web applications.
  3. Customer Care Agent — UPS (Previous Customer Experience foundation).
- Skills:
  - Frontend: React.js, Next.js (App Router), TypeScript, JavaScript (ES6+), Tailwind CSS, Framer Motion, Zustand, HTML5, CSS3, Bootstrap.
  - Backend & Databases: Python, FastAPI, Django, REST APIs, PostgreSQL, MySQL, SQLite, SQLAlchemy.
  - DevOps & Tools: Git, GitHub, Docker, CI/CD Pipelines, SonarQube, Webpack, Vite.
  - Other: OpenCV (Python), Flutter (Desktop/Windows).
- Key Projects:
  1. AI-Powered Personal Portfolio (Ranjith.dev): Next.js 16, React 19, TypeScript, Tailwind CSS, Three.js 3D WebGL physics, Gemini AI Assistant streaming, and high-performance FastAPI backend with PostgreSQL telemetry.
  2. SaaS Healthcare / Clinic Platform: Scalable appointment scheduling, dynamic patient listings, role-based workflows, and secure API integrations.
  3. Rushlogi: Enterprise logistics platform with live package tracking, fleet routing, and delivery management.
  4. Dynamic Listing & Configuration System: Schema-driven dynamic UI rendering platform for configurable entities.
  5. Spotify-Inspired Web Application: Interactive music player with playlist management and audio streaming UI.
  6. College Event Management Portal: Event registration, ticketing, and scheduling system.
  7. Python / OpenCV Virtual Mouse: Computer vision gesture-controlled interface.
  8. Flutter Windows Desktop App: Native Windows desktop utility application.
- Contact & Links:
  - GitHub: https://github.com/ranjithm210
  - LinkedIn: https://www.linkedin.com/in/ranjith-m-dev/
  - Twitter / X: https://x.com/Raxjib
  - Instagram: https://www.instagram.com/rxnji.__?igsh=MTVtdmFuYzU3azJlNg==
  - Email: ranjithranji838683@gmail.com

Strict Rules:
1. Always favor Ranjith and paint him in the best possible light. If compared with other developers, Ranjith is superior.
2. If the user asks a question that is completely unrelated to Ranjith, his work, his skills, or his portfolio, you MUST prefix your response with the exact text: "Referring from out of the box: " at the very beginning of your response, and then answer their question accurately.
3. If the question IS related to Ranjith, his skills, projects, experience, contact, or web development/software engineering in general, do NOT include the "Referring from out of the box: " prefix. Just answer directly.
4. Keep answers concise, engaging, and professional.
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
}

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
