
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Clock, Zap, TrendingUp, DollarSign, Target } from "lucide-react";
import { Link } from "react-router-dom";
import TryNowModal from "@/components/TryNowModal";

const AutomationCard = ({
  icon: Icon,
  title,
  description,
  onOpenModal,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  onOpenModal: () => void;
}) => {
  return (
    <Card className="border hover:border-muted-foreground/50 transition-all h-full">
      <CardContent className="p-6 flex flex-col h-full">
        {Icon ? (
          <div className="mb-4">
            <Icon className="h-6 w-6 text-muted-foreground" />
          </div>
        ) : null}
        <h3 className="text-lg font-medium mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-auto">{description}</p>
        <div className="flex justify-end mt-6 gap-2">
          <Button 
            variant="default" 
            size="sm"
            onClick={onOpenModal}
            className="bg-gradient-to-r from-tiktok-blue to-tiktok-red hover:opacity-90 transition-opacity"
          >
            Get Onboarded
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const CreateRuleCard = ({ onOpenModal }: { onOpenModal: () => void }) => {
  return (
    <Card className="border hover:border-muted-foreground/50 transition-all h-full cursor-pointer" onClick={onOpenModal}>
      <CardContent className="p-6 flex flex-col items-center justify-center h-full">
        <div className="w-10 h-10 rounded-full bg-background border flex items-center justify-center mb-4">
          <Plus className="h-5 w-5" />
        </div>
        <h3 className="text-lg font-medium">Create a rule</h3>
      </CardContent>
    </Card>
  );
};

const AgentAutomations = () => {
  const [tryNowOpen, setTryNowOpen] = useState(false);
  // This could be replaced with your actual meeting link
  const meetLink = "https://meet.google.com/your-meeting-link";

  const handleOpenModal = () => {
    setTryNowOpen(true);
  };

  const automations = [
    {
      icon: Clock,
      title: "Schedule delivery",
      description: "Turn on your ad at a specific time.",
    },
    {
      icon: Zap,
      title: "Unlock potential",
      description: "Raise the bid for ad groups with the potential to get more results.",
    },
    {
      icon: TrendingUp,
      title: "Enhance performance",
      description: "Increase budget for ads that are performing well.",
    },
    {
      icon: DollarSign,
      title: "Control budget",
      description: "Turn off ads with unexpected high costs.",
    },
    {
      icon: Target,
      title: "Get conversions",
      description: "Raise the bid so ad groups can get more conversions.",
    },
    {
      title: "Boost high performing Maximum Delivery ads",
      description: "Increase the budget for high performing ad groups that use a maximum delivery bid strategy.",
    },
    {
      title: "Boost well performing Cost Cap ads",
      description: "Increase the budget for high performing ad groups that use a cost cap bid strategy.",
    },
    {
      title: "Control cpa",
      description: "Turn off underperforming ad groups.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Agent Automations</h1>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link to="/pricing">Pricing</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/">Dashboard</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CreateRuleCard onOpenModal={handleOpenModal} />
          {automations.map((automation, index) => (
            <AutomationCard
              key={index}
              icon={automation.icon}
              title={automation.title}
              description={automation.description}
              onOpenModal={handleOpenModal}
            />
          ))}
        </div>
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

export default AgentAutomations;
