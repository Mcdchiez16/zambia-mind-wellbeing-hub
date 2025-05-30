
import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChartBar, HeartPulse, Map, Menu, X, Brain, Quote, Star, Phone } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import ThemeToggle from "@/components/ThemeToggle";
import EmergencyHotline from "@/components/EmergencyHotline";

// Motivational quotes array
const quotes = [
  { text: "Mental health is not a destination, but a journey.", author: "Zambian Proverb" },
  { text: "Every day may not be good, but there is good in every day.", author: "Unknown" },
  { text: "You don't have to be positive all the time. It's perfectly okay to feel sad, angry or scared.", author: "Lori Deschene" },
  { text: "Recovery is not one and done. It is a lifelong journey that takes place one day, one step at a time.", author: "Unknown" },
  { text: "The strongest people are those who win battles we know nothing about.", author: "Unknown" },
  { text: "Self-care is how you take your power back.", author: "Lalah Delia" },
  { text: "There is hope, even when your brain tells you there isn't.", author: "John Green" },
  { text: "You are not alone in this journey.", author: "Zambia Mind" }
];

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [showQuote, setShowQuote] = useState(false);
  const [showHotline, setShowHotline] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
    
    // Change quote every 20 seconds
    const quoteInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setCurrentQuote(quotes[randomIndex]);
      setShowQuote(true);
      
      // Fade out quote after 15 seconds
      setTimeout(() => setShowQuote(false), 15000);
    }, 20000);
    
    // Show initial quote after 3 seconds
    const initialTimeout = setTimeout(() => setShowQuote(true), 3000);
    
    return () => {
      clearInterval(quoteInterval);
      clearTimeout(initialTimeout);
    };
  }, [location.pathname]);

  const navigationItems = [
    {
      name: "Insights Center",
      path: "/dashboard",
      icon: <Brain className="h-5 w-5" />,
    },
    {
      name: "Wellness",
      path: "/wellness",
      icon: <HeartPulse className="h-5 w-5" />,
    },
    {
      name: "Resources",
      path: "/resources",
      icon: <Map className="h-5 w-5" />,
    },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-950 transition-colors">
      <header className="border-b bg-gradient-to-r from-violet-700 to-fuchsia-700 dark:from-violet-900 dark:to-fuchsia-900 text-white sticky top-0 z-30 shadow-md">
        <div className="container mx-auto px-4">
          {/* Motivational Quote Banner */}
          <div 
            className={`bg-gradient-to-r from-violet-800/70 to-fuchsia-800/70 dark:from-violet-900/70 dark:to-fuchsia-900/70 backdrop-blur-md border-b border-white/10 py-1 text-center transition-all duration-1000 overflow-hidden ${showQuote ? 'max-h-16 opacity-100' : 'max-h-0 opacity-0'}`}
          >
            <div className="flex items-center justify-center text-sm">
              <Quote className="h-3 w-3 text-violet-200 mr-2 flex-shrink-0" />
              <p className="text-white/90 italic">
                "{currentQuote.text}" <span className="text-violet-200 not-italic">— {currentQuote.author}</span>
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <div className="text-white font-bold text-xl flex items-center">
                  <span className="bg-white p-2 rounded-lg mr-2 flex items-center justify-center shadow-lg">
                    <Brain className="h-5 w-5 text-violet-700 dark:text-violet-800" />
                  </span>
                  <span className="text-white">
                    Zambia Mind
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              <Button 
                variant="ghost" 
                className="bg-violet-800/50 hover:bg-violet-800 text-white rounded-full flex items-center gap-2"
                onClick={() => setShowHotline(!showHotline)}
              >
                <Phone className="h-4 w-4 animate-pulse" />
                <span>Emergency Hotline</span>
              </Button>
              
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center text-sm font-medium rounded-full px-4 py-2 transition-all duration-300 ${
                    isActive(item.path)
                      ? "bg-white text-violet-700 dark:bg-violet-900 dark:text-white shadow-md"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  <span className={`mr-2 ${isActive(item.path) ? "animate-pulse" : ""}`}>{item.icon}</span>
                  <span>{item.name}</span>
                  {isActive(item.path) && (
                    <span className="ml-2">
                      <Star className="h-3 w-3 fill-current" />
                    </span>
                  )}
                </Link>
              ))}
              <div className="ml-2">
                <ThemeToggle />
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
                onClick={() => setShowHotline(!showHotline)}
              >
                <Phone className="h-5 w-5 animate-pulse" />
              </Button>
              <ThemeToggle />
              <button
                className="p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6 text-white" />
                ) : (
                  <Menu className="h-6 w-6 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobile && isMenuOpen && (
          <div className="fixed inset-0 top-16 bg-gradient-to-b from-violet-700 to-fuchsia-800 dark:from-violet-900 dark:to-fuchsia-950 z-20 p-4">
            <nav className="flex flex-col space-y-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center p-4 rounded-lg shadow-sm ${
                    isActive(item.path)
                      ? "bg-white text-violet-700 dark:bg-gray-800 dark:text-white"
                      : "bg-violet-600/50 text-white hover:bg-violet-600/70 dark:bg-violet-800/50 dark:hover:bg-violet-800/70"
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span className="text-lg">{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Emergency Hotline Modal */}
      {showHotline && <EmergencyHotline onClose={() => setShowHotline(false)} />}

      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-3">Zambia Mind</h3>
              <p className="text-gray-400">
                Promoting mental health awareness and providing resources across Zambia.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
                <li><Link to="/dashboard" className="text-gray-400 hover:text-white">Insights Center</Link></li>
                <li><Link to="/wellness" className="text-gray-400 hover:text-white">Wellness Check</Link></li>
                <li><Link to="/resources" className="text-gray-400 hover:text-white">Resources</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3">Emergency Help</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">Mental Health Hotline: <span className="text-white">116</span></li>
                <li className="text-gray-400">Crisis Text: <span className="text-white">Text "HELP" to 5011</span></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-800 text-center text-gray-400 text-sm">
            &copy; 2025 Zambia Mind Wellbeing Hub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
