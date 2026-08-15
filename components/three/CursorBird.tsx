"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useChatbotStore } from "@/store/chatbotStore";

function BirdModel({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
    const group = useRef<THREE.Group>(null);
    const isOpen = useChatbotStore((state) => state.isOpen);

    const { scene, animations } = useGLTF(
        "/models/phoenix_bird.glb"
    );

    const { actions } = useAnimations(
        animations,
        group
    );

    useEffect(() => {
        Object.values(actions).forEach((action) => {
            action?.reset().play();
        });
    }, [actions]);

    const spinProgress = useRef(0);
    const isSpinning = useRef(false);

    useEffect(() => {
        const handleReact = () => {
            isSpinning.current = true;
            spinProgress.current = 0;
        };
        window.addEventListener("bird-react", handleReact);
        return () => {
            window.removeEventListener("bird-react", handleReact);
        };
    }, []);

    useFrame((state) => {
        if (!group.current || !mouse.current) return;

        // Determine destination coordinates. If chatbot is open and mouse is on the right, redirect to empty left area.
        let targetX = (mouse.current.x * state.viewport.width) / 2;
        let targetY = (mouse.current.y * state.viewport.height) / 2;

        if (isOpen && mouse.current.x > 0.1) {
            targetX = -state.viewport.width / 4;
            targetY = 0;
        }

        const currentX = group.current.position.x;
        const currentY = group.current.position.y;

        const dx = targetX - currentX;
        const dy = targetY - currentY;

        // Smoothly interpolate position towards the cursor
        group.current.position.x += dx * 0.08;
        group.current.position.y += dy * 0.08;

        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > 0.02) {
            // Target horizontal direction (yaw): face right (PI/2) or left (-PI/2)
            const targetRotationY = dx > 0 ? Math.PI / 2 : -Math.PI / 2;

            // Target vertical angle (pitch/roll relative to movement direction)
            const targetRotationZ = dx > 0 ? Math.atan2(dy, dx) : -Math.atan2(dy, -dx);

            // Smoothly interpolate rotations to prevent snapping
            let diffY = targetRotationY - group.current.rotation.y;
            diffY = Math.atan2(Math.sin(diffY), Math.cos(diffY));
            group.current.rotation.y += diffY * 0.1;

            let diffZ = targetRotationZ - group.current.rotation.z;
            diffZ = Math.atan2(Math.sin(diffZ), Math.cos(diffZ));
            group.current.rotation.z += diffZ * 0.1;

            if (isSpinning.current) {
                spinProgress.current += 0.05; // 20 frames total
                if (spinProgress.current >= 1) {
                    isSpinning.current = false;
                    spinProgress.current = 0;
                }
                // Perform a 360-degree roll (Math.PI * 2 / 20 = 0.314159)
                group.current.rotation.x += 0.314159;
            } else {
                // Add a banking tilt depending on horizontal movement speed
                const targetRotationX = -dx * 0.05;
                group.current.rotation.x += (targetRotationX - group.current.rotation.x) * 0.1;
            }
        }
    });

    return (
        <group
            ref={group}
            scale={0.003}
            rotation={[0, Math.PI / 2, 0]}
        >
            <primitive object={scene} />
        </group>
    );
}

export default function CursorBird() {
    const mouse = useRef({ x: 0, y: 0 });
    const [webGLSupported, setWebGLSupported] = React.useState(true);

    useEffect(() => {
        try {
            const canvas = document.createElement("canvas");
            const supported = !!(
                window.WebGLRenderingContext &&
                (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
            );
            setWebGLSupported(supported);
        } catch (e) {
            setWebGLSupported(false);
        }

        const handleMouseMove = (event: MouseEvent) => {
            mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    if (!webGLSupported) return null;

    return (
        <div
            className="
                fixed
                inset-0
                pointer-events-none
                z-[1]
                w-screen
                h-screen
            "
        >
            <Canvas
                camera={{
                    position: [0, 0, 20],
                    fov: 50,
                }}
            >
                <ambientLight intensity={2} />
                <BirdModel mouse={mouse} />
            </Canvas>
        </div>
    );
}