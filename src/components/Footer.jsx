import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { MapPin, Phone, Clock, ArrowRight, Check } from "lucide-react";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import navlogo from "../../assets/logo.png";

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          
          {/* Left Column - Logo & Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="h-16 w-36 flex items-center justify-center">
                <img src={navlogo} alt="PWWE Logo" className="h-14 w-34 object-contain" />
              </div>
              
            </Link>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#96158F] mt-0.5" />
                <span>2nd Floor, ANCE Building, Jericho, Ibadan, Oyo State.</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#96158F]" />
                <a href="tel:+2349031463004" className="hover:text-purple-400 transition-colors">
                  +234 903 146 3004
                </a>
              </div>
            </div>

            <div className="pt-4">
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Open Hours:</p>
              <p className="text-sm">Mon – Fri: 8 am – 5 pm</p>
            </div>
          </div>

          {/* Links Column */}
          <div className="lg:col-span-3">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-3">
              Links
              <div className="h-px flex-1 bg-gray-700"></div>
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <NavLink to="/" className="flex items-center gap-2 hover:text-[#96158F] transition-colors">
                  <ArrowRight size={14} /> Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="flex items-center gap-2 hover:text-[#96158F] transition-colors">
                  <ArrowRight size={14} /> About
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="flex items-center gap-2 hover:text-[#96158F] transition-colors">
                  <ArrowRight size={14} /> Contact
                </NavLink>
              </li>
              <li>
                <NavLink to="/cooperative" className="flex items-center gap-2 hover:text-[#96158F] transition-colors">
                  <ArrowRight size={14} /> PWWE Cooperative
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-4">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-3">
              Newsletter
              <div className="h-px flex-1 bg-gray-700"></div>
            </h3>
            
            <p className="text-sm text-gray-400 mb-5">
              Get our newsletter to get update
            </p>

            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 bg-[#1F1F1F] border border-gray-700 rounded-l-xl px-5 py-3 text-sm focus:outline-none focus:border-purple-500"
                  required
                />
                <button
                  type="submit"
                  className="bg-[#96158F]  px-6 rounded-r-xl transition-colors"
                >
                  <ArrowRight size={20} />
                </button>
              </div>

              {subscribed && (
                <div className="flex items-center gap-2 text-green-400 text-sm">
                  <Check size={18} />
                  <span>Thank you for subscribing!</span>
                </div>
              )}
            </form>

           {/* Social Icons */}
<div className="mt-10">
  <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">Follow Us</p>
  <div className="flex gap-4">
    <a 
      href="https://facebook.com" 
      target="_blank" 
      rel="noopener noreferrer"
      className="w-9 h-9 bg-[#1F1F1F] hover:bg-[#96158F] text-white rounded-full flex items-center justify-center transition-colors"
      aria-label="Facebook"
    >
      <Facebook size={20} />
    </a>

    <a 
      href="https://twitter.com" 
      target="_blank" 
      rel="noopener noreferrer"
      className="w-9 h-9 bg-[#1F1F1F] hover:bg-[#96158F] text-white rounded-full flex items-center justify-center transition-colors"
      aria-label="Twitter"
    >
      <Twitter size={20} />
    </a>

    <a 
      href="https://instagram.com" 
      target="_blank" 
      rel="noopener noreferrer"
      className="w-9 h-9 bg-[#1F1F1F] hover:bg-[#96158F] text-white rounded-full flex items-center justify-center transition-colors"
      aria-label="Instagram"
    >
      <Instagram size={20} />
    </a>

    <a 
      href="https://youtube.com" 
      target="_blank" 
      rel="noopener noreferrer"
      className="w-9 h-9 bg-[#1F1F1F] hover:bg-[#96158F] text-white rounded-full flex items-center justify-center transition-colors"
      aria-label="YouTube"
    >
      <Youtube size={20} />
    </a>
  </div>
</div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 mt-16 pt-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center text-xs text-gray-500">
          © 2026 PWWE Foundation. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}