import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Star, Send, Building, PhoneCall, MailOpen, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

export default function Home() {
  // Local state for the contact form
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    interest: "PWWE Cooperative Enrollment",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activePathwayTab, setActivePathwayTab] = useState(0);

  // Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const autoplayTimer = useRef(null);

  const carouselSlides = [
    {
      image: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=1600&q=80",
      tag: "• Cooperative Savings •",
      title: "Economic Empowerment Through Women Entrepreneurship",
      subtitle: "Empowering Women. Transforming Communities. We guide women in Oyo State through collective savings networks and structured micro-enterprise launching.",
      primaryText: "Join The Cooperative",
      primaryLink: "/auth?tab=register",
      secondaryText: "Learn Our Story",
      secondaryLink: "/about",
    },
    {
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1600&q=80",
      tag: "• Skills Development •",
      title: "Direct Vocational & Enterprise Cohorts",
      subtitle: "Hands-on manufacturing, textile, craft, and agro-processing cohorts designed to give women instant marketable self-sufficiency.",
      primaryText: "Apply For Skills Entry",
      primaryLink: "/contact?signup=skills",
      secondaryText: "Our Methodology",
      secondaryLink: "/about",
    },
    {
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1600&q=80",
      tag: "• Zero Predatory Interest •",
      title: "Mutual Micro-Equity & Rotating Ledgers",
      subtitle: "We replace high-interest loan cycles with community-led credit books. Members save organically and fund their sisters with zero-interest, zero-collateral.",
      primaryText: "Access Member Portal",
      primaryLink: "/auth",
      secondaryText: "Get in Touch",
      secondaryLink: "/contact",
    }
  ];

  // Autoplay Logic
  useEffect(() => {
    if (!isAutoplayPaused) {
      autoplayTimer.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
      }, 7000);
    }
    return () => {
      if (autoplayTimer.current) clearInterval(autoplayTimer.current);
    };
  }, [isAutoplayPaused]);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formState.name && formState.email && formState.message) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormState({
          name: "",
          email: "",
          subject: "",
          interest: "PWWE Cooperative Enrollment",
          message: "",
        });
      }, 7000);
    }
  };

  const pathways = [
    {
      step: "01",
      title: "Human Empowerment",
      description:
        "The foundation of growth starts with the mind and body. We equip women in Oyo State with vocational competencies, mental health workshops, and social safety nets to recover self-worth and establish immediate financial agency.",
      bullets: ["Vocational training cohorts", "Self-reliance mentorship", "Mental well-being circles"],
    },
    {
      step: "02",
      title: "Cooperative Empowerment",
      description:
        "From individual agency to collective power. Women organize into local mutual savings blocks, maintaining ledgers, managing rotating credit funds, and supporting other members through secure, interest-free cooperative capitalization.",
      bullets: ["Cooperative mutual ledger savings", "Interest-free growth pools", "Peer accountability networks"],
    },
    {
      step: "03",
      title: "Business Development",
      description:
        "Full economic independence. We transition cooperative projects into high-yield local enterprises with strategic incubation: brand creation, product packaging, market placements in Ibadan, and professional micro-business scaling.",
      bullets: ["Enterprise packaging & branding", "Ibadan local trade placement", "Micro-enterprise bookkeeping"],
    },
  ];

  const services = [
    { title: "Skills Development", desc: "Hands-on vocational masterclasses ranging from soap creation, textile craft, to modern agro-processing." },
    { title: "Economic Empowerment", desc: "Direct seed funding grant pipelines allocated to women to establish self-run livelihoods." },
    { title: "Financial Literacy", desc: "Rigorous training in basic micro-ledger bookkeeping, tracking profit margins, and avoiding bad debt." },
    { title: "Community Building", desc: "Creating safe spaces where marginalized women share business trials, child-support networks, and advice." },
    { title: "Mentorship & Accountability", desc: "Matching new business owners with seasoned cooperative leaders to secure reliable enterprise growth." },
    { title: "Enterprise Support", desc: "Sponsoring trade permit access, storage facilities alignment, and direct supply-chain linkages around Ibadan." },
  ];

  return (
    <div className="overflow-hidden bg-brand-light animate-fade-in" id="home-page-container">
      
      {/* 1. HERO SECTION - Immersive Image Carousel & Editorial Content Layer */}
      <section 
        className="relative bg-[#120A14] min-h-[580px] md:min-h-[660px] lg:min-h-[720px] flex items-center overflow-hidden" 
        id="hero-section"
        onMouseEnter={() => setIsAutoplayPaused(true)}
        onMouseLeave={() => setIsAutoplayPaused(false)}
      >
        {/* Background Image Slideshow with smooth fade & zoom */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9 }}
              className="absolute inset-0 w-full h-full bg-cover bg-center select-none"
              style={{ backgroundImage: `url(${carouselSlides[currentSlide].image})` }}
            >
              {/* Overlay with subtle warm purple/black depth */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#120A14]/95 via-[#120A14]/85 to-transparent" />
              
              {/* Subtle structural architectural canvas grid lines */}
              {/* <div className="absolute inset-0 opacity-[0.03] grid grid-cols-12 pointer-events-none">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="border-r border-white h-full" />
                ))}
              </div> */}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide Content Layer */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-20 text-white">
          <div className="max-w-3xl space-y-6 md:space-y-8">
            
            {/* Slide Category Tag */}
            {/* <AnimatePresence mode="wait">
              <motion.span
                key={currentSlide}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.4 }}
                className="inline-block font-mono text-[10px] md:text-xs tracking-widest uppercase text-[#CC9838] bg-[#CC9838]/10 border border-[#CC9838]/20 px-3.5 py-1.5 font-bold"
              >
                {carouselSlides[currentSlide].tag}
              </motion.span>
            </AnimatePresence> */}
            
            {/* Dynamic Slider Title */}
            <div className="min-h-[140px] md:min-h-[180px] lg:min-h-[220px]">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={currentSlide}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.6 }}
                  className="font-display text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]"
                  id="carousel-slide-title"
                >
                  {carouselSlides[currentSlide].title}
                </motion.h1>
              </AnimatePresence>
            </div>
            
            {/* Slide Description - WCAG High Contrast */}
            <div className="min-h-[80px] md:min-h-[100px]">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentSlide}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.9 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-xs sm:text-sm md:text-base text-gray-200 font-sans font-light max-w-xl leading-relaxed"
                >
                  {carouselSlides[currentSlide].subtitle}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Slider CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                to={carouselSlides[currentSlide].primaryLink}
                className="px-8 py-4 bg-brand-purple text-white text-center font-mono text-xs uppercase tracking-wider font-extrabold hover:bg-white hover:text-brand-dark transition-all duration-300 shadow-sm"
                id="carousel-primary-cta"
              >
                {carouselSlides[currentSlide].primaryText}
              </Link>
              <Link
                to={carouselSlides[currentSlide].secondaryLink}
                className="px-8 py-4 bg-transparent text-white border border-white/30 text-center font-mono text-xs uppercase tracking-wider font-extrabold hover:border-[#CC9838] hover:text-[#CC9838] transition-all duration-300"
                id="carousel-secondary-cta"
              >
                {carouselSlides[currentSlide].secondaryText}
              </Link>
            </div>

            {/* Minor Live Indicator & Interactive controls bar */}
            <div className="flex items-center justify-between pt-12 border-t border-white/10 text-xs font-mono text-white/50">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#CC9838] animate-pulse" />
                <span> ANCE Building, Jericho, Ibadan, Nigeria</span>
              </div>
              
              {/* Desktop Slide Count Index Indicator */}
              <div className="hidden sm:flex items-center gap-2">
                {carouselSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    className={`h-1 transition-all duration-300 cursor-pointer ${
                      currentSlide === index ? "bg-[#CC9838] w-12" : "bg-white/20 w-8 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Left/Right Absolute Arrows for manual sliding */}
        <button
          onClick={handlePrevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/40 hover:bg-[#CC9838] transition-all duration-300 border border-white/10 text-white cursor-pointer"
          aria-label="Previous Slide Overlay"
          id="prev-slide-btn"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={handleNextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/40 hover:bg-[#CC9838] transition-all duration-300 border border-white/10 text-white cursor-pointer"
          aria-label="Next Slide Overlay"
          id="next-slide-btn"
        >
          <ChevronRight size={20} />
        </button>
      </section>

      {/* 2. MISSION STRIP - Typographic Focus */}
      <section className="bg-brand-light/30 border-y border-brand-purple/10" id="mission-strip">
        <div className="max-w-7xl mx-auto py-16 px-6 text-center">
          <span className="block font-mono text-[11px] uppercase tracking-widest text-[#CC9838] mb-3 font-bold">
            Our Central Conviction
          </span>
          <h2 className="font-display text-3xl sm:text-5xl italic font-light text-brand-dark leading-tight max-w-4xl mx-auto">
            "Empowering Women To <span className="text-brand-purple italic font-black">Rise</span>, <span className="text-brand-purple italic font-black">Thrive</span>, And <span className="text-brand-purple italic font-black">Prosper</span>."
          </h2>
        </div>
      </section>

      {/* 3. THREE PATHWAYS SECTION - Progressive Sequence Device */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto" id="pathways-section">
        <div className="text-center space-y-4 mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-[#CC9838] font-bold">
            The Progressive Evolution
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-black text-brand-dark">
            Three Pillars of Real Ascension
          </h2>
          <p className="text-xs sm:text-sm font-sans text-brand-dark/70 max-w-lg mx-auto">
            A woman does not build a business in a vacuum. She moves through the PWWE structured pipeline sequentially:
          </p>
        </div>

        {/* The Path Connector - Horizontal on Desktop, Timeline styled */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-[26px] left-[15%] right-[15%] h-[2px] bg-brand-purple/15 hidden lg:block -z-10" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
            {pathways.map((path, idx) => (
              <div
                key={idx}
                className={`p-8 bg-white border transition-all duration-300 hover:border-[#CC9838]/30 ${
                  activePathwayTab === idx
                    ? "border-brand-purple shadow-xs"
                    : "border-brand-purple/10"
                }`}
                onMouseEnter={() => setActivePathwayTab(idx)}
              >
                <div className="flex justify-between items-start">
                  <span className="font-mono text-xs font-bold text-white bg-brand-purple px-3 py-1">
                    PILLAR {path.step}
                  </span>
                  <span className="font-display text-4xl font-extrabold text-[#E1DBEB]">
                    {path.step}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold mt-6 text-brand-dark hover:text-brand-purple transition-colors">
                  {path.title}
                </h3>

                <p className="text-xs sm:text-sm text-brand-dark/75 mt-4 leading-relaxed font-sans min-h-[100px]">
                  {path.description}
                </p>

                {/* Sub Bullet items under each path */}
                <ul className="mt-6 space-y-2 border-t border-brand-purple/5 pt-4">
                  {path.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="flex items-center gap-2 text-xs font-sans text-brand-dark/60">
                      <span className="w-1.5 h-1.5 bg-[#CC9838]" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-2">
                  <Link
                    to="/about"
                    className="text-xs font-mono font-bold uppercase tracking-wider text-brand-purple hover:text-[#CC9838] transition-colors flex items-center gap-1.5 group"
                  >
                    <span>Read pillar details</span>
                    <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHAT WE DO SECTION - Asymmetric divider list with real image */}
      <section className="py-24 bg-[#FDF6E8] border-y border-[#CC9838]/10" id="services-section">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column - Flier image and content intro */}
            <div className="lg:col-span-5 space-y-8 sticky top-24">
              <span className="font-mono text-xs uppercase tracking-widest text-[#CC9838] font-bold block">
                Sustainable Services
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-black text-brand-dark leading-tight">
                Our Functional Offerings in Oyo State
              </h2>
              <p className="text-sm text-brand-dark/75 leading-relaxed font-sans">
                PWWE Foundation provides physical resources, strategic market connections, and local cluster supervision to sustain women long past their initial training schemes.
              </p>

              {/* Real flier image with double frame layout (completely non-AI default) */}
              <div className="relative pt-4">
                <div className="border-4 border-brand-dark p-2 text-[0px] bg-white">
                  <img
                    src="https://pwwefoundation.com/wp-content/uploads/2026/06/pwwefoundation-flier-1024x683.png"
                    alt="PWWE Foundation cooperative women flyer"
                    referrerPolicy="no-referrer"
                    className="w-full h-auto grayscale-20 hover:grayscale-0 transition-all duration-500 object-cover"
                    id="pwwe-flier-image"
                  />
                </div>
                {/* Visual Label tag */}
                <div className="absolute -bottom-4 right-4 bg-brand-purple text-white py-1 px-4 text-[10px] font-mono uppercase tracking-widest font-black">
                  PWWE Cohort Flier • Ibadan Head Office
                </div>
              </div>
            </div>

            {/* Right Column - Beautiful item list with hairline rules */}
            <div className="lg:col-span-7 space-y-6 lg:pl-6">
              <span className="block font-mono text-[11px] text-brand-dark/40 uppercase tracking-widest border-b border-brand-purple/10 pb-2">
                Core Auxiliary Support Channels
              </span>

              <div className="divide-y divide-[#CC9838]/20">
                {services.map((svc, i) => (
                  <div key={i} className="py-5 first:pt-0 last:pb-0 group">
                    <div className="flex flex-col md:flex-row gap-2 md:gap-6 justify-between items-start">
                      <div className="flex gap-3 items-start">
                        {/* Numerical custom ledger tag helper (No circular icon!) */}
                        <span className="font-mono text-xs text-brand-purple font-bold mt-1 min-w-[20px]">
                          [{i + 1}]
                        </span>
                        <div>
                          <h3 className="font-display text-md font-bold text-brand-dark group-hover:text-brand-purple transition-all duration-300">
                            {svc.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-brand-dark/70 mt-1.5 leading-relaxed font-sans">
                            {svc.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-[#CC9838]/20">
                <Link
                  to="/about"
                  className="px-6 py-3.5 border-2 border-brand-purple text-brand-purple font-mono text-xs uppercase tracking-widest font-bold hover:bg-brand-purple hover:text-brand-light transition-all duration-300 inline-block text-center"
                  id="more-services-link"
                >
                  View More Services & History
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. STATS/IMPACT SECTION - Pure High-Contrast block */}
      <section className="bg-[#120A14] py-24 px-6 md:px-12 border-b border-brand-purple/20 text-white relative overflow-hidden" id="stats-section">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-lg mb-16 space-y-4">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#CC9838] font-bold">
              // Monitored Statistics //
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-black text-white leading-tight">
              Evidence of Cooperative Ascension in Oyo State
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 pt-6 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {/* Stat Item 1 */}
            <div className="space-y-3 pb-8 md:pb-0 md:px-6 first:pl-0">
              <span className="font-mono text-xs text-white/50 block">OUR METHODOLOGY</span>
              <div className="font-display text-5xl sm:text-7xl font-black text-brand-purple font-heavy" id="stat-pillars">
                3+ Pillars
              </div>
              <p className="text-xs sm:text-sm text-white/70 font-sans max-w-xs leading-relaxed">
                Seamless progression guiding candidate women from human skills up to fully operational local business entities.
              </p>
            </div>

            {/* Stat Item 2 */}
            <div className="space-y-3 pt-8 md:pt-0 md:px-6">
              <span className="font-mono text-xs text-white/50 block">SOCIAL IMPACT REACH</span>
              <div className="font-display text-5xl sm:text-7xl font-black text-[#CC9838] font-heavy" id="stat-women">
                100+ Women
              </div>
              <p className="text-xs sm:text-sm text-white/70 font-sans max-w-xs leading-relaxed">
                Marginalized women empowered with concrete skills, mutual savings support, and active trading organizations.
              </p>
            </div>

            {/* Stat Item 3 */}
            <div className="space-y-3 pt-8 md:pt-0 md:px-6">
              <span className="font-mono text-xs text-white/50 block">CORPORATE PHILOSOPHY</span>
              <div className="font-display text-5xl sm:text-7xl font-black text-[#CC9838] font-heavy" id="stat-mission">
                1 Mission
              </div>
              <p className="text-xs sm:text-sm text-white/70 font-sans max-w-xs leading-relaxed">
                Total local economic self-reliance. Eliminating cycles of micro-lending debt and building real structural assets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. QUOTE/TESTIMONIAL SECTION - Understated but Powerful */}
      <section className="py-24 px-6 bg-brand-light" id="testimonial-section">
        <div className="max-w-4xl mx-auto border-l-4 border-brand-purple pl-6 md:pl-10 space-y-6">
          <div className="flex gap-1.5 text-brand-purple">
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
          </div>

          <p className="font-display text-lg sm:text-2xl text-brand-dark/85 leading-relaxed italic block">
            "Before I joined the PWWE cooperative, running my enterprise in Ibadan was a lonely struggle. With the structural ledger savings and business accountability groups, I've expanded my retail market, secured interest-free cooperative loans, and now support four other women in my district."
          </p>

          <div>
            <span className="block font-sans font-bold text-sm text-brand-dark">
              Alhaja R. Adesina
            </span>
            <span className="block font-mono text-[10px] text-[#CC9838] uppercase tracking-wider font-semibold">
              Textile Entrepreneur & PWWE Ibadan West Cluster Leader
            </span>
          </div>
        </div>
      </section>

      {/* 7. CONTACT CTA SECTION - Together we can: Form and Details */}
      <section className="py-24 bg-brand-purple-light/30 border-t border-[#CC9838]/20" id="contact-cta-section">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-12 lg:grid lg:grid-cols-12 lg:gap-16 items-start">
          
          {/* Left Box: Text Content + Coordinates */}
          <div className="lg:col-span-4 space-y-8">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-purple font-bold block">
              Take Collective Action
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-black text-brand-dark leading-tight">
              Together, we can empower more women and transform more communities
            </h2>
            <p className="text-sm text-brand-dark/70 font-sans leading-relaxed font-light">
              Whether you want to apply for cooperative savings membership, join our next vocation skill cohort in Ibadan, or partner with us as an institutional sponsor, fill out this inquiry ledger.
            </p>

            {/* Coordinator Elements */}
            <div className="space-y-6 pt-6 border-t border-brand-purple/10">
              <div className="flex gap-4 items-start">
                <div className="p-2.5 bg-white border border-brand-purple/10 text-brand-purple shadow-xs shrink-0">
                  <Building size={16} />
                </div>
                <div>
                  <span className="block text-[10px] font-mono uppercase text-brand-dark/50 tracking-widest">physical location</span>
                  <span className="block text-xs font-sans text-brand-dark font-medium leading-relaxed">
                    2nd Floor, ANCE Building, Jericho, Ibadan, Oyo State, Nigeria
                  </span>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-2.5 bg-white border border-brand-purple/10 text-brand-purple shadow-xs shrink-0">
                  <PhoneCall size={16} />
                </div>
                <div>
                  <span className="block text-[10px] font-mono uppercase text-brand-dark/50 tracking-widest">quick contact desk</span>
                  <a href="tel:+2349031463004" className="block text-xs font-sans text-brand-dark font-semibold hover:text-brand-purple transition-colors">
                    (+234) 903 146 3004
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Box: The Inquiry Form */}
          <div className="lg:col-span-8 bg-white p-8 md:p-10 border border-brand-purple/10 shadow-xs relative">
            <span className="absolute top-0 right-0 bg-[#CC9838] text-white text-[9px] font-mono uppercase tracking-widest font-black py-12 px-2 [writing-mode:vertical-lr] hidden sm:block">
              PWWE Entry Book
            </span>

            <h4 className="font-display text-xl font-bold text-brand-dark mb-2">
              Submit Interest Ledger
            </h4>
            <p className="text-xs text-brand-dark/60 font-sans mb-8">
              Your credentials are filed securely in our Ibadan register directory. Fields tagged with * are required.
            </p>

            {isSubmitted ? (
              <div className="bg-[#FAF3FA] border border-brand-purple text-brand-dark p-6 space-y-3 animate-fade-in">
                <div className="flex items-center gap-2 text-brand-purple">
                  <CheckCircle2 size={20} />
                  <span className="font-display text-lg font-bold">Eku Abo! Entry Logged.</span>
                </div>
                <p className="text-xs leading-relaxed font-sans text-brand-dark/80">
                  Hello, <strong>{formState.name}</strong>. Your message regarding <strong>{formState.interest}</strong> has been received by the PWWE administrative registrar at our Jericho, Ibadan office. An executive lead of Oyo State clusters will respond via <strong>{formState.email}</strong> within 1-2 business days.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" id="home-interest-form">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label htmlFor="form-name" className="block font-mono text-[10px] uppercase text-brand-dark/70 tracking-widest font-bold">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="form-name"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      required
                      placeholder="e.g., Alaba Adesina"
                      className="w-full bg-brand-light border border-brand-purple/15 focus:border-[#CC9838] focus:outline-none px-4 py-3 text-xs sm:text-sm font-sans text-brand-dark transition-all duration-200"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label htmlFor="form-email" className="block font-mono text-[10px] uppercase text-brand-dark/70 tracking-widest font-bold">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="form-email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      required
                      placeholder="e.g., alaba@domain.com"
                      className="w-full bg-brand-light border border-brand-purple/15 focus:border-[#CC9838] focus:outline-none px-4 py-3 text-xs sm:text-sm font-sans text-brand-dark transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Subject */}
                  <div className="space-y-2">
                    <label htmlFor="form-subject" className="block font-mono text-[10px] uppercase text-brand-dark/70 tracking-widest font-bold">
                      Subject Line
                    </label>
                    <input
                      type="text"
                      id="form-subject"
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      placeholder="e.g., Cooperative Inquiry"
                      className="w-full bg-brand-light border border-brand-purple/15 focus:border-[#CC9838] focus:outline-none px-4 py-3 text-xs sm:text-sm font-sans text-brand-dark transition-all duration-200"
                    />
                  </div>

                  {/* Interest Dropdown */}
                  <div className="space-y-2">
                    <label htmlFor="form-interest" className="block font-mono text-[10px] uppercase text-brand-dark/70 tracking-widest font-bold">
                      I am interested in...
                    </label>
                    <select
                      id="form-interest"
                      value={formState.interest}
                      onChange={(e) => setFormState({ ...formState, interest: e.target.value })}
                      className="w-full bg-brand-light border border-brand-purple/15 focus:border-[#CC9838] focus:outline-none px-4 py-3 text-xs sm:text-sm font-sans text-brand-dark transition-all duration-200"
                    >
                      <option value="PWWE Cooperative Enrollment">PWWE Cooperative Enrollment</option>
                      <option value="Skills Cohort Entry">Skills Cohort Entry</option>
                      <option value="Volunteering as a Mentor">Volunteering as a Mentor</option>
                      <option value="Donation Support">Donation Support</option>
                      <option value="General Inquiry">General Inquiry</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label htmlFor="form-message" className="block font-mono text-[10px] uppercase text-brand-dark/70 tracking-widest font-bold">
                    Message / Ledger Notes *
                  </label>
                  <textarea
                    id="form-message"
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    required
                    placeholder="Specify your enterprise type or skill cohort of interest..."
                    className="w-full bg-brand-light border border-brand-purple/15 focus:border-[#CC9838] focus:outline-none px-4 py-3 text-xs sm:text-sm font-sans text-brand-dark transition-all duration-200 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 bg-brand-purple text-brand-light font-mono text-xs uppercase tracking-widest font-black border border-brand-purple hover:bg-transparent hover:text-brand-purple transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  id="form-submit-btn"
                >
                  <span>Submit to Ibadan Registry</span>
                  <Send size={13} />
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}
