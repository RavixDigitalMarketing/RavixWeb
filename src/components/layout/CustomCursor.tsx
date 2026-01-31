"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const onMouseMove = (e: MouseEvent) => {
                gsap.to(cursorRef.current, {
                    x: e.clientX,
                    y: e.clientY,
                    duration: 0.1,
                });
                gsap.to(followerRef.current, {
                    x: e.clientX,
                    y: e.clientY,
                    duration: 0.3,
                });
            };

            window.addEventListener("mousemove", onMouseMove);
        });

        return () => ctx.revert();
    }, []);

    return (
        <>
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-20 h-20 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference -translate-x-1/2 -translate-y-1/2 desktop-only"
            />
            <div
                ref={followerRef}
                className="fixed top-0 left-0 w-32 h-32 border-2 border-violet rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-colors duration-300 desktop-only"
            />
            <style jsx>{`
        @media (max-width: 1024px) {
          .desktop-only { display: none; }
        }
      `}</style>
        </>
    );
}
