"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Zap, Menu, X, Sun, Moon } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import TransitionLink from "@/components/layout/TransitionLink";
import { useTranslation } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const { locale, setLocale, t } = useTranslation();
    const { theme, toggleTheme } = useTheme();

    const navLinks = [
        { name: t("nav.home"), href: "/" },
        { name: t("nav.services"), href: "/services" },
        { name: t("nav.about"), href: "/about" },
        { name: t("nav.blog"), href: "/blog" },
        { name: t("nav.contact"), href: "/contact" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 w-full z-50 transition-all duration-400 py-6",
                isScrolled && "bg-bg/80 backdrop-blur-md py-4 border-b border-glass-border"
            )}
        >
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <div className="flex items-center gap-8">
                    <TransitionLink href="/" className="flex items-center gap-2 text-2xl font-bold">
                        <Zap className="text-gradient w-8 h-8" />
                        <span>RAVIX</span>
                    </TransitionLink>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <TransitionLink
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "transition-colors hover:text-accent text-sm font-semibold uppercase tracking-wider",
                                    pathname === link.href ? "text-accent" : "text-text"
                                )}
                            >
                                {link.name}
                            </TransitionLink>
                        ))}
                    </nav>
                </div>

                <div className="flex items-center gap-6">
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-glass-bg border border-transparent hover:border-glass-border transition-all text-muted hover:text-text"
                        aria-label="Toggle Theme"
                    >
                        {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>

                    {/* Language Switcher */}
                    <div className="hidden md:flex items-center bg-glass-bg rounded-full p-1 border border-glass-border">
                        <button
                            onClick={() => setLocale("en")}
                            className={cn(
                                "px-3 py-1 rounded-full text-xs font-bold transition-all",
                                locale === "en" ? "bg-accent text-white" : "text-muted hover:text-text"
                            )}
                        >
                            EN
                        </button>
                        <button
                            onClick={() => setLocale("tr")}
                            className={cn(
                                "px-3 py-1 rounded-full text-xs font-bold transition-all",
                                locale === "tr" ? "bg-accent text-white" : "text-muted hover:text-text"
                            )}
                        >
                            TR
                        </button>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden text-text"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={cn(
                    "fixed inset-0 z-[100] bg-bg/98 backdrop-blur-2xl flex flex-col items-center justify-center transition-all duration-500 ease-in-out",
                    isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
            >
                {/* Close Button Inside Full Screen */}
                <button
                    className="absolute top-8 right-8 text-text p-2 rounded-full hover:bg-glass-bg border border-glass-border transition-all"
                    onClick={() => setIsMenuOpen(false)}
                >
                    <X className="w-8 h-8" />
                </button>

                <nav className="flex flex-col items-center gap-10">
                    {navLinks.map((link, idx) => (
                        <div
                            key={link.href}
                            className={cn(
                                "mobile-nav-item transition-all duration-500",
                                isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                            )}
                            style={{ transitionDelay: `${idx * 100}ms` }}
                        >
                            <TransitionLink
                                href={link.href}
                                className={cn(
                                    "text-5xl md:text-7xl font-black uppercase tracking-tighter hover:text-accent transition-colors",
                                    pathname === link.href ? "text-accent" : "text-text"
                                )}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.name}
                            </TransitionLink>
                        </div>
                    ))}

                    <div
                        className={cn(
                            "flex items-center bg-glass-bg rounded-full p-2 border border-glass-border mt-12 transition-all duration-700 delay-500",
                            isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                        )}
                    >
                        <button
                            onClick={() => { setLocale("en"); setIsMenuOpen(false); }}
                            className={cn(
                                "px-6 py-3 rounded-full text-lg font-black transition-all",
                                locale === "en" ? "bg-accent text-white" : "text-muted"
                            )}
                        >
                            EN
                        </button>
                        <button
                            onClick={() => { setLocale("tr"); setIsMenuOpen(false); }}
                            className={cn(
                                "px-6 py-3 rounded-full text-lg font-black transition-all",
                                locale === "tr" ? "bg-accent text-white" : "text-muted"
                            )}
                        >
                            TR
                        </button>
                    </div>
                </nav>

                {/* Footer Info in Menu */}
                <div className={cn(
                    "absolute bottom-12 text-center transition-all duration-700 delay-700",
                    isMenuOpen ? "opacity-40" : "opacity-0"
                )}>
                    <p className="text-sm font-bold tracking-[0.3em] uppercase">Ravix Digital Agency</p>
                </div>
            </div>
        </header>
    );
}
