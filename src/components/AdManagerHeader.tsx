
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AdManagerHeader = () => {
  return <div className="flex items-center space-x-2">
      <div className="flex items-center">
        <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
          <img 
            src="/lovable-uploads/ae71a034-e3ae-4bbd-a226-0cc3d3b1491a.png" 
            alt="Adi logo" 
            className="w-4 h-4 invert" // Using invert to make the black logo appear white
          />
        </div>
        <span className="text-xl font-semibold">Adi*</span>
      </div>
    </div>;
};

export default AdManagerHeader;
