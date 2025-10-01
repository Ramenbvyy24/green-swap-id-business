import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription } from "@/components/ui/modal";
import { MapPin, Phone, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const pickupSchema = z.object({
  address: z.string().trim().min(10, "Address must be at least 10 characters").max(500),
  wasteType: z.string().min(1, "Please select a waste type"),
  estimatedWeight: z.number().min(1, "Weight must be at least 1 kg").max(1000),
  preferredDate: z.string().min(1, "Please select a date"),
});

interface PickupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PickupModal = ({ isOpen, onClose }: PickupModalProps) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    address: "",
    wasteType: "",
    estimatedWeight: "",
    preferredDate: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to schedule a pickup",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const validated = pickupSchema.parse({
        address: formData.address,
        wasteType: formData.wasteType,
        estimatedWeight: parseFloat(formData.estimatedWeight),
        preferredDate: formData.preferredDate,
      });

      const { error: pickupError } = await supabase
        .from("pickup_requests")
        .insert({
          user_id: user.id,
          address: validated.address,
          waste_type: validated.wasteType,
          estimated_weight: validated.estimatedWeight,
          preferred_date: validated.preferredDate,
        });

      if (pickupError) throw pickupError;

      // Calculate EcoPoints reward
      const multiplier = validated.wasteType === 'metal' ? 15 : 
                        validated.wasteType === 'plastic' ? 10 :
                        validated.wasteType === 'paper' ? 8 : 10;
      const points = Math.floor(validated.estimatedWeight * multiplier);

      // Add EcoPoints transaction
      const { error: pointsError } = await supabase
        .from("ecopoints_transactions")
        .insert({
          user_id: user.id,
          amount: points,
          transaction_type: "earned",
          description: `Pickup scheduled - ${validated.wasteType} (${validated.estimatedWeight}kg)`,
        });

      if (pointsError) throw pointsError;

      toast({
        title: t("modal.pickup.success"),
        description: `Pickup scheduled for ${formData.preferredDate}. You'll earn ${points} EcoPoints!`,
        duration: 5000,
      });

      // Reset form and close modal
      setFormData({
        address: "",
        wasteType: "",
        estimatedWeight: "",
        preferredDate: "",
      });
      onClose();
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast({
          title: "Validation error",
          description: err.issues[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to schedule pickup. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <ModalHeader>
          <ModalTitle className="text-2xl font-bold text-primary flex items-center gap-2">
            <MapPin className="w-6 h-6" />
            {t("modal.pickup.title")}
          </ModalTitle>
          <ModalDescription>
            Fill in your details and we'll send our eco-friendly van to collect your recyclable waste.
          </ModalDescription>
        </ModalHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="address">Pickup Address *</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="Enter your complete address including district and postal code"
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="wasteType">Primary Waste Type *</Label>
              <Select onValueChange={(value) => handleChange("wasteType", value)} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select waste type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="plastic">Plastic Bottles & Containers</SelectItem>
                  <SelectItem value="paper">Paper & Cardboard</SelectItem>
                  <SelectItem value="metal">Metal Cans & Aluminum</SelectItem>
                  <SelectItem value="glass">Glass Bottles & Jars</SelectItem>
                  <SelectItem value="mixed">Mixed Recyclables</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="estimatedWeight">Estimated Weight (kg) *</Label>
              <Input
                id="estimatedWeight"
                type="number"
                value={formData.estimatedWeight}
                onChange={(e) => handleChange("estimatedWeight", e.target.value)}
                placeholder="e.g., 5"
                min="1"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="preferredDate">Preferred Pickup Date *</Label>
            <Input
              id="preferredDate"
              type="date"
              value={formData.preferredDate}
              onChange={(e) => handleChange("preferredDate", e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          {/* EcoPoints Calculation */}
          {formData.estimatedWeight && formData.wasteType && (
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Estimated EcoPoints Reward
              </h4>
              <div className="text-2xl font-bold text-secondary">
                {(() => {
                  const weight = parseFloat(formData.estimatedWeight) || 0;
                  const multiplier = formData.wasteType === 'metal' ? 15 : 
                                   formData.wasteType === 'plastic' ? 10 :
                                   formData.wasteType === 'paper' ? 8 : 10;
                  return weight * multiplier;
                })()}{" "}
                <span className="text-lg text-muted-foreground">EcoPoints</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Points will be credited to your account after pickup verification
              </p>
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1" disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" className="btn-eco-primary flex-1" disabled={isSubmitting}>
              <Phone className="w-4 h-4 mr-2" />
              {isSubmitting ? "Scheduling..." : "Schedule Pickup"}
            </Button>
          </div>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default PickupModal;