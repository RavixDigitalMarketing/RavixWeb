"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useTransition } from "@/components/layout/TransitionContext";

export default function Template({ children }: { children: React.ReactNode }) {
    const { overlayRef } = useTransition();
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (!contentRef.current) return;

            // 1. Prepare for Entrance: Hide content and ensure overlay covers
            gsap.set(contentRef.current, { opacity: 0, y: 15 });

            // If overlay is already 0 (first load), we set it to 1 to "slide it away"
            if (overlayRef.current && gsap.getProperty(overlayRef.current, "scaleY") === 0) {
                gsap.set(overlayRef.current, { scaleY: 1, transformOrigin: "top" });
            }

            const tl = gsap.timeline({
                defaults: { ease: "power4.inOut" },
                onComplete: () => {
                    // Final Failsafe: Ensure content is fully interactive and opaque
                    gsap.set(contentRef.current, { opacity: 1, y: 0, clearProps: "y" });
                }
            });

            // 2. Entrance Sequence
            if (overlayRef.current) {
                tl.to(overlayRef.current, {
                    scaleY: 0,
                    transformOrigin: "top",
                    duration: 1.1,
                    delay: 0.1,
                });
            }

            tl.to(contentRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.8,
            }, "-=0.7");
        });

        // Failsafe: Force reveal after 2s if anything is stuck
        const timer = setTimeout(() => {
            if (contentRef.current) {
                contentRef.current.style.opacity = "1";
                contentRef.current.style.transform = "none";
            }
            if (overlayRef.current) {
                overlayRef.current.style.transform = "scaleY(0)";
            }
        }, 2000);

        return () => {
            ctx.revert();
            clearTimeout(timer);
        };
    }, [overlayRef]);

    return (
        <div ref={contentRef}>
            {children}
        </div>
    );
}
