import { useState } from "react";
import { mentorProfiles } from "@/data/mentors";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { generateAIResponse } from "@/lib/ai"; // <-- import the Gemini handler

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
    if (!input.trim() || !mentor) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { from: "You", text: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const personaData = mentorProfiles.find((p) => p.key === mentorId);
      if (!personaData) throw new Error("Persona not found for mentor");

      // const aiReply = await generateAIResponse(userMessage, [personaData], 0.8, "default");

      // setMessages((prev) => [
      //   ...prev,
      //   { from: mentor.displayName, text: aiReply }
      // ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { from: mentor.displayName, text: "Oops! AI is busy right now 😅" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!mentor) return null;

  return (
    <div className="flex flex-col h-full max-h-screen">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/30">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[70%] p-2 rounded-lg ${
              m.from === "You"
                ? "bg-blue-500 text-white self-end ml-auto"
                : "bg-muted"
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
