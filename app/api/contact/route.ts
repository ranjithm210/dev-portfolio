import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, message } = body;

        // Validation
        if (!name || typeof name !== "string" || name.trim().length < 2) {
            return NextResponse.json(
                { success: false, error: "Please provide a valid name (at least 2 characters)." },
                { status: 400 }
            );
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
            return NextResponse.json(
                { success: false, error: "Please provide a valid email address." },
                { status: 400 }
            );
        }

        if (!message || typeof message !== "string" || message.trim().length < 5) {
            return NextResponse.json(
                { success: false, error: "Please provide a message (at least 5 characters)." },
                { status: 400 }
            );
        }

        const trimmedName = name.trim();
        const trimmedEmail = email.trim();
        const trimmedMessage = message.trim();
        const timestamp = new Date().toISOString();

        // Telemetry Logging
        console.log("==========================================");
        console.log(`[CONTACT TELEMETRY] New message received at ${timestamp}`);
        console.log(`From: ${trimmedName} <${trimmedEmail}>`);
        console.log(`Message: ${trimmedMessage}`);
        console.log("==========================================");

        // Optional Web3Forms / Resend webhook dispatch if configured
        const web3formsKey = process.env.WEB3FORMS_ACCESS_KEY;
        if (web3formsKey) {
            try {
                await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        access_key: web3formsKey,
                        name: trimmedName,
                        email: trimmedEmail,
                        message: trimmedMessage,
                        subject: `New Portfolio Inquiry from ${trimmedName}`,
                        from_name: "Ranjith.dev Portfolio",
                    }),
                });
            } catch (dispatchErr) {
                console.warn("[CONTACT] External dispatch failed, message logged locally:", dispatchErr);
            }
        }

        return NextResponse.json(
            {
                success: true,
                message: "Message received successfully! I'll get back to you shortly.",
                timestamp,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("[CONTACT ERROR]", error);
        return NextResponse.json(
            { success: false, error: "An unexpected error occurred while processing your message." },
            { status: 500 }
        );
    }
}
