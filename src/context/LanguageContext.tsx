"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Locale, translations } from "@/i18n/translations";

interface LanguageContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: (key: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [locale, setLocale] = useState<Locale>("en");

    useEffect(() => {
        // Detect browser language
        const browserLang = navigator.language.split("-")[0];
        if (browserLang === "tr") {
            setLocale("tr");
        } else {
            setLocale("en");
        }

        // Check localStorage for manual override
        const savedLocale = localStorage.getItem("ravix_locale") as Locale;
        if (savedLocale && (savedLocale === "en" || savedLocale === "tr")) {
            setLocale(savedLocale);
        }
    }, []);

    const handleSetLocale = (newLocale: Locale) => {
        setLocale(newLocale);
        localStorage.setItem("ravix_locale", newLocale);
    };

    // Helper to get nested translation value
    const t = (key: string) => {
        const keys = key.split(".");
        let value: any = translations[locale];

        for (const k of keys) {
            value = value?.[k];
        }

        return value || key;
    };

    return (
        <LanguageContext.Provider value={{ locale, setLocale: handleSetLocale, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useTranslation() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useTranslation must be used within a LanguageProvider");
    }
    return context;
}
