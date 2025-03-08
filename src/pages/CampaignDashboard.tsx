
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarProvider } from "@/components/ui/sidebar";
import { CampaignSidebar } from "@/components/CampaignSidebar";
import { ArrowRight, ChevronRight, Lightbulb, Repeat, TrendingUp, Zap } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Mock campaign data - in a real app, this would come from an API
const campaignData = {
  1: {
    id: 1,
    name: "Yhangy Campaign",
    status: "active",
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
      "Increase budget by 15% to capitalize on high-performing audience segments",
      "Add 3 new creative variations based on top performing content",
      "Schedule posts between 5-9pm to maximize engagement",
      "Narrow targeting to focus on audiences with >2% CTR",
      "Extend campaign duration by 2 weeks to leverage current momentum",
      "Add custom tracking code to better measure conversion value"
    ]
  }
};

const statsViews = [
  {
    title: "Performance Overview",
    metrics: [
      { name: "Views", value: "45,872", icon: <TrendingUp className="text-tiktok-blue" /> },
      { name: "Clicks", value: "3,291", icon: <Zap className="text-tiktok-blue" /> },
      { name: "Conversions", value: "218", icon: <Repeat className="text-tiktok-red" /> }
    ]
  },
  {
    title: "Cost Metrics",
    metrics: [
      { name: "Total Cost", value: "$1,245.67", icon: <TrendingUp className="text-tiktok-blue" /> },
      { name: "Cost per Click", value: "$0.38", icon: <Zap className="text-tiktok-blue" /> },
      { name: "ROAS", value: "3.2x", icon: <Repeat className="text-tiktok-red" /> }
    ]
  }
];

const CampaignDashboard = () => {
  const { id } = useParams<{ id: string }>();
  const campaign = campaignData[Number(id) as keyof typeof campaignData];
  const [currentStatsView, setCurrentStatsView] = useState(0);
  const { toast } = useToast();
  
  if (!campaign) {
    return <div className="p-8">Campaign not found</div>;
  }

  const nextStatsView = () => {
    setCurrentStatsView((prev) => (prev + 1) % statsViews.length);
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

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <CampaignSidebar />
        <div className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">{campaign.name}</h1>
            <p className="text-muted-foreground">Campaign Analytics Dashboard</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Performance Metrics Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>{statsViews[currentStatsView].title}</CardTitle>
                  <CardDescription>Click to view different metrics</CardDescription>
                </div>
                <Button variant="ghost" size="icon" onClick={nextStatsView}>
                  <ChevronRight />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {statsViews[currentStatsView].metrics.map((metric) => (
                    <div key={metric.name} className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
                      <div className="flex items-center gap-3">
                        {metric.icon}
                        <span>{metric.name}</span>
                      </div>
                      <span className="font-bold">{metric.value}</span>
                    </div>
                  ))}
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
                <ul className="space-y-2">
                  {campaign.recommendations.slice(0, 6).map((rec, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-tiktok-blue mt-1">•</span>
                      <span className="text-sm">{rec}</span>
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
        </div>
      </div>
    </SidebarProvider>
  );
};

export default CampaignDashboard;
