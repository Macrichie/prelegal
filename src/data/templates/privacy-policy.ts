import { Template } from "../../types/template";

export const privacyPolicy: Template = {
  id: "privacy-policy",
  name: "Privacy Policy",
  category: "policy",
  description:
    "A comprehensive privacy policy template for websites and applications, addressing data collection, use, and protection.",
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
      name: "contact_email",
      label: "Privacy Contact Email",
      type: "email",
      required: true,
      placeholder: "e.g., privacy@example.com",
    },
    {
      name: "company_address",
      label: "Company Address",
      type: "address",
      required: true,
      placeholder: "Enter company address",
    },
    {
      name: "effective_date",
      label: "Effective Date",
      type: "date",
      required: true,
    },
    {
      name: "data_retention_period",
      label: "Data Retention Period",
      type: "text",
      required: true,
      placeholder: "e.g., 3 years",
      defaultValue: "3 years",
    },
    {
      name: "governing_law_state",
      label: "Governing Law (State/Jurisdiction)",
      type: "text",
      required: true,
      placeholder: "e.g., State of California",
    },
  ],
  sections: [
    {
      id: "pp-intro",
      title: "Introduction",
      content:
        '{{company_name}} ("Company", "we", "us", or "our") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit {{website_url}} or use our services.\n\nThis Privacy Policy is effective as of {{effective_date}}. By using our services, you consent to the practices described in this policy.',
      order: 1,
    },
    {
      id: "pp-collection",
      title: "Information We Collect",
      content:
        "We may collect the following types of information:\n\nPersonal Information You Provide:\n(a) Name, email address, phone number, and mailing address;\n(b) Account credentials (username and password);\n(c) Payment and billing information;\n(d) Any other information you choose to provide.\n\nInformation Collected Automatically:\n(a) IP address, browser type, and operating system;\n(b) Pages visited, time spent on pages, and navigation patterns;\n(c) Device identifiers and mobile network information;\n(d) Cookies and similar tracking technologies.",
      order: 2,
    },
    {
      id: "pp-use",
      title: "How We Use Your Information",
      content:
        "We use the information we collect for the following purposes:\n\n(a) To provide, maintain, and improve our services;\n(b) To process transactions and send related information;\n(c) To send you technical notices, updates, and support messages;\n(d) To respond to your comments, questions, and customer service requests;\n(e) To communicate with you about products, services, and events;\n(f) To monitor and analyze trends, usage, and activities;\n(g) To detect, investigate, and prevent fraudulent transactions and other illegal activities;\n(h) To comply with legal obligations.",
      order: 3,
    },
    {
      id: "pp-sharing",
      title: "How We Share Your Information",
      content:
        "We may share your personal information in the following circumstances:\n\n(a) With service providers who perform services on our behalf;\n(b) To comply with legal obligations or respond to lawful requests;\n(c) To protect the rights, property, or safety of {{company_name}}, our users, or the public;\n(d) In connection with a merger, acquisition, or sale of assets;\n(e) With your consent or at your direction.\n\nWe do not sell your personal information to third parties.",
      order: 4,
    },
    {
      id: "pp-cookies",
      title: "Cookies and Tracking Technologies",
      content:
        "We use cookies and similar tracking technologies to collect and track information about your use of our services. Cookies are small data files stored on your device. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our services.\n\nTypes of cookies we use:\n(a) Essential cookies: necessary for the operation of our services;\n(b) Analytics cookies: help us understand how visitors interact with our services;\n(c) Preference cookies: remember your settings and preferences.",
      order: 5,
    },
    {
      id: "pp-retention",
      title: "Data Retention",
      content:
        "We retain your personal information for as long as necessary to fulfill the purposes for which it was collected, typically for a period of {{data_retention_period}}, unless a longer retention period is required or permitted by law. When we no longer need your personal information, we will securely delete or anonymize it.",
      order: 6,
    },
    {
      id: "pp-security",
      title: "Data Security",
      content:
        "We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to protect your personal information, we cannot guarantee its absolute security.",
      order: 7,
    },
    {
      id: "pp-rights",
      title: "Your Rights",
      content:
        "Depending on your location, you may have the following rights regarding your personal information:\n\n(a) Right to access: request a copy of the personal information we hold about you;\n(b) Right to rectification: request correction of inaccurate or incomplete information;\n(c) Right to erasure: request deletion of your personal information;\n(d) Right to restrict processing: request that we limit how we use your information;\n(e) Right to data portability: request a copy of your data in a structured, machine-readable format;\n(f) Right to object: object to our processing of your personal information;\n(g) Right to withdraw consent: withdraw your consent at any time.\n\nTo exercise any of these rights, please contact us at {{contact_email}}.",
      order: 8,
    },
    {
      id: "pp-children",
      title: "Children's Privacy",
      content:
        "Our services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information promptly.",
      order: 9,
    },
    {
      id: "pp-changes",
      title: "Changes to This Policy",
      content:
        "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the effective date. You are advised to review this Privacy Policy periodically for any changes. Your continued use of our services after any changes constitutes acceptance of the updated policy.",
      order: 10,
    },
    {
      id: "pp-contact",
      title: "Contact Us",
      content:
        "If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:\n\n{{company_name}}\n{{company_address}}\nEmail: {{contact_email}}",
      order: 11,
    },
  ],
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z",
  version: "1.0.0",
};
