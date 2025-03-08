
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function AnimatedHero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(() => ["cursor for ads", "vibe marketing for ads", "automation for ads"], []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2500);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return <div className="w-full">
      <div className="container mx-auto px-4">
        <div className="flex gap-8 py-16 md:py-24 items-center justify-center flex-col">
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-3xl tracking-tighter text-center font-bold mb-2">
              
              <span className="relative flex w-full justify-center overflow-hidden text-center h-16 md:h-24 md:pb-4 md:pt-1">
                {titles.map((title, index) => <motion.span key={index} className="absolute font-semibold whitespace-nowrap" initial={{
                opacity: 0,
                y: "-100%"
              }} transition={{
                type: "spring",
                stiffness: 50
              }} animate={titleNumber === index ? {
                y: 0,
                opacity: 1
              } : {
                y: titleNumber > index ? -150 : 150,
                opacity: 0
              }}>
                    {title}
                  </motion.span>)}
              </span>
            </h1>

            <p className="text-xl text-foreground/80 max-w-3xl mx-auto mb-8">Launch and manage your social media ad campaigns with AI agents</p>
          </div>
          <div className="flex flex-row gap-3">
            <Button asChild size="lg" className="bg-gradient-to-r from-tiktok-blue to-tiktok-red hover:opacity-90 transition-opacity">
              <a href="http://10.0.10.71:8080/" className="flex items-center">
                Try Now <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/agent-automations" className="flex items-center">
                See features <Clock className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>;
}

export { AnimatedHero };
