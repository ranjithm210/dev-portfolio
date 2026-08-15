"use client";

import { motion } from "framer-motion";

type FloatingCardProps = {
    title: string;
    value: string;
};

export default function FloatingCard({
    title,
    value,
}: FloatingCardProps) {
    return (
        <motion.div
            animate={{
                y: [0, -10, 0],
            }}
            transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
            }}
            className="
                rounded-3xl
                border
                border-border
                bg-card
                backdrop-blur-xl
                p-6
                shadow-[0_0_30px_rgba(6,145,178,0.05)]
                dark:shadow-[0_0_40px_rgba(34,211,238,0.15)]
                theme-transition
            "
        >
            <p
                className="
                    text-sm
                    uppercase
                    tracking-widest
                    text-cyan-600
                    dark:text-cyan-400
                "
            >
                {title}
            </p>

            <h2
                className="
                    mt-3
                    text-2xl
                    font-black
                    text-foreground
                "
            >
                {value}
            </h2>
        </motion.div>
    );
}