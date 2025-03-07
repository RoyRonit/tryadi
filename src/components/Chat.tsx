
import React, { useState, useRef, useEffect } from "react";
import { Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ChatMessage from "./ChatMessage";
import { toast } from "sonner";

interface Message {
  text: string;
  isUser: boolean;
  timestamp: string;
}

interface ChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const Chat = ({ isOpen, onClose }: ChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! I'm your TikTok Ad Assistant. How can I help you with your campaign today?",
      isUser: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      text: inputValue,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage: Message = {
        text: getAssistantResponse(inputValue),
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }, 1000);
  };

  const getAssistantResponse = (userInput: string): string => {
    const userInputLower = userInput.toLowerCase();
    
    if (userInputLower.includes("hello") || userInputLower.includes("hi")) {
      return "Hello! How can I help with your TikTok ad campaign?";
    } else if (userInputLower.includes("interest") || userInputLower.includes("category")) {
      return "Interest categories help target your ads to the right audience. Try to select categories that match your product or service!";
    } else if (userInputLower.includes("budget")) {
      return "Your budget determines how much you'll spend on your campaign. TikTok ads can start with as little as $5 per day!";
    } else if (userInputLower.includes("date") || userInputLower.includes("duration")) {
      return "Campaign dates determine when your ads will run. Choose a timeframe that aligns with your marketing goals.";
    } else if (userInputLower.includes("help")) {
      return "I can help with your TikTok campaign setup! Ask me about interest categories, budget recommendations, or campaign dates.";
    } else {
      return "Thanks for your message! If you have specific questions about your TikTok ad campaign, I'm here to help.";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-80 sm:w-96 h-96 bg-background border border-border rounded-lg shadow-lg flex flex-col z-50">
      <div className="p-3 border-b flex justify-between items-center bg-gradient-to-r from-tiktok-blue to-tiktok-red">
        <h3 className="font-medium text-white">TikTok Ad Assistant</h3>
        <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message.text}
            isUser={message.isUser}
            timestamp={message.timestamp}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage} className="p-3 border-t flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
          className="flex-1"
        />
        <Button type="submit" size="icon" disabled={!inputValue.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default Chat;
