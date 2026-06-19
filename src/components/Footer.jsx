import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Mail, Phone, MapPin, Clock, ArrowRight, Check } from "lucide-react";
import navlogo from "../../assets/navlogo.png";
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
      }, 5000);
    }
  };

  const footerLinkClass = ({ isActive }) =>
    `text-xs uppercase tracking-wider font-semibold transition-colors duration-200 block ${
      isActive
        ? "text-brand-accent font-bold"
        : "text-gray-400 hover:text-brand-accent"
    }`;

  return (
    <footer className="bg-[#09040A] text-white border-t border-brand-purple/20" id="main-footer">
      {/* Top Footer Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Column 1: Logo & Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3" id="footer-logo">
            <div className="h-16 w-16 sm:h-20 sm:w-20 flex items-center justify-center  group-hover:shadow-md group-hover:scale-105 transition-all duration-300">
                            <img src={navlogo} alt="PWWE LOGO" className="h-12 w-12 sm:h-16 sm:w-16 object-contain" />
                          </div>
              <div>
                <span className="block font-display text-md font-extrabold tracking-tight">
                  PWWE <span className="text-[#CC9838]">Foundation</span>
                </span>
                <span className="block text-[8px] uppercase font-mono tracking-widest text-[#CC9838]/70">
                  Ibadan, Nigeria
                </span>
              </div>
            </Link>
            
            <p className="text-xs text-gray-400 font-sans leading-relaxed">
              Empowering women through cooperative savings, structural business incubation, and vocational development in Oyo State.
            </p>

            <div className="space-y-3.5 pt-2 text-xs text-gray-400 font-sans">
              <div className="flex gap-3">
                <MapPin size={15} className="text-brand-accent flex-shrink-0 mt-0.5" />
                <span>2nd Floor, ANCE Building, Jericho, Ibadan, Oyo State</span>
              </div>
              <div className="flex gap-3">
                <Phone size={15} className="text-brand-accent flex-shrink-0" />
                <a href="tel:+2349031463004" className="hover:text-brand-accent transition-colors">
                  (+234) 903 146 3004
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-6">
            <h4 className="font-mono text-xs uppercase tracking-widest font-bold text-brand-purple border-b border-brand-purple/20 pb-3">
              Explore Links
            </h4>
            <ul className="space-y-4">
              <li>
                <NavLink to="/" className={footerLinkClass}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className={footerLinkClass}>
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={footerLinkClass}>
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink to="/auth" className={footerLinkClass}>
                  Login in
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Column 3: Newsletter Sign up */}
          <div className="space-y-6">
            <h4 className="font-mono text-xs uppercase tracking-widest font-bold text-brand-purple border-b border-brand-purple/20 pb-3">
              Keep Updated
            </h4>
            <p className="text-xs text-gray-400 font-sans leading-relaxed">
              Subscribe to news on women empowerment schemes, skill cohort entries, and impact timelines in Oyo State.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-3" id="newsletter-form">
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <div className="flex">
                <input
                  type="email"
                  id="newsletter-email"
                  placeholder="name@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-[#1A121D] text-white border border-brand-purple/20 px-4 py-2.5 text-xs focus:outline-none focus:border-brand-purple font-sans transition-colors"
                />
                <button
                  type="submit"
                  className="bg-brand-purple hover:bg-brand-purple-dark text-white px-4 flex items-center justify-center transition-colors border border-brand-purple shrink-0 cursor-pointer"
                  aria-label="Subscribe"
                >
                  <ArrowRight size={14} />
                </button>
              </div>
              {subscribed && (
                <div className="flex items-center gap-1.5 text-brand-accent text-[11px] font-mono mt-1">
                  <Check size={12} />
                  <span>Success! You're subscribed.</span>
                </div>
              )}
            </form>
          </div>

          {/* Column 4: Open Hours */}
          <div className="space-y-6">
            <h4 className="font-mono text-xs uppercase tracking-widest font-bold text-brand-purple border-b border-brand-purple/20 pb-3">
              Office Hours
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed font-sans">
              Visit our headquarters in Ibadan to get guidance on starting cooperative clusters.
            </p>
            <div className="space-y-3.5 text-xs text-gray-400 font-sans">
              <div className="flex justify-between items-center py-1 border-b border-brand-purple/10">
                <span className="font-mono text-[10px] uppercase">Mon - Fri:</span>
                <span className="text-white">9:00 AM - 5:00 PM</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-brand-purple/10">
                <span className="font-mono text-[10px] uppercase">Sat - Sun:</span>
                <span className="text-brand-accent font-semibold">Closed</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500 pt-2">
                <Clock size={12} />
                <span>Zone: GMT+1 (Nigeria)</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Social Bar & Copyright */}
      <div className="bg-[#050205] py-8 px-6 border-t border-brand-purple/10 text-xs font-mono text-gray-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          
          <div>
            Copyright © 2026 PwweFoundation | All Rights Reserved.
          </div>

          <div className="flex items-center gap-6">
            <span className="text-[10px] text-gray-600 uppercase tracking-widest mr-2">Contact Channels:</span>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="text-gray-500 hover:text-brand-accent transition-colors"
              aria-label="Facebook"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z" />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-gray-500 hover:text-brand-accent transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204 013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}
