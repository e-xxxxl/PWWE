import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { HiMenuAlt3, HiX } from "react-icons/hi";

import logo from "../../assets/logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Sign Up", path: "/signup" },
  ];

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  return (
    <>
      {/* Fixed Header Container */}
      <div className="fixed top-0 left-0 w-full z-50">
        {/* Top Bar */}
        <div className="bg-black text-white text-sm hidden lg:block">
          <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
            <div className="flex items-center gap-5">
              <a href="#">
                <FaFacebookF className="hover:text-[#96158F] transition" />
              </a>
              <a href="#">
                <FaTwitter className="hover:text-[#96158F] transition" />
              </a>
              <a href="#">
                <FaLinkedinIn className="hover:text-[#96158F] transition" />
              </a>
              <a href="#">
                <FaInstagram className="hover:text-[#96158F] transition" />
              </a>
            </div>

            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-[#96158F]" />
                <span>contact@pwwefoundation.com</span>
              </div>

              <div className="flex items-center gap-2">
                <FaPhoneAlt className="text-[#96158F]" />
                <span>(+234) 903 146 3004</span>
              </div>

              <div className="flex items-center gap-2">
                <FaClock className="text-[#96158F]" />
                <span>Mon - Fri: 9:00 am - 05.00pm</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navbar */}
        <nav className="bg-black lg:bg-black/30 backdrop-blur-md border-b border-white/10 text-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-center h-24">
              {/* Logo */}

              <Link to="/ ">
              <div className="lg:bg-white lg:p-2">
                <img
                  src={logo}
                  alt="Logo"
                  className="h-14 w-auto object-contain"
                />
              </div>
</Link>
              {/* Desktop Links */}
              <div className="hidden lg:flex items-center gap-12 ml-auto">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `relative font-medium transition group py-3 ${
                        isActive
                          ? "text-white"
                          : "text-white/80 hover:text-white"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {link.name}

                        {isActive && (
                          <span className="absolute -bottom-2 left-0 w-full h-[3px] bg-[#96158F]" />
                        )}

                        <span className="absolute -bottom-2 left-0 w-0 h-[3px] bg-[#96158F] transition-all duration-300 group-hover:w-full" />
                      </>
                    )}
                  </NavLink>
                ))}
              </div>

              {/* Desktop Hamburger */}
              <button
                onClick={() => setMenuOpen(true)}
                className="hidden lg:flex flex-col gap-1.5 cursor-pointer ml-8"
              >
                <span className="w-8 h-[2px] bg-white"></span>
                <span className="w-8 h-[2px] bg-white"></span>
                <span className="w-8 h-[2px] bg-white"></span>
              </button>

              {/* Mobile Hamburger */}
              <button
                className="lg:hidden text-3xl"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <HiX /> : <HiMenuAlt3 />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-300 ${
              menuOpen ? "max-h-[500px]" : "max-h-0"
            }`}
          >
            <div className="bg-black px-6 py-5">
              <div className="flex flex-col gap-5">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      isActive
                        ? "text-[#96158F]"
                        : "text-white hover:text-[#96158F]"
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Overlay */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`hidden lg:block fixed inset-0 bg-black/60 z-[90] transition-all duration-500 ${
          menuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
      />

      {/* Desktop Sidebar */}
      <div
        className={`hidden lg:flex fixed top-0 right-0 h-screen
        w-full max-w-[380px]
        bg-white z-[100]
        flex-col shadow-2xl
        overflow-y-auto
        transition-transform duration-500 ease-in-out
        ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Close Button */}
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-6 right-6 text-3xl text-gray-700 hover:text-[#96158F]"
        >
          <HiX />
        </button>

        <div className="px-8 pt-16 pb-10">
          {/* Logo */}
          <img
            src={logo}
            alt="Logo"
            className="w-28 mb-10"
          />

          {/* Description */}
          <p className="text-gray-700 text-base leading-8 mb-12">
            Through human empowerment, cooperative development,
            and enterprise growth, we are raising resilient women
            who are equipped to thrive in every season of life.
          </p>

          {/* Address */}
          <div className="flex gap-4 mb-10">
            <FaMapMarkerAlt className="text-[#96158F] text-3xl mt-1 flex-shrink-0" />

            <div>
              <h3 className="font-semibold text-lg text-gray-800">
                2nd Floor, ACNE Building,
              </h3>

              <p className="text-gray-500">
                Dugbe, Ibadan, Oyo State.
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex gap-4 mb-10">
            <FaPhoneAlt className="text-[#96158F] text-3xl mt-1 flex-shrink-0" />

            <div>
              <h3 className="font-semibold text-lg text-gray-800 underline">
                Call Us: (+234) 703 127 5688
              </h3>

              <p className="text-gray-500">
                (+234) 905 616 1787
              </p>
            </div>
          </div>

          {/* Time */}
          <div className="flex gap-4">
            <FaClock className="text-[#96158F] text-3xl mt-1 flex-shrink-0" />

            <div>
              <h3 className="font-semibold text-lg text-gray-800">
                Monday - Friday
              </h3>

              <p className="text-gray-500">
                (8am - 5pm)
              </p>
            </div>
          </div>

          {/* Optional Navigation Links */}
          <div className="mt-14 border-t pt-8">
            <div className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-lg font-medium transition ${
                      isActive
                        ? "text-[#96158F]"
                        : "text-gray-700 hover:text-[#96158F]"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;