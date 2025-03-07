
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CheckCircle2, Circle } from "lucide-react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [step1Status, setStep1Status] = useState<"pending" | "loading" | "complete">("pending");
  const [step2Status, setStep2Status] = useState<"pending" | "loading" | "complete">("pending");
  const [step3Status, setStep3Status] = useState<"pending" | "loading" | "complete">("pending");

  useEffect(() => {
    // Simulate the loading process
    // Step 1: Gathering info
    setStep1Status("loading");
    const timer1 = setTimeout(() => {
      setStep1Status("complete");
      
      // Step 2: Determining interests
      setStep2Status("loading");
      const timer2 = setTimeout(() => {
        setStep2Status("complete");
        
        // Step 3: Optimizing settings
        setStep3Status("loading");
        const timer3 = setTimeout(() => {
          setStep3Status("complete");
          
          // Move to the next screen after all steps are complete
          const finalTimer = setTimeout(() => {
            onComplete();
          }, 1000);
          
          return () => clearTimeout(finalTimer);
        }, 3000);
        
        return () => clearTimeout(timer3);
      }, 2500);
      
      return () => clearTimeout(timer2);
    }, 2000);
    
    return () => clearTimeout(timer1);
  }, [onComplete]);

  const renderStatusIcon = (status: "pending" | "loading" | "complete") => {
    switch (status) {
      case "pending":
        return <Circle className="h-6 w-6 text-muted-foreground/50" />;
      case "loading":
        return <Loader2 className="h-6 w-6 text-tiktok-blue animate-spin" />;
      case "complete":
        return <CheckCircle2 className="h-6 w-6 text-green-500" />;
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto border-2 border-muted">
      <CardHeader>
        <CardTitle className="text-xl text-center">Setting Up Your Campaign</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8 py-6">
        <div className="flex items-center space-x-4">
          {renderStatusIcon(step1Status)}
          <div className="flex-1">
            <p className="font-medium">Gathering info from your website</p>
            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden mt-2">
              {step1Status !== "pending" && (
                <div 
                  className={`h-full bg-gradient-to-r from-tiktok-blue to-tiktok-red transition-all duration-700 ${
                    step1Status === "complete" ? "w-full" : "animate-pulse w-2/3"
                  }`} 
                />
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {renderStatusIcon(step2Status)}
          <div className="flex-1">
            <p className="font-medium">Determining your user interests</p>
            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden mt-2">
              {step2Status !== "pending" && (
                <div 
                  className={`h-full bg-gradient-to-r from-tiktok-blue to-tiktok-red transition-all duration-700 ${
                    step2Status === "complete" ? "w-full" : "animate-pulse w-2/3"
                  }`} 
                />
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {renderStatusIcon(step3Status)}
          <div className="flex-1">
            <p className="font-medium">Optimizing your campaign settings</p>
            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden mt-2">
              {step3Status !== "pending" && (
                <div 
                  className={`h-full bg-gradient-to-r from-tiktok-blue to-tiktok-red transition-all duration-700 ${
                    step3Status === "complete" ? "w-full" : "animate-pulse w-2/3"
                  }`} 
                />
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoadingScreen;
