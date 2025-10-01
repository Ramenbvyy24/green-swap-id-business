import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Recycle, Leaf, LogOut } from "lucide-react";
import { scrollToSection } from "@/utils/scrollUtils";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import PickupModal from "@/components/modals/PickupModal";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPickupModalOpen, setIsPickupModalOpen] = useState(false);
  const { t } = useLanguage();
  const { signOut } = useAuth();

  const navItems = [
    { name: t("nav.howItWorks"), href: "how-it-works" },
    { name: t("nav.sdgImpact"), href: "sdg" },
    { name: t("nav.products"), href: "hydroponics" },
    { name: t("nav.about"), href: "about" }
  ];

  const handleNavClick = (href: string) => {
    scrollToSection(href);
    setIsOpen(false);
  };

  const handleGetStarted = () => {
    setIsPickupModalOpen(true);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center">
                <Recycle className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-foreground text-lg">TukarInAja</div>
                <div className="text-xs text-muted-foreground">Indonesia</div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="text-muted-foreground hover:text-primary transition-colors font-medium"
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-4">
              <LanguageSwitcher />
              <Button onClick={handleGetStarted} className="btn-eco-primary">
                <Leaf className="w-4 h-4 mr-2" />
                {t("nav.getStarted")}
              </Button>
              <Button variant="ghost" onClick={signOut} className="text-muted-foreground hover:text-primary">
                <LogOut className="w-4 h-4 mr-2" />
                {t("nav.logout") || "Logout"}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-muted-foreground hover:text-primary"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden py-4 border-t border-border">
              <div className="space-y-4">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    className="block px-4 py-2 text-muted-foreground hover:text-primary transition-colors font-medium w-full text-left"
                  >
                    {item.name}
                  </button>
                ))}
                <div className="px-4 pt-4 space-y-3">
                  <div className="flex justify-center mb-3">
                    <LanguageSwitcher />
                  </div>
                  <Button onClick={handleGetStarted} className="btn-eco-primary w-full">
                    <Leaf className="w-4 h-4 mr-2" />
                    {t("nav.getStarted")}
                  </Button>
                  <Button variant="ghost" onClick={signOut} className="w-full justify-start text-muted-foreground hover:text-primary">
                    <LogOut className="w-4 h-4 mr-2" />
                    {t("nav.logout") || "Logout"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <PickupModal isOpen={isPickupModalOpen} onClose={() => setIsPickupModalOpen(false)} />
    </>
  );
};

export default Navigation;