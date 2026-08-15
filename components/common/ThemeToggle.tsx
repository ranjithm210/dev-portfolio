"use client";

import { useTheme } from "@/providers/ThemeProvider";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

interface ThemeToggleProps {
    showToggle?: boolean;
}

export default function ThemeToggle({ showToggle = true }: ThemeToggleProps) {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="flex items-center gap-4">
            {/* Hanging Lightbulb Switch */}
            <div
                className="relative w-8 h-10 flex justify-center items-center overflow-visible"
                title="Toggle Theme"
            >
                {/* Multi-layered Atmospheric Glow (Visible in Dark Mode only) */}
                {theme === "dark" && (
                    <>
                        {/* Core Bright Glow */}
                        <div className="absolute top-[68px] w-14 h-14 rounded-full bg-yellow-300/40 blur-md pointer-events-none" />
                        {/* Warm Orange Atmosphere Halo */}
                        <div className="absolute top-[58px] w-24 h-24 rounded-full bg-orange-500/25 blur-xl pointer-events-none" />
                        {/* Outer Warm Ambient Glow */}
                        <div className="absolute top-[48px] w-36 h-36 rounded-full bg-amber-500/10 blur-2xl pointer-events-none" />
                        {/* Spotlight Cone */}
                        <div 
                            className="
                                absolute 
                                top-[84px] 
                                w-32 
                                h-40 
                                bg-gradient-to-b 
                                from-yellow-300/10 
                                to-transparent 
                                pointer-events-none 
                                blur-[5px]
                            "
                            style={{
                                clipPath: "polygon(35% 0%, 65% 0%, 100% 100%, 0% 100%)"
                            }}
                        />
                    </>
                )}

                {/* The Entire Hanging Assembly (Anchored to top-0 of Navbar) */}
                <motion.div
                    onClick={toggleTheme}
                    animate={{
                        rotate: [0, 1.2, -1.2, 0]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    style={{ transformOrigin: "top center" }}
                    className="absolute top-0 flex flex-col items-center pointer-events-auto cursor-pointer px-3"
                >
                    {/* The Realistic Braided Hemp Rope */}
                    <div 
                        className="w-[3px] h-16 shadow-sm rounded-b-sm"
                        style={{
                            background: `repeating-linear-gradient(
                                -45deg,
                                #b45309 0px,
                                #b45309 2px,
                                #f59e0b 2px,
                                #f59e0b 4px
                            )`
                        }}
                    />
                    
                    {/* Screw socket base & Custom High-Fidelity SVG Bulb */}
                    <div className="relative flex flex-col items-center shrink-0 -mt-[1px]">
                        <svg width="32" height="48" viewBox="0 0 32 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                {/* Metallic Brass socket cap Gradient */}
                                <linearGradient id="brassGrad" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0%" stopColor="#78350f" />
                                    <stop offset="35%" stopColor="#fbbf24" />
                                    <stop offset="65%" stopColor="#f59e0b" />
                                    <stop offset="100%" stopColor="#78350f" />
                                </linearGradient>
                                {/* Inner Glass Glow Radial Gradient */}
                                <radialGradient id="glassGlow" cx="50%" cy="50%" r="50%">
                                    <stop offset="0%" stopColor="#fef08a" stopOpacity="0.5" />
                                    <stop offset="70%" stopColor="#f59e0b" stopOpacity="0.15" />
                                    <stop offset="100%" stopColor="#b45309" stopOpacity="0" />
                                </radialGradient>
                            </defs>

                            {/* Threaded screw base */}
                            <rect x="12" y="0" width="8" height="2" rx="0.5" fill="url(#brassGrad)" />
                            <rect x="11.5" y="2" width="9" height="2" rx="0.5" fill="url(#brassGrad)" />
                            <rect x="12" y="4" width="8" height="2" rx="0.5" fill="url(#brassGrad)" />
                            <rect x="13.5" y="6" width="5" height="1.5" fill="#3f3f46" />
                            
                            {/* Glass bulb shape (classic pear-shaped Edison, hanging downwards) */}
                            <path 
                                d="M 13.5 7.5 C 13.5 12, 6 15, 6 28 C 6 34.6, 10.5 40, 16 40 C 21.5 40, 26 34.6, 26 28 C 26 15, 18.5 12, 18.5 7.5 Z" 
                                fill={theme === "dark" ? "url(#glassGlow)" : "rgba(255, 255, 255, 0.03)"}
                                stroke={theme === "dark" ? "#fbbf24" : "#475569"}
                                strokeWidth="1.2"
                                className="transition-all duration-300"
                            />
                            
                            {/* Incandescent filament wires */}
                            <path 
                                d="M 14.5 7.5 L 14.5 18 M 17.5 7.5 L 17.5 18" 
                                stroke={theme === "dark" ? "#d97706" : "#475569"} 
                                strokeWidth="0.8"
                            />
                            <path 
                                d="M 14.5 18 Q 16 25, 17.5 18" 
                                stroke={theme === "dark" ? "#ffffff" : "#64748b"} 
                                strokeWidth="1.2"
                                className="transition-all duration-300"
                                style={{
                                    filter: theme === "dark" ? "drop-shadow(0 0 3px #fbbf24)" : "none"
                                }}
                            />

                            {/* Glass reflection highlight on left side */}
                            <path 
                                d="M 9.5 16 A 6.5 6.5 0 0 0 9.5 30" 
                                stroke="#ffffff" 
                                strokeWidth="1" 
                                strokeLinecap="round"
                                opacity={theme === "dark" ? "0.6" : "0.25"} 
                                className="transition-opacity duration-300"
                            />
                        </svg>
                    </div>
                </motion.div>
            </div>

            {/* Sky-themed Toggle Switch */}
            {showToggle && (
                <div
                    onClick={toggleTheme}
                    className={`
                        relative
                        flex
                        h-8
                        w-16
                        items-center
                        rounded-full
                        border
                        cursor-pointer
                        p-1
                        theme-transition
                        shadow-inner
                        overflow-hidden
                        ${theme === "dark" ? "bg-slate-900 border-slate-700" : "bg-sky-300 border-sky-400"}
                    `}
                    aria-label="Toggle Theme"
                >
                    {/* Background details: Clouds for Light mode */}
                    <div className={`absolute inset-0 transition-opacity duration-500 ${theme === "light" ? "opacity-100" : "opacity-0"}`}>
                        <div className="absolute top-1 right-3 w-4 h-2 bg-white/60 rounded-full blur-[0.5px]" />
                        <div className="absolute bottom-1.5 left-4 w-3 h-1.5 bg-white/40 rounded-full blur-[0.5px]" />
                    </div>

                    {/* Background details: Stars for Dark mode */}
                    <div className={`absolute inset-0 transition-opacity duration-500 ${theme === "dark" ? "opacity-100" : "opacity-0"}`}>
                        <div className="absolute top-1.5 left-4 w-0.5 h-0.5 bg-white rounded-full animate-ping" />
                        <div className="absolute bottom-2 left-6 w-0.5 h-0.5 bg-white/70 rounded-full" />
                        <div className="absolute top-2 right-6 w-0.5 h-0.5 bg-white/80 rounded-full" />
                    </div>

                    {/* Sliding & Spinning Knob */}
                    <motion.div
                        animate={{ 
                            rotate: theme === "dark" ? 360 : 0,
                            x: theme === "dark" ? 32 : 0
                        }}
                        transition={{ type: "spring", stiffness: 250, damping: 22 }}
                        className={`
                            flex
                            h-6
                            w-6
                            items-center
                            justify-center
                            rounded-full
                            shadow-md
                            transition-colors
                            duration-300
                            ${theme === "dark" ? "bg-slate-800 text-yellow-300" : "bg-amber-400 text-white"}
                        `}
                    >
                        {theme === "dark" ? (
                            <Moon size={12} className="fill-yellow-300 text-yellow-300" />
                        ) : (
                            <Sun size={12} className="fill-white text-white" />
                        )}
                    </motion.div>
                </div>
            )}
        </div>
    );
}
