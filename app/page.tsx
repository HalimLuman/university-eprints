'use client';
import { useEffect, useState } from "react";
import Link from "next/link";

interface Submission {
  id: number;
  title: string;
  author: string;
  dept: string;
  date: string;
  type: string;
}

export default function HomePage() {
  const [recentUploads, setRecentUploads] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSubmissions() {
      try {
        const res = await fetch("/api/submissions/recent");
        const data = await res.json();
        if (!data.error) setRecentUploads(data);
      } catch (err) {
        console.error("Error loading submissions:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSubmissions();
  }, []);

  return (
    <main className="max-w-7xl mx-auto py-12 px-8 bg-white">
      {/* Header Section */}
      <header className="border-b-2 border-slate-900 pb-8 mb-12">
        <h1 className="text-3xl font-serif font-bold text-slate-900 uppercase tracking-tight">
          University Research Repository
        </h1>
        <p className="text-[#08335e] mt-2 font-medium italic">
          Official Institutional Archive for Research Outputs and Publications
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Left Content */}
        <section className="lg:col-span-3">
          <div className="flex justify-between items-end mb-6 border-b border-slate-900 pb-2">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-[0.2em]">Latest Submissions</h2>
            <Link href="/browse" className="text-[10px] font-bold text-[#08335e] hover:underline underline-offset-4 tracking-widest">
              VIEW ALL ARCHIVES →
            </Link>
          </div>
          
          <div className="divide-y divide-slate-100">
            {isLoading ? (
              // Skeleton Loader for Academic look
              [1, 2, 3].map(i => (
                <div key={i} className="py-8 animate-pulse">
                  <div className="h-4 bg-slate-100 w-3/4 mb-4"></div>
                  <div className="h-3 bg-slate-50 w-1/4"></div>
                </div>
              ))
            ) : (
              recentUploads.map(item => (
                <div key={item.id} className="py-6 group transition-all">
                  <div className="flex gap-6 items-start">
                    <span className="text-[9px] font-bold py-1 px-2 border border-slate-300 text-slate-400 uppercase shrink-0 mt-1">
                      {item.type}
                    </span>
                    <div>
                      <Link href={`/eprint/${item.id}`}>
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#08335e] leading-snug">
                          {item.title}
                        </h3>
                      </Link>
                      <p className="text-slate-600 text-sm mt-2 font-medium">
                        {item.author} <span className="mx-2 text-slate-300">|</span> 
                        <span className="text-slate-500">{item.dept}</span>
                      </p>
                      <p className="text-slate-400 text-[10px] mt-2 uppercase tracking-[0.1em]">
                        Date Deposited: {item.date}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Right Sidebar */}
        <aside className="lg:col-span-1">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-900 pb-2 mb-6">
            Browse Archive
          </h2>
          <ul className="space-y-4">
            {['By Year', 'By Subject', 'By Division', 'By Author'].map(link => (
              <li key={link} className="border-b border-slate-50 pb-2">
                <Link href={`/browse/${link.toLowerCase().split(' ')[1]}`} className="text-slate-600 hover:text-[#08335e] text-xs font-bold uppercase tracking-wide flex justify-between items-center group">
                  {link}
                  <span className="text-slate-300 group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-16 p-6 bg-[#08335e] text-white">
            <h3 className="text-[10px] font-bold uppercase tracking-widest mb-3 text-blue-200">Researcher Support</h3>
            <p className="text-xs leading-relaxed font-medium">
              Are you a faculty member looking to deposit your work? 
            </p>
            <Link href="/help" className="inline-block mt-4 text-[10px] font-bold uppercase border-b border-white pb-1 hover:text-blue-200 transition-colors">
              Submission Guidelines
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}