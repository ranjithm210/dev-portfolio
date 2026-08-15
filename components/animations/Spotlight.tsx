"use client";

import {
    motion,
    useMotionValue,
} from "framer-motion";

import { useEffect } from "react";

export default function Spotlight() {

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {

        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX - 200);
            mouseY.set(e.clientY - 200);
        };

        window.addEventListener(
            "mousemove",
            handleMouseMove
        );

        return () => {
            window.removeEventListener(
                "mousemove",
                handleMouseMove
            );
        };

    }, [mouseX, mouseY]);

    return (
        <motion.div
            style={{
                x: mouseX,
                y: mouseY,
            }}
            className="
                pointer-events-none
                fixed
                left-0
                top-0
                z-0
                h-[400px]
                w-[400px]
                rounded-full
                bg-cyan-400/20
                blur-3xl
            "
        />
    );
}