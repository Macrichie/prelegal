import { Template } from "../../types/template";

export const serviceAgreement: Template = {
  id: "service-agreement",
  name: "Service Agreement",
  category: "agreement",
  description:
    "A general service agreement for engaging a service provider to perform specified services.",
  variables: [
    {
      name: "client_name",
      label: "Client Name",
      type: "text",
      required: true,
      placeholder: "Enter client name",
    },
    {
      name: "client_address",
      label: "Client Address",
      type: "address",
      required: true,
      placeholder: "Enter client address",
    },
    {
      name: "provider_name",
      label: "Service Provider Name",
      type: "text",
      required: true,
      placeholder: "Enter service provider name",
    },
    {
      name: "provider_address",
      label: "Service Provider Address",
      type: "address",
      required: true,
      placeholder: "Enter service provider address",
    },
    {
      name: "effective_date",
      label: "Effective Date",
      type: "date",
      required: true,
    },
    {
      name: "service_description",
      label: "Description of Services",
      type: "text",
      required: true,
      placeholder: "Describe the services to be provided",
    },
    {
      name: "payment_amount",
      label: "Payment Amount",
      type: "number",
      required: true,
      placeholder: "e.g., 5000",
    },
    {
      name: "payment_schedule",
      label: "Payment Schedule",
      type: "select",
      required: true,
      options: [
        "Upon completion",
        "Monthly",
        "Milestone-based",
        "Net 30",
        "Net 60",
      ],
      defaultValue: "Upon completion",
    },
    {
      name: "contract_duration",
      label: "Contract Duration (months)",
      type: "number",
      required: true,
      defaultValue: "12",
    },
    {
      name: "governing_law_state",
      label: "Governing Law (State/Jurisdiction)",
      type: "text",
      required: true,
      placeholder: "e.g., State of Texas",
    },
  ],
  sections: [
    {
      id: "svc-preamble",
      title: "Preamble",
      content:
        'This Service Agreement ("Agreement") is entered into as of {{effective_date}} by and between:\n\n{{client_name}}, located at {{client_address}} ("Client"), and\n\n{{provider_name}}, located at {{provider_address}} ("Service Provider").',
      order: 1,
    },
    {
      id: "svc-scope",
      title: "Scope of Services",
      content:
        "The Service Provider agrees to perform the following services for the Client:\n\n{{service_description}}\n\nThe Service Provider shall perform the services in a professional and workmanlike manner, in accordance with generally accepted industry standards and practices.",
      order: 2,
    },
    {
      id: "svc-compensation",
      title: "Compensation",
      content:
        "The Client agrees to pay the Service Provider ${{payment_amount}} for the services rendered under this Agreement. Payment shall be made on a {{payment_schedule}} basis. The Service Provider shall submit invoices detailing the services performed. Payment is due within thirty (30) days of receipt of a valid invoice, unless otherwise specified.",
      order: 3,
    },
    {
      id: "svc-term",
      title: "Term",
      content:
        "This Agreement shall commence on {{effective_date}} and shall remain in effect for a period of {{contract_duration}} months, unless earlier terminated in accordance with the provisions of this Agreement. The Agreement may be renewed by mutual written consent of both Parties.",
      order: 4,
    },
    {
      id: "svc-termination",
      title: "Termination",
      content:
        "Either Party may terminate this Agreement:\n\n(a) With thirty (30) days' written notice to the other Party;\n(b) Immediately upon material breach by the other Party, if such breach remains uncured for fifteen (15) days after written notice;\n(c) Immediately if the other Party becomes insolvent or files for bankruptcy.\n\nUpon termination, the Client shall pay for all services satisfactorily performed up to the date of termination.",
      order: 5,
    },
    {
      id: "svc-ip",
      title: "Intellectual Property",
      content:
        "All work product, deliverables, and materials created by the Service Provider in the performance of services under this Agreement shall be the property of the Client upon full payment. The Service Provider assigns all rights, title, and interest in such work product to the Client.",
      order: 6,
    },
    {
      id: "svc-confidentiality",
      title: "Confidentiality",
      content:
        "Each Party agrees to hold in confidence all confidential information received from the other Party during the term of this Agreement. Confidential information shall not be disclosed to any third party without the prior written consent of the disclosing Party. This obligation shall survive termination of this Agreement for a period of two (2) years.",
      order: 7,
    },
    {
      id: "svc-liability",
      title: "Limitation of Liability",
      content:
        "Neither Party shall be liable to the other for any indirect, incidental, consequential, special, or exemplary damages arising out of or related to this Agreement, regardless of whether such damages are foreseeable. The Service Provider's total liability under this Agreement shall not exceed the total amount paid by the Client under this Agreement.",
      order: 8,
    },
    {
      id: "svc-governing-law",
      title: "Governing Law",
      content:
        "This Agreement shall be governed by and construed in accordance with the laws of {{governing_law_state}}, without regard to its conflict of law principles.",
      order: 9,
    },
    {
      id: "svc-signatures",
      title: "Signatures",
      content:
        "IN WITNESS WHEREOF, the Parties have executed this Service Agreement as of the date first written above.\n\nClient:\nName: {{client_name}}\nSignature: ___________________________\nDate: {{effective_date}}\n\nService Provider:\nName: {{provider_name}}\nSignature: ___________________________\nDate: {{effective_date}}",
      order: 10,
    },
  ],
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z",
  version: "1.0.0",
};
