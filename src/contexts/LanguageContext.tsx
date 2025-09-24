import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'id';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'nav.howItWorks': 'How It Works',
    'nav.sdgImpact': 'SDG Impact',
    'nav.products': 'Products',
    'nav.about': 'About',
    'nav.login': 'Login',
    'nav.getStarted': 'Get Started',
    
    // Hero Section
    'hero.title': 'Transform Waste into Green Solutions',
    'hero.subtitle': 'Join Indonesia\'s sustainable revolution. Exchange your waste for points and invest in hydroponic systems inspired by Japanese Machida technique.',
    'hero.cta.pickup': 'Schedule Pickup',
    'hero.cta.learn': 'Learn More',
    'hero.stats.waste': 'Waste Collected',
    'hero.stats.families': 'Families Served',
    'hero.stats.plants': 'Plants Grown',
    
    // How It Works
    'howItWorks.title': 'How EcoPoints Works',
    'howItWorks.subtitle': 'Transform your waste into valuable points through our simple 3-step process',
    'howItWorks.step1.title': 'Schedule Pickup',
    'howItWorks.step1.desc': 'Book a pickup time through our app. Our eco-friendly van will collect your sorted waste.',
    'howItWorks.step2.title': 'Earn Points',
    'howItWorks.step2.desc': 'Get points based on waste weight and type. Clean, sorted waste earns more points.',
    'howItWorks.step3.title': 'Shop Green',
    'howItWorks.step3.desc': 'Exchange points for hydroponic systems and sustainable products.',
    'howItWorks.cta': 'Start Earning Points',
    
    // SDG Section
    'sdg.title': 'Contributing to UN Sustainable Development Goals',
    'sdg.subtitle': 'Our waste-to-value system directly supports multiple SDGs, creating positive environmental and social impact across West Java.',
    'sdg.goal11.title': 'Sustainable Cities',
    'sdg.goal11.desc': 'Reducing urban waste and promoting circular economy in Indonesian cities.',
    'sdg.goal12.title': 'Responsible Consumption',
    'sdg.goal12.desc': 'Encouraging sustainable waste management and resource efficiency.',
    'sdg.goal15.title': 'Life on Land',
    'sdg.goal15.desc': 'Promoting urban agriculture and green spaces through hydroponics.',
    'sdg.cta': 'Learn About Our Impact',
    
    // Hydroponics Section
    'hydroponics.title': 'Machida-Inspired Hydroponic Systems',
    'hydroponics.subtitle': 'Experience the future of sustainable agriculture with systems inspired by Japanese innovation',
    'hydroponics.starter.title': 'Starter Kit',
    'hydroponics.starter.price': '150 Points',
    'hydroponics.starter.desc': 'Perfect for beginners',
    'hydroponics.starter.features': 'Small herbs, Easy setup, 2 plant capacity',
    'hydroponics.advanced.title': 'Advanced System',
    'hydroponics.advanced.price': '300 Points',
    'hydroponics.advanced.desc': 'For serious growers',
    'hydroponics.advanced.features': 'Multiple vegetables, Automated, 8 plant capacity',
    'hydroponics.premium.title': 'Premium Setup',
    'hydroponics.premium.price': '500 Points',
    'hydroponics.premium.desc': 'Commercial grade',
    'hydroponics.premium.features': 'Full garden, Smart monitoring, 20 plant capacity',
    'hydroponics.cta': 'Exchange Points',
    
    // CTA Section
    'cta.title': 'Ready to Make a Difference?',
    'cta.subtitle': 'Join thousands of Indonesian families creating a sustainable future through smart waste management.',
    'cta.button': 'Start Your Journey',
    
    // Footer
    'footer.tagline': 'Building a sustainable future for Indonesia, one pickup at a time.',
    'footer.company': 'Company',
    'footer.aboutUs': 'About Us',
    'footer.careers': 'Careers',
    'footer.contact': 'Contact',
    'footer.services': 'Services',
    'footer.wastePickup': 'Waste Pickup',
    'footer.pointsSystem': 'Points System',
    'footer.hydroponics': 'Hydroponics',
    'footer.support': 'Support',
    'footer.help': 'Help Center',
    'footer.faq': 'FAQ',
    'footer.terms': 'Terms of Service',
    'footer.privacy': 'Privacy Policy',
    'footer.rights': 'All rights reserved.',
    
    // Modals
    'modal.pickup.title': 'Schedule Waste Pickup',
    'modal.pickup.name': 'Full Name',
    'modal.pickup.phone': 'Phone Number',
    'modal.pickup.address': 'Pickup Address',
    'modal.pickup.date': 'Preferred Date',
    'modal.pickup.time': 'Preferred Time',
    'modal.pickup.wasteType': 'Waste Types',
    'modal.pickup.plastic': 'Plastic',
    'modal.pickup.paper': 'Paper',
    'modal.pickup.metal': 'Metal',
    'modal.pickup.organic': 'Organic',
    'modal.pickup.estimate': 'Estimated Weight (kg)',
    'modal.pickup.notes': 'Additional Notes',
    'modal.pickup.schedule': 'Schedule Pickup',
    'modal.pickup.success': 'Pickup scheduled successfully! We\'ll contact you soon.',
    
    'modal.exchange.title': 'Exchange Points for Products',
    'modal.exchange.points': 'Available Points',
    'modal.exchange.product': 'Select Product',
    'modal.exchange.starter': 'Starter Kit (150 points)',
    'modal.exchange.advanced': 'Advanced System (300 points)',
    'modal.exchange.premium': 'Premium Setup (500 points)',
    'modal.exchange.delivery': 'Delivery Address',
    'modal.exchange.exchange': 'Exchange Points',
    'modal.exchange.success': 'Exchange successful! Your product will be delivered within 3-5 days.',
    'modal.exchange.insufficient': 'Insufficient points for this product.'
  },
  id: {
    // Navigation
    'nav.howItWorks': 'Cara Kerja',
    'nav.sdgImpact': 'Dampak SDG',
    'nav.products': 'Produk',
    'nav.about': 'Tentang',
    'nav.login': 'Masuk',
    'nav.getStarted': 'Mulai',
    
    // Hero Section
    'hero.title': 'Ubah Sampah Menjadi Solusi Hijau',
    'hero.subtitle': 'Bergabunglah dengan revolusi berkelanjutan Indonesia. Tukar sampah Anda dengan poin dan investasi dalam sistem hidroponik yang terinspirasi dari teknik Machida Jepang.',
    'hero.cta.pickup': 'Jadwalkan Pickup',
    'hero.cta.learn': 'Pelajari Lebih Lanjut',
    'hero.stats.waste': 'Sampah Terkumpul',
    'hero.stats.families': 'Keluarga Terlayani',
    'hero.stats.plants': 'Tanaman Tumbuh',
    
    // How It Works
    'howItWorks.title': 'Cara Kerja EcoPoints',
    'howItWorks.subtitle': 'Ubah sampah Anda menjadi poin berharga melalui proses 3 langkah sederhana kami',
    'howItWorks.step1.title': 'Jadwalkan Pickup',
    'howItWorks.step1.desc': 'Pesan waktu pickup melalui aplikasi kami. Van ramah lingkungan kami akan mengumpulkan sampah yang sudah dipilah.',
    'howItWorks.step2.title': 'Dapatkan Poin',
    'howItWorks.step2.desc': 'Dapatkan poin berdasarkan berat dan jenis sampah. Sampah yang bersih dan terpilah mendapat lebih banyak poin.',
    'howItWorks.step3.title': 'Belanja Hijau',
    'howItWorks.step3.desc': 'Tukarkan poin dengan sistem hidroponik dan produk berkelanjutan.',
    'howItWorks.cta': 'Mulai Kumpulkan Poin',
    
    // SDG Section
    'sdg.title': 'Berkontribusi pada Tujuan Pembangunan Berkelanjutan PBB',
    'sdg.subtitle': 'Sistem waste-to-value kami secara langsung mendukung berbagai SDG, menciptakan dampak positif lingkungan dan sosial di seluruh Jawa Barat.',
    'sdg.goal11.title': 'Kota Berkelanjutan',
    'sdg.goal11.desc': 'Mengurangi limbah perkotaan dan mempromosikan ekonomi sirkular di kota-kota Indonesia.',
    'sdg.goal12.title': 'Konsumsi Bertanggung Jawab',
    'sdg.goal12.desc': 'Mendorong pengelolaan limbah berkelanjutan dan efisiensi sumber daya.',
    'sdg.goal15.title': 'Kehidupan di Darat',
    'sdg.goal15.desc': 'Mempromosikan pertanian perkotaan dan ruang hijau melalui hidroponik.',
    'sdg.cta': 'Pelajari Dampak Kami',
    
    // Hydroponics Section
    'hydroponics.title': 'Sistem Hidroponik Terinspirasi Machida',
    'hydroponics.subtitle': 'Rasakan masa depan pertanian berkelanjutan dengan sistem yang terinspirasi dari inovasi Jepang',
    'hydroponics.starter.title': 'Paket Pemula',
    'hydroponics.starter.price': '150 Poin',
    'hydroponics.starter.desc': 'Sempurna untuk pemula',
    'hydroponics.starter.features': 'Herbal kecil, Setup mudah, Kapasitas 2 tanaman',
    'hydroponics.advanced.title': 'Sistem Lanjutan',
    'hydroponics.advanced.price': '300 Poin',
    'hydroponics.advanced.desc': 'Untuk petani serius',
    'hydroponics.advanced.features': 'Berbagai sayuran, Otomatis, Kapasitas 8 tanaman',
    'hydroponics.premium.title': 'Setup Premium',
    'hydroponics.premium.price': '500 Poin',
    'hydroponics.premium.desc': 'Kelas komersial',
    'hydroponics.premium.features': 'Kebun penuh, Monitoring pintar, Kapasitas 20 tanaman',
    'hydroponics.cta': 'Tukar Poin',
    
    // CTA Section
    'cta.title': 'Siap Membuat Perubahan?',
    'cta.subtitle': 'Bergabunglah dengan ribuan keluarga Indonesia menciptakan masa depan berkelanjutan melalui pengelolaan sampah yang cerdas.',
    'cta.button': 'Mulai Perjalanan Anda',
    
    // Footer
    'footer.tagline': 'Membangun masa depan berkelanjutan untuk Indonesia, satu pickup pada satu waktu.',
    'footer.company': 'Perusahaan',
    'footer.aboutUs': 'Tentang Kami',
    'footer.careers': 'Karir',
    'footer.contact': 'Kontak',
    'footer.services': 'Layanan',
    'footer.wastePickup': 'Pickup Sampah',
    'footer.pointsSystem': 'Sistem Poin',
    'footer.hydroponics': 'Hidroponik',
    'footer.support': 'Dukungan',
    'footer.help': 'Pusat Bantuan',
    'footer.faq': 'FAQ',
    'footer.terms': 'Syarat Layanan',
    'footer.privacy': 'Kebijakan Privasi',
    'footer.rights': 'Semua hak dilindungi.',
    
    // Modals
    'modal.pickup.title': 'Jadwalkan Pickup Sampah',
    'modal.pickup.name': 'Nama Lengkap',
    'modal.pickup.phone': 'Nomor Telepon',
    'modal.pickup.address': 'Alamat Pickup',
    'modal.pickup.date': 'Tanggal Diinginkan',
    'modal.pickup.time': 'Waktu Diinginkan',
    'modal.pickup.wasteType': 'Jenis Sampah',
    'modal.pickup.plastic': 'Plastik',
    'modal.pickup.paper': 'Kertas',
    'modal.pickup.metal': 'Logam',
    'modal.pickup.organic': 'Organik',
    'modal.pickup.estimate': 'Perkiraan Berat (kg)',
    'modal.pickup.notes': 'Catatan Tambahan',
    'modal.pickup.schedule': 'Jadwalkan Pickup',
    'modal.pickup.success': 'Pickup berhasil dijadwalkan! Kami akan menghubungi Anda segera.',
    
    'modal.exchange.title': 'Tukar Poin untuk Produk',
    'modal.exchange.points': 'Poin Tersedia',
    'modal.exchange.product': 'Pilih Produk',
    'modal.exchange.starter': 'Paket Pemula (150 poin)',
    'modal.exchange.advanced': 'Sistem Lanjutan (300 poin)',
    'modal.exchange.premium': 'Setup Premium (500 poin)',
    'modal.exchange.delivery': 'Alamat Pengiriman',
    'modal.exchange.exchange': 'Tukar Poin',
    'modal.exchange.success': 'Penukaran berhasil! Produk Anda akan dikirim dalam 3-5 hari.',
    'modal.exchange.insufficient': 'Poin tidak cukup untuk produk ini.'
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('preferred-language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('preferred-language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}