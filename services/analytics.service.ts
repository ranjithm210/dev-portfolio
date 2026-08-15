export interface TrafficData {
    date: string;
    views: number;
    interactions: number;
}

export interface SkillQuery {
    skill: string;
    queries: number;
    trend: "up" | "stable" | "down";
}

export interface RecruiterMetric {
    title: string;
    value: string;
    change: string;
    description: string;
}

export async function fetchTrafficStats(): Promise<TrafficData[]> {
    return [
        { date: "May 21", views: 120, interactions: 45 },
        { date: "May 22", views: 185, interactions: 62 },
        { date: "May 23", views: 240, interactions: 95 },
        { date: "May 24", views: 190, interactions: 78 },
        { date: "May 25", views: 310, interactions: 140 },
        { date: "May 26", views: 420, interactions: 195 },
        { date: "May 27", views: 530, interactions: 245 },
    ];
}

export async function fetchSkillSearchTrends(): Promise<SkillQuery[]> {
    return [
        { skill: "Next.js App Router", queries: 142, trend: "up" },
        { skill: "Framer Motion Animations", queries: 120, trend: "up" },
        { skill: "Zustand State Stores", queries: 95, trend: "up" },
        { skill: "Tailwind CSS Styling", queries: 88, trend: "stable" },
        { skill: "TypeScript Typing", queries: 76, trend: "stable" },
    ];
}

export async function fetchRecruiterMetrics(): Promise<RecruiterMetric[]> {
    return [
        {
            title: "Total Recruiter Visits",
            value: "1,995",
            change: "+28% this week",
            description: "Unique recruiter sessions verified via email/IP patterns."
        },
        {
            title: "AI Assistant Queries",
            value: "860",
            change: "+40% active rate",
            description: "Chatbot interactions streaming portfolio questions."
        },
        {
            title: "Project Live Demos Opened",
            value: "345",
            change: "18% click-through",
            description: "Clicks to GitHub repositories and live platform previews."
        }
    ];
}
