
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Calendar as CalendarIcon, ArrowRight } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

interface CampaignDatesProps {
  onDatesSelected: (startDate: Date, endDate: Date) => void;
}

const CampaignDates = ({ onDatesSelected }: CampaignDatesProps) => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!startDate || !endDate) {
      toast({
        title: "Date Selection Required",
        description: "Please select both start and end dates for your campaign",
        variant: "destructive",
      });
      return;
    }

    if (endDate < startDate) {
      toast({
        title: "Invalid Date Range",
        description: "End date cannot be earlier than start date",
        variant: "destructive",
      });
      return;
    }

    onDatesSelected(startDate, endDate);
  };

  return (
    <Card className="w-full max-w-md mx-auto border-2 border-muted transition-all hover:border-tiktok-blue/20">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <CalendarIcon className="h-5 w-5 mr-2 text-tiktok-blue" />
          Set Campaign Dates
        </CardTitle>
        <CardDescription>
          Choose when your TikTok ad campaign will run
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Start Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP") : <span>Select date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                  disabled={(date) => date < new Date()}
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">End Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "PPP") : <span>Select date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                  disabled={(date) => date < (startDate || new Date())}
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
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

export default CampaignDates;
