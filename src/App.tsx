import { useState } from "react";
import { useChat } from "./useChat";
import { MODES, SUGGESTIONS, getDailyQuote } from "./data/constant";

const quote = getDailyQuote();

export default function App() {
  const [mode, setMode] = useState("homework");
  const { messages, loading, xp, sendMessage } = useChat();
  const [input, setInput] = useState("");

  const handleSend = () => {
    sendMessage(input, mode);
    setInput("");
  };

  return (
    <div className="app">
      <header>
        <h1> Elimu AI</h1>
        <p className="quote">"{quote.quote}" — {quote.author}</p>
        <p className="xp">XP: {xp}</p>
      </header>

      <div className="modes">
        {MODES.map((m) => (
          <button
            key={m.id}
            className={mode === m.id ? "mode active" : "mode"}
            onClick={() => setMode(m.id)}
            style={{ borderColor: m.color }}
          >
            {m.emoji} {m.label}
          </button>
        ))}
      </div>

      <div className="suggestions">
        {SUGGESTIONS[mode as keyof typeof SUGGESTIONS].map((s, i) => (
          <button key={i} className="suggestion" onClick={() => sendMessage(s, mode)}>
            {s}
          </button>
        ))}
      </div>

      <div className="messages">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.role}`}>
            {msg.content}
          </div>
        ))}
        {loading && <div className="message assistant">Elimu AI inafikiria... </div>}
      </div>

      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Uliza swali lako hapa... (Ask your question here)"
        />
        <button onClick={handleSend} disabled={loading}>Send</button>
      </div>
    </div>
  );
}