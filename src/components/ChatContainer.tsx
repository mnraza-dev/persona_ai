import { useState } from "react";
import ChatWindow from "./ChatWindow";
import MentorSelect from "@/components/MentorSelect";
import { useTheme } from "next-themes";

export default function ChatContainer() {
  const [openChats, setOpenChats] = useState<
    { id: string; expanded: boolean }[]
  >([]);

  const handleMentorSelect = (mentorId: string) => {
    if (!openChats.some((c) => c.id === mentorId)) {
      setOpenChats((prev) => [...prev, { id: mentorId, expanded: true }]);
    } else {
      setOpenChats((prev) =>
        prev.map((c) =>
          c.id === mentorId ? { ...c, expanded: true } : c
        )
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
  const { theme } = useTheme();
  const logoGradient =
    theme === "dark"
      ? "bg-gradient-to-r from-cyan-300 to-yellow-400"
      : "bg-gradient-to-r from-blue-400 to-red-600";

  return (
    <div className="min-h-screen mt-20 p-6 max-w-6xl mx-auto bg-background text-foreground">
      <h1 className={` mt-8 ${logoGradient} bg-clip-text text-5xl text-transparent hover:opacity-90 transition-opacity animate-pulse text-center `}
        >
        Choose Your Mentor to Start Chat
      </h1>
      <MentorSelect onSelect={handleMentorSelect} />

      {/* Bottom-right Chat Stack */}
      <div className="fixed bottom-4 right-4 flex space-x-2 z-50">
        {openChats.map((chat) => (
          <ChatWindow
            key={chat.id}
            chat={chat}
            onToggle={toggleChat}
            onClose={closeChat}
          />
        ))}
      </div>
    </div>
  );
}
