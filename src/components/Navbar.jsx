import { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Mail, Phone, Clock, Menu, X, ArrowRight, UserCheck, LogOut } from "lucide-react";
import navlogo from "../../assets/navlogo.png";
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  // Function to load the user profile
  const checkUserStatus = () => {
    try {
      const stored = localStorage.getItem("pwwe_active_user");
      if (stored) {
        setCurrentUser(JSON.parse(stored));
      } else {
        setCurrentUser(null);
      }
    } catch (e) {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    // Initial check
    checkUserStatus();

    // Listen for custom authentication event
    window.addEventListener("pwwe_auth_sync", checkUserStatus);

    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("pwwe_auth_sync", checkUserStatus);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("pwwe_active_user");
    setCurrentUser(null);
    window.dispatchEvent(new Event("pwwe_auth_sync"));
    setIsMobileMenuOpen(false);
    navigate("/");
  };

  const navLinkClass = ({ isActive }) =>
    `relative py-2 text-xs uppercase font-semibold tracking-wider transition-all duration-300 ${
      isActive
        ? "text-brand-purple font-bold"
        : "text-brand-dark/70 hover:text-brand-purple"
    }`;

  return (
    <header className="w-full z-50">
      {/* Top Utility Bar - Black Background, Purple/Gold details, fully custom */}
      <div className="bg-[#120A14] text-brand-light text-xs font-mono py-2.5 px-6 border-b border-brand-purple/20 hidden md:block animate-fade-in">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a
              href="mailto:contact@pwwefoundation.com"
              className="flex items-center gap-2 hover:text-[#CC9838] transition-colors duration-200"
              id="nav-email-link"
            >
              <Mail size={13} className="text-[#CC9838]" />
              <span>contact@pwwefoundation.com</span>
            </a>
            <a
              href="tel:+2349031463004"
              className="flex items-center gap-2 hover:text-[#CC9838] transition-colors duration-200"
              id="nav-phone-link"
            >
              <Phone size={13} className="text-[#CC9838]" />
              <span>(+234) 903 146 3004</span>
            </a>
          </div>
          <div className="flex items-center gap-4 text-brand-light/85">
            <div className="flex items-center gap-2">
              <Clock size={13} className="text-[#CC9838]" />
              <span>Mon–Fri: 9am–5pm</span>
            </div>
            <span className="text-white/25">|</span>
            <span className="text-[10px] rounded bg-[#CC9838]/20 text-[#CC9838] px-2.5 py-1 font-sans font-bold tracking-widest uppercase">
              Ibadan, Oyo State
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? "sticky top-0 bg-[#FAF8F5]/95 backdrop-blur-md shadow-xs border-b border-brand-purple/15 py-3"
            : "relative bg-[#FAF8F5] py-5"
        }`}
        style={{ position: "sticky", top: 0 }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
          {/* Authentic typographic branding */}
          <Link to="/" className="flex items-center gap-3 group" id="navbar-logo-link">
            {/* SVG Logo Mark representing growth & mutual support with gold and purple */}
              <div className="h-16 w-16 sm:h-20 sm:w-20 flex items-center justify-center  group-hover:shadow-md group-hover:scale-105 transition-all duration-300">
                <img src={navlogo} alt="PWWE LOGO" className="h-12 w-12 sm:h-16 sm:w-16 object-contain" />
              </div>
            <div>
              <span className="block font-display text-lg font-black tracking-tight text-brand-dark leading-none">
                PWWE <span className="text-[#CC9838]">Foundation</span>
              </span>
              <span className="block text-[8.5px] uppercase font-mono tracking-widest text-[#96158F] mt-1 font-bold">
                Cooperative Network
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              <NavLink to="/" className={navLinkClass}>
                {({ isActive }) => (
                  <span className="relative py-1">
                    Home
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#CC9838] scale-x-100 transition-transform" />
                    )}
                  </span>
                )}
              </NavLink>
              <NavLink to="/about" className={navLinkClass}>
                {({ isActive }) => (
                  <span className="relative py-1">
                    About Us
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#CC9838] scale-x-100 transition-transform" />
                    )}
                  </span>
                )}
              </NavLink>
              <NavLink to="/contact" className={navLinkClass}>
                {({ isActive }) => (
                  <span className="relative py-1">
                    Contact
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#CC9838] scale-x-100 transition-transform" />
                    )}
                  </span>
                )}
              </NavLink>
              <NavLink to="/auth" className={navLinkClass}>
                {({ isActive }) => (
                  <span className="relative py-1">
                    Login
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#CC9838] scale-x-100 transition-transform" />
                    )}
                  </span>
                )}
              </NavLink>
            </div>

            <div className="h-6 w-[1px] bg-brand-dark/15" />

            {/* Dynamic user greeting / join prompt - Highly crafted custom human design */}
            {currentUser ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-brand-purple-light px-3 py-1.5 border border-brand-purple/10">
                  <UserCheck size={14} className="text-brand-purple" />
                  <span className="text-xs font-mono font-bold text-brand-purple">
                    Hi, {currentUser.name.split(" ")[0]}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 border border-brand-purple/10 text-brand-dark/70 hover:text-brand-purple hover:bg-brand-purple-light transition-all rounded-xs cursor-pointer"
                  title="Log Out Session"
                  id="nav-logout-btn"
                >
                  <LogOut size={14} />
                </button>
              </div>
            ) : (
              <Link
                to="/auth?tab=register"
                className="px-5 py-2.5 bg-brand-purple rounded-3xl text-brand-light text-xs font-mono uppercase tracking-widest font-bold border border-brand-purple hover:bg-[#FAF8F5] hover:text-brand-purple transition-all duration-300 flex items-center gap-2 group shadow-xs"
                id="nav-cta-signup"
              >
                <span>Register</span>
                <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-brand-dark hover:text-brand-purple transition-colors duration-200 focus:outline-none"
            aria-label="Toggle Menu"
            id="mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu with transition */}
        <div
          className={`md:hidden absolute top-full left-0 w-full bg-[#FAF8F5] border-b border-brand-purple/10 overflow-hidden transition-all duration-500 ease-in-out ${
            isMobileMenuOpen ? "max-h-[380px] opacity-100 py-6" : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          <div className="px-6 flex flex-col gap-4">
            <NavLink
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `text-sm font-bold tracking-wider uppercase py-2 border-b border-brand-dark/5 block ${
                  isActive ? "text-brand-purple" : "text-brand-dark/70"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `text-sm font-bold tracking-wider uppercase py-2 border-b border-brand-dark/5 block ${
                  isActive ? "text-brand-purple" : "text-brand-dark/70"
                }`
              }
            >
              About Us
            </NavLink>
            <NavLink
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `text-sm font-bold tracking-wider uppercase py-2 border-b border-brand-dark/5 block ${
                  isActive ? "text-brand-purple" : "text-brand-dark/70"
                }`
              }
            >
              Contact
            </NavLink>
            <NavLink
              to="/auth"
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `text-sm font-bold tracking-wider uppercase py-2 border-b border-brand-dark/5 block ${
                  isActive ? "text-brand-purple" : "text-brand-dark/70"
                }`
              }
            >
              Login
            </NavLink>

            {currentUser ? (
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-mono text-brand-purple uppercase">
                  Logged as: <strong>{currentUser.name}</strong>
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-brand-purple-light text-brand-purple font-mono text-xs uppercase font-bold border border-brand-purple/20 cursor-pointer"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <Link
                to="/auth?tab=register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-2 w-full py-3 bg-brand-purple text-brand-light font-mono text-xs uppercase tracking-widest font-bold text-center border border-brand-purple hover:bg-transparent hover:text-brand-purple transition-all duration-200 block"
                id="mobile-signup-cta"
              >
                Join PWWE Cooperative
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
