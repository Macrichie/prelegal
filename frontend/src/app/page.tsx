"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { getTemplates, ApiTemplateSummary } from "@/lib/api";
import Navbar from "@/components/Navbar";

const CATEGORY_COLORS: Record<string, string> = {
  agreement: "bg-blue-100 text-blue-700",
  contract: "bg-emerald-100 text-emerald-700",
  policy: "bg-purple-100 text-purple-700",
  letter: "bg-amber-100 text-amber-700",
  "legal-form": "bg-rose-100 text-rose-700",
};

export default function Dashboard() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [templates, setTemplates] = useState<ApiTemplateSummary[]>([]);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (!user) return;
    getTemplates()
      .then(setTemplates)
      .catch(() => setFetchError(true));
  }, [user]);

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
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">
            Welcome back, {user.name}
          </h1>
          <p className="text-slate-500 mt-1">
            Choose a template to create a new legal document.
          </p>
        </div>

        {fetchError && (
          <div className="mb-6 rounded-lg bg-amber-50 border border-amber-200 p-4">
            <p className="text-sm text-amber-700">
              Could not load templates from server. Showing cached templates.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((template) => {
            const colorClass =
              CATEGORY_COLORS[template.category] || "bg-slate-100 text-slate-700";

            return (
              <Link
                key={template.id}
                href={`/templates/${template.id}`}
                className="group block rounded-xl border border-slate-200 bg-white p-6 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <span
                    className={`inline-block text-xs font-medium px-2 py-1 rounded-full ${colorClass}`}
                  >
                    {template.category}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {template.name}
                </h3>
                <p className="text-sm text-slate-500 mt-2 line-clamp-2">
                  {template.description}
                </p>
                <span className="inline-block mt-4 text-xs font-medium text-blue-600">
                  Create document →
                </span>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
