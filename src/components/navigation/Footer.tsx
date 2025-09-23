import { Recycle, Facebook, Instagram, Twitter, Mail } from "lucide-react";

const Footer = () => {
  const footerSections = [
    {
      title: "Services",
      links: [
        { name: "Waste Collection", href: "#" },
        { name: "EcoPoints System", href: "#" },
        { name: "Hydroponic Products", href: "#" },
        { name: "Community Programs", href: "#" }
      ]
    },
    {
      title: "Support",
      links: [
        { name: "How It Works", href: "#" },
        { name: "FAQ", href: "#" },
        { name: "Contact Us", href: "#" },
        { name: "Track Pickup", href: "#" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#" },
        { name: "Our Mission", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Press", href: "#" }
      ]
    }
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Recycle className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-xl">EcoPoints Indonesia</div>
                <div className="text-white/70 text-sm">Sustainable Future</div>
              </div>
            </div>
            <p className="text-white/80 leading-relaxed mb-6">
              Transforming waste into sustainable opportunities across West Java. 
              Building a cleaner, greener future through community-driven recycling.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-bold text-lg mb-6">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-white/80 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* SDG Recognition */}
        <div className="bg-white/10 rounded-2xl p-8 mb-12">
          <h3 className="font-bold text-xl mb-4 text-center">Contributing to UN Sustainable Development Goals</h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 text-center">
            {[3, 6, 11, 12, 13, 15].map((goal) => (
              <div key={goal} className="bg-white/10 rounded-lg p-3">
                <div className="text-2xl font-bold mb-1">SDG {goal}</div>
                <div className="text-xs text-white/70">
                  {goal === 3 && "Health & Well-being"}
                  {goal === 6 && "Clean Water"}
                  {goal === 11 && "Sustainable Cities"}
                  {goal === 12 && "Responsible Consumption"}
                  {goal === 13 && "Climate Action"}
                  {goal === 15 && "Life on Land"}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-white/70 text-sm">
              © 2024 EcoPoints Indonesia. All rights reserved. Supporting sustainable development across Indonesia.
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-white/70 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;