"use client";

import { useState } from "react";

export interface FieldDefinition {
  name: string;
  label: string;
}

interface ExtractedFieldsProps {
  fields: FieldDefinition[];
  values: Record<string, string>;
  onChange: (name: string, value: string) => void;
}

export default function ExtractedFields({
  fields,
  values,
  onChange,
}: ExtractedFieldsProps) {
  const [editingField, setEditingField] = useState<string | null>(null);
  const filledCount = fields.filter((f) => values[f.name]?.trim()).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Extracted Fields
        </h3>
        <span className="text-xs text-slate-400">
          {filledCount}/{fields.length}
        </span>
      </div>
      <div className="space-y-2">
        {fields.map((field) => {
          const value = values[field.name] || "";
          const isFilled = value.trim() !== "";
          const isEditing = editingField === field.name;

          return (
            <div key={field.name} className="flex items-start gap-2 text-sm">
              <div
                className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
                  isFilled ? "bg-emerald-500" : "bg-slate-300"
                }`}
              />
              <div className="flex-1 min-w-0">
                <span className="text-xs text-slate-500">
                  {field.label}
                </span>
                {isEditing ? (
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(field.name, e.target.value)}
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
                    onClick={() => setEditingField(field.name)}
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
