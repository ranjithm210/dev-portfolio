"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, RefreshCw, Sparkles } from "lucide-react";
import { useChatbotStore } from "@/store/chatbotStore";
import { askAssistantStream } from "@/services/ai.service";
import { useTheme } from "@/providers/ThemeProvider";

const SUGGESTIONS = [
    "What are Ranjith's core skills?",
    "Tell me about his featured projects.",
    "What is his professional experience?",
];

export default function AIChatbot() {
    const {
        isOpen,
        messages,
        isLoading,
        closeChat,
        addMessage,
        updateLastMessage,
        setLoading,
        clearMessages,
        toggleChat,
    } = useChatbotStore();

    const { theme } = useTheme();

    const [inputValue, setInputValue] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll on new message
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSendMessage = async (text: string) => {
        if (!text.trim() || isLoading) return;

        setInputValue("");
        // User message
        addMessage({ role: "user", content: text });
        setLoading(true);

        // Assistant dynamic placeholder
        addMessage({ role: "assistant", content: "" });

        await askAssistantStream(text, (chunk) => {
            updateLastMessage(chunk);
        });

        setLoading(false);
    };

    return (
        <>
            {/* AI ASSISTANT FLOATING BUTTON */}
            <div
                className="
                    fixed
                    bottom-6
                    right-6
                    z-50
                    flex
                    flex-col
                    items-end
                    group
                "
            >
                {/* Floating label above the circle */}
                <div
                    className="
                        mb-2
                        mr-2
                        border
                        border-cyan-400/30
                        text-[8px]
                        uppercase
                        font-black
                        tracking-widest
                        px-2
                        py-0.5
                        rounded-md
                        whitespace-nowrap
                        backdrop-blur-md
                        transition-all
                        duration-300
                        opacity-100
                        group-hover:opacity-0
                        group-hover:translate-y-1
                        pointer-events-none
                        shadow-[0_0_15px_rgba(34,211,238,0.15)]
                    "
                    style={{
                        backgroundColor: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(9, 9, 11, 0.05)",
                        color: theme === "dark" ? "#ffffff" : "#000000"
                    }}
                >
                    Ask Bently
                </div>

                <button
                    onClick={toggleChat}
                    className="
                        flex
                        items-center
                        h-14
                        w-14
                        rounded-full
                        border
                        border-cyan-400/30
                        bg-cyan-500/10
                        text-white
                        backdrop-blur-2xl
                        transition-all
                        duration-500
                        ease-in-out
                        group-hover:w-[230px]
                        overflow-hidden
                        p-2.5
                        group-hover:gap-3
                        group-hover:border-cyan-400
                        group-hover:bg-cyan-500/20
                        group-hover:shadow-[0_0_40px_rgba(34,211,238,0.5)]
                    "
                >
                    <div
                        className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-full
                            bg-cyan-400/20
                            text-cyan-400
                            shrink-0
                        "
                    >
                        <Bot size={20} />
                    </div>

                    <div className="text-left opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 whitespace-nowrap overflow-hidden">
                        <p
                            className="
                                text-[9px]
                                uppercase
                                tracking-widest
                                text-cyan-400
                                font-bold
                                leading-none
                                mb-0.5
                            "
                        >
                            Ask Bently
                        </p>

                        <h3
                            className="
                                text-xs
                                font-semibold
                                leading-none
                                text-white
                            "
                        >
                            Ask About Ranjith
                        </h3>
                    </div>
                </button>
            </div>

            <AnimatePresence>
                {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 50 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    className="
                        fixed
                        bottom-20
                        right-6
                        z-50
                        flex
                        h-[460px]
                        w-[320px]
                        flex-col
                        overflow-hidden
                        rounded-[24px]
                        border
                        border-cyan-400/20
                        bg-black/80
                        shadow-[0_0_30px_rgba(34,211,238,0.15)]
                        backdrop-blur-2xl
                        max-w-[calc(100vw-32px)]
                    "
                >
                    {/* Header */}
                    <div
                        className="
                            flex
                            items-center
                            justify-between
                            border-b
                            border-white/10
                            bg-cyan-950/20
                            px-6
                            py-4
                        "
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                                <Bot size={20} />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-white">Ask Bently</h3>
                                <p className="text-[10px] text-cyan-400 flex items-center gap-1 font-semibold">
                                    <Sparkles size={10} /> AI Agent Online
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={closeChat}
                            className="
                                flex
                                h-8
                                w-8
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-white/10
                                text-white/60
                                transition-all
                                hover:bg-white/5
                                hover:text-white
                            "
                        >
                            <X size={16} />
                        </button>
                    </div>

                    {/* Messages List */}
                    <div className="flex-grow overflow-y-auto p-6 space-y-4">
                        {messages.length === 0 ? (
                            <div className="flex h-full flex-col items-center justify-center text-center space-y-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/5 border border-cyan-500/10 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.05)]">
                                    <Bot size={24} />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Bently Assistance</h4>
                                    <p className="text-[10.5px] text-white/50 max-w-[200px] leading-relaxed">
                                        Ask me anything about Ranjith's experience, core stack, or past projects.
                                    </p>
                                </div>
                                <div className="pt-2 w-full max-w-[220px] space-y-2">
                                    {SUGGESTIONS.map((suggestion, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleSendMessage(suggestion)}
                                            className="
                                                w-full
                                                text-left
                                                text-[10px]
                                                px-3
                                                py-2.5
                                                rounded-xl
                                                border
                                                border-white/5
                                                bg-white/[0.02]
                                                text-white/70
                                                hover:border-cyan-500/30
                                                hover:bg-cyan-500/5
                                                hover:text-cyan-400
                                                transition-all
                                                duration-200
                                            "
                                        >
                                            {suggestion}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <>
                                {messages.map((msg, idx) => (
                                    <div
                                        key={idx}
                                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                    >
                                        <div
                                            className={`
                                                max-w-[80%]
                                                rounded-2xl
                                                px-4
                                                py-2.5
                                                text-xs
                                                leading-relaxed
                                                ${msg.role === "user"
                                                    ? "bg-cyan-500 text-black font-semibold rounded-br-none"
                                                    : "bg-white/5 border border-white/10 text-white/80 rounded-bl-none"
                                                }
                                            `}
                                        >
                                            {msg.content === "" && isLoading && idx === messages.length - 1 ? (
                                                <span className="flex items-center gap-1">
                                                    <span className="h-1.5 w-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                                    <span className="h-1.5 w-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                                    <span className="h-1.5 w-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                                </span>
                                            ) : (
                                                msg.content
                                            )}
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </>
                        )}
                    </div>

                    {/* Input Area */}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSendMessage(inputValue);
                        }}
                        className="
                            flex
                            gap-2
                            border-t
                            border-white/10
                            bg-cyan-950/10
                            p-4
                        "
                    >
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Message Bently..."
                            className="
                                flex-grow
                                rounded-xl
                                border
                                border-white/10
                                bg-white/5
                                px-4
                                py-2.5
                                text-xs
                                text-white
                                placeholder-white/35
                                outline-none
                                transition-all
                                focus:border-cyan-500/30
                                focus:bg-cyan-500/[0.02]
                            "
                        />
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            disabled={!inputValue.trim() || isLoading}
                            type="submit"
                            className="
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-full
                                bg-cyan-500
                                text-black
                                transition-all
                                hover:bg-cyan-400
                                disabled:opacity-50
                            "
                        >
                            {isLoading ? (
                                <RefreshCw className="animate-spin" size={16} />
                            ) : (
                                <Send size={16} />
                            )}
                        </motion.button>
                    </form>
                </motion.div>
            )}
        </AnimatePresence>
    </>
    );
}
