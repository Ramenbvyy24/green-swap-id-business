import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Recycle, Leaf } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImage from "@/assets/hero-sustainable-van.jpg";
import PickupModal from "@/components/modals/PickupModal";
import { scrollToSection } from "@/utils/scrollUtils";
const HeroSection = () => {
  const { t } = useLanguage();
  const [isPickupModalOpen, setIsPickupModalOpen] = useState(false);
  const handleStartRecycling = () => {
    setIsPickupModalOpen(true);
  };
  const handleLearnMore = () => {
    scrollToSection('how-it-works');
  };
  return <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img src={heroImage} alt="Sustainable waste collection van in Indonesian landscape" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
          <div className="slide-up fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/30">
              <Recycle className="w-5 h-5 text-white" />
              <span className="text-white font-semibold">Indonesia Waste Revolution</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              {t("hero.title")}
            </h1>

            {/* Subtitle */}
            <p className="text-xl lg:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              {t("hero.subtitle")}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button onClick={handleStartRecycling} className="btn-eco-primary group text-lg px-10 py-6">
                {t("hero.cta.pickup")}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button onClick={handleLearnMore} variant="outline" className="btn-eco-outline text-lg px-10 py-6 border-white/30 hover:bg-white text-stone-700">
                {t("hero.cta.learn")}
              </Button>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-1/4 left-10 float-animation">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Leaf className="w-8 h-8 text-green-300" />
            </div>
          </div>
          <div className="absolute bottom-1/3 right-10 float-animation" style={{
          animationDelay: '2s'
        }}>
            
          </div>
        </div>

        {/* Stats Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-sm border-t border-white/20">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-white">
              <div>
                <div className="text-3xl font-bold mb-1">50,000+</div>
                <div className="text-white/80">{t("hero.stats.waste")}</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">2,500+</div>
                <div className="text-white/80">{t("hero.stats.families")}</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">15,000+</div>
                <div className="text-white/80">{t("hero.stats.plants")}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PickupModal isOpen={isPickupModalOpen} onClose={() => setIsPickupModalOpen(false)} />
    </>;
};
export default HeroSection;