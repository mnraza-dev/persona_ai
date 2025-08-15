import { useState } from "react";
import { mentorProfiles } from "@/data/mentors";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { generateAIResponse } from "@/lib/ai"; 
interface ChatRoomProps {
  mentorId: string;
  onBack: () => void;
}
export default function ChatRoom({ mentorId, onBack }: ChatRoomProps) {
  const mentor = mentorProfiles.find((p) => p.key === mentorId);
  const [messages, setMessages] = useState<{ from: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

 const sendMessage = async () => {
  if (!input.trim()) return;

  setMessages((prev) => [...prev, { from: "You", text: input.trim() }]);
  const userMessage = input.trim();
  setInput("");

try {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: input, personaId: mentorId }),
  });
  const data = await res.json();
  setMessages((prev) => [...prev, { from: mentorId, text: data.reply }]);
} catch (err) {
  console.error("Fetch AI Error:", err);
  setMessages((prev) => [
    ...prev,
    { from: "AI", text: "Oops, something went wrong. Try again later!" },
  ]);
}

};


  if (!mentor) return null;

  return (
    <div className="flex flex-col h-full max-h-screen">

      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/30">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[70%] p-2 rounded-lg ${
              m.from === "You"
                ? "bg-green-200 text-black self-end ml-auto"
                : "bg-blue-200 text-black self-start mr-auto"
            }`}
          >
            <p className="text-sm">{m.text}</p>
          </div>
        ))}

        {loading && (
          <div className="max-w-[70%] p-2 rounded-lg bg-muted text-sm italic">
            Typing...
          </div>
        )}
      </div>

      {/* Chat Input */}
      <div className="flex gap-2 p-4 border-t">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message ${mentor.displayName.split(" ")[0]}...`}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          disabled={loading}
        />
        <Button onClick={sendMessage} disabled={loading}>
          Send
        </Button>
      </div>
    </div>
  );
}
