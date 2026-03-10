'use client';
import { useState } from 'react';

const faqData = [
  {
    question: "What items should I deposit in the repository?",
    answer: "You should deposit any peer-reviewed research outputs, including journal articles, conference papers, book chapters, and doctoral theses. We also encourage the deposition of data sets and technical reports associated with UIST research projects."
  },
  {
    question: "How do I comply with Open Access mandates?",
    answer: "Most publishers allow the 'Green Open Access' route, where you can deposit the 'Accepted Manuscript' (the version after peer review but before publisher formatting). Check Sherpa Romeo or contact the library for specific journal policies."
  },
  {
    question: "What is the 'Editorial Buffer'?",
    answer: "Once you submit an item, it enters the Editorial Buffer. A repository editor will check the metadata and copyright permissions before making the item live in the public archive. This usually takes 2-3 working days."
  },
  {
    question: "Can I edit an item once it is live?",
    answer: "Once an item is in the live archive, you cannot edit it directly. You must request a 'New Version' or contact the repository administrator to make corrections to the metadata."
  }
];

export default function HelpPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Header */}
      <div className="bg-[#08335e] py-16 text-white border-b-8 border-slate-900">
        <div className="max-w-7xl mx-auto px-8">
          <h1 className="text-4xl font-serif font-bold uppercase tracking-tight">Submission Guide & FAQ</h1>
          <p className="text-blue-200 mt-4 max-w-2xl text-lg font-light leading-relaxed">
            Ensuring the visibility and preservation of UIST research. Follow this guide to successfully archive your academic work.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
        
        {/* Left: Submission Steps */}
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h2 className="text-xs font-bold text-[#08335e] uppercase tracking-[0.3em] mb-8 flex items-center gap-4">
              <span className="h-[1px] w-12 bg-[#08335e]"></span> 
              The 4-Step Process
            </h2>
            
            <div className="space-y-8">
              {[
                { step: "01", title: "Prepare Your Manuscript", desc: "Ensure you have the 'Author Accepted Manuscript' (AAM) version. This is the final draft after peer review but without the publisher's logo." },
                { step: "02", title: "Metadata Entry", desc: "Log in and select 'New Deposit'. Fill in the title, authors, and abstract accurately to ensure high search engine visibility." },
                { step: "03", title: "Upload & License", desc: "Upload your PDF. You will be asked to choose a Creative Commons license (CC BY is recommended for maximum impact)." },
                { step: "04", title: "Editorial Review", desc: "Our team reviews the copyright and formatting. You will receive an email notification once the item is live." }
              ].map((item) => (
                <div key={item.step} className="flex gap-6 group">
                  <span className="text-4xl font-serif italic text-slate-200 group-hover:text-[#08335e] transition-colors">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          

          {/* FAQ Section */}
          <section className="pt-12 border-t border-slate-100">
            <h2 className="text-2xl font-serif font-bold text-slate-900 mb-8 uppercase">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <div key={index} className="border border-slate-200">
                  <button 
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full text-left px-6 py-4 flex justify-between items-center hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-bold text-sm text-slate-800 uppercase tracking-tight">{faq.question}</span>
                    <span className="text-slate-400">{openIndex === index ? '−' : '+'}</span>
                  </button>
                  {openIndex === index && (
                    <div className="px-6 pb-6 text-sm text-slate-600 leading-relaxed animate-in fade-in slide-in-from-top-1">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right: Sidebar Contact & Links */}
        <div className="space-y-8">
          <div className="bg-slate-50 p-8 border-t-4 border-[#08335e]">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-4">Contact Library Staff</h3>
            <p className="text-sm text-slate-600 mb-6">Need help with copyright or DOI registration? Contact our research support team.</p>
            <a href="mailto:library@uist.edu.mk" className="block text-center bg-[#08335e] text-white py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-all">
              Email Support
            </a>
          </div>

          <div className="p-8 border border-slate-200">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Resources</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-xs font-bold text-[#08335e] uppercase underline decoration-blue-200 underline-offset-4 hover:decoration-[#08335e]">Copyright Policy PDF</a></li>
              <li><a href="#" className="text-xs font-bold text-[#08335e] uppercase underline decoration-blue-200 underline-offset-4 hover:decoration-[#08335e]">Sherpa Romeo Search</a></li>
              <li><a href="#" className="text-xs font-bold text-[#08335e] uppercase underline decoration-blue-200 underline-offset-4 hover:decoration-[#08335e]">ORCID Integration Guide</a></li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}