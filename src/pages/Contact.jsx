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
      <div className="bg-black py-40 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold">Contact</h1>
        </div>
      </div>

      {/* Contact Info Bar */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
        {/* Address */}
        <div className="flex gap-5">
          <div className="w-12 h-12 bg-[#96158F] rounded-full flex items-center justify-center flex-shrink-0">
            <MapPin className="text-white" size={24} />
          </div>
          <div>
            <p className="font-semibold">Head office address:</p>
            <p className="text-gray-600 text-sm mt-1">
              2nd Floor, ACNE Building,<br />
              Jericho, Ibadan, Oyo State.
            </p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex gap-5">
          <div className="w-12 h-12 bg-[#96158F] rounded-full flex items-center justify-center flex-shrink-0">
            <Phone className="text-white" size={24} />
          </div>
          <div>
            <p className="font-semibold">Call for help:</p>
            <a href="tel:+2349031463004" className="text-gray-600 text-sm mt-1 hover:text-[#96158F]">
              +234 903 146 3004
            </a>
          </div>
        </div>

        {/* Email */}
        <div className="flex gap-5">
          <div className="w-12 h-12 bg-[#96158F] rounded-full flex items-center justify-center flex-shrink-0">
            <Mail className="text-white" size={24} />
          </div>
          <div>
            <p className="font-semibold">Mail for information:</p>
            <p className="text-gray-600 text-sm mt-1">
              info@pwwefoundation.com<br />
              contact@pwwefoundation.com
            </p>
          </div>
        </div>
      </div>

      {/* Main Content - Poster + Form */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 bg-[#F8F1F5] rounded-3xl overflow-hidden">
          
          {/* Left Side - Promotional Poster */}
          <div className="relative">
            <img
              src={contactPoster}
              alt="Nigerian Women You Are The Solution"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Side - Form */}
          <div className="p-10 lg:p-16 flex flex-col justify-center">
            <div className="mb-10">
              <div className="h-1 w-12 bg-[#96158F] mb-4"></div>
              <h2 className="text-4xl font-bold leading-tight">
                One Conversation Can<br />Change Everything...
              </h2>
              <p className="mt-4 text-gray-600">
                Have a question, enquiry, partnership proposal, or idea? Fill out the form below and a member of our team will get back to you as soon as possible.
              </p>
            </div>

            {isSubmitted ? (
              <div className="bg-green-50 border border-green-200 p-8 rounded-2xl text-center">
                <div className="text-green-600 text-5xl mb-4">✓</div>
                <h3 className="text-2xl font-semibold">Thank You!</h3>
                <p className="mt-3 text-gray-600">Your request has been received. We'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name *"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:border-[#96158F] focus:outline-none"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:border-[#96158F] focus:outline-none"
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number *"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:border-[#96158F] focus:outline-none"
                />

                <select
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                  className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:border-[#96158F] focus:outline-none bg-white"
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
                  className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:border-[#96158F] focus:outline-none resize-none"
                />

                <button
                  type="submit"
                  className="w-full bg-[#96158F]  transition-colors text-white font-semibold py-5 rounded-2xl text-lg"
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