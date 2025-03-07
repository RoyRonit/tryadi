
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Globe } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface WebsiteInputProps {
  onWebsiteSubmit: (url: string) => void;
}

const WebsiteInput = ({ onWebsiteSubmit }: WebsiteInputProps) => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple URL validation
    if (!url.trim()) {
      toast({
        title: "URL Required",
        description: "Please enter a product website URL",
        variant: "destructive",
      });
      return;
    }
    
    let validUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      validUrl = 'https://' + url;
    }
    
    setIsLoading(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsLoading(false);
      onWebsiteSubmit(validUrl);
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md mx-auto border-2 border-muted transition-all hover:border-tiktok-blue/20">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <Globe className="h-5 w-5 mr-2 text-tiktok-blue" />
            Enter Product Website
          </CardTitle>
          <CardDescription>
            We'll analyze your website to suggest relevant interest categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              placeholder="e.g., yourproduct.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-tiktok-blue to-tiktok-red hover:opacity-90 transition-opacity"
          >
            {isLoading ? (
              <span className="flex items-center">
                <span className="mr-2 animate-pulse-slow">Analyzing Website</span>
                <span className="h-2 w-2 bg-white rounded-full animate-pulse-slow"></span>
                <span className="mx-0.5 h-2 w-2 bg-white rounded-full animate-pulse-slow" style={{ animationDelay: "0.2s" }}></span>
                <span className="h-2 w-2 bg-white rounded-full animate-pulse-slow" style={{ animationDelay: "0.4s" }}></span>
              </span>
            ) : (
              <span className="flex items-center">
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </span>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default WebsiteInput;
