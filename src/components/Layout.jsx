import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { X, Check, CheckCircle2, Users, Building, ShieldCheck, HeartHandshake } from "lucide-react";

export default function Layout() {
  const navigate = useNavigate();
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [signUpSubmitted, setSignUpSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    category: "Cooperative Empowerment",
    experience: "beginner",
    agreeToTerms: false,
    message: ""
  });

  const location = useLocation();

  // Scroll to top on route change for smooth seamless transition
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  const handleOpenSignUp = () => {
    setIsSignUpOpen(true);
    setSignUpSubmitted(false);
  };

  const handleCloseSignUp = () => {
    setIsSignUpOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = e.target.checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API registration call
    setSignUpSubmitted(true);
    // Reset form
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      location: "",
      category: "Cooperative Empowerment",
      experience: "beginner",
      agreeToTerms: false,
      message: ""
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-hidden font-body">
      
      {/* Shared Navbar */}
      <Navbar onOpenSignUp={handleOpenSignUp} />

      {/* Main Page Area -> Wrapped with subtle transition wrapper */}
      <main className="flex-grow">
        <div className="animate-fade-in">
          <Outlet context={{ handleOpenSignUp }} />
        </div>
      </main>

      {/* Shared Footer */}
      <Footer />

      {/* Elegant Cooperative Sign Up Modal */}
      {isSignUpOpen && (
        <div id="signup-modal-backdrop" className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div 
            id="signup-modal-container"
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-brand-100 relative"
          >
            {/* Close Button */}
            <button
              onClick={handleCloseSignUp}
              className="absolute right-5 top-5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors focus:outline-none"
              aria-label="Close registration portal"
            >
              <X className="h-6 w-6" />
            </button>

            {!signUpSubmitted ? (
              <div className="p-6 sm:p-10">
                <div className="mb-8">
                  <div className="flex items-center space-x-2 text-brand-700 mb-2">
                     <Users className="h-5 w-5" />
                    <span className="text-xs font-bold uppercase tracking-widest font-sans">PWWE Cooperative Network</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold font-display text-gray-900">
                    Apply for Membership
                  </h2>
                  <p className="text-gray-500 text-sm mt-2">
                    Join over 100+ active women taking control of their business future, financial security, and personal capacity.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="modal-fullName" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        id="modal-fullName"
                        required
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="e.g. Amina Johnson"
                        className="w-full bg-gray-55/40 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="modal-email" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        id="modal-email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="yourname@domain.com"
                        className="w-full bg-gray-55/40 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="modal-phone" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        id="modal-phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="e.g. (+234) 803 000 0000"
                        className="w-full bg-gray-55/40 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="modal-location" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Residential Location</label>
                      <input
                        type="text"
                        name="location"
                        id="modal-location"
                        required
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="e.g. Ibadan, Oyo State"
                        className="w-full bg-gray-55/40 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="modal-category" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Pillar of Interest</label>
                      <select
                        name="category"
                        id="modal-category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full bg-gray-55/40 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                      >
                        <option value="Human Empowerment">Human Empowerment & Skills</option>
                        <option value="Cooperative Empowerment">Cooperative Savings & Loans</option>
                        <option value="Business Development">Business & Enterprise Support</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="modal-experience" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Business Stage</label>
                      <select
                        name="experience"
                        id="modal-experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        className="w-full bg-gray-55/40 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                      >
                        <option value="aspiring">Aspiring Entrepreneur (Idea Only)</option>
                        <option value="beginner">Early-Stage (Less than 1 Year)</option>
                        <option value="established">Established Entity (1+ Years)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="modal-message" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Tell us about your objectives</label>
                    <textarea
                      name="message"
                      id="modal-message"
                      rows={3}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Briefly describe what you hope to achieve or contribute by joining our cooperative..."
                      className="w-full bg-gray-55/40 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                    ></textarea>
                  </div>

                  <div className="flex items-start space-x-3 pt-2">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      id="modal-agreeToTerms"
                      required
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      className="mt-1 h-4.5 w-4.5 rounded border-gray-300 text-brand-600 focus:ring-brand-500 cursor-pointer"
                    />
                    <label htmlFor="modal-agreeToTerms" className="text-xs text-gray-500 leading-relaxed cursor-pointer">
                      I agree to the PWWE Foundation terms of cooperative support, including participation in saving routines, peer mentorship groups, and empowerment reviews.
                    </label>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                    <button
                      type="submit"
                      id="modal-submit-btn"
                      className="flex-1 bg-brand-700 hover:bg-brand-800 text-white font-bold py-3.5 px-6 rounded-xl shadow-md hover:shadow-lg transition-all focus:outline-none text-sm text-center"
                    >
                      Acknowledge & Join Cooperative
                    </button>
                    <button
                      type="button"
                      onClick={handleCloseSignUp}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3.5 px-6 rounded-xl transition-all text-sm text-center"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="pt-4 text-center border-t border-gray-100 mt-5">
                    <p className="text-xs text-gray-500">
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={() => {
                          handleCloseSignUp();
                          navigate("/login");
                        }}
                        className="text-brand-700 hover:text-brand-800 font-bold hover:underline bg-transparent border-none outline-none cursor-pointer"
                      >
                        Log in to your Portal
                      </button>
                    </p>
                  </div>
                </form>
              </div>
            ) : (
              <div className="p-10 text-center animate-fade-in flex flex-col items-center">
                <div className="h-16 w-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mb-6 border border-emerald-100 shadow-sm">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h2 className="text-3xl font-bold font-display text-gray-900 mb-3">Application Received!</h2>
                <p className="text-gray-600 text-sm max-w-md mx-auto leading-relaxed mb-8">
                  Thank you for applying to the <span className="text-brand-700 font-semibold">PWWE Cooperative</span>. Your intake request has been stored. A representative will contact you via email and phone within the next 48 hours with onboarding details.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-lg mb-8 text-left">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-gray-100 flex flex-col items-center text-center">
                    <ShieldCheck className="h-6 w-6 text-brand-700 mb-2" />
                    <span className="text-xs font-bold text-gray-800 block">Step 1</span>
                    <span className="text-[11px] text-gray-500 leading-tight mt-1">Profile Review & Interest Match</span>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-gray-100 flex flex-col items-center text-center">
                    <HeartHandshake className="h-6 w-6 text-brand-700 mb-2" />
                    <span className="text-xs font-bold text-gray-800 block">Step 2</span>
                    <span className="text-[11px] text-gray-500 leading-tight mt-1">Onboarding Call & Peer Assignment</span>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-gray-100 flex flex-col items-center text-center">
                    <Building className="h-6 w-6 text-brand-700 mb-2" />
                    <span className="text-xs font-bold text-gray-800 block">Step 3</span>
                    <span className="text-[11px] text-gray-500 leading-tight mt-1">Access to Save & Empower Pools</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCloseSignUp}
                  className="bg-brand-700 hover:bg-brand-800 text-white font-semibold py-3 px-8 rounded-full shadow-sm hover:shadow-md transition-all text-sm"
                >
                  Return to Exploration
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
