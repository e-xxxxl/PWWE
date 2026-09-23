import React from "react";
import LegalPage from "../components/LegalPage";

const sections = [
  {
    title: "1. Introduction",
    blocks: [
      {
        type: "p",
        text: "Power Within Women Cooperative Multipurpose Society Ltd. (“the Society”, “we”, “us”, or “our”) respects the privacy of its members, prospective members, employees, partners, service providers and other individuals whose personal information we collect.",
      },
      {
        type: "p",
        text: "This Privacy Policy explains how we collect, use, store, protect and disclose personal information when you:",
      },
      {
        type: "ul",
        items: [
          "Apply for membership;",
          "Register or create an account;",
          "Make savings or contributions;",
          "Apply for or obtain a loan;",
          "Participate in an investment or other Society programme;",
          "Make payments or transactions;",
          "Contact the Society;",
          "Use our website, application, member portal or other digital services; or",
          "Otherwise interact with the Society.",
        ],
      },
      {
        type: "p",
        text: "By providing personal information to us or using our services, you acknowledge that you have read and understood this Privacy Policy.",
      },
    ],
  },
  {
    title: "2. Information We Collect",
    blocks: [
      {
        type: "p",
        text: "Depending on the nature of your relationship with the Society, we may collect the following categories of information.",
      },
      { type: "h3", text: "2.1 Personal Information" },
      { type: "p", text: "This may include:" },
      {
        type: "ul",
        items: [
          "Full name;",
          "Date of birth;",
          "Gender, where required;",
          "Residential address;",
          "Office or business address;",
          "Telephone number;",
          "Email address;",
          "Photograph;",
          "Signature;",
          "Next-of-kin information;",
          "Emergency contact information; and",
          "Other information necessary for membership administration.",
        ],
      },
      { type: "h3", text: "2.2 Identification Information" },
      {
        type: "p",
        text: "Where required, we may collect information contained in identification documents, including:",
      },
      {
        type: "ul",
        items: [
          "National Identification Number (NIN);",
          "International passport;",
          "Driver's licence;",
          "Permanent Voter's Card;",
          "Other government-issued identification;",
          "Passport photographs; and",
          "Documents required for verification.",
        ],
      },
      { type: "h3", text: "2.3 Financial Information" },
      { type: "p", text: "Where necessary for Society activities, we may collect:" },
      {
        type: "ul",
        items: [
          "Bank account details;",
          "Bank name;",
          "Account number;",
          "Savings and contribution records;",
          "Loan records;",
          "Repayment history;",
          "Investment records;",
          "Payment information;",
          "Transaction history;",
          "Guarantor information; and",
          "Other financial information relevant to Society services.",
        ],
      },
      { type: "h3", text: "2.4 Technical Information" },
      {
        type: "p",
        text: "When you use our website, application or digital platforms, we may collect certain technical information, such as:",
      },
      {
        type: "ul",
        items: [
          "IP address;",
          "Device type;",
          "Browser type;",
          "Operating system;",
          "Login information;",
          "Usage information;",
          "Date and time of access; and",
          "Other technical information generated through use of our digital services.",
        ],
      },
    ],
  },
  {
    title: "3. How We Collect Information",
    blocks: [
      { type: "p", text: "We may collect personal information:" },
      {
        type: "ol",
        items: [
          "Directly from you when you register or apply for membership.",
          "When you complete forms or submit documents.",
          "When you make payments or contributions.",
          "When you apply for a loan or other financial facility.",
          "When you communicate with the Society.",
          "Through our website, application or member portal.",
          "From guarantors, referees or authorised representatives where necessary.",
          "From financial institutions, payment service providers or other authorised third parties.",
          "From public or legally authorised sources where permitted by law.",
        ],
      },
    ],
  },
  {
    title: "4. Why We Collect Your Information",
    blocks: [
      {
        type: "p",
        text: "We may process your personal information for purposes including:",
      },
      {
        type: "ul",
        items: [
          "Processing membership applications;",
          "Managing your membership;",
          "Maintaining member records;",
          "Processing savings and contributions;",
          "Processing loan applications and repayments;",
          "Managing investments and Society programmes;",
          "Processing payments;",
          "Verifying identity;",
          "Preventing fraud and financial misconduct;",
          "Communicating with members;",
          "Providing customer/member support;",
          "Maintaining financial and accounting records;",
          "Conducting audits;",
          "Managing risks;",
          "Resolving disputes and complaints;",
          "Complying with legal and regulatory obligations;",
          "Enforcing our Terms & Conditions and Bye-Laws; and",
          "Protecting the rights, property and security of the Society and its members.",
        ],
      },
    ],
  },
  {
    title: "5. Legal Basis for Processing",
    blocks: [
      {
        type: "p",
        text: "We will process personal information only where there is a lawful basis for doing so.",
      },
      {
        type: "p",
        text: "Depending on the circumstances, this may include:",
      },
      {
        type: "ul",
        items: [
          "Your consent;",
          "Performance of a contract or provision of requested services;",
          "Compliance with a legal or regulatory obligation;",
          "Protection of vital interests;",
          "Legitimate interests of the Society where permitted by law; or",
          "Any other lawful basis recognised under applicable data protection legislation.",
        ],
      },
      {
        type: "p",
        text: "Where processing is based on consent, you may withdraw your consent where permitted by law. Withdrawal of consent will not affect processing already lawfully carried out before the withdrawal.",
      },
    ],
  },
  {
    title: "6. Financial and Loan Information",
    blocks: [
      {
        type: "p",
        text: "The Society recognises that financial information is particularly sensitive.",
      },
      {
        type: "p",
        text: "Financial and loan information will only be accessed, processed or disclosed where reasonably necessary for legitimate Society activities, including:",
      },
      {
        type: "ul",
        items: [
          "Account administration;",
          "Loan assessment;",
          "Loan recovery;",
          "Accounting;",
          "Auditing;",
          "Risk management;",
          "Fraud prevention;",
          "Regulatory compliance; or",
          "Other lawful purposes.",
        ],
      },
      {
        type: "p",
        text: "Members' financial information shall not be publicly disclosed without a lawful basis.",
      },
    ],
  },
  {
    title: "7. Information About Guarantors",
    blocks: [
      {
        type: "p",
        text: "Where a member provides information about a guarantor, the member is responsible for ensuring that the information supplied is accurate and may be lawfully provided to the Society.",
      },
      {
        type: "p",
        text: "The Society may process guarantor information for purposes related to:",
      },
      {
        type: "ul",
        items: [
          "Loan assessment;",
          "Verification;",
          "Guarantee administration;",
          "Loan recovery;",
          "Record keeping;",
          "Fraud prevention; and",
          "Legal or regulatory compliance.",
        ],
      },
    ],
  },
  {
    title: "8. Sharing of Personal Information",
    blocks: [
      {
        type: "p",
        text: "We may share personal information where necessary and lawful with:",
      },
      {
        type: "ul",
        items: [
          "Employees and authorised officers of the Society;",
          "Auditors and professional advisers;",
          "Banks and payment service providers;",
          "Technology and service providers;",
          "Legal advisers;",
          "Regulators and government authorities;",
          "Law enforcement agencies where legally required or permitted;",
          "Debt recovery service providers where lawfully engaged;",
          "Other parties authorised by you; and",
          "Other third parties where disclosure is necessary and lawful.",
        ],
      },
      {
        type: "p",
        text: "We do not sell members' personal information for marketing purposes.",
      },
    ],
  },
  {
    title: "9. Third-Party Service Providers",
    blocks: [
      {
        type: "p",
        text: "The Society may use third-party service providers to support its operations, including providers of:",
      },
      {
        type: "ul",
        items: [
          "Payment processing;",
          "Website hosting;",
          "Cloud storage;",
          "Information technology;",
          "Communications;",
          "Accounting;",
          "Security;",
          "Data management;",
          "Identity verification; and",
          "Other business support services.",
        ],
      },
      {
        type: "p",
        text: "Where third parties process personal information on our behalf, we will take reasonable steps to ensure that they handle such information appropriately and in accordance with applicable legal requirements.",
      },
    ],
  },
  {
    title: "10. Data Security",
    blocks: [
      {
        type: "p",
        text: "We take reasonable technical and organisational measures to protect personal information against:",
      },
      {
        type: "ul",
        items: [
          "Unauthorised access;",
          "Unauthorised disclosure;",
          "Loss;",
          "Theft;",
          "Destruction;",
          "Alteration;",
          "Accidental disclosure; and",
          "Other unlawful or unauthorised processing.",
        ],
      },
      {
        type: "p",
        text: "Security measures may include access controls, passwords, authentication procedures, secure storage, staff confidentiality obligations and other appropriate safeguards.",
      },
      {
        type: "p",
        text: "However, no electronic transmission or storage system can be guaranteed to be completely secure.",
      },
    ],
  },
  {
    title: "11. Data Retention",
    blocks: [
      {
        type: "p",
        text: "We retain personal information only for as long as reasonably necessary for the purposes for which it was collected, or for as long as required by:",
      },
      {
        type: "ul",
        items: [
          "Applicable law;",
          "Regulatory requirements;",
          "Accounting requirements;",
          "Audit requirements;",
          "Dispute resolution;",
          "Debt recovery; or",
          "Legitimate business purposes.",
        ],
      },
      {
        type: "p",
        text: "When information is no longer required, we will take reasonable steps to securely delete, destroy or anonymise it, subject to applicable retention requirements.",
      },
    ],
  },
  {
    title: "12. Your Data Protection Rights",
    blocks: [
      {
        type: "p",
        text: "Subject to applicable law, you may have rights including the right to:",
      },
      {
        type: "ul",
        items: [
          "Request access to personal information we hold about you;",
          "Request correction of inaccurate or incomplete information;",
          "Request deletion of personal information in appropriate circumstances;",
          "Request restriction of certain processing;",
          "Object to certain processing;",
          "Request portability of certain personal information;",
          "Withdraw consent where processing is based on consent; and",
          "Lodge a complaint concerning the handling of your personal information.",
        ],
      },
      {
        type: "p",
        text: "Some rights may be subject to legal limitations or exceptions.",
      },
    ],
  },
  {
    title: "13. Accuracy of Information",
    blocks: [
      {
        type: "p",
        text: "Members are responsible for ensuring that the information provided to the Society is accurate and up to date.",
      },
      {
        type: "p",
        text: "If your information changes, you should notify the Society through the appropriate channel.",
      },
      {
        type: "p",
        text: "We may request supporting documentation before changing certain information.",
      },
    ],
  },
  {
    title: "14. Cookies and Online Technologies",
    blocks: [
      {
        type: "p",
        text: "Where our website or digital platform uses cookies or similar technologies, such technologies may be used to:",
      },
      {
        type: "ul",
        items: [
          "Keep users logged in;",
          "Improve website functionality;",
          "Understand how users interact with our services;",
          "Improve security;",
          "Remember user preferences; and",
          "Improve the overall user experience.",
        ],
      },
      {
        type: "p",
        text: "Where required by law, we will obtain appropriate consent before using non-essential cookies or similar technologies.",
      },
    ],
  },
  {
    title: "15. Direct Marketing",
    blocks: [
      {
        type: "p",
        text: "Where permitted by law, the Society may send members information concerning:",
      },
      {
        type: "ul",
        items: [
          "Society announcements;",
          "Meetings;",
          "New services;",
          "Programmes;",
          "Events;",
          "Member updates; and",
          "Other relevant Society communications.",
        ],
      },
      {
        type: "p",
        text: "Where consent is required for direct marketing, the Society will obtain the appropriate consent.",
      },
      {
        type: "p",
        text: "Members may opt out of promotional communications where applicable.",
      },
      {
        type: "p",
        text: "Administrative, transactional, security or legally required communications may still be sent even where a member has opted out of marketing communications.",
      },
    ],
  },
  {
    title: "16. Children's Information",
    blocks: [
      {
        type: "p",
        text: "Our services are generally intended for adults who are legally capable of entering into membership and financial arrangements.",
      },
      {
        type: "p",
        text: "We do not knowingly collect personal information from children except where such collection is lawful, necessary and appropriately authorised.",
      },
    ],
  },
  {
    title: "17. International Data Transfers",
    blocks: [
      {
        type: "p",
        text: "Some service providers used by the Society may store or process information outside Nigeria.",
      },
      {
        type: "p",
        text: "Where personal information is transferred outside Nigeria, the Society will take reasonable steps to ensure that the transfer and processing comply with applicable data protection requirements.",
      },
    ],
  },
  {
    title: "18. Data Breaches",
    blocks: [
      {
        type: "p",
        text: "If the Society becomes aware of a personal data breach that requires notification under applicable law, we will take appropriate steps to investigate, contain and remediate the breach and make any legally required notifications.",
      },
      {
        type: "p",
        text: "Where required, affected individuals and relevant authorities will be notified in accordance with applicable requirements.",
      },
    ],
  },
  {
    title: "19. Confidentiality",
    blocks: [
      {
        type: "p",
        text: "Members, employees, officers, committee members and authorised representatives of the Society may have access to confidential information.",
      },
      {
        type: "p",
        text: "Such information must not be disclosed or used for unauthorised purposes.",
      },
      {
        type: "p",
        text: "Confidentiality obligations may continue after a person's membership, employment, appointment or relationship with the Society ends, subject to applicable law.",
      },
    ],
  },
  {
    title: "20. Member Responsibilities",
    blocks: [
      { type: "p", text: "Members are responsible for:" },
      {
        type: "ul",
        items: [
          "Keeping account passwords and authentication details confidential;",
          "Not sharing login credentials;",
          "Providing accurate information;",
          "Reporting suspected unauthorised access;",
          "Using Society platforms responsibly;",
          "Protecting documents containing personal information; and",
          "Cooperating with reasonable identity verification procedures.",
        ],
      },
      {
        type: "p",
        text: "The Society should be notified promptly if a member suspects that their account or information has been compromised.",
      },
    ],
  },
  {
    title: "21. Links to Third-Party Websites",
    blocks: [
      {
        type: "p",
        text: "Our website or digital platforms may contain links to third-party websites or services.",
      },
      {
        type: "p",
        text: "The Society is not responsible for the privacy practices, security or content of third-party websites.",
      },
      {
        type: "p",
        text: "Members should review the privacy policies of third-party services before providing personal information to them.",
      },
    ],
  },
  {
    title: "22. Changes to This Privacy Policy",
    blocks: [
      {
        type: "p",
        text: "We may update this Privacy Policy periodically to reflect:",
      },
      {
        type: "ul",
        items: [
          "Changes in applicable laws;",
          "Changes in regulatory requirements;",
          "Changes to our services;",
          "Changes to our technology; or",
          "Changes to our data-processing practices.",
        ],
      },
      {
        type: "p",
        text: "Where appropriate, we will notify members of material changes.",
      },
      {
        type: "p",
        text: "The updated version will be published through the Society's appropriate communication channels.",
      },
    ],
  },
  {
    title: "23. Contact and Privacy Complaints",
    blocks: [
      {
        type: "p",
        text: "If you have questions, concerns or complaints regarding this Privacy Policy or the way we handle your personal information, you may contact us:",
      },
      {
        type: "contact",
        lines: [
          "Power Within Women Cooperative Multipurpose Society Ltd.",
          "Registered Address: 1, Magazine Road, ANCE Building, Jericho, Ibadan",
          "Email: contact@pwwefoundation.com",
          "Telephone: +234 802 518 5632",
        ],
      },
      {
        type: "p",
        text: "We will make reasonable efforts to investigate and respond to privacy complaints within an appropriate timeframe.",
      },
    ],
  },
  {
    title: "24. Acknowledgement",
    blocks: [
      {
        type: "p",
        text: "By becoming a member of Power Within Women Cooperative Multipurpose Society Ltd., using our services, or providing personal information to the Society, you acknowledge that you have read and understood this Privacy Policy.",
      },
      {
        type: "p",
        text: "Where consent is legally required, the Society will obtain such consent through an appropriate method.",
      },
    ],
  },
];

const Privacy = () => (
  <LegalPage
    eyebrow="Power Within Women Cooperative Multipurpose Society Ltd."
    title="Privacy Policy"
    lastUpdated="7 September 2026"
    intro="This Privacy Policy explains how Power Within Women Cooperative Multipurpose Society Ltd. collects, uses, stores, protects and discloses personal information about its members, prospective members and others who interact with the Society."
    sections={sections}
  />
);

export default Privacy;
