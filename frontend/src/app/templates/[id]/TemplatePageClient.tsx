"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getTemplateById } from "@templates/index";
import DocumentChat from "@/components/DocumentChat";
import ExtractedFields, { FieldDefinition } from "@/components/ExtractedFields";
import DocumentPreview from "@/components/DocumentPreview";
import DownloadButton from "@/components/DownloadButton";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";

interface TemplatePageClientProps {
  templateId: string;
}

export default function TemplatePageClient({ templateId }: TemplatePageClientProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const template = getTemplateById(templateId);

  const [values, setValues] = useState<Record<string, string>>({});
  const previewRef = useRef<HTMLDivElement>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (template && !initialized) {
      const defaults: Record<string, string> = {};
      for (const v of template.variables) {
        defaults[v.name] = v.defaultValue || "";
      }
      setValues(defaults);
      setInitialized(true);
    }
  }, [template, initialized]);

  const handleFieldsExtracted = useCallback(
    (fields: Record<string, string>) => {
      setValues((prev) => ({ ...prev, ...fields }));
    },
    []
  );

  function handleFieldChange(name: string, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Loading...</p>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Template Not Found</h1>
            <p className="text-slate-500 mb-4">
              The template &ldquo;{templateId}&rdquo; does not exist.
            </p>
            <button
              onClick={() => router.push("/")}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              &larr; Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const fieldDefs: FieldDefinition[] = template.variables.map((v) => ({
    name: v.name,
    label: v.label,
  }));

  const complete = template.variables
    .filter((v) => v.required)
    .every((v) => values[v.name]?.trim() !== "");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="bg-white border-b border-slate-200 px-6 py-3 no-print">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/")}
              className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
            >
              &larr; Back to Dashboard
            </button>
            <span className="text-slate-300">|</span>
            <p className="text-sm font-medium text-slate-700">
              {template.name}
            </p>
          </div>
          <DownloadButton
            previewRef={previewRef}
            disabled={!complete}
            filename={template.name}
          />
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-8">
          <aside className="no-print">
            <div className="sticky top-8 flex flex-col gap-4" style={{ maxHeight: "calc(100vh - 8rem)" }}>
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 flex-1 min-h-0 flex flex-col">
                <h2 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                    AI
                  </span>
                  Document Assistant
                </h2>
                <DocumentChat
                  templateId={templateId}
                  templateName={template.name}
                  onFieldsExtracted={handleFieldsExtracted}
                />
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 flex-shrink-0">
                <ExtractedFields
                  fields={fieldDefs}
                  values={values}
                  onChange={handleFieldChange}
                />
              </div>
            </div>
          </aside>

          <section>
            <DocumentPreview
              ref={previewRef}
              title={template.name.toUpperCase()}
              sections={template.sections}
              values={values}
            />
          </section>
        </div>
      </main>
    </div>
  );
}
