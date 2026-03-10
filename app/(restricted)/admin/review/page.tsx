'use client';
import React from "react";
import { useEffect, useState } from "react";

interface BufferItem {
  id: string;
  title: string;
  user: string;
  status: string;
  date: string;
}

export default function AdminReviewPage() {
  const [items, setItems] = useState<BufferItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchBuffer() {
      try {
        const res = await fetch("/api/review");
        const data = await res.json();
        if (res.ok) setItems(data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBuffer();
  }, []);

  const handleAction = async (id: string, action: 'approve' | 'reject') => {
  let reason = "";
  
  if (action === 'reject') {
    reason = window.prompt("Reason for return (sent to user):") || "";
    if (!reason) return;
  }

  const originalItems = [...items];
  setItems(items.filter(item => item.id !== id));
  setSelectedId(null);

  try {
    const res = await fetch("/api/review/action", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, action, reason }),
    });

    const result = await res.json();
    if (!result.success) {
      throw new Error(result.error);
    }
    alert(`Successfully ${action === 'approve' ? 'approved' : 'returned'} item #${id}`);
    
  } catch (err: any) {
    alert(`Failed to process: ${err.message}`);
    setItems(originalItems);
  }
};

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-[#08335e] py-8 border-b-4 border-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-8">
          <h1 className="text-2xl font-serif font-bold uppercase">Editorial Buffer</h1>
          <p className="text-blue-200 text-xs mt-1 uppercase tracking-widest">Quality Control Queue</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 mt-8">
        <div className="bg-white border-t-2 border-slate-900 shadow-md">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-left">Details</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Task</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item) => (
                <React.Fragment key={item.id}>
                  <tr className={`transition-colors ${selectedId === item.id ? 'bg-blue-50/50' : 'hover:bg-slate-50'}`}>
                    <td className="px-6 py-5">
                      <div className="flex gap-4">
                        <span className="text-xs font-mono text-slate-400 mt-1">#{item.id}</span>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{item.title}</p>
                          <p className="text-[11px] text-slate-500 mt-1 uppercase tracking-wide">
                            Depositor: <span className="text-slate-700 font-semibold">{item.user}</span> • {item.date}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button 
                        onClick={() => setSelectedId(selectedId === item.id ? null : item.id)}
                        className={`text-[10px] font-bold uppercase tracking-[0.15em] px-4 py-2 transition-all ${
                          selectedId === item.id 
                          ? 'bg-slate-800 text-white' 
                          : 'text-[#08335e] border border-[#08335e] hover:bg-[#08335e] hover:text-white'
                        }`}
                      >
                        {selectedId === item.id ? "Close" : "Review"}
                      </button>
                    </td>
                  </tr>

                  {/* Inline Review Card */}
                  {selectedId === item.id && (
                    <tr>
                      <td colSpan={2} className="px-8 py-8 bg-blue-50/30 border-y border-blue-100">
                        <div className="bg-white border border-blue-200 p-6 shadow-sm flex flex-col md:flex-row gap-8">
                          <div className="flex-1">
                            <h4 className="text-[10px] font-bold text-blue-900 uppercase tracking-widest mb-3">Submission Preview</h4>
                            <div className="space-y-4">
                              <div>
                                <label className="block text-[9px] font-bold text-slate-400 uppercase">Document Metadata</label>
                                <p className="text-sm text-slate-700 leading-relaxed italic">
                                  Check for DOI accuracy, correct author affiliation (UIST), and appropriate subject headings before approving.
                                </p>
                              </div>
                              <div className="flex gap-4">
                                <button className="text-[10px] font-bold text-blue-700 underline uppercase tracking-tighter">View Full PDF</button>
                                <button className="text-[10px] font-bold text-blue-700 underline uppercase tracking-tighter">Edit Metadata</button>
                              </div>
                            </div>
                          </div>

                          <div className="w-full md:w-64 flex flex-col gap-3 justify-center border-l border-slate-100 pl-8">
                            <button 
                              onClick={() => handleAction(item.id, 'approve')}
                              className="w-full bg-emerald-700 text-white text-[10px] font-bold uppercase py-3 tracking-widest hover:bg-emerald-800 transition-colors"
                            >
                              Approve to Archive
                            </button>
                            <button 
                              onClick={() => handleAction(item.id, 'reject')}
                              className="w-full border border-red-200 text-red-700 text-[10px] font-bold uppercase py-3 tracking-widest hover:bg-red-50 transition-colors"
                            >
                              Return to User
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}