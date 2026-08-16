import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
    try {
        const perspectiveDir = path.join(process.cwd(), "public", "about_me_imges", "perspective");

        if (!fs.existsSync(perspectiveDir)) {
            return NextResponse.json({ success: true, items: [] });
        }

        const files = fs.readdirSync(perspectiveDir);

        // Filter valid images and videos
        const validExtensions = /\.(jpg|jpeg|png|webp|mp4|webm|mov|m4v)$/i;

        const mediaItems = files
            .filter((file) => validExtensions.test(file) && !file.startsWith("."))
            .map((file) => {
                const isVideo = /\.(mp4|webm|mov|m4v)$/i.test(file);
                const cleanTitle = file
                    .replace(/\.[^/.]+$/, "")
                    .replace(/[-_]/g, " ")
                    .replace(/main|snapshot|perspective/gi, "")
                    .trim();

                return {
                    src: `/about_me_imges/perspective/${file}`,
                    name: file,
                    title: cleanTitle || "Moment Snapshot",
                    type: isVideo ? "video" : "image",
                };
            });

        return NextResponse.json({
            success: true,
            count: mediaItems.length,
            items: mediaItems,
        });
    } catch (error) {
        console.error("[PERSPECTIVE_API_ERROR]", error);
        return NextResponse.json(
            { success: false, error: "Failed to load perspective media gallery." },
            { status: 500 }
        );
    }
}
