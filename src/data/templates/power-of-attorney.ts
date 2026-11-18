import { Template } from "../../types/template";

export const powerOfAttorney: Template = {
  id: "power-of-attorney",
  name: "Power of Attorney",
  category: "legal-form",
  description:
    "A general power of attorney authorizing an agent to act on behalf of the principal in legal and financial matters.",
  variables: [
    {
      name: "principal_name",
      label: "Principal Name",
      type: "text",
      required: true,
      placeholder: "Enter the principal's full legal name",
    },
    {
      name: "principal_address",
      label: "Principal Address",
      type: "address",
      required: true,
      placeholder: "Enter the principal's address",
    },
    {
      name: "agent_name",
      label: "Agent Name",
      type: "text",
      required: true,
      placeholder: "Enter the agent's full legal name",
    },
    {
      name: "agent_address",
      label: "Agent Address",
      type: "address",
      required: true,
      placeholder: "Enter the agent's address",
    },
    {
      name: "effective_date",
      label: "Effective Date",
      type: "date",
      required: true,
    },
    {
      name: "poa_type",
      label: "Power of Attorney Type",
      type: "select",
      required: true,
      options: ["General", "Limited", "Durable"],
      defaultValue: "General",
    },
    {
      name: "expiration_date",
      label: "Expiration Date (if applicable)",
      type: "date",
      required: false,
    },
    {
      name: "governing_law_state",
      label: "Governing Law (State/Jurisdiction)",
      type: "text",
      required: true,
      placeholder: "e.g., State of Pennsylvania",
    },
  ],
  sections: [
    {
      id: "poa-declaration",
      title: "Declaration",
      content:
        'I, {{principal_name}}, residing at {{principal_address}} ("Principal"), being of sound mind, do hereby appoint:\n\n{{agent_name}}, residing at {{agent_address}} ("Agent"),\n\nas my true and lawful attorney-in-fact to act on my behalf in the matters described herein.\n\nThis {{poa_type}} Power of Attorney is effective as of {{effective_date}}.',
      order: 1,
    },
    {
      id: "poa-powers",
      title: "Powers Granted",
      content:
        "The Principal grants the Agent the following powers to act on the Principal's behalf:\n\n(a) Financial matters: manage bank accounts, make deposits and withdrawals, pay bills, and conduct financial transactions;\n(b) Real property: buy, sell, lease, manage, and maintain real estate;\n(c) Personal property: buy, sell, and manage personal property and assets;\n(d) Legal proceedings: initiate, defend, or settle legal actions and claims;\n(e) Tax matters: prepare, sign, and file tax returns and handle tax-related communications;\n(f) Government benefits: apply for and manage government benefits and entitlements;\n(g) Business operations: manage business interests, sign contracts, and make business decisions;\n(h) Insurance: obtain, manage, and make claims on insurance policies.",
      order: 2,
    },
    {
      id: "poa-limitations",
      title: "Limitations",
      content:
        "The Agent shall not have the power to:\n\n(a) Make healthcare decisions on behalf of the Principal (unless specifically granted in a separate Healthcare Power of Attorney);\n(b) Change or revoke the Principal's will or trust;\n(c) Transfer the Agent's authority to another person;\n(d) Make gifts of the Principal's property, except as specifically authorized;\n(e) Act in any way that would be contrary to the Principal's known wishes or best interests.",
      order: 3,
    },
    {
      id: "poa-duties",
      title: "Agent's Duties",
      content:
        "The Agent agrees to:\n\n(a) Act in the best interest of the Principal at all times;\n(b) Keep accurate records of all transactions conducted on behalf of the Principal;\n(c) Keep the Principal's property separate from the Agent's own property;\n(d) Act within the scope of authority granted by this document;\n(e) Not engage in self-dealing or conflicts of interest;\n(f) Provide an accounting of actions taken upon reasonable request by the Principal or authorized parties.",
      order: 4,
    },
    {
      id: "poa-durability",
      title: "Durability",
      content:
        "This Power of Attorney shall not be affected by the subsequent disability or incapacity of the Principal, unless otherwise specified. If this is a Durable Power of Attorney, it shall remain in full force and effect regardless of the Principal's subsequent disability or incapacity. If this is a General or Limited Power of Attorney, it shall terminate upon the Principal's incapacity.",
      order: 5,
    },
    {
      id: "poa-revocation",
      title: "Revocation",
      content:
        "The Principal reserves the right to revoke this Power of Attorney at any time by providing written notice to the Agent. Revocation shall be effective upon the Agent's receipt of such notice. The Principal should also notify any third parties who may have relied on this Power of Attorney.",
      order: 6,
    },
    {
      id: "poa-governing-law",
      title: "Governing Law",
      content:
        "This Power of Attorney shall be governed by and construed in accordance with the laws of {{governing_law_state}}.",
      order: 7,
    },
    {
      id: "poa-signatures",
      title: "Signatures",
      content:
        "IN WITNESS WHEREOF, I have executed this Power of Attorney on {{effective_date}}.\n\nPrincipal:\nName: {{principal_name}}\nSignature: ___________________________\nDate: {{effective_date}}\n\nAgent (Acceptance):\nName: {{agent_name}}\nSignature: ___________________________\nDate: {{effective_date}}\n\nWitness 1:\nName: ___________________________\nSignature: ___________________________\nDate: ___________________________\n\nWitness 2:\nName: ___________________________\nSignature: ___________________________\nDate: ___________________________",
      order: 8,
    },
  ],
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z",
  version: "1.0.0",
};
