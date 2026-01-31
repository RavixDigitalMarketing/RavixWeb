"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function BackgroundGlow() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const glows = containerRef.current?.querySelectorAll(".glow") || [];

            glows.forEach((glow, i) => {
                gsap.to(glow, {
                    x: (i + 1) * 50 * (i % 2 === 0 ? 1 : -1),
                    y: (i + 1) * 30 * (i % 2 === 0 ? -1 : 1),
                    duration: 15 + i * 5,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: i * 2,
                });
            });

            const onMouseMove = (e: MouseEvent) => {
                const moveX = (e.clientX - window.innerWidth / 2) * 0.05;
                const moveY = (e.clientY - window.innerHeight / 2) * 0.05;
                gsap.to(glows, {
                    x: `+=${moveX * 0.1}`,
                    y: `+=${moveY * 0.1}`,
                    duration: 2,
                    ease: "power2.out",
                    stagger: 0.1,
                });
            };

            window.addEventListener("mousemove", onMouseMove);
        });

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
            <div className="glow absolute w-[600px] h-[600px] top-[-100px] left-[-100px] rounded-full blur-[120px] opacity-[0.15] bg-[var(--primary-gradient)]" />
            <div className="glow absolute w-[500px] h-[500px] bottom-[100px] right-[100px] rounded-full blur-[120px] opacity-[0.15] bg-[#6a0dad]" />
            <div className="glow absolute w-[400px] h-[400px] top-[40%] left-[50%] rounded-full blur-[120px] opacity-[0.15] bg-[#4b0082]" />
        </div>
    );
}
