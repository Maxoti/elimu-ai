import { useState } from "react";
import { SYSTEM_PROMPT } from "./data/systemPrompt";
import { MODES } from "./data/constant";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Mode {
  id: string;
  label: string;
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [xp, setXp] = useState<number>(0);

  const sendMessage = async (text: string, mode: string): Promise<void> => {
    if (!text?.trim() || loading) return;

    const modeLabel = (MODES as Mode[]).find((m) => m.id === mode)?.label;
    const modeContext = `[Student selected mode: ${modeLabel}] `;

    const newMessages: Message[] = [...messages, { role: "user", content: text.trim() }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: [
            { role: "user", content: modeContext + newMessages[0].content },
            ...newMessages.slice(1),
          ],
        }),
      });

      const data = await response.json();
      const reply: string =
        data.content?.[0]?.text ||
        "Samahani, kuna tatizo. Jaribu tena! (Sorry, there was an error. Try again!)";

      setMessages([...newMessages, { role: "assistant", content: reply }]);
      setXp((prev: number) => prev + 10);
    } catch {
      setMessages([...newMessages, {
        role: "assistant",
        content: "Connection issue! Check your internet and try again. Usikate tamaa! (Don't give up!)",
      }]);
    } finally {
      setLoading(false);
    }
  };

  return { messages, loading, xp, sendMessage };
}