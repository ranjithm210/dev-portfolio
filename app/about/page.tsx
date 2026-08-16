"use client";

import { motion } from "framer-motion";
import { 
    ArrowLeft, 
    ArrowUpRight, 
    Github, 
    Instagram, 
    Linkedin, 
    Star, 
    Twitter, 
    Play, 
    Film, 
    Image as ImageIcon, 
    Maximize2, 
    ChevronLeft, 
    ChevronRight, 
    X,
    Sparkles
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import Spotlight from "@/components/animations/Spotlight";
import ThemeToggle from "@/components/common/ThemeToggle";
import { useTheme } from "@/providers/ThemeProvider";

interface Experience {
    role: string;
    company: string;
    period: string;
    description: string;
    award?: string;
}

export default function AboutPage() {
    const router = useRouter();
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Dynamic Perspective Gallery State
    const [mediaItems, setMediaItems] = useState<{ src: string; name: string; title: string; type: "image" | "video" }[]>([]);
    const [loadingMedia, setLoadingMedia] = useState(true);
    const [activeFilter, setActiveFilter] = useState<"all" | "image" | "video">("all");
    const [visibleCount, setVisibleCount] = useState(24);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    useEffect(() => {
        setMounted(true);

        // Fetch all dynamic images and videos from /api/perspective
        fetch("/api/perspective")
            .then((res) => res.json())
            .then((data) => {
                if (data.success && Array.isArray(data.items) && data.items.length > 0) {
                    setMediaItems(data.items);
                } else {
                    // Fallback to static manifest
                    fetch("/about_me_imges/perspective_manifest.json")
                        .then((r) => r.json())
                        .then((manifest) => setMediaItems(manifest))
                        .catch(() => {});
                }
            })
            .catch(() => {
                // Fallback to static manifest
                fetch("/about_me_imges/perspective_manifest.json")
                    .then((r) => r.json())
                    .then((manifest) => setMediaItems(manifest))
                    .catch(() => {});
            })
            .finally(() => setLoadingMedia(false));
    }, []);

    // Filter media
    const filteredMedia = mediaItems.filter((item) => {
        if (activeFilter === "all") return true;
        return item.type === activeFilter;
    });

    const displayedMedia = filteredMedia.slice(0, visibleCount);

    const photosCount = mediaItems.filter((m) => m.type === "image").length;
    const videosCount = mediaItems.filter((m) => m.type === "video").length;

    useEffect(() => {
        // Trigger window resize so Lenis immediately recalculates total scroll height
        if (typeof window !== "undefined") {
            const timer = setTimeout(() => {
                window.dispatchEvent(new Event("resize"));
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [visibleCount, mediaItems, activeFilter]);

    if (!mounted) {
        return <main className="min-h-screen bg-background relative font-sans select-none" />;
    }

    const experiences: Experience[] = [
        {
            role: "Trainee Associate - Full Stack",
            company: "Beyouncloud Tech Solutions LLP",
            period: "Feb 2026 • Present",
            description: "Working actively in the full-stack development team, contributing to scalable web applications and SaaS products using modern frameworks and advanced integrations."
        },
        {
            role: "Python Full Stack Intern",
            company: "Pentagon Space Pvt Ltd",
            period: "Oct 2024 • April 2025",
            description: "Designed and developed responsive webpages using HTML, CSS, JavaScript, and ReactJS. Built real-world projects integrating frontend and robust Python/Django backends to deliver end-to-end stack applications."
        },
        {
            role: "B.E. Electronics & Communication",
            company: "Brindavan College Of Engineering",
            period: "2021 • 2025 • CGPA: 7.5",
            description: "Built advanced projects including a Textile Texture Recognition system using CNNs (TensorFlow, OpenCV) and a Missile Defense Radar & Land Mine Detection System utilizing C and microprocessor integration."
        }
    ];

    const skills = [
        "React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion",
        "Three.js", "WebGL", "UX Engineering", "Design Systems",
        "State Management", "Performance Tuning", "AI Orchestration"
    ];

    return (
        <main className="min-h-screen bg-background text-foreground relative font-sans selection:bg-cyan-500/20 theme-transition">
            {/* SUBTLE AMBER SIDE GLOW */}
            <div className="absolute left-0 top-0 h-[600px] w-[500px] bg-[#4d3d2c]/10 blur-[150px] pointer-events-none z-0" />
            <Spotlight />

            {/* HEADER NAVIGATION */}
            <header className="relative z-10 max-w-[1650px] mx-auto px-8 md:px-20 lg:px-28 py-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div 
                        className="h-9 w-9 rounded-lg border border-zinc-200 dark:border-white/10 flex items-center justify-center font-bold text-foreground text-sm font-mono"
                        style={{
                            backgroundColor: theme === "dark" ? "rgba(255, 255, 255, 0.08)" : "rgba(15, 23, 42, 0.05)"
                        }}
                    >
                        R
                    </div>
                    <div>
                        <span className="font-semibold text-sm tracking-tight text-foreground block">Ranjith</span>
                        <span className="text-[10px] text-gray-500 tracking-wider uppercase block">Frontend Architect</span>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <ThemeToggle showToggle={false} />

                    <button
                        onClick={() => router.push("/portfolio")}
                        className="
                            flex
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-zinc-200
                            dark:border-white/10
                            px-4
                            py-2
                            text-xs
                            font-medium
                            text-foreground
                            backdrop-blur-xl
                            transition-all
                            duration-300
                            hover:border-zinc-300
                            dark:hover:border-white/20
                            hover:bg-zinc-200
                            dark:hover:bg-white/10
                        "
                        style={{
                            backgroundColor: theme === "dark" ? "rgba(255, 255, 255, 0.08)" : "rgba(15, 23, 42, 0.05)"
                        }}
                    >
                        <ArrowLeft size={14} />
                        Back
                    </button>
                </div>
            </header>

            {/* HERO INTRODUCTION */}
            <section className="relative z-10 max-w-[1650px] mx-auto px-8 md:px-20 lg:px-28 pt-16 pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* LEFT COLUMN: TEXT CONTENT */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6 lg:col-span-8"
                    >
                        <p className="text-lg uppercase tracking-[0.35em] text-foreground font-bold">
                            ABOUT ME
                        </p>
                        <h1 className="text-4xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
                            No Shortcuts.<br />
                            Just Years of Learning, Building, and Improving.
                        </h1>
                        <h2 className="text-lg text-gray-400 font-normal pt-2">
                            I didn't become a developer overnight.
                        </h2>
                        <p className="text-gray-400 max-w-4xl text-lg leading-relaxed">
                            My journey began in Electronics and Communication Engineering, where I developed a fascination for how systems interact—from microprocessors detecting radar signals to Deep Learning models classifying complex textures. Today, I channel that analytical mindset into Full Stack Development, leveraging Python, ReactJS, and AI to build scalable, real-world digital products that solve meaningful problems.
                        </p>
                    </motion.div>

                    {/* RIGHT COLUMN: HERO IMAGE */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:col-span-4 flex justify-center"
                    >
                        <div className="relative group w-full max-w-[400px] aspect-[4/5] rounded-[32px] overflow-hidden border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/5 p-3 backdrop-blur-xl transition-all duration-500 hover:border-cyan-400/30 touch-pan-y select-none">
                            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-purple-500/5 to-transparent opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
                            <div className="relative w-full h-full rounded-[24px] overflow-hidden border border-zinc-200/50 dark:border-white/5">
                                <Image
                                    src="/about_me_imges/perspective/IMG_5489.jpg"
                                    alt="Ranjith"
                                    fill
                                    priority
                                    draggable={false}
                                    className="object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* EXPERIENCES & SKILLS SECTION */}
            <section className="relative z-10 max-w-[1650px] mx-auto px-8 md:px-20 lg:px-28 py-16 border-t border-zinc-200 dark:border-white/5">
                <div className="grid gap-16 lg:grid-cols-12">

                    {/* LEFT COLUMN: EXPERIENCES */}
                    <div className="lg:col-span-7 space-y-12">
                        <h3 className="text-2xl font-bold tracking-tight text-foreground">Experiences</h3>

                        <div className="space-y-10">
                            {experiences.map((exp, idx) => (
                                <div key={idx} className="space-y-3 group">
                                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                                        <h4 className="text-lg font-semibold text-foreground group-hover:text-cyan-400 transition-colors duration-300">
                                            {exp.role} <span className="text-zinc-400 dark:text-zinc-600">✦</span> {exp.company}
                                        </h4>
                                    </div>
                                    <p className="text-xs text-gray-500 font-mono">{exp.period}</p>

                                    {exp.award && (
                                        <div className="inline-flex items-center gap-1.5 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-[10px] px-2.5 py-0.5 rounded-full font-medium">
                                            🏆 {exp.award}
                                        </div>
                                    )}

                                    <p className="text-base md:text-lg text-gray-400 leading-relaxed font-light">
                                        {exp.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: SKILLS */}
                    <div className="lg:col-span-5 space-y-8">
                        <div>
                            <h3 className="text-lg font-semibold tracking-tight text-foreground mb-6">Core Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, idx) => (
                                    <span
                                        key={idx}
                                        className="text-xs bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/5 px-3 py-1.5 rounded-lg text-zinc-600 dark:text-gray-400 font-medium hover:border-zinc-300 dark:hover:border-white/10 transition-colors duration-300"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* MINI TOOLS DISPLAY */}
                        <div className="pt-6 border-t border-zinc-200 dark:border-white/5">
                            <h4 className="text-xs text-gray-500 uppercase tracking-widest mb-4">Development Environment</h4>
                            <div className="flex flex-wrap gap-4 text-xs font-mono text-gray-400">
                                <span>VS Code</span>
                                <span>Git</span>
                                <span>Webpack</span>
                                <span>Turbopack</span>
                                <span>Node.js</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            {/* MY PERSPECTIVE / DYNAMIC GALLERY SECTION */}
            <section className="relative z-10 max-w-[1650px] mx-auto px-8 md:px-20 lg:px-28 py-20 border-t border-zinc-200 dark:border-white/5">
                {/* Header & Filter Bar */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 mb-3">
                            <Sparkles size={12} />
                            Visual Journey & Moments
                        </div>
                        <h3 className="text-3xl md:text-5xl font-black text-foreground tracking-tight">
                            My Perspective
                        </h3>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-card border border-border">
                        <button
                            onClick={() => { setActiveFilter("all"); setVisibleCount(24); }}
                            className={`px-4 py-2 rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition-all ${activeFilter === "all" ? "bg-cyan-500 text-black shadow-md" : "text-foreground/70 hover:text-foreground"}`}
                        >
                            All ({mediaItems.length})
                        </button>
                        <button
                            onClick={() => { setActiveFilter("image"); setVisibleCount(24); }}
                            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition-all ${activeFilter === "image" ? "bg-cyan-500 text-black shadow-md" : "text-foreground/70 hover:text-foreground"}`}
                        >
                            <ImageIcon size={13} />
                            Photos ({photosCount})
                        </button>
                        <button
                            onClick={() => { setActiveFilter("video"); setVisibleCount(24); }}
                            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition-all ${activeFilter === "video" ? "bg-cyan-500 text-black shadow-md" : "text-foreground/70 hover:text-foreground"}`}
                        >
                            <Film size={13} />
                            Videos ({videosCount})
                        </button>
                    </div>
                </div>

                {/* Media Grid */}
                <div className="bg-card/40 border border-border/80 p-5 md:p-8 rounded-[36px] backdrop-blur-xl shadow-2xl">
                    {loadingMedia ? (
                        <div className="py-24 text-center space-y-3">
                            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-cyan-500 border-r-transparent" />
                            <p className="font-mono text-xs text-foreground/60">Scanning & loading perspective moments...</p>
                        </div>
                    ) : filteredMedia.length === 0 ? (
                        <div className="py-20 text-center text-foreground/50 font-mono text-sm">
                            No media found in this category.
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
                                {displayedMedia.map((media, idx) => {
                                    const isVideo = media.type === "video" || media.src.match(/\.(mp4|webm|mov|m4v)$/i);
                                    return (
                                        <motion.div
                                            key={media.src + idx}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.4, delay: (idx % 8) * 0.05 }}
                                            onClick={() => setLightboxIndex(idx)}
                                            className="
                                                group
                                                relative
                                                aspect-square
                                                rounded-2xl
                                                overflow-hidden
                                                border
                                                border-border
                                                hover:border-cyan-500/50
                                                bg-foreground/[0.03]
                                                cursor-pointer
                                                shadow-sm
                                                hover:shadow-[0_0_25px_rgba(6,145,178,0.2)]
                                                transition-all
                                                duration-300
                                                select-none
                                            "
                                        >
                                            {isVideo ? (
                                                <>
                                                    <video
                                                        src={media.src}
                                                        autoPlay
                                                        loop
                                                        muted
                                                        playsInline
                                                        preload="metadata"
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                                                    />
                                                    {/* Video Badge */}
                                                    <span className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 rounded-full bg-black/70 border border-white/20 px-2 py-0.5 font-mono text-[9px] font-bold text-white backdrop-blur-md">
                                                        <Play size={10} className="fill-white" />
                                                        VIDEO
                                                    </span>
                                                </>
                                            ) : (
                                                <Image
                                                    src={media.src}
                                                    alt={media.title || "Perspective moment"}
                                                    fill
                                                    loading="lazy"
                                                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                                    className="object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                                                />
                                            )}

                                            {/* Hover View Overlay */}
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                                                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 border border-white/40 text-white backdrop-blur-md scale-90 group-hover:scale-100 transition-transform">
                                                    <Maximize2 size={16} />
                                                </span>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* Load More Button */}
                            {visibleCount < filteredMedia.length && (
                                <div className="mt-12 text-center">
                                    <button
                                        onClick={() => setVisibleCount((prev) => Math.min(prev + 24, filteredMedia.length))}
                                        className="
                                            inline-flex
                                            items-center
                                            gap-2
                                            rounded-full
                                            border
                                            border-cyan-500/40
                                            bg-cyan-500/10
                                            hover:bg-cyan-500/20
                                            text-cyan-600
                                            dark:text-cyan-400
                                            font-mono
                                            font-bold
                                            text-xs
                                            px-8
                                            py-3.5
                                            transition-all
                                            duration-300
                                            shadow-md
                                            active:scale-95
                                        "
                                    >
                                        <span>Load More Moments ({filteredMedia.length - visibleCount} Remaining)</span>
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* LIGHTBOX FULL-SCREEN MODAL */}
                {lightboxIndex !== null && displayedMedia[lightboxIndex] && (
                    <div 
                        data-lenis-prevent="true"
                        onClick={() => setLightboxIndex(null)}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-2xl"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setLightboxIndex(null)}
                            className="absolute top-6 right-6 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20 transition-all"
                        >
                            <X size={20} />
                        </button>

                        {/* Prev Button */}
                        {lightboxIndex > 0 && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setLightboxIndex(lightboxIndex - 1);
                                }}
                                className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20 transition-all"
                            >
                                <ChevronLeft size={24} />
                            </button>
                        )}

                        {/* Next Button */}
                        {lightboxIndex < displayedMedia.length - 1 && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setLightboxIndex(lightboxIndex + 1);
                                }}
                                className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20 transition-all"
                            >
                                <ChevronRight size={24} />
                            </button>
                        )}

                        {/* Media Container */}
                        <div 
                            onClick={(e) => e.stopPropagation()}
                            className="relative max-w-5xl max-h-[85vh] w-full flex items-center justify-center overflow-hidden rounded-3xl"
                        >
                            {displayedMedia[lightboxIndex].type === "video" || displayedMedia[lightboxIndex].src.match(/\.(mp4|webm|mov|m4v)$/i) ? (
                                <video
                                    src={displayedMedia[lightboxIndex].src}
                                    controls
                                    autoPlay
                                    playsInline
                                    className="max-h-[85vh] max-w-full rounded-2xl shadow-2xl"
                                />
                            ) : (
                                <img
                                    src={displayedMedia[lightboxIndex].src}
                                    alt="Perspective Lightbox"
                                    className="max-h-[85vh] max-w-full object-contain rounded-2xl shadow-2xl"
                                />
                            )}
                        </div>
                    </div>
                )}
            </section>



            {/* INSTAGRAM BADGE & FOOTER SIGNATURE */}
            <footer className="relative z-10 max-w-[1650px] mx-auto px-8 md:px-20 lg:px-28 pt-12 pb-24 border-t border-zinc-200 dark:border-white/5 flex flex-col items-center justify-center text-center space-y-8">

                <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500 font-medium">Follow me on</span>
                    <a
                        href="https://www.instagram.com/rxnji.__?igsh=MTVtdmFuYzU3azJlNg=="
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 border border-zinc-200 dark:border-white/10 hover:border-zinc-300 dark:hover:border-white/20 transition-all px-3 py-1.5 rounded-full text-xs font-semibold text-foreground"
                        style={{
                            backgroundColor: theme === "dark" ? "rgba(255, 255, 255, 0.08)" : "rgba(15, 23, 42, 0.05)"
                        }}
                    >
                        <Instagram size={14} className="text-pink-500" />
                        instagram
                    </a>
                </div>

                <div className="space-y-2">
                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-serif italic text-foreground/90">
                        the Ranjith
                    </h2>
                    <div className="flex justify-center gap-6 pt-2">
                        <a href="https://www.linkedin.com/in/ranjith-m-dev/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-500 hover:text-foreground transition-colors"><Linkedin size={18} /></a>
                        <a href="https://github.com/ranjithm210" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-gray-500 hover:text-foreground transition-colors"><Github size={18} /></a>
                        <a href="https://x.com/Raxjib" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X" className="text-gray-500 hover:text-foreground transition-colors"><Twitter size={18} /></a>
                    </div>
                </div>

                <p className="text-[10px] text-gray-600 font-mono pt-4">
                    From concept to creation, let's make.
                </p>
            </footer>
        </main>
    );
}
