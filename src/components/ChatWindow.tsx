"use client";

import { Button } from "@/components/ui/button";
import ChatRoom from "./ChatRoom";
import { X } from "lucide-react";
import { mentorProfiles } from "@/data/mentors";

interface ChatWindowProps {
  chat: { id: string; expanded: boolean };
  onToggle: (id: string) => void;
  onClose: (id: string) => void;
}

export default function ChatWindow({ chat, onToggle, onClose }: ChatWindowProps) {
  const mentor = mentorProfiles.find((p) => p.key === chat.id);

  if (!mentor) return null;

  return (
    <div
      className={`flex flex-col rounded-t-lg shadow-lg overflow-hidden transition-all duration-300 border
        ${chat.expanded ? "w-80 h-96" : "w-80 h-14"}
        bg-white text-black border-gray-300`}
    >
      {/* Header: Always visible */}
      <div
        className="flex justify-between items-center p-3 border-b bg-gray-100 border-gray-300 cursor-pointer"
        onClick={() => onToggle(chat.id)}
      >
        <div className="flex items-center gap-2 relative">
          <img
            src={mentor.avatar}
            alt={mentor.displayName}
            className="w-8 h-8 rounded-full"
          />
          <span className="absolute bottom-0 left-6 block w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full breathing"></span>
          <span className="font-medium">{mentor.displayName}</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation(); // prevent toggling when clicking close
            onClose(chat.id);
          }}
          className="text-gray-600 hover:text-gray-900"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Chat body: show only when expanded */}
      {chat.expanded && (
        <div className="flex-1 overflow-hidden transition-all duration-300">
          <ChatRoom mentorId={chat.id} onBack={() => onClose(chat.id)} />
        </div>
      )}
    </div>
  );
}
