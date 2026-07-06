import React, { useState } from "react";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";
// import contactPoster from "../../assets/contact-poster.png"; // ← Replace with your actual poster image

import contactPoster from "../../assets/contact.png";

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    interest: "",
    message: ""
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ fullName: "", email: "", phone: "", interest: "", message: "" });
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Black Header */}
      <div className="bg-black py-24 sm:py-32 md:py-36 lg:py-40 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">Contact</h1>
        </div>
      </div>

      {/* Contact Info Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12 grid md:grid-cols-3 gap-6 sm:gap-8">
        {/* Address */}
        <div className="flex gap-3 sm:gap-4 md:gap-5">
          <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-[#96158F] rounded-full flex items-center justify-center flex-shrink-0">
            <MapPin className="text-white" size={20} />
          </div>
          <div>
            <p className="font-semibold text-sm sm:text-base">Head office address:</p>
            <p className="text-gray-600 text-xs sm:text-sm mt-1">
              2nd Floor, ACNE Building,<br />
              Jericho, Ibadan, Oyo State.
            </p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex gap-3 sm:gap-4 md:gap-5">
          <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-[#96158F] rounded-full flex items-center justify-center flex-shrink-0">
            <Phone className="text-white" size={20} />
          </div>
          <div>
            <p className="font-semibold text-sm sm:text-base">Call for help:</p>
            <a href="tel:+2349031463004" className="text-gray-600 text-xs sm:text-sm mt-1 hover:text-[#96158F] block">
              +234 903 146 3004
            </a>
          </div>
        </div>

        {/* Email */}
        <div className="flex gap-3 sm:gap-4 md:gap-5">
          <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-[#96158F] rounded-full flex items-center justify-center flex-shrink-0">
            <Mail className="text-white" size={20} />
          </div>
          <div>
            <p className="font-semibold text-sm sm:text-base">Mail for information:</p>
            <p className="text-gray-600 text-xs sm:text-sm mt-1">
              info@pwwefoundation.com<br />
              contact@pwwefoundation.com
            </p>
          </div>
        </div>
      </div>

      {/* Main Content - Poster + Form */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16 md:pb-20">
        <div className="grid lg:grid-cols-2 gap-0 bg-[#F8F1F5] rounded-2xl sm:rounded-3xl overflow-hidden">
          
          {/* Left Side - Promotional Poster */}
          <div className="relative min-h-[300px] sm:min-h-[400px] lg:min-h-full">
            <img
              src={contactPoster}
              alt="Nigerian Women You Are The Solution"
              className="w-full h-full object-cover absolute inset-0"
            />
          </div>

          {/* Right Side - Form */}
          <div className="p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 flex flex-col justify-center">
            <div className="mb-6 sm:mb-8 md:mb-10">
              <div className="h-1 w-8 sm:w-10 md:w-12 bg-[#96158F] mb-3 sm:mb-4"></div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
                One Conversation Can<br />Change Everything...
              </h2>
              <p className="mt-3 sm:mt-4 text-gray-600 text-sm sm:text-base">
                Have a question, enquiry, partnership proposal, or idea? Fill out the form below and a member of our team will get back to you as soon as possible.
              </p>
            </div>

            {isSubmitted ? (
              <div className="bg-green-50 border border-green-200 p-6 sm:p-8 rounded-2xl text-center">
                <div className="text-green-600 text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4">✓</div>
                <h3 className="text-xl sm:text-2xl font-semibold">Thank You!</h3>
                <p className="mt-2 sm:mt-3 text-gray-600 text-sm sm:text-base">Your request has been received. We'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name *"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl border border-gray-200 focus:border-[#96158F] focus:outline-none text-sm sm:text-base"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl border border-gray-200 focus:border-[#96158F] focus:outline-none text-sm sm:text-base"
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number *"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl border border-gray-200 focus:border-[#96158F] focus:outline-none text-sm sm:text-base"
                />

                <select
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl border border-gray-200 focus:border-[#96158F] focus:outline-none bg-white text-sm sm:text-base"
                >
                  <option value="">I am interested in...</option>
                  <option value="empowerment">Empowerment Programs</option>
                  <option value="cooperative">Joining Cooperative</option>
                  <option value="business">Business Support</option>
                  <option value="partnership">Partnership</option>
                  <option value="other">Other</option>
                </select>

                <textarea
                  name="message"
                  placeholder="Tell us briefly how we can help you..."
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl border border-gray-200 focus:border-[#96158F] focus:outline-none resize-none text-sm sm:text-base"
                />

                <button
                  type="submit"
                  className="w-full bg-[#96158F] hover:bg-[#7D1DC9] transition-colors text-white font-semibold py-3 sm:py-4 md:py-5 rounded-xl sm:rounded-2xl text-base sm:text-lg"
                >
                  Send Your Request
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}