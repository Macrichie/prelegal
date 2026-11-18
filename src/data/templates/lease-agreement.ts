import { Template } from "../../types/template";

export const leaseAgreement: Template = {
  id: "lease-agreement",
  name: "Residential Lease Agreement",
  category: "agreement",
  description:
    "A standard residential lease agreement between a landlord and tenant for rental property.",
  variables: [
    {
      name: "landlord_name",
      label: "Landlord Name",
      type: "text",
      required: true,
      placeholder: "Enter landlord name",
    },
    {
      name: "landlord_address",
      label: "Landlord Address",
      type: "address",
      required: true,
      placeholder: "Enter landlord address",
    },
    {
      name: "tenant_name",
      label: "Tenant Name",
      type: "text",
      required: true,
      placeholder: "Enter tenant name",
    },
    {
      name: "tenant_address",
      label: "Tenant Current Address",
      type: "address",
      required: true,
      placeholder: "Enter tenant current address",
    },
    {
      name: "property_address",
      label: "Rental Property Address",
      type: "address",
      required: true,
      placeholder: "Enter property address",
    },
    {
      name: "lease_start_date",
      label: "Lease Start Date",
      type: "date",
      required: true,
    },
    {
      name: "lease_end_date",
      label: "Lease End Date",
      type: "date",
      required: true,
    },
    {
      name: "monthly_rent",
      label: "Monthly Rent Amount",
      type: "number",
      required: true,
      placeholder: "e.g., 1500",
    },
    {
      name: "security_deposit",
      label: "Security Deposit Amount",
      type: "number",
      required: true,
      placeholder: "e.g., 1500",
    },
    {
      name: "rent_due_day",
      label: "Rent Due Day of Month",
      type: "number",
      required: true,
      defaultValue: "1",
    },
    {
      name: "late_fee_amount",
      label: "Late Fee Amount",
      type: "number",
      required: true,
      defaultValue: "50",
    },
    {
      name: "governing_law_state",
      label: "Governing Law (State/Jurisdiction)",
      type: "text",
      required: true,
      placeholder: "e.g., State of Florida",
    },
  ],
  sections: [
    {
      id: "lease-preamble",
      title: "Preamble",
      content:
        'This Residential Lease Agreement ("Lease") is entered into as of {{lease_start_date}} by and between:\n\n{{landlord_name}}, located at {{landlord_address}} ("Landlord"), and\n\n{{tenant_name}}, currently residing at {{tenant_address}} ("Tenant").',
      order: 1,
    },
    {
      id: "lease-premises",
      title: "Premises",
      content:
        'The Landlord agrees to lease to the Tenant the residential property located at {{property_address}} (the "Premises") for use as a private residence only. The Tenant shall not use the Premises for any commercial or unlawful purpose.',
      order: 2,
    },
    {
      id: "lease-term",
      title: "Lease Term",
      content:
        "The lease term shall commence on {{lease_start_date}} and shall expire on {{lease_end_date}}, unless earlier terminated in accordance with the provisions of this Lease. If the Tenant remains in possession after the expiration of the lease term without a new agreement, the tenancy shall convert to a month-to-month tenancy under the same terms and conditions.",
      order: 3,
    },
    {
      id: "lease-rent",
      title: "Rent",
      content:
        "The Tenant agrees to pay the Landlord monthly rent of ${{monthly_rent}}, due on the {{rent_due_day}}th day of each month. Rent shall be paid by check, bank transfer, or other method agreed upon by the Parties. A late fee of ${{late_fee_amount}} shall be charged for any rent payment received more than five (5) days after the due date.",
      order: 4,
    },
    {
      id: "lease-deposit",
      title: "Security Deposit",
      content:
        "Upon execution of this Lease, the Tenant shall pay a security deposit of ${{security_deposit}} to the Landlord. The security deposit shall be held by the Landlord as security for the faithful performance of the Tenant's obligations. The deposit shall be returned to the Tenant within thirty (30) days after the termination of this Lease and vacation of the Premises, less any deductions for unpaid rent, damages beyond normal wear and tear, or other charges permitted by law.",
      order: 5,
    },
    {
      id: "lease-maintenance",
      title: "Maintenance and Repairs",
      content:
        "The Tenant shall maintain the Premises in a clean and sanitary condition and shall not make any alterations without the prior written consent of the Landlord. The Tenant shall promptly notify the Landlord of any needed repairs or maintenance. The Landlord shall be responsible for structural repairs and maintenance of major systems (plumbing, electrical, heating, and cooling). The Tenant shall be responsible for minor repairs and maintenance caused by the Tenant's negligence or misuse.",
      order: 6,
    },
    {
      id: "lease-utilities",
      title: "Utilities",
      content:
        "The Tenant shall be responsible for the payment of all utilities and services associated with the Premises, including but not limited to electricity, gas, water, sewer, trash collection, internet, and telephone, unless otherwise agreed in writing by the Parties.",
      order: 7,
    },
    {
      id: "lease-termination",
      title: "Termination",
      content:
        "Either Party may terminate this Lease with thirty (30) days' written notice prior to the end of any monthly period. The Landlord may terminate this Lease immediately if the Tenant:\n\n(a) Fails to pay rent within the applicable grace period;\n(b) Violates any term of this Lease;\n(c) Engages in illegal activity on the Premises;\n(d) Causes substantial damage to the Premises.\n\nUpon termination, the Tenant shall vacate the Premises and return all keys to the Landlord.",
      order: 8,
    },
    {
      id: "lease-governing-law",
      title: "Governing Law",
      content:
        "This Lease shall be governed by and construed in accordance with the laws of {{governing_law_state}} and all applicable local ordinances and regulations.",
      order: 9,
    },
    {
      id: "lease-signatures",
      title: "Signatures",
      content:
        "IN WITNESS WHEREOF, the Parties have executed this Residential Lease Agreement as of the date first written above.\n\nLandlord:\nName: {{landlord_name}}\nSignature: ___________________________\nDate: {{lease_start_date}}\n\nTenant:\nName: {{tenant_name}}\nSignature: ___________________________\nDate: {{lease_start_date}}",
      order: 10,
    },
  ],
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z",
  version: "1.0.0",
};
