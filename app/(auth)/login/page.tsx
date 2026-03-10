'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
      callbackUrl: "/",
    });

    if (result?.error) {
      setError("The credentials provided do not match our institutional records.");
    } else {
      router.push("/");
    }

    setIsLoading(false);
  }

  return (
     <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 py-12">
      {/* University Branding */}
      <div className="mb-10 text-center">
        <div className="mx-auto mb-6 flex items-center justify-center">
          <div className="bg-white p-2 shadow-sm border border-slate-200">
            <Image src="/uni-logo.jpg" width={80} height={80} alt="UIST Logo" priority />
          </div>
        </div>
        <h1 className="text-2xl font-serif font-bold text-slate-900 uppercase tracking-tight">
          University Research Repository
        </h1>
        <p className="text-[#08335e] font-medium text-sm mt-1 italic">
          "St. Paul the Apostle" Institutional Access
        </p>
      </div>

      {/* Login Card - Flat Academic Style */}
      <div className="w-full max-w-md bg-white p-10 border-t-4 border-[#08335e] shadow-md">
        <div className="mb-8 border-b border-slate-100 pb-4">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Researcher Sign In</h2>
          <p className="text-xs text-slate-500 mt-1">Please enter your institutional credentials.</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-widest mb-2">
              Username / Email
            </label>
            <input
              type="text"
              required
              className="w-full rounded-none border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-[#08335e] focus:ring-0 outline-none transition-all placeholder:text-slate-300"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-widest">
                Password
              </label>
            </div>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full rounded-none border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-[#08335e] focus:ring-0 outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-3">
              <p className="text-xs text-red-700 font-bold uppercase tracking-tight">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center bg-[#08335e] px-4 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white hover:bg-[#062a4d] transition-all disabled:opacity-70 active:translate-y-px"
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : "Authorize Access"}
          </button>
        </form>

        <div className="mt-10 pt-6 border-t border-slate-100 text-center">
          <p className="text-[10px] text-slate-400 uppercase tracking-widest leading-relaxed">
            Authorized Personnel Only <br />
            University of Information Science and Technology
          </p>
        </div>
      </div>
    </div>
  );
}