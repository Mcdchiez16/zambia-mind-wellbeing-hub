import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { HeartPulse, Map, Menu, X, Phone } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import ThemeToggle from "@/components/ThemeToggle";
import EmergencyHotline from "@/components/EmergencyHotline";

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showHotline, setShowHotline] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: "Wellness", path: "/wellness", icon: <HeartPulse className="h-4 w-4" /> },
    { name: "Resources", path: "/resources", icon: <Map className="h-4 w-4" /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Dynamic header styles based on page and scroll
  const headerBg = isHomePage && !scrolled 
    ? "bg-transparent" 
    : "bg-background/95 backdrop-blur-md border-b border-border shadow-sm";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Brand */}
            <Link to="/" className="flex items-center gap-1">
              <span className="text-2xl font-bold tracking-tight">
                <span className="text-primary">Zambia</span>
                <span className="text-foreground">Mind</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isActive(item.path)
                      ? "bg-primary text-primary-foreground"
                      : isHomePage && !scrolled
                        ? "text-foreground/80 hover:text-foreground hover:bg-foreground/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
              
              <div className="w-px h-6 bg-border mx-2" />
              
              <button 
                onClick={() => setShowHotline(!showHotline)}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
              >
                <Phone className="h-4 w-4" />
                Emergency
              </button>
              
              <div className="ml-2">
                <ThemeToggle />
              </div>
            </nav>

            {/* Mobile Controls */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={() => setShowHotline(!showHotline)}
                className="p-2 rounded-full bg-destructive text-destructive-foreground"
              >
                <Phone className="h-4 w-4" />
              </button>
              <ThemeToggle />
              <button
                className="p-2 rounded-full hover:bg-muted transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5 text-foreground" />
                ) : (
                  <Menu className="h-5 w-5 text-foreground" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobile && isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {showHotline && <EmergencyHotline onClose={() => setShowHotline(false)} />}

      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-1 mb-4">
                <span className="text-xl font-bold tracking-tight">
                  <span className="text-primary">Zambia</span>
                  <span className="text-foreground">Mind</span>
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Promoting mental health awareness and providing resources across Zambia.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-4">Navigation</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link></li>
                <li><Link to="/wellness" className="text-muted-foreground hover:text-foreground transition-colors">Wellness Check</Link></li>
                <li><Link to="/resources" className="text-muted-foreground hover:text-foreground transition-colors">Resources</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-4">Emergency Help</h3>
              <ul className="space-y-2 text-sm">
                <li className="text-muted-foreground">
                  Mental Health Hotline: <span className="text-foreground font-medium">116</span>
                </li>
                <li className="text-muted-foreground">
                  Crisis Text: <span className="text-foreground font-medium">Text "HELP" to 5011</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-4">Connect</h3>
              <div className="flex gap-3">
                <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-muted hover:bg-primary hover:text-primary-foreground text-muted-foreground transition-colors">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
                </a>
                <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-muted hover:bg-primary hover:text-primary-foreground text-muted-foreground transition-colors">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/></svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-10 pt-6 border-t border-border text-center text-sm text-muted-foreground">
            © 2025 ZambiaMind Wellbeing Hub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
