"use client";

import { motion } from "framer-motion";

const particles = [
    {
        left: "10%",
        top: "20%",
        size: 4,
        duration: 12,
        delay: 0,
    },
    {
        left: "30%",
        top: "70%",
        size: 6,
        duration: 15,
        delay: 2,
    },
    {
        left: "50%",
        top: "40%",
        size: 3,
        duration: 18,
        delay: 1,
    },
    {
        left: "70%",
        top: "60%",
        size: 5,
        duration: 14,
        delay: 3,
    },
    {
        left: "85%",
        top: "30%",
        size: 4,
        duration: 20,
        delay: 4,
    },
];

export default function Particles() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((particle, index) => (
                <motion.div
                    key={index}
                    initial={{
                        opacity: 0,
                        y: 0,
                    }}
                    animate={{
                        opacity: [0, 1, 0],
                        y: -800,
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        delay: particle.delay,
                        ease: "linear",
                    }}
                    className="
                        absolute
                        rounded-full
                        bg-cyan-400
                    "
                    style={{
                        left: particle.left,
                        top: particle.top,
                        width: particle.size,
                        height: particle.size,
                        boxShadow:
                            "0 0 20px rgba(34,211,238,0.8)",
                    }}
                />
            ))}
        </div>
    );
}