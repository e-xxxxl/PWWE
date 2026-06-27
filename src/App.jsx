import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import SignUp from "./components/SignUp.jsx";
import Login from "./components/Login.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("pwwe_auth_token") || sessionStorage.getItem("pwwe_auth_token");
  
  if (!token) {
    // Redirect to login if not authenticated
    window.location.href = "/login";
    return null;
  }
  
  return children;
};

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Public Routes with Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="verify-email" element={<VerifyEmail />} />
        </Route>
        
        {/* Protected Dashboard Route - Without Layout (has its own layout) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        
        {/* Catch all - redirect to home */}
        <Route path="*" element={
          <Layout>
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                <p className="text-gray-600 mb-8">Page not found</p>
                <a href="/" className="text-[#96158F] hover:underline font-semibold">
                  Go back home
                </a>
              </div>
            </div>
          </Layout>
        } />
      </Routes>
    </BrowserRouter>
  );
}