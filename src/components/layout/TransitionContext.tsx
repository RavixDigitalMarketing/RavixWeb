"use client";

import React, { createContext, useContext, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useRouter, usePathname } from "next/navigation";
import { Zap } from "lucide-react";

interface TransitionContextType {
    transitionTo: (href: string) => void;
    overlayRef: React.RefObject<HTMLDivElement | null>;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export function TransitionProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const overlayRef = useRef<HTMLDivElement>(null);

    // Entrance Animation: Reveal page content on route change
    useEffect(() => {
        gsap.to(overlayRef.current, {
            scaleY: 0,
            transformOrigin: "top", // Slide DOWN
            duration: 1,
            ease: "power4.inOut",
        });
    }, [pathname]);

    const transitionTo = (href: string) => {
        if (pathname === href) return;

        const tl = gsap.timeline({
            onComplete: () => {
                router.push(href);
            },
        });

        // Exit Animation: Slide curtain UP to cover screen
        tl.to(overlayRef.current, {
            scaleY: 1,
            transformOrigin: "bottom",
            duration: 1,
            ease: "power4.inOut",
        });
    };

    return (
        <TransitionContext.Provider value={{ transitionTo, overlayRef }}>
            {children}
            {/* Global Overlay */}
            <div
                ref={overlayRef}
                className="fixed inset-0 z-[100] bg-black pointer-events-none flex items-center justify-center overflow-hidden"
                style={{ display: "flex", transform: "scaleY(0)", transformOrigin: "bottom" }}
            >
                <div className="absolute inset-0 bg-[var(--primary-gradient)] opacity-20" />
                <div className="relative z-10 flex flex-col items-center gap-4">
                    <Zap className="w-24 h-24 text-white animate-pulse" />
                    <span className="text-white text-3xl font-bold tracking-[0.3em]">RAVIX</span>
                </div>
            </div>
        </TransitionContext.Provider>
    );
}

export function useTransition() {
    const context = useContext(TransitionContext);
    if (!context) {
        throw new Error("useTransition must be used within a TransitionProvider");
    }
    return context;
}
