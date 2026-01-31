"use client";

import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/layout/CustomCursor";
import BackgroundGlow from "@/components/layout/BackgroundGlow";
import { useTranslation } from "@/context/LanguageContext";

export default function AboutPage() {
    const { t } = useTranslation();

    const teamData = [
        { name: "Alex Rivers", role: "Founder & CEO" },
        { name: "Sarah Jenkins", role: "Creative Director" },
        { name: "Michael Chen", role: "Lead Developer" }
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
                        <div className="max-w-3xl mb-20 animate-in fade-in slide-in-from-left-5 duration-1000">
                            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                                {t("about.title").split(" ").map((word: string, i: number, arr: string[]) => (
                                    i >= arr.length - 2 ? <span key={i} className="text-gradient"> {word}</span> : i === 0 ? word : ` ${word}`
                                ))}
                            </h1>
                            <p className="text-xl text-muted leading-relaxed">
                                {t("about.subtitle")}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
                            <div className="glass-card p-10 hover:bg-glass-bg transition-colors duration-500">
                                <h3 className="text-2xl font-bold mb-4">{t("about.mission.title")}</h3>
                                <p className="text-muted leading-relaxed">
                                    {t("about.mission.desc")}
                                </p>
                            </div>
                            <div className="glass-card p-10 hover:bg-glass-bg transition-colors duration-500">
                                <h3 className="text-2xl font-bold mb-4">{t("about.vision.title")}</h3>
                                <p className="text-muted leading-relaxed">
                                    {t("about.vision.desc")}
                                </p>
                            </div>
                        </div>

                        <section className="py-20 bg-[rgba(138,43,226,0.03)] rounded-[40px] px-10">
                            <div className="text-center mb-16">
                                <h2 className="text-4xl md:text-5xl font-bold mb-4">{t("about.team_title")}</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                                {teamData.map((member) => (
                                    <div key={member.name} className="text-center group">
                                        <div className="w-40 h-40 rounded-full bg-[var(--primary-gradient)] mx-auto mb-6 overflow-hidden transition-transform duration-500 group-hover:scale-110 shadow-xl" />
                                        <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                                        <p className="text-accent font-semibold">{member.role}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
