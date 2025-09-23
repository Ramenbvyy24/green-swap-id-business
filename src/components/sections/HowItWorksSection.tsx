import { Card } from "@/components/ui/card";
import { Truck, Scale, ShoppingCart, ArrowRight } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: Truck,
      title: "Van Pickup",
      description: "Schedule a pickup through our app. Our eco-friendly green van comes to your location to collect recyclable waste.",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Scale,
      title: "Weight & Convert",
      description: "We weigh your waste using certified scales and convert the weight into EcoPoints based on material type and quality.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: ShoppingCart,
      title: "Shop Hydroponics",
      description: "Use your EcoPoints to purchase hydroponic systems, seeds, nutrients, and fresh produce from local growers.",
      color: "from-emerald-500 to-emerald-600"
    }
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-6 py-3 mb-6">
            <div className="w-2 h-2 bg-primary rounded-full pulse-eco" />
            <span className="text-primary font-semibold">How It Works</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Simple Steps to
            <span className="text-gradient-primary"> Sustainable Living</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform your household waste into valuable resources with our innovative 
            three-step process inspired by Japanese efficiency.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={step.title} className="relative group">
              <Card className="card-eco text-center group-hover:shadow-glow">
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                </div>

                {/* Icon */}
                <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center`}>
                  <step.icon className="w-10 h-10 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-foreground mb-4">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </Card>

              {/* Arrow for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-primary/30">
                  <ArrowRight className="w-8 h-8" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Process Flow Visualization */}
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl p-12 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">Machida Technique Integration</h3>
          <p className="text-muted-foreground mb-8 max-w-3xl mx-auto">
            Our system implements the renowned Japanese Machida waste separation and recycling methodology, 
            ensuring maximum efficiency and minimal environmental impact while supporting local hydroponic agriculture.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <div className="bg-white rounded-xl p-6 shadow-eco">
              <div className="text-3xl font-bold text-primary mb-2">1 KG</div>
              <div className="text-sm text-muted-foreground">Plastic Waste</div>
            </div>
            <ArrowRight className="w-6 h-6 text-primary rotate-90 md:rotate-0" />
            <div className="bg-white rounded-xl p-6 shadow-eco">
              <div className="text-3xl font-bold text-secondary mb-2">10</div>
              <div className="text-sm text-muted-foreground">EcoPoints</div>
            </div>
            <ArrowRight className="w-6 h-6 text-primary rotate-90 md:rotate-0" />
            <div className="bg-white rounded-xl p-6 shadow-eco">
              <div className="text-3xl font-bold text-accent-foreground mb-2">1</div>
              <div className="text-sm text-muted-foreground">Lettuce Seedling</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;