const USERNAME = "ravix";
const API_BASE = "https://dev.to/api";

export interface DevToArticle {
    id: number;
    title: string;
    description: string;
    cover_image: string;
    published_at: string;
    slug: string;
    tag_list: string[];
    user: {
        name: string;
        profile_image: string;
    };
    body_html?: string;
    reading_time_minutes: number;
}

export const blogService = {
    async getArticles(): Promise<DevToArticle[]> {
        try {
            const response = await fetch(`${API_BASE}/articles?username=${USERNAME}&per_page=10`);
            if (!response.ok) throw new Error("Failed to fetch articles");
            return await response.ok ? response.json() : [];
        } catch (error) {
            console.error("Error fetching articles:", error);
            return [];
        }
    },

    async getArticleBySlug(slug: string): Promise<DevToArticle | null> {
        try {
            const response = await fetch(`${API_BASE}/articles/${USERNAME}/${slug}`);
            if (!response.ok) throw new Error("Failed to fetch article details");
            return await response.json();
        } catch (error) {
            console.error("Error fetching article by slug:", error);
            return null;
        }
    }
};
