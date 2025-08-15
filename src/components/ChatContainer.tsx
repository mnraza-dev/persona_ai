"use client";

import { useState } from "react";
import MentorSelect from "@/components/MentorSelect";
import ChatWindow from "@/components/ChatWindow";

export default function ChatContainer() {
  const [openChats, setOpenChats] = useState<{ id: string; expanded: boolean }[]>([]);

  const handleMentorSelect = (mentorId: string) => {
    if (!openChats.some((c) => c.id === mentorId)) {
      setOpenChats((prev) => [...prev, { id: mentorId, expanded: true }]);
    } else {
      setOpenChats((prev) =>
        prev.map((c) => (c.id === mentorId ? { ...c, expanded: true } : c))
      );
    }
  };

  const toggleChat = (mentorId: string) => {
    setOpenChats((prev) =>
      prev.map((c) =>
        c.id === mentorId ? { ...c, expanded: !c.expanded } : c
      )
    );
  };

  const closeChat = (mentorId: string) => {
    setOpenChats((prev) => prev.filter((c) => c.id !== mentorId));
  };

  return (
    <div className="min-h-screen p-6 max-w-6xl mx-auto bg-background text-foreground">
      <h1 className="text-2xl font-bold mb-4">Choose Your Mentor</h1>
      <MentorSelect onSelect={handleMentorSelect} />

      {/* Chat Windows (Bottom Right) */}
      {openChats.map((chat, index) => (
        <div
          key={chat.id}
          style={{
            position: "fixed",
            bottom: "1rem",
            right: `${index * 340 + 16}px`, // 320px width + 20px gap
            zIndex: 50,
          }}
        >
          <ChatWindow
            chat={chat}
            onToggle={toggleChat}
            onClose={closeChat}
          />
        </div>
      ))}
    </div>
  );
}
