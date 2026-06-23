import React from "react";
import { Link } from "react-router-dom";
import { Download, ArrowRight } from "lucide-react";

const About = () => {
  const brandPurple = "#96158F";

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <div className="bg-black text-white py-40">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-6xl font-bold tracking-tight">About us</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Who We Are + Vision */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {/* Who We Are */}
          <div className="rounded-3xl overflow-hidden shadow-xl">
            <div 
              className="p-12 h-full text-white"
              style={{
                background: `linear-gradient(to bottom right, ${brandPurple}, #E85D9E)`
              }}
            >
              <h2 className="text-4xl font-bold mb-8">Who We Are</h2>
              <p className="text-lg leading-relaxed">
                The Power Within Women Empowerment Foundation (PWWEF) is a registered non-profit organisation dedicated to unlocking the economic, leadership, and personal development potential of women across Nigeria.
              </p>
              <p className="text-lg leading-relaxed mt-6">
                We believe every woman carries within her the power to transform her life, her family, and her community, she simply needs the right support, tools, and opportunities to do so.
              </p>
            </div>
          </div>

          {/* Our Vision for Impact */}
          <div>
            <h2 className="text-4xl font-bold mb-6 flex items-center gap-3">
              Our Vision for Impact
              <div className="h-1 w-12" style={{ backgroundColor: brandPurple }}></div>
            </h2>
            <p className="text-gray-700 text-[17px] leading-relaxed">
              Within a year of establishing each chapter, we aim to train 150–300 women, support the launch or growth of 50–120 businesses, achieve a 90% loan repayment rate, and help beneficiaries grow their incomes by 30–60%. These are not just numbers, they represent families fed, children educated, and communities strengthened.
            </p>
          </div>
        </div>

        {/* Call to Action Banner */}
        <div className="bg-black text-white rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 mb-20">
          <div>
            <h3 className="text-2xl font-semibold">Want to be part of PWWEF?</h3>
            <p className="text-gray-300 mt-2">Fill the registration form to get started</p>
          </div>
          <Link
            to="/register"
            className="bg-white text-black px-8 py-4 rounded-xl font-semibold flex items-center gap-3 hover:bg-gray-100 transition-colors whitespace-nowrap"
            style={{ color: "#000" }}
          >
            <Download size={20} />
            Download the Form
          </Link>
        </div>

        {/* What We Do + Our Approach */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* What We Do */}
          <div>
            <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
              What We Do
              <div className="h-1 w-12" style={{ backgroundColor: brandPurple }}></div>
            </h2>
            <p className="text-gray-700 text-[17px] leading-relaxed mb-8">
              We empower women through structured, community-rooted programs designed to create lasting change:
            </p>
            <ul className="space-y-4 text-gray-700">
              <li className="flex gap-3">
                <ArrowRight size={20} style={{ color: brandPurple }} className="mt-1 flex-shrink-0" />
                Skills Acquisition & Vocational Training: practical skills in tailoring, catering, digital technology, agribusiness, beauty, and more
              </li>
              <li className="flex gap-3">
                <ArrowRight size={20} style={{ color: brandPurple }} className="mt-1 flex-shrink-0" />
                Financial Literacy & Cooperative Development: teaching savings discipline, budgeting, and cooperative models
              </li>
              <li className="flex gap-3">
                <ArrowRight size={20} style={{ color: brandPurple }} className="mt-1 flex-shrink-0" />
                Micro-Loan & Business Support: responsible access to capital through a group-based lending system
              </li>
              <li className="flex gap-3">
                <ArrowRight size={20} style={{ color: brandPurple }} className="mt-1 flex-shrink-0" />
                Mentorship & Career Development: personal coaching, leadership workshops, and business advisory clinics
              </li>
            </ul>
          </div>

          {/* Our Approach */}
          <div 
            className="rounded-3xl p-12 text-white"
            style={{
              background: `linear-gradient(to bottom right, #F4A261, ${brandPurple})`
            }}
          >
            <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
              Our Approach
              <div className="h-1 w-12 bg-white/80 rounded"></div>
            </h2>
            <p className="text-lg leading-relaxed mb-8">
              We believe in empowerment, not dependency. Everything we do is built around building capacity, not handing out charity. Our programs are delivered through local Women Empowerment Hubs, anchored by grassroots leadership teams who understand their communities from the inside.
            </p>
            <p className="font-semibold mb-4">We operate with six core principles:</p>
            <ol className="space-y-3 text-[15px] list-decimal pl-5">
              <li>Integrity & Accountability: transparent, ethical operations at every level.</li>
              <li>Community Ownership: local leadership and cultural sensitivity.</li>
              <li>Empowerment, not Dependency: capacity building that lasts.</li>
              <li>Sustainability: cooperative models and strategic partnerships.</li>
              <li>Inclusion & Dignity: respect for women of all backgrounds.</li>
              <li>Excellence & Impact: measurable outcomes, quality delivery.</li>
            </ol>
          </div>
        </div>

        {/* Where We Work + Our Commitment */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Where We Work */}
          <div className="bg-black text-white rounded-3xl p-12">
            <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
              Where We Work
              <div className="h-1 w-12" style={{ backgroundColor: brandPurple }}></div>
            </h2>
            <p className="text-gray-300 leading-relaxed">
              PWWEF currently operates pilot chapters in Ibadan (Oyo State), Abeokuta (Ogun State), and Osogbo (Osun State), with plans to expand into additional states across Nigeria.
            </p>
          </div>

          {/* Our Commitment */}
          <div className="bg-gradient-to-br from-gray-900 to-black text-white rounded-3xl p-12">
            <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
              Our Commitment
              <div className="h-1 w-12" style={{ backgroundColor: brandPurple }}></div>
            </h2>
            <p className="text-lg leading-relaxed">
              We are committed to the safety, dignity, and wellbeing of every woman we serve. Our operations are governed by rigorous financial, ethical, and safeguarding standards; because the women who trust us deserve nothing less.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;