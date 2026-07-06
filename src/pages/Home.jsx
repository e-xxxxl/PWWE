import React, { useState, useEffect } from "react";
import { 
  FaChevronRight, 
  FaBullseye, 
  FaChartBar, 
  FaPuzzlePiece, 
  FaUsers, 
  FaHandsHelping, 
  FaLightbulb,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaArrowUp
} from "react-icons/fa";
import home from "../../assets/pwwehomee.png";
import finalImage from "../../assets/finalimage.png";

// Import the two new images
import leftBanner from "../../assets/left-banner.png";     // ← Update with your actual filename
import rightBanner from "../../assets/right-banner.png";   // ← Update with your actual filename

import FadeInSection from "../components/FadeInSection"; // ← adjust path if needed

const Home = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    interest: "",
    message: ""
  });

  const [showScrollTop, setShowScrollTop] = useState(false);

  // Scroll to top button visibility
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! Your request has been submitted. (Demo)");
  };

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center"
        style={{
          backgroundImage: `url(${home})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/35"></div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-12">
          <FadeInSection direction="up" className="max-w-xl">
            <div className="mb-4 sm:mb-8">
              <div className="flex gap-3 sm:gap-5 mb-2 sm:mb-4">
                <div className="w-0 h-0 border-t-[10px] sm:border-t-[14px] border-b-[10px] sm:border-b-[14px] border-l-[18px] sm:border-l-[24px] border-t-transparent border-b-transparent border-l-[#62C11A]"></div>
                <div className="w-0 h-0 border-t-[10px] sm:border-t-[14px] border-b-[10px] sm:border-b-[14px] border-l-[18px] sm:border-l-[24px] border-t-transparent border-b-transparent border-l-[#62C11A]"></div>
              </div>
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="w-0 h-0 border-t-[6px] sm:border-t-[8px] border-b-[6px] sm:border-b-[8px] border-l-[10px] sm:border-l-[14px] border-t-transparent border-b-transparent border-l-[#62C11A]"></div>
                <div className="w-1 h-1 bg-[#ff00ff] rounded-full"></div>
              </div>
            </div>

            <h1 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light leading-tight mb-8 sm:mb-12 md:mb-16">
              Economic Empowerment
              <br />
              Through Women
              <br />
              Entrepreneurship
            </h1>

            <p className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-semibold mb-8 sm:mb-12 md:mb-16">
              Empowering Women. Transforming Communities
            </p>

            <button className="bg-[#7D1DC9] hover:bg-[#96158F] transition-all duration-300 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-full font-semibold flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
              Join The Cooperative
              <FaChevronRight size={14} />
            </button>
          </FadeInSection>
        </div>
      </section>

      {/* Three Pathways Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <FadeInSection className="text-center mb-8 sm:mb-12 md:mb-16">
            <p className="text-purple-600 font-medium text-sm sm:text-base md:text-lg tracking-wide">
              Empowering Women To Rise, Thrive, And Prosper.
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-2 sm:mt-3">
              Three Pathways. One Mission.
            </h2>
          </FadeInSection>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
            <FadeInSection direction="up" delay={0} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 md:p-10 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-base sm:text-lg md:text-xl mb-4 sm:mb-6 tracking-wide">HUMAN EMPOWERMENT</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Many women carry incredible potential but lack the knowledge, support,
                opportunities, or guidance needed to thrive.
              </p>
            </FadeInSection>

            <FadeInSection direction="up" delay={150} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 md:p-10 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-base sm:text-lg md:text-xl mb-4 sm:mb-6 tracking-wide">COOPERATIVE EMPOWERMENT</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Our Cooperative Society empowers women to grow wealth together through
                structured savings, responsible lending, financial education, and collective
                support.
              </p>
            </FadeInSection>

            <FadeInSection direction="up" delay={300} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 md:p-10 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-base sm:text-lg md:text-xl mb-4 sm:mb-6 tracking-wide">BUSINESS DEVELOPMENT</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                We help women transform skills, talents, and passions into sustainable businesses
                through entrepreneurship training, business mentoring, networking opportunities.
              </p>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Centered Image Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-white flex justify-center">
        <FadeInSection className="max-w-[1024px] px-4 sm:px-6">
          <img
            src={finalImage}
            alt="Women Empowerment Final Visual"
            className="mx-auto rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl"
            style={{ width: "100%", maxWidth: "1024px", height: "auto" }}
          />
        </FadeInSection>
      </section>

      {/* What We Do Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <FadeInSection className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">What We Do</h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base md:text-lg">
              Every woman carries untapped potential. Through empowerment, financial inclusion, 
              and enterprise development, we help women unlock that potential and create lasting impact.
            </p>
          </FadeInSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[
              { icon: FaBullseye, title: "Skills Development", desc: "Training women in relevant vocational, entrepreneurial, and digital skills." },
              { icon: FaChartBar, title: "Economic Empowerment", desc: "Providing women with practical tools, financial education, and income-generating opportunities." },
              { icon: FaPuzzlePiece, title: "Financial Literacy", desc: "Teaching budgeting, savings, cooperative models, and financial planning." },
              { icon: FaUsers, title: "Community Building", desc: "Creating supportive networks where women learn, grow, and succeed together." },
              { icon: FaHandsHelping, title: "Mentorship & Accountability", desc: "Providing guidance, encouragement, and support for long-term success." },
              { icon: FaLightbulb, title: "Enterprise Support", desc: "Helping women turn talents and ideas into sustainable businesses." }
            ].map((item, i) => (
              <FadeInSection key={i} direction="up" delay={i * 100}>
                <div className="group bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-100 hover:bg-[#7D1DC9] transition-all duration-500 hover:shadow-xl flex flex-col h-full">
                  <div className="mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl text-[#7D1DC9] group-hover:text-white transition-colors">
                    <item.icon />
                  </div>
                  <h3 className="font-bold text-base sm:text-lg md:text-xl mb-3 sm:mb-4 text-gray-900 group-hover:text-white transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 group-hover:text-purple-100 transition-colors text-sm sm:text-base">
                    {item.desc}
                  </p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-[#0F0F0F] py-12 sm:py-16 md:py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16">
          <FadeInSection direction="left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3">CONTACT US :</h2>
            <p className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 md:mb-12">
              Together, we can empower more women and transform more communities
            </p>

            <div className="space-y-6 sm:space-y-8 md:space-y-10">
              <div className="flex gap-3 sm:gap-4 md:gap-5">
                <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 bg-[#96158F] rounded flex items-center justify-center flex-shrink-0 text-lg sm:text-xl">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <p className="font-semibold uppercase tracking-wider mb-1 text-xs sm:text-sm">OUR HEAD OFFICE ADDRESS:</p>
                  <p className="text-sm sm:text-base">2nd Floor, ANCE Building, Jericho, Ibadan, Oyo State</p>
                </div>
              </div>

              <div className="flex gap-3 sm:gap-4 md:gap-5">
                <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 bg-[#96158F] rounded flex items-center justify-center flex-shrink-0 text-lg sm:text-xl">
                  <FaPhone />
                </div>
                <div>
                  <p className="font-semibold uppercase tracking-wider mb-1 text-xs sm:text-sm">CALL FOR HELP:</p>
                  <p className="text-sm sm:text-base">+234 903 146 3004</p>
                </div>
              </div>

              <div className="flex gap-3 sm:gap-4 md:gap-5">
                <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 bg-[#96158F] rounded flex items-center justify-center flex-shrink-0 text-lg sm:text-xl">
                  <FaEnvelope />
                </div>
                <div>
                  <p className="font-semibold uppercase tracking-wider mb-1 text-xs sm:text-sm">MAIL US FOR MORE INFORMATION:</p>
                  <p className="text-sm sm:text-base">contact@pwwefoundation.com</p>
                  <p className="text-sm sm:text-base">support@pwwefoundation.com</p>
                </div>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection direction="right">
            <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6 md:mb-8">
              Whether you are seeking empowerment, financial growth, business support, or partnership opportunities, our team is ready to help.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-6">
              <input type="text" name="fullName" placeholder="Full Name *" required value={formData.fullName} onChange={handleChange}
                className="w-full bg-[#1F1F1F] border border-gray-700 rounded-lg px-4 sm:px-6 py-3 sm:py-4 focus:outline-none focus:border-[#7D1DC9] text-sm sm:text-base" />
              
              <input type="email" name="email" placeholder="Email Address *" required value={formData.email} onChange={handleChange}
                className="w-full bg-[#1F1F1F] border border-gray-700 rounded-lg px-4 sm:px-6 py-3 sm:py-4 focus:outline-none focus:border-[#7D1DC9] text-sm sm:text-base" />
              
              <input type="tel" name="phone" placeholder="Phone Number *" required value={formData.phone} onChange={handleChange}
                className="w-full bg-[#1F1F1F] border border-gray-700 rounded-lg px-4 sm:px-6 py-3 sm:py-4 focus:outline-none focus:border-[#7D1DC9] text-sm sm:text-base" />

              <select name="interest" value={formData.interest} onChange={handleChange}
                className="w-full bg-[#1F1F1F] border border-gray-700 rounded-lg px-4 sm:px-6 py-3 sm:py-4 focus:outline-none focus:border-[#7D1DC9] text-sm sm:text-base">
                <option value="">I am interested in...</option>
                <option value="empowerment">Empowerment</option>
                <option value="financial">Financial Growth</option>
                <option value="business">Business Support</option>
                <option value="partnership">Partnership Opportunities</option>
              </select>

              <textarea name="message" placeholder="Tell us briefly how we can help you..." rows={5} value={formData.message} onChange={handleChange}
                className="w-full bg-[#1F1F1F] border border-gray-700 rounded-lg px-4 sm:px-6 py-3 sm:py-4 focus:outline-none focus:border-[#7D1DC9] text-sm sm:text-base" />

              <button type="submit" className="w-full bg-[#96158F] hover:bg-[#7D1DC9] transition-all duration-300 py-3 sm:py-4 md:py-5 rounded-lg font-semibold text-sm sm:text-base md:text-lg">
                Send Your Request
              </button>
            </form>
          </FadeInSection>
        </div>
      </section>

      {/* Over 3 Pillars Section - smaller banners, roomier center text */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-y-6 sm:gap-y-8 lg:gap-y-10 lg:gap-x-8 items-center">

            {/* Left Image - smaller, fixed-ish size like a banner ad */}
            <FadeInSection direction="left" className="lg:col-span-3 flex justify-center">
              <div className="relative rounded-2xl overflow-hidden shadow-lg w-full max-w-[220px] sm:max-w-[240px] md:max-w-[260px] lg:max-w-[280px] group">
                <img
                  src={leftBanner}
                  alt="Empowering Women"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </FadeInSection>

            {/* Center Content - wider column, normal/relaxed text sizing */}
            <FadeInSection direction="up" delay={150} className="lg:col-span-6 text-center px-2">
              <p className="text-purple-600 font-semibold text-xs sm:text-sm md:text-base tracking-wide mb-2 sm:mb-3 md:mb-4">
                Raising Women of Purpose, Prosperity, and Influence.
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 md:mb-5 leading-snug text-gray-900">
                Over 3 Pillars. One Mission.
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
                Whether you are looking to grow a business, access mentorship, build financial
                stability, or create meaningful impact in your community, <span className="font-semibold text-gray-800">PWWEFOUNDATION</span> provides
                the support and platform to help you succeed.
              </p>
            </FadeInSection>

            {/* Right Image - smaller, fixed-ish size like a banner ad */}
            <FadeInSection direction="right" className="lg:col-span-3 flex justify-center">
              <div className="relative rounded-2xl overflow-hidden shadow-lg w-full max-w-[220px] sm:max-w-[240px] md:max-w-[260px] lg:max-w-[280px] group">
                <img
                  src={rightBanner}
                  alt="Empowered Women"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </FadeInSection>

          </div>
        </div>
      </section>

     {/* Scroll to Top Button */}
{showScrollTop && (
  <button
    onClick={scrollToTop}
    className="fixed bottom-6 sm:bottom-8 right-6 sm:right-8 bg-[#96158F] hover:bg-[#7D1DC9] text-white w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 z-50"
    aria-label="Scroll to top"
  >
    <FaArrowUp className="text-lg sm:text-xl md:text-2xl" />
  </button>
)}
    </>
  );
};

export default Home;