import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Video, Phone, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
interface TryNowModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  meetLink: string;
}
const TryNowModal = ({
  open,
  onOpenChange,
  meetLink
}: TryNowModalProps) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    toast
  } = useToast();
  const handleSubmitCallback = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      console.log("Submitting customer details to Supabase:", {
        email,
        phone
      });

      // Save data to Supabase
      const {
        error,
        data
      } = await supabase.from('customer_details').insert([{
        email,
        phone
      }]);
      console.log("Supabase response:", {
        data,
        error
      });
      if (error) {
        console.error("Supabase error details:", error);
        throw error;
      }
      toast({
        title: "Callback Requested",
        description: "We'll contact you soon!",
        duration: 3000
      });

      // Reset form and close modal
      setEmail("");
      setPhone("");
      onOpenChange(false);
    } catch (error: any) {
      console.error("Error saving callback details:", error);
      toast({
        title: "Something went wrong",
        description: error.message || "Please try again later.",
        variant: "destructive",
        duration: 5000
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleJoinCall = () => {
    window.open(meetLink, "_blank");
    onOpenChange(false);
  };
  return <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            We're Live Now!
          </DialogTitle>
          <DialogDescription className="text-foreground/80 mt-2">We are speaking with teams everyday. Just leave your email or number and we'll call you back. </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <Button onClick={handleJoinCall} className="bg-gradient-to-r from-tiktok-blue to-tiktok-red hover:opacity-90 transition-opacity">
            <Video className="mr-2" />
            Join Video Call Now
          </Button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-muted-foreground/20" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or leave your details for a callback
              </span>
            </div>
          </div>
          
          <form onSubmit={handleSubmitCallback} className="space-y-4">
            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" required />
              </div>
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="phone" className="text-sm font-medium">
                Phone Number
              </label>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <Input id="phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1 (555) 000-0000" required />
              </div>
            </div>
            
            <DialogFooter className="sm:justify-end">
              <Button type="submit" variant="outline" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Request Callback"}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>;
};
export default TryNowModal;