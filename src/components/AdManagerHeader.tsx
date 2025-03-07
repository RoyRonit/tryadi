
import { ArrowUpRight } from "lucide-react";

const AdManagerHeader = () => {
  return (
    <div className="mb-8 text-center">
      <div className="flex items-center justify-center mb-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-tiktok-blue to-tiktok-red bg-clip-text text-transparent">
          TikTok Ad Manager
        </h1>
        <ArrowUpRight className="ml-2 h-6 w-6 text-tiktok-red" />
      </div>
      <p className="text-muted-foreground max-w-2xl mx-auto">
        Create targeted TikTok ad campaigns for your products in minutes. Enter your product website,
        select relevant interests, set your campaign dates and budget, and you're ready to go!
      </p>
    </div>
  );
};

export default AdManagerHeader;
