import React from "react";
import LegalPage from "../components/LegalPage";

const sections = [
  {
    title: "1. Introduction",
    blocks: [
      {
        type: "p",
        text: "These Terms & Conditions (“Terms”) govern membership and participation in Power Within Women Cooperative Multipurpose Society Ltd. (“the Society”).",
      },
      {
        type: "p",
        text: "By applying for membership, making contributions, accessing any service, applying for a loan, participating in an investment scheme, or otherwise dealing with the Society as a member, the member acknowledges that they have read, understood, and agreed to be bound by these Terms, the Society’s registered Bye-Laws, applicable policies, resolutions of the General Meeting, and applicable laws and regulations.",
      },
      {
        type: "p",
        text: "Where there is any inconsistency between these Terms and the Society’s registered Bye-Laws or applicable law, the applicable law and registered Bye-Laws shall prevail.",
      },
    ],
  },
  {
    title: "2. Objectives of the Society",
    blocks: [
      {
        type: "p",
        text: "The Society is established to promote the economic and financial welfare of its members through lawful cooperative activities, including:",
      },
      {
        type: "ol",
        items: [
          "Encouraging regular savings and thrift among members.",
          "Providing eligible members with access to loans and credit facilities.",
          "Supporting members in business development and economic empowerment.",
          "Facilitating collective investments and approved income-generating activities.",
          "Supporting housing, asset acquisition, agriculture, trade, and other approved projects.",
          "Providing welfare and mutual-support initiatives where approved.",
          "Undertaking any other lawful activity consistent with the objects of the Society.",
        ],
      },
    ],
  },
  {
    title: "3. Membership",
    blocks: [
      { type: "h3", text: "3.1 Eligibility" },
      {
        type: "p",
        text: "Membership shall be open to persons who satisfy the membership requirements established by the Society and applicable law.",
      },
      { type: "p", text: "An applicant may be required to:" },
      {
        type: "ul",
        items: [
          "Complete the Society’s membership application form.",
          "Provide accurate identification and other required information.",
          "Pay the prescribed registration or entrance fee.",
          "Purchase the required shares, where applicable.",
          "Make the required initial contribution.",
          "Agree to comply with the Society’s Terms, Bye-Laws and policies.",
        ],
      },
      { type: "h3", text: "3.2 Admission" },
      {
        type: "p",
        text: "Submission of an application does not automatically guarantee membership.",
      },
      {
        type: "p",
        text: "The Society may review and approve an application in accordance with its Bye-Laws and applicable regulations.",
      },
      {
        type: "p",
        text: "The Society reserves the right to reject an application where the applicant does not meet the required conditions.",
      },
    ],
  },
  {
    title: "4. Member Information",
    blocks: [
      {
        type: "p",
        text: "Members are responsible for providing accurate and current information to the Society.",
      },
      {
        type: "p",
        text: "A member must promptly notify the Society of any change in:",
      },
      {
        type: "ul",
        items: [
          "Name;",
          "Residential or business address;",
          "Telephone number;",
          "Email address;",
          "Bank details;",
          "Next-of-kin information; or",
          "Any other material information supplied during registration.",
        ],
      },
      {
        type: "p",
        text: "The Society shall not be responsible for losses arising from inaccurate or outdated information supplied by a member.",
      },
    ],
  },
  {
    title: "5. Member Contributions and Savings",
    blocks: [
      {
        type: "p",
        text: "Members shall make contributions, savings, share payments, or other payments in accordance with the applicable membership category and the Society’s approved schedule.",
      },
      {
        type: "p",
        text: "The amount, frequency and nature of contributions may be determined by the Society and communicated to members.",
      },
      {
        type: "p",
        text: "Members are expected to make payments on or before the applicable due date.",
      },
      {
        type: "p",
        text: "Failure to make required payments may affect a member’s eligibility for certain benefits, loans, dividends, withdrawals or other services.",
      },
    ],
  },
  {
    title: "6. Shares",
    blocks: [
      {
        type: "p",
        text: "Where the Society operates a share-capital structure:",
      },
      {
        type: "ol",
        items: [
          "Members shall subscribe for the minimum number of shares prescribed by the Society.",
          "Shares shall be subject to the Society’s Bye-Laws and applicable law.",
          "Shareholding shall not automatically guarantee a loan, investment return or dividend.",
          "Dividends or other distributions shall only be made where lawfully approved and where the Society’s financial position permits.",
          "The transfer, withdrawal or redemption of shares shall be governed by the Society’s Bye-Laws and applicable regulations.",
        ],
      },
    ],
  },
  {
    title: "7. Loans and Credit Facilities",
    blocks: [
      {
        type: "p",
        text: "The Society may provide loans or credit facilities to eligible members subject to available funds, approved policies and applicable rules.",
      },
      { type: "p", text: "A loan application may require:" },
      {
        type: "ul",
        items: [
          "Completed loan application;",
          "Evidence of membership;",
          "Minimum savings or contribution history;",
          "Acceptable guarantors, where applicable;",
          "Appropriate security or collateral, where applicable;",
          "Evidence of ability to repay;",
          "Purpose of the loan; and",
          "Any other documentation required by the Society.",
        ],
      },
      {
        type: "p",
        text: "Approval of a loan application shall be at the discretion of the Society or the authorised committee/body.",
      },
      {
        type: "p",
        text: "The Society is not obligated to approve every loan application.",
      },
    ],
  },
  {
    title: "8. Loan Repayment",
    blocks: [
      {
        type: "p",
        text: "Members shall repay loans according to the repayment schedule communicated at the time of approval.",
      },
      { type: "p", text: "Repayments may include:" },
      {
        type: "ul",
        items: [
          "Principal;",
          "Approved interest or service charges;",
          "Administrative charges;",
          "Penalties for default, where applicable; and",
          "Any other approved charges disclosed to the member.",
        ],
      },
      {
        type: "p",
        text: "A member shall not use a loan for an unlawful purpose or for a purpose materially different from the purpose stated in the application where such restriction applies.",
      },
    ],
  },
  {
    title: "9. Default",
    blocks: [
      { type: "p", text: "A member may be considered in default where the member:" },
      {
        type: "ol",
        items: [
          "Fails to make a required repayment by the due date.",
          "Provides false or misleading information.",
          "Misuses funds provided by the Society.",
          "Provides fraudulent documents.",
          "Breaches the Society’s Bye-Laws or loan agreement.",
          "Becomes unable or unwilling to meet agreed financial obligations.",
        ],
      },
      {
        type: "p",
        text: "Where a member defaults, the Society may, subject to its Bye-Laws and applicable law:",
      },
      {
        type: "ul",
        items: [
          "Issue a demand or reminder;",
          "Charge approved default fees;",
          "Suspend access to certain facilities;",
          "Apply eligible member funds against outstanding obligations;",
          "Call upon guarantors where applicable;",
          "Recover outstanding amounts through lawful means; and/or",
          "Take other permitted recovery measures.",
        ],
      },
    ],
  },
  {
    title: "10. Guarantors",
    blocks: [
      {
        type: "p",
        text: "Where a guarantor is required, the guarantor must satisfy the Society’s eligibility requirements.",
      },
      {
        type: "p",
        text: "A guarantor who voluntarily guarantees a member’s obligation may be liable in accordance with the applicable guarantee agreement, Society rules and law.",
      },
      {
        type: "p",
        text: "The Society may require guarantors to provide identification, financial information or other documentation necessary to establish their eligibility.",
      },
    ],
  },
  {
    title: "11. Withdrawals",
    blocks: [
      {
        type: "p",
        text: "Withdrawals of eligible savings, contributions or other member funds shall be subject to:",
      },
      {
        type: "ul",
        items: [
          "The nature of the particular account or contribution;",
          "The Society’s withdrawal policy;",
          "Any applicable notice period;",
          "Outstanding loans or other obligations;",
          "The Society’s liquidity position; and",
          "Applicable law and the Society’s Bye-Laws.",
        ],
      },
      {
        type: "p",
        text: "Where a member has outstanding obligations to the Society, the Society may apply or set off eligible funds against such obligations to the extent permitted by law and the Society’s governing documents.",
      },
    ],
  },
  {
    title: "12. Investment Activities",
    blocks: [
      {
        type: "p",
        text: "Where the Society undertakes investment activities, members acknowledge that:",
      },
      {
        type: "ol",
        items: [
          "Investments shall only be undertaken through activities approved by the Society.",
          "Any projected return is not automatically guaranteed unless expressly stated as guaranteed under a lawful arrangement.",
          "Investment returns may depend on the performance of the underlying activity.",
          "Members shall be provided with applicable investment terms before committing funds.",
          "The Society shall exercise reasonable care in managing approved investments but shall not be liable for losses arising from ordinary investment or market risks except where caused by fraud, negligence, misconduct or other legally actionable conduct.",
        ],
      },
    ],
  },
  {
    title: "13. Dividends, Bonuses and Surplus",
    blocks: [
      {
        type: "p",
        text: "Where applicable, the Society may distribute dividends, patronage refunds, bonuses or other approved distributions from available surplus.",
      },
      { type: "p", text: "Any distribution shall be subject to:" },
      {
        type: "ul",
        items: [
          "The Society’s financial position;",
          "Audited accounts;",
          "Applicable law;",
          "Regulatory requirements;",
          "The Society’s Bye-Laws; and",
          "Approval by the appropriate governing body or General Meeting.",
        ],
      },
      {
        type: "p",
        text: "Membership does not create an automatic entitlement to a fixed return.",
      },
    ],
  },
  {
    title: "14. Member Rights",
    blocks: [
      {
        type: "p",
        text: "Subject to applicable requirements, a member in good standing may have the right to:",
      },
      {
        type: "ol",
        items: [
          "Attend and participate in General Meetings.",
          "Vote on matters requiring member approval.",
          "Seek election or appointment to eligible positions.",
          "Access Society services available to the member.",
          "Receive information about the Society as permitted by law and the Bye-Laws.",
          "Receive statements or records relating to the member’s account.",
          "Make complaints or raise concerns through the Society’s approved channels.",
        ],
      },
      {
        type: "p",
        text: "The principle of one member, one vote shall apply where prescribed by the Society’s governing framework.",
      },
    ],
  },
  {
    title: "15. Member Responsibilities",
    blocks: [
      { type: "p", text: "Every member shall:" },
      {
        type: "ul",
        items: [
          "Act honestly and in good faith.",
          "Provide accurate information.",
          "Make required payments on time.",
          "Repay loans as agreed.",
          "Comply with the Society’s Terms and Bye-Laws.",
          "Respect other members and Society officials.",
          "Protect confidential Society information.",
          "Avoid conduct capable of damaging the Society’s reputation.",
          "Attend meetings where necessary.",
          "Notify the Society of material changes in personal information.",
        ],
      },
    ],
  },
  {
    title: "16. Management and Governance",
    blocks: [
      {
        type: "p",
        text: "The Society shall be administered through the governing structures established under its registered Bye-Laws and applicable law.",
      },
      {
        type: "p",
        text: "The powers and responsibilities of the Board, Management Committee, Supervisory Committee, officers and other authorised persons shall be determined by the Society’s governing documents.",
      },
      {
        type: "p",
        text: "No individual officer shall have authority to bind the Society beyond the authority granted under the Society’s governing framework.",
      },
    ],
  },
  {
    title: "17. Society Funds",
    blocks: [
      {
        type: "p",
        text: "The Society shall maintain appropriate records of funds received, held, invested and disbursed.",
      },
      {
        type: "p",
        text: "Society funds shall be used only for purposes authorised by:",
      },
      {
        type: "ul",
        items: [
          "Applicable law;",
          "The Society’s registered Bye-Laws;",
          "Approved budgets;",
          "General Meeting resolutions; or",
          "Other properly authorised decisions.",
        ],
      },
    ],
  },
  {
    title: "18. Records and Accounts",
    blocks: [
      {
        type: "p",
        text: "The Society shall maintain appropriate financial and membership records.",
      },
      {
        type: "p",
        text: "Members may request information concerning their individual accounts and other information they are legally entitled to access, subject to reasonable verification and confidentiality requirements.",
      },
      {
        type: "p",
        text: "The Society’s financial accounts shall be prepared and audited or examined as required by applicable law and the Society’s governing framework.",
      },
    ],
  },
  {
    title: "19. Confidentiality and Data Protection",
    blocks: [
      {
        type: "p",
        text: "The Society shall take reasonable steps to protect members’ personal and financial information.",
      },
      {
        type: "p",
        text: "Member information may be used or disclosed where necessary for:",
      },
      {
        type: "ul",
        items: [
          "Providing Society services;",
          "Account administration;",
          "Loan processing;",
          "Verification and compliance;",
          "Auditing;",
          "Legal or regulatory requirements;",
          "Debt recovery; or",
          "Other legitimate purposes permitted by law.",
        ],
      },
      {
        type: "p",
        text: "Members shall also maintain the confidentiality of non-public information obtained through their participation in the Society.",
      },
    ],
  },
  {
    title: "20. Fraud and Misconduct",
    blocks: [
      {
        type: "p",
        text: "The Society maintains a zero-tolerance approach to fraud, theft, misrepresentation, forgery, unauthorised transactions and deliberate misuse of Society funds.",
      },
      {
        type: "p",
        text: "Where there is reasonable evidence of misconduct, the Society may investigate and take appropriate disciplinary, recovery or legal action in accordance with applicable procedures and law.",
      },
    ],
  },
  {
    title: "21. Suspension or Expulsion",
    blocks: [
      {
        type: "p",
        text: "A member may be suspended or expelled in accordance with the Society’s Bye-Laws and applicable law for reasons including:",
      },
      {
        type: "ul",
        items: [
          "Serious breach of the Society’s rules;",
          "Fraud or dishonesty;",
          "Persistent default;",
          "Misappropriation of Society funds;",
          "Providing false information;",
          "Conduct prejudicial to the Society; or",
          "Any other grounds permitted by the Society’s governing documents.",
        ],
      },
      {
        type: "p",
        text: "A member shall be given any notice, hearing or appeal rights required by the applicable rules.",
      },
    ],
  },
  {
    title: "22. Voluntary Withdrawal from Membership",
    blocks: [
      {
        type: "p",
        text: "A member wishing to withdraw from the Society shall submit a written request in the prescribed manner.",
      },
      {
        type: "p",
        text: "Withdrawal shall not automatically extinguish any debt, liability or obligation owed to the Society.",
      },
      {
        type: "p",
        text: "Any amount payable to a withdrawing member shall be calculated and paid in accordance with the Society’s Bye-Laws, applicable policies and applicable law.",
      },
    ],
  },
  {
    title: "23. Death of a Member",
    blocks: [
      {
        type: "p",
        text: "Upon the death of a member, the Society shall deal with the member’s shares, savings, contributions, investments and liabilities in accordance with the Society’s Bye-Laws, applicable nomination arrangements, probate/estate requirements and applicable law.",
      },
      {
        type: "p",
        text: "The Society may require appropriate documentation before releasing funds to an authorised beneficiary, personal representative or estate.",
      },
    ],
  },
  {
    title: "24. Complaints and Dispute Resolution",
    blocks: [
      {
        type: "p",
        text: "Members should first submit complaints or disputes to the Society through its designated complaint-resolution process.",
      },
      {
        type: "p",
        text: "The Society shall make reasonable efforts to resolve disputes amicably.",
      },
      {
        type: "p",
        text: "Where a dispute cannot be resolved internally, it may be referred to the appropriate cooperative authority, mediation, arbitration or court, as required or permitted by applicable law and the Society’s governing documents.",
      },
    ],
  },
  {
    title: "25. Limitation of Liability",
    blocks: [
      {
        type: "p",
        text: "To the extent permitted by law, the Society shall not be liable for losses resulting from:",
      },
      {
        type: "ul",
        items: [
          "Incorrect information supplied by a member;",
          "Unauthorised access caused by the member’s failure to protect account information;",
          "Delays caused by circumstances beyond the Society’s reasonable control;",
          "Ordinary investment risks; or",
          "Actions of third parties beyond the Society’s reasonable control.",
        ],
      },
      {
        type: "p",
        text: "Nothing in these Terms shall exclude or limit liability where such exclusion or limitation is prohibited by law.",
      },
    ],
  },
  {
    title: "26. Force Majeure",
    blocks: [
      {
        type: "p",
        text: "The Society shall not be responsible for delays or failure to perform an obligation where such failure results from circumstances beyond its reasonable control, including natural disasters, governmental restrictions, widespread system failures, civil disturbances, strikes, epidemics, cyber incidents or other exceptional events.",
      },
    ],
  },
  {
    title: "27. Communications",
    blocks: [
      {
        type: "p",
        text: "The Society may communicate with members through approved channels including:",
      },
      {
        type: "ul",
        items: [
          "Email;",
          "Telephone;",
          "SMS;",
          "WhatsApp;",
          "Official website or member portal;",
          "Written notices; and",
          "Other communication channels approved by the Society.",
        ],
      },
      {
        type: "p",
        text: "Members are responsible for ensuring that their contact information remains current.",
      },
    ],
  },
  {
    title: "28. Amendment of These Terms",
    blocks: [
      {
        type: "p",
        text: "The Society may amend these Terms where necessary to reflect changes in its operations, policies, Bye-Laws, regulatory requirements or applicable law.",
      },
      {
        type: "p",
        text: "Where member approval or regulatory approval is required, the Society shall obtain such approval before the amendment takes effect.",
      },
      {
        type: "p",
        text: "Members shall be notified of material amendments through appropriate communication channels.",
      },
    ],
  },
  {
    title: "29. Governing Law",
    blocks: [
      {
        type: "p",
        text: "These Terms shall be governed by the laws applicable to the registration and operation of the Society in Nigeria, including the applicable Cooperative Societies legislation, regulations and the Society’s registered Bye-Laws.",
      },
      {
        type: "p",
        text: "Where the Society is registered in Lagos State, the applicable Lagos State cooperative framework shall apply.",
      },
    ],
  },
  {
    title: "30. Severability",
    blocks: [
      {
        type: "p",
        text: "If any provision of these Terms is found to be invalid, unlawful or unenforceable, that provision shall, to the extent permitted by law, be modified or severed without affecting the validity of the remaining provisions.",
      },
    ],
  },
  {
    title: "31. Entire Agreement",
    blocks: [
      {
        type: "p",
        text: "These Terms, together with the Society’s registered Bye-Laws, membership application, loan agreements, investment agreements, policies and other applicable documents, constitute the framework governing the relationship between the Society and its members.",
      },
      {
        type: "p",
        text: "Where there is a conflict, the applicable law and registered Bye-Laws shall take precedence.",
      },
    ],
  },
  {
    title: "32. Member Acceptance",
    blocks: [
      {
        type: "p",
        text: "By becoming a member of Power Within Women Cooperative Multipurpose Society Ltd., the member confirms that:",
      },
      {
        type: "ul",
        items: [
          "The information supplied to the Society is accurate.",
          "The member has read and understood these Terms.",
          "The member agrees to comply with the Society’s registered Bye-Laws and policies.",
          "The member understands that membership carries financial and other obligations.",
          "The member agrees to comply with lawful decisions of the Society’s authorised governing bodies.",
          "The member understands that access to loans, investments, dividends and other benefits is subject to applicable eligibility requirements.",
        ],
      },
    ],
  },
];

const Terms = () => (
  <LegalPage
    eyebrow="Power Within Women Cooperative Multipurpose Society Ltd."
    title="Terms & Conditions"
    lastUpdated="7 September 2026"
    intro="These Terms & Conditions govern membership and participation in Power Within Women Cooperative Multipurpose Society Ltd. Please read them carefully before applying for membership or using any Society service."
    sections={sections}
  />
);

export default Terms;
