import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "motion/react";
import { MapPin, Phone, Mail, Clock, Send, ShieldCheck, AlertCircle, Building, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const [searchParams] = useSearchParams();
  const signupParam = searchParams.get("signup");

  // Local state for the contact form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    interest: "PWWE Cooperative Enrollment",
    message: "",
  });
  
  const [isSuccess, setIsSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState(null);

  // Auto-select option if query parameter is present (e.g. ?signup=coop)
  useEffect(() => {
    if (signupParam === "coop") {
      setFormData((prev) => ({
        ...prev,
        interest: "PWWE Cooperative Enrollment",
        subject: "Cooperative Savings Cluster Signup",
      }));
    }
  }, [signupParam]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(null);

    // Basic Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormErrors("Please complete all required fields (*).");
      return;
    }

    // Success response
    setIsSuccess(true);
    window.scrollTo({ top: 100, behavior: "smooth" });
  };

  return (
    <div className="bg-brand-light min-h-screen pb-24 font-sans animate-fade-in" id="contact-page">
      {/* Editorial Header */}
      <section className="pt-16 pb-20 px-6 md:px-12 max-w-7xl mx-auto border-b border-brand-purple/10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4 max-w-3xl"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-[#CC9838] font-bold block">
            // Administrative Desk
          </span>
          <h1 className="font-display text-4xl md:text-7xl font-extrabold text-brand-dark leading-tight">
            Contact Our Registrar
          </h1>
          <p className="text-sm sm:text-lg text-brand-dark/70 font-sans max-w-xl leading-relaxed">
            Have questions about group eligibility, cooperative book registrations, or donor partnerships? Drop us a line of interest below.
          </p>
        </motion.div>
      </section>

      {/* Main Container: Grid layout */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column - Detailed Contact Info & Styled Map */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <span className="font-mono text-[10px] uppercase text-[#CC9838] tracking-widest block mb-4 font-bold">
                Ibadan Head Office Coordinates
              </span>
              <h2 className="font-display text-3xl font-black text-brand-dark leading-tight">
                PWWE HQ, Jericho, Ibadan
              </h2>
              <p className="text-xs text-brand-dark/60 font-sans mt-2">
                Ground administration and skill cluster audits occur weekly at the historical ANCE building in Oyo State.
              </p>
            </div>

            {/* Custom Styled Geographic Map Placeholder (Architectural layout, No default empty colored box!) */}
            <div className="border border-[#CC9838]/20 p-6 bg-white relative overflow-hidden group shadow-xs">
              {/* Grid backdrop lines */}
              <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-3 pointer-events-none">
                {Array.from({ length: 36 }).map((_, i) => (
                  <div key={i} className="border-[0.5px] border-brand-purple" />
                ))}
              </div>

              <div className="relative space-y-6">
                <div className="flex justify-between items-center text-[10px] font-mono text-brand-dark/50">
                  <span>ANCE GRID PLOT</span>
                  <span className="text-[#CC9838] font-bold">7.4042° N, 3.8793° E</span>
                </div>

                {/* Simulated Street Layout */}
                <div className="h-44 bg-brand-light relative border border-brand-purple/5 p-4 flex flex-col justify-between">
                  <div className="absolute w-[3px] bg-brand-purple/5 h-full left-1/3 top-0" />
                  <div className="absolute h-[3px] bg-brand-purple/5 w-full left-0 top-1/2" />
                  <div className="absolute w-[2px] bg-brand-accent/10 h-full right-1/4 top-0 rotate-12" />

                  {/* Marker Node 1: ANCE */}
                  <div className="absolute left-1/3 top-1/2 -translate-x-[6px] -translate-y-[6px] z-10">
                    <span className="absolute w-4 h-4 bg-brand-purple/20 rounded-full animate-ping" />
                    <span className="block w-3 h-3 bg-brand-purple border-2 border-white rounded-full" />
                  </div>

                  <span className="absolute left-[38%] top-[54%] font-mono text-[9px] uppercase tracking-wider text-brand-dark font-black bg-white px-1 shadow-xs border border-brand-purple/10">
                    ANCE Building (2nd Floor)
                  </span>

                  <div className="text-[8px] font-mono text-brand-dark/40 flex justify-between">
                    <span>↖ TO JERICHO RESERVOIR</span>
                    <span>↗ ONIREKE RESIDENCY</span>
                  </div>

                  <div className="text-[8px] font-mono text-brand-dark/40 flex justify-between self-end">
                    <span>↙ JERICHO ROAD</span>
                    <span>↘ TO ALALUBOSA OYO</span>
                  </div>
                </div>

                <div className="text-xs space-y-1 text-brand-dark/70 font-sans leading-relaxed pt-2">
                  <span className="block font-bold text-brand-dark text-[11px] uppercase tracking-wider font-mono">
                    Navigation Helper:
                  </span>
                  <p>
                    Ensure your driver exits towards the Jericho GRA residential boundary. The historical ANCE building sits adjacent to the standard commercial high streets, with clear parking entries.
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-6">
              {/* Address */}
              <div className="flex gap-4 items-start pb-6 border-b border-brand-purple/15">
                <div className="p-3 bg-brand-purple-light text-brand-purple border border-brand-purple/10">
                  <Building size={18} />
                </div>
                <div className="space-y-1">
                  <span className="font-mono text-[10px] uppercase text-brand-dark/40 tracking-widest block font-bold">
                    Physical Registry Address
                  </span>
                  <p className="text-sm text-brand-dark font-sans leading-relaxed">
                    2nd Floor, ANCE Building, Jericho, Ibadan, Oyo State, Nigeria
                  </p>
                </div>
              </div>

              {/* Phone Channels */}
              <div className="flex gap-4 items-start pb-6 border-b border-brand-purple/15">
                <div className="p-3 bg-brand-accent-light text-brand-accent border border-brand-accent/10">
                  <Phone size={18} />
                </div>
                <div className="space-y-1">
                  <span className="font-mono text-[10px] uppercase text-brand-dark/40 tracking-widest block font-bold">
                    Inquiry Telephony Desk
                  </span>
                  <a
                    href="tel:+2349031463004"
                    className="text-sm text-brand-dark font-semibold hover:text-brand-purple block transition-colors font-sans"
                  >
                    (+234) 903 146 3004
                  </a>
                  <span className="text-[10px] text-brand-dark/50 block font-mono">
                    Hours: Mon–Fri, 9am–5pm (GMT+1)
                  </span>
                </div>
              </div>

              {/* Email Addresses */}
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-[#FAF5EC] text-[#CC9838] border border-[#CC9838]/15">
                  <Mail size={18} />
                </div>
                <div className="space-y-1">
                  <span className="font-mono text-[10px] uppercase text-brand-dark/40 tracking-widest block font-bold">
                    Electronic Correspondence
                  </span>
                  <a
                    href="mailto:contact@pwwefoundation.com"
                    className="text-sm text-brand-dark font-semibold hover:text-brand-purple block transition-colors font-sans"
                  >
                    contact@pwwefoundation.com
                  </a>
                  <span className="text-[10px] text-brand-dark/50 block font-mono">
                    Average response: 24-48 Business hours
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column - Prominent, contact form */}
          <div className="lg:col-span-7 bg-white p-8 md:p-12 border border-brand-purple/15 shadow-sm relative">
            <div className="absolute top-0 right-0 bg-[#CC9838] text-white text-[9px] font-mono uppercase tracking-widest font-black py-4 px-6">
              PWWE REGISTER 2026
            </div>

            <h2 className="font-display text-2xl font-bold text-brand-dark mb-2">
              The Administrative Ledger Form
            </h2>
            <p className="text-xs text-brand-dark/60 font-sans mb-10 leading-relaxed max-w-lg">
              Kindly record your specific circumstances or proposal. Your submission is directed straight to our executive director desk in Oyo State.
            </p>

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 bg-brand-accent-light border border-brand-accent text-brand-dark space-y-4"
              >
                <div className="flex items-center gap-2 text-[#CC9838]">
                  <CheckCircle2 size={24} />
                  <span className="font-display text-xl font-bold">Record Logged of {formData.name}</span>
                </div>
                
                <p className="text-xs sm:text-sm leading-relaxed font-sans text-brand-dark/85">
                  Thank you very much. An administrator has successfully cached your request regarding <strong>{formData.interest}</strong>.
                </p>

                <div className="p-4 bg-white/70 border border-[#CC9838]/20 text-xs font-mono space-y-2 text-brand-dark/75">
                  <div className="flex justify-between">
                    <span>LEDGER ID:</span>
                    <span>PWWE-2026-L{Math.floor(Math.random() * 8999) + 1000}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>EMAIL LINKED:</span>
                    <span>{formData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>OFFICE:</span>
                    <span>Jericho HQ Cluster, Ibadan</span>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setFormData({
                        name: "",
                        email: "",
                        subject: "",
                        interest: "PWWE Cooperative Enrollment",
                        message: "",
                      });
                    }}
                    className="px-6 py-2.5 bg-brand-purple text-white font-mono text-[11px] uppercase tracking-wider font-bold transition-colors cursor-pointer"
                  >
                    Log another message
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" id="contact-full-form">
                
                {formErrors && (
                  <div className="p-3 bg-red-50 border border-red-300 text-red-700 text-xs flex items-center gap-2 font-mono">
                    <AlertCircle size={14} />
                    <span>{formErrors}</span>
                  </div>
                )}

                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="contact-name" className="block font-mono text-[10px] uppercase text-brand-dark/75 tracking-widest font-bold">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Mrs. Adesina Alabi"
                    className="w-full bg-brand-light border border-brand-purple/10 focus:border-[#CC9838] focus:outline-none px-4 py-3.5 text-xs sm:text-sm font-sans text-brand-dark transition-all duration-200"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email */}
                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="block font-mono text-[10px] uppercase text-brand-dark/75 tracking-widest font-bold">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g., name@domain.com"
                      className="w-full bg-brand-light border border-brand-purple/10 focus:border-[#CC9838] focus:outline-none px-4 py-3.5 text-xs sm:text-sm font-sans text-brand-dark transition-all duration-200"
                    />
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <label htmlFor="contact-subject" className="block font-mono text-[10px] uppercase text-brand-dark/75 tracking-widest font-bold">
                      Subject Matter
                    </label>
                    <input
                      type="text"
                      id="contact-subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g., Partnership Proposal"
                      className="w-full bg-brand-light border border-brand-purple/10 focus:border-[#CC9838] focus:outline-none px-4 py-3.5 text-xs sm:text-sm font-sans text-brand-dark transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Interest Dropdown */}
                <div className="space-y-2">
                  <label htmlFor="contact-interest" className="block font-mono text-[10px] uppercase text-brand-dark/75 tracking-widest font-bold">
                    Primary Agenda / Intent
                  </label>
                  <select
                    id="contact-interest"
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className="w-full bg-brand-light border border-brand-purple/10 focus:border-[#CC9838] focus:outline-none px-4 py-3.5 text-xs sm:text-sm font-sans text-brand-dark transition-all duration-200"
                  >
                    <option value="PWWE Cooperative Enrollment">PWWE Cooperative Enrollment</option>
                    <option value="Skills Cohort Entry">Skills Cohort Entry</option>
                    <option value="Volunteering as a Mentor">Volunteering as a Mentor</option>
                    <option value="Donation Support">Donation Support</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label htmlFor="contact-message" className="block font-mono text-[10px] uppercase text-brand-dark/75 tracking-widest font-bold">
                    Detailed Message Ledger *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide extensive details about your cottage enterprise, skill background, or administrative questions..."
                    className="w-full bg-brand-light border border-brand-purple/10 focus:border-[#CC9838] focus:outline-none px-4 py-3.5 text-xs sm:text-sm font-sans text-brand-dark transition-all duration-200 resize-none"
                  />
                </div>

                {/* Information Guarantee stamp */}
                <div className="flex gap-2.5 items-start text-[11px] text-brand-dark/50 leading-relaxed font-sans pt-2">
                  <ShieldCheck size={16} className="text-[#CC9838] flex-shrink-0 mt-0.5" />
                  <span>
                    Your submission is filed in compliance with PWWE social data privacy audits. We do not distribute your personal contact logs to commercial third-parties.
                  </span>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-4.5 bg-brand-purple text-brand-light font-mono text-xs uppercase tracking-widest font-extrabold border border-brand-purple hover:bg-transparent hover:text-brand-purple transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  id="contact-submit-btn"
                >
                  <span>Submit Register Log</span>
                  <Send size={13} />
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* Minor Operational Hours at bottom */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-16 mt-16 border-t border-brand-purple/10 text-xs font-sans text-brand-dark/50">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <span>*Emergency cluster guidelines are distributed to verified cooperative leaders via direct physical ledgers only.</span>
          <div className="flex items-center gap-1">
            <Clock size={13} />
            <span>Jericho Office Hours: Monday to Friday from 9:00 AM to 5:00 PM</span>
          </div>
        </div>
      </section>
    </div>
  );
}
