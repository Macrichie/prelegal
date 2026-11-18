import { Template } from "../../types/template";

export const independentContractor: Template = {
  id: "independent-contractor",
  name: "Independent Contractor Agreement",
  category: "agreement",
  description:
    "An agreement for hiring an independent contractor, clearly defining the contractor relationship and scope of work.",
  variables: [
    {
      name: "company_name",
      label: "Company Name",
      type: "text",
      required: true,
      placeholder: "Enter company name",
    },
    {
      name: "company_address",
      label: "Company Address",
      type: "address",
      required: true,
      placeholder: "Enter company address",
    },
    {
      name: "contractor_name",
      label: "Contractor Name",
      type: "text",
      required: true,
      placeholder: "Enter contractor name",
    },
    {
      name: "contractor_address",
      label: "Contractor Address",
      type: "address",
      required: true,
      placeholder: "Enter contractor address",
    },
    {
      name: "effective_date",
      label: "Effective Date",
      type: "date",
      required: true,
    },
    {
      name: "project_description",
      label: "Project/Work Description",
      type: "text",
      required: true,
      placeholder: "Describe the work to be performed",
    },
    {
      name: "compensation_amount",
      label: "Compensation Amount",
      type: "number",
      required: true,
      placeholder: "e.g., 10000",
    },
    {
      name: "compensation_type",
      label: "Compensation Type",
      type: "select",
      required: true,
      options: ["Fixed fee", "Hourly rate", "Daily rate", "Milestone-based"],
      defaultValue: "Fixed fee",
    },
    {
      name: "contract_end_date",
      label: "Contract End Date",
      type: "date",
      required: true,
    },
    {
      name: "governing_law_state",
      label: "Governing Law (State/Jurisdiction)",
      type: "text",
      required: true,
      placeholder: "e.g., State of Illinois",
    },
  ],
  sections: [
    {
      id: "ic-preamble",
      title: "Preamble",
      content:
        'This Independent Contractor Agreement ("Agreement") is entered into as of {{effective_date}} by and between:\n\n{{company_name}}, located at {{company_address}} ("Company"), and\n\n{{contractor_name}}, located at {{contractor_address}} ("Contractor").',
      order: 1,
    },
    {
      id: "ic-relationship",
      title: "Independent Contractor Relationship",
      content:
        "The Contractor is engaged as an independent contractor and not as an employee, agent, or partner of the Company. Nothing in this Agreement shall be construed to create an employment relationship, partnership, or joint venture. The Contractor shall be solely responsible for all taxes, insurance, and other obligations arising from the Contractor's status as an independent contractor.",
      order: 2,
    },
    {
      id: "ic-scope",
      title: "Scope of Work",
      content:
        "The Contractor agrees to perform the following work:\n\n{{project_description}}\n\nThe Contractor shall have the right to determine the method, manner, and means of performing the services. The Company may provide general direction regarding the goals and objectives of the work but shall not control the specific manner in which the work is performed.",
      order: 3,
    },
    {
      id: "ic-compensation",
      title: "Compensation",
      content:
        "The Company shall pay the Contractor ${{compensation_amount}} ({{compensation_type}}) for the services rendered under this Agreement. The Contractor shall submit invoices for work completed, and the Company shall make payment within thirty (30) days of receipt of a valid invoice. The Contractor is responsible for all expenses incurred in performing the services unless otherwise agreed in writing.",
      order: 4,
    },
    {
      id: "ic-term",
      title: "Term and Termination",
      content:
        "This Agreement shall commence on {{effective_date}} and shall terminate on {{contract_end_date}}, unless earlier terminated as follows:\n\n(a) Either Party may terminate this Agreement with fourteen (14) days' written notice;\n(b) Either Party may terminate immediately upon material breach by the other Party;\n(c) The Company may terminate immediately if the Contractor fails to meet agreed-upon deadlines or quality standards.\n\nUpon termination, the Contractor shall be compensated for work satisfactorily completed prior to the termination date.",
      order: 5,
    },
    {
      id: "ic-ip",
      title: "Intellectual Property",
      content:
        'All work product, inventions, and deliverables created by the Contractor in the course of performing services under this Agreement ("Work Product") shall be considered "work made for hire" and shall be the exclusive property of the Company. To the extent any Work Product does not qualify as work made for hire, the Contractor hereby assigns all rights, title, and interest in such Work Product to the Company.',
      order: 6,
    },
    {
      id: "ic-confidentiality",
      title: "Confidentiality",
      content:
        "The Contractor agrees to maintain the confidentiality of all proprietary and confidential information disclosed by the Company during the term of this Agreement. The Contractor shall not use or disclose such information for any purpose other than the performance of services under this Agreement. This obligation shall survive termination of this Agreement.",
      order: 7,
    },
    {
      id: "ic-indemnification",
      title: "Indemnification",
      content:
        "The Contractor agrees to indemnify and hold harmless the Company from any claims, damages, losses, or expenses, including reasonable attorneys' fees, arising from the Contractor's performance of services under this Agreement or breach of any provision herein.",
      order: 8,
    },
    {
      id: "ic-governing-law",
      title: "Governing Law",
      content:
        "This Agreement shall be governed by and construed in accordance with the laws of {{governing_law_state}}, without regard to its conflict of law principles.",
      order: 9,
    },
    {
      id: "ic-signatures",
      title: "Signatures",
      content:
        "IN WITNESS WHEREOF, the Parties have executed this Independent Contractor Agreement as of the date first written above.\n\nCompany:\nName: {{company_name}}\nSignature: ___________________________\nDate: {{effective_date}}\n\nContractor:\nName: {{contractor_name}}\nSignature: ___________________________\nDate: {{effective_date}}",
      order: 10,
    },
  ],
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z",
  version: "1.0.0",
};
