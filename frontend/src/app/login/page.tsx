"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await login(name.trim(), email.trim());
      router.push("/");
    } catch {
      setError("Unable to connect. Please ensure the backend is running.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">P</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Prelegal</h1>
          <p className="text-slate-500 mt-2">
            Legal document generation, review, and management
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 space-y-5"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-colors"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Entering..." : "Enter Platform"}
          </button>
        </form>
      </div>
    </div>
  );
}
