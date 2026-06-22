import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Star, Send, Building, PhoneCall, ChevronLeft, ChevronRight, CheckCircle2, ArrowUp } from "lucide-react";
import homee from "../../assets/homee.png";
export default function Home() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    interest: "PWWE Cooperative Enrollment",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activePathwayTab, setActivePathwayTab] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const autoplayTimer = useRef(null);

  const carouselSlides = [
    {
      image: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=1600&q=80",
      title: "Your savings. Your skills. Your business. Your power.",
      subtitle: "PWWE brings women together across Oyo State to save collectively, learn practical skills, and build businesses that support families and transform communities. No predatory loans. No impossible conditions. Just women investing in each other.",
      primaryText: "Join a Cooperative",
      primaryLink: "/auth?tab=register",
      secondaryText: "About the Foundation",
      secondaryLink: "/about",
    },
    {
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1600&q=80",
      title: "Practical skills that open real doors",
      subtitle: "Our training cohorts cover textile production, soap and detergent making, agro-processing, and other trades women in this region can turn into income immediately. You leave with products, not just notes.",
      primaryText: "Apply for Training",
      primaryLink: "/contact?signup=skills",
      secondaryText: "Our Approach",
      secondaryLink: "/about",
    },
    {
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1600&q=80",
      title: "We lend to each other — without the burden of interest",
      subtitle: "Our rotating savings groups are member-led and member-owned. Every contribution stays within the circle. When it's your turn, the full pool is yours. Simple records, full transparency, and a sisterhood that holds you accountable.",
      primaryText: "Member Portal",
      primaryLink: "/auth",
      secondaryText: "Contact Us",
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

  // Scroll to top visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
      title: "Personal Foundation",
      description:
        "Before a woman can build a business, she needs to know she can. We start with skills training, one-on-one mentorship, and a circle of women who understand her circumstances. This is where confidence and capability begin.",
      bullets: ["Vocational skills that match local market demand", "Personal mentorship from experienced members", "Wellness check-ins and peer support"],
    },
    {
      step: "02",
      title: "Collective Savings",
      description:
        "Women organize into small savings circles within their communities. Each member contributes regularly, records are kept transparently, and the pooled funds rotate among members on an agreed schedule. There is never any interest charged — only mutual trust and accountability.",
      bullets: ["Transparent group savings ledgers", "Rotating payouts on agreed schedules", "Peer accountability and support"],
    },
    {
      step: "03",
      title: "Enterprise Launch",
      description:
        "With skills, savings, and a support network in place, women are ready to launch. We provide guidance on branding, packaging, bookkeeping, and market access — particularly within Ibadan and surrounding areas where we have established trade relationships.",
      bullets: ["Branding and packaging support", "Local market connections in Ibadan", "Simple bookkeeping and business management"],
    },
  ];

  const services = [
    { title: "Skills Development", desc: "Hands-on workshops in soap making, textile craft, and agro-processing. You'll create actual products during training — products you can sell." },
    { title: "Seed Funding Access", desc: "Small grants and rotating savings pools that put capital directly into the hands of women ready to launch or expand their enterprises." },
    { title: "Financial Literacy", desc: "Practical training in record keeping, profit tracking, pricing, and staying out of debt. Taught in clear, simple terms by women who've done it themselves." },
    { title: "Community Building", desc: "Safe, regular gatherings where members share business challenges, childcare arrangements, market tips, and encouragement." },
    { title: "Mentorship", desc: "Every new member is paired with an experienced cooperative leader who provides guidance through the first year of business ownership and beyond." },
    { title: "Enterprise Support", desc: "Assistance with trade permits, storage solutions, and direct introductions to supply chains and buyers in Ibadan and across Oyo State." },
  ];

  return (
    <div className="overflow-hidden bg-brand-light" id="home-page-container">
      
      {/* Hero Section */}
      <section 
        className="relative bg-[#120A14] min-h-[580px] md:min-h-[660px] lg:min-h-[720px] flex items-center overflow-hidden" 
        id="hero-section"
        onMouseEnter={() => setIsAutoplayPaused(true)}
        onMouseLeave={() => setIsAutoplayPaused(false)}
      >
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9 }}
              className="absolute inset-0 w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${carouselSlides[currentSlide].image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#120A14]/95 via-[#120A14]/85 to-transparent" />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-20 text-white">
          <div className="max-w-2xl space-y-6 md:space-y-8">
            
            <div className="min-h-[140px] md:min-h-[180px] lg:min-h-[220px]">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={currentSlide}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.6 }}
                  className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]"
                  id="carousel-slide-title"
                >
                  {carouselSlides[currentSlide].title}
                </motion.h1>
              </AnimatePresence>
            </div>
            
            <div className="min-h-[80px] md:min-h-[100px]">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentSlide}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.9 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-sm md:text-base text-gray-200 leading-relaxed"
                >
                  {carouselSlides[currentSlide].subtitle}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                to={carouselSlides[currentSlide].primaryLink}
                className="px-8 py-4 bg-brand-purple text-white text-center text-sm font-semibold hover:bg-white hover:text-brand-dark transition-all duration-300"
                id="carousel-primary-cta"
              >
                {carouselSlides[currentSlide].primaryText}
              </Link>
              <Link
                to={carouselSlides[currentSlide].secondaryLink}
                className="px-8 py-4 bg-transparent text-white border border-white/30 text-center text-sm font-semibold hover:border-[#CC9838] hover:text-[#CC9838] transition-all duration-300"
                id="carousel-secondary-cta"
              >
                {carouselSlides[currentSlide].secondaryText}
              </Link>
            </div>

            <div className="flex items-center justify-between pt-12 border-t border-white/10 text-xs text-white/50">
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

        <button
          onClick={handlePrevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/40 hover:bg-[#CC9838] transition-all duration-300 border border-white/10 text-white cursor-pointer"
          aria-label="Previous slide"
          id="prev-slide-btn"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={handleNextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/40 hover:bg-[#CC9838] transition-all duration-300 border border-white/10 text-white cursor-pointer"
          aria-label="Next slide"
          id="next-slide-btn"
        >
          <ChevronRight size={20} />
        </button>
      </section>

      {/* Mission Statement */}
      <section className="bg-brand-light/30 border-y border-brand-purple/10" id="mission-strip">
        <div className="max-w-7xl mx-auto py-16 px-6 text-center">
          <span className="block text-xs uppercase tracking-widest text-[#CC9838] mb-3 font-semibold">
            The Power Within Women Empowerment Foundation
          </span>
          <h2 className="text-3xl sm:text-5xl italic font-light text-brand-dark leading-tight max-w-3xl mx-auto">
            Helping women in Oyo State move from survival to stability to success — on their own terms.
          </h2>
        </div>
      </section>

      
      {/* Three Pathways Section */}
      <section className="py-16 px-6 bg-gray-50" id="three-pathways-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-brand-purple mb-2">Empowering Women To Rise, Thrive, And Prosper.</p>
            <h2 className="text-4xl md:text-5xl font-bold text-brand-dark">Three Pathways. One Mission.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {/* Human Empowerment */}
            <div className="bg-white p-8 border-l-4 border-brand-purple hover:bg-brand-purple hover:text-white transition-all duration-300 group cursor-pointer">
              <h3 className="text-lg font-bold text-brand-dark group-hover:text-white mb-4 transition-colors duration-300">HUMAN EMPOWERMENT</h3>
              <p className="text-gray-700 group-hover:text-white/90 text-sm leading-relaxed transition-colors duration-300">
                Many women carry incredible potential but lack the knowledge, support, opportunities, or guidance needed to thrive.
              </p>
            </div>

            {/* Cooperative Empowerment */}
            <div className="bg-white p-8 border-l-4 border-brand-purple hover:bg-brand-purple hover:text-white transition-all duration-300 group cursor-pointer">
              <h3 className="text-lg font-bold text-brand-dark group-hover:text-white mb-4 transition-colors duration-300">COOPERATIVE EMPOWERMENT</h3>
              <p className="text-gray-700 group-hover:text-white/90 text-sm leading-relaxed transition-colors duration-300">
                Our Cooperative Society empowers women to grow wealth together through structured savings, responsible lending, financial education, and collective support.
              </p>
            </div>

            {/* Business Development */}
            <div className="bg-white p-8 border-l-4 border-brand-purple hover:bg-brand-purple hover:text-white transition-all duration-300 group cursor-pointer">
              <h3 className="text-lg font-bold text-brand-dark group-hover:text-white mb-4 transition-colors duration-300">BUSINESS DEVELOPMENT</h3>
              <p className="text-gray-700 group-hover:text-white/90 text-sm leading-relaxed transition-colors duration-300">
                We help women transform skills, talents, and passions into sustainable businesses through entrepreneurship training, business mentoring, networking opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 px-6 bg-gray-50" id="what-we-do-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">What We Do</h2>
            <p className="text-base text-black max-w-2xl mx-auto leading-relaxed">
              Every woman carries untapped potential. Through empowerment, financial inclusion, and enterprise development, we help women unlock that potential and create lasting impact.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-1 max-w-5xl mx-auto bg-gray-200 p-1 rounded-lg">
            {services.map((svc, i) => (
              <div key={i} className="bg-white p-8 text-center hover:bg-brand-purple hover:text-white transition-all duration-300 group cursor-pointer">
                <div className="flex justify-center mb-4">
                  <span className="text-3xl font-bold text-brand-purple group-hover:text-white transition-colors duration-300">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-brand-dark group-hover:text-white mb-3 transition-colors duration-300">{svc.title}</h3>
                <p className="text-gray-700 group-hover:text-white/90 text-sm leading-relaxed transition-colors duration-300">
                  {svc.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Raising Women of Purpose Section */}
      <section className="py-20 px-6 bg-white" id="purpose-section">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-brand-dark mb-6 leading-tight">
            Raising Women of Purpose, Prosperity, and Influence.
          </h2>
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="h-px w-12 bg-brand-purple"></span>
            <span className="text-lg md:text-xl font-semibold text-brand-purple">Over 3 Pillars. One Mission.</span>
            <span className="h-px w-12 bg-brand-purple"></span>
          </div>
          <p className="text-base md:text-lg text-black max-w-2xl mx-auto leading-relaxed">
            Whether you are looking to grow a business, access mentorship, build financial stability, or create meaningful impact in your community, PWWEFOUNDATION provides the support and platform to help you succeed.
          </p>
        </div>
      </section>

      {/* Featured Image Section */}
      <section className="py-19 px-6 bg-gray-50" id="featured-image-section">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="relative w-full" style={{ paddingBottom: "66.6%" }}>
              <img
                src={homee}
                alt="PWWE Foundation women empowerment initiative"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-3 bg-brand-purple text-white rounded-full shadow-lg hover:bg-brand-dark transition-all duration-300 cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}