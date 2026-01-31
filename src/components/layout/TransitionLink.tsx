"use client";

import React from "react";
import { useTransition } from "./TransitionContext";

interface TransitionLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export default function TransitionLink({ href, children, className, onClick }: TransitionLinkProps) {
    const { transitionTo } = useTransition();

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (window.location.pathname === href) return;
        if (onClick) onClick();
        transitionTo(href);
    };

    return (
        <a href={href} onClick={handleClick} className={className}>
            {children}
        </a>
    );
}
