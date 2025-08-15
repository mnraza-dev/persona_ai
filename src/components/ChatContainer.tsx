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
      prev.map((c) => (c.id === mentorId ? { ...c, expanded: !c.expanded } : c))
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
      <div className="fixed bottom-4 right-4 flex space-x-2 z-50">
        {openChats.map((chat) => (
          <ChatWindow
            key={chat.id}
            chat={chat}               // Pass the full chat object
            onToggle={toggleChat}     // Pass the function directly
            onClose={closeChat}       // Pass the function directly
          />
        ))}
      </div>
    </div>
  );
}
