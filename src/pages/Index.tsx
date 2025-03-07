
import { useState } from "react";
import AdManagerHeader from "@/components/AdManagerHeader";
import WebsiteInput from "@/components/WebsiteInput";
import InterestCategories from "@/components/InterestCategories";
import CampaignDates from "@/components/CampaignDates";
import BudgetInput from "@/components/BudgetInput";
import CampaignSummary from "@/components/CampaignSummary";
import { generateInterestCategories } from "@/lib/mockData";

// Campaign creation steps
enum Step {
  WebsiteInput = 0,
  InterestCategories = 1,
  CampaignDates = 2,
  BudgetInput = 3,
  CampaignSummary = 4,
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

  const handleWebsiteSubmit = (url: string) => {
    const suggestedInterests = generateInterestCategories(url);
    setCampaignData({
      ...campaignData,
      productUrl: url,
      suggestedInterests,
    });
    setCurrentStep(Step.InterestCategories);
  };

  const handleInterestsSelected = (selectedInterests: string[]) => {
    setCampaignData({
      ...campaignData,
      selectedInterests,
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/20 py-12 px-4">
      <div className="w-full max-w-2xl">
        <AdManagerHeader />

        <div className="relative">
          {currentStep === Step.WebsiteInput && (
            <WebsiteInput onWebsiteSubmit={handleWebsiteSubmit} />
          )}

          {currentStep === Step.InterestCategories && (
            <InterestCategories
              suggestedInterests={campaignData.suggestedInterests}
              onInterestsSelected={handleInterestsSelected}
            />
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
            {Array.from({ length: 5 }).map((_, index) => (
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
    </div>
  );
};

export default Index;
