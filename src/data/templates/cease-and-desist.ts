import { Template } from "../../types/template";

export const ceaseAndDesist: Template = {
  id: "cease-and-desist",
  name: "Cease and Desist Letter",
  category: "letter",
  description:
    "A formal cease and desist letter demanding that a party stop a specified activity that infringes on rights or violates an agreement.",
  variables: [
    {
      name: "sender_name",
      label: "Sender Name",
      type: "text",
      required: true,
      placeholder: "Enter your name or company name",
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
      name: "infringement_type",
      label: "Type of Infringement",
      type: "select",
      required: true,
      options: [
        "Copyright infringement",
        "Trademark infringement",
        "Patent infringement",
        "Breach of contract",
        "Defamation",
        "Harassment",
        "Other",
      ],
    },
    {
      name: "infringement_description",
      label: "Description of Infringing Activity",
      type: "text",
      required: true,
      placeholder: "Describe the specific activity that must cease",
    },
    {
      name: "compliance_deadline_days",
      label: "Compliance Deadline (days)",
      type: "number",
      required: true,
      defaultValue: "14",
    },
  ],
  sections: [
    {
      id: "cd-header",
      title: "Header",
      content:
        "{{letter_date}}\n\nVIA CERTIFIED MAIL\n\n{{recipient_name}}\n{{recipient_address}}\n\nRe: Cease and Desist - {{infringement_type}}",
      order: 1,
    },
    {
      id: "cd-opening",
      title: "Opening",
      content:
        "Dear {{recipient_name}},\n\nThis letter serves as a formal notice and demand that you immediately cease and desist the following activity: {{infringement_description}}.\n\nI am writing on behalf of {{sender_name}}, located at {{sender_address}}.",
      order: 2,
    },
    {
      id: "cd-facts",
      title: "Statement of Facts",
      content:
        "It has come to our attention that you have engaged in {{infringement_type}} by way of the activity described above. This activity is unlawful and constitutes a violation of our rights. We have documented evidence of this activity and are prepared to present such evidence in legal proceedings if necessary.",
      order: 3,
    },
    {
      id: "cd-legal-basis",
      title: "Legal Basis",
      content:
        "The aforementioned activity violates applicable laws and may give rise to significant legal liability on your part, including but not limited to:\n\n(a) Actual damages suffered by {{sender_name}};\n(b) Statutory damages as provided by law;\n(c) Injunctive relief;\n(d) Recovery of attorneys' fees and costs of litigation.\n\nWe reserve all rights and remedies available under the law.",
      order: 4,
    },
    {
      id: "cd-demands",
      title: "Demands",
      content:
        "We hereby demand that you:\n\n(a) Immediately cease and desist all activity described above;\n(b) Confirm in writing within {{compliance_deadline_days}} days of receipt of this letter that you have complied with these demands;\n(c) Provide written assurance that you will not engage in such activity in the future;\n(d) Preserve all documents, communications, and materials related to the activity described herein.",
      order: 5,
    },
    {
      id: "cd-consequences",
      title: "Consequences of Non-Compliance",
      content:
        "If you fail to comply with the demands set forth in this letter within {{compliance_deadline_days}} days of receipt, we will have no choice but to pursue all available legal remedies, including but not limited to filing a lawsuit seeking damages, injunctive relief, and attorneys' fees. This letter is not intended to be a complete statement of the facts or law related to this matter, and nothing herein should be construed as a waiver of any rights or remedies.",
      order: 6,
    },
    {
      id: "cd-closing",
      title: "Closing",
      content:
        "We trust that you will give this matter your immediate and serious attention and comply with these demands promptly.\n\nSincerely,\n\n{{sender_name}}\n{{sender_address}}",
      order: 7,
    },
  ],
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z",
  version: "1.0.0",
};
