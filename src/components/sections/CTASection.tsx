import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Smartphone, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import PickupModal from "@/components/modals/PickupModal";
import { useToast } from "@/hooks/use-toast";
const CTASection = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isPickupModalOpen, setIsPickupModalOpen] = useState(false);
  const handleDownloadApp = () => {
    toast({
      title: "App Coming Soon! 📱",
      description: "Our mobile app is launching next month. We'll notify you when it's available for download.",
      duration: 5000
    });
  };
  const handleSchedulePickup = () => {
    setIsPickupModalOpen(true);
  };
  return <>
      <section className="py-24 bg-gradient-to-br from-primary via-primary-glow to-secondary relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full" />
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-white rounded-full" />
          <div className="absolute top-40 right-10 w-16 h-16 bg-white rounded-full" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          {/* Main CTA Content */}
          <div className="mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {t("cta.title")}
            </h2>
            <p className="text-xl lg:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              {t("cta.subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Button onClick={handleDownloadApp} className="bg-white text-primary hover:bg-white/90 text-lg px-12 py-6 group">
                {t("cta.button")}
                <Smartphone className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
              </Button>
              <Button onClick={handleSchedulePickup} variant="outline" className="border-2 border-white hover:bg-white text-lg px-12 py-6 text-[#5dae40]">
                {t("hero.cta.pickup")}
              </Button>
            </div>
          </div>

          {/* Service Areas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <MapPin className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Jakarta</h3>
              <p className="text-white/80">Central & South Jakarta areas now available</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <MapPin className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Bandung</h3>
              <p className="text-white/80">All districts covered with daily pickup</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <MapPin className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Bogor</h3>
              <p className="text-white/80">Expanding to rural areas this month</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6">Get Started Today</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white/90">
              <div>
                <div className="font-semibold mb-2">WhatsApp Support</div>
                <div className="text-2xl font-bold">+62 812-3456-7890</div>
              </div>
              <div>
                <div className="font-semibold mb-2">Email</div>
                <div className="text-2xl font-bold">hello@tukarinaja.id</div>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-emerald-500/20 rounded-xl border border-emerald-400/30">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-emerald-200 font-semibold">Special Launch Offer</span>
              </div>
              <p className="text-white text-lg">
                First 100 kg of waste = <strong>Double EcoPoints!</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      <PickupModal isOpen={isPickupModalOpen} onClose={() => setIsPickupModalOpen(false)} />
    </>;
};
export default CTASection;