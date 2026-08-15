"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import Navbar from "@/components/layout/Navbar";
import Spotlight from "@/components/animations/Spotlight";
import { useRouter } from "next/navigation";
import { useChatbotStore } from "@/store/chatbotStore";
import AIChatbot from "@/components/common/AIChatbot";
import { Bot, Plus } from "lucide-react";
import CyberGrid from "@/components/hero/CyberGrid";
import Footer from "@/components/layout/Footer";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";

const Particles = dynamic(
    () => import("@/components/animations/Particles"),
    {
        ssr: false,
    }
);

// Stat Counter component using our custom scroll-triggered hook
function StatCounter({ label, to, suffix = "" }: { label: string; to: number; suffix?: string }) {
    const { count, ref } = useAnimatedCounter(to, 2.5);
    return (
        <div 
            ref={ref} 
            className="
                bg-card/40 
                border 
                border-border 
                p-5 
                rounded-2xl 
                backdrop-blur-md 
                theme-transition 
                shadow-[0_0_20px_rgba(6,145,178,0.02)]
                dark:shadow-[0_0_25px_rgba(34,211,238,0.05)]
                flex 
                flex-col 
                items-center 
                justify-center 
                text-center
                w-full
                max-w-[240px]
                mx-auto
            "
        >
            <h4 className="text-4xl md:text-5xl font-black text-cyan-600 dark:text-cyan-400 font-sans leading-none mb-2 select-none">
                {count}{suffix}
            </h4>
            <p className="text-xs uppercase tracking-wider text-foreground/75 font-semibold">
                {label}
            </p>
        </div>
    );
}

export default function Home() {
    const router = useRouter();
    const { toggleChat } = useChatbotStore();

    // Framer Motion staggered list presets
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                type: "spring",
                stiffness: 60,
                damping: 15
            }
        }
    } as const;

    const bulletItems = [
        "Web Applications",
        "Generative AI Integration",
        "Backend Infrastructure",
        "UI/UX Motion Systems",
        "Database Engineering"
    ];

    return (
        <>
            <Navbar />

            <CyberGrid />

            <Spotlight />

            {/* Giant Background Word */}
            <div className="absolute top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2 -z-20 text-[12vw] font-black text-foreground/[0.02] dark:text-foreground/[0.015] uppercase select-none tracking-[0.15em] font-sans">
                ARCHITECT
            </div>

            <main
                className="
                    relative
                    flex-grow
                    min-h-[calc(100vh-180px)]
                    overflow-hidden
                    bg-transparent
                    text-foreground
                    flex
                    items-center
                    justify-center
                    py-28
                    px-6
                "
            >
                {/* Background Glows */}
                <div
                    className="
                        absolute
                        top-[-200px]
                        left-[-200px]
                        h-[500px]
                        w-[500px]
                        rounded-full
                        bg-cyan-500/10
                        blur-3xl
                        pointer-events-none
                    "
                />

                <div
                    className="
                        absolute
                        bottom-[-200px]
                        right-[-200px]
                        h-[500px]
                        w-[500px]
                        rounded-full
                        bg-purple-500/10
                        blur-3xl
                        pointer-events-none
                    "
                />

                {/* Particles */}
                <Particles />

                {/* Main Three-Column Grid */}
                <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                    
                    {/* LEFT COLUMN: GREETINGS & CAPABILITIES (AOS FADE-UP STYLE) */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={containerVariants}
                        className="lg:col-span-3 space-y-6 text-center lg:text-left order-2 lg:order-1"
                    >
                        <motion.h2 
                            variants={itemVariants}
                            className="text-2xl md:text-3xl font-bold tracking-tight text-foreground/90"
                        >
                            Hello! I'm Ranjith
                        </motion.h2>
                        
                        <motion.p 
                            variants={itemVariants}
                            className="text-sm text-foreground/60 leading-relaxed max-w-xs mx-auto lg:mx-0"
                        >
                            A digital builder and full-stack software architect crafting fast web systems.
                        </motion.p>

                        <motion.div 
                            variants={itemVariants}
                            className="pt-2"
                        >
                            <ul className="space-y-3 d-inline-block text-left">
                                {bulletItems.map((item, idx) => (
                                    <li 
                                        key={idx}
                                        className="text-sm font-medium flex items-center gap-2 text-foreground/80 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                                    >
                                        <Plus size={14} className="text-cyan-500" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </motion.div>

                    {/* CENTER COLUMN: MAIN STATEMENT & ACTION (AOS FADE-UP STYLE) */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="lg:col-span-6 lg:col-start-4 text-center space-y-6 order-1 lg:order-2"
                    >
                        {/* Visual element placeholder: Glassmorphic pulse ring */}
                        <div className="flex justify-center mb-2">
                            <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-500 shadow-[0_0_15px_rgba(6,145,178,0.1)]">
                                <Bot size={24} className="animate-pulse" />
                            </div>
                        </div>

                        <h1
                            className="
                                text-4xl
                                md:text-5xl
                                font-black
                                leading-tight
                                tracking-tight
                            "
                        >
                            Let's Build Something{" "}
                            <span
                                className="
                                    bg-gradient-to-r
                                    from-cyan-500
                                    via-blue-500
                                    to-purple-500
                                    bg-clip-text
                                    text-transparent
                                "
                            >
                                AMAZING
                            </span>
                        </h1>

                        <p
                            className="
                                text-sm
                                md:text-base
                                text-gray-400
                                max-w-lg
                                mx-auto
                            "
                        >
                            Just Explain your Idea & I'll Build It For You!!!
                        </p>

                        <motion.button
                            onClick={() => router.push("/portfolio")}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="
                                group
                                inline-flex
                                items-center
                                gap-3
                                rounded-full
                                border
                                border-cyan-500/30
                                dark:border-cyan-400/30
                                bg-cyan-500/5
                                dark:bg-cyan-500/10
                                px-6
                                py-3
                                text-base
                                font-semibold
                                backdrop-blur-xl
                                transition-all
                                duration-300
                                hover:border-cyan-500
                                dark:hover:border-cyan-400
                                hover:bg-cyan-500/10
                                dark:hover:bg-cyan-500/20
                                hover:shadow-[0_0_25px_rgba(6,145,178,0.2)]
                                dark:hover:shadow-[0_0_40px_rgba(34,211,238,0.4)]
                                cursor-pointer
                            "
                        >
                            Need to Explore Deeply?

                            <FaArrowRight
                                className="
                                    transition-transform
                                    duration-300
                                    group-hover:translate-x-1
                                "
                            />
                        </motion.button>
                    </motion.div>



                </div>
            </main>



            <Footer />

            <AIChatbot />
        </>
    );
}
