import React, { useState } from "react";
import { useOutletContext, useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, Users, Sparkles } from "lucide-react";
import navlogo from "../../assets/navlogo.png";
export default function Login() {
  const { handleOpenSignUp } = useOutletContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "Member", // Member, Officer, Partner
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginStatus, setLoginStatus] = useState({ type: "", message: "" }); // "success", "error", or ""

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setLoginStatus({ type: "", message: "" });

    // Prepare credentials payload strictly ready for backend consumption
    const payload = {
      username: formData.email.trim().toLowerCase(),
      password: formData.password,
      role: formData.role,
      rememberMe: formData.rememberMe,
      clientTimestamp: new Date().toISOString(),
    };

    console.log("[PWWE Backend Integration] Transmission Payload Ready:", payload);

    try {
      // Structure ready for REST backend communication (e.g., Express/FastAPI/Spring)
      // Users can easily swap the endpoint or configure environment variables in .env as needed.
      const API_URL = import.meta.env.VITE_API_BASE_URL || "/api/auth/login";
      
      // We simulate an structured async backend request here
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock success logic simulating real API response tokens
      if (formData.email.includes("error")) {
        throw new Error("Invalid username or password match inside cooperative schema.");
      }

      console.log("[PWWE Backend Integration] API Authentication Success. Token assigned.");
      setLoginStatus({
        type: "success",
        message: `Welcome back! Authentication successful as ${formData.role}. Redirecting to dashboard...`,
      });

      // Clear private states
      setFormData((prev) => ({ ...prev, password: "" }));

      // Redirect simulation
      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (err) {
      console.error("[PWWE Backend Integration] Authentication Failed:", err.message);
      setLoginStatus({
        type: "error",
        message: err.message || "Unable to establish connection with PWWE authentication server.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[85vh] bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Decorative background grid elements */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="loginGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#96158F" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#loginGrid)" />
        </svg>
      </div>

      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-brand-100 overflow-hidden relative z-10 animate-fade-in">
        
        {/* Upper colored accent bar */}
        <div className="h-2 bg-gradient-to-r from-brand-700 via-purple-600 to-indigo-600"></div>

        <div className="p-8 sm:p-10 text-left">
          
          {/* Logo & Heading */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-2.5 text-gray-900 group mb-4">
              <div className="h-16 w-16 sm:h-20 sm:w-20 flex items-center justify-center  group-hover:shadow-md group-hover:scale-105 transition-all duration-300">
                              <img src={navlogo} alt="PWWE LOGO" className="h-12 w-12 sm:h-16 sm:w-16 object-contain" />
                            </div>
              <span className="text-2xl font-bold font-display tracking-tight">
                PWWE <span className="text-brand-700">Portal</span>
              </span>
            </Link>
            <h2 className="text-xl font-bold font-display text-gray-900">
              Log in to your Account
            </h2>
            <p className="text-xs text-gray-500 mt-1.5 font-sans leading-relaxed">
              Enter your credentials to access your cooperative savings panel, business incubation resource files, and peer groups.
            </p>
          </div>

          {/* Status Display Alert */}
          {loginStatus.message && (
            <div
              className={`p-4 rounded-xl text-xs font-semibold leading-relaxed mb-6 border transition-all ${
                loginStatus.type === "success"
                  ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                  : "bg-rose-50 border-rose-200 text-rose-800"
              }`}
            >
              {loginStatus.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Role/Account Type selection tab */}
            <div>
              <span className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Portal Access Level</span>
              <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 rounded-xl">
                {["Member", "Officer", "Partner"].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, role: r }))}
                    className={`py-2 text-[11px] font-bold rounded-lg transition-all ${
                      formData.role === r
                        ? "bg-white text-brand-700 shadow-sm border border-brand-100"
                        : "text-gray-500 hover:text-gray-900 hover:bg-white/50"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="login-email" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                  <Mail className="h-4.5 w-4.5" />
                </span>
                <input
                  type="email"
                  name="email"
                  id="login-email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="name@domain.com"
                  className="w-full bg-slate-55/30 border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all placeholder-gray-400"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label htmlFor="login-password" className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Password</label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("Password retrieval link will be sent. Complete backend setup to activate."); }} className="text-[11px] font-bold text-brand-700 hover:underline">
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                  <Lock className="h-4.5 w-4.5" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="login-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full bg-slate-55/30 border border-gray-200 rounded-xl pl-10 pr-11 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all placeholder-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                </button>
              </div>
            </div>

            {/* Remember me checkbox */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center space-x-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="h-4.5 w-4.5 rounded border-gray-300 text-brand-600 focus:ring-brand-500 cursor-pointer"
                />
                <span className="text-xs text-gray-600 font-medium select-none">Remember my login</span>
              </label>
              
              <div className="flex items-center space-x-1 text-[10px] text-gray-400 font-medium">
                <ShieldCheck className="h-3.5 w-3.5 text-brand-500" />
                <span>Encrypted Connection</span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-700 hover:bg-brand-800 text-white font-bold py-3.5 px-6 rounded-xl shadow-md hover:shadow-lg transition-all text-sm uppercase tracking-wider flex items-center justify-center space-x-2 border-0 outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Portal</span>
                    <ArrowRight className="h-4.5 w-4.5" />
                  </>
                )}
              </button>
            </div>

          </form>

          {/* Footer Link to register */}
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-500">
              Not yet a member of the PWWE Cooperative?
            </p>
            <button
              onClick={() => {
                navigate("/"); // go to root
                setTimeout(() => {
                  handleOpenSignUp(); // trigger modal
                }, 300);
              }}
              className="mt-2 text-brand-700 hover:text-brand-800 font-bold text-xs inline-flex items-center space-x-1 hover:underline bg-transparent border-none outline-none cursor-pointer"
            >
              <span>Apply for Cooperative Membership</span>
              <Sparkles className="h-3 w-3 text-brand-600 animate-pulse" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
