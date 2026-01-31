"use client";

import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/layout/CustomCursor";
import BackgroundGlow from "@/components/layout/BackgroundGlow";
import Image from "next/image";
import TransitionLink from "@/components/layout/TransitionLink";
import { Check } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";

export default function ServicesPage() {
    const { t } = useTranslation();

    const servicesData = [
        {
            id: "01",
            category: "DESIGN",
            title: t("services.design.title"),
            description: t("services.design.description"),
            image: "/images/ui-ux.png",
            features: ["User Research", "Wireframing", "Prototyping", "Visual Identity"],
            btnText: t("services.btn"),
            reverse: false
        },
        {
            id: "02",
            category: "CODE",
            title: t("services.code.title"),
            description: t("services.code.description"),
            image: "/images/development.png",
            features: ["React & Next.js", "Backend Systems", "E-commerce", "API Integration"],
            btnText: t("services.build_btn"),
            reverse: true
        }
    ];

    useEffect(() => {
        // Template handles entrance
    }, []);

    return (
        <>
            <CustomCursor />
            <BackgroundGlow />
            <Navbar />

            <main className="pt-32 pb-20">
                <section className="px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-5 duration-1000">
                            <h1 className="text-5xl md:text-7xl font-bold mb-6">
                                {t("services.title").split(" ").map((word: string, i: number, arr: string[]) => (
                                    i === arr.length - 1 ? <span key={i} className="text-gradient"> {word}</span> : i === 0 ? word : ` ${word}`
                                ))}
                            </h1>
                            <p className="text-xl text-muted max-w-2xl mx-auto">
                                {t("services.subtitle")}
                            </p>
                        </div>

                        <div className="space-y-32">
                            {servicesData.map((service) => (
                                <div
                                    key={service.id}
                                    className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center`}
                                >
                                    <div className={`relative aspect-square w-full rounded-[40px] overflow-hidden border border-glass-border shadow-2xl ${service.reverse ? 'lg:order-2' : ''}`}>
                                        <Image
                                            src={service.image}
                                            alt={service.title}
                                            fill
                                            className="object-cover transform transition-transform duration-700 hover:scale-105"
                                        />
                                    </div>
                                    <div className={service.reverse ? 'lg:order-1' : ''}>
                                        <span className="text-gradient font-bold tracking-widest text-sm mb-4 block">
                                            {service.id}. {service.category}
                                        </span>
                                        <h2 className="text-4xl md:text-5xl font-bold mb-6">{service.title}</h2>
                                        <p className="text-lg text-muted mb-8 leading-relaxed">
                                            {service.description}
                                        </p>
                                        <ul className="grid grid-cols-2 gap-4 mb-10">
                                            {service.features.map((feature) => (
                                                <li key={feature} className="flex items-center gap-3 text-muted">
                                                    <Check className="w-5 h-5 text-accent" />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <TransitionLink href="/contact" className="btn btn-outline">
                                            {service.btnText}
                                        </TransitionLink>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
