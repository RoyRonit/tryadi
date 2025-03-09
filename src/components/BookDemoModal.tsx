
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Calendar, Phone, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface BookDemoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BookDemoModal = ({ open, onOpenChange }: BookDemoModalProps) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmitDemo = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Save data to Supabase
      const { error } = await supabase
        .from('customer_details')
        .insert([{ email, phone }]);
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Demo Requested",
        description: "We'll contact you to schedule a demo soon!",
        duration: 3000,
      });
      
      // Reset form and close modal
      setEmail("");
      setPhone("");
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving demo request details:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Book a Demo
          </DialogTitle>
          <DialogDescription className="text-foreground/80 mt-2">
            Leave your details and we'll schedule a personalized demo to show you how our platform can transform your marketing.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <form onSubmit={handleSubmitDemo} className="space-y-4">
            <div className="grid gap-2">
              <label htmlFor="demo-email" className="text-sm font-medium">
                Email
              </label>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <Input
                  id="demo-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="demo-phone" className="text-sm font-medium">
                Phone Number
              </label>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <Input
                  id="demo-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  required
                />
              </div>
            </div>
            
            <DialogFooter className="sm:justify-end">
              <Button 
                type="submit" 
                variant="outline"
                className="flex items-center gap-2"
                disabled={isSubmitting}
              >
                <Calendar className="w-4 h-4" />
                {isSubmitting ? "Submitting..." : "Book Demo"}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookDemoModal;
