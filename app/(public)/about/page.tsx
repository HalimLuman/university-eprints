'use client';

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Institutional Banner */}
      <div className="bg-[#08335e] py-20 text-white border-b-8 border-slate-900">
        <div className="max-w-7xl mx-auto px-8">
          <h1 className="text-4xl font-serif font-bold uppercase tracking-tight italic">About the Repository</h1>
          <p className="text-blue-200 mt-4 max-w-3xl text-lg font-light leading-relaxed">
            The University of Information Science and Technology "St. Paul the Apostle" (UIST) Institutional Repository is a permanent digital archive of the university’s intellectual output.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Main Mission Text */}
          <div className="lg:col-span-8 space-y-12">
            <section>
              <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6 uppercase">Mission & Purpose</h2>
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
                <p>
                  Established in 2026, the UIST Repository serves as a centralized platform to collect, preserve, and distribute the scholarly work produced by our faculty and students. By providing <strong>Open Access</strong> to our research, we aim to increase the global visibility of our academic contributions and foster international collaboration.
                </p>
                <p>
                  Our collection includes peer-reviewed journal articles, conference proceedings, datasets, and doctoral dissertations, all organized by faculty and research interest.
                </p>
              </div>
            </section>

            

            <section className="bg-slate-50 p-10 border-l-4 border-[#08335e]">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-[0.3em] mb-6">Technical Standards</h2>
              <p className="text-sm text-slate-600 mb-6">
                This repository is powered by <strong>EPrints 3</strong>, developed by the School of Electronics and Computer Science at the University of Southampton. We adhere to international metadata standards to ensure our data is harvestable by global search engines.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 border border-slate-200">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Protocol</span>
                  <span className="text-sm font-mono font-bold text-[#08335e]">OAI-PMH v2.0</span>
                </div>
                <div className="bg-white p-4 border border-slate-200">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Metadata</span>
                  <span className="text-sm font-mono font-bold text-[#08335e]">Dublin Core / Rioxx</span>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar Stats & Info */}
          <div className="lg:col-span-4 space-y-8">
            <div className="border border-slate-200 p-8">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-6 border-b pb-2">Repository Stats</h3>
              <div className="space-y-6">
                <div>
                  <span className="block text-3xl font-serif font-bold text-[#08335e]">1,420+</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Items Archived</span>
                </div>
                <div>
                  <span className="block text-3xl font-serif font-bold text-[#08335e]">45k+</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Annual Downloads</span>
                </div>
                <div>
                  <span className="block text-3xl font-serif font-bold text-[#08335e]">12</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Research Divisions</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 p-8 text-white">
              <h3 className="text-xs font-bold text-blue-300 uppercase tracking-widest mb-4">Content Policy</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                All items in the repository are protected by copyright, with all rights reserved, unless otherwise indicated by a Creative Commons license.
              </p>
              <button className="w-full border border-slate-700 py-3 text-[9px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-slate-900 transition-all">
                Read Privacy Policy
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}