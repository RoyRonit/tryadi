
import React from "react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp?: string;
}

const ChatMessage = ({ message, isUser, timestamp }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex mb-4",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-lg px-4 py-2",
          isUser
            ? "bg-gradient-to-r from-tiktok-blue to-tiktok-red text-white"
            : "bg-muted"
        )}
      >
        <p className="text-sm">{message}</p>
        {timestamp && (
          <p className="text-xs opacity-70 mt-1">{timestamp}</p>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
