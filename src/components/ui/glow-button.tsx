
import { ReactNode, useState, useRef, useEffect, MouseEvent } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Gravity, MatterBody, GravityRef } from "@/components/ui/gravity";

interface GlowButtonProps extends ButtonProps {
  onGlowComplete?: () => void;
  glowColor?: string;
  particleCount?: number;
}

export function GlowButton({
  children,
  className,
  onClick,
  onGlowComplete,
  glowColor = "#8B5CF6",
  particleCount = 12,
  ...props
}: GlowButtonProps) {
  const [isGlowing, setIsGlowing] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const gravityRef = useRef<GravityRef>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const particleColors = [
    "#25F4EE", // TikTok blue
    "#FE2C55", // TikTok red
    "#8B5CF6", // Purple
    "#D946EF", // Pink
    "#F97316", // Orange
  ];

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(e);
    
    // Trigger glow effect
    setIsGlowing(true);
    
    // Show particles after a small delay
    setTimeout(() => {
      setShowParticles(true);
      gravityRef.current?.reset();
      gravityRef.current?.start();
    }, 100);
    
    // Clean up after animation completes
    setTimeout(() => {
      setIsGlowing(false);
      setTimeout(() => {
        setShowParticles(false);
        if (onGlowComplete) onGlowComplete();
      }, 1000);
    }, 1500);
  };

  // Generate particles for the physics effect
  const particles = Array.from({ length: particleCount }).map((_, i) => {
    const size = Math.floor(Math.random() * 14) + 8; // 8-22px
    const angle = Math.floor(Math.random() * 360);
    const x = 50 + (Math.random() * 20) - 10; // 40-60%
    const y = 50 + (Math.random() * 20) - 10; // 40-60%
    const color = particleColors[Math.floor(Math.random() * particleColors.length)];
    
    return (
      <MatterBody
        key={i}
        x={`${x}%`}
        y={`${y}%`}
        angle={angle}
        matterBodyOptions={{
          friction: 0.05,
          restitution: 0.8,
          density: 0.002,
        }}
      >
        <div 
          className="rounded-full shadow-lg"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: color,
            opacity: 0.8,
          }}
        />
      </MatterBody>
    );
  });

  return (
    <div className="relative overflow-visible">
      <Button
        ref={buttonRef}
        className={cn(
          "relative",
          isGlowing && "animate-pulse",
          isGlowing && `shadow-[0_0_15px_${glowColor},0_0_30px_${glowColor.substring(0, 7)}80]`,
          className
        )}
        onClick={handleClick}
        {...props}
      >
        {children}
      </Button>
      
      {showParticles && (
        <div className="absolute inset-0 overflow-visible z-10 pointer-events-none">
          <Gravity 
            ref={gravityRef}
            gravity={{ x: 0, y: 0.3 }}
            className="w-full h-full overflow-visible"
          >
            {particles}
          </Gravity>
        </div>
      )}
    </div>
  );
}
