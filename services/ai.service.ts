/**
 * Sends a chat question to the internal Next.js streaming chat assistant.
 * Uses a ReadableStream to stream the text response back in real-time.
 */
export async function askAssistantStream(
    message: string,
    onChunk: (chunk: string) => void
): Promise<void> {
    const API_URL = "/api/chat";
    
    // Set up a 30-second request timeout controller
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message }),
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            if (response.status >= 500) {
                throw new Error("Server error");
            }
            throw new Error(`HTTP error: ${response.status}`);
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        if (!reader) {
            throw new Error("Response body is not readable");
        }

        let accumulatedText = "";
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            accumulatedText += decoder.decode(value, { stream: true });
            onChunk(accumulatedText);
        }
    } catch (error: any) {
        clearTimeout(timeoutId);
        console.error("Error in askAssistantStream:", error);

        let errorMessage = "Unable to contact the AI assistant server. Please try again.";

        if (error.name === "AbortError") {
            errorMessage = "Request timed out. The server took too long to respond. Please try again.";
        } else if (error.message === "Server error") {
            errorMessage = "Internal server error. The AI server is experiencing issues. Please try again later.";
        } else if (error.message.includes("Failed to fetch") || error.name === "TypeError") {
            errorMessage = "Network error. Please verify the backend service is running and you are online.";
        }

        onChunk(errorMessage);
    }
}
