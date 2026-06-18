import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Mail, Phone, Clock, Menu, X, ArrowRight } from "lucide-react";
import navlogo from "../../assets/navlogo.png";

export default function Navbar({ onOpenSignUp }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Monitor scroll to apply sticky navbar styling shadows
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-brand-700 font-semibold border-b-2 border-brand-700 pb-1 transition-all text-sm tracking-wide"
      : "text-gray-700 hover:text-brand-700 transition-colors duration-200 font-medium text-sm tracking-wide";

  const mobileNavLinkClass = ({ isActive }) =>
    isActive
      ? "block px-4 py-3 bg-brand-50 text-brand-700 font-semibold border-l-4 border-brand-700 rounded-r-md transition-all text-sm tracking-wide"
      : "block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-brand-700 transition-colors duration-200 font-medium text-sm tracking-wide";

  return (
    <>
      {/* Upper Info Header (Hidden on Mobile) */}
      <div id="top-bar" className="bg-brand-900 text-white text-xs py-2 px-4 shadow-sm border-b border-brand-800 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <a href="mailto:contact@pwwefoundation.com" className="flex items-center space-x-2 hover:text-brand-200 transition-colors">
              <Mail className="h-3.5 w-3.5 text-brand-200" />
              <span>contact@pwwefoundation.com</span>
            </a>
            <a href="tel:+2349031463004" className="flex items-center space-x-2 hover:text-brand-200 transition-colors">
              <Phone className="h-3.5 w-3.5 text-brand-200" />
              <span>(+234) 903 146 3004</span>
            </a>
          </div>
          <div className="flex items-center space-x-2 text-brand-1 *">
            <Clock className="h-3.5 w-3.5 text-brand-200" />
            <span>Mon–Fri: 9am–5pm</span>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <nav
        id="main-navbar"
        className={`sticky top-0 w-full z-50 transition-all duration-300 bg-white ${
          isScrolled ? "shadow-md py-3 border-b border-gray-100" : "py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo area */}
            <Link to="/" className="flex items-center space-x-3 group header-logo" id="nav-logo-link">
              <div className="h-16 w-16 sm:h-20 sm:w-20 flex items-center justify-center  group-hover:shadow-md group-hover:scale-105 transition-all duration-300">
                <img src={navlogo} alt="PWWE LOGO" className="h-12 w-12 sm:h-16 sm:w-16 object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-bold tracking-tight text-gray-900 font-display">
                  PWWE <span className="text-brand-700">Foundation</span>
                </span>
                <span className="text-[9px] sm:text-[10px] text-gray-500 font-medium tracking-wide uppercase leading-none">
                  Women Entrepreneurship
                </span>
              </div>
            </Link>

              {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8" id="desktop-links">
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
              <NavLink to="/about" className={navLinkClass}>
                About
              </NavLink>
              <NavLink to="/contact" className={navLinkClass}>
                Contact
              </NavLink>
              <NavLink to="/login" className={navLinkClass}>
                Login
              </NavLink>
              <button
                onClick={onOpenSignUp}
                id="cta-signup-btn-desktop"
                className="bg-brand-700 hover:bg-brand-800 text-white font-semibold text-sm px-6 py-2.5 rounded-full shadow-sm hover:shadow-md hover:scale-[1.02] transform transition-all duration-200 active:scale-95 flex items-center space-x-2"
              >
                <span>Sign Up</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {/* Mobile Hamburger Menu Toggle Button */}
            <div className="flex md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                id="mobile-menu-toggle"
                className="text-gray-700 hover:text-brand-75 hover:bg-brand-50 p-2 rounded-lg transition-colors focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6 text-brand-700" />
                ) : (
                  <Menu className="h-6 w-6 text-brand-700" />
                )}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Dropdown Menu (Slide-down effect) */}
        <div
          id="mobile-dropdown-menu"
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-96 border-t border-gray-100 mt-3" : "max-h-0"
          }`}
        >
          <div className="px-4 pt-2 pb-5 space-y-2 bg-white shadow-inner">
            <NavLink
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={mobileNavLinkClass}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className={mobileNavLinkClass}
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className={mobileNavLinkClass}
            >
              Contact
            </NavLink>
            <NavLink
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className={mobileNavLinkClass}
            >
              Portal Login
            </NavLink>
            
            {/* Quick Contact info inside mobile menu */}
            <div className="pt-4 border-t border-gray-100 flex flex-col space-y-2.5 px-4 text-xs text-gray-500">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-brand-700" />
                <span>contact@pwwefoundation.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-brand-700" />
                <span>(+234) 903 146 3004</span>
              </div>
            </div>

            <div className="pt-4 px-4">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenSignUp();
                }}
                id="cta-signup-btn-mobile"
                className="w-full bg-brand-700 hover:bg-brand-800 text-white font-semibold text-sm py-3 rounded-full shadow-sm active:scale-95 transition-all text-center flex items-center justify-center space-x-2"
              >
                <span>Sign Up</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
