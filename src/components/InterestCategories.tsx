
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, Tag } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface InterestCategoriesProps {
  suggestedInterests: string[];
  onInterestsSelected: (selectedInterests: string[]) => void;
}

const InterestCategories = ({ suggestedInterests, onInterestsSelected }: InterestCategoriesProps) => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const { toast } = useToast();

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = () => {
    if (selectedInterests.length === 0) {
      toast({
        title: "Selection Required",
        description: "Please select at least one interest category",
        variant: "destructive",
      });
      return;
    }

    onInterestsSelected(selectedInterests);
  };

  return (
    <Card className="w-full max-w-md mx-auto border-2 border-muted transition-all hover:border-tiktok-blue/20">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <Tag className="h-5 w-5 mr-2 text-tiktok-red" />
          Select Interest Categories
        </CardTitle>
        <CardDescription>
          Choose the interests that best match your product
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {suggestedInterests.map((interest) => (
            <div key={interest} className="flex items-start space-x-2">
              <Checkbox 
                id={`interest-${interest}`}
                checked={selectedInterests.includes(interest)}
                onCheckedChange={() => handleInterestToggle(interest)}
                className="border-tiktok-blue data-[state=checked]:bg-tiktok-blue data-[state=checked]:text-primary-foreground mt-0.5"
              />
              <label
                htmlFor={`interest-${interest}`}
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {interest}
              </label>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-tiktok-blue to-tiktok-red hover:opacity-90 transition-opacity"
        >
          <span className="flex items-center">
            Continue <ArrowRight className="ml-2 h-4 w-4" />
          </span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default InterestCategories;
