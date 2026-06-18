import React, { useState } from "react";
import { useOutletContext, Link } from "react-router-dom";
import { 
  Users, Award, Briefcase, Sparkles, TrendingUp, Handshake, 
  MapPin, Phone, Mail, ChevronRight, CheckCircle2, Quote, ArrowRight,
  ShieldAlert, BookOpen, Heart, Building, Info
} from "lucide-react";

import heroimg from "../../assets/heroimg.png";
import navlogo2 from "../../assets/navlogo2.png";

export default function Home() {
  const { handleOpenSignUp } = useOutletContext();
  const [imageError, setImageError] = useState(false);
  
  // Contact Form State
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    interest: "Cooperative Empowerment",
    message: ""
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setContactForm({
        name: "",
        email: "",
        subject: "",
        interest: "Cooperative Empowerment",
        message: ""
      });
    }, 5000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="relative">
      
      {/* 1. Hero Section */}
      <section 
        id="hero-banner"
        className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-brand-900 via-brand-800 to-indigo-950 text-white pt-20 pb-24 overflow-hidden"
      >
        {/* Background Decorative Polka-Dots/Mesh SVG */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dotPattern" width="30" height="30" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="#FFFFFF" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dotPattern)" />
          </svg>
        </div>

        {/* Ambient Purple Blur Spheres */}
        <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-brand-500 rounded-full mix-blend-screen filter blur-[100px] opacity-20 pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-1/5 right-1/10 w-96 h-96 bg-indigo-500 rounded-full mix-blend-screen filter blur-[100px] opacity-15 pointer-events-none animate-pulse animation-delay-200"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-8 animate-fade-in text-left">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 shadow-inner">
                <Sparkles className="h-4 w-4 text-brand-200 animate-spin" />
                <span className="text-xs sm:text-sm font-semibold tracking-wide text-brand-100 uppercase">
                  Welcome to PWWE Foundation
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight font-display">
                Economic Empowerment Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-200 via-purple-300 to-indigo-200">Women Entrepreneurship</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-300 font-medium max-w-2xl leading-relaxed">
                Empowering Women. Transforming Communities. We combine technical skills, business incubation, and structured financial cooperatives to build lasting prosperity.
              </p>

              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-3">
                <button
                  onClick={handleOpenSignUp}
                  className="bg-white text-brand-900 hover:bg-brand-50 font-bold px-8 py-4 rounded-full text-base transition-all duration-300 transform hover:scale-[1.03] shadow-lg shadow-purple-950/40 text-center flex items-center justify-center space-x-2.5"
                >
                  <span>Join The Cooperative</span>
                  <ArrowRight className="h-5 w-5 text-brand-800" />
                </button>
                <Link
                  to="/about"
                  className="border-2 border-white/80 hover:border-white hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-full text-base transition-all duration-200 text-center"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Hero Right: Clean Hero Image */}
            <div className="lg:col-span-5 w-full animate-float mt-8 lg:mt-0">
              <div className="relative mx-auto max-w-2xl">
                <div className="relative border border-white/20 rounded-2xl overflow-hidden shadow-lg group">
                  <img
                    src={heroimg}
                    alt="Women entrepreneurs collaborating in a modern workspace"
                    className="w-full aspect-[1024/683] object-cover grayscale-0 group-hover:shadow-xl transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Waves SVG Bottom Divider */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg className="fill-white w-full" viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,48C840,43,960,53,1080,58.7C1200,64,1320,64,1380,64L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* 2. Mission Strip Section */}
      <section id="mission-strip" className="bg-brand-50 py-12 border-b border-brand-100 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <blockquote className="text-xl sm:text-2xl italic font-semibold font-display text-brand-800 leading-relaxed">
            "Empowering Women To Rise, Thrive, And Prosper."
          </blockquote>
        </div>
      </section>

      {/* 3. Three Pathways Section */}
      <section id="three-pathways" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-brand-700 tracking-widest uppercase block mb-3 font-sans">Our Framework</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight font-display">
              Three Pathways. One Mission.
            </h2>
            <div className="w-16 h-1.5 bg-brand-700 mx-auto mt-4 rounded-full"></div>
            <p className="text-gray-500 mt-5 leading-relaxed font-medium">
              We focus our delivery across three core phases, guiding individuals through personal, group, and market scalability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1: Human Empowerment */}
            <div className="bg-white rounded-2xl border border-brand-100 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="h-14 w-14 bg-brand-50 rounded-xl flex items-center justify-center text-brand-700 group-hover:bg-brand-700 group-hover:text-white transition-colors duration-300 mb-6 border border-brand-100">
                  <BookOpen className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 font-display">
                  Human Empowerment & Skills
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  Personal development focusing on leadership competence, vocabulary skill acquisition, mindset coaching, and strategic self-determination classes. We build unwavering personal capacity before business building starts.
                </p>
              </div>
              <div>
                <button 
                  onClick={handleOpenSignUp}
                  className="text-brand-700 hover:text-brand-800 font-bold text-sm inline-flex items-center space-x-1.5 cursor-pointer uppercase tracking-wider bg-transparent border-0 outline-none"
                >
                  <span>Apply Now</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Card 2: Cooperative Empowerment */}
            <div className="bg-white rounded-2xl border border-brand-100 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="h-14 w-14 bg-brand-50 rounded-xl flex items-center justify-center text-brand-700 group-hover:bg-brand-700 group-hover:text-white transition-colors duration-300 mb-6 border border-brand-100">
                  <TrendingUp className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 font-display">
                  Cooperative Empowerment
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  Structured micro-savings networks, rotating savings & credit setups (ROSCA), asset support options, and emergency loan access that allow ladies to mobilize self-made local capital without ridiculous bank rates.
                </p>
              </div>
              <div>
                <button 
                  onClick={handleOpenSignUp}
                  className="text-brand-700 hover:text-brand-800 font-bold text-sm inline-flex items-center space-x-1.5 cursor-pointer uppercase tracking-wider bg-transparent border-0 outline-none"
                >
                  <span>Apply Now</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Card 3: Business Development */}
            <div className="bg-white rounded-2xl border border-brand-100 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="h-14 w-14 bg-brand-50 rounded-xl flex items-center justify-center text-brand-700 group-hover:bg-brand-700 group-hover:text-white transition-colors duration-300 mb-6 border border-brand-100">
                  <Briefcase className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 font-display">
                  Business Development
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  Enterprise mentoring circles, formal branding advice, business structuring templates, bookkeeping audits, and strategic partnership linkages. We help you transform informal activities into standard corporations.
                </p>
              </div>
              <div>
                <button 
                  onClick={handleOpenSignUp}
                  className="text-brand-700 hover:text-brand-800 font-bold text-sm inline-flex items-center space-x-1.5 cursor-pointer uppercase tracking-wider bg-transparent border-0 outline-none"
                >
                  <span>Apply Now</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. What We Do Section */}
      <section id="explore-services" className="py-24 bg-brand-50/50 border-t border-b border-brand-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* What We Do Left: Clean Image Panel */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group w-full max-w-2xl animate-float">
                <div className="relative border border-brand-200 rounded-2xl overflow-hidden shadow-lg">
                  {!imageError ? (
                    <img 
                      src={navlogo2} 
                      alt="PWWE Foundation Empowerment Focus Flier" 
                      className="w-full aspect-[1024/683] object-cover group-hover:shadow-xl transition-all duration-700"
                      onError={() => setImageError(true)}
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full aspect-[1024/683] bg-gradient-to-br from-brand-800 to-indigo-950 flex flex-col justify-center items-center p-8 text-center text-white">
                      <div className="h-16 w-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                        <Users className="h-8 w-8 text-brand-300" />
                      </div>
                      <h4 className="text-xl font-bold font-display">Empowering Communities</h4>
                      <p className="text-xs text-brand-200 mt-2 leading-relaxed">
                        PWWE Foundation operates cooperative initiatives bridging leadership, vocational skills, and microfinance solutions.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* What We Do Right: 6-grid Service matrix */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <div>
                <span className="text-xs font-bold text-brand-700 tracking-widest uppercase block mb-2 font-sans">Our Service Matrix</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight font-display">
                  Comprehensive Development Programs
                </h2>
                <p className="text-gray-500 mt-4 leading-relaxed text-sm">
                  We deploy direct service programs to help women overcome financial barriers, secure sustainable livelihoods, and build professional business networks.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                
                {/* Service 1 */}
                <div className="flex space-x-4">
                  <div className="h-10 w-10 rounded-lg bg-brand-50 hover:bg-brand-100 flex items-center justify-center text-brand-700 shrink-0 border border-brand-100 transition-colors duration-300">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-gray-900 font-display">Skills Development</h4>
                    <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                      Hands-on vocational up-skilling seminars across critical artisanal, digital, and professional careers.
                    </p>
                  </div>
                </div>

                {/* Service 2 */}
                <div className="flex space-x-4">
                  <div className="h-10 w-10 rounded-lg bg-brand-50 hover:bg-brand-100 flex items-center justify-center text-brand-700 shrink-0 border border-brand-100">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-gray-900 font-display">Economic Empowerment</h4>
                    <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                      Targeted grants, revolving mini-capital opportunities, and asset equipment assistance schemes.
                    </p>
                  </div>
                </div>

                {/* Service 3 */}
                <div className="flex space-x-4">
                  <div className="h-10 w-10 rounded-lg bg-brand-50 hover:bg-brand-100 flex items-center justify-center text-brand-700 shrink-0 border border-brand-100">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-gray-900 font-display">Financial Literacy</h4>
                    <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                      Rigorous interactive lessons covering dynamic household budget management, bookkeeping, and debt optimization.
                    </p>
                  </div>
                </div>

                {/* Service 4 */}
                <div className="flex space-x-4">
                  <div className="h-10 w-10 rounded-lg bg-brand-50 hover:bg-brand-100 flex items-center justify-center text-brand-700 shrink-0 border border-brand-100">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-gray-900 font-display">Community Building</h4>
                    <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                      Regular local group sessions for emotional guidance, networking circles, and joint problem resolving.
                    </p>
                  </div>
                </div>

                {/* Service 5 */}
                <div className="flex space-x-4">
                  <div className="h-10 w-10 rounded-lg bg-brand-50 hover:bg-brand-100 flex items-center justify-center text-brand-700 shrink-0 border border-brand-100">
                    <Handshake className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-gray-900 font-display">Mentorship & Accountability</h4>
                    <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                      Direct pairing with top corporate sponsors and veterans to maintain operational business transparency.
                    </p>
                  </div>
                </div>

                {/* Service 6 */}
                <div className="flex space-x-4">
                  <div className="h-10 w-10 rounded-lg bg-brand-50 hover:bg-brand-100 flex items-center justify-center text-brand-700 shrink-0 border border-brand-100">
                    <Building className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-gray-900 font-display">Enterprise Support</h4>
                    <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                      Simplifying registration structures, cooperative incorporation rules, and licensing templates.
                    </p>
                  </div>
                </div>

              </div>

              <div className="pt-4">
                <Link
                  to="/about"
                  className="inline-flex items-center space-x-1 text-sm font-bold text-brand-700 hover:text-brand-800 transition-colors uppercase tracking-wider font-sans border-0"
                  id="more-services-link"
                >
                  <span>More about our services</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 5. Stats / Impact Banner Section */}
      <section id="impact-banner" className="bg-brand-900 text-white py-16 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-900/40 via-brand-920/20 to-transparent pointer-events-none"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            
            {/* Stat Item 1 */}
            <div className="space-y-2 border-b md:border-b-0 md:border-r border-brand-800 py-6 md:py-0 last:border-0">
              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight font-display text-transparent bg-clip-text bg-gradient-to-r from-white to-brand-100">
                3+ Pillars
              </div>
              <div className="text-xs sm:text-sm font-semibold tracking-wider text-brand-200 uppercase font-sans">
                Human, Cooperative & Business Channels
              </div>
            </div>

            {/* Stat Item 2 */}
            <div className="space-y-2 border-b md:border-b-0 md:border-r border-brand-800 py-6 md:py-0 last:border-0">
              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight font-display text-transparent bg-clip-text bg-gradient-to-r from-white to-brand-100">
                100+ Women
              </div>
              <div className="text-xs sm:text-sm font-semibold tracking-wider text-brand-200 uppercase font-sans">
                Successfully Empowered and Accounted
              </div>
            </div>

            {/* Stat Item 3 */}
            <div className="space-y-2 py-6 md:py-0">
              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight font-display text-transparent bg-clip-text bg-gradient-to-r from-white to-brand-100">
                1 Mission
              </div>
              <div className="text-xs sm:text-sm font-semibold tracking-wider text-brand-200 uppercase font-sans">
                Rise, Thrive, & Economic Prosperity
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Testimonial / Quote Section */}
      <section id="testimonials" className="py-24 bg-gray-50/70 border-b border-gray-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-brand-700 tracking-widest uppercase block mb-3 font-sans">Stories of Change</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight font-display">
              Voices of Empowered Pioneers
            </h2>
            <div className="w-16 h-1.5 bg-brand-700 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* Testimonial 1 */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm relative flex flex-col justify-between">
              <div className="absolute top-6 right-6 text-brand-100 pointer-events-none">
                <Quote className="h-12 w-12 fill-current" />
              </div>
              <div className="space-y-4">
                <p className="text-gray-600 text-sm italic leading-relaxed pt-2">
                  "Before joining the PWWE Cooperative, making strategic business planning and keeping accurate bookkeeping records was extremely complicated. The financial classes completely reshaped my strategy. Now, my retail venture is growing and stable."
                </p>
                <div className="h-px bg-gray-100"></div>
              </div>
              <div className="flex items-center space-x-3.5 pt-4">
                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-brand-700 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                  FM
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 font-sans">Fadekemi Mobolaji</h4>
                  <p className="text-xs text-brand-700 uppercase font-bold tracking-wider">Agro-Commodity Retailer, Ibadan</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm relative flex flex-col justify-between">
              <div className="absolute top-6 right-6 text-brand-100 pointer-events-none">
                <Quote className="h-12 w-12 fill-current" />
              </div>
              <div className="space-y-4">
                <p className="text-gray-600 text-sm italic leading-relaxed pt-2">
                  "PWWE provided more than resources; they gave a robust support system. The weekly accountability group helped me establish consistent savings. I purchased my modern business machinery through the cooperative asset acquisition channel!"
                </p>
                <div className="h-px bg-gray-100"></div>
              </div>
              <div className="flex items-center space-x-3.5 pt-4">
                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-brand-700 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                  BO
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 font-sans">Bisi Olanrewaju</h4>
                  <p className="text-xs text-brand-700 uppercase font-bold tracking-wider">Fashion Designer & Boutique owner</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 7. Contact CTA & Inquiry Section */}
      <section id="contact-cta-section" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-brand-100 rounded-3xl overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12">
            
            {/* Contact CTA Left: Coords */}
            <div className="lg:col-span-5 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-950 text-white p-8 sm:p-12 text-left relative flex flex-col justify-between space-y-12">
              <div className="absolute inset-0 opacity-5 pointer-events-none">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <rect width="100%" height="100%" fill="none" />
                  <circle cx="10%" cy="10%" r="20%" stroke="#FFFFFF" fill="none" strokeWidth="2" />
                </svg>
              </div>

              <div className="space-y-4">
                <span className="text-[10px] font-bold tracking-widest uppercase text-brand-300">Operational Office Context</span>
                <h3 className="text-2xl sm:text-3xl font-bold font-display leading-tight">
                  Reach Out to PWWE Headquarters
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Together we can empower more women and transform more communities. Send your queries or schedule a visit to speak with an intake manager.
                </p>
              </div>

              <div className="space-y-6">
                
                {/* Coordinate 1 */}
                <div className="flex items-start space-x-3.5">
                  <MapPin className="h-5.5 w-5.5 text-brand-300 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-brand-200 uppercase tracking-widest leading-none">Main Address</h5>
                    <p className="text-sm mt-1 text-gray-100">
                      2nd Floor, ANCE Building, Jericho, Ibadan, Oyo State, Nigeria
                    </p>
                  </div>
                </div>

                {/* Coordinate 2 */}
                <div className="flex items-start space-x-3.5">
                  <Phone className="h-5.5 w-5.5 text-brand-300 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-brand-200 uppercase tracking-widest leading-none">Phone Contact</h5>
                    <a href="tel:+2349031463004" className="text-sm mt-1 text-gray-100 block hover:text-brand-300 transition-colors">
                      +234 903 146 3004
                    </a>
                  </div>
                </div>

                {/* Coordinate 3 */}
                <div className="flex items-start space-x-3.5">
                  <Mail className="h-5.5 w-5.5 text-brand-300 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-brand-200 uppercase tracking-widest leading-none">Email Support</h5>
                    <a href="mailto:contact@pwwefoundation.com" className="text-sm mt-1 text-gray-100 block hover:text-brand-300 transition-colors">
                      contact@pwwefoundation.com
                    </a>
                  </div>
                </div>

              </div>

              <div className="pt-4 border-t border-brand-800 text-[11px] text-gray-400 font-sans">
                PWWE Foundation Registration ID: Oyo State Cooperatives Framework Registered Unit.
              </div>
            </div>

            {/* Contact CTA Right: Inline Form */}
            <div className="lg:col-span-7 p-8 sm:p-12 text-left bg-gray-50/50">
              <h3 className="text-xl sm:text-2xl font-bold font-display text-gray-900 mb-2">
                Send an Inquiry
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mb-6 font-medium">
                Complete this formal contact query. Our intake review queue is processed daily.
              </p>

              {formSubmitted ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center animate-fade-in flex flex-col items-center justify-center min-h-[300px]">
                  <CheckCircle2 className="h-12 w-12 text-emerald-500 mb-3" />
                  <h4 className="text-lg font-bold text-emerald-900">Message Sent Successfully!</h4>
                  <p className="text-xs text-emerald-700/80 mt-1 max-w-sm">
                    Thank you. Your message has been routed to our secretarial desk. An associate will respond within 24 working hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        value={contactForm.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Mary Daniel"
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={contactForm.email}
                        onChange={handleInputChange}
                        placeholder="yourname@example.com"
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      required
                      value={contactForm.subject}
                      onChange={handleInputChange}
                      placeholder="e.g. Partnership Opportunity / Cooperative savings info"
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="interest" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">I am interested in...</label>
                    <select
                      name="interest"
                      id="interest"
                      value={contactForm.interest}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                    >
                      <option value="Human Empowerment">Human Empowerment Circle (Skills)</option>
                      <option value="Cooperative Empowerment">Cooperative Savings & Microfinance Pool</option>
                      <option value="Business Development">Business Incubation & Mentor Network</option>
                      <option value="General Sponsorship">General Sponsorship / Partnership Interest</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Message Text</label>
                    <textarea
                      name="message"
                      id="message"
                      required
                      rows={4}
                      value={contactForm.message}
                      onChange={handleInputChange}
                      placeholder="Write your detailed questions or description here..."
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                    ></textarea>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      id="contact-submit-btn"
                      className="w-full bg-brand-700 hover:bg-brand-800 text-white font-bold py-3.5 px-6 rounded-full shadow-md hover:shadow-lg transition-all text-sm uppercase tracking-wider"
                    >
                      Send Message
                    </button>
                  </div>

                </form>
              )}
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
