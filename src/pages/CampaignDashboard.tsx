
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarProvider } from "@/components/ui/sidebar";
import { CampaignSidebar } from "@/components/CampaignSidebar";
import { ArrowRight, ChevronRight, Lightbulb, TrendingUp, Zap } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { GravityDemo } from "@/components/ui/gravity-demo";

// Mock chart data for campaign metrics
const generateMockChartData = (dataPoints = 10, initialValue = 100, growthRate = 1.2) => {
  return Array.from({ length: dataPoints }).map((_, index) => {
    const day = index + 1;
    const value = Math.round(initialValue * Math.pow(growthRate, index));
    return { day: `Day ${day}`, value };
  });
};

// Mock campaign data - in a real app, this would come from an API
const campaignData = {
  1: {
    id: 1,
    name: "Yhangry Campaign",
    status: "active",
    chartData: {
      impressions: generateMockChartData(10, 1000, 1.3),
      clicks: generateMockChartData(10, 200, 1.25),
      conversions: generateMockChartData(10, 10, 1.2)
    },
    stats: {
      views: 45872,
      clicks: 3291,
      conversions: 218,
      cost: 1245.67,
      ctr: 7.17,
      cpc: 0.38,
      roas: 3.2
    },
    recommendations: [
      "Increase budget by 15% to maximize ROI",
      "Add 3 new creative variations",
      "Schedule posts between 5-9pm",
      "Focus on audiences with >2% CTR",
      "Extend campaign by 2 weeks"
    ]
  }
};

const chartTypes = [
  { 
    id: "impressions", 
    title: "Daily Impressions", 
    color: "#3b82f6", 
    icon: <TrendingUp className="text-blue-500" /> 
  },
  { 
    id: "clicks", 
    title: "Daily Clicks", 
    color: "#8b5cf6", 
    icon: <Zap className="text-purple-500" /> 
  },
  { 
    id: "conversions", 
    title: "Daily Conversions", 
    color: "#ec4899", 
    icon: <TrendingUp className="text-pink-500" /> 
  }
];

const CampaignDashboard = () => {
  const { id } = useParams<{ id: string }>();
  const campaign = campaignData[Number(id) as keyof typeof campaignData];
  const [currentChartIndex, setCurrentChartIndex] = useState(0);
  const [showPhysics, setShowPhysics] = useState(false);
  const { toast } = useToast();
  
  if (!campaign) {
    return <div className="p-8">Campaign not found</div>;
  }

  const currentChart = chartTypes[currentChartIndex];
  
  const nextChart = () => {
    setCurrentChartIndex((prev) => (prev + 1) % chartTypes.length);
  };

  const handleApplyRecommendations = () => {
    toast({
      title: "Scheduling new campaign",
      description: "Your optimized campaign based on Adi's recommendations will be created soon.",
    });
  };

  const handleScheduleLater = () => {
    toast({
      title: "Reminder scheduled",
      description: "We'll remind you to apply these recommendations later.",
    });
  };

  const togglePhysicsDemo = () => {
    setShowPhysics(prev => !prev);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <CampaignSidebar />
        <div className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">{campaign.name}</h1>
            <p className="text-muted-foreground">Campaign Analytics Dashboard</p>
          </div>

          {showPhysics ? (
            <div className="relative h-[600px] mb-8">
              <Button 
                onClick={togglePhysicsDemo} 
                className="absolute top-2 right-2 z-10 bg-gradient-to-r from-tiktok-blue to-tiktok-red"
              >
                Back to Dashboard
              </Button>
              <Card className="h-full overflow-hidden">
                <GravityDemo />
              </Card>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Performance Graph Card */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {currentChart.icon}
                        {currentChart.title}
                      </CardTitle>
                      <CardDescription>Click to cycle through different metrics</CardDescription>
                    </div>
                    <Button variant="ghost" size="icon" onClick={nextChart}>
                      <ChevronRight />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={campaign.chartData[currentChart.id as keyof typeof campaign.chartData]}
                          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                          <XAxis dataKey="day" />
                          <YAxis />
                          <Tooltip contentStyle={{ backgroundColor: 'white', borderRadius: '8px' }} />
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke={currentChart.color}
                            strokeWidth={3}
                            activeDot={{ r: 8 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* AI Recommendations Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-tiktok-red" />
                      Adi's Recommendations
                    </CardTitle>
                    <CardDescription>Smart suggestions to optimize your campaign</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {campaign.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-tiktok-blue mt-0.5">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Recommendation Action Card */}
              <Card className="bg-muted/40 mb-8">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="font-medium">Would you like to create a new campaign based on Adi's recommendations?</p>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={handleScheduleLater}>
                        Later <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                      <Button 
                        className="bg-gradient-to-r from-tiktok-blue to-tiktok-red hover:opacity-90" 
                        onClick={handleApplyRecommendations}
                      >
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Interactive Physics Demo Card */}
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle>Interactive Physics Demo</CardTitle>
                  <CardDescription>
                    Experience our interactive physics engine that powers engaging ad components
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center pb-6">
                  <Button 
                    onClick={togglePhysicsDemo}
                    className="bg-gradient-to-r from-tiktok-blue to-tiktok-red hover:opacity-90"
                  >
                    Launch Physics Demo
                  </Button>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default CampaignDashboard;
