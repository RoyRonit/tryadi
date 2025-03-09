
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AdManagerHeader = () => {
  return <div className="flex items-center space-x-2">
      <div className="flex items-center">
        <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
          <img 
            src="/lovable-uploads/ab166928-d875-492c-be61-693e01fcf7b6.png" 
            alt="Adi logo" 
            className="w-4 h-4" 
          />
        </div>
        <span className="text-xl font-semibold">Adi</span>
        <span className="text-sm text-muted-foreground ml-1">| Marketing Agent</span>
      </div>
    </div>;
};

export default AdManagerHeader;
