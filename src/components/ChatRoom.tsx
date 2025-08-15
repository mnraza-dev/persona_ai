"use client";

import { useState, useRef, useEffect } from "react";
import { mentorProfiles } from "@/data/mentors";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendIcon } from "lucide-react";

interface ChatRoomProps {
  mentorId: string;
  onBack: () => void;
}

export default function ChatRoom({ mentorId, onBack }: ChatRoomProps) {
  const mentor = mentorProfiles.find((p) => p.key === mentorId);
  const [messages, setMessages] = useState<{ from: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!mentor) return null;
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { from: "You", text: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, personaId: mentorId }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { from: mentor.displayName, text: data.reply || "AI did not respond." },
      ]);
    } catch (err) {
      console.error("Fetch AI Error:", err);
      setMessages((prev) => [
        ...prev,
        { from: "AI", text: "Oops, something went wrong. Try again later!" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-h-screen">
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/30 scrollbar-none"
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[100%] w-fit p-2 rounded-lg flex items-start gap-2 ${
              m.from === "You"
                ? "bg-green-200 text-black self-end ml-auto flex-row-reverse"
                : "bg-blue-200 text-black self-start"
            }`}
          >
            {m.from !== "You" && (
              <img
                src={mentor.avatar}
                alt={mentor.displayName}
                className="w-8 h-8 rounded-full"
              />
            )}
            <p className="text-sm">{m.text}</p>
          </div>
        ))}

        {loading && (
          <div className="max-w-[90%] p-2 rounded-lg bg-blue-200 text-sm italic">
            Typing...
          </div>
        )}
      </div>

      <div className="flex gap-2 p-4 border-t">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message ${mentor.displayName.split(" ")[0]}...`}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          disabled={loading}
        />

        <Button
          onClick={sendMessage}
          disabled={loading}
          className="bg-black dark:bg-gray-900 dark:hover:bg-gray-800 text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <SendIcon className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
