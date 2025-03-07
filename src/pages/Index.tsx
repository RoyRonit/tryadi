
import { useState } from "react";
import AdManagerHeader from "@/components/AdManagerHeader";
import WebsiteInput from "@/components/WebsiteInput";
import CampaignDates from "@/components/CampaignDates";
import BudgetInput from "@/components/BudgetInput";
import CampaignSummary from "@/components/CampaignSummary";
import { PlaceholdersAndVanishInputDemo } from "@/components/PlaceholdersAndVanishInputDemo";
import { generateInterestCategories } from "@/lib/mockData";
import Chat from "@/components/Chat";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

// Campaign creation steps
enum Step {
  WebsiteInput = 0,
  CampaignDates = 1,
  BudgetInput = 2,
  CampaignSummary = 3,
}

// Campaign data interface
interface CampaignData {
  productUrl: string;
  suggestedInterests: string[];
  selectedInterests: string[];
  startDate: Date | null;
  endDate: Date | null;
  budget: number | null;
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState<Step>(Step.WebsiteInput);
  const [campaignData, setCampaignData] = useState<CampaignData>({
    productUrl: "",
    suggestedInterests: [],
    selectedInterests: [],
    startDate: null,
    endDate: null,
    budget: null,
  });
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleWebsiteSubmit = (url: string) => {
    const suggestedInterests = generateInterestCategories(url);
    setCampaignData({
      ...campaignData,
      productUrl: url,
      suggestedInterests,
      // Automatically select all suggested interests since we're skipping the interest selection step
      selectedInterests: suggestedInterests,
    });
    setCurrentStep(Step.CampaignDates);
  };

  const handleDatesSelected = (startDate: Date, endDate: Date) => {
    setCampaignData({
      ...campaignData,
      startDate,
      endDate,
    });
    setCurrentStep(Step.BudgetInput);
  };

  const handleBudgetSet = (budget: number) => {
    setCampaignData({
      ...campaignData,
      budget,
    });
    setCurrentStep(Step.CampaignSummary);
  };

  const handleCreateNewCampaign = () => {
    setCampaignData({
      productUrl: "",
      suggestedInterests: [],
      selectedInterests: [],
      startDate: null,
      endDate: null,
      budget: null,
    });
    setCurrentStep(Step.WebsiteInput);
  };

  // Uncomment this to showcase the fancy input demo
  // return <PlaceholdersAndVanishInputDemo />;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/20 py-12 px-4">
      <div className="w-full max-w-2xl">
        <AdManagerHeader />

        <div className="relative">
          {currentStep === Step.WebsiteInput && (
            <WebsiteInput onWebsiteSubmit={handleWebsiteSubmit} />
          )}

          {currentStep === Step.CampaignDates && (
            <CampaignDates onDatesSelected={handleDatesSelected} />
          )}

          {currentStep === Step.BudgetInput && (
            <BudgetInput onBudgetSet={handleBudgetSet} />
          )}

          {currentStep === Step.CampaignSummary && campaignData.startDate && campaignData.endDate && campaignData.budget && (
            <CampaignSummary
              productUrl={campaignData.productUrl}
              selectedInterests={campaignData.selectedInterests}
              startDate={campaignData.startDate}
              endDate={campaignData.endDate}
              budget={campaignData.budget}
              onCreateNewCampaign={handleCreateNewCampaign}
            />
          )}
        </div>

        <div className="mt-8 flex justify-center">
          <div className="flex space-x-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full transition-colors ${
                  index === currentStep
                    ? "bg-gradient-to-r from-tiktok-blue to-tiktok-red"
                    : index < currentStep
                    ? "bg-muted-foreground/70"
                    : "bg-muted-foreground/20"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Chat button */}
      <Button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-4 right-4 rounded-full h-12 w-12 bg-gradient-to-r from-tiktok-blue to-tiktok-red p-0 shadow-lg"
        size="icon"
      >
        <MessageCircle />
      </Button>

      {/* Chat component */}
      <Chat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default Index;
