import React from "react";
import { Link } from "react-router-dom";
import { Download, ArrowRight } from "lucide-react";
import FadeInSection from "../components/FadeInSection"; // ← adjust path if needed

const About = () => {
  const brandPurple = "#96158F";

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <div className="bg-black text-white py-24 sm:py-32 md:py-36 lg:py-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <FadeInSection>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">About us</h1>
          </FadeInSection>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        {/* Who We Are + Vision */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16 md:mb-20">
          {/* Who We Are */}
          <FadeInSection direction="left" className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl">
            <div 
              className="p-6 sm:p-8 md:p-10 lg:p-12 h-full text-white"
              style={{
                background: `linear-gradient(to bottom right, ${brandPurple}, #E85D9E)`
              }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8">Who We Are</h2>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                The Power Within Women Empowerment Foundation (PWWEF) is a registered non-profit organisation dedicated to unlocking the economic, leadership, and personal development potential of women across Nigeria.
              </p>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed mt-4 sm:mt-5 md:mt-6">
                We believe every woman carries within her the power to transform her life, her family, and her community, she simply needs the right support, tools, and opportunities to do so.
              </p>
            </div>
          </FadeInSection>

          {/* Our Vision for Impact */}
          <FadeInSection direction="right">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-5 md:mb-6 flex items-center gap-2 sm:gap-3">
              Our Vision for Impact
              <div className="h-1 w-8 sm:w-10 md:w-12" style={{ backgroundColor: brandPurple }}></div>
            </h2>
            <p className="text-gray-700 text-sm sm:text-base md:text-[17px] leading-relaxed">
              Within a year of establishing each chapter, we aim to train 150–300 women, support the launch or growth of 50–120 businesses, achieve a 90% loan repayment rate, and help beneficiaries grow their incomes by 30–60%. These are not just numbers, they represent families fed, children educated, and communities strengthened.
            </p>
          </FadeInSection>
        </div>

        {/* Call to Action Banner */}
        <FadeInSection className="bg-black text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 mb-12 sm:mb-16 md:mb-20">
          <div className="text-center md:text-left">
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">Want to be part of PWWEF?</h3>
            <p className="text-gray-300 mt-1 sm:mt-2 text-sm sm:text-base">Fill the registration form to get started</p>
          </div>
          <Link
            to="/signup"
            className="bg-white text-black px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold flex items-center gap-2 sm:gap-3 hover:bg-gray-100 transition-colors whitespace-nowrap text-sm sm:text-base"
            style={{ color: "#000" }}
          >
            <Download size={18} className="sm:size-20" />
            Download the Form
          </Link>
        </FadeInSection>

        {/* What We Do + Our Approach */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 mb-12 sm:mb-16 md:mb-20">
          {/* What We Do */}
          <FadeInSection direction="left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8 flex items-center gap-2 sm:gap-3">
              What We Do
              <div className="h-1 w-8 sm:w-10 md:w-12" style={{ backgroundColor: brandPurple }}></div>
            </h2>
            <p className="text-gray-700 text-sm sm:text-base md:text-[17px] leading-relaxed mb-4 sm:mb-6 md:mb-8">
              We empower women through structured, community-rooted programs designed to create lasting change:
            </p>
            <ul className="space-y-3 sm:space-y-4 text-gray-700">
              <li className="flex gap-2 sm:gap-3">
                <ArrowRight size={18} className="sm:size-20 mt-1 flex-shrink-0" style={{ color: brandPurple }} />
                <span className="text-sm sm:text-base">Skills Acquisition & Vocational Training: practical skills in tailoring, catering, digital technology, agribusiness, beauty, and more</span>
              </li>
              <li className="flex gap-2 sm:gap-3">
                <ArrowRight size={18} className="sm:size-20 mt-1 flex-shrink-0" style={{ color: brandPurple }} />
                <span className="text-sm sm:text-base">Financial Literacy & Cooperative Development: teaching savings discipline, budgeting, and cooperative models</span>
              </li>
              <li className="flex gap-2 sm:gap-3">
                <ArrowRight size={18} className="sm:size-20 mt-1 flex-shrink-0" style={{ color: brandPurple }} />
                <span className="text-sm sm:text-base">Micro-Loan & Business Support: responsible access to capital through a group-based lending system</span>
              </li>
              <li className="flex gap-2 sm:gap-3">
                <ArrowRight size={18} className="sm:size-20 mt-1 flex-shrink-0" style={{ color: brandPurple }} />
                <span className="text-sm sm:text-base">Mentorship & Career Development: personal coaching, leadership workshops, and business advisory clinics</span>
              </li>
            </ul>
          </FadeInSection>

          {/* Our Approach */}
          <FadeInSection direction="right" className="rounded-2xl sm:rounded-3xl text-white overflow-hidden">
            <div 
              className="p-6 sm:p-8 md:p-10 lg:p-12"
              style={{
                background: `linear-gradient(to bottom right, #F4A261, ${brandPurple})`
              }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8 flex items-center gap-2 sm:gap-3">
                Our Approach
                <div className="h-1 w-8 sm:w-10 md:w-12 bg-white/80 rounded"></div>
              </h2>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6 md:mb-8">
                We believe in empowerment, not dependency. Everything we do is built around building capacity, not handing out charity. Our programs are delivered through local Women Empowerment Hubs, anchored by grassroots leadership teams who understand their communities from the inside.
              </p>
              <p className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base md:text-lg">We operate with six core principles:</p>
              <ol className="space-y-2 sm:space-y-3 text-sm sm:text-[15px] md:text-base list-decimal pl-4 sm:pl-5">
                <li>Integrity & Accountability: transparent, ethical operations at every level.</li>
                <li>Community Ownership: local leadership and cultural sensitivity.</li>
                <li>Empowerment, not Dependency: capacity building that lasts.</li>
                <li>Sustainability: cooperative models and strategic partnerships.</li>
                <li>Inclusion & Dignity: respect for women of all backgrounds.</li>
                <li>Excellence & Impact: measurable outcomes, quality delivery.</li>
              </ol>
            </div>
          </FadeInSection>
        </div>

        {/* Where We Work + Our Commitment */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Where We Work */}
          <FadeInSection direction="left" className="bg-black text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8 flex items-center gap-2 sm:gap-3">
              Where We Work
              <div className="h-1 w-8 sm:w-10 md:w-12" style={{ backgroundColor: brandPurple }}></div>
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
              PWWEF currently operates pilot chapters in Ibadan (Oyo State), Abeokuta (Ogun State), and Osogbo (Osun State), with plans to expand into additional states across Nigeria.
            </p>
          </FadeInSection>

          {/* Our Commitment */}
          <FadeInSection direction="right" className="bg-gradient-to-br from-gray-900 to-black text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8 flex items-center gap-2 sm:gap-3">
              Our Commitment
              <div className="h-1 w-8 sm:w-10 md:w-12" style={{ backgroundColor: brandPurple }}></div>
            </h2>
            <p className="text-sm sm:text-base md:text-lg leading-relaxed">
              We are committed to the safety, dignity, and wellbeing of every woman we serve. Our operations are governed by rigorous financial, ethical, and safeguarding standards; because the women who trust us deserve nothing less.
            </p>
          </FadeInSection>
        </div>
      </div>
    </div>
  );
};

export default About;