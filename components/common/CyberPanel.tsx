"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import {
    Shield,
    Cpu,
    Activity,
    Database,
} from "lucide-react";

const defaultPanelItems = [
    {
        icon: Shield,
        title: "Security Layer",
        value: "ACTIVE",
    },
    {
        icon: Cpu,
        title: "AI Processing",
        value: "98%",
    },
    {
        icon: Database,
        title: "Data Streams",
        value: "128",
    },
    {
        icon: Activity,
        title: "System Health",
        value: "OPTIMAL",
    },
];

interface PanelItem {
    icon: LucideIcon;
    title: string;
    value: string;
}

interface CyberPanelProps {
    title?: string;
    subtitle?: string;
    description?: string;
    items?: PanelItem[];
}

export default function CyberPanel({
    title = "Control Panel",
    subtitle = "Cyber Security",
    description,
    items = defaultPanelItems,
}: CyberPanelProps) {
    return (
        <motion.div
            initial="initial"
            whileHover="hover"
            variants={{
                initial: {
                    opacity: 0,
                    y: 40,
                },
                animate: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 0.8,
                    }
                },
                hover: {
                    scale: 1.05,
                    y: -10,
                    borderColor: "rgba(161, 161, 170, 0.4)",
                    boxShadow: "0 0 40px rgba(161, 161, 170, 0.15)",
                }
            }}
            animate="animate"
            className="
                relative
                overflow-hidden
                rounded-[32px]
                border
                border-border
                bg-card/50
                p-6
                backdrop-blur-2xl
                shadow-[0_0_40px_rgba(161,161,170,0.08)]
                cursor-pointer
                transition-all
                duration-300
                hover:bg-card/80
                theme-transition
            "
        >
            {/* Glow */}
            <div
                className="
                    absolute
                    right-[-100px]
                    top-[-100px]
                    h-[200px]
                    w-[200px]
                    rounded-full
                    bg-zinc-500/10
                    blur-3xl
                "
            />

            <div
                className="
                    relative
                    z-10
                    space-y-4
                "
            >
                <div>
                    <p
                        className="
                            text-sm
                            uppercase
                            tracking-[0.3em]
                            text-zinc-500 dark:text-zinc-400
                        "
                    >
                        {subtitle}
                    </p>

                    <h2
                        className="
                            mt-2
                            text-3xl
                            font-black
                            text-foreground
                        "
                    >
                        {title}
                    </h2>
                </div>

                {/* Hover Reveal Information */}
                <motion.div
                    variants={{
                        initial: {
                            opacity: 0,
                            height: 0,
                            overflow: "hidden",
                        },
                        hover: {
                            opacity: 1,
                            height: "auto",
                            overflow: "visible",
                            transition: {
                                duration: 0.4,
                                ease: "easeInOut",
                            }
                        }
                    }}
                    className="space-y-4"
                >
                    {description && (
                        <p className="text-foreground/70 text-sm leading-relaxed">
                            {description}
                        </p>
                    )}

                    <div className="grid gap-3 pt-2">
                        {items.map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <motion.div
                                    key={index}
                                    whileHover={{
                                        scale: 1.02,
                                    }}
                                    className="
                                        flex
                                        items-center
                                        justify-between
                                        rounded-2xl
                                        border
                                        border-white/10
                                        bg-black/30
                                        px-5
                                        py-3
                                        backdrop-blur-xl
                                    "
                                >
                                    <div className="flex items-center gap-4">
                                        <div
                                            className="
                                                rounded-xl
                                                bg-zinc-500/10
                                                p-2
                                                text-zinc-500 dark:text-zinc-400
                                            "
                                        >
                                            <Icon size={18} />
                                        </div>

                                        <div>
                                            <p
                                                className="
                                                    text-xs
                                                    text-foreground/50
                                                "
                                            >
                                                {item.title}
                                            </p>

                                            <h3
                                                className="
                                                    text-sm
                                                    font-bold
                                                    text-foreground
                                                "
                                            >
                                                {item.value}
                                            </h3>
                                        </div>
                                    </div>

                                    <div
                                        className="
                                            h-2
                                            w-2
                                            rounded-full
                                            bg-zinc-400
                                            shadow-[0_0_15px_rgba(161,161,170,0.8)]
                                        "
                                    />
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}