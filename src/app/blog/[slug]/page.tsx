"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/layout/CustomCursor";
import BackgroundGlow from "@/components/layout/BackgroundGlow";
import Image from "next/image";
import { Twitter, Linkedin, Link as LinkIcon, Loader2 } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";
import { blogService, DevToArticle } from "@/lib/blogService";

export default function BlogDetailPage() {
    const { t } = useTranslation();
    const params = useParams();
    const slug = params.slug as string;

    const [article, setArticle] = useState<DevToArticle | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchArticle = async () => {
            if (!slug) return;
            setIsLoading(true);
            const data = await blogService.getArticleBySlug(slug);
            setArticle(data);
            setIsLoading(false);
        };
        fetchArticle();
    }, [slug]);

    return (
        <>
            <CustomCursor />
            <BackgroundGlow />
            <Navbar />

            <main className="pt-32 pb-20">
                <article className="px-6">
                    <div className="max-w-4xl mx-auto">
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-40 gap-4">
                                <Loader2 className="w-12 h-12 text-accent animate-spin" />
                                <span className="text-muted font-bold tracking-widest uppercase text-sm">Decoding Story...</span>
                            </div>
                        ) : article ? (
                            <>
                                <header className="mb-12 animate-in fade-in slide-in-from-bottom-5 duration-1000">
                                    <span className="text-gradient font-bold tracking-widest text-sm mb-4 block uppercase border-b border-glass-border pb-4">
                                        {(Array.isArray(article.tag_list) ? article.tag_list.join(" — ") : "")} — {new Date(article.published_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </span>
                                    <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-[1.2]">
                                        {article.title}
                                    </h1>
                                </header>

                                <div className="relative aspect-[21/9] w-full rounded-[40px] overflow-hidden border border-glass-border shadow-2xl mb-16 animate-in zoom-in-95 duration-1000">
                                    <Image
                                        src={article.cover_image || "/images/web-design.png"}
                                        alt={article.title}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>

                                <div
                                    className="prose prose-lg max-w-none text-text leading-relaxed space-y-8
                                        prose-headings:text-text prose-headings:font-bold
                                        prose-p:text-muted prose-p:leading-relaxed
                                        prose-a:text-accent prose-a:no-underline hover:prose-a:underline
                                        prose-strong:text-text prose-code:text-accent
                                        prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:bg-glass-bg prose-blockquote:p-8 prose-blockquote:rounded-r-2xl prose-blockquote:italic"
                                    dangerouslySetInnerHTML={{ __html: article.body_html || "" }}
                                />

                                <footer className="mt-20 pt-10 border-t border-glass-border flex flex-wrap justify-between items-center gap-8">
                                    <div className="flex items-center gap-4">
                                        <div className="relative w-16 h-16 rounded-full overflow-hidden border border-glass-border">
                                            <Image src={article.user.profile_image} alt={article.user.name} fill className="object-cover" />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold">{article.user.name}</h4>
                                            <p className="text-sm text-muted">{t("blog.author_role")}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-6 text-muted">
                                        <button className="hover:text-accent transition-colors"><Twitter /></button>
                                        <button className="hover:text-accent transition-colors"><Linkedin /></button>
                                        <button className="hover:text-accent transition-colors"><LinkIcon /></button>
                                    </div>
                                </footer>
                            </>
                        ) : (
                            <div className="text-center py-40">
                                <h2 className="text-3xl font-bold mb-4">Article Not Found</h2>
                                <p className="text-muted">We couldn't retrieve this specific story from Dev.to.</p>
                            </div>
                        )}
                    </div>
                </article>
            </main>

            <Footer />
        </>
    );
}
