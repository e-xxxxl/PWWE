import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, ShieldCheck, HelpCircle } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    interest: "Cooperative Empowerment",
    message: ""
  });
  
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        interest: "Cooperative Empowerment",
        message: ""
      });
    }, 5000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="relative">
      
      {/* 1. Contact Hero */}
      <section 
        id="contact-hero"
        className="relative bg-gradient-to-br from-brand-900 via-brand-800 to-indigo-950 text-white py-20 text-center overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dotPatternContact" width="30" height="30" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="#FFFFFF" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dotPatternContact)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/20 shadow-inner mb-4">
            <span className="text-[10px] sm:text-xs font-bold tracking-widest text-brand-100 uppercase">
              How Can We Help You?
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display leading-tight tracking-tight mb-3">
            Contact Us
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto leading-relaxed font-sans">
            Have questions about micro-saving packages, corporate support incubation, or partnerships? Reach our central support desks.
          </p>
        </div>

        {/* Small wave bottom */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg className="fill-white w-full h-10 translate-y-1" viewBox="0 0 1440 40" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,32L1440,0L1440,40L0,40Z"></path>
          </svg>
        </div>
      </section>

      {/* 2. Three Info Cards: Address / Phone / Email */}
      <section id="contact-info-cards" className="py-16 bg-white relative z-10 -mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Address */}
            <div className="bg-white rounded-3xl p-8 border border-brand-100 shadow-sm hover:shadow-md transition-shadow flex flex-col items-start text-left group">
              <div className="h-12 w-12 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center border border-brand-100 group-hover:bg-brand-700 group-hover:text-white transition-colors duration-300 mb-6">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 font-display">Office Address</h3>
              <p className="text-xs font-semibold text-brand-700 uppercase tracking-wider mt-1 mb-2">Ibadan Secretariat</p>
              <p className="text-gray-500 text-sm leading-relaxed font-sans">
                2nd Floor, ANCE Building, Jericho, Ibadan, Oyo State, Nigeria.
              </p>
            </div>

            {/* Card 2: Phone */}
            <div className="bg-white rounded-3xl p-8 border border-brand-100 shadow-sm hover:shadow-md transition-shadow flex flex-col items-start text-left group">
              <div className="h-12 w-12 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center border border-brand-100 group-hover:bg-brand-700 group-hover:text-white transition-colors duration-300 mb-6">
                <Phone className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 font-display">Call Helpline</h3>
              <p className="text-xs font-semibold text-brand-700 uppercase tracking-wider mt-1 mb-2">Consultation Support</p>
              <p className="text-gray-500 text-sm leading-relaxed font-sans">
                Dial our main operational line for instant general support desk routing.
              </p>
              <a href="tel:+2349031463004" className="text-brand-700 font-bold block mt-3 hover:underline">
                (+234) 903 146 3004
              </a>
            </div>

            {/* Card 3: Email */}
            <div className="bg-white rounded-3xl p-8 border border-brand-100 shadow-sm hover:shadow-md transition-shadow flex flex-col items-start text-left group">
              <div className="h-12 w-12 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center border border-brand-100 group-hover:bg-brand-700 group-hover:text-white transition-colors duration-300 mb-6">
                <Mail className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 font-display">Email Support</h3>
              <p className="text-xs font-semibold text-brand-700 uppercase tracking-wider mt-1 mb-2">Written Queries</p>
              <p className="text-gray-500 text-sm leading-relaxed font-sans">
                Send us partnership details, donation ideas, or savings program inquiries.
              </p>
              <a href="mailto:contact@pwwefoundation.com" className="text-brand-700 font-bold block mt-3 hover:underline">
                contact@pwwefoundation.com
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Main Form & Side Info (Hours, Map placeholder) */}
      <section id="contact-form-section" className="pb-24 bg-gray-50/50 border-t border-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
            
            {/* Left side: Form */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-12 rounded-3xl border border-brand-100/80 shadow-sm">
              <div className="mb-8">
                <span className="text-[10px] font-bold text-brand-700 uppercase tracking-widest block mb-2 font-sans font-semibold">Send formal request</span>
                <h2 className="text-2xl sm:text-3xl font-bold font-display text-gray-900">
                  Operational Inquiry Form
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  Please fill out the details accurately. Our team responds within 24 working hours.
                </p>
              </div>

              {submitted ? (
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-8 text-center animate-fade-in flex flex-col items-center justify-center min-h-[350px]">
                  <CheckCircle2 className="h-12 w-12 text-emerald-500 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900">Thank you! Message Sent.</h3>
                  <p className="text-sm text-gray-500 mt-2 max-w-sm">
                    Your transmission has been logged successfully. The desk officer will contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-page-name" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        id="contact-page-name"
                        required
                        value={form.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Sandra Kolawole"
                        className="w-full bg-gray-55/30 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-page-email" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        id="contact-page-email"
                        required
                        value={form.email}
                        onChange={handleInputChange}
                        placeholder="name@example.com"
                        className="w-full bg-gray-55/30 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-page-phone" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        id="contact-page-phone"
                        required
                        value={form.phone}
                        onChange={handleInputChange}
                        placeholder="e.g. (+234) 803 125 4567"
                        className="w-full bg-gray-55/30 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-page-interest" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Program of Interest</label>
                      <select
                        name="interest"
                        id="contact-page-interest"
                        value={form.interest}
                        onChange={handleInputChange}
                        className="w-full bg-gray-55/30 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                      >
                        <option value="Human Empowerment">Human Empowerment Circle</option>
                        <option value="Cooperative Empowerment">Cooperative Savings & Lending</option>
                        <option value="Business Development">Business Incubation & Scaling</option>
                        <option value="Volunteering">Volunteering Opportunity</option>
                        <option value="Philanthropy Sponsorship">Philanthropic Sponsorships</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-page-subject" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Inquiry Subject</label>
                    <input
                      type="text"
                      name="subject"
                      id="contact-page-subject"
                      required
                      value={form.subject}
                      onChange={handleInputChange}
                      placeholder="e.g. Schedule a cooperative savings introductory seminar"
                      className="w-full bg-gray-55/30 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-page-message" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Detailed Message</label>
                    <textarea
                      name="message"
                      id="contact-page-message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleInputChange}
                      placeholder="State your objectives or inquiries precisely here..."
                      className="w-full bg-gray-55/30 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                    ></textarea>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      id="contact-page-submit-btn"
                      className="w-full bg-brand-700 hover:bg-brand-800 text-white font-bold py-3.5 px-6 rounded-full shadow-md hover:shadow-lg transition-all text-sm uppercase tracking-wider flex items-center justify-center space-x-2 border-0 outline-none cursor-pointer"
                    >
                      <Send className="h-4 w-4" />
                      <span>Transmit Message</span>
                    </button>
                  </div>

                </form>
              )}
            </div>

            {/* Right side: Office Hours & Location map placeholder */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Office Hours Card */}
              <div className="bg-white rounded-3xl p-8 border border-brand-100 shadow-sm">
                <div className="flex items-center space-x-3 text-brand-700 mb-4">
                  <Clock className="h-6 w-6 text-brand-700" />
                  <h3 className="text-xl font-bold font-display text-gray-900">Office Hours</h3>
                </div>
                <p className="text-gray-500 text-xs mb-6 font-medium font-sans">
                  Our head office operates during the listed schedule. We are closed on public holidays.
                </p>
                <div className="space-y-3.5 text-sm text-gray-600 font-sans">
                  <div className="flex justify-between border-b border-gray-150 pb-2">
                    <span className="font-semibold text-gray-700">Monday</span>
                    <span className="text-brand-700 font-medium font-semibold">9:00 AM – 5:00 PM</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-150 pb-2">
                    <span className="font-semibold text-gray-700">Tuesday</span>
                    <span className="text-brand-700 font-medium font-semibold">9:00 AM – 5:00 PM</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-150 pb-2">
                    <span className="font-semibold text-gray-700">Wednesday</span>
                    <span className="text-brand-700 font-medium font-semibold">9:00 AM – 5:00 PM</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-150 pb-2">
                    <span className="font-semibold text-gray-700">Thursday</span>
                    <span className="text-brand-700 font-medium font-semibold">9:00 AM – 5:00 PM</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-150 pb-2">
                    <span className="font-semibold text-gray-700">Friday</span>
                    <span className="text-brand-700 font-medium font-semibold">9:00 AM – 5:00 PM</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-150 pb-2">
                    <span className="font-semibold text-gray-700">Saturday</span>
                    <span className="text-amber-500 font-bold uppercase text-xs">By Appointment</span>
                  </div>
                  <div className="flex justify-between pb-1">
                    <span className="font-semibold text-red-500">Sunday</span>
                    <span className="text-red-500 font-bold uppercase text-xs">Closed</span>
                  </div>
                </div>
              </div>

              {/* Graphical Location Placeholder (Highly custom map representation) */}
              <div className="bg-brand-50 rounded-3xl p-6 border border-brand-100 flex flex-col justify-between h-72 relative overflow-hidden">
                {/* Custom Stylistic Background Representation of a Map */}
                <div className="absolute inset-0 bg-brand-100/50 pointer-events-none">
                  <svg className="w-full h-full opacity-60" xmlns="http://www.w3.org/2000/svg">
                    {/* Abstract grid lines for a map */}
                    <path d="M 0 50 L 500 50 M 0 150 L 500 150 M 0 250 L 500 250 M 100 0 L 100 300 M 250 0 L 250 300 M 400 0 L 400 300" stroke="#7C3AED" strokeWidth="1" strokeDasharray="5,5" fill="none" />
                    {/* Abstract road pathways */}
                    <path d="M -10 100 C 150 120, 200 80, 500 110 M 150 -10 C 130 150, 180 200, 220 310" stroke="#6D28D9" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.3" />
                    <path d="M -10 220 Q 300 180, 500 240" stroke="#4F46E5" strokeWidth="2.5" fill="none" opacity="0.25" />
                    {/* Pulsing Pin locator */}
                    <circle cx="200" cy="115" r="14" fill="#6B21A8" fillOpacity="0.2" className="animate-ping" />
                    <circle cx="200" cy="115" r="6" fill="#6B21A8" />
                  </svg>
                </div>

                <div className="relative z-10 flex flex-col justify-between h-full text-left">
                  <div className="bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-sm max-w-[210px] border border-brand-100">
                    <span className="text-[9px] font-bold text-brand-700 uppercase tracking-widest block font-sans">Sovereign Point</span>
                    <span className="text-xs font-bold text-slate-800 font-display block mt-0.5">Jericho, Ibadan</span>
                    <p className="text-[10px] text-gray-500 leading-tight mt-1">
                      2nd Floor, ANCE Building, Oyo State.
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-brand-900 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-brand-100/50 self-start text-xs font-semibold">
                    <MapPin className="h-4 w-4 text-brand-700" />
                    <span>Latitude: 7.39° N, Longitude: 3.88° E</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
