"use client";

import { useRef, useState } from "react";
import { nda } from "@templates/nda";
import NdaForm from "@/components/NdaForm";
import NdaPreview from "@/components/NdaPreview";
import DownloadButton from "@/components/DownloadButton";
import { getSectionsForType, NdaType, NDA_TYPE_LABELS } from "@/lib/nda-types";

function getDefaultValues(): Record<string, string> {
  const defaults: Record<string, string> = {};
  for (const v of nda.variables) {
    if (v.defaultValue) {
      defaults[v.name] = v.defaultValue;
    } else {
      defaults[v.name] = "";
    }
  }
  return defaults;
}

function isFormComplete(values: Record<string, string>): boolean {
  return nda.variables
    .filter((v) => v.required)
    .every((v) => values[v.name]?.trim() !== "");
}

export default function Home() {
  const [values, setValues] = useState<Record<string, string>>(
    getDefaultValues
  );
  const previewRef = useRef<HTMLDivElement>(null);

  function handleChange(name: string, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  const ndaType = (values["nda_type"] || "Mutual") as NdaType;
  const sections = getSectionsForType(nda.sections, ndaType);
  const complete = isFormComplete(values);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-slate-200 px-6 py-4 no-print">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Prelegal</h1>
            <p className="text-sm text-slate-500">
              {NDA_TYPE_LABELS[ndaType]} Creator
            </p>
          </div>
          <DownloadButton previewRef={previewRef} disabled={!complete} />
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8">
          <aside className="no-print">
            <div className="sticky top-8 bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <NdaForm
                variables={nda.variables}
                values={values}
                onChange={handleChange}
              />
              {!complete && (
                <p className="mt-4 text-xs text-amber-600">
                  Fill in all required fields to enable PDF download.
                </p>
              )}
            </div>
          </aside>

          <section>
            <NdaPreview
              ref={previewRef}
              sections={sections}
              values={values}
              ndaType={ndaType}
            />
          </section>
        </div>
      </main>
    </div>
  );
}
