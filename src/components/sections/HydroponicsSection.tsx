import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sprout, Coins, Package, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import hydroponicImage from "@/assets/hydroponic-system.jpg";
import ExchangeModal from "@/components/modals/ExchangeModal";
import shopeeLogo from "@/assets/shopee-logo.png";
import tokopediaLogo from "@/assets/tokopedia-logo.png";
import gopayLogo from "@/assets/gopay-logo.png";
import telkomselLogo from "@/assets/telkomsel-logo.png";
import xlLogo from "@/assets/xl-logo.png";
import watermelonImg from "@/assets/watermelon.jpg";
import melonImg from "@/assets/melon.jpg";
import mangoImg from "@/assets/mango.jpg";
import appleImg from "@/assets/apple.jpg";
import orangeImg from "@/assets/orange.jpg";
import bananaImg from "@/assets/banana.jpg";

const HydroponicsSection = () => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isExchangeModalOpen, setIsExchangeModalOpen] = useState(false);
  const { t } = useLanguage();

  const handleExchangeClick = (product: any) => {
    setSelectedProduct(product);
    setIsExchangeModalOpen(true);
  };

  const products = [
    {
      id: 1,
      name: t("hydroponics.starter.title"),
      description: t("hydroponics.starter.desc"),
      points: 150,
      originalPrice: "Rp 750,000",
      image: "🥬",
      category: "Starter Kit",
      rating: 4.9,
      imageType: "emoji"
    },
    {
      id: 2,
      name: t("hydroponics.advanced.title"),
      description: t("hydroponics.advanced.desc"),
      points: 300,
      originalPrice: "Rp 1,500,000", 
      image: "🍅",
      category: "Advanced",
      rating: 4.8,
      imageType: "emoji"
    },
    {
      id: 3,
      name: t("hydroponics.premium.title"),
      description: t("hydroponics.premium.desc"),
      points: 500,
      originalPrice: "Rp 2,500,000",
      image: "🌿",
      category: "Premium",
      rating: 5.0,
      imageType: "emoji"
    },
    // Vouchers
    {
      id: 4,
      name: "Voucher Shopee Rp 50.000",
      description: "Voucher belanja Shopee senilai Rp 50.000 untuk semua produk",
      points: 50,
      originalPrice: "Rp 50,000",
      image: shopeeLogo,
      category: "E-Commerce",
      rating: 4.9,
      imageType: "url"
    },
    {
      id: 5,
      name: "Voucher Tokopedia Rp 50.000",
      description: "Voucher belanja Tokopedia senilai Rp 50.000 untuk semua produk",
      points: 50,
      originalPrice: "Rp 50,000",
      image: tokopediaLogo,
      category: "E-Commerce",
      rating: 4.8,
      imageType: "url"
    },
    {
      id: 6,
      name: "Saldo GoPay Rp 25.000",
      description: "Top up saldo GoPay senilai Rp 25.000",
      points: 25,
      originalPrice: "Rp 25,000",
      image: gopayLogo,
      category: "E-Wallet",
      rating: 5.0,
      imageType: "url"
    },
    {
      id: 7,
      name: "Pulsa Telkomsel Rp 20.000",
      description: "Voucher pulsa Telkomsel senilai Rp 20.000",
      points: 20,
      originalPrice: "Rp 20,000",
      image: telkomselLogo,
      category: "Pulsa",
      rating: 4.9,
      imageType: "url"
    },
    {
      id: 8,
      name: "Pulsa XL Rp 20.000",
      description: "Voucher pulsa XL senilai Rp 20.000",
      points: 20,
      originalPrice: "Rp 20,000",
      image: xlLogo,
      category: "Pulsa",
      rating: 4.8,
      imageType: "url"
    },
    // Fruits
    {
      id: 9,
      name: "Semangka Segar (1 kg)",
      description: "Semangka segar manis, kaya akan vitamin dan air",
      points: 15,
      originalPrice: "Rp 15,000",
      image: watermelonImg,
      category: "Buah",
      rating: 4.7,
      imageType: "url"
    },
    {
      id: 10,
      name: "Melon Segar (1 kg)",
      description: "Melon segar manis dengan daging buah orange",
      points: 20,
      originalPrice: "Rp 20,000",
      image: melonImg,
      category: "Buah",
      rating: 4.8,
      imageType: "url"
    },
    {
      id: 11,
      name: "Mangga Harum Manis (1 kg)",
      description: "Mangga harum manis matang sempurna",
      points: 25,
      originalPrice: "Rp 25,000",
      image: mangoImg,
      category: "Buah",
      rating: 4.9,
      imageType: "url"
    },
    {
      id: 12,
      name: "Apel Fuji (1 kg)",
      description: "Apel Fuji merah segar dan renyah",
      points: 30,
      originalPrice: "Rp 30,000",
      image: appleImg,
      category: "Buah",
      rating: 4.8,
      imageType: "url"
    },
    {
      id: 13,
      name: "Jeruk Manis (1 kg)",
      description: "Jeruk manis segar kaya vitamin C",
      points: 18,
      originalPrice: "Rp 18,000",
      image: orangeImg,
      category: "Buah",
      rating: 4.7,
      imageType: "url"
    },
    {
      id: 14,
      name: "Pisang Cavendish (1 kg)",
      description: "Pisang Cavendish matang sempurna",
      points: 12,
      originalPrice: "Rp 12,000",
      image: bananaImg,
      category: "Buah",
      rating: 4.6,
      imageType: "url"
    }
  ];

  const benefits = [
    {
      icon: Sprout,
      title: "Fresh Produce",
      description: "Grow your own vegetables year-round with minimal space"
    },
    {
      icon: Coins,
      title: "EcoPoints Rewards",
      description: "Earn points by recycling waste and spend on hydroponic products"
    },
    {
      icon: Package,
      title: "Complete Systems",
      description: "Everything included: containers, pumps, nutrients, and seeds"
    }
  ];

  return (
    <>
      <section id="hydroponics" className="py-24 nature-gradient">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 rounded-full px-6 py-3 mb-6">
              <Sprout className="w-5 h-5 text-emerald-600" />
              <span className="text-emerald-700 font-semibold">Hydroponic Marketplace</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {t("hydroponics.title")}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("hydroponics.subtitle")}
            </p>
          </div>

          {/* Hero Image and Benefits */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <img 
                src={hydroponicImage}
                alt="Modern hydroponic farming system with fresh vegetables"
                className="w-full rounded-2xl shadow-float"
              />
            </div>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-foreground mb-4">
                  Machida-Inspired Growing Systems
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Our hydroponic solutions are based on the efficient Japanese Machida technique, 
                  optimizing space and resource usage while maximizing yield.
                </p>
              </div>

              {benefits.map((benefit) => (
                <div key={benefit.title} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-2">{benefit.title}</h4>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div>
            <h3 className="text-3xl font-bold text-foreground text-center mb-12">
              Popular Products - Vouchers, Pulsa & Buah-buahan
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {products.map((product) => (
                <Card key={product.id} className="card-eco overflow-hidden group">
                  {/* Product Image */}
                  <div className="h-48 bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center mb-6 rounded-xl overflow-hidden">
                    {product.imageType === "emoji" ? (
                      <span className="text-6xl">{product.image}</span>
                    ) : (
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-contain p-4"
                      />
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {product.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-semibold">{product.rating}</span>
                      </div>
                    </div>

                    <h4 className="font-bold text-foreground text-lg">{product.name}</h4>
                    <p className="text-muted-foreground text-sm">{product.description}</p>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Coins className="w-5 h-5 text-primary" />
                          <span className="text-2xl font-bold text-primary">{product.points}</span>
                          <span className="text-sm text-muted-foreground">EcoPoints</span>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground line-through">
                        Market Price: {product.originalPrice}
                      </div>

                      <Button onClick={() => handleExchangeClick(product)} className="btn-eco-primary w-full">
                        {t("hydroponics.cta")}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* EcoPoints Info */}
            <div className="bg-white rounded-2xl p-8 shadow-eco text-center">
              <h4 className="text-2xl font-bold text-foreground mb-4">How to Earn EcoPoints</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-primary/5 rounded-xl p-6">
                  <div className="text-3xl mb-2">♻️</div>
                  <div className="font-bold text-primary mb-2">1 KG Plastic</div>
                  <div className="text-sm text-muted-foreground">= 10 EcoPoints</div>
                </div>
                <div className="bg-secondary/5 rounded-xl p-6">
                  <div className="text-3xl mb-2">📄</div>
                  <div className="font-bold text-secondary mb-2">1 KG Paper</div>
                  <div className="text-sm text-muted-foreground">= 8 EcoPoints</div>
                </div>
                <div className="bg-accent/20 rounded-xl p-6">
                  <div className="text-3xl mb-2">🥫</div>
                  <div className="font-bold text-accent-foreground mb-2">1 KG Metal</div>
                  <div className="text-sm text-muted-foreground">= 15 EcoPoints</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ExchangeModal 
        isOpen={isExchangeModalOpen} 
        onClose={() => setIsExchangeModalOpen(false)}
        product={selectedProduct}
      />
    </>
  );
};

export default HydroponicsSection;