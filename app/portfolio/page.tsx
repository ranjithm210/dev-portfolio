"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

import {
    ArrowLeft,
    Bot,
    Cpu,
    Terminal,
    Database,
    Shield,
    Zap,
    Globe,
    Code,
    Menu,
    X,
    ArrowUpRight,
    ArrowUp,
    Github,
    Linkedin,
    Twitter,
    Instagram,
    Sparkles,
    Clock,
    Flame,
    Activity,
    RefreshCw,
    Server,
    Layers,
    Box,
    CheckCircle2,
    Sliders,
    Workflow,
    Dumbbell,
    Compass,
    Brain,
    Rocket,
    Send,
    Loader2,
    User,
    ArrowRight,
} from "lucide-react";

import { useRouter } from "next/navigation";
import Image from "next/image";
import CyberPanel from "@/components/common/CyberPanel";
import { useChatbotStore } from "@/store/chatbotStore";
import AIChatbot from "@/components/common/AIChatbot";
import ThemeToggle from "@/components/common/ThemeToggle";
import CyberGrid from "@/components/hero/CyberGrid";
import Footer from "@/components/layout/Footer";
import { useTheme } from "@/providers/ThemeProvider";

const portfolioFeatures = [
    {
        icon: Bot,
        title: "Streaming Generative AI Assistant",
        tag: "Frontend + AI Service",
        description: "Custom-engineered 'Ask Bently' AI agent featuring real-time token streaming via ReadableStream, dynamic Gemini model discovery & multi-model fallback queue, and portfolio context grounding.",
        tech: ["Google Gemini API", "ReadableStream", "Zustand State", "Next.js App Router"],
    },
    {
        icon: Box,
        title: "Interactive 3D WebGL & Physics",
        tag: "Creative Engineering",
        description: "GPU-accelerated spatial visuals including a reactive 3D Cursor Bird built with React Three Fiber, dynamic Spotlight lighting shaders, Cyber Grid matrix, and floating particle fields.",
        tech: ["Three.js", "React Three Fiber", "@react-three/drei", "GLSL Shaders"],
    },
    {
        icon: Server,
        title: "High-Performance Python Backend",
        tag: "Backend Infrastructure",
        description: "Asynchronous REST API built with Python FastAPI & Uvicorn, handling analytics ingestion, chat session telemetry, async SQLAlchemy ORM database queries, and Alembic migrations.",
        tech: ["Python FastAPI", "SQLAlchemy 2.0 (Async)", "Alembic", "PostgreSQL / SQLite", "Docker"],
    },
    {
        icon: Layers,
        title: "Cinematic UI & Theme System",
        tag: "UI/UX & Motion",
        description: "Ultra-responsive dual-mode Cyberpunk Light & Dark design system with smooth CSS variable transitions, Lenis smooth inertial scrolling, and Framer Motion spring physics.",
        tech: ["Next.js 16", "Tailwind CSS", "Framer Motion", "Lenis Scroll"],
    },
];

const beyondCodingItems = [
    {
        icon: Dumbbell,
        tag: "Iron & Discipline",
        badgeColor: "text-amber-500 bg-amber-500/10 border-amber-500/30",
        glowColor: "hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]",
        borderColor: "hover:border-amber-500/50",
        title: "Fitness & Heavy Iron",
        description: "Lifting heavy, hitting PRs, dialed nutrition & biohacking routine. Treating physical conditioning like backend architecture: heavy load testing, zero downtime.",
        metric: "Daily PRs · Pure Discipline",
    },
    {
        icon: Compass,
        tag: "Nomad Exploration",
        badgeColor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/30",
        glowColor: "hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]",
        borderColor: "hover:border-emerald-500/50",
        title: "Travel & Wandering",
        description: "Exploring remote places, scenic coastlines, mountain trails & culture. Backpack, laptop, and good coffee—recharging perspective in uncharted coordinates.",
        metric: "New Coordinates · Nomad",
    },
    {
        icon: Brain,
        tag: "AI Whisperer",
        badgeColor: "text-purple-500 bg-purple-500/10 border-purple-500/30",
        glowColor: "hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]",
        borderColor: "hover:border-purple-500/50",
        title: "Making LLMs My Slave",
        description: "Orchestrating autonomous multi-agent pipelines, prompt chain engineering, and bending massive neural models to do 100 hours of cognitive labour in minutes.",
        metric: "Agent Swarms · Prompt Alchemy",
    },
    {
        icon: Rocket,
        tag: "Frontier Hacker",
        badgeColor: "text-cyan-500 bg-cyan-500/10 border-cyan-500/30",
        glowColor: "hover:shadow-[0_0_30px_rgba(6,145,178,0.15)]",
        borderColor: "hover:border-cyan-400/50",
        title: "Exploiting New Ecosystems",
        description: "Diving headfirst into bleeding-edge frameworks, WebGL shaders, distributed tools & emerging developer APIs before they have StackOverflow answers.",
        metric: "Zero-Day Tech · Frontier APIs",
    },
];

export default function PortfolioPage() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [portfolioDetailsOpen, setPortfolioDetailsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Contact Form State
    const [contactName, setContactName] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [contactMessage, setContactMessage] = useState("");
    const [contactStatus, setContactStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [contactFeedback, setContactFeedback] = useState("");

    const router = useRouter();
    const { toggleChat } = useChatbotStore();
    const { theme } = useTheme();

    const handleContactSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setContactStatus("submitting");
        setContactFeedback("");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: contactName,
                    email: contactEmail,
                    message: contactMessage,
                }),
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                throw new Error(data.error || "Failed to send message. Please try again.");
            }

            setContactStatus("success");
            setContactFeedback(data.message || "Message transmitted successfully! I will get back to you shortly.");
            setContactName("");
            setContactEmail("");
            setContactMessage("");

            setTimeout(() => {
                setContactStatus("idle");
            }, 6000);
        } catch (err: any) {
            setContactStatus("error");
            setContactFeedback(err.message || "Failed to send message. Please try again or write directly.");
        }
    };

    useEffect(() => {
        setMounted(true);
    }, []);

    const logoSrc = mounted && theme === "light" ? "/footer_logo_light.png" : "/footer_logo.png";

    return (

        <main
            className="
                min-h-screen
                overflow-x-hidden
                bg-transparent
                text-foreground
            "
        >
            <CyberGrid />
            {/* THEME TOGGLER & MENU BUTTON */}
            <div
                className="
                    fixed
                    right-6
                    top-6
                    z-50
                    flex
                    items-center
                    gap-6
                "
            >
                <ThemeToggle showToggle={false} />

                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="
                        flex
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/10
                        bg-white/5
                        w-12
                        h-12
                        text-white
                        backdrop-blur-xl
                        transition-all
                        duration-300
                        hover:border-cyan-400/30
                        hover:bg-cyan-500/10
                    "
                >
                    {menuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* FLOATING MENU CARD OVERLAY */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setMenuOpen(false)}
                        className="
                            fixed
                            inset-0
                            z-40
                            flex
                            items-center
                            justify-center
                            p-4
                            bg-black/75
                            backdrop-blur-md
                        "
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 15, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.95, y: 15, opacity: 0 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            onClick={(e) => e.stopPropagation()}
                            className="
                                w-full
                                max-w-[1020px]
                                bg-[#070707]
                                border
                                border-white/10
                                rounded-[32px]
                                p-6
                                md:p-8
                                flex
                                flex-col
                                md:flex-row
                                gap-8
                                relative
                                shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]
                            "
                        >
                            {/* LEFT COLUMN: VISUAL CARDS (PURE NATURE & MOUNTAIN IMAGES) */}
                            <div className="flex-1 flex flex-col gap-6">
                                {/* CARD 1: NATURE LANDSCAPE */}
                                <div className="group rounded-[24px] overflow-hidden relative h-[215px] shadow-lg select-none border border-white/10 bg-black/40">
                                    <Image
                                        src="/about_me_imges/sidebar_images/nature_landscape.jpg"
                                        alt="Cinematic Nature Landscape"
                                        fill
                                        priority
                                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                                    />
                                </div>

                                {/* CARD 2: MOUNTAIN EXPLORATION */}
                                <div className="group rounded-[24px] overflow-hidden relative h-[215px] shadow-lg select-none border border-white/10 bg-black/40">
                                    <Image
                                        src="/about_me_imges/sidebar_images/sidebar_mountain.jpg"
                                        alt="Ranjith Mountain Exploration"
                                        fill
                                        priority
                                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                            </div>

                            {/* RIGHT COLUMN: LINKS LIST */}
                            <div className="w-full md:w-[360px] flex flex-col justify-center gap-2">
                                {[
                                    { label: "Home", action: () => { setMenuOpen(false); router.push("/"); } },
                                    {
                                        label: "About", action: () => {
                                            setMenuOpen(false);
                                            router.push("/about");
                                        }
                                    },
                                    {
                                        label: "Casestudies", action: () => {
                                            setMenuOpen(false);
                                            document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                                        }
                                    },
                                    { label: "Stories", disabled: true },
                                    { label: "Articles", disabled: true },
                                    { label: "After Office Hours", disabled: true, note: "Coming Soon" },
                                    {
                                        label: "Download Resume", action: () => {
                                            setMenuOpen(false);
                                            window.open("#", "_blank", "noopener,noreferrer");
                                        }
                                    },
                                ].map((item, i) => (
                                    <div
                                        key={item.label}
                                        onClick={!item.disabled ? item.action : undefined}
                                        className={`
                                            group
                                            flex
                                            items-center
                                            justify-between
                                            border-b
                                            border-white/5
                                            py-3
                                            ${item.disabled ? "opacity-25 pointer-events-none" : "cursor-pointer"}
                                        `}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="text-lg md:text-xl font-medium text-white group-hover:text-cyan-400 transition-colors duration-300">
                                                {item.label}
                                            </span>
                                            {item.note && (
                                                <span className="text-[8px] text-gray-500 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded">
                                                    {item.note}
                                                </span>
                                            )}
                                        </div>
                                        <ArrowUpRight className="text-gray-500 group-hover:text-cyan-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" size={20} />
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* BACK BUTTON */}
            <div
                className="
                    fixed
                    left-6
                    top-6
                    z-50
                "
            >
                <button
                    onClick={() => router.push("/")}
                    className="
                        flex
                        items-center
                        gap-2
                        rounded-full
                        border
                        border-border
                        bg-card
                        px-5
                        py-3
                        text-sm
                        font-medium
                        text-foreground
                        backdrop-blur-xl
                        theme-transition
                        transition-all
                        duration-300
                        hover:border-cyan-400/30
                        hover:bg-cyan-500/10
                    "
                >
                    <ArrowLeft size={18} />

                    Back
                </button>
            </div>

            {/* HERO SECTION */}
            <section
                className="
                    relative
                    w-full
                    min-h-screen
                    bg-background
                    text-foreground
                    flex
                    flex-col
                    justify-between
                    pt-28
                    pb-16
                    px-6
                    md:px-16
                    overflow-hidden
                    z-10
                    theme-transition
                "
            >
                {/* Background Large Text */}
                <div className="absolute inset-x-0 top-36 flex flex-col items-center justify-center pointer-events-none select-none z-0">
                    <div className="relative flex items-center justify-center pointer-events-auto">
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="text-[14vw] font-phudu font-black uppercase tracking-[0.03em] text-foreground/95 leading-none select-none pointer-events-none"
                        >
                            DEVELOPER
                        </motion.h1>

                        {/* Profile Image beside R in DEVELOPER */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, delay: 0.6 }}
                            className="absolute -right-36 md:-right-52 lg:-right-68 bottom-[-2vw] w-[160px] md:w-[215px] lg:w-[270px] aspect-[4/5] z-10"
                        >
                            <div className="relative w-full h-full">
                                <Image
                                    src="/yezdi_bike_nobg_clean_1785581163832-removebg-preview-finl.png"
                                    alt="Ranjith"
                                    fill
                                    className="object-contain transition-transform duration-700 hover:scale-105"
                                    priority
                                />

                                {/* Background smoke glow behind image */}
                                <div
                                    className="absolute inset-0 -z-10 blur-3xl pointer-events-none scale-150"
                                    style={{
                                        background: theme === "dark"
                                            ? "radial-gradient(circle at center, rgba(255, 255, 255, 0.22), transparent 60%)"
                                            : "radial-gradient(circle at center, rgba(0, 0, 0, 0.15), transparent 70%)"
                                    }}
                                />
                            </div>

                            {/* Smoke below tires/legs: dark smoke in light mode, white shade smoke in dark mode */}
                            <div
                                className="absolute bottom-[16%] left-1/2 -translate-x-1/2 w-[65%] h-5 blur-md rounded-full pointer-events-none"
                                style={{
                                    backgroundColor: theme === "dark" ? "rgba(255, 255, 255, 0.55)" : "rgba(9, 9, 11, 0.6)",
                                    mixBlendMode: theme === "dark" ? "normal" : "multiply" as any
                                }}
                            />
                        </motion.div>
                    </div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 0.6, y: 0 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="mt-6 text-xs md:text-sm lg:text-base font-light italic text-center text-foreground max-w-lg md:max-w-xl leading-relaxed whitespace-pre-line"
                    >
                        One day I'll stop breathing.
                        {"\n"}But somewhere, my code will still be running.
                        {"\n"}Quietly solving someone's problem...
                        {"\n"}with a solution I wrote years ago.
                        {"\n"}That's how developers leave a piece of themselves behind.
                    </motion.p>
                </div>


                {/* Bottom Wrap Grid */}
                <div className="relative w-full grid grid-cols-1 md:grid-cols-10 gap-8 items-end z-20 mt-auto">
                    {/* LEFT COLUMN */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="md:col-span-5 bg-card/75 backdrop-blur-xl border border-border p-6 rounded-[24px] max-w-sm shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] theme-transition"
                    >
                        <h2 className="text-[10px] uppercase tracking-[0.2em] text-foreground/45 font-black mb-2">
                            Hello! I'm Ranjith
                        </h2>
                        <h3 className="text-xl font-black text-foreground leading-[1.25] mb-4">
                            A DIGITAL DESIGNER AND CREATIVE DEVELOPER.
                        </h3>
                        <ul className="space-y-3">
                            <li className="text-xs font-bold flex items-center gap-2 text-foreground/70">
                                <span className="text-cyan-500 text-sm font-black">✦</span> Web Development
                            </li>
                            <li className="text-xs font-bold flex items-center gap-2 text-foreground/70">
                                <span className="text-cyan-500 text-sm font-black">✦</span> AI & Systems Architecture
                            </li>
                        </ul>
                    </motion.div>

                    {/* MIDDLE COLUMN */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="md:col-span-5 flex flex-col items-center justify-center text-center pb-4"
                    >
                        <p className="text-xs font-semibold text-foreground/50 max-w-[240px] mb-5 leading-relaxed">
                            Design, branding and web development made better.
                        </p>
                        <button
                            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                            className="bg-foreground text-background hover:bg-foreground/90 px-8 py-3.5 rounded-full text-[10px] uppercase font-black tracking-widest transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 theme-transition"
                        >
                            view projects
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* ABOUT SECTION */}
            <section
                id="about"
                className="
                    relative
                    z-10
                    mx-auto
                    max-w-7xl
                    px-6
                    py-32
                "
            >
                <div
                    className="
                        grid
                        gap-16
                        lg:grid-cols-2
                    "
                >
                    {/* LEFT */}
                    <motion.div
                        initial={{
                            opacity: 0,
                            x: -40,
                        }}
                        whileInView={{
                            opacity: 1,
                            x: 0,
                        }}
                        transition={{
                            duration: 1,
                        }}
                    >
                        <p
                            className="
                                text-sm
                                uppercase
                                tracking-[0.3em]
                                text-cyan-400
                            "
                        >
                            About Me
                        </p>

                        <h2
                            className="
                                mt-4
                                text-4xl
                                font-black
                                md:text-6xl
                            "
                        >
                            Architecting
                            High-Performance
                            Systems with AI
                            & Precision
                        </h2>
                    </motion.div>

                    {/* RIGHT */}
                    <motion.div
                        initial={{
                            opacity: 0,
                            x: 40,
                        }}
                        whileInView={{
                            opacity: 1,
                            x: 0,
                        }}
                        transition={{
                            duration: 1,
                        }}
                        className="
                            text-lg
                            leading-relaxed
                            text-gray-400
                        "
                    >
                        <p>
                            I specialize in building end-to-end web applications and SaaS products using a modern stack: Next.js, React, Python, FastAPI, and advanced Generative AI workflows (including RAG).
                        </p>

                        <p className="mt-6">
                            My focus is on engineering scalable system architectures that combine robust, data-driven backends with premium, high-performance user interfaces.
                        </p>
                    </motion.div>
                </div>

                {/* ULTRA ATTRACTIVE GLOWING CTA BUTTON */}
                <div className="mt-16 flex justify-center">
                    <motion.button
                        onClick={() => router.push("/about")}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        className="
                            group
                            relative
                            inline-flex
                            items-center
                            justify-center
                            p-[1.5px]
                            rounded-full
                            overflow-hidden
                            shadow-[0_0_30px_rgba(6,145,178,0.25)]
                            hover:shadow-[0_0_50px_rgba(34,211,238,0.55)]
                            transition-all
                            duration-500
                        "
                    >
                        {/* Animated Glowing Gradient Border */}
                        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 via-emerald-400 to-cyan-500 opacity-75 group-hover:opacity-100 animate-pulse group-hover:animate-none transition-opacity duration-500" />
                        
                        {/* Inner Frosted Glass Pill */}
                        <span className="
                            relative
                            flex
                            items-center
                            gap-3.5
                            rounded-full
                            bg-card/90
                            dark:bg-black/85
                            px-8
                            py-4
                            backdrop-blur-2xl
                            transition-all
                            duration-300
                            group-hover:bg-card/75
                            dark:group-hover:bg-black/70
                        ">
                            {/* Glowing Icon Avatar */}
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-black transition-all duration-300 shadow-[0_0_12px_rgba(34,211,238,0.3)]">
                                <Sparkles size={15} />
                            </span>

                            {/* Text */}
                            <span className="text-xs md:text-sm font-black tracking-wider text-foreground group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors uppercase font-mono">
                                Explore My Full Journey & Story
                            </span>

                            {/* Sliding Arrow Pill */}
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground/5 text-foreground/70 group-hover:text-cyan-500 group-hover:bg-cyan-500/15 group-hover:translate-x-1.5 transition-all duration-300">
                                <ArrowRight size={14} />
                            </span>
                        </span>
                    </motion.button>
                </div>

            </section>

            {/* PROJECTS & ARCHITECTURE SECTION */}
            <section
                id="projects"
                className="
                    relative
                    z-10
                    mx-auto
                    max-w-7xl
                    px-6
                    py-24
                "
            >
                {/* SECTION HEADER */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-cyan-500 dark:text-cyan-400 mb-4 backdrop-blur-md shadow-[0_0_15px_rgba(6,145,178,0.15)]">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            Live Engineering & Upcoming Releases
                        </div>

                        <h2 className="text-4xl md:text-6xl font-black tracking-tight text-foreground">
                            PROJECT's
                        </h2>
                    </div>

                    <p className="text-sm text-foreground/60 max-w-md leading-relaxed">
                        Explore the end-to-end architecture powering this portfolio ecosystem, alongside next-generation autonomous systems in development.
                    </p>
                </div>

                {/* 2-COLUMN COMPACT CARDS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* CARD 1: THIS PORTFOLIO (FEATURED FLAGSHIP PROJECT) */}
                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="
                            group
                            relative
                            flex
                            flex-col
                            justify-between
                            rounded-[28px]
                            border
                            border-cyan-500/40
                            dark:border-cyan-400/30
                            bg-card/70
                            p-7
                            backdrop-blur-xl
                            transition-all
                            duration-500
                            shadow-[0_0_35px_rgba(6,145,178,0.12)]
                            dark:shadow-[0_0_40px_rgba(34,211,238,0.1)]
                            hover:-translate-y-1.5
                            hover:border-cyan-400
                        "
                    >
                        <div>
                            {/* Card Top Badge Row */}
                            <div className="flex items-center justify-between mb-5">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                                        <Bot size={22} />
                                    </div>
                                    <div>
                                        <span className="font-mono text-[10px] font-bold tracking-widest text-foreground/40 uppercase">
                                            FLG-01 // PRODUCTION
                                        </span>
                                        <h4 className="text-xs font-bold text-cyan-600 dark:text-cyan-400">
                                            Fullstack AI Ecosystem
                                        </h4>
                                    </div>
                                </div>

                                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    Live
                                </span>
                            </div>

                            {/* Title & Description */}
                            <h3 className="text-xl md:text-2xl font-black text-foreground mb-3 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                                Ranjith.dev Ecosystem
                            </h3>
                            <p className="text-xs md:text-sm text-foreground/70 leading-relaxed mb-6">
                                A production-grade web platform engineered from scratch. Features streaming Google Gemini AI assistant ("Ask Bently"), 3D WebGL physics, and an asynchronous Python FastAPI backend.
                            </p>

                            {/* Mini Telemetry Chips */}
                            <div className="grid grid-cols-3 gap-2 mb-6 p-3 rounded-xl bg-foreground/[0.03] border border-border text-center font-mono text-[10px]">
                                <div>
                                    <span className="block font-bold text-cyan-600 dark:text-cyan-400">100%</span>
                                    <span className="text-foreground/50 text-[9px]">TypeScript</span>
                                </div>
                                <div className="border-x border-border">
                                    <span className="block font-bold text-emerald-600 dark:text-emerald-400">&lt;60ms</span>
                                    <span className="text-foreground/50 text-[9px]">First Token</span>
                                </div>
                                <div>
                                    <span className="block font-bold text-purple-600 dark:text-purple-400">Async</span>
                                    <span className="text-foreground/50 text-[9px]">FastAPI</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            {/* Tech Stack Tags */}
                            <div className="flex flex-wrap gap-1.5 pt-3 mb-5 border-t border-border">
                                {["Next.js 16", "Python FastAPI", "Three.js", "Gemini AI", "SQLAlchemy", "Tailwind CSS"].map((tech, tIdx) => (
                                    <span
                                        key={tIdx}
                                        className="rounded-lg bg-foreground/[0.04] border border-border px-2.5 py-1 text-[10px] font-mono text-foreground/75 font-medium"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            {/* Show More Button (Opens Popup) */}
                            <button
                                onClick={() => setPortfolioDetailsOpen(true)}
                                className="
                                    w-full
                                    flex
                                    items-center
                                    justify-center
                                    gap-2.5
                                    rounded-2xl
                                    bg-cyan-500
                                    hover:bg-cyan-400
                                    text-black
                                    font-bold
                                    text-xs
                                    py-3
                                    px-5
                                    transition-all
                                    duration-300
                                    shadow-[0_0_20px_rgba(34,211,238,0.25)]
                                    hover:shadow-[0_0_30px_rgba(34,211,238,0.45)]
                                    active:scale-95
                                "
                            >
                                <Sparkles size={14} />
                                <span>Show More & Architecture</span>
                                <ArrowUpRight size={15} />
                            </button>
                        </div>
                    </motion.div>

                    {/* CARD 2: SOMETHING BIG IS COOKING (COMING SOON) */}
                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className="
                            group
                            relative
                            flex
                            flex-col
                            justify-between
                            rounded-[28px]
                            border
                            border-amber-500/30
                            dark:border-amber-400/20
                            hover:border-amber-500/50
                            dark:hover:border-amber-400/40
                            bg-card/70
                            p-7
                            backdrop-blur-xl
                            transition-all
                            duration-500
                            shadow-[0_0_35px_rgba(245,158,11,0.08)]
                            dark:shadow-[0_0_40px_rgba(251,191,36,0.06)]
                            hover:-translate-y-1.5
                        "
                    >
                        <div>
                            {/* Card Top Badge Row */}
                            <div className="flex items-center justify-between mb-5">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 dark:text-amber-400 border border-amber-500/30 group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                                        <Flame size={22} className="animate-pulse text-orange-500 dark:text-amber-400" />
                                    </div>
                                    <div>
                                        <span className="font-mono text-[10px] font-bold tracking-widest text-foreground/40 uppercase">
                                            LAB-02 // FORGING
                                        </span>
                                        <h4 className="text-xs font-bold text-amber-600 dark:text-amber-400">
                                            Next-Gen Classified Release
                                        </h4>
                                    </div>
                                </div>

                                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                                    Cooking in Lab
                                </span>
                            </div>

                            {/* Title & Description */}
                            <h3 className="text-xl md:text-2xl font-black text-foreground mb-3 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                                Something Big is Cooking...
                            </h3>
                            <p className="text-xs md:text-sm text-foreground/70 leading-relaxed mb-6">
                                A massive new autonomous system and high-performance distributed architecture is currently in the oven. Heavy benchmarking, low-latency pipelines, and next-level interfaces are being forged.
                            </p>

                            {/* Progress & Status Box */}
                            <div className="mb-6 p-4 rounded-xl bg-foreground/[0.03] border border-border space-y-2">
                                <div className="flex items-center justify-between font-mono text-[11px]">
                                    <span className="text-foreground/60">Forging & Benchmarking Architecture</span>
                                    <span className="font-bold text-amber-600 dark:text-amber-400">96%</span>
                                </div>
                                <div className="h-2 w-full rounded-full bg-foreground/10 overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: "96%" }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.2, delay: 0.3 }}
                                        className="h-full rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 shadow-[0_0_12px_rgba(245,158,11,0.5)]"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            {/* Tech Stack Tags */}
                            <div className="flex flex-wrap gap-1.5 pt-3 mb-5 border-t border-border">
                                {["Autonomous AI Agents", "Distributed Compute", "Ultra-Low Latency", "Next-Gen UI", "Classified"].map((tech, tIdx) => (
                                    <span
                                        key={tIdx}
                                        className="rounded-lg bg-foreground/[0.04] border border-border px-2.5 py-1 text-[10px] font-mono text-foreground/75 font-medium"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            {/* Coming Soon Teaser Button */}
                            <div
                                className="
                                    w-full
                                    flex
                                    items-center
                                    justify-center
                                    gap-2.5
                                    rounded-2xl
                                    border
                                    border-amber-500/30
                                    bg-amber-500/10
                                    text-amber-600
                                    dark:text-amber-400
                                    font-bold
                                    text-xs
                                    py-3
                                    px-5
                                    font-mono
                                    tracking-wider
                                    uppercase
                                    cursor-default
                                    shadow-[0_0_15px_rgba(245,158,11,0.1)]
                                "
                            >
                                <Clock size={14} className="animate-spin text-amber-500" style={{ animationDuration: "6s" }} />
                                <span>Something Big Coming Soon</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>


            {/* HOBBIES & BEYOND CODING SECTION */}
            <section
                className="
                    relative
                    z-10
                    mx-auto
                    max-w-7xl
                    px-6
                    py-28
                "
            >
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-cyan-500 dark:text-cyan-400 mb-4 backdrop-blur-md shadow-[0_0_15px_rgba(6,145,178,0.15)]">
                            <Sparkles size={13} />
                            Hobbies, Passions & Mindset
                        </div>

                        <h2 className="text-4xl md:text-6xl font-black tracking-tight text-foreground">
                            Beyond Coding
                        </h2>
                    </div>

                    <p className="text-sm text-foreground/60 max-w-md leading-relaxed">
                        What drives the human behind the terminal: physical iron discipline, global exploration, bending AI systems, and conquering frontier tech.
                    </p>
                </div>

                {/* 4 Rich Dynamic Passion Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {beyondCodingItems.map((item, idx) => {
                        const IconComponent = item.icon;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className={`
                                    group
                                    relative
                                    flex
                                    flex-col
                                    justify-between
                                    rounded-[28px]
                                    border
                                    border-border
                                    ${item.borderColor}
                                    bg-card/60
                                    p-6
                                    backdrop-blur-xl
                                    transition-all
                                    duration-500
                                    ${item.glowColor}
                                    hover:-translate-y-2
                                `}
                            >
                                <div>
                                    {/* Top Icon & Badge */}
                                    <div className="flex items-center justify-between mb-5">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-foreground/[0.04] border border-border group-hover:scale-110 transition-transform shadow-sm">
                                            <IconComponent size={24} className="text-foreground group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors" />
                                        </div>
                                        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider ${item.badgeColor}`}>
                                            {item.tag}
                                        </span>
                                    </div>

                                    {/* Title & Description */}
                                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-xs text-foreground/70 leading-relaxed mb-6">
                                        {item.description}
                                    </p>
                                </div>

                                {/* Metric Chip */}
                                <div className="pt-3 border-t border-border/70 flex items-center justify-between text-[11px] font-mono text-foreground/60">
                                    <span className="font-semibold text-foreground/80">{item.metric}</span>
                                    <span className="text-foreground/30">#0{idx + 1}</span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>



            {/* CONTACT & FOOTER SECTION */}
            <section className="relative z-10 w-full bg-background text-foreground border-t border-border pt-20 pb-12 px-6 md:px-12 lg:px-24 theme-transition">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start pb-16 border-b border-border">
                    {/* Left Column */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xl md:text-3xl font-black text-lime-600 dark:text-[#d4ff00] leading-none tracking-tight">
                                ranjith@gmail.com
                            </h3>
                        </div>

                        {/* Developer Card */}
                        <div className="bg-card/70 border border-border p-6 rounded-3xl flex flex-col sm:flex-row gap-6 items-center max-w-md shadow-xl theme-transition">
                            <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-background shrink-0">
                                <Image
                                    src="/about_me_imges/bg_removed/IMG_5489-removebg-preview.png"
                                    alt="Ranjith"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="space-y-3 w-full text-center sm:text-left">
                                <div>
                                    <h4 className="text-sm font-black uppercase tracking-wider text-foreground">RANJITH</h4>
                                    <p className="text-xs text-foreground/50">Full Stack Architect & Creative Developer</p>
                                </div>
                                <div className="flex gap-2 justify-center sm:justify-start">
                                    {[
                                        { Icon: Globe, href: "#" },
                                        { Icon: Github, href: "#" },
                                        { Icon: Linkedin, href: "#" }
                                    ].map(({ Icon, href }, i) => (
                                        <a key={i} href={href} className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-all duration-300">
                                            <Icon size={14} />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Interactive Fullstack Contact Form) */}
                    <form onSubmit={handleContactSubmit} className="w-full space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-foreground/50 font-bold block">First Name</label>
                                <input
                                    type="text"
                                    required
                                    value={contactName}
                                    onChange={(e) => setContactName(e.target.value)}
                                    disabled={contactStatus === "submitting"}
                                    placeholder="Enter your name"
                                    className="w-full bg-transparent border-b border-border focus:border-lime-500 dark:focus:border-[#d4ff00] py-3 text-sm focus:outline-none transition-colors duration-300 placeholder-foreground/20 text-foreground disabled:opacity-50"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-foreground/50 font-bold block">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={contactEmail}
                                    onChange={(e) => setContactEmail(e.target.value)}
                                    disabled={contactStatus === "submitting"}
                                    placeholder="Enter your email"
                                    className="w-full bg-transparent border-b border-border focus:border-lime-500 dark:focus:border-[#d4ff00] py-3 text-sm focus:outline-none transition-colors duration-300 placeholder-foreground/20 text-foreground disabled:opacity-50"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-foreground/50 font-bold block">Message</label>
                            <textarea
                                required
                                rows={4}
                                value={contactMessage}
                                onChange={(e) => setContactMessage(e.target.value)}
                                disabled={contactStatus === "submitting"}
                                placeholder="Enter your message..."
                                className="w-full bg-transparent border-b border-border focus:border-lime-500 dark:focus:border-[#d4ff00] py-3 text-sm focus:outline-none transition-colors duration-300 placeholder-foreground/20 text-foreground resize-none disabled:opacity-50"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={contactStatus === "submitting"}
                            className="
                                w-full
                                flex
                                items-center
                                justify-center
                                gap-2.5
                                bg-lime-500
                                hover:bg-lime-600
                                dark:bg-[#d4ff00]
                                dark:hover:bg-[#c9f200]
                                text-white
                                dark:text-black
                                font-black
                                uppercase
                                text-xs
                                tracking-widest
                                py-4
                                rounded-xl
                                transition-all
                                duration-300
                                shadow-lg
                                hover:scale-[1.01]
                                active:scale-95
                                disabled:opacity-60
                                disabled:cursor-not-allowed
                            "
                        >
                            {contactStatus === "submitting" ? (
                                <>
                                    <Loader2 size={15} className="animate-spin" />
                                    <span>Transmitting Message...</span>
                                </>
                            ) : contactStatus === "success" ? (
                                <>
                                    <CheckCircle2 size={15} className="text-emerald-900 dark:text-emerald-950" />
                                    <span>Message Transmitted!</span>
                                </>
                            ) : (
                                <>
                                    <Send size={14} />
                                    <span>Submit Message</span>
                                </>
                            )}
                        </button>

                        {/* Success Feedback Banner */}
                        {contactStatus === "success" && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono flex items-center gap-2.5 shadow-sm"
                            >
                                <CheckCircle2 size={16} className="shrink-0 text-emerald-500" />
                                <span>{contactFeedback}</span>
                            </motion.div>
                        )}

                        {/* Error Feedback Banner */}
                        {contactStatus === "error" && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-mono flex items-center justify-between gap-2 shadow-sm"
                            >
                                <span>{contactFeedback}</span>
                                <a
                                    href={`mailto:ranjith@gmail.com?subject=${encodeURIComponent(`Inquiry from ${contactName || "Visitor"}`)}&body=${encodeURIComponent(contactMessage)}`}
                                    className="underline font-bold text-rose-500"
                                >
                                    Email directly
                                </a>
                            </motion.div>
                        )}
                    </form>
                </div>

                {/* Footer Bottom Bar */}
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 pt-12 text-xs text-foreground/45">
                    <div className="space-y-2 text-center md:text-left">
                        <h5 className="font-bold uppercase tracking-wider text-foreground">Quick Links</h5>
                        <p className="space-x-4">
                            {["Home", "About Me", "Portfolio", "Service", "Contact"].map((link, i) => (
                                <a key={i} href="#" className="hover:text-foreground transition-colors duration-200">{link}</a>
                            ))}
                        </p>
                    </div>

                    {/* Scroll to top button */}
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="w-12 h-12 bg-orange-600 hover:bg-orange-500 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 shadow-lg active:scale-95"
                    >
                        <ArrowUp size={20} />
                    </button>

                    <div className="flex flex-col items-center md:items-end space-y-2">
                        <Image
                            src={logoSrc}
                            alt="Ranjith Portfolio Logo"
                            width={160}
                            height={50}
                            className="object-contain"
                        />
                        <p>© {new Date().getFullYear()} Ranjith. All rights reserved.</p>
                    </div>
                </div>
            </section>

            {/* Giant Name Header */}
            <div className="w-full text-center select-none overflow-hidden pb-8 mt-16 pointer-events-none">
                <h2 className="text-[18vw] font-phudu font-black uppercase text-foreground leading-none tracking-[0.03em]">
                    RANJI
                </h2>
            </div>

            {/* ========================================================================= */}
            {/* POPUP MODAL: FULL PORTFOLIO ARCHITECTURE DEEP-DIVE (ROOT LEVEL OVERLAY)   */}
            {/* ========================================================================= */}
            <AnimatePresence>
                {portfolioDetailsOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setPortfolioDetailsOpen(false)}
                            className="absolute inset-0 bg-black/85 backdrop-blur-xl"
                        />

                        {/* Modal Content Box */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.93, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.93, y: 30 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            data-lenis-prevent="true"
                            className="
                                relative
                                z-10
                                w-full
                                max-w-4xl
                                h-[85vh]
                                max-h-[780px]
                                flex
                                flex-col
                                rounded-[32px]
                                border
                                border-cyan-500/40
                                dark:border-cyan-400/30
                                bg-card
                                text-foreground
                                shadow-[0_0_80px_rgba(6,145,178,0.35)]
                                backdrop-blur-2xl
                                overflow-hidden
                            "
                        >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between border-b border-border p-6 shrink-0 bg-cyan-950/20">
                                <div className="flex items-center gap-3">
                                    <span className="flex h-2.5 w-2.5 relative">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                                    </span>
                                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                                        LIVE PRODUCTION ARCHITECTURE · CASE STUDY
                                    </span>
                                </div>
                                <button
                                    onClick={() => setPortfolioDetailsOpen(false)}
                                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-foreground/5 hover:bg-foreground/10 text-foreground/70 hover:text-foreground transition-all"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Modal Scrollable Body */}
                            <div 
                                data-lenis-prevent="true"
                                className="
                                    flex-1
                                    min-h-0
                                    overflow-y-auto
                                    overscroll-contain
                                    touch-pan-y
                                    p-6
                                    md:p-8
                                    space-y-8
                                    [scrollbar-width:thin]
                                    [scrollbar-color:rgba(34,211,238,0.25)_transparent]
                                "
                            >
                                <div>
                                    <h3 className="text-2xl md:text-3xl font-black text-foreground mb-2">
                                        Ranjith.dev — Fullstack AI Web Ecosystem
                                    </h3>
                                    <p className="text-xs md:text-sm text-foreground/70 leading-relaxed">
                                        A production-grade fullstack web application engineered from scratch. Features real-time streaming Generative AI, GPU-accelerated 3D WebGL physics, Lenis inertial motion systems, and an asynchronous Python FastAPI backend with async database telemetry.
                                    </p>
                                </div>

                                {/* Telemetry Metrics Bar */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-foreground/[0.02] border border-border text-center">
                                    <div className="p-2">
                                        <span className="block text-xl font-black text-cyan-600 dark:text-cyan-400 font-mono">100%</span>
                                        <span className="text-[10px] uppercase font-bold tracking-wider text-foreground/50">TypeScript Safety</span>
                                    </div>
                                    <div className="p-2 border-l border-border">
                                        <span className="block text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono">&lt; 60ms</span>
                                        <span className="text-[10px] uppercase font-bold tracking-wider text-foreground/50">AI First Token</span>
                                    </div>
                                    <div className="p-2 border-l border-border">
                                        <span className="block text-xl font-black text-cyan-600 dark:text-cyan-400 font-mono">60+ FPS</span>
                                        <span className="text-[10px] uppercase font-bold tracking-wider text-foreground/50">3D WebGL Canvas</span>
                                    </div>
                                    <div className="p-2 border-l border-border">
                                        <span className="block text-xl font-black text-purple-600 dark:text-purple-400 font-mono">Async</span>
                                        <span className="text-[10px] uppercase font-bold tracking-wider text-foreground/50">FastAPI Engine</span>
                                    </div>
                                </div>

                                {/* Detailed 4 Feature Cards */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {portfolioFeatures.map((feat, fIdx) => {
                                        const FeatIcon = feat.icon;
                                        return (
                                            <div
                                                key={fIdx}
                                                className="rounded-2xl border border-border bg-card/40 p-5 backdrop-blur-md"
                                            >
                                                <div className="flex items-center gap-3 mb-2.5">
                                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                                                        <FeatIcon size={18} />
                                                    </div>
                                                    <div>
                                                        <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
                                                            {feat.tag}
                                                        </span>
                                                        <h4 className="text-xs font-bold text-foreground">
                                                            {feat.title}
                                                        </h4>
                                                    </div>
                                                </div>

                                                <p className="text-xs text-foreground/70 leading-relaxed mb-3">
                                                    {feat.description}
                                                </p>

                                                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/60">
                                                    {feat.tech.map((t, tIdx) => (
                                                        <span
                                                            key={tIdx}
                                                            className="rounded-md bg-foreground/[0.04] border border-border px-2 py-0.5 font-mono text-[9px] text-foreground/80 font-medium"
                                                        >
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-border p-5 shrink-0 bg-cyan-950/20">
                                <p className="text-xs text-foreground/60 text-center sm:text-left">
                                    Interactive fullstack architecture running live.
                                </p>
                                <div className="flex items-center gap-3 w-full sm:w-auto">
                                    <button
                                        onClick={() => {
                                            setPortfolioDetailsOpen(false);
                                            toggleChat();
                                        }}
                                        className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs px-5 py-2.5 transition-all shadow-[0_0_15px_rgba(34,211,238,0.3)] active:scale-95"
                                    >
                                        <Bot size={14} />
                                        <span>Ask AI Assistant</span>
                                    </button>
                                    <a
                                        href="https://github.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border bg-card/50 hover:bg-card text-foreground text-xs font-semibold px-4 py-2.5 transition-all hover:border-cyan-500/40"
                                    >
                                        <Github size={14} />
                                        <span>GitHub</span>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <AIChatbot />
        </main>
    );
}