import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
const AdManagerHeader = () => {
  return <div className="flex items-center space-x-2">
      <div className="flex items-center">
        <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
          <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0V18H4V10H10V14H14V0H10V6H4V0H0Z" fill="#111111" />
          </svg>
        </div>
        <span className="text-xl font-semibold">Adi*</span>
      </div>
    </div>;
};
export default AdManagerHeader;