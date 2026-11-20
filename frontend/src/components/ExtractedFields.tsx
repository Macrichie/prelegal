"use client";

import { useState } from "react";

const FIELD_LABELS: Record<string, string> = {
  disclosing_party_name: "Disclosing Party",
  disclosing_party_address: "Disclosing Address",
  receiving_party_name: "Receiving Party",
  receiving_party_address: "Receiving Address",
  effective_date: "Effective Date",
  confidentiality_period: "Period (years)",
  governing_law_state: "Governing Law",
};

const FIELD_ORDER = [
  "disclosing_party_name",
  "disclosing_party_address",
  "receiving_party_name",
  "receiving_party_address",
  "effective_date",
  "confidentiality_period",
  "governing_law_state",
];

interface ExtractedFieldsProps {
  values: Record<string, string>;
  onChange: (name: string, value: string) => void;
}

export default function ExtractedFields({
  values,
  onChange,
}: ExtractedFieldsProps) {
  const [editingField, setEditingField] = useState<string | null>(null);
  const filledCount = FIELD_ORDER.filter((f) => values[f]?.trim()).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Extracted Fields
        </h3>
        <span className="text-xs text-slate-400">
          {filledCount}/{FIELD_ORDER.length}
        </span>
      </div>
      <div className="space-y-2">
        {FIELD_ORDER.map((field) => {
          const value = values[field] || "";
          const isFilled = value.trim() !== "";
          const isEditing = editingField === field;

          return (
            <div key={field} className="flex items-start gap-2 text-sm">
              <div
                className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
                  isFilled ? "bg-emerald-500" : "bg-slate-300"
                }`}
              />
              <div className="flex-1 min-w-0">
                <span className="text-xs text-slate-500">
                  {FIELD_LABELS[field]}
                </span>
                {isEditing ? (
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(field, e.target.value)}
                    onBlur={() => setEditingField(null)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") setEditingField(null);
                    }}
                    autoFocus
                    className="block w-full mt-0.5 rounded border border-blue-300 px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                ) : (
                  <p
                    className={`truncate cursor-pointer hover:text-blue-600 ${
                      isFilled ? "text-slate-800" : "text-slate-400 italic"
                    }`}
                    onClick={() => setEditingField(field)}
                    title={isFilled ? `Click to edit: ${value}` : "Click to fill in manually"}
                  >
                    {isFilled ? value : "Not provided yet"}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
