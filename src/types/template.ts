export interface TemplateVariable {
  name: string;
  label: string;
  type: "text" | "date" | "number" | "email" | "address" | "select";
  required: boolean;
  placeholder?: string;
  options?: string[];
  defaultValue?: string;
}

export interface TemplateSection {
  id: string;
  title: string;
  content: string;
  order: number;
}

export interface Template {
  id: string;
  name: string;
  category: "contract" | "agreement" | "letter" | "policy" | "legal-form";
  description: string;
  variables: TemplateVariable[];
  sections: TemplateSection[];
  createdAt: string;
  updatedAt: string;
  version: string;
}
