"use client";

import { useState, useEffect } from "react";
import MentorSelect from "@/components/MentorSelect";
import ChatWindow from "@/components/ChatWindow";
import { useTheme } from "next-themes";
import { Typewriter } from "react-simple-typewriter";

export default function ChatContainer() {
  const [selectedMentors, setSelectedMentors] = useState<string[]>([]);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const logoGradient = mounted
    ? theme === "dark"
      ? "bg-gradient-to-r from-cyan-300 to-yellow-400"
      : "bg-gradient-to-r from-blue-400 to-red-600"
    : ""; 

  const [openChats, setOpenChats] = useState<{ id: string; expanded: boolean }[]>([]);

  const handleMentorSelect = (mentorId: string) => {
    if (!openChats.some((c) => c.id === mentorId)) {
      setOpenChats((prev) => [...prev, { id: mentorId, expanded: true }]);
      setSelectedMentors((prev) => [...prev, mentorId]);
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
    setSelectedMentors((prev) => prev.filter((id) => id !== mentorId));
  };

  return (
    <div className="min-h-screen p-6 max-w-6xl mx-auto bg-background text-foreground">
      <h1
        className={`font-thin pt-12 text-4xl leading-1.5 text-center ${logoGradient} bg-clip-text text-transparent`}
      >
        Choose Your
        <span>
          <span className="whitespace-nowrap ml-2 text-3xl font-semibold">
            {mounted && (
              <Typewriter
                words={["AI Buddies", "AI Companions", "AI Friends"]}
                loop={false}
                cursor
                cursorStyle="|"
                typeSpeed={200}
                deleteSpeed={100}
                delaySpeed={2000}
              />
            )}
          </span>
          <span> and Start Chatting</span>
        </span>
      </h1>

      <div className="text-center text-xl font-thin dark:text-gray-200 ml-2">
        Select a mentor to begin chatting
      </div>

      <MentorSelect onSelect={handleMentorSelect} selectedMentors={selectedMentors} />

      {/* Render chat windows side by side */}
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
          <ChatWindow chat={chat} onToggle={toggleChat} onClose={closeChat} />
        </div>
      ))}
    </div>
  );
}
