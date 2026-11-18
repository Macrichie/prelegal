import { Template } from "../../types/template";

export const nda: Template = {
  id: "nda",
  name: "Non-Disclosure Agreement",
  category: "agreement",
  description:
    "A standard non-disclosure agreement to protect confidential information shared between parties.",
  variables: [
    {
      name: "disclosing_party_name",
      label: "Disclosing Party Name",
      type: "text",
      required: true,
      placeholder: "Enter the name of the disclosing party",
    },
    {
      name: "disclosing_party_address",
      label: "Disclosing Party Address",
      type: "address",
      required: true,
      placeholder: "Enter the address of the disclosing party",
    },
    {
      name: "receiving_party_name",
      label: "Receiving Party Name",
      type: "text",
      required: true,
      placeholder: "Enter the name of the receiving party",
    },
    {
      name: "receiving_party_address",
      label: "Receiving Party Address",
      type: "address",
      required: true,
      placeholder: "Enter the address of the receiving party",
    },
    {
      name: "effective_date",
      label: "Effective Date",
      type: "date",
      required: true,
    },
    {
      name: "confidentiality_period",
      label: "Confidentiality Period (years)",
      type: "number",
      required: true,
      defaultValue: "2",
    },
    {
      name: "governing_law_state",
      label: "Governing Law (State/Jurisdiction)",
      type: "text",
      required: true,
      placeholder: "e.g., State of California",
    },
    {
      name: "nda_type",
      label: "NDA Type",
      type: "select",
      required: true,
      options: ["Mutual", "Unilateral"],
      defaultValue: "Mutual",
    },
  ],
  sections: [
    {
      id: "nda-preamble",
      title: "Preamble",
      content:
        'This Non-Disclosure Agreement ("Agreement") is entered into as of {{effective_date}} by and between:\n\n{{disclosing_party_name}}, located at {{disclosing_party_address}} ("Disclosing Party"), and\n\n{{receiving_party_name}}, located at {{receiving_party_address}} ("Receiving Party").\n\nCollectively referred to as the "Parties."',
      order: 1,
    },
    {
      id: "nda-purpose",
      title: "Purpose",
      content:
        "The Parties wish to explore a potential business relationship. In connection with this opportunity, the Disclosing Party may share certain confidential and proprietary information with the Receiving Party. This Agreement is intended to protect such information from unauthorized use or disclosure.",
      order: 2,
    },
    {
      id: "nda-definition",
      title: "Definition of Confidential Information",
      content:
        '"Confidential Information" means any and all non-public information, in any form or medium, whether written, oral, electronic, or visual, that is disclosed by the Disclosing Party to the Receiving Party, including but not limited to:\n\n(a) Trade secrets, inventions, patents, copyrights, and other intellectual property;\n(b) Business plans, strategies, forecasts, and financial information;\n(c) Customer lists, supplier information, and marketing data;\n(d) Technical data, designs, algorithms, software, and specifications;\n(e) Any other information designated as confidential or that reasonably should be understood to be confidential.',
      order: 3,
    },
    {
      id: "nda-obligations",
      title: "Obligations of the Receiving Party",
      content:
        "The Receiving Party agrees to:\n\n(a) Hold all Confidential Information in strict confidence;\n(b) Not disclose Confidential Information to any third party without the prior written consent of the Disclosing Party;\n(c) Use the Confidential Information solely for the purpose of evaluating or pursuing the business relationship between the Parties;\n(d) Take all reasonable measures to protect the secrecy of the Confidential Information, using at least the same degree of care as it uses to protect its own confidential information;\n(e) Limit access to Confidential Information to those employees, agents, or advisors who need to know such information and who are bound by confidentiality obligations no less restrictive than those contained herein.",
      order: 4,
    },
    {
      id: "nda-exclusions",
      title: "Exclusions from Confidential Information",
      content:
        "The obligations of this Agreement shall not apply to information that:\n\n(a) Is or becomes publicly available through no fault of the Receiving Party;\n(b) Was already known to the Receiving Party prior to disclosure, as demonstrated by written records;\n(c) Is independently developed by the Receiving Party without reference to the Confidential Information;\n(d) Is rightfully received from a third party without restriction on disclosure;\n(e) Is required to be disclosed by law, regulation, or court order, provided the Receiving Party gives prompt written notice to the Disclosing Party.",
      order: 5,
    },
    {
      id: "nda-term",
      title: "Term and Termination",
      content:
        "This Agreement shall remain in effect for a period of {{confidentiality_period}} years from the Effective Date. The obligations of confidentiality shall survive the termination of this Agreement. Upon termination or upon request by the Disclosing Party, the Receiving Party shall promptly return or destroy all Confidential Information and any copies thereof.",
      order: 6,
    },
    {
      id: "nda-remedies",
      title: "Remedies",
      content:
        "The Receiving Party acknowledges that any breach of this Agreement may cause irreparable harm to the Disclosing Party, for which monetary damages may be inadequate. Therefore, the Disclosing Party shall be entitled to seek equitable relief, including injunction and specific performance, in addition to any other remedies available at law or in equity.",
      order: 7,
    },
    {
      id: "nda-governing-law",
      title: "Governing Law",
      content:
        "This Agreement shall be governed by and construed in accordance with the laws of {{governing_law_state}}, without regard to its conflict of law principles.",
      order: 8,
    },
    {
      id: "nda-signatures",
      title: "Signatures",
      content:
        "IN WITNESS WHEREOF, the Parties have executed this Non-Disclosure Agreement as of the date first written above.\n\nDisclosing Party:\nName: {{disclosing_party_name}}\nSignature: ___________________________\nDate: {{effective_date}}\n\nReceiving Party:\nName: {{receiving_party_name}}\nSignature: ___________________________\nDate: {{effective_date}}",
      order: 9,
    },
  ],
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z",
  version: "1.0.0",
};
