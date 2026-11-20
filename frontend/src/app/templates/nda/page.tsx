"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { nda } from "@templates/nda";
import NdaForm from "@/components/NdaForm";
import NdaPreview from "@/components/NdaPreview";
import DownloadButton from "@/components/DownloadButton";
import Navbar from "@/components/Navbar";
import { getSectionsForType, NdaType, NDA_TYPE_LABELS } from "@/lib/nda-types";
import { useAuth } from "@/contexts/AuthContext";

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

export default function NdaPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [values, setValues] = useState<Record<string, string>>(
    getDefaultValues
  );
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  function handleChange(name: string, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  const ndaType = (values["nda_type"] || "Mutual") as NdaType;
  const sections = getSectionsForType(nda.sections, ndaType);
  const complete = isFormComplete(values);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Loading...</p>
      </div>
    );
  }

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
              ← Back to Dashboard
            </button>
            <span className="text-slate-300">|</span>
            <p className="text-sm font-medium text-slate-700">
              {NDA_TYPE_LABELS[ndaType]} Creator
            </p>
          </div>
          <DownloadButton previewRef={previewRef} disabled={!complete} />
        </div>
      </div>

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
