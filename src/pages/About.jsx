import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Heart, UserCheck, FlameKindling, Map, Award } from "lucide-react";

export default function About() {
  const pillarsExtended = [
    {
      num: "01",
      name: "Human Empowerment",
      subtitle: "Securing Psychological and Social Stability",
      impact: "100% Cohort Graduation Rate",
      longDesc:
        "Economic survival is impossible under acute stress, social exclusion, or lack of confidence. In our first phase, we provide  women with mental wellness workshops, mutual support networks, and vocational masterclasses. Each woman is matched with a dedicated peer partner for immediate accountability.",
      bullets: [
        "Trauma-informed therapeutic circles led by Oyo State counselors",
        "Fast-track technical cohorts (craft, agro-processing, textile arts)",
        "Daily attendance accountability checks with zero administrative friction",
      ],
    },
    {
      num: "02",
      name: "Cooperative Empowerment",
      subtitle: "Capitalization Through Mutual Peer Action",
      impact: "Interest-Free Loans Handed Out",
      longDesc:
        "Once a woman is socially stable and skilled, she enters the local PWWE Mutual Savings Block. Instead of relying on commercial micro-finance institutions that extract high interest rates and cause crippling debt cycles, our members build their own equity. Every woman contributes to and draws from the collective ledger pool.",
      bullets: [
        "Structured rotating ledger credit managed by members",
        "Zero-collateral and zero-interest lending models",
        "Joint commercial capital accounts overseen by Ibadan cluster leads",
      ],
    },
    {
      num: "03",
      name: "Business Development",
      subtitle: "Transitioning Cooperatives into Market Ventures",
      impact: "Sustainable Oyo Enterprises Formed",
      longDesc:
        "The ultimate milestone. A skilled woman with cooperative savings is ready to launch her commercial venture. PWWE provides rigorous incubator services: custom branding, uniform packaging, product testing, Oyo State trade registration, and direct market placements in Ibadan retail networks.",
      bullets: [
        "Subsidized retail packaging design and professional branding",
        "Direct trade linkages with major distributors in Ibadan West",
        "Bi-weekly enterprise audit visits from foundation experts",
      ],
    },
  ];

  const leaders = [
    {
      name: "Mrs. Olatokunbo Alabi",
      role: "Executive Director & Founder",
      bio: "Over 20 years advocating for institutional micro-finance accessibility and vocational education reform in South-West Nigeria.",
    },
    {
      name: "Dr. Maryam Adebayo",
      role: "Cooperative Registrar",
      bio: "An expert in cooperative sociology and credit union auditing; manages financial risk parameters and ledger clusters in Ibadan.",
    },
    {
      name: "Alhaja Ronke Adesina",
      role: "Oyo State Welfare & Cohort Supervisor",
      bio: "A pioneer textile merchant.",
    },
  ];

  return (
    <div className="bg-brand-light min-h-screen overflow-hidden animate-fade-in" id="about-page">
      {/* Editorial Page Header */}
      <section className="pt-16 pb-20 px-6 md:px-12 max-w-7xl mx-auto border-b border-brand-purple/10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 max-w-4xl"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-[#CC9838] font-bold">
            // Genesis & Organization Structure
          </span>
          <h1 className="font-display text-4xl md:text-7xl font-extrabold text-brand-dark leading-tight">
            Restoring Women's Self-Ownership in Oyo State
          </h1>
          <p className="text-base sm:text-xl font-sans text-brand-dark/75 leading-relaxed font-normal max-w-2xl">
            PWWE Foundation is a systemic response to the lack of secure financial tools and vocational networks for low-income women in Ibadan, Nigeria.
          </p>
        </motion.div>
      </section>

      {/* Mission & Vision - Two Related but Non-Identical Typographic Cards */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Mission Side: High-contrast large typographic block with brand-purple accents */}
          <div className="lg:col-span-7 flex flex-col justify-between border-l-4 border-brand-purple pl-6 lg:pl-10 space-y-6">
            <span className="font-mono text-[10px] uppercase text-brand-purple tracking-widest font-bold">
              OUR MISSION STATEMENT
            </span>
            <blockquote className="font-display text-2xl sm:text-4xl font-extrabold text-brand-dark leading-tight">
              "To completely dismantle the barriers of poverty for marginalized women by providing vocational training, joint financial capital, and sustainable micro-enterprise placement."
            </blockquote>
            <p className="text-xs sm:text-sm text-brand-dark/70 font-sans leading-relaxed max-w-xl">
              We replace predatory commercial micro-loans with a model of mutual cooperative ledger growth, turning collective action into structural capital.
            </p>
          </div>

          {/* Vision Side: Minimalist Deep Purple card to provide high contrast */}
          <div className="lg:col-span-5 bg-[#120A14] text-brand-light p-8 md:p-10 flex flex-col justify-between border border-brand-purple/20 relative">
            <div className="absolute top-0 right-0 font-mono text-[9px] text-[#CC9838] border-l border-b border-[#CC9838]/20 py-1.5 px-3 uppercase tracking-widest">
              Long-term Sight
            </div>
            <div className="space-y-4">
              <span className="font-mono text-[10px] text-brand-purple uppercase tracking-widest font-bold">
                OUR VISION TARGET
              </span>
              <h3 className="font-display text-2xl font-bold text-white leading-snug">
                Fully self-funding, mutual-cooperative guilds operating across South-West Nigeria.
              </h3>
            </div>
            <p className="text-xs text-brand-light/75 leading-relaxed font-sans mt-8 pt-4 border-t border-white/10">
              We envision a future where no widow is forced into debt-bondage to feed her household. By providing cooperative ledgers, we establish sustainable economic guilds owned entirely by the women who operate them.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section with Staggered Viewport Entrance */}
      <section className="py-24 bg-[#FCF7EE] border-y border-[#CC9838]/10" id="our-story-section">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Story title tag */}
            <div className="lg:col-span-4 sticky top-24 space-y-4">
              <span className="font-mono text-xs uppercase tracking-widest text-[#CC9838] font-bold block">
                The Ledger Chronicles
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-black text-brand-dark leading-tight">
                An Untemplated Story of Ibadan
              </h2>
              <div className="h-1.5 w-16 bg-[#CC9838] mt-4" />
            </div>

            {/* Story copy (Rich, long text for real senior-dev craftsmanship feel) */}
            <div className="lg:col-span-8 space-y-6 text-sm text-brand-dark/80 font-sans leading-relaxed">
              <p>
               The Power Within Women Empowerment Foundation  (PWWEF) was initiated to address a profound institutional failure: the systematic exclusion of low-income rural and urban women from safe micro-capital markets in South-West Nigeria. In Oyo State, standard banking options require intense physical collateral and commercial registration parameters that underprivileged mothers simply do not have, sealing off their livelihood opportunities.
              </p>
            
              <p>
                Today, our organizational offices at the historical ANCE Building coordinate hundreds of active cooperative women. Our system represents a completely self-sustaining framework, independent of high-interest predatory micro-lending networks. By pooling small savings under strict peer support guidelines, PWWE women serve as their own bankers, their own business incubators, and their own safety nets.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 mt-8 border-t border-brand-purple/10">
                <div className="p-4 bg-white border border-brand-purple/5 space-y-2">
                  <Award size={20} className="text-[#CC9838]" />
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider text-brand-dark">
                    Collective Governance
                  </h4>
                  <p className="text-xs text-brand-dark/60">
                    No external venture entities. Clean, peer-governed savings blocks where decisions are decided by women cohort boards.
                  </p>
                </div>
                <div className="p-4 bg-white border border-[#CC9838]/5 space-y-2">
                  <Map size={20} className="text-[#CC9838]" />
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider text-brand-dark">
                    Oyo State Expansion
                  </h4>
                  <p className="text-xs text-brand-dark/60">
                    Sustaining structured market linkages, brand packaging grants, and supply storage for small cottage mills around Ibadan West.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* The Three Pillars in Depth - Distinct Layout Device from Home */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto" id="pillars-depth-section">
        <div className="mb-16 space-y-3">
          <span className="font-mono text-xs uppercase tracking-widest text-[#CC9838] font-bold">
            The Structural Lifecycle
          </span>
          <h2 className="font-display text-2xl sm:text-5xl font-black text-brand-dark leading-tight">
            How a Woman Climbs from Struggle to Security
          </h2>
          <p className="text-xs sm:text-sm text-brand-dark/65 max-w-lg">
            Below is the extensive operational process of our three integrated evolutionary phases.
          </p>
        </div>

        {/* Vertical Column Stack layout, showing extensive details */}
        <div className="space-y-12">
          {pillarsExtended.map((pillar) => (
            <motion.div
              key={pillar.num}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 md:p-10 bg-white border border-[#CC9838]/10 shadow-xs relative"
            >
              {/* Pillar Number Label */}
              <div className="lg:col-span-2 flex flex-col justify-between">
                <div>
                  <span className="block font-mono text-[10px] text-brand-purple uppercase tracking-widest font-black leading-none">
                    Evolutionary Step
                  </span>
                  <span className="block font-display text-6xl font-black text-brand-purple mt-2">
                    {pillar.num}
                  </span>
                </div>
                <div className="text-[10px] font-mono bg-brand-purple-light text-brand-purple border border-brand-purple/20 py-1 px-2.5 inline-block text-center mt-4 lg:mt-0 font-bold max-w-[140px]">
                  {pillar.impact}
                </div>
              </div>

              {/* Pillar Description */}
              <div className="lg:col-span-6 space-y-4">
                <h3 className="font-display text-2xl font-bold text-brand-dark">
                  {pillar.name}
                </h3>
                <span className="block text-xs font-mono text-[#CC9838] uppercase tracking-wider font-semibold">
                  {pillar.subtitle}
                </span>
                <p className="text-xs sm:text-sm text-brand-dark/75 leading-relaxed font-sans">
                  {pillar.longDesc}
                </p>
              </div>

              {/* Specific Bullets list */}
              <div className="lg:col-span-4 bg-brand-light/40 p-6 border-l-2 border-brand-purple border-t lg:border-t-0 space-y-4">
                <span className="block font-mono text-[9px] uppercase text-brand-dark/50 tracking-widest">
                  Targeted Deliverables
                </span>
                <ul className="space-y-3">
                  {pillar.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="flex gap-2.5 items-start text-xs text-brand-dark/70 font-sans leading-relaxed">
                      <span className="w-1.5 h-1.5 bg-[#CC9838] flex-shrink-0 mt-1" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Leadership Section - Untemplated Text-Driven Editorial Portrait Profile Blocks */}
      <section className="py-24 bg-brand-purple-light/40 border-t border-brand-purple/10" id="leadership-section">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Header column */}
            <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-24">
              <span className="font-mono text-xs uppercase tracking-widest text-brand-purple font-bold block">
                The Board of Registrars
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-black text-brand-dark leading-tight">
                Governing with Intention
              </h2>
              <p className="text-xs sm:text-sm text-brand-dark/65 font-sans leading-relaxed">
                PWWE's directors combine regulatory financial auditing experience with decades of social welfare action in South-West Nigeria.
              </p>
            </div>

            {/* List column - Elegant layout with fine lines */}
            <div className="lg:col-span-8 space-y-8">
              <div className="divide-y divide-brand-purple/10">
                {leaders.map((leader, i) => (
                  <div key={i} className="py-6 first:pt-0 last:pb-0 group">
                    <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-between items-start">
                      <div className="space-y-2 max-w-xl">
                        <h3 className="font-display text-xl font-bold text-brand-dark group-hover:text-brand-purple transition-all duration-300">
                          {leader.name}
                        </h3>
                        <span className="block font-mono text-[10px] text-[#CC9838] uppercase tracking-widest font-black">
                          {leader.role}
                        </span>
                        <p className="text-xs sm:text-sm text-brand-dark/70 leading-relaxed font-sans">
                          {leader.bio}
                        </p>
                      </div>
                      <div className="text-[10px] font-mono text-brand-dark/40 uppercase tracking-widest hidden md:block select-none">
                        Ibadan Cluster HQ • Executive
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Call to action at bottom */}
              <div className="pt-8 border-t border-brand-purple/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <p className="text-xs text-brand-dark/60 font-sans max-w-sm">
                  Want to learn more about our annual ledger records or audit profiles in Oyo State? Let's connect.
                </p>
                <Link
                  to="/contact"
                  className="px-6 py-3 bg-brand-purple text-brand-light font-mono text-xs uppercase tracking-wider font-bold border border-brand-purple hover:bg-transparent hover:text-brand-purple transition-all duration-300 shadow-sm"
                >
                  Contact Admin Desk
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
