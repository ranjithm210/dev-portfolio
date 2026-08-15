"use client";

import { useTheme } from "@/providers/ThemeProvider";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import ThemeToggle from "@/components/common/ThemeToggle";

const navItems = [
    { label: "Home", href: "/", external: false },
    { label: "Portfolio", href: "/portfolio", external: false },
    { label: "Resume", href: "#", external: true },
];

export default function Navbar() {
    const router = useRouter();
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.nav
            initial={{
                y: -80,
                opacity: 0,
            }}
            animate={{
                y: 0,
                opacity: 1,
            }}
            transition={{
                duration: 0.8,
            }}
            className="
        fixed
        top-0
        left-0
        z-50
        w-full
        border-b
        border-border
        bg-nav-bg
        backdrop-blur-xl
        theme-transition
      "
        >
            <div
                className="
          mx-auto
          flex
          max-w-7xl
          items-center
          justify-between
          px-6
          py-4
        "
            >
                {/* Logo */}
                <motion.h1
                    onClick={() => router.push("/")}
                    whileHover={{
                        scale: 1.02,
                    }}
                    className="
            text-lg
            md:text-xl
            tracking-wider
            cursor-pointer
          "
                >
                    <span className="text-gray-400 dark:text-gray-500 font-light italic">Hey I am </span>
                    <span className="font-black text-cyan-500 dark:text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">RANJITH</span>
                </motion.h1>

                {/* Menu & Theme Toggler */}
                <div className="flex items-center gap-6 md:gap-8">
                    <div className="hidden sm:flex items-center gap-6 md:gap-8">
                        {navItems.map((item) => (
                            <motion.button
                                key={item.label}
                                onClick={() => {
                                    if (item.external) {
                                        window.open(item.href, "_blank", "noopener,noreferrer");
                                    } else {
                                        router.push(item.href);
                                    }
                                }}
                                whileHover={{
                                    y: -2,
                                }}
                                className="
                    relative
                    text-sm
                    uppercase
                    tracking-wider
                    text-foreground/80
                    hover:text-cyan-500
                    dark:hover:text-cyan-400
                    transition-colors
                    duration-300
                    cursor-pointer
                  "
                            >
                                {item.label}

                                <span
                                    className="
                      absolute
                      left-0
                      -bottom-1
                      h-[2px]
                      w-0
                      bg-cyan-500
                      dark:bg-cyan-400
                      transition-all
                      duration-300
                      group-hover:w-full
                    "
                                />
                            </motion.button>
                        ))}
                    </div>

                    <ThemeToggle />
                </div>
            </div>
        </motion.nav>
    );
}