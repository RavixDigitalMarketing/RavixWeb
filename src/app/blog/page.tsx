"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/layout/CustomCursor";
import BackgroundGlow from "@/components/layout/BackgroundGlow";
import TransitionLink from "@/components/layout/TransitionLink";
import { ArrowRight, Loader2 } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";
import { blogService, DevToArticle } from "@/lib/blogService";
import Image from "next/image";

export default function BlogPage() {
    const { t } = useTranslation();
    const [articles, setArticles] = useState<DevToArticle[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            setIsLoading(true);
            const data = await blogService.getArticles();
            setArticles(data);
            setIsLoading(false);
        };
        fetchArticles();
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
                                {t("blog.title").split(" ").map((word: string, i: number, arr: string[]) => (
                                    i === 1 ? <span key={i} className="text-gradient"> {word}</span> : i === 0 ? word : ` ${word}`
                                ))}
                            </h1>
                            <p className="text-xl text-muted max-w-2xl mx-auto">
                                {t("blog.subtitle")}
                            </p>
                        </div>

                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-20 gap-4">
                                <Loader2 className="w-12 h-12 text-accent animate-spin" />
                                <span className="text-muted font-bold tracking-widest uppercase text-sm">Fetching Insights...</span>
                            </div>
                        ) : articles.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {articles.map((post) => (
                                    <article key={post.id} className="glass-card overflow-hidden flex flex-col group h-full">
                                        <div className="h-56 relative overflow-hidden bg-glass-bg">
                                            {post.cover_image ? (
                                                <Image
                                                    src={post.cover_image}
                                                    alt={post.title}
                                                    fill
                                                    className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 bg-primary-gradient opacity-40" />
                                            )}
                                            <div className="absolute top-4 left-4 flex gap-2">
                                                {Array.isArray(post.tag_list) && post.tag_list.slice(0, 2).map((tag) => (
                                                    <span key={tag} className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-wider border border-white/10">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="p-8 flex flex-col flex-grow">
                                            <span className="text-accent text-sm font-bold tracking-widest mb-4">
                                                {new Date(post.published_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </span>
                                            <h2 className="text-2xl font-bold mb-4 group-hover:text-gradient transition-all line-clamp-2">
                                                {post.title}
                                            </h2>
                                            <p className="text-muted mb-8 flex-grow line-clamp-3">
                                                {post.description}
                                            </p>
                                            <TransitionLink
                                                href={`/blog/${post.slug}`}
                                                className="inline-flex items-center gap-2 font-bold group/link mt-auto"
                                            >
                                                {t("blog.read_more")} <ArrowRight className="w-5 h-5 transition-transform group-hover/link:translate-x-2" />
                                            </TransitionLink>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <p className="text-muted text-xl italic">No articles found on Dev.to yet.</p>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
