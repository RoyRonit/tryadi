
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Check, X, DollarSign, Clock, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import TryNowModal from "@/components/TryNowModal";

const Pricing = () => {
  const [tryNowOpen, setTryNowOpen] = useState(false);
  // Correct Google Meet link
  const meetLink = "https://meet.google.com/gxw-ehdh-wqb";

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/20 py-12 px-4">
      {/* Header */}
      <div className="container mx-auto text-center max-w-3xl mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          &quot;It&apos;s like a full-service media buying team, but way cheaper&quot;
        </h1>
      </div>

      {/* Pricing Cards */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mb-12">
        {/* Traditional Agencies Card */}
        <Card className="border-2 border-muted hover:border-muted-foreground/50 transition-all">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-center mb-2">
              <DollarSign className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold text-center">Traditional Agencies</h3>
            <div className="text-center">
              <p className="text-2xl font-bold">$8K-$12K<span className="text-sm font-normal text-muted-foreground">/month</span></p>
              <p className="text-sm text-muted-foreground">Plus 8-10% of media spend</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              {[
                "Complex, time-consuming forms",
                "Multiple stakeholders and approvals",
                "Slow campaign launches",
                "Hidden fees and markups",
                "Limited transparency",
                "Expensive overhead costs"
              ].map((item, index) => (
                <div key={index} className="flex items-start">
                  <X className="h-5 w-5 text-destructive mr-2 shrink-0 mt-0.5" />
                  <p className="text-sm">{item}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground pt-4 italic text-center">
              Too costly for growing businesses
            </p>
          </CardContent>
        </Card>

        {/* Do It Yourself Card */}
        <Card className="border-2 border-muted hover:border-muted-foreground/50 transition-all">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-center mb-2">
              <Clock className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold text-center">Doing It Yourself</h3>
            <div className="text-center">
              <p className="text-2xl font-bold">Time Intensive</p>
              <p className="text-sm text-muted-foreground">Hours of frustration</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              {[
                "Navigating confusing ad platforms",
                "Learning complex targeting options",
                "Troubleshooting rejected ads",
                "Constant platform updates",
                "Manual optimization",
                "Performance analysis"
              ].map((item, index) => (
                <div key={index} className="flex items-start">
                  <X className="h-5 w-5 text-destructive mr-2 shrink-0 mt-0.5" />
                  <p className="text-sm">{item}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground pt-4 italic text-center">
              Drains your time and energy
            </p>
          </CardContent>
        </Card>

        {/* AI Media Buying Agent Card */}
        <Card className="border-2 relative border-tiktok-blue shadow-lg hover:shadow-xl transition-all">
          <div className="absolute -top-3 right-4 bg-tiktok-red text-white text-xs font-bold px-3 py-1 rounded-full">
            Best Value
          </div>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-center mb-2">
              <Zap className="h-8 w-8 text-tiktok-blue" />
            </div>
            <h3 className="text-xl font-bold text-center">Our AI Media Buying Agent</h3>
            <div className="text-center">
              <p className="text-2xl font-bold text-tiktok-red">$500<span className="text-sm font-normal text-muted-foreground">/month</span></p>
              <p className="text-sm text-muted-foreground">Starting at</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              {[
                "AI-powered campaign creation",
                "0% commission on spend up to $250,000",
                "Only 5% on spend above $250,000",
                "Automated optimization across platforms",
                "Real-time performance tracking",
                "Custom audience targeting",
                "24/7 campaign monitoring"
              ].map((item, index) => (
                <div key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-tiktok-blue mr-2 shrink-0 mt-0.5" />
                  <p className="text-sm">{item}</p>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="pt-2 pb-6 flex justify-center">
            <Button 
              className="w-full max-w-xs bg-gradient-to-r from-tiktok-blue to-tiktok-red hover:opacity-90 transition-opacity"
              onClick={() => setTryNowOpen(true)}
            >
              Get Started
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Bottom CTA */}
      <div className="container mx-auto text-center max-w-3xl">
        <p className="text-lg mb-8">
          Alternatives are expensive or time-consuming. Our AI Media Buying Agent is fast, affordable, and effective.
        </p>
        <Button 
          variant="outline" 
          size="lg"
          className="border-2 border-tiktok-red text-tiktok-red hover:bg-tiktok-red hover:text-white transition-colors"
          onClick={() => setTryNowOpen(true)}
        >
          Try Risk-Free for 14 Days
        </Button>
      </div>

      {/* TryNow Modal */}
      <TryNowModal 
        open={tryNowOpen} 
        onOpenChange={setTryNowOpen} 
        meetLink={meetLink}
      />
    </div>
  );
};

export default Pricing;
