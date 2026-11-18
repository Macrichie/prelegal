import { Template } from "../../types/template";

export const employmentContract: Template = {
  id: "employment-contract",
  name: "Employment Contract",
  category: "contract",
  description:
    "A standard employment contract outlining the terms and conditions of employment between an employer and employee.",
  variables: [
    {
      name: "employer_name",
      label: "Employer Name",
      type: "text",
      required: true,
      placeholder: "Enter employer/company name",
    },
    {
      name: "employer_address",
      label: "Employer Address",
      type: "address",
      required: true,
      placeholder: "Enter employer address",
    },
    {
      name: "employee_name",
      label: "Employee Name",
      type: "text",
      required: true,
      placeholder: "Enter employee full name",
    },
    {
      name: "employee_address",
      label: "Employee Address",
      type: "address",
      required: true,
      placeholder: "Enter employee address",
    },
    {
      name: "job_title",
      label: "Job Title",
      type: "text",
      required: true,
      placeholder: "e.g., Software Engineer",
    },
    {
      name: "start_date",
      label: "Start Date",
      type: "date",
      required: true,
    },
    {
      name: "salary_amount",
      label: "Annual Salary",
      type: "number",
      required: true,
      placeholder: "e.g., 75000",
    },
    {
      name: "pay_frequency",
      label: "Pay Frequency",
      type: "select",
      required: true,
      options: ["Weekly", "Bi-weekly", "Semi-monthly", "Monthly"],
      defaultValue: "Monthly",
    },
    {
      name: "employment_type",
      label: "Employment Type",
      type: "select",
      required: true,
      options: ["Full-time", "Part-time"],
      defaultValue: "Full-time",
    },
    {
      name: "probation_period",
      label: "Probation Period (months)",
      type: "number",
      required: false,
      defaultValue: "3",
    },
    {
      name: "notice_period",
      label: "Notice Period (weeks)",
      type: "number",
      required: true,
      defaultValue: "2",
    },
    {
      name: "vacation_days",
      label: "Annual Vacation Days",
      type: "number",
      required: true,
      defaultValue: "20",
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
      id: "emp-preamble",
      title: "Preamble",
      content:
        'This Employment Contract ("Agreement") is entered into as of {{start_date}} by and between:\n\n{{employer_name}}, located at {{employer_address}} ("Employer"), and\n\n{{employee_name}}, residing at {{employee_address}} ("Employee").',
      order: 1,
    },
    {
      id: "emp-position",
      title: "Position and Duties",
      content:
        "The Employer agrees to employ the Employee in the position of {{job_title}}. The Employee shall perform all duties and responsibilities associated with this position as may be reasonably assigned by the Employer. The Employee agrees to devote their full professional time, attention, and best efforts to the performance of their duties.\n\nThis is a {{employment_type}} position.",
      order: 2,
    },
    {
      id: "emp-compensation",
      title: "Compensation",
      content:
        "The Employee shall receive an annual salary of ${{salary_amount}}, payable on a {{pay_frequency}} basis, subject to applicable tax withholdings and deductions. The Employer reserves the right to review and adjust compensation at its discretion.",
      order: 3,
    },
    {
      id: "emp-benefits",
      title: "Benefits",
      content:
        "The Employee shall be entitled to the following benefits:\n\n(a) {{vacation_days}} days of paid vacation per year, to be accrued and taken in accordance with company policy;\n(b) Participation in the Employer's health insurance plan, subject to plan terms and eligibility;\n(c) Participation in any retirement or pension plans offered by the Employer;\n(d) Sick leave in accordance with applicable law and company policy;\n(e) Any other benefits as may be offered by the Employer from time to time.",
      order: 4,
    },
    {
      id: "emp-probation",
      title: "Probationary Period",
      content:
        "The Employee's employment shall be subject to a probationary period of {{probation_period}} months from the start date. During this period, either party may terminate this Agreement with one week's written notice. Successful completion of the probationary period does not alter the at-will nature of employment where applicable.",
      order: 5,
    },
    {
      id: "emp-confidentiality",
      title: "Confidentiality",
      content:
        'The Employee agrees to maintain the confidentiality of all proprietary and confidential information of the Employer, including but not limited to trade secrets, business plans, client lists, financial data, and technical information ("Confidential Information"). This obligation shall survive the termination of employment.',
      order: 6,
    },
    {
      id: "emp-termination",
      title: "Termination",
      content:
        "Either party may terminate this Agreement by providing {{notice_period}} weeks' written notice to the other party. The Employer may terminate employment immediately for cause, including but not limited to:\n\n(a) Material breach of this Agreement;\n(b) Gross misconduct or negligence;\n(c) Conviction of a criminal offense;\n(d) Failure to perform duties after written warning.\n\nUpon termination, the Employee shall return all company property and Confidential Information.",
      order: 7,
    },
    {
      id: "emp-non-compete",
      title: "Non-Compete and Non-Solicitation",
      content:
        "For a period of twelve (12) months following termination of employment, the Employee agrees not to:\n\n(a) Engage in any business that directly competes with the Employer within a reasonable geographic area;\n(b) Solicit or attempt to solicit any clients, customers, or employees of the Employer for the purpose of competing with the Employer's business.",
      order: 8,
    },
    {
      id: "emp-governing-law",
      title: "Governing Law",
      content:
        "This Agreement shall be governed by and construed in accordance with the laws of {{governing_law_state}}, without regard to its conflict of law principles.",
      order: 9,
    },
    {
      id: "emp-signatures",
      title: "Signatures",
      content:
        "IN WITNESS WHEREOF, the Parties have executed this Employment Contract as of the date first written above.\n\nEmployer:\nName: {{employer_name}}\nSignature: ___________________________\nDate: {{start_date}}\n\nEmployee:\nName: {{employee_name}}\nSignature: ___________________________\nDate: {{start_date}}",
      order: 10,
    },
  ],
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z",
  version: "1.0.0",
};
