"use client";

import { useState, useEffect } from "react";
import gsap from "gsap";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/layout/CustomCursor";
import BackgroundGlow from "@/components/layout/BackgroundGlow";
import { Mail, Phone, MapPin, SendHorizontal, Loader2, CheckCircle2 } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";

export default function ContactPage() {
    const { t } = useTranslation();
    const [isSending, setIsSending] = useState(false);
    const [isSent, setIsSent] = useState(false);

    useEffect(() => {
        // Template handles entrance
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSending(true);

        // Simulate API call
        setTimeout(() => {
            setIsSending(false);
            setIsSent(true);

            // Reset after 5 seconds
            setTimeout(() => setIsSent(false), 5000);
        }, 1500);
    };

    return (
        <>
            <CustomCursor />
            <BackgroundGlow />
            <Navbar />

            <main className="pt-32 pb-20">
                <section className="px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-5 duration-1000">
                            <h2 className="text-sm font-bold tracking-[0.2em] text-gradient mb-4 uppercase">{t("contact.subtitle")}</h2>
                            <h1 className="text-5xl md:text-7xl font-bold mb-6">
                                {t("contact.title").split(" ").map((word: string, i: number, arr: string[]) => (
                                    i === arr.length - 1 ? <span key={i} className="text-gradient"> {word}</span> : i === 0 ? word : ` ${word}`
                                ))}
                            </h1>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                            <div className="space-y-12">
                                <div className="glass-card p-10 space-y-8">
                                    <div className="flex gap-6 items-start">
                                        <div className="w-12 h-12 bg-glass-bg border border-glass-border rounded-xl flex items-center justify-center shrink-0 shadow-lg">
                                            <Mail className="w-6 h-6 text-accent" />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold mb-2">{t("footer.contact")}</h4>
                                            <p className="text-muted">hello@ravix.agency</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-6 items-start">
                                        <div className="w-12 h-12 bg-glass-bg border border-glass-border rounded-xl flex items-center justify-center shrink-0 shadow-lg">
                                            <Phone className="w-6 h-6 text-accent" />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold mb-2">Call Us</h4>
                                            <p className="text-muted">+1 (555) 123-4567</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-6 items-start">
                                        <div className="w-12 h-12 bg-glass-bg border border-glass-border rounded-xl flex items-center justify-center shrink-0 shadow-lg">
                                            <MapPin className="w-6 h-6 text-accent" />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold mb-2">Visit Us</h4>
                                            <p className="text-muted">San Francisco, CA</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8 border border-glass-border rounded-[30px] bg-glass-bg hover:bg-glass-bg/20 transition-colors duration-500">
                                    <h3 className="text-2xl font-bold mb-4">Follow Our Journey</h3>
                                    <div className="flex gap-6">
                                        {["Twitter", "Instagram", "LinkedIn", "Dribbble"].map((social) => (
                                            <a key={social} href="#" className="text-muted hover:text-accent transition-colors">{social}</a>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="glass-card p-10 md:p-12">
                                <form className="space-y-6" onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-muted">{t("contact.labels.name")}</label>
                                            <input required type="text" placeholder={t("contact.placeholder.name")} className="w-full bg-glass-bg border border-glass-border p-4 rounded-xl focus:outline-none focus:border-accent transition-colors" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-muted">{t("contact.labels.email")}</label>
                                            <input required type="email" placeholder={t("contact.placeholder.email")} className="w-full bg-glass-bg border border-glass-border p-4 rounded-xl focus:outline-none focus:border-accent transition-colors" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-muted">{t("contact.labels.subject")}</label>
                                        <select className="w-full bg-glass-bg border border-glass-border p-4 rounded-xl focus:outline-none focus:border-accent transition-colors appearance-none outline-none">
                                            <option className="bg-bg">{t("contact.subjects.project")}</option>
                                            <option className="bg-bg">{t("contact.subjects.partnership")}</option>
                                            <option className="bg-bg">{t("contact.subjects.career")}</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-muted">{t("contact.labels.message")}</label>
                                        <textarea required rows={5} placeholder={t("contact.placeholder.message")} className="w-full bg-glass-bg border border-glass-border p-4 rounded-xl focus:outline-none focus:border-accent transition-colors resize-none"></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isSending || isSent}
                                        className={`w-full h-[60px] btn ${isSent ? 'bg-green-600 hover:bg-green-600 cursor-default' : 'btn-primary'} flex items-center justify-center gap-4 transition-all duration-300 disabled:opacity-80 relative overflow-hidden group/btn`}
                                    >
                                        {isSending ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                <span className="font-bold uppercase tracking-wider text-sm">{t("contact.sending")}</span>
                                            </>
                                        ) : isSent ? (
                                            <>
                                                <CheckCircle2 className="w-5 h-5" />
                                                <span className="font-bold uppercase tracking-wider text-sm">{t("contact.sent")}</span>
                                            </>
                                        ) : (
                                            <div className="flex items-center gap-3 transition-transform group-hover/btn:translate-x-1">
                                                <span className="font-bold uppercase tracking-wider text-sm">{t("contact.btn")}</span>
                                                <SendHorizontal className="w-5 h-5" />
                                            </div>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
