import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription } from "@/components/ui/modal";
import { MapPin, Phone, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

interface PickupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PickupModal = ({ isOpen, onClose }: PickupModalProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    wasteType: "",
    estimatedWeight: "",
    preferredDate: "",
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    toast({
      title: t("modal.pickup.success"),
      description: `Your waste pickup is scheduled for ${formData.preferredDate}. Our green van will contact you 30 minutes before arrival.`,
      duration: 5000,
    });

    // Reset form and close modal
    setFormData({
      name: "",
      phone: "",
      address: "",
      wasteType: "",
      estimatedWeight: "",
      preferredDate: "",
      notes: ""
    });
    onClose();
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="+62 812-3456-7890"
                required
              />
            </div>
          </div>

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

          <div>
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              placeholder="Any special instructions for our pickup team..."
              rows={2}
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
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="btn-eco-primary flex-1">
              <Phone className="w-4 h-4 mr-2" />
              Schedule Pickup
            </Button>
          </div>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default PickupModal;