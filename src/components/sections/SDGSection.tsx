import { Card } from "@/components/ui/card";
import { Heart, Droplets, Building, Recycle, Thermometer, TreePine } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import sdgIcons from "@/assets/sdg-icons.jpg";

const SDGSection = () => {
  const { t } = useLanguage();
  
  const sdgGoals = [
    {
      id: 11,
      title: t("sdg.goal11.title"),
      description: t("sdg.goal11.desc"),
      icon: Building,
      color: "from-purple-400 to-purple-500",
      impact: "50+ neighborhoods transformed"
    },
    {
      id: 12,
      title: t("sdg.goal12.title"),
      description: t("sdg.goal12.desc"),
      icon: Recycle,
      color: "from-emerald-400 to-emerald-500",
      impact: "80% waste diverted from landfills"
    },
    {
      id: 15,
      title: t("sdg.goal15.title"),
      description: t("sdg.goal15.desc"),
      icon: TreePine,
      color: "from-green-500 to-green-600",
      impact: "1,000+ hectares preserved"
    }
  ];

  return (
    <section id="sdg" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-secondary/10 rounded-full px-6 py-3 mb-6">
            <div className="w-2 h-2 bg-secondary rounded-full pulse-eco" />
            <span className="text-secondary font-semibold">{t("nav.sdgImpact")}</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {t("sdg.title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("sdg.subtitle")}
          </p>
        </div>

        {/* SDG Visual */}
        <div className="mb-16 text-center">
          <img 
            src={sdgIcons} 
            alt="UN Sustainable Development Goals icons"
            className="max-w-2xl mx-auto rounded-2xl shadow-eco"
          />
        </div>

        {/* SDG Goals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {sdgGoals.map((goal) => (
            <Card key={goal.id} className="card-eco group hover:border-primary/30">
              <div className="flex items-start gap-4">
                {/* SDG Number Badge */}
                <div className={`flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br ${goal.color} flex items-center justify-center`}>
                  <span className="text-white font-bold text-lg">{goal.id}</span>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <goal.icon className="w-5 h-5 text-primary" />
                    <h3 className="font-bold text-foreground text-lg">{goal.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {goal.description}
                  </p>
                  <div className="bg-accent/50 rounded-lg p-3">
                    <div className="text-xs text-accent-foreground font-semibold mb-1">Our Impact:</div>
                    <div className="text-sm font-bold text-primary">{goal.impact}</div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Impact Statistics */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">Measurable Impact in West Java</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real data showing how our program contributes to Indonesia's SDG commitments
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">2,500+</div>
              <div className="text-sm text-muted-foreground">Families Engaged</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-secondary mb-2">50,000</div>
              <div className="text-sm text-muted-foreground">Kg Waste Recycled</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-600 mb-2">15,000</div>
              <div className="text-sm text-muted-foreground">EcoPoints Earned</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">800+</div>
              <div className="text-sm text-muted-foreground">Hydroponic Gardens</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SDGSection;