"use client";

import { TemplateVariable } from "@template-types/template";
import {
  NDA_TYPES,
  NDA_TYPE_LABELS,
  NDA_TYPE_DESCRIPTIONS,
  NdaType,
} from "@/lib/nda-types";

interface NdaFormProps {
  variables: TemplateVariable[];
  values: Record<string, string>;
  onChange: (name: string, value: string) => void;
}

export default function NdaForm({ variables, values, onChange }: NdaFormProps) {
  const formVariables = variables.filter((v) => v.name !== "nda_type");
  const selectedType = (values["nda_type"] || "Mutual") as NdaType;

  return (
    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
      <h2 className="text-xl font-semibold text-slate-800 mb-4">
        NDA Details
      </h2>

      <div>
        <label
          htmlFor="nda_type"
          className="block text-sm font-medium text-slate-700 mb-1"
        >
          NDA Type
          <span className="text-red-500 ml-1">*</span>
        </label>
        <select
          id="nda_type"
          value={selectedType}
          onChange={(e) => onChange("nda_type", e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-colors bg-white"
        >
          {NDA_TYPES.map((type) => (
            <option key={type} value={type}>
              {NDA_TYPE_LABELS[type]}
            </option>
          ))}
        </select>
        <p className="mt-1 text-xs text-slate-500">
          {NDA_TYPE_DESCRIPTIONS[selectedType]}
        </p>
      </div>

      {formVariables.map((variable) => (
        <div key={variable.name}>
          <label
            htmlFor={variable.name}
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            {variable.label}
            {variable.required && (
              <span className="text-red-500 ml-1">*</span>
            )}
          </label>
          {variable.type === "date" ? (
            <input
              type="date"
              id={variable.name}
              value={values[variable.name] || ""}
              onChange={(e) => onChange(variable.name, e.target.value)}
              required={variable.required}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-colors"
            />
          ) : variable.type === "number" ? (
            <input
              type="number"
              id={variable.name}
              value={values[variable.name] || ""}
              onChange={(e) => onChange(variable.name, e.target.value)}
              required={variable.required}
              placeholder={variable.placeholder}
              min="1"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-colors"
            />
          ) : variable.type === "address" ? (
            <textarea
              id={variable.name}
              value={values[variable.name] || ""}
              onChange={(e) => onChange(variable.name, e.target.value)}
              required={variable.required}
              placeholder={variable.placeholder}
              rows={2}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-colors resize-none"
            />
          ) : (
            <input
              type="text"
              id={variable.name}
              value={values[variable.name] || ""}
              onChange={(e) => onChange(variable.name, e.target.value)}
              required={variable.required}
              placeholder={variable.placeholder}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-colors"
            />
          )}
        </div>
      ))}
    </form>
  );
}
