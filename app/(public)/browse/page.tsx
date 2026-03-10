'use client';
import { useState, useEffect } from "react";
import Link from "next/link";

export default function BrowsePage() {
  const [categories, setCategories] = useState({ years: [], subjects: [], divisions: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBrowseData() {
      try {
        const res = await fetch("/api/browse");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Browse fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBrowseData();
  }, []);

  if (loading) return <div className="p-20 text-center font-serif uppercase tracking-widest text-slate-400">Indexing Archive...</div>;

  return (
    <div className="bg-white min-h-screen">
      {/* Page Header */}
      <div className="bg-[#08335e] py-12 text-white border-b-4 border-slate-900">
        <div className="max-w-7xl mx-auto px-8">
          <h1 className="text-3xl font-serif font-bold uppercase tracking-tight">Browse Repository</h1>
          <p className="text-blue-200 mt-2 text-sm uppercase tracking-[0.2em]">Discover UIST Research by Category</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          
          {/* Column 1: Year */}
          <section>
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em] mb-8 border-b pb-4">By Year</h2>
            <ul className="space-y-4">
              {categories.years.map((year) => (
                <li key={year} className="group flex justify-between items-center">
                  <Link href={`/search?year=${year}`} className="font-serif text-lg text-slate-900 group-hover:text-[#08335e] transition-colors italic">
                    {year}
                  </Link>
                  <span className="h-[1px] flex-grow mx-4 bg-slate-100 group-hover:bg-blue-100"></span>
                </li>
              ))}
            </ul>
          </section>

          {/* Column 2: Subject */}
          <section>
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em] mb-8 border-b pb-4">By Subject</h2>
            <ul className="space-y-4">
              {categories.subjects.map((sub) => (
                <li key={sub} className="group">
                  <Link href={`/search?subject=${sub}`} className="text-sm font-bold text-slate-800 uppercase tracking-tight group-hover:text-[#08335e] block">
                    {sub}
                  </Link>
                  <p className="text-[10px] text-slate-400 mt-1 uppercase">View all items</p>
                </li>
              ))}
            </ul>
          </section>

          {/* Column 3: Division */}
          <section>
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em] mb-8 border-b pb-4">By Division</h2>
            <div className="space-y-6">
              {categories.divisions.map((div) => (
                <Link key={div} href={`/search?division=${div}`} className="block p-6 border border-slate-100 hover:border-[#08335e] hover:shadow-md transition-all group">
                  <h3 className="text-xs font-bold text-[#08335e] uppercase tracking-widest group-hover:underline">{div}</h3>
                  <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">Access faculty-specific publications and doctoral research.</p>
                </Link>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}