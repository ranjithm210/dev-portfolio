"use client";

import Image from "next/image";
import { Github, Linkedin, Twitter, Instagram } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";

export default function Footer() {
    const { theme } = useTheme();
    const logoSrc = theme === "light" ? "/footer_logo_light.png" : "/footer_logo.png";

    return (
        <footer className="w-full py-12 border-t border-border bg-card/40 backdrop-blur-md flex flex-col items-center justify-center gap-4 relative z-10 theme-transition">
            <div className="flex items-center justify-center">
                <Image
                    src={logoSrc}
                    alt="Cyber Portfolio Logo"
                    width={240}
                    height={80}
                    className="opacity-100 transition-opacity duration-300 object-contain cursor-pointer"
                />
            </div>

            <div className="flex items-center gap-6 my-2">
                <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-cyan-400 transition-all duration-300 hover:scale-110"
                >
                    <Github size={20} />
                </a>
                <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-cyan-400 transition-all duration-300 hover:scale-110"
                >
                    <Linkedin size={20} />
                </a>
                <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-cyan-400 transition-all duration-300 hover:scale-110"
                >
                    <Twitter size={20} />
                </a>
                <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-cyan-400 transition-all duration-300 hover:scale-110"
                >
                    <Instagram size={20} />
                </a>
            </div>

            <p className="text-xs text-gray-400 tracking-[0.2em] uppercase">
                © {new Date().getFullYear()} RANJITH. All Rights Reserved.
            </p>
        </footer>
    );
}
