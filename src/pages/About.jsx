import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { 
  Users, Award, ShieldCheck, HeartHandshake, Eye, Target, Sparkles, 
  BookOpen, TrendingUp, Briefcase, ArrowRight, CheckCircle2 
} from "lucide-react";

export default function About() {
  const { handleOpenSignUp } = useOutletContext();

  // Leadership team data matching typical structure
  const leaders = [
    {
      name: "Mrs. Victoria Adebayo",
      role: "Executive President & Founder",
      bio: "An accomplished corporate administrator and advocate for micro-cooperatives. Victoria founded PWWE with a calling to build structural support frameworks for industrious women.",
      initials: "VA"
    },
    {
      name: "Dr. Elizabeth Johnson",
      role: "Director of Entrepreneurship Programs",
      role_long: "Over 15 years lecturing in Business Administration and incubation design. Elizabeth crafts the PWWE enterprise curriculum and business coaching structure.",
      initials: "EJ"
    },
    {
      name: "Mrs. Amina Yusuf",
      role: "Cooperative Treasurer & Audit lead",
      bio: "A certified financial analyst specialising in microfinance and community thrift pools. Amina monitors saving structures and reviews interest assignments.",
      initials: "AY"
    }
  ];

  return (
    <div className="relative">
      
      {/* 1. About Hero Section */}
      <section 
        id="about-hero"
        className="relative bg-gradient-to-br from-brand-900 via-brand-800 to-indigo-950 text-white py-20 text-center overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dotPatternAbout" width="30" height="30" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="#FFFFFF" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dotPatternAbout)" />
          </svg>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/20 shadow-inner mb-4">
            <span className="text-[10px] sm:text-xs font-bold tracking-widest text-brand-100 uppercase">
              Get To Know Us Better
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display leading-tight tracking-tight mb-3">
            About PWWE Foundation
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto leading-relaxed">
            Unveiling our rich history, strategic framework, leadership drivers, and vision for dynamic female collective prosperity.
          </p>
        </div>

        {/* Small subtle wave on bottom of About Hero */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg className="fill-white w-full h-10 translate-y-1" viewBox="0 0 1440 40" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,32L1440,0L1440,40L0,40Z"></path>
          </svg>
        </div>
      </section>

      {/* 2. Mission & Vision */}
      <section id="mission-vision" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Vision Card */}
            <div className="bg-brand-50/50 rounded-3xl p-8 lg:p-12 border border-brand-100 flex flex-col justify-start relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className="absolute -right-8 -bottom-8 text-brand-100/30 group-hover:scale-105 transition-transform duration-500 pointer-events-none">
                <Eye className="h-32 w-32" />
              </div>
              <div className="h-12 w-12 rounded-xl bg-brand-700/10 flex items-center justify-center text-brand-700 mb-6 border border-brand-200">
                <Eye className="h-6 w-6" />
              </div>
              <div className="text-left relative z-10">
                <h2 className="text-2xl font-bold font-display text-gray-900 mb-4">Our Vision</h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  To establish a premier, sustainable support ecosystem where every cooperative female entrepreneur commands the resources, self-mastery, financial network, and market linkages necessary to build scalable, multigenerational fortunes.
                </p>
              </div>
            </div>

            {/* Mission Card */}
            <div className="bg-brand-50/50 rounded-3xl p-8 lg:p-12 border border-brand-100 flex flex-col justify-start relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className="absolute -right-8 -bottom-8 text-brand-100/30 group-hover:scale-105 transition-transform duration-500 pointer-events-none">
                <Target className="h-32 w-32" />
              </div>
              <div className="h-12 w-12 rounded-xl bg-brand-700/10 flex items-center justify-center text-brand-700 mb-6 border border-brand-200">
                <Target className="h-6 w-6" />
              </div>
              <div className="text-left relative z-10">
                <h2 className="text-2xl font-bold font-display text-gray-900 mb-4">Our Mission</h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  To empower women systematically through deep technical education, structured micro-savings schemes, peer accountability mechanisms, and enterprise support frameworks that turn micro-income efforts into standard corporate units.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Our Story Section */}
      <section id="our-story" className="py-20 bg-gray-50/50 border-t border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-left">
          
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-brand-700 tracking-widest uppercase block mb-2 font-sans font-semibold">The Foundation Narrative</span>
            <h2 className="text-3xl font-extrabold text-gray-900 font-display">
              Our Journey & Ethos
            </h2>
            <div className="w-12 h-1 bg-brand-700 mx-auto mt-3 rounded-full"></div>
          </div>

          <div className="space-y-6 text-sm text-gray-600 leading-relaxed font-normal">
            <p>
              The <strong className="text-brand-800">PWWE Foundation</strong> (Prosperous Women & Women Entrepreneurship) emerged as a direct response to some of the structural obstacles facing women merchants, local artisans, and aspiring business starters around Southern Nigeria. 
            </p>
            <p>
              Across several communities, we noted that while women display stellar industrious capacities, they are systematically constrained by an absence of structured micro-capital pools, zero formal exposure to legal entities/bookkeeping practices, and lack of personal leadership mentorship forums. Most commercial banking frameworks charge exorbitant rates, and isolated thrift pools function with zero capital appreciation or accountability structure.
            </p>
            <p>
              PWWE bridges this gap. By registering as a united community cooperative, we enable ladies to aggregate resources safely, access peer-guaranteed revolving investment facilities, study standard professional bookkeeping and digital trade assets, and access structural administrative advisory.
            </p>
            <p>
              Today, PWWE Foundation has successfully onboarded over a hundred active women who regularly meet, save together, mentor each other, and grow structured enterprises out of traditional craft efforts.
            </p>
          </div>

          {/* Inspirational Image underlay block */}
          <div className="bg-gradient-to-tr from-brand-800 to-indigo-950 p-6 sm:p-10 rounded-3xl mt-12 text-white relative overflow-hidden">
            <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-5 translate-y-5">
              <Sparkles className="h-44 w-44" />
            </div>
            
            <div className="relative z-10 space-y-4">
              <span className="text-[10px] font-bold text-brand-300 uppercase tracking-widest font-sans">Core Prophecy</span>
              <h3 className="text-xl sm:text-2xl font-bold font-display max-w-lg">
                "When a woman commands capital and structured training, she transforms not only her home, but her entire community."
              </h3>
              <p className="text-xs text-brand-200 uppercase font-bold tracking-wider pt-2">
                — PWWE Foundation Advisory Council
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Strategic Pathways Section */}
      <section id="pillars-extended" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-brand-700 tracking-widest uppercase block mb-3 font-sans">Structural Pillars</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight font-display">
              The Three Pillars of Action
            </h2>
            <div className="w-16 h-1.5 bg-brand-700 mx-auto mt-4 rounded-full"></div>
            <p className="text-gray-500 mt-4 leading-relaxed font-medium">
              We focus our delivery of services across three core phases, guiding individuals through personal, group, and market scalability.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Pillar 1 Detail */}
            <div className="bg-brand-50/30 p-8 rounded-2xl border border-brand-100/80 text-left">
              <div className="h-12 w-12 rounded-lg bg-brand-700 text-white flex items-center justify-center mb-6 shadow">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 font-display">Pillar 1: Human Empowerment</h3>
              <p className="text-gray-500 text-xs tracking-wider font-bold text-brand-700 uppercase mt-1 mb-4">Confidence & Capacity</p>
              <div className="text-sm text-gray-650 leading-relaxed space-y-3.5 font-sans">
                <p>We believe solid enterprises are built by secure people. Our Human Empowerment circle addresses:</p>
                <ul className="space-y-2 text-xs font-semibold text-gray-700">
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="h-4.5 w-4.5 text-brand-700 shrink-0 mt-0.5" />
                    <span>Mindset orientation and vocabulary advancement</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="h-4.5 w-4.5 text-brand-700 shrink-0 mt-0.5" />
                    <span>Target leadership training seminars</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="h-4.5 w-4.5 text-brand-700 shrink-0 mt-0.5" />
                    <span>Civic awareness and confidence counseling</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Pillar 2 Detail */}
            <div className="bg-brand-50/30 p-8 rounded-2xl border border-brand-100/80 text-left">
              <div className="h-12 w-12 rounded-lg bg-brand-700 text-white flex items-center justify-center mb-6 shadow">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 font-display">Pillar 2: Cooperative Empowerment</h3>
              <p className="text-gray-500 text-xs tracking-wider font-bold text-brand-700 uppercase mt-1 mb-4">Capital Multiplication</p>
              <div className="text-sm text-gray-650 leading-relaxed space-y-3.5 font-sans">
                <p>Establishing peer-backed mutual credit models to generate low-barrier local financing:</p>
                <ul className="space-y-2 text-xs font-semibold text-gray-700">
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="h-4.5 w-4.5 text-brand-700 shrink-0 mt-0.5" />
                    <span>Frictionless rotating savings accounts</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="h-4.5 w-4.5 text-brand-700 shrink-0 mt-0.5" />
                    <span>Strategic micro-loans for inventory purchase</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="h-4.5 w-4.5 text-brand-700 shrink-0 mt-0.5" />
                    <span>Joint asset pooling (machinery purchase etc.)</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Pillar 3 Detail */}
            <div className="bg-brand-50/30 p-8 rounded-2xl border border-brand-100/80 text-left">
              <div className="h-12 w-12 rounded-lg bg-brand-700 text-white flex items-center justify-center mb-6 shadow">
                <Briefcase className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 font-display">Pillar 3: Business Development</h3>
              <p className="text-gray-500 text-xs tracking-wider font-bold text-brand-700 uppercase mt-1 mb-4">Market Readiness</p>
              <div className="text-sm text-gray-650 leading-relaxed space-y-3.5 font-sans">
                <p>Driving informal retail/artisanal trades into compliant, standard corporate businesses:</p>
                <ul className="space-y-2 text-xs font-semibold text-gray-700">
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="h-4.5 w-4.5 text-brand-700 shrink-0 mt-0.5" />
                    <span>Company registration and regulatory licensing support</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="h-4.5 w-4.5 text-brand-700 shrink-0 mt-0.5" />
                    <span>Bookkeeping, pricing formulas and point-of-sale setups</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="h-4.5 w-4.5 text-brand-700 shrink-0 mt-0.5" />
                    <span>Institutional corporate connections and exhibition links</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. Leadership Section */}
      <section id="leadership" className="py-24 bg-gray-50/50 border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-brand-700 tracking-widest uppercase block mb-3 font-sans font-semibold">Who Drives Us</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight font-display">
              Leadership Team
            </h2>
            <div className="w-16 h-1.5 bg-brand-700 mx-auto mt-4 rounded-full"></div>
            <p className="text-gray-500 mt-4 leading-relaxed font-medium">
              A dynamic collective of developers, corporate microfinance practitioners, academic advisers, and executive sponsors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {leaders.map((leader, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between items-center text-center">
                <div className="flex flex-col items-center">
                  {/* Styled Avatar Placeholder */}
                  <div className="h-20 w-20 rounded-full bg-gradient-to-tr from-brand-700 via-brand-800 to-indigo-800 flex items-center justify-center text-white text-2xl font-bold shadow-md shadow-brand-100 mb-5 border-2 border-white">
                    {leader.initials}
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 font-display">
                    {leader.name}
                  </h3>
                  <p className="text-xs font-semibold text-brand-700 uppercase tracking-widest mt-1 mb-4">
                    {leader.role}
                  </p>
                  
                  <p className="text-gray-500 text-xs leading-relaxed">
                    {leader.bio || leader.role_long}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Join Cooperative Below Leadership */}
          <div className="mt-16 text-center">
            <p className="text-sm text-gray-500 font-medium font-sans">
              Are you interested in contributing to our empowerment programs?
            </p>
            <button
              onClick={handleOpenSignUp}
              className="mt-4 bg-brand-700 hover:bg-brand-800 text-white font-bold py-3.5 px-8 rounded-full text-sm shadow-sm hover:shadow-md hover:scale-[1.02] transform transition-all border-0 cursor-pointer"
            >
              Partner / Join The Cooperative
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
