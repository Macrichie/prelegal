import { Template } from "../../types/template";

export const letterOfIntent: Template = {
  id: "letter-of-intent",
  name: "Letter of Intent",
  category: "letter",
  description:
    "A letter of intent expressing the preliminary commitment of parties to enter into a future agreement or transaction.",
  variables: [
    {
      name: "sender_name",
      label: "Sender Name",
      type: "text",
      required: true,
      placeholder: "Enter sender name or company name",
    },
    {
      name: "sender_address",
      label: "Sender Address",
      type: "address",
      required: true,
      placeholder: "Enter sender address",
    },
    {
      name: "recipient_name",
      label: "Recipient Name",
      type: "text",
      required: true,
      placeholder: "Enter recipient name or company name",
    },
    {
      name: "recipient_address",
      label: "Recipient Address",
      type: "address",
      required: true,
      placeholder: "Enter recipient address",
    },
    {
      name: "letter_date",
      label: "Letter Date",
      type: "date",
      required: true,
    },
    {
      name: "transaction_description",
      label: "Transaction/Deal Description",
      type: "text",
      required: true,
      placeholder: "Describe the proposed transaction or agreement",
    },
    {
      name: "proposed_terms",
      label: "Key Proposed Terms",
      type: "text",
      required: true,
      placeholder: "Outline the main terms of the proposed deal",
    },
    {
      name: "exclusivity_period_days",
      label: "Exclusivity Period (days)",
      type: "number",
      required: false,
      defaultValue: "30",
    },
    {
      name: "due_diligence_period_days",
      label: "Due Diligence Period (days)",
      type: "number",
      required: false,
      defaultValue: "60",
    },
    {
      name: "target_closing_date",
      label: "Target Closing Date",
      type: "date",
      required: false,
    },
    {
      name: "governing_law_state",
      label: "Governing Law (State/Jurisdiction)",
      type: "text",
      required: true,
      placeholder: "e.g., State of New York",
    },
  ],
  sections: [
    {
      id: "loi-header",
      title: "Header",
      content:
        "{{letter_date}}\n\n{{recipient_name}}\n{{recipient_address}}\n\nRe: Letter of Intent - {{transaction_description}}",
      order: 1,
    },
    {
      id: "loi-opening",
      title: "Opening",
      content:
        "Dear {{recipient_name}},\n\nThis Letter of Intent sets forth the principal terms upon which {{sender_name}} proposes to enter into a transaction with {{recipient_name}}. This letter is intended to express the mutual interest of both parties in pursuing the transaction described below and to establish a framework for further negotiations.",
      order: 2,
    },
    {
      id: "loi-transaction",
      title: "Proposed Transaction",
      content:
        "{{sender_name}} proposes the following transaction:\n\n{{transaction_description}}\n\nThe key terms of the proposed transaction are as follows:\n\n{{proposed_terms}}",
      order: 3,
    },
    {
      id: "loi-due-diligence",
      title: "Due Diligence",
      content:
        "The completion of the proposed transaction is subject to satisfactory due diligence by both parties. Each party shall have a period of {{due_diligence_period_days}} days from the date of this letter to conduct due diligence, including but not limited to review of financial records, contracts, legal matters, and any other material information. Each party agrees to cooperate fully and provide reasonable access to information requested during the due diligence period.",
      order: 4,
    },
    {
      id: "loi-exclusivity",
      title: "Exclusivity",
      content:
        "For a period of {{exclusivity_period_days}} days from the date of this letter, {{recipient_name}} agrees not to solicit, negotiate, or enter into any agreement with any third party regarding a transaction similar to the one contemplated herein. This exclusivity provision is intended to be binding upon the parties.",
      order: 5,
    },
    {
      id: "loi-confidentiality",
      title: "Confidentiality",
      content:
        "Both parties agree to maintain the confidentiality of the terms of this Letter of Intent and all information exchanged in connection with the proposed transaction. Neither party shall disclose such information to any third party without the prior written consent of the other party, except as required by law. This confidentiality provision is intended to be binding upon the parties.",
      order: 6,
    },
    {
      id: "loi-conditions",
      title: "Conditions Precedent",
      content:
        "The completion of the proposed transaction shall be subject to the following conditions:\n\n(a) Satisfactory completion of due diligence by both parties;\n(b) Negotiation and execution of a definitive agreement;\n(c) Obtaining all necessary regulatory approvals and consents;\n(d) Accuracy of all representations and warranties;\n(e) No material adverse change in the condition of either party.",
      order: 7,
    },
    {
      id: "loi-non-binding",
      title: "Non-Binding Nature",
      content:
        "Except for the provisions regarding Exclusivity, Confidentiality, and Governing Law, this Letter of Intent is not intended to create any binding obligations on either party. The proposed transaction shall only become binding upon the execution of a definitive agreement acceptable to both parties. Either party may terminate discussions at any time prior to the execution of a definitive agreement.",
      order: 8,
    },
    {
      id: "loi-governing-law",
      title: "Governing Law",
      content:
        "This Letter of Intent and any binding provisions herein shall be governed by and construed in accordance with the laws of {{governing_law_state}}, without regard to its conflict of law principles.",
      order: 9,
    },
    {
      id: "loi-closing",
      title: "Closing",
      content:
        "If the foregoing terms are acceptable, please indicate your agreement by signing and returning a copy of this letter. We look forward to working with you on this transaction.\n\nSincerely,\n\n{{sender_name}}\n{{sender_address}}\n\nACCEPTED AND AGREED:\n\n{{recipient_name}}\nSignature: ___________________________\nDate: ___________________________",
      order: 10,
    },
  ],
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z",
  version: "1.0.0",
};
