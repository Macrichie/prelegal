import { Template } from "../../types/template";

export const termsOfService: Template = {
  id: "terms-of-service",
  name: "Terms of Service",
  category: "policy",
  description:
    "Standard terms of service for a website or application, defining the rules and guidelines for users.",
  variables: [
    {
      name: "company_name",
      label: "Company Name",
      type: "text",
      required: true,
      placeholder: "Enter your company name",
    },
    {
      name: "website_url",
      label: "Website URL",
      type: "text",
      required: true,
      placeholder: "e.g., www.example.com",
    },
    {
      name: "service_description",
      label: "Service Description",
      type: "text",
      required: true,
      placeholder: "Brief description of your service",
    },
    {
      name: "contact_email",
      label: "Contact Email",
      type: "email",
      required: true,
      placeholder: "e.g., legal@example.com",
    },
    {
      name: "effective_date",
      label: "Effective Date",
      type: "date",
      required: true,
    },
    {
      name: "minimum_age",
      label: "Minimum User Age",
      type: "number",
      required: true,
      defaultValue: "18",
    },
    {
      name: "governing_law_state",
      label: "Governing Law (State/Jurisdiction)",
      type: "text",
      required: true,
      placeholder: "e.g., State of Delaware",
    },
  ],
  sections: [
    {
      id: "tos-intro",
      title: "Introduction",
      content:
        'Welcome to {{company_name}} ("Company", "we", "us", or "our"). These Terms of Service ("Terms") govern your access to and use of {{website_url}} and any related services provided by the Company (collectively, the "Service").\n\nBy accessing or using the Service, you agree to be bound by these Terms. If you do not agree to these Terms, you must not access or use the Service.\n\nThese Terms are effective as of {{effective_date}}.',
      order: 1,
    },
    {
      id: "tos-eligibility",
      title: "Eligibility",
      content:
        "You must be at least {{minimum_age}} years of age to use the Service. By using the Service, you represent and warrant that you meet this age requirement and have the legal capacity to enter into these Terms. If you are using the Service on behalf of an organization, you represent that you have the authority to bind that organization to these Terms.",
      order: 2,
    },
    {
      id: "tos-description",
      title: "Description of Service",
      content:
        "{{company_name}} provides the following services: {{service_description}}. The Company reserves the right to modify, suspend, or discontinue the Service, or any part thereof, at any time with or without notice. The Company shall not be liable to you or any third party for any modification, suspension, or discontinuation of the Service.",
      order: 3,
    },
    {
      id: "tos-accounts",
      title: "User Accounts",
      content:
        "To access certain features of the Service, you may be required to create an account. You agree to:\n\n(a) Provide accurate, current, and complete information during registration;\n(b) Maintain and update your information to keep it accurate;\n(c) Maintain the security and confidentiality of your login credentials;\n(d) Accept responsibility for all activities that occur under your account;\n(e) Notify the Company immediately of any unauthorized use of your account.\n\nThe Company reserves the right to suspend or terminate your account if any information provided is inaccurate, misleading, or incomplete.",
      order: 4,
    },
    {
      id: "tos-acceptable-use",
      title: "Acceptable Use",
      content:
        "You agree not to use the Service to:\n\n(a) Violate any applicable law, regulation, or these Terms;\n(b) Infringe upon the intellectual property or other rights of any third party;\n(c) Upload or transmit viruses, malware, or other harmful code;\n(d) Engage in any activity that disrupts or interferes with the Service;\n(e) Attempt to gain unauthorized access to any part of the Service;\n(f) Collect or harvest personal information of other users without consent;\n(g) Use the Service for any illegal, fraudulent, or unauthorized purpose.",
      order: 5,
    },
    {
      id: "tos-ip",
      title: "Intellectual Property",
      content:
        "The Service and all content, features, and functionality thereof, including but not limited to text, graphics, logos, icons, images, and software, are the exclusive property of {{company_name}} or its licensors and are protected by copyright, trademark, and other intellectual property laws. You are granted a limited, non-exclusive, non-transferable license to access and use the Service for personal, non-commercial purposes.",
      order: 6,
    },
    {
      id: "tos-disclaimer",
      title: "Disclaimer of Warranties",
      content:
        'THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. THE COMPANY DOES NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE.',
      order: 7,
    },
    {
      id: "tos-liability",
      title: "Limitation of Liability",
      content:
        "TO THE MAXIMUM EXTENT PERMITTED BY LAW, {{company_name}} SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF YOUR USE OF OR INABILITY TO USE THE SERVICE.",
      order: 8,
    },
    {
      id: "tos-termination",
      title: "Termination",
      content:
        "The Company may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason, including if you breach these Terms. Upon termination, your right to use the Service will immediately cease. All provisions of these Terms that by their nature should survive termination shall survive.",
      order: 9,
    },
    {
      id: "tos-governing-law",
      title: "Governing Law",
      content:
        "These Terms shall be governed by and construed in accordance with the laws of {{governing_law_state}}, without regard to its conflict of law principles. Any legal action or proceeding arising under these Terms shall be brought exclusively in the courts located in {{governing_law_state}}.",
      order: 10,
    },
    {
      id: "tos-contact",
      title: "Contact Information",
      content:
        "If you have any questions about these Terms of Service, please contact us at {{contact_email}}.",
      order: 11,
    },
  ],
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z",
  version: "1.0.0",
};
