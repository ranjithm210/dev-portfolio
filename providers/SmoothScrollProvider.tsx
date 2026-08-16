"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";

export default function SmoothScrollProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const lenisRef = useRef<Lenis | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        // Initialize Lenis for smooth kinetic scroll
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            touchMultiplier: 2,
        });

        lenisRef.current = lenis;

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Auto-observe body DOM changes to dynamically update scroll height
        let resizeObserver: ResizeObserver | null = null;
        if (typeof ResizeObserver !== "undefined") {
            resizeObserver = new ResizeObserver(() => {
                lenis.resize();
            });
            resizeObserver.observe(document.body);
        }

        return () => {
            resizeObserver?.disconnect();
            lenis.destroy();
        };
    }, []);

    // Listen to route changes to reset scroll position and recalculate page heights
    useEffect(() => {
        if (lenisRef.current) {
            lenisRef.current.scrollTo(0, { immediate: true });
            const timer = setTimeout(() => {
                lenisRef.current?.resize();
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [pathname]);

    return <>{children}</>;
}
