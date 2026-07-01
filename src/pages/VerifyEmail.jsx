// src/pages/VerifyEmail.jsx
import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  XCircle, 
  Loader2, 
  Mail, 
  ArrowRight,
  ShieldCheck,
  RefreshCw
} from "lucide-react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [status, setStatus] = useState("verifying"); // verifying, success, error
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [resending, setResending] = useState(false);
  const [resendMessage, setResendMessage] = useState("");

  useEffect(() => {
    if (token) {
      verifyEmail(token);
    } else {
      setStatus("error");
      setMessage("No verification token provided.");
    }
  }, [token]);

  const verifyEmail = async (token) => {
    try {
      const response = await api.post("/auth/verify-email", { token });
      setStatus("success");
      setMessage(response.data.message || "Email verified successfully!");
      
      // Auto-redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 5000);
      
    } catch (error) {
      setStatus("error");
      if (error.response) {
        setMessage(error.response.data.message || "Verification failed. The link may be invalid or expired.");
      } else {
        setMessage("Unable to verify email. Please check your internet connection.");
      }
    }
  };

  const handleResendVerification = async () => {
    if (!email.trim()) {
      setResendMessage("Please enter your email address.");
      return;
    }

    setResending(true);
    setResendMessage("");

    try {
      const response = await api.post("/auth/resend-verification", {
        email: email.toLowerCase().trim()
      });
      
      setResendMessage(response.data.message || "Verification email sent! Check your inbox.");
      setEmail("");
    } catch (error) {
      if (error.response) {
        setResendMessage(error.response.data.message || "Failed to resend verification.");
      } else {
        setResendMessage("Network error. Please try again.");
      }
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white flex items-center justify-center p-32">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full"
      >
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#96158F] to-[#6B21A8] rounded-2xl mb-6 shadow-lg">
            <ShieldCheck className="text-white" size={40} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Email Verification
          </h1>
          <p className="text-gray-600">
            PWWE Foundation - Secure Member Access
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">
          {status === "verifying" && (
            <div className="text-center py-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Loader2 size={64} className="text-[#96158F] mx-auto mb-6" />
              </motion.div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Verifying Your Email
              </h2>
              <p className="text-gray-500">
                Please wait while we verify your email address...
              </p>
            </div>
          )}

          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
              >
                <CheckCircle2 size={80} className="text-green-500 mx-auto mb-6" />
              </motion.div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Email Verified! ✅
              </h2>
              <p className="text-gray-600 mb-4">{message}</p>
              
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                <p className="text-green-800 text-sm">
                  Your account is now active. You can now access all PWWE Foundation member benefits.
                </p>
              </div>

              <p className="text-sm text-gray-500 mb-6">
                Redirecting to login page in 5 seconds...
              </p>

              <div className="flex gap-4 justify-center">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 bg-[#96158F] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#7D1DC9] transition-all"
                >
                  Sign In Now
                  <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>
          )}

          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-8"
            >
              <XCircle size={80} className="text-red-500 mx-auto mb-6" />
              
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Verification Failed
              </h2>
              <p className="text-gray-600 mb-6">{message}</p>

              <div className="border-t border-gray-200 pt-6 mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Resend Verification Email
                </h3>
                
                <div className="space-y-4">
                  <div className="relative">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:border-[#96158F] focus:outline-none transition-colors"
                    />
                  </div>

                  {resendMessage && (
                    <p className={`text-sm ${resendMessage.includes("sent") ? "text-green-600" : "text-red-500"}`}>
                      {resendMessage}
                    </p>
                  )}

                  <button
                    onClick={handleResendVerification}
                    disabled={resending}
                    className="w-full flex items-center justify-center gap-2 bg-[#96158F] text-white py-3.5 rounded-xl font-semibold hover:bg-[#7D1DC9] transition-all disabled:opacity-70"
                  >
                    {resending ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <RefreshCw size={18} />
                        Resend Verification Email
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Link
                  to="/login"
                  className="block w-full text-center bg-gray-100 text-gray-700 py-3.5 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                >
                  Back to Sign In
                </Link>
                <Link
                  to="/contact"
                  className="text-sm text-[#96158F] hover:underline"
                >
                  Need help? Contact Support
                </Link>
              </div>
            </motion.div>
          )}
        </div>

        <p className="text-center text-xs text-gray-500 mt-6">
          © {new Date().getFullYear()} The Power Within Women Empowerment Foundation
        </p>
      </motion.div>
    </div>
  );
};

export default VerifyEmail;