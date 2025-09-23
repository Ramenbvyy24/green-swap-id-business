import HeroSection from "@/components/sections/HeroSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import SDGSection from "@/components/sections/SDGSection";
import HydroponicsSection from "@/components/sections/HydroponicsSection";
import CTASection from "@/components/sections/CTASection";
import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/navigation/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <SDGSection />
        <HydroponicsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;