"use client";

import { forwardRef } from "react";
import { TemplateSection } from "@template-types/template";
import { fillTemplate } from "@/lib/template-utils";

interface DocumentPreviewProps {
  title: string;
  sections: TemplateSection[];
  values: Record<string, string>;
}

const DocumentPreview = forwardRef<HTMLDivElement, DocumentPreviewProps>(
  function DocumentPreview({ title, sections, values }, ref) {
    const sortedSections = [...sections].sort((a, b) => a.order - b.order);

    return (
      <div
        ref={ref}
        className="bg-white rounded-lg shadow-sm border border-slate-200 p-10 max-w-[800px] mx-auto"
      >
        <h1 className="text-2xl font-bold text-center text-slate-900 mb-2">
          {title}
        </h1>
        <hr className="border-slate-300 mb-8" />

        {sortedSections.map((section) => {
          const filled = fillTemplate(section.content, values);
          return (
            <div key={section.id} className="mb-6">
              <h2 className="text-base font-semibold text-slate-800 mb-2 uppercase tracking-wide">
                {section.order}. {section.title}
              </h2>
              <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {filled.split(/(\{\{\w+\}\})/).map((part, i) => {
                  if (/^\{\{\w+\}\}$/.test(part)) {
                    return (
                      <span
                        key={i}
                        className="bg-amber-100 text-amber-700 px-1 rounded text-xs font-mono"
                      >
                        {part}
                      </span>
                    );
                  }
                  return <span key={i}>{part}</span>;
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);

export default DocumentPreview;
