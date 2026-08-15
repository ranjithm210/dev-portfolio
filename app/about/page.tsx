"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Github, Instagram, Linkedin, Star, Twitter } from "lucide-react";
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

    useEffect(() => {
        setMounted(true);
    }, []);

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

            {/* TESTIMONIALS SECTION */}
            <section className="relative z-10 max-w-[1650px] mx-auto px-8 md:px-20 lg:px-28 py-20 border-t border-zinc-200 dark:border-white/5">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight leading-snug mb-12 max-w-xl">
                    Hear it from the people who totally didn't get paid to say this.
                </h3>

                <div className="grid gap-10 md:grid-cols-2">
                    {/* TESTIMONIAL 1 */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Star className="text-foreground fill-foreground" size={16} />
                            <span className="font-semibold text-sm text-foreground">Product sense</span>
                        </div>
                        <p className="text-base md:text-lg text-zinc-600 dark:text-gray-400 leading-relaxed font-light">
                            "Ranjith is one of the most talented engineers I've worked with. He has a superb product sense and clarity of thought in terms of design. I've worked with him on multiple projects and can surely vouch for his skills in terms of UI and UX."
                        </p>
                        <div className="flex items-center gap-3 pt-2">
                            <div className="h-8 w-8 rounded-full bg-cyan-500/20 border border-cyan-400/20 flex items-center justify-center text-[10px] font-bold text-cyan-400">
                                MJ
                            </div>
                            <div>
                                <h5 className="text-xs font-semibold text-foreground">Mahek Jain</h5>
                                <p className="text-[10px] text-gray-500">Product Manager</p>
                            </div>
                        </div>
                    </div>

                    {/* TESTIMONIAL 2 */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Star className="text-foreground fill-foreground" size={16} />
                            <span className="font-semibold text-sm text-foreground">On time</span>
                        </div>
                        <p className="text-base md:text-lg text-zinc-600 dark:text-gray-400 leading-relaxed font-light">
                            "We hired Ranjith for the full UI/UX and frontend engineering of our travel platform. He did a great job, and really put his mark on our brand. He is fun to work with, always communicates clearly, and delivers what he promises on time."
                        </p>
                        <div className="flex items-center gap-3 pt-2">
                            <div className="h-8 w-8 rounded-full bg-purple-500/20 border border-purple-400/20 flex items-center justify-center text-[10px] font-bold text-purple-400">
                                JV
                            </div>
                            <div>
                                <h5 className="text-xs font-semibold text-foreground">Joris Vanherp</h5>
                                <p className="text-[10px] text-gray-500">Co-Founder, LiveTheWorld</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* MY PERSPECTIVE / GALLERY SECTION */}
            <section className="relative z-10 max-w-[1650px] mx-auto px-8 md:px-20 lg:px-28 py-20 border-t border-zinc-200 dark:border-white/5">
                <h3 className="text-2xl font-bold text-foreground tracking-tight mb-8">My perspective</h3>

                <div className="bg-card p-5 rounded-[32px] overflow-hidden">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {[
                            { src: "/about_me_imges/perspective/yezdi_me.png", alt: "Yezdi motorcycle" },
                            { src: "/about_me_imges/perspective/IMG_6190.jpg", alt: "Memory Snapshot 1" },
                            { src: "/about_me_imges/perspective/IMG_7295.jpg", alt: "Memory Snapshot 2" },
                            { src: "/about_me_imges/perspective/perspective_coding.png", alt: "Coding flatlay" },
                            { src: "/about_me_imges/perspective/perspective_travel.png", alt: "Sunset travel" },
                            { src: "/about_me_imges/perspective/IMG_5489.jpg", alt: "Yezdi motorcycle" },
                        ].map((img, idx) => (
                            <div key={idx} className="group relative aspect-square rounded-2xl overflow-hidden border border-zinc-200/50 dark:border-white/5 bg-zinc-200/50 dark:bg-white/5 touch-pan-y select-none">
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    draggable={false}
                                    className="object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>



            {/* INSTAGRAM BADGE & FOOTER SIGNATURE */}
            <footer className="relative z-10 max-w-[1650px] mx-auto px-8 md:px-20 lg:px-28 pt-12 pb-24 border-t border-zinc-200 dark:border-white/5 flex flex-col items-center justify-center text-center space-y-8">

                <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500 font-medium">Follow me on</span>
                    <a
                        href="https://instagram.com"
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
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-foreground transition-colors"><Linkedin size={18} /></a>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-foreground transition-colors"><Github size={18} /></a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-foreground transition-colors"><Twitter size={18} /></a>
                    </div>
                </div>

                <p className="text-[10px] text-gray-600 font-mono pt-4">
                    From concept to creation, let's make.
                </p>
            </footer>
        </main>
    );
}
