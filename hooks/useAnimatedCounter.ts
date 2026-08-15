import { useEffect, useState, useRef } from "react";
import { animate, useInView } from "framer-motion";

/**
 * Custom React hook that animates a numeric value from 0 to the target number
 * once the element scrolls into view. Replicates PureCounter/GSAP scroll trigger logic.
 */
export function useAnimatedCounter(to: number, duration: number = 2) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (!isInView) return;

        const controls = animate(0, to, {
            duration: duration,
            ease: [0.16, 1, 0.3, 1], // Custom premium easeOutExpo curve
            onUpdate(value) {
                setCount(Math.round(value));
            }
        });
        return () => controls.stop();
    }, [isInView, to, duration]);

    return { count, ref };
}
