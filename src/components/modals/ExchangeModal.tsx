import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription } from "@/components/ui/modal";
import { ShoppingCart, Coins, Package, Minus, Plus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Product {
  id: number;
  name: string;
  description: string;
  points: number;
  originalPrice: string;
  image: string;
}

interface ExchangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

const ExchangeModal = ({ isOpen, onClose, product }: ExchangeModalProps) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [userPoints, setUserPoints] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserPoints = async () => {
      if (!user) return;
      
      setIsLoading(true);
      const { data, error } = await supabase
        .rpc('get_user_ecopoints', { user_uuid: user.id });
      
      if (!error && data !== null) {
        setUserPoints(data);
      }
      setIsLoading(false);
    };

    if (isOpen && user) {
      fetchUserPoints();
    }
  }, [isOpen, user]);

  if (!product) return null;

  const totalPoints = product.points * quantity;
  const hasEnoughPoints = userPoints >= totalPoints;

  const handleExchange = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to exchange products",
        variant: "destructive",
      });
      return;
    }

    if (!hasEnoughPoints) {
      toast({
        title: "Insufficient EcoPoints 😟",
        description: `You need ${totalPoints - userPoints} more EcoPoints to complete this exchange. Keep recycling!`,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create order
      const { error: orderError } = await supabase
        .from("product_orders")
        .insert({
          user_id: user.id,
          product_name: product.name,
          quantity: quantity,
          points_spent: totalPoints,
        });

      if (orderError) throw orderError;

      // Deduct points
      const { error: pointsError } = await supabase
        .from("ecopoints_transactions")
        .insert({
          user_id: user.id,
          amount: -totalPoints,
          transaction_type: "spent",
          description: `Exchanged for ${quantity}x ${product.name}`,
        });

      if (pointsError) throw pointsError;

      toast({
        title: "Exchange Successful! 🎉",
        description: `${quantity}x ${product.name} ordered. ${totalPoints} EcoPoints deducted.`,
        duration: 5000,
      });

      setQuantity(1);
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to complete exchange. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent className="max-w-lg">
        <ModalHeader>
          <ModalTitle className="text-2xl font-bold text-primary flex items-center gap-2">
            <ShoppingCart className="w-6 h-6" />
            {t("modal.exchange.title")}
          </ModalTitle>
          <ModalDescription>
            Use your earned EcoPoints to get this hydroponic product
          </ModalDescription>
        </ModalHeader>

        <div className="space-y-6">
          {/* Product Display */}
          <div className="bg-gradient-to-br from-green-100 to-green-50 rounded-xl p-6 text-center">
            <div className="text-6xl mb-4">{product.image}</div>
            <h3 className="font-bold text-foreground text-xl mb-2">{product.name}</h3>
            <p className="text-muted-foreground text-sm">{product.description}</p>
          </div>

          {/* Points Display */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Price per item:</span>
              <div className="flex items-center gap-2">
                <Coins className="w-4 h-4 text-primary" />
                <span className="font-bold text-primary">{product.points} EcoPoints</span>
              </div>
            </div>
            <div className="text-xs text-muted-foreground line-through">
              Market Price: {product.originalPrice}
            </div>
          </div>

          {/* Quantity Selector */}
          <div>
            <Label htmlFor="quantity">Quantity</Label>
            <div className="flex items-center gap-4 mt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="text-center w-20"
                min="1"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Total Calculation */}
          <div className="bg-secondary/5 border border-secondary/20 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold">Total Cost:</span>
              <div className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-secondary" />
                <span className="text-2xl font-bold text-secondary">{totalPoints}</span>
                <span className="text-sm text-muted-foreground">EcoPoints</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Your balance:</span>
              {isLoading ? (
                <span className="text-sm text-muted-foreground">Loading...</span>
              ) : (
                <span className={`font-semibold ${hasEnoughPoints ? 'text-emerald-600' : 'text-destructive'}`}>
                  {userPoints} EcoPoints
                </span>
              )}
            </div>
            {hasEnoughPoints && (
              <div className="flex items-center justify-between text-sm mt-1">
                <span className="text-muted-foreground">Remaining after exchange:</span>
                <span className="font-semibold text-primary">
                  {userPoints - totalPoints} EcoPoints
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1" disabled={isSubmitting}>
              Cancel
            </Button>
            <Button 
              onClick={handleExchange} 
              className={`flex-1 ${hasEnoughPoints && !isLoading ? 'btn-eco-primary' : 'bg-gray-400'}`}
              disabled={!hasEnoughPoints || isSubmitting || isLoading}
            >
              <Package className="w-4 h-4 mr-2" />
              {isSubmitting ? 'Processing...' : hasEnoughPoints ? 'Exchange Now' : 'Not Enough Points'}
            </Button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default ExchangeModal;