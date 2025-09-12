import { createContext, useContext, useState, ReactNode } from 'react';

interface Translations {
  [key: string]: string;
}

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<string, Translations> = {
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.routes': 'Routes',
    'nav.schedules': 'Schedules',
    'nav.safety': 'Safety',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    
    // Common
    'common.search': 'Search',
    'common.loading': 'Loading...',
    'common.noData': 'No data available',
    'common.emergency': 'Emergency',
    'common.help': 'Help',
    'common.submit': 'Submit',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    
    // Dashboard
    'dashboard.title': 'Live Bus Tracking',
    'dashboard.subtitle': 'Real-time bus locations and schedules',
    'dashboard.searchPlaceholder': 'Search for buses, routes, or destinations...',
    'dashboard.nearbyBuses': 'Nearby Buses',
    'dashboard.activeBuses': 'Active Buses',
    'dashboard.totalRoutes': 'Total Routes',
    'dashboard.onTimePerf': 'On-Time Performance',
    'dashboard.viewAll': 'View All Buses',
    'dashboard.nextBus': 'Next Bus',
    'dashboard.estimatedArrival': 'Estimated Arrival',
    
    // Routes
    'routes.title': 'Bus Routes',
    'routes.subtitle': 'Explore all available bus routes in Punjab',
    'routes.searchRoutes': 'Search routes...',
    'routes.viewDetails': 'View Details',
    'routes.frequency': 'Frequency',
    'routes.duration': 'Duration',
    'routes.firstBus': 'First Bus',
    'routes.lastBus': 'Last Bus',
    
    // Footer
    'footer.description': "Government of Punjab's official bus tracking and transportation service.",
    'footer.quickLinks': 'Quick Links',
    'footer.allRoutes': 'All Routes',
    'footer.busSchedules': 'Bus Schedules',
    'footer.safetyFeatures': 'Safety Features',
    'footer.helpSupport': 'Help & Support',
    'footer.emergency': 'Emergency',
    'footer.police': 'Police',
    'footer.womenHelpline': 'Women Helpline',
    'footer.transportAuthority': 'Transport Authority',
    'footer.copyright': '© 2024 Government of Punjab. All rights reserved.',
    
    // Brand
    'brand.name': 'Punjab Bus',
    'brand.tagline': 'Government Transport',
  },
  
  hi: {
    // Navigation
    'nav.dashboard': 'डैशबोर्ड',
    'nav.routes': 'मार्ग',
    'nav.schedules': 'समय सारणी',
    'nav.safety': 'सुरक्षा',
    'nav.about': 'हमारे बारे में',
    'nav.contact': 'संपर्क',
    
    // Common
    'common.search': 'खोजें',
    'common.loading': 'लोड हो रहा है...',
    'common.noData': 'कोई डेटा उपलब्ध नहीं',
    'common.emergency': 'आपातकाल',
    'common.help': 'सहायता',
    'common.submit': 'सबमिट करें',
    'common.cancel': 'रद्द करें',
    'common.save': 'सहेजें',
    
    // Dashboard
    'dashboard.title': 'लाइव बस ट्रैकिंग',
    'dashboard.subtitle': 'रियल-टाइम बस स्थान और समय सारणी',
    'dashboard.searchPlaceholder': 'बसों, मार्गों या गंतव्यों की खोज करें...',
    'dashboard.nearbyBuses': 'नजदीकी बसें',
    'dashboard.activeBuses': 'सक्रिय बसें',
    'dashboard.totalRoutes': 'कुल मार्ग',
    'dashboard.onTimePerf': 'समय पर प्रदर्शन',
    'dashboard.viewAll': 'सभी बसें देखें',
    'dashboard.nextBus': 'अगली बस',
    'dashboard.estimatedArrival': 'अनुमानित आगमन',
    
    // Routes
    'routes.title': 'बस मार्ग',
    'routes.subtitle': 'पंजाब में सभी उपलब्ध बस मार्गों का अन्वेषण करें',
    'routes.searchRoutes': 'मार्ग खोजें...',
    'routes.viewDetails': 'विवरण देखें',
    'routes.frequency': 'आवृत्ति',
    'routes.duration': 'अवधि',
    'routes.firstBus': 'पहली बस',
    'routes.lastBus': 'अंतिम बस',
    
    // Footer
    'footer.description': 'पंजाब सरकार की आधिकारिक बस ट्रैकिंग और परिवहन सेवा।',
    'footer.quickLinks': 'त्वरित लिंक',
    'footer.allRoutes': 'सभी मार्ग',
    'footer.busSchedules': 'बस समय सारणी',
    'footer.safetyFeatures': 'सुरक्षा सुविधाएं',
    'footer.helpSupport': 'सहायता और समर्थन',
    'footer.emergency': 'आपातकाल',
    'footer.police': 'पुलिस',
    'footer.womenHelpline': 'महिला हेल्पलाइन',
    'footer.transportAuthority': 'परिवहन प्राधिकरण',
    'footer.copyright': '© 2024 पंजाब सरकार। सभी अधिकार सुरक्षित।',
    
    // Brand
    'brand.name': 'पंजाब बस',
    'brand.tagline': 'सरकारी परिवहन',
  },
  
  pa: {
    // Navigation
    'nav.dashboard': 'ਡੈਸ਼ਬੋਰਡ',
    'nav.routes': 'ਰੂਟ',
    'nav.schedules': 'ਸਮਾਂ ਸਾਰਣੀ',
    'nav.safety': 'ਸੁਰੱਖਿਆ',
    'nav.about': 'ਸਾਡੇ ਬਾਰੇ',
    'nav.contact': 'ਸੰਪਰਕ',
    
    // Common
    'common.search': 'ਖੋਜੋ',
    'common.loading': 'ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...',
    'common.noData': 'ਕੋਈ ਡੇਟਾ ਉਪਲਬਧ ਨਹੀਂ',
    'common.emergency': 'ਐਮਰਜੈਂਸੀ',
    'common.help': 'ਮਦਦ',
    'common.submit': 'ਜਮ੍ਹਾਂ ਕਰੋ',
    'common.cancel': 'ਰੱਦ ਕਰੋ',
    'common.save': 'ਸੇਵ ਕਰੋ',
    
    // Dashboard
    'dashboard.title': 'ਲਾਈਵ ਬੱਸ ਟਰੈਕਿੰਗ',
    'dashboard.subtitle': 'ਰੀਅਲ-ਟਾਈਮ ਬੱਸ ਸਥਿਤੀਆਂ ਅਤੇ ਸਮਾਂ ਸਾਰਣੀ',
    'dashboard.searchPlaceholder': 'ਬੱਸਾਂ, ਰੂਟਾਂ ਜਾਂ ਮੰਜ਼ਿਲਾਂ ਦੀ ਖੋਜ ਕਰੋ...',
    'dashboard.nearbyBuses': 'ਨੇੜਲੀਆਂ ਬੱਸਾਂ',
    'dashboard.activeBuses': 'ਸਰਗਰਮ ਬੱਸਾਂ',
    'dashboard.totalRoutes': 'ਕੁੱਲ ਰੂਟ',
    'dashboard.onTimePerf': 'ਸਮੇਂ ਤੇ ਪ੍ਰਦਰਸ਼ਨ',
    'dashboard.viewAll': 'ਸਾਰੀਆਂ ਬੱਸਾਂ ਦੇਖੋ',
    'dashboard.nextBus': 'ਅਗਲੀ ਬੱਸ',
    'dashboard.estimatedArrival': 'ਅਨੁਮਾਨਿਤ ਆਗਮਨ',
    
    // Routes
    'routes.title': 'ਬੱਸ ਰੂਟ',
    'routes.subtitle': 'ਪੰਜਾਬ ਵਿੱਚ ਸਾਰੇ ਉਪਲਬਧ ਬੱਸ ਰੂਟਾਂ ਦਾ ਪਤਾ ਲਗਾਓ',
    'routes.searchRoutes': 'ਰੂਟ ਖੋਜੋ...',
    'routes.viewDetails': 'ਵੇਰਵੇ ਦੇਖੋ',
    'routes.frequency': 'ਬਾਰੰਬਾਰਤਾ',
    'routes.duration': 'ਮਿਆਦ',
    'routes.firstBus': 'ਪਹਿਲੀ ਬੱਸ',
    'routes.lastBus': 'ਆਖਰੀ ਬੱਸ',
    
    // Footer
    'footer.description': 'ਪੰਜਾਬ ਸਰਕਾਰ ਦੀ ਅਧਿਕਾਰਿਕ ਬੱਸ ਟਰੈਕਿੰਗ ਅਤੇ ਟਰਾਂਸਪੋਰਟੇਸ਼ਨ ਸੇਵਾ।',
    'footer.quickLinks': 'ਤੇਜ਼ ਲਿੰਕ',
    'footer.allRoutes': 'ਸਾਰੇ ਰੂਟ',
    'footer.busSchedules': 'ਬੱਸ ਸਮਾਂ ਸਾਰਣੀ',
    'footer.safetyFeatures': 'ਸੁਰੱਖਿਆ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ',
    'footer.helpSupport': 'ਮਦਦ ਅਤੇ ਸਹਾਇਤਾ',
    'footer.emergency': 'ਐਮਰਜੈਂਸੀ',
    'footer.police': 'ਪੁਲਿਸ',
    'footer.womenHelpline': 'ਔਰਤ ਹੈਲਪਲਾਈਨ',
    'footer.transportAuthority': 'ਟਰਾਂਸਪੋਰਟ ਅਥਾਰਟੀ',
    'footer.copyright': '© 2024 ਪੰਜਾਬ ਸਰਕਾਰ। ਸਾਰੇ ਅਧਿਕਾਰ ਰਾਖਵੇਂ ਹਨ।',
    
    // Brand
    'brand.name': 'ਪੰਜਾਬ ਬੱਸ',
    'brand.tagline': 'ਸਰਕਾਰੀ ਟਰਾਂਸਪੋਰਟ',
  },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState('en');

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};