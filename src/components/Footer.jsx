import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, ArrowRight, Check } from "lucide-react";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import navlogo from "../../assets/logo.png";

const exploreLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/signup", label: "PWWE Cooperative" },
];

const legalLinks = [
  { to: "/terms", label: "Terms & Conditions" },
  { to: "/privacy", label: "Privacy Policy" },
  { to: "/signup", label: "Become a Member" },
  { to: "/login", label: "Member Login" },
];

const socials = [
  { Icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { Icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { Icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { Icon: Youtube, href: "https://youtube.com", label: "YouTube" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail("");
      }, 3000);
    }
  };

  return (
    <footer className="bg-[#0A0A0A] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand & Contact */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-6">
            <Link to="/" className="inline-flex items-center">
              <img
                src={navlogo}
                alt="PWWE Logo"
                className="h-14 w-auto object-contain"
              />
            </Link>

            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Power Within Women Cooperative Multipurpose Society Ltd. — building
              savings, credit and enterprise opportunities for women.
            </p>

            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#96158F] mt-0.5 flex-shrink-0" />
                <span>2nd Floor, ANCE Building, Jericho, Ibadan, Oyo State.</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#96158F] flex-shrink-0" />
                <a
                  href="tel:+2349031463004"
                  className="hover:text-purple-400 transition-colors"
                >
                  +234 903 146 3004
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#96158F] flex-shrink-0" />
                <a
                  href="mailto:contact@pwwefoundation.com"
                  className="hover:text-purple-400 transition-colors"
                >
                  contact@pwwefoundation.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#96158F] flex-shrink-0" />
                <span>Mon – Fri: 8 am – 5 pm</span>
              </div>
            </div>
          </div>

          {/* Explore */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-5">
              Explore
            </h3>
            <ul className="space-y-3 text-sm">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <NavLink
                    to={link.to}
                    className="flex items-center gap-2 text-gray-300 hover:text-[#96158F] transition-colors"
                  >
                    <ArrowRight size={14} /> {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-5">
              Legal
            </h3>
            <ul className="space-y-3 text-sm">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <NavLink
                    to={link.to}
                    className="flex items-center gap-2 text-gray-300 hover:text-[#96158F] transition-colors"
                  >
                    <ArrowRight size={14} /> {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 mt-14 pt-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2026 PWWE Cooperative Multipurpose Society Ltd. All Rights Reserved.</p>
          <div className="flex items-center gap-5">
            <Link to="/terms" className="hover:text-[#96158F] transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link to="/privacy" className="hover:text-[#96158F] transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
