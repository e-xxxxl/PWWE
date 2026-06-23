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

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-12">
          <div className="max-w-xl">
            <div className="mb-8">
              <div className="flex gap-5 mb-4">
                <div className="w-0 h-0 border-t-[14px] border-b-[14px] border-l-[24px] border-t-transparent border-b-transparent border-l-[#62C11A]"></div>
                <div className="w-0 h-0 border-t-[14px] border-b-[14px] border-l-[24px] border-t-transparent border-b-transparent border-l-[#62C11A]"></div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-0 h-0 border-t-[8px] border-b-[8px] border-l-[14px] border-t-transparent border-b-transparent border-l-[#62C11A]"></div>
                <div className="w-1 h-1 bg-[#ff00ff] rounded-full"></div>
              </div>
            </div>

            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-16">
              Economic Empowerment
              <br />
              Through Women
              <br />
              Entrepreneurship
            </h1>

            <p className="text-white text-lg md:text-xl font-semibold mb-16">
              Empowering Women. Transforming Communities
            </p>

            <button className="bg-[#7D1DC9] hover:bg-[#96158F] transition-all duration-300 text-white px-10 py-5 rounded-full font-semibold flex items-center gap-3">
              Join The Cooperative
              <FaChevronRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* Three Pathways Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-purple-600 font-medium text-lg tracking-wide">
              Empowering Women To Rise, Thrive, And Prosper.
            </p>
            <h2 className="text-5xl font-bold mt-3">
              Three Pathways. One Mission.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-xl mb-6 tracking-wide">HUMAN EMPOWERMENT</h3>
              <p className="text-gray-600 leading-relaxed">
                Many women carry incredible potential but lack the knowledge, support,
                opportunities, or guidance needed to thrive.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-xl mb-6 tracking-wide">COOPERATIVE EMPOWERMENT</h3>
              <p className="text-gray-600 leading-relaxed">
                Our Cooperative Society empowers women to grow wealth together through
                structured savings, responsible lending, financial education, and collective
                support.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-xl mb-6 tracking-wide">BUSINESS DEVELOPMENT</h3>
              <p className="text-gray-600 leading-relaxed">
                We help women transform skills, talents, and passions into sustainable businesses
                through entrepreneurship training, business mentoring, networking opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Centered Image Section */}
      <section className="py-16 bg-white flex justify-center">
        <div className="max-w-[1024px] px-6">
          <img
            src={finalImage}
            alt="Women Empowerment Final Visual"
            className="mx-auto rounded-2xl shadow-xl"
            style={{ width: "100%", maxWidth: "1024px", height: "auto" }}
          />
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">What We Do</h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Every woman carries untapped potential. Through empowerment, financial inclusion, 
              and enterprise development, we help women unlock that potential and create lasting impact.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: FaBullseye, title: "Skills Development", desc: "Training women in relevant vocational, entrepreneurial, and digital skills." },
              { icon: FaChartBar, title: "Economic Empowerment", desc: "Providing women with practical tools, financial education, and income-generating opportunities." },
              { icon: FaPuzzlePiece, title: "Financial Literacy", desc: "Teaching budgeting, savings, cooperative models, and financial planning." },
              { icon: FaUsers, title: "Community Building", desc: "Creating supportive networks where women learn, grow, and succeed together." },
              { icon: FaHandsHelping, title: "Mentorship & Accountability", desc: "Providing guidance, encouragement, and support for long-term success." },
              { icon: FaLightbulb, title: "Enterprise Support", desc: "Helping women turn talents and ideas into sustainable businesses." }
            ].map((item, i) => (
              <div key={i} className="group bg-white rounded-3xl p-8 border border-gray-100 hover:bg-[#7D1DC9] transition-all duration-500 hover:shadow-xl flex flex-col">
                <div className="mb-6 text-4xl text-[#7D1DC9] group-hover:text-white transition-colors">
                  <item.icon />
                </div>
                <h3 className="font-bold text-xl mb-4 text-gray-900 group-hover:text-white transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 group-hover:text-purple-100 transition-colors">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-[#0F0F0F] py-20 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl font-bold mb-3">CONTACT US :</h2>
            <p className="text-lg mb-12">
              Together, we can empower more women and transform more communities
            </p>

            <div className="space-y-10">
              <div className="flex gap-5">
                <div className="w-11 h-11 bg-[#96158F] rounded flex items-center justify-center flex-shrink-0 text-xl">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <p className="font-semibold uppercase tracking-wider mb-1">OUR HEAD OFFICE ADDRESS:</p>
                  <p>2nd Floor, ANCE Building, Jericho, Ibadan, Oyo State</p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="w-11 h-11 bg-[#96158F] rounded flex items-center justify-center flex-shrink-0 text-xl">
                  <FaPhone />
                </div>
                <div>
                  <p className="font-semibold uppercase tracking-wider mb-1">CALL FOR HELP:</p>
                  <p>+234 903 146 3004</p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="w-11 h-11 bg-[#96158F] rounded flex items-center justify-center flex-shrink-0 text-xl">
                  <FaEnvelope />
                </div>
                <div>
                  <p className="font-semibold uppercase tracking-wider mb-1">MAIL US FOR MORE INFORMATION:</p>
                  <p>contact@pwwefoundation.com</p>
                  <p>support@pwwefoundation.com</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="text-lg mb-8">
              Whether you are seeking empowerment, financial growth, business support, or partnership opportunities, our team is ready to help.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <input type="text" name="fullName" placeholder="Full Name *" required value={formData.fullName} onChange={handleChange}
                className="w-full bg-[#1F1F1F] border border-gray-700 rounded-lg px-6 py-4 focus:outline-none focus:border-[#7D1DC9]" />
              
              <input type="email" name="email" placeholder="Email Address *" required value={formData.email} onChange={handleChange}
                className="w-full bg-[#1F1F1F] border border-gray-700 rounded-lg px-6 py-4 focus:outline-none focus:border-[#7D1DC9]" />
              
              <input type="tel" name="phone" placeholder="Phone Number *" required value={formData.phone} onChange={handleChange}
                className="w-full bg-[#1F1F1F] border border-gray-700 rounded-lg px-6 py-4 focus:outline-none focus:border-[#7D1DC9]" />

              <select name="interest" value={formData.interest} onChange={handleChange}
                className="w-full bg-[#1F1F1F] border border-gray-700 rounded-lg px-6 py-4 focus:outline-none focus:border-[#7D1DC9]">
                <option value="">I am interested in...</option>
                <option value="empowerment">Empowerment</option>
                <option value="financial">Financial Growth</option>
                <option value="business">Business Support</option>
                <option value="partnership">Partnership Opportunities</option>
              </select>

              <textarea name="message" placeholder="Tell us briefly how we can help you..." rows={5} value={formData.message} onChange={handleChange}
                className="w-full bg-[#1F1F1F] border border-gray-700 rounded-lg px-6 py-4 focus:outline-none focus:border-[#7D1DC9]" />

              <button type="submit" className="w-full bg-[#96158F]  transition-all duration-300 py-5 rounded-lg font-semibold text-lg">
                Send Your Request
              </button>
            </form>
          </div>
        </div>
      </section>
{/* Over 3 Pillars Section - smaller banners, roomier center text */}
<section className="py-20 bg-gray-100">
  <div className="max-w-7xl mx-auto px-6 lg:px-12">
    <div className="grid lg:grid-cols-12 gap-y-10 lg:gap-x-8 items-center">

      {/* Left Image - smaller, fixed-ish size like a banner ad */}
      <div className="lg:col-span-3 flex justify-center">
        <div className="relative rounded-2xl overflow-hidden shadow-lg w-full max-w-[280px] group">
          <img
            src={leftBanner}
            alt="Empowering Women"
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>

      {/* Center Content - wider column, normal/relaxed text sizing */}
      <div className="lg:col-span-6 text-center px-2">
        <p className="text-purple-600 font-semibold text-base tracking-wide mb-4">
          Raising Women of Purpose, Prosperity, and Influence.
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mb-5 leading-snug text-gray-900">
          Over 3 Pillars. One Mission.
        </h2>
        <p className="text-gray-600 text-base leading-relaxed max-w-xl mx-auto">
          Whether you are looking to grow a business, access mentorship, build financial
          stability, or create meaningful impact in your community, <span className="font-semibold text-gray-800">PWWEFOUNDATION</span> provides
          the support and platform to help you succeed.
        </p>
      </div>

      {/* Right Image - smaller, fixed-ish size like a banner ad */}
      <div className="lg:col-span-3 flex justify-center">
        <div className="relative rounded-2xl overflow-hidden shadow-lg w-full max-w-[280px] group">
          <img
            src={rightBanner}
            alt="Empowered Women"
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>

    </div>
  </div>
</section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-[#96158F] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 z-50"
          aria-label="Scroll to top"
        >
          <FaArrowUp size={24} />
        </button>
      )}
    </>
  );
};

export default Home;