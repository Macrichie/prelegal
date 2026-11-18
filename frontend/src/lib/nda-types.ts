import { TemplateSection } from "@template-types/template";

export const NDA_TYPES = ["Mutual", "Unilateral", "Multilateral"] as const;
export type NdaType = (typeof NDA_TYPES)[number];

export const NDA_TYPE_LABELS: Record<NdaType, string> = {
  Mutual: "Mutual NDA",
  Unilateral: "Unilateral NDA",
  Multilateral: "Multilateral NDA",
};

export const NDA_TYPE_DESCRIPTIONS: Record<NdaType, string> = {
  Mutual: "Both parties share and protect each other's confidential information.",
  Unilateral: "One party discloses confidential information; the other agrees to protect it.",
  Multilateral: "Three or more parties share and protect each other's confidential information.",
};

export function getDocumentTitle(ndaType: NdaType): string {
  switch (ndaType) {
    case "Mutual":
      return "MUTUAL NON-DISCLOSURE AGREEMENT";
    case "Unilateral":
      return "NON-DISCLOSURE AGREEMENT";
    case "Multilateral":
      return "MULTILATERAL NON-DISCLOSURE AGREEMENT";
  }
}

const sectionOverrides: Record<NdaType, Partial<Record<string, string>>> = {
  Mutual: {
    "nda-preamble":
      'This Mutual Non-Disclosure Agreement ("Agreement") is entered into as of {{effective_date}} by and between:\n\n{{disclosing_party_name}}, located at {{disclosing_party_address}} ("First Party"), and\n\n{{receiving_party_name}}, located at {{receiving_party_address}} ("Second Party").\n\nCollectively referred to as the "Parties." Each Party may disclose and receive Confidential Information under this Agreement.',
    "nda-purpose":
      "The Parties wish to explore a potential business relationship. In connection with this opportunity, each Party may share certain confidential and proprietary information with the other Party. This Agreement is intended to protect such information from unauthorized use or disclosure by either Party.",
    "nda-obligations":
      "Each Party agrees to:\n\n(a) Hold all Confidential Information received from the other Party in strict confidence;\n(b) Not disclose the other Party's Confidential Information to any third party without prior written consent;\n(c) Use the other Party's Confidential Information solely for the purpose of evaluating or pursuing the business relationship between the Parties;\n(d) Take all reasonable measures to protect the secrecy of the other Party's Confidential Information, using at least the same degree of care as it uses to protect its own confidential information;\n(e) Limit access to Confidential Information to those employees, agents, or advisors who need to know such information and who are bound by confidentiality obligations no less restrictive than those contained herein.",
    "nda-term":
      "This Agreement shall remain in effect for a period of {{confidentiality_period}} years from the Effective Date. The obligations of confidentiality shall survive the termination of this Agreement. Upon termination or upon request by either Party, the other Party shall promptly return or destroy all Confidential Information received and any copies thereof.",
    "nda-remedies":
      "Each Party acknowledges that any breach of this Agreement may cause irreparable harm to the other Party, for which monetary damages may be inadequate. Therefore, either Party shall be entitled to seek equitable relief, including injunction and specific performance, in addition to any other remedies available at law or in equity.",
    "nda-signatures":
      "IN WITNESS WHEREOF, the Parties have executed this Mutual Non-Disclosure Agreement as of the date first written above.\n\nFirst Party:\nName: {{disclosing_party_name}}\nSignature: ___________________________\nDate: {{effective_date}}\n\nSecond Party:\nName: {{receiving_party_name}}\nSignature: ___________________________\nDate: {{effective_date}}",
  },
  Unilateral: {
    "nda-preamble":
      'This Non-Disclosure Agreement ("Agreement") is entered into as of {{effective_date}} by and between:\n\n{{disclosing_party_name}}, located at {{disclosing_party_address}} ("Disclosing Party"), and\n\n{{receiving_party_name}}, located at {{receiving_party_address}} ("Receiving Party").\n\nThe Disclosing Party possesses certain confidential information that it wishes to share with the Receiving Party under the terms of this Agreement.',
    "nda-purpose":
      "The Disclosing Party wishes to disclose certain confidential and proprietary information to the Receiving Party for the purpose of evaluating a potential business relationship. The Receiving Party agrees to receive and protect such information in accordance with the terms of this Agreement.",
    "nda-obligations":
      "The Receiving Party agrees to:\n\n(a) Hold all Confidential Information in strict confidence;\n(b) Not disclose Confidential Information to any third party without the prior written consent of the Disclosing Party;\n(c) Use the Confidential Information solely for the purpose of evaluating or pursuing the business relationship between the Parties;\n(d) Take all reasonable measures to protect the secrecy of the Confidential Information, using at least the same degree of care as it uses to protect its own confidential information;\n(e) Limit access to Confidential Information to those employees, agents, or advisors who need to know such information and who are bound by confidentiality obligations no less restrictive than those contained herein.",
    "nda-term":
      "This Agreement shall remain in effect for a period of {{confidentiality_period}} years from the Effective Date. The obligations of confidentiality shall survive the termination of this Agreement. Upon termination or upon request by the Disclosing Party, the Receiving Party shall promptly return or destroy all Confidential Information and any copies thereof.",
    "nda-remedies":
      "The Receiving Party acknowledges that any breach of this Agreement may cause irreparable harm to the Disclosing Party, for which monetary damages may be inadequate. Therefore, the Disclosing Party shall be entitled to seek equitable relief, including injunction and specific performance, in addition to any other remedies available at law or in equity.",
    "nda-signatures":
      "IN WITNESS WHEREOF, the Parties have executed this Non-Disclosure Agreement as of the date first written above.\n\nDisclosing Party:\nName: {{disclosing_party_name}}\nSignature: ___________________________\nDate: {{effective_date}}\n\nReceiving Party:\nName: {{receiving_party_name}}\nSignature: ___________________________\nDate: {{effective_date}}",
  },
  Multilateral: {
    "nda-preamble":
      'This Multilateral Non-Disclosure Agreement ("Agreement") is entered into as of {{effective_date}} by and among:\n\n{{disclosing_party_name}}, located at {{disclosing_party_address}} ("First Party"),\n\n{{receiving_party_name}}, located at {{receiving_party_address}} ("Second Party"), and\n\nany additional parties who execute a joinder to this Agreement (collectively, the "Parties").\n\nEach Party may disclose and receive Confidential Information under this Agreement.',
    "nda-purpose":
      "The Parties wish to explore a potential business relationship involving multiple participants. In connection with this opportunity, each Party may share certain confidential and proprietary information with one or more of the other Parties. This Agreement is intended to protect such information from unauthorized use or disclosure by any Party.",
    "nda-definition":
      '"Confidential Information" means any and all non-public information, in any form or medium, whether written, oral, electronic, or visual, that is disclosed by any Party to any other Party, including but not limited to:\n\n(a) Trade secrets, inventions, patents, copyrights, and other intellectual property;\n(b) Business plans, strategies, forecasts, and financial information;\n(c) Customer lists, supplier information, and marketing data;\n(d) Technical data, designs, algorithms, software, and specifications;\n(e) Any other information designated as confidential or that reasonably should be understood to be confidential.\n\nEach Party\'s Confidential Information remains the property of the disclosing Party.',
    "nda-obligations":
      "Each Party agrees to:\n\n(a) Hold all Confidential Information received from any other Party in strict confidence;\n(b) Not disclose any other Party's Confidential Information to any third party or to other Parties not originally intended to receive such information, without prior written consent of the disclosing Party;\n(c) Use Confidential Information received from any Party solely for the purpose of evaluating or pursuing the business relationship among the Parties;\n(d) Take all reasonable measures to protect the secrecy of each Party's Confidential Information, using at least the same degree of care as it uses to protect its own confidential information;\n(e) Limit access to Confidential Information to those employees, agents, or advisors who need to know such information and who are bound by confidentiality obligations no less restrictive than those contained herein.",
    "nda-term":
      "This Agreement shall remain in effect for a period of {{confidentiality_period}} years from the Effective Date. The obligations of confidentiality shall survive the termination of this Agreement. Any Party may withdraw from this Agreement upon 30 days' written notice to all other Parties, but confidentiality obligations regarding previously disclosed information shall survive. Upon termination or withdrawal, each Party shall promptly return or destroy all Confidential Information received from the other Parties and any copies thereof.",
    "nda-remedies":
      "Each Party acknowledges that any breach of this Agreement may cause irreparable harm to the disclosing Party, for which monetary damages may be inadequate. Therefore, any Party whose Confidential Information has been compromised shall be entitled to seek equitable relief, including injunction and specific performance, in addition to any other remedies available at law or in equity.",
    "nda-signatures":
      "IN WITNESS WHEREOF, the Parties have executed this Multilateral Non-Disclosure Agreement as of the date first written above.\n\nFirst Party:\nName: {{disclosing_party_name}}\nSignature: ___________________________\nDate: {{effective_date}}\n\nSecond Party:\nName: {{receiving_party_name}}\nSignature: ___________________________\nDate: {{effective_date}}\n\nAdditional Party:\nName: ___________________________\nSignature: ___________________________\nDate: ___________________________",
  },
};

export function getSectionsForType(
  baseSections: TemplateSection[],
  ndaType: NdaType
): TemplateSection[] {
  const overrides = sectionOverrides[ndaType];
  return baseSections.map((section) => {
    const overrideContent = overrides[section.id];
    if (overrideContent) {
      return { ...section, content: overrideContent };
    }
    return section;
  });
}
