
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight, DollarSign } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Slider } from "@/components/ui/slider";

interface BudgetInputProps {
  onBudgetSet: (budget: number) => void;
}

const BudgetInput = ({ onBudgetSet }: BudgetInputProps) => {
  const [budget, setBudget] = useState<number>(500);
  const { toast } = useToast();

  const handleSubmit = () => {
    if (budget <= 0) {
      toast({
        title: "Invalid Budget",
        description: "Please enter a budget greater than zero",
        variant: "destructive",
      });
      return;
    }

    onBudgetSet(budget);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value.replace(/[^0-9]/g, ""));
    setBudget(isNaN(value) ? 0 : value);
  };

  const handleSliderChange = (value: number[]) => {
    setBudget(value[0]);
  };

  return (
    <Card className="w-full max-w-md mx-auto border-2 border-muted transition-all hover:border-tiktok-blue/20">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <DollarSign className="h-5 w-5 mr-2 text-tiktok-red" />
          Set Campaign Budget
        </CardTitle>
        <CardDescription>
          Define your total spending for this TikTok campaign
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="relative">
            <DollarSign className="h-4 w-4 absolute left-3 top-2.5 text-muted-foreground" />
            <Input
              value={budget ? budget.toString() : ""}
              onChange={handleInputChange}
              className="pl-8"
              inputMode="numeric"
              pattern="[0-9]*"
            />
          </div>
          
          <div className="pt-4">
            <Slider
              value={[budget]}
              min={100}
              max={10000}
              step={100}
              onValueChange={handleSliderChange}
              className="[&_[role=slider]]:bg-tiktok-red"
            />
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>$100</span>
              <span>$10,000+</span>
            </div>
          </div>
        </div>
        
        <div className="bg-muted/50 p-3 rounded-lg">
          <h4 className="text-sm font-medium mb-2">Estimated results based on your budget:</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Estimated reach:</span>
              <span className="font-medium">{Math.floor(budget * 100).toLocaleString()} - {Math.floor(budget * 300).toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Estimated clicks:</span>
              <span className="font-medium">{Math.floor(budget * 5).toLocaleString()} - {Math.floor(budget * 15).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-tiktok-blue to-tiktok-red hover:opacity-90 transition-opacity"
        >
          <span className="flex items-center">
            Review Campaign <ArrowRight className="ml-2 h-4 w-4" />
          </span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BudgetInput;
