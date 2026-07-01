import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";
import axios from "axios";

// Configure API
const API_BASE_URL = import.meta.env.VITE_API_URL || "https://pwwe-server-1.onrender.com/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

const Login = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear field error when user types
    if (fieldErrors[name]) {
      setFieldErrors({ ...fieldErrors, [name]: "" });
    }
    
    // Clear general error
    if (error) setError("");
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    
    if (!formData.password) {
      errors.password = "Password is required";
    }
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/auth/login", {
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
      });

      const { user, token } = response.data;
      
      // Store auth data
      if (rememberMe) {
        localStorage.setItem("pwwe_auth_token", token);
        localStorage.setItem("pwwe_active_user", JSON.stringify(user));
      } else {
        sessionStorage.setItem("pwwe_auth_token", token);
        sessionStorage.setItem("pwwe_active_user", JSON.stringify(user));
      }
      
      // Redirect to dashboard
      navigate("/dashboard");
      
    } catch (error) {
      setLoading(false);
      
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data.message;
        
        if (status === 401) {
          if (message.toLowerCase().includes("not verified")) {
            setError(
              <div className="flex flex-col gap-2">
                <span>Please verify your email before logging in.</span>
                <button
                  onClick={handleResendVerification}
                  className="text-[#96158F] hover:underline text-left font-medium"
                >
                  Resend verification email
                </button>
              </div>
            );
          } else if (message.toLowerCase().includes("deactivated")) {
            setError("Your account has been deactivated. Please contact support.");
          } else {
            setError("Invalid email or password. Please try again.");
          }
        } else {
          setError(message || "Login failed. Please try again.");
        }
      } else if (error.code === 'ERR_NETWORK') {
        setError("Unable to connect to server. Please check your internet connection.");
      } else if (error.code === 'ECONNABORTED') {
        setError("Request timed out. Please try again.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleResendVerification = async () => {
    try {
      setError("");
      setLoading(true);
      
      const response = await api.post("/auth/resend-verification", {
        email: formData.email.toLowerCase().trim()
      });
      
      setLoading(false);
      setError("");
      
      // Show success message temporarily
      const successDiv = document.createElement('div');
      successDiv.className = 'bg-green-50 text-green-600 p-4 rounded-2xl mb-6 text-center';
      successDiv.textContent = 'Verification email sent! Please check your inbox.';
      
      const form = document.querySelector('form');
      form.parentNode.insertBefore(successDiv, form);
      
      setTimeout(() => successDiv.remove(), 5000);
      
    } catch (error) {
      setLoading(false);
      setError("Failed to resend verification email. Please try again.");
    }
  };

  const getInputClassName = (fieldName) => {
    const baseClass = "w-full px-6 py-4 border rounded-2xl focus:outline-none transition-colors";
    if (fieldName === 'password') {
      return fieldErrors[fieldName] 
        ? `${baseClass} border-red-300 focus:border-red-500 bg-red-50 pr-12`
        : `${baseClass} border-gray-200 focus:border-[#96158F] pr-12`;
    }
    return fieldErrors[fieldName] 
      ? `${baseClass} border-red-300 focus:border-red-500 bg-red-50`
      : `${baseClass} border-gray-200 focus:border-[#96158F]`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-30 px-6">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-16 h-16 bg-[#96158F] rounded-full flex items-center justify-center">
              <Lock className="text-white" size={32} />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-600 mt-3">
            Sign in to continue your empowerment journey
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-10">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-2xl mb-6 flex items-start gap-3">
              <AlertCircle className="flex-shrink-0 mt-0.5" size={18} />
              <div className="text-sm">{error}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Mail size={18} />
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={getInputClassName("email") + " pl-12"}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>
              {fieldErrors.email && (
                <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock size={18} />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className={getInputClassName("password") + " pl-12"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="text-red-500 text-xs mt-1">{fieldErrors.password}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="accent-[#96158F] w-4 h-4" 
                />
                <span className="text-gray-600">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-[#96158F] hover:underline font-medium">
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#96158F] hover:bg-[#7D1DC9] transition-all duration-300 text-white font-semibold py-5 rounded-2xl flex items-center justify-center gap-3 text-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-[#96158F] font-semibold hover:underline">
                Create one here
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-8">
          © {new Date().getFullYear()} Power Within Women Empowerment Foundation
        </p>
      </div>
    </div>
  );
};

export default Login;