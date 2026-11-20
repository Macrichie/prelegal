"use client";

import { useState, useRef, useEffect } from "react";
import { sendChatMessage, ChatMessage } from "@/lib/api";

interface NdaChatProps {
  onFieldsExtracted: (fields: Record<string, string>) => void;
}

export default function NdaChat({ onFieldsExtracted }: NdaChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const hasInitialized = useRef(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;
    getInitialGreeting();
  }, []);

  async function getInitialGreeting() {
    setIsLoading(true);
    setError(null);
    try {
      const res = await sendChatMessage([
        { role: "user", content: "Hi, I'd like to create a Mutual NDA." },
      ]);
      setMessages([
        { role: "user", content: "Hi, I'd like to create a Mutual NDA." },
        { role: "assistant", content: res.reply },
      ]);
      if (Object.keys(res.extracted_fields).length > 0) {
        onFieldsExtracted(res.extracted_fields);
      }
    } catch {
      setError("Failed to connect to AI assistant. Is the backend running?");
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  }

  async function handleSend() {
    const text = input.trim();
    if (!text || isLoading) return;

    const newMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: text },
    ];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      const res = await sendChatMessage(newMessages);
      setMessages([
        ...newMessages,
        { role: "assistant", content: res.reply },
      ]);
      if (Object.keys(res.extracted_fields).length > 0) {
        onFieldsExtracted(res.extracted_fields);
      }
    } catch {
      setError("Failed to get a response. Please try again.");
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 min-h-0">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-lg px-4 py-2.5 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-800"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-100 rounded-lg px-4 py-2.5 text-sm text-slate-500">
              <span className="inline-flex gap-1">
                <span className="animate-bounce" style={{ animationDelay: "0ms" }}>.</span>
                <span className="animate-bounce" style={{ animationDelay: "150ms" }}>.</span>
                <span className="animate-bounce" style={{ animationDelay: "300ms" }}>.</span>
              </span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 mb-3 text-xs text-red-700">
          {error}
        </div>
      )}

      <div className="flex gap-2 items-end">
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          rows={1}
          className="flex-1 resize-none rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={isLoading}
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </div>
    </div>
  );
}
