import TransitionLink from "@/components/layout/TransitionLink";
import { Zap } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";

export default function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="bg-bg py-20 mt-20 border-t border-glass-border">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="md:col-span-1">
                        <TransitionLink href="/" className="flex items-center gap-2 text-2xl font-bold mb-6">
                            <Zap className="text-gradient w-8 h-8" />
                            <span>RAVIX</span>
                        </TransitionLink>
                        <p className="text-muted leading-relaxed">
                            {t("footer.slogan")}
                        </p>
                    </div>

                    <div>
                        <h4 className="text-xl font-bold mb-6">{t("footer.company")}</h4>
                        <ul className="space-y-4 text-muted">
                            <li><TransitionLink href="/about" className="hover:text-accent transition-colors">{t("nav.about")}</TransitionLink></li>
                            <li><TransitionLink href="/services" className="hover:text-accent transition-colors">{t("nav.services")}</TransitionLink></li>
                            <li><TransitionLink href="/blog" className="hover:text-accent transition-colors">{t("nav.blog")}</TransitionLink></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xl font-bold mb-6">{t("footer.support")}</h4>
                        <ul className="space-y-4 text-muted">
                            <li><TransitionLink href="/contact" className="hover:text-accent transition-colors">{t("nav.contact")}</TransitionLink></li>
                            <li><TransitionLink href="#" className="hover:text-accent transition-colors">Privacy Policy</TransitionLink></li>
                            <li><TransitionLink href="#" className="hover:text-accent transition-colors">Terms of Use</TransitionLink></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xl font-bold mb-6">{t("footer.contact")}</h4>
                        <ul className="space-y-4 text-muted">
                            <li><span className="block">hello@ravix.agency</span></li>
                            <li><span className="block">+1 (555) 123-4567</span></li>
                            <li><span className="block">San Francisco, CA</span></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-10 border-t border-glass-border text-center text-muted">
                    <p>&copy; {new Date().getFullYear()} Ravix Digital Agency. {t("footer.rights")}</p>
                </div>
            </div>
        </footer>
    );
}
