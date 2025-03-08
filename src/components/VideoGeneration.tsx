
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Video, SkipForward } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface VideoGenerationProps {
  onVideoGenerated: (videoUrl: string) => void;
  onSkip: () => void;
}

const VideoGeneration = ({ onVideoGenerated, onSkip }: VideoGenerationProps) => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast({
        title: "Prompt Required",
        description: "Please enter a description for your video",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate video generation process
    setTimeout(() => {
      setIsGenerating(false);
      // In a real implementation, this would be the URL returned from the video generation API
      const mockVideoUrl = "https://example.com/generated-video.mp4";
      toast({
        title: "Video Generated",
        description: "Your promotional video has been created successfully",
      });
      onVideoGenerated(mockVideoUrl);
    }, 3000);
  };

  return (
    <Card className="w-full max-w-md mx-auto border-2 border-muted transition-all hover:border-tiktok-blue/20">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <Video className="h-5 w-5 mr-2 text-tiktok-blue" />
          Generate Promotional Video
        </CardTitle>
        <CardDescription>
          Create a custom video for your TikTok campaign (optional)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Video Description</label>
          <Input
            placeholder="Describe the video you want to generate..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="p-3 bg-muted/50 rounded-lg">
          <h4 className="text-sm font-medium mb-2">Benefits of custom videos:</h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• 3x higher engagement rates</li>
            <li>• 2x better conversion compared to static images</li>
            <li>• Improved brand awareness and recall</li>
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full bg-gradient-to-r from-tiktok-blue to-tiktok-red hover:opacity-90 transition-opacity"
        >
          {isGenerating ? (
            <span className="flex items-center">
              <span className="mr-2">Generating Video</span>
              <span className="h-2 w-2 bg-white rounded-full animate-pulse-slow"></span>
              <span className="mx-0.5 h-2 w-2 bg-white rounded-full animate-pulse-slow" style={{ animationDelay: "0.2s" }}></span>
              <span className="h-2 w-2 bg-white rounded-full animate-pulse-slow" style={{ animationDelay: "0.4s" }}></span>
            </span>
          ) : (
            <span className="flex items-center">
              Generate Video <ArrowRight className="ml-2 h-4 w-4" />
            </span>
          )}
        </Button>
        <Button
          variant="ghost"
          onClick={onSkip}
          className="w-full text-muted-foreground hover:text-foreground"
        >
          <SkipForward className="mr-2 h-4 w-4" />
          Skip this step
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VideoGeneration;
