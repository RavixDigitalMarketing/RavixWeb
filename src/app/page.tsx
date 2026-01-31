"use client";

import { useEffect } from "react";
import gsap from "gsap";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/layout/CustomCursor";
import BackgroundGlow from "@/components/layout/BackgroundGlow";
import Image from "next/image";
import TransitionLink from "@/components/layout/TransitionLink";
import { Layout, Code, BarChart, Target, ShieldCheck } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCreative } from "swiper/modules";
import { useTranslation } from "@/context/LanguageContext";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-creative";

export default function Home() {
  const { t } = useTranslation();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Timeline
      const tl = gsap.timeline();
      tl.from("h1", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.5
      })
        .from(".hero-p", {
          y: 30,
          opacity: 0,
          duration: 1,
          ease: "power3.out"
        }, "-=0.8")
        .from(".hero-btns", {
          y: 30,
          opacity: 0,
          duration: 1,
          ease: "power3.out"
        }, "-=0.8");
    });

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  return (
    <>
      <CustomCursor />
      <BackgroundGlow />
      <Navbar />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center relative overflow-hidden py-20 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10">
            <div className="hero-content text-center lg:text-left">
              <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-[1.1]">
                {t("hero.title").split(" ").map((word: string, i: number, arr: string[]) => (
                  i >= arr.length - 2 ? <span key={i} className="text-gradient"> {word}</span> : i === 0 ? word : ` ${word}`
                ))}
              </h1>
              <p className="hero-p text-xl text-muted mb-12 max-w-2xl mx-auto lg:mx-0">
                {t("hero.subtitle")}
              </p>
              <div className="hero-btns flex flex-wrap justify-center lg:justify-start gap-5">
                <TransitionLink href="/contact" className="btn btn-primary">{t("hero.cta_start")}</TransitionLink>
                <TransitionLink href="/about" className="btn btn-outline">{t("hero.cta_work")}</TransitionLink>
                <TransitionLink href="/services" className="btn bg-glass-bg border border-glass-border backdrop-blur-md hover:bg-glass-bg/20 transition-all font-semibold rounded-full px-10 py-4">
                  {t("hero.cta_services")}
                </TransitionLink>
              </div>
            </div>

            <div className="hero-carousel w-full">
              <Swiper
                grabCursor={true}
                effect={"creative"}
                creativeEffect={{
                  prev: { shadow: false, translate: ["-120%", 0, -500] },
                  next: { shadow: false, translate: ["120%", 0, -500] },
                }}
                loop={true}
                speed={1000}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                pagination={{ clickable: true, dynamicBullets: true }}
                modules={[Autoplay, Pagination, EffectCreative]}
                className="mySwiper"
              >
                <SwiperSlide>
                  <div className="image-slide max-w-[500px] aspect-square mx-auto rounded-[30px] overflow-hidden border border-glass-border shadow-2xl relative bg-bg">
                    <Image src="/images/web-design.png" alt="Web Design" fill className="object-cover transition-transform duration-500 hover:scale-105" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="image-slide max-w-[500px] aspect-square mx-auto rounded-[30px] overflow-hidden border border-glass-border shadow-2xl relative bg-bg">
                    <Image src="/images/mobile-app.png" alt="Mobile App" fill className="object-cover transition-transform duration-500 hover:scale-105" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="image-slide max-w-[500px] aspect-square mx-auto rounded-[30px] overflow-hidden border border-glass-border shadow-2xl relative bg-bg">
                    <Image src="/images/branding.png" alt="Branding" fill className="object-cover transition-transform duration-500 hover:scale-105" />
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-24 px-6" id="services">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">{t("nav.services")}</h2>
              <p className="text-muted">{t("services.subtitle")}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Layout, title: t("services.design.title"), desc: t("services.design.description") },
                { icon: Code, title: t("services.code.title"), desc: t("services.code.description") },
                { icon: BarChart, title: t("nav.blog"), desc: t("blog.subtitle") }
              ].map((service, idx) => (
                <div key={idx} className="glass-card p-10 group hover:-translate-y-2 transition-transform duration-500">
                  <service.icon className="w-12 h-12 text-accent mb-6 transition-transform group-hover:scale-110" />
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-muted leading-relaxed">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-24 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold mb-8">
                {t("about.vision.title")}
              </h2>
              <p className="text-xl text-muted mb-10 leading-relaxed">
                {t("about.vision.desc")}
              </p>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-glass-bg flex items-center justify-center rounded-xl border border-glass-border">
                    <Target className="text-accent" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Results Driven</h4>
                    <p className="text-muted max-w-md">Our strategies are backed by data and focused on your ROI.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-glass-bg flex items-center justify-center rounded-xl border border-glass-border">
                    <ShieldCheck className="text-accent" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Reliability</h4>
                    <p className="text-muted max-w-md">Zero downtime deployments and 24/7 dedicated support.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative aspect-square max-w-[600px] w-full mx-auto rounded-[40px] overflow-hidden glass-card p-0 lg:p-0">
              <Image src="/images/marketing.png" alt="Strategy" fill className="object-cover opacity-80" />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
