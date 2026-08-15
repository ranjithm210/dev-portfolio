import { create } from "zustand";

export interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: string;
}

interface ChatbotState {
    isOpen: boolean;
    messages: Message[];
    isLoading: boolean;
    toggleChat: () => void;
    openChat: () => void;
    closeChat: () => void;
    addMessage: (message: Omit<Message, "id" | "timestamp">) => void;
    updateLastMessage: (content: string) => void;
    setLoading: (loading: boolean) => void;
    clearMessages: () => void;
}

export const useChatbotStore = create<ChatbotState>((set) => ({
    isOpen: false,
    messages: [
        {
            id: "welcome",
            role: "assistant",
            content: "Hello! I am Ranjith's AI Assistant. Ask me anything about his technical stack, key projects, frontend roadmap compliance, or work history!",
            timestamp: new Date().toISOString(),
        },
    ],
    isLoading: false,
    toggleChat: () => set((state) => ({ isOpen: !state.isOpen })),
    openChat: () => set({ isOpen: true }),
    closeChat: () => set({ isOpen: false }),
    addMessage: (msg) =>
        set((state) => ({
            messages: [
                ...state.messages,
                {
                    ...msg,
                    id: Math.random().toString(36).substring(7),
                    timestamp: new Date().toISOString(),
                },
            ],
        })),
    updateLastMessage: (content) =>
        set((state) => {
            const updatedMessages = [...state.messages];
            if (updatedMessages.length > 0) {
                const lastMsg = updatedMessages[updatedMessages.length - 1];
                if (lastMsg.role === "assistant") {
                    updatedMessages[updatedMessages.length - 1] = {
                        ...lastMsg,
                        content: content,
                    };
                }
            }
            return { messages: updatedMessages };
        }),
    setLoading: (loading) => set({ isLoading: loading }),
    clearMessages: () => set({ messages: [] }),
}));
