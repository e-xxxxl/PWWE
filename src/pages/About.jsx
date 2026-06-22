import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Heart, Users, Target, Shield } from "lucide-react";

export default function About() {
  const programs = [
    {
      icon: <Users size={20} />,
      title: "Skills Acquisition & Vocational Training",
      desc: "Practical skills in tailoring, catering, digital technology, agribusiness, beauty, and more. Women leave with products they can sell immediately."
    },
    {
      icon: <Heart size={20} />,
      title: "Financial Literacy & Cooperative Development",
      desc: "Teaching savings discipline, budgeting, and cooperative models that build collective economic strength within communities."
    },
    {
      icon: <Target size={20} />,
      title: "Micro-Loan & Business Support",
      desc: "Responsible access to capital through a group-based lending system that grows with each woman's progress. No predatory interest. No impossible conditions."
    },
    {
      icon: <Shield size={20} />,
      title: "Mentorship & Career Development",
      desc: "Personal coaching, leadership workshops, and business advisory clinics to help women reach their full potential."
    }
  ];

  const principles = [
    { title: "Integrity & Accountability", desc: "Transparent, ethical operations at every level." },
    { title: "Community Ownership", desc: "Local leadership and cultural sensitivity guide everything we do." },
    { title: "Empowerment, not Dependency", desc: "Capacity building that lasts long after our direct involvement." },
    { title: "Sustainability", desc: "Cooperative models and strategic partnerships that keep programmes running." },
    { title: "Inclusion & Dignity", desc: "Respect for women of all backgrounds, beliefs, and circumstances." },
    { title: "Excellence & Impact", desc: "Measurable outcomes and quality delivery. We track what matters." }
  ];

  const locations = [
    { city: "Ibadan", state: "Oyo State", status: "Active Chapter" },
    { city: "Abeokuta", state: "Ogun State", status: "Active Chapter" },
    { city: "Osogbo", state: "Osun State", status: "Active Chapter" }
  ];

  return (
    <div className="bg-brand-light min-h-screen overflow-hidden" id="about-page">
      
      {/* Header */}
      <section className="pt-16 pb-20 px-6 md:px-12 max-w-7xl mx-auto border-b border-brand-purple/10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 max-w-4xl"
        >
          <span className="text-xs uppercase tracking-widest text-[#CC9838] font-semibold">
            About Us
          </span>
          <h1 className="text-4xl md:text-7xl font-bold text-brand-dark leading-tight">
            Who We Are
          </h1>
          <p className="text-base sm:text-xl text-brand-dark/75 leading-relaxed max-w-2xl">
            The Power Within Women Empowerment Foundation (PWWEF) is a registered non-profit organisation dedicated to unlocking the economic, leadership, and personal development potential of women across Nigeria. We believe every woman carries within her the power to transform her life, her family, and her community — she simply needs the right support, tools, and opportunities to do so.
          </p>
        </motion.div>
      </section>

      {/* Vision for Impact */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-between border-l-4 border-brand-purple pl-6 lg:pl-10 space-y-6">
            <span className="text-xs uppercase text-brand-purple tracking-widest font-semibold">
              Our Vision for Impact
            </span>
            <p className="text-xl sm:text-3xl font-bold text-brand-dark leading-tight">
              Within a year of establishing each chapter, we aim to train 150–300 women, support the launch or growth of 50–120 businesses, achieve a 90% loan repayment rate, and help beneficiaries grow their incomes by 30–60%.
            </p>
            <p className="text-sm text-brand-dark/70 leading-relaxed max-w-xl">
              These are not just numbers — they represent families fed, children educated, and communities strengthened.
            </p>
          </div>

          <div className="lg:col-span-5 bg-[#120A14] text-brand-light p-8 md:p-10 flex flex-col justify-center space-y-6">
            <span className="text-xs text-[#CC9838] uppercase tracking-widest font-semibold">
              Get Started
            </span>
            <h3 className="text-2xl font-bold text-white leading-snug">
              Want to be part of PWWEF?
            </h3>
            <p className="text-sm text-brand-light/75 leading-relaxed">
              Whether you're a woman looking to join a cooperative, learn a skill, or start a business — we're here for you.
            </p>
            <Link
              to="/auth?tab=register"
              className="px-6 py-3 bg-brand-purple text-white text-center text-sm font-semibold hover:bg-white hover:text-brand-dark transition-all duration-300 inline-block w-fit"
            >
              Register to Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 px-6 bg-gray-50" id="what-we-do-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-[#CC9838] font-semibold">What We Do</span>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-dark mt-3 mb-4">
              We empower women through structured, community-rooted programs designed to create lasting change.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-1 max-w-5xl mx-auto bg-gray-200 p-1 rounded-lg">
            {programs.map((program, i) => (
              <div key={i} className="bg-white p-8 hover:bg-brand-purple hover:text-white transition-all duration-300 group cursor-pointer">
                <div className="flex items-start gap-4">
                  <span className="text-brand-purple group-hover:text-white transition-colors duration-300 mt-1 shrink-0">
                    {program.icon}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-brand-dark group-hover:text-white mb-2 transition-colors duration-300">
                      {program.title}
                    </h3>
                    <p className="text-gray-700 group-hover:text-white/90 text-sm leading-relaxed transition-colors duration-300">
                      {program.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#CC9838] font-semibold block">
              Our Approach
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-dark leading-tight">
              Empowerment, not dependency.
            </h2>
            <p className="text-sm text-brand-dark/70 leading-relaxed">
              Everything we do is built around building capacity, not handing out charity. Our programs are delivered through local Women Empowerment Hubs, anchored by grassroots leadership teams who understand their communities from the inside.
            </p>
          </div>

          <div className="lg:col-span-8">
            <div className="grid sm:grid-cols-2 gap-4">
              {principles.map((principle, i) => (
                <div key={i} className="p-6 bg-white border border-brand-purple/10 hover:border-brand-purple transition-all duration-300">
                  <h3 className="text-base font-bold text-brand-dark mb-2">{principle.title}</h3>
                  <p className="text-sm text-brand-dark/70 leading-relaxed">{principle.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Where We Work */}
      <section className="py-20 px-6 bg-[#FCF7EE] border-y border-[#CC9838]/10" id="locations-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-[#CC9838] font-semibold">Where We Work</span>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-dark mt-3 mb-4">
              Growing across South-West Nigeria
            </h2>
            <p className="text-sm text-brand-dark/70 max-w-xl mx-auto leading-relaxed">
              PWWEF currently operates pilot chapters in three states, with plans to expand into additional states across Nigeria.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {locations.map((loc, i) => (
              <div key={i} className="bg-white p-6 text-center border border-brand-purple/10 hover:border-brand-purple transition-all duration-300">
                <MapPin size={24} className="text-brand-purple mx-auto mb-3" />
                <h3 className="text-lg font-bold text-brand-dark">{loc.city}</h3>
                <p className="text-sm text-brand-dark/60">{loc.state}</p>
                <span className="inline-block mt-3 text-xs font-semibold text-brand-purple bg-brand-purple-light px-3 py-1">
                  {loc.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-20 px-6 md:px-12 max-w-4xl mx-auto text-center">
        <span className="text-xs uppercase tracking-widest text-[#CC9838] font-semibold">Our Commitment</span>
        <h2 className="text-3xl md:text-5xl font-bold text-brand-dark mt-3 mb-6">
          The women who trust us deserve nothing less.
        </h2>
        <p className="text-base text-brand-dark/75 leading-relaxed max-w-2xl mx-auto">
          We are committed to the safety, dignity, and wellbeing of every woman we serve. Our operations are governed by rigorous financial, ethical, and safeguarding standards — because the women who trust us deserve nothing less.
        </p>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-6 bg-brand-purple text-white text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h3 className="text-2xl md:text-4xl font-bold">Ready to be part of something bigger?</h3>
          <p className="text-white/80 text-sm leading-relaxed">
            Join a community of women building businesses, saving together, and lifting each other up.
          </p>
          <Link
            to="/auth?tab=register"
            className="px-8 py-4 bg-white text-brand-purple text-sm font-semibold hover:bg-gray-100 transition-all duration-300 inline-block"
          >
            Register to Get Started
          </Link>
        </div>
      </section>

    </div>
  );
}