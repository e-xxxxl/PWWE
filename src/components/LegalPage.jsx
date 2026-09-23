import React from "react";
import { Link } from "react-router-dom";
import FadeInSection from "./FadeInSection";

const brandPurple = "#96158F";

const Block = ({ block }) => {
  switch (block.type) {
    case "h3":
      return (
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mt-6 mb-2">
          {block.text}
        </h3>
      );
    case "p":
      return (
        <p className="text-gray-700 leading-relaxed mb-4 text-sm sm:text-base">
          {block.text}
        </p>
      );
    case "ul":
      return (
        <ul className="list-disc pl-5 sm:pl-6 space-y-2 mb-4 text-gray-700 text-sm sm:text-base">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="list-decimal pl-5 sm:pl-6 space-y-2 mb-4 text-gray-700 text-sm sm:text-base">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      );
    case "contact":
      return (
        <div className="rounded-2xl bg-gray-50 border border-gray-200 p-5 mb-4 space-y-1 text-sm sm:text-base text-gray-700">
          {block.lines.map((line, i) => (
            <p key={i} className={i === 0 ? "font-semibold text-gray-900" : ""}>
              {line}
            </p>
          ))}
        </div>
      );
    default:
      return null;
  }
};

const LegalPage = ({ eyebrow, title, intro, lastUpdated, sections }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <div className="bg-black text-white py-20 sm:py-28 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <FadeInSection>
            {eyebrow && (
              <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#E85D9E] mb-3">
                {eyebrow}
              </p>
            )}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              {title}
            </h1>
            {/* {lastUpdated && (
              <p className="text-gray-400 text-sm mt-4">Last updated: {lastUpdated}</p>
            )} */}
          </FadeInSection>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14 md:py-16">
        {intro && (
          <p className="text-gray-700 leading-relaxed mb-10 text-sm sm:text-lg">
            {intro}
          </p>
        )}

        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.title} className="scroll-mt-24">
              <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                {section.title}
                <span
                  className="h-1 w-8 rounded hidden sm:block"
                  style={{ backgroundColor: brandPurple }}
                />
              </h2>
              {section.blocks.map((block, i) => (
                <Block key={i} block={block} />
              ))}
            </section>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-gray-200 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <p className="text-sm text-gray-500">
            Power Within Women Cooperative Multipurpose Society Ltd.
          </p>
          <div className="flex gap-5 text-sm font-medium">
            <Link to="/terms" className="text-[#96158F] hover:underline">
              Terms &amp; Conditions
            </Link>
            <Link to="/privacy" className="text-[#96158F] hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalPage;
