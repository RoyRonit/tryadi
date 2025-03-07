
import React, { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChatMessage from "./ChatMessage";
import { toast } from "sonner";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { isValidUrl, scrapeWebsite, type ScrapedData } from "@/utils/scrapeService";

interface Message {
  text: string | object;
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
      text: "Hello! I'm your TikTok Ad Assistant. Enter a website URL and I'll scrape it for you!",
      isUser: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const url = formData.get('url') as string;
    
    if (!url || !url.trim()) return;

    // Add user message to chat
    const userMessage: Message = {
      text: url,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    
    // Validate URL
    if (!isValidUrl(url)) {
      const errorMessage: Message = {
        text: "Please enter a valid URL (including http:// or https://)",
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
      return;
    }
    
    // Show loading state
    setIsLoading(true);
    toast.info("Scraping website...");
    
    try {
      // Call the scrape service
      const scrapedData: ScrapedData = await scrapeWebsite(url);
      
      // Add assistant response with scraped data
      const assistantMessage: Message = {
        text: scrapedData,
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
      toast.success("Website scraped successfully!");
    } catch (error) {
      console.error("Error scraping website:", error);
      
      // Add error message
      const errorMessage: Message = {
        text: "Sorry, there was an error scraping the website. Please try again.",
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
      toast.error("Failed to scrape website");
    } finally {
      setIsLoading(false);
    }
  };

  const placeholders = [
    "Enter a website URL to scrape...",
    "Try https://example.com",
    "Enter your product website URL...",
    "Enter a URL to analyze for your TikTok campaign...",
    "Enter a competitor's website to analyze...",
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-80 sm:w-96 h-96 bg-background border border-border rounded-lg shadow-lg flex flex-col z-50">
      <div className="p-3 border-b flex justify-between items-center bg-gradient-to-r from-tiktok-blue to-tiktok-red">
        <h3 className="font-medium text-white">Website Scraper</h3>
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
      <div className="p-3 border-t">
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={() => {}}
          onSubmit={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
