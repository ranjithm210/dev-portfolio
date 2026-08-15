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



const projects = [
    {
        title: "Aether AI Platform",
        subtitle: "Neural Networks & LLMs",
        description: "A decentralized machine learning agent framework orchestrating autonomous AI workers for complex data analysis workflows.",
        items: [
            { icon: Cpu, title: "LLM Orchestration", value: "Active Agents" },
            { icon: Terminal, title: "Query Latency", value: "85ms Avg" },
            { icon: Database, title: "Data Ingestion", value: "4.8 TB/day" },
        ],
    },
    {
        title: "Specter DeFi Hub",
        subtitle: "Blockchain Protocols",
        description: "A secure multichain yield aggregator leveraging automated smart contracts for real-time portfolio optimization and liquidity mining.",
        items: [
            { icon: Shield, title: "Audited Smart Contract", value: "100% Secure" },
            { icon: Zap, title: "Gas Efficiency", value: "Save 42%" },
            { icon: Globe, title: "Connected Networks", value: "14 Chains" },
        ],
    },
    {
        title: "Neon Sentinel",
        subtitle: "Threat Intelligence & Cyber Defense",
        description: "An advanced cloud monitoring dashboard streaming real-time security anomalies and automated attack mitigation triggers.",
        items: [
            { icon: Shield, title: "IDS Engine", value: "Active Monitoring" },
            { icon: Code, title: "Alert Response Time", value: "< 2 Seconds" },
            { icon: Database, title: "Log Index Rate", value: "250k events/s" },
        ],
    },
];

export default function PortfolioPage() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    const router = useRouter();
    const { toggleChat } = useChatbotStore();
    const { theme } = useTheme();

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
                            {/* LEFT COLUMN: VISUAL CARDS */}
                            <div className="flex-1 flex flex-col gap-6">
                                {/* NIKE COLLABORATION CARD */}
                                <div className="bg-white text-black rounded-[24px] p-6 relative overflow-hidden flex flex-col justify-between h-[215px] shadow-lg select-none">
                                    <div>
                                        <svg className="w-12 h-6" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M21 6.5c-2.3 1.8-6.1 4.5-9.3 6.3-2.6 1.5-5 2.5-7.2 2.9-1.2.2-2.1.1-2.5-.2-.3-.2-.3-.6 0-1.1.5-1 1.7-2.6 3.6-4.6 2-2.1 4.5-4.4 7.2-6.4 1.1-.8 2.2-1.5 3.3-2.1.3-.2.6-.2.8 0 .1.1.1.3 0 .5-1.1 1.7-2.6 3.8-4.2 5.9-1.3 1.7-2.6 3.4-3.7 4.9.9-.4 2.1-1.1 3.5-2 3.1-1.9 6.8-4.4 9.1-6.1.4-.3.8-.4.9-.2.2.2 0 .6-.3.8z" />
                                        </svg>
                                    </div>

                                    <div className="absolute -right-4 top-2 w-[240px] h-[160px] pointer-events-none">
                                        <Image
                                            src="/nike_shoe.png"
                                            alt="Nike Sneaker Collaboration"
                                            fill
                                            priority
                                            draggable={false}
                                            className="object-contain rotate-[-15deg]"
                                        />
                                    </div>

                                    <h4 className="text-xl md:text-2xl font-black tracking-tight text-black max-w-[200px] leading-tight">
                                        Collaborated on www.nike.in
                                    </h4>
                                </div>

                                {/* MEDIUM LOGO CARD */}
                                <div className="bg-gradient-to-br from-[#c83e1c] to-[#601c0c] text-white rounded-[24px] p-6 relative overflow-hidden flex flex-col justify-between h-[215px] shadow-lg select-none">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.78 12.86c-.08.43-.37.79-.78.96l-3.3 1.32a1.2 1.2 0 01-.84 0l-3.3-1.32a1.2 1.2 0 01-.78-.96V9.14c0-.43.29-.79.78-.96l3.3-1.32c.27-.11.57-.11.84 0l3.3 1.32c.49.17.78.53.78.96v5.72z" />
                                            </svg>
                                            <span className="font-serif font-black text-lg tracking-tight">Medium</span>
                                        </div>
                                        <span className="text-[10px] text-white/50 font-mono tracking-widest uppercase">@ranjith01</span>
                                    </div>

                                    <div className="space-y-1">
                                        <h4 className="text-lg md:text-xl font-bold tracking-tight leading-snug">
                                            I Taught Myself Everything. This Is Where It Started.
                                        </h4>
                                        <p className="text-xs text-white/70 font-light">
                                            I always wanted to be an archaeologist.
                                        </p>
                                    </div>
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

                <div className="mt-12 text-center">
                    <motion.button
                        onClick={() => router.push("/about")}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-white/10
                            bg-white/5
                            px-6
                            py-3
                            text-sm
                            font-medium
                            text-zinc-500 dark:text-zinc-400
                            backdrop-blur-xl
                            transition-all
                            duration-300
                            hover:border-zinc-500/30
                            hover:bg-zinc-500/10
                        "
                    >
                        View More About Me
                    </motion.button>
                </div>

            </section>

            {/* PROJECTS SECTION */}
            <section
                id="projects"
                className="
                    relative
                    z-10
                    mx-auto
                    max-w-7xl
                    px-6
                    py-20
                "
            >
                <div className="mb-16">
                    <p
                        className="
                            text-sm
                            uppercase
                            tracking-[0.3em]
                            text-zinc-500 dark:text-zinc-400
                        "
                    >
                        Portfolio Showcase
                    </p>

                    <h2
                        className="
                            mt-4
                            text-4xl
                            font-black
                            md:text-6xl
                        "
                    >
                        Featured Cyber Projects
                    </h2>
                </div>

                <div
                    className="
                        grid
                        grid-cols-1
                        gap-8
                        md:grid-cols-2
                        lg:grid-cols-3
                    "
                >
                    {projects.map((project, index) => (
                        <CyberPanel
                            key={index}
                            title={project.title}
                            subtitle={project.subtitle}
                            description={project.description}
                            items={project.items}
                        />
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-white/10
                            bg-white/5
                            px-6
                            py-3
                            text-sm
                            font-medium
                            text-zinc-500 dark:text-zinc-400
                            backdrop-blur-xl
                            transition-all
                            duration-300
                            hover:border-zinc-500/30
                            hover:bg-zinc-500/10
                        "
                    >
                        View More Projects
                    </motion.button>
                </div>
            </section>


            {/* HOBBIES SECTION */}
            <section
                className="
                    relative
                    z-10
                    mx-auto
                    max-w-7xl
                    px-6
                    py-32
                "
            >
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 40,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 1,
                    }}
                    className="
                        rounded-[40px]
                        border
                        border-white/10
                        bg-white/5
                        p-12
                        backdrop-blur-2xl
                    "
                >
                    <p
                        className="
                            text-sm
                            uppercase
                            tracking-[0.3em]
                            text-cyan-400
                        "
                    >
                        Hobbies & Passion
                    </p>

                    <h2
                        className="
                            mt-4
                            text-4xl
                            font-black
                            md:text-6xl
                        "
                    >
                        Beyond Coding
                    </h2>

                    <div
                        className="
                            mt-12
                            grid
                            gap-6
                            md:grid-cols-2
                            lg:grid-cols-4
                        "
                    >
                        {[
                            "AI Exploration",
                            "Cinematic UI Design",
                            "Futuristic Interfaces",
                            "Creative Storytelling",
                        ].map((item) => (
                            <div
                                key={item}
                                className="
                                    rounded-3xl
                                    border
                                    border-cyan-400/20
                                    bg-black/40
                                    p-8
                                    text-center
                                    text-lg
                                    font-semibold
                                    text-white
                                "
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </section>



            {/* CONTACT & FOOTER SECTION */}
            <section className="relative z-10 w-full bg-background text-foreground border-t border-border pt-20 pb-12 px-6 md:px-12 lg:px-24 theme-transition">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start pb-16 border-b border-border">
                    {/* Left Column */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xl md:text-3xl font-black text-lime-600 dark:text-[#d4ff00] leading-none tracking-tight">
                                ranjith@gmail.com <span className="text-foreground/30 font-light">//</span> +91 98765 43210
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

                    {/* Right Column (Form) */}
                    <div className="w-full space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-foreground/50 font-bold block">First Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    className="w-full bg-transparent border-b border-border focus:border-lime-500 dark:focus:border-[#d4ff00] py-3 text-sm focus:outline-none transition-colors duration-300 placeholder-foreground/20 text-foreground"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-foreground/50 font-bold block">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full bg-transparent border-b border-border focus:border-lime-500 dark:focus:border-[#d4ff00] py-3 text-sm focus:outline-none transition-colors duration-300 placeholder-foreground/20 text-foreground"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-foreground/50 font-bold block">Message</label>
                            <textarea
                                placeholder="Enter your message"
                                rows={4}
                                className="w-full bg-transparent border-b border-border focus:border-lime-500 dark:focus:border-[#d4ff00] py-3 text-sm focus:outline-none transition-colors duration-300 placeholder-foreground/20 text-foreground resize-none"
                            />
                        </div>
                        <button className="w-full bg-lime-500 hover:bg-lime-600 dark:bg-[#d4ff00] dark:hover:bg-[#c9f200] text-white dark:text-black font-black uppercase text-xs tracking-widest py-4 rounded-xl transition-all duration-300 shadow-lg hover:scale-[1.01] active:scale-95">
                            submit message
                        </button>
                    </div>
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

            <AIChatbot />
        </main>
    );
}