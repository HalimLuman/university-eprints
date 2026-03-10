'use client';
export default function ProfilePage() {
  return (
    <main className="max-w-4xl mx-auto py-12 px-8">
      <h1 className="text-3xl font-serif font-bold text-slate-900 uppercase border-b-2 border-slate-900 pb-4 mb-10">
        Researcher Profile
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <aside className="space-y-4">
          <div className="h-40 w-40 bg-slate-100 border border-slate-200 flex items-center justify-center">
             <span className="text-slate-300 font-bold text-4xl">UIST</span>
          </div>
          <button className="w-full bg-[#08335e] text-white py-3 text-[10px] font-bold uppercase tracking-widest">Update Photo</button>
        </aside>

        <section className="md:col-span-2 space-y-8">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Full Name</label>
            <p className="text-lg font-bold border-b border-slate-100 pb-2">Dr. Researcher Name</p>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Institutional Email</label>
            <p className="text-lg font-bold border-b border-slate-100 pb-2">researcher@uist.edu.mk</p>
          </div>
          <div className="pt-6">
            <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Saved Searches</h3>
            <ul className="border-l-2 border-[#08335e] pl-4 space-y-2">
              <li className="text-sm text-slate-600 hover:text-[#08335e] cursor-pointer italic underline">"Ohrid Ecology 2024"</li>
              <li className="text-sm text-slate-600 hover:text-[#08335e] cursor-pointer italic underline">"NextJS SSR performance"</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}