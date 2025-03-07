
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Check, RefreshCw, ExternalLink, Users, GraduationCap } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface CampaignSummaryProps {
  productUrl: string;
  selectedInterests: string[];
  startDate: Date;
  endDate: Date;
  budget: number;
  onCreateNewCampaign: () => void;
  ageRange?: string; // Optional age range
  targetGender?: string; // Optional target gender
}

const CampaignSummary = ({
  productUrl,
  selectedInterests,
  startDate,
  endDate,
  budget,
  onCreateNewCampaign,
  ageRange = "18-34", // Default value
  targetGender = "All", // Default value
}: CampaignSummaryProps) => {
  const { toast } = useToast();

  const handleSubmit = () => {
    toast({
      title: "Campaign Created!",
      description: "Your TikTok ad campaign has been successfully created.",
      variant: "default",
    });
  };

  const durationInDays = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  const formatUrl = (url: string) => {
    return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  };

  return (
    <Card className="w-full max-w-md mx-auto border-2 border-tiktok-blue transition-all">
      <CardHeader className="bg-gradient-to-r from-tiktok-blue/10 to-tiktok-red/10">
        <CardTitle className="text-xl flex items-center">
          <Check className="h-5 w-5 mr-2 text-tiktok-red" />
          Campaign Summary
        </CardTitle>
        <CardDescription>
          Review your TikTok ad campaign details
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Product Website</h3>
            <p className="text-sm mt-1 font-medium flex items-center">
              {formatUrl(productUrl)}
              <a
                href={productUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-tiktok-blue hover:text-tiktok-red transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Interest Categories</h3>
            <div className="flex flex-wrap gap-2 mt-1">
              {selectedInterests.map((interest) => (
                <span
                  key={interest}
                  className="text-xs bg-tiktok-blue/10 text-tiktok-blue px-2 py-1 rounded-full"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* New Age Range Section */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Age Range</h3>
            <p className="text-sm mt-1 font-medium flex items-center">
              <GraduationCap className="h-4 w-4 mr-2 text-tiktok-blue" />
              {ageRange}
            </p>
          </div>

          {/* New Gender Section */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Target Gender</h3>
            <p className="text-sm mt-1 font-medium flex items-center">
              <Users className="h-4 w-4 mr-2 text-tiktok-blue" />
              {targetGender}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Campaign Duration</h3>
              <p className="text-sm mt-1 font-medium">{durationInDays} days</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Daily Budget</h3>
              <p className="text-sm mt-1 font-medium">
                ${Math.round((budget / durationInDays) * 100) / 100}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Start Date</h3>
              <p className="text-sm mt-1 font-medium">{format(startDate, "MMM d, yyyy")}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">End Date</h3>
              <p className="text-sm mt-1 font-medium">{format(endDate, "MMM d, yyyy")}</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Total Budget</h3>
            <p className="text-base mt-1 font-bold text-tiktok-red">${budget}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-tiktok-blue to-tiktok-red hover:opacity-90 transition-opacity"
        >
          <span className="flex items-center">Create Campaign</span>
        </Button>
        <Button
          variant="ghost"
          onClick={onCreateNewCampaign}
          className="w-full text-muted-foreground hover:text-foreground"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Start New Campaign
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CampaignSummary;
