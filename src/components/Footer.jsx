import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Mail, Phone, MapPin, Clock, Send, Heart, CheckCircle2 } from "lucide-react";
import navlogo from "../../assets/navlogo.png";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const footerLinkClass = ({ isActive }) =>
    isActive
      ? "text-brand-200 font-semibold flex items-center space-x-1.5 transition-all pl-1 border-l-2 border-brand-500"
      : "text-gray-400 hover:text-white flex items-center space-x-1.5 transition-all hover:translate-x-1 duration-200";

  return (
    <footer id="main-footer" className="bg-slate-950 text-white pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand & Contact Info */}
          <div className="space-y-6" id="footer-col-about">
            <Link to="/" className="flex items-center space-x-3 group">
             <div className="h-16 w-16 sm:h-20 sm:w-20 flex items-center justify-center  group-hover:shadow-md group-hover:scale-105 transition-all duration-300">
                             <img src={navlogo} alt="PWWE LOGO" className="h-12 w-12 sm:h-16 sm:w-16 object-contain" />
                           </div>
              <span className="text-xl font-bold tracking-tight text-white font-display">
                PWWE <span className="text-brand-400">Foundation</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed text-left">
              Empowering women through structured skills, business partnerships, financial accountability, and active cooperative development.
            </p>
            <div className="space-y-3.5 text-sm text-gray-400 pt-2 text-left">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-brand-400 shrink-0 mt-0.5" />
                <span>2nd Floor, ANCE Building, Jericho, Ibadan, Oyo State, Nigeria.</span>
              </div>
              <a href="tel:+2349031463004" className="flex items-center space-x-3 hover:text-white transition-colors">
                <Phone className="h-5 w-5 text-brand-400 shrink-0" />
                <span>(+234) 903 146 3004</span>
              </a>
              <a href="mailto:contact@pwwefoundation.com" className="flex items-center space-x-3 hover:text-white transition-colors">
                <Mail className="h-5 w-5 text-brand-400 shrink-0" />
                <span>contact@pwwefoundation.com</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-6 text-left" id="footer-col-links">
            <h3 className="text-lg font-semibold text-white tracking-wide border-b border-slate-800 pb-2 font-display">
              Useful Navigation
            </h3>
            <ul className="space-y-3 text-sm">
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
                  Contact & Support
                </NavLink>
              </li>
              <li>
                <a 
                  href="#how-it-works" 
                  onClick={() => {
                    const el = document.getElementById("three-pathways");
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-gray-400 hover:text-white flex items-center space-x-1.5 transition-all hover:translate-x-1 duration-200"
                >
                  <span>PWWE Cooperative</span>
                </a>
              </li>
              <li>
                <a 
                  href="#services-section" 
                  onClick={() => {
                    const el = document.getElementById("explore-services");
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-gray-400 hover:text-white flex items-center space-x-1.5 transition-all hover:translate-x-1 duration-200"
                >
                  <span>Our Core Programs</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Newsletter Sign Up */}
          <div className="space-y-6 text-left" id="footer-col-newsletter">
            <h3 className="text-lg font-semibold text-white tracking-wide border-b border-slate-800 pb-2 font-display">
              Our Newsletter
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Stay updated with news, impact stories, upcoming seminars, and financial empowerment resources.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3 pt-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-full py-2.5 pl-4 pr-12 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bg-brand-700 hover:bg-brand-800 text-white rounded-full p-1.5 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 focus:ring-brand-500 border-0"
                  aria-label="Submit email to newsletter"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              {subscribed && (
                <div className="flex items-center space-x-2 text-emerald-400 text-xs py-1 animate-fade-in">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>Subscribed! Check your inbox soon.</span>
                </div>
              )}
            </form>
          </div>

          {/* Column 4: Office Hours */}
          <div className="space-y-6 text-left" id="footer-col-hours">
            <h3 className="text-lg font-semibold text-white tracking-wide border-b border-slate-800 pb-2 font-display">
              Open Hours
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              We welcome walk-ins, consultation calls, and cooperative inquiries during our official operational hours:
            </p>
            <div className="space-y-2.5 text-sm text-gray-400">
              <div className="flex justify-between border-b border-slate-900 pb-1.5">
                <span>Monday – Friday</span>
                <span className="text-brand-300 font-semibold">9:00 AM – 5:00 PM</span>
              </div>
              <div className="flex justify-between border-b border-slate-900 pb-1.5">
                <span>Saturday</span>
                <span className="text-amber-400 font-semibold">By Appointment</span>
              </div>
              <div className="flex justify-between pb-1.5">
                <span>Sunday</span>
                <span className="text-red-400 font-semibold font-sans">Closed</span>
              </div>
            </div>
            
            {/* Social Icons Row */}
            <div className="pt-2">
              <span className="text-xs font-semibold text-gray-400 tracking-wider block uppercase mb-3">Follow our journey</span>
              <div className="flex space-x-3">
                {/* Facebook */}
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="bg-slate-900 hover:bg-brand-700 text-gray-400 hover:text-white p-2 rounded-full transition-all duration-300 transform hover:scale-110">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                {/* Twitter */}
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="bg-slate-900 hover:bg-brand-700 text-gray-400 hover:text-white p-2 rounded-full transition-all duration-300 transform hover:scale-110">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                {/* Instagram */}
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="bg-slate-900 hover:bg-brand-700 text-gray-400 hover:text-white p-2 rounded-full transition-all duration-300 transform hover:scale-110">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
                {/* LinkedIn */}
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="bg-slate-900 hover:bg-brand-700 text-gray-400 hover:text-white p-2 rounded-full transition-all duration-300 transform hover:scale-110">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 space-y-4 sm:space-y-0 text-left" id="footer-bottom-info">
          <div>
            Copyright © 2026 <span className="text-gray-400 font-medium font-sans">PwweFoundation</span> | All Rights Reserved.
          </div>
          <div className="flex items-center space-x-1">
            <span>Made with</span>
            <Heart className="h-3 w-3 text-brand-600 fill-brand-600 animate-pulse" />
            <span>for Women Empowerment</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
