import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-light text-brand-dark selection:bg-brand-purple-light selection:text-brand-purple-dark font-sans">
      <Navbar />
      <main className="flex-grow pt-24 lg:pt-10">
        {/* pt-24 for mobile, pt-32 for desktop to account for top bar height */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}