export default function PrivacyPolicy() {
  const lastUpdated = "February 24, 2026";

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Header Section */}
      <div className="bg-slate-50 border-b border-slate-200 py-16">
        <div className="max-w-4xl mx-auto px-8">
          <h1 className="text-4xl font-serif font-bold text-slate-900 uppercase tracking-tight">Privacy Policy</h1>
          <p className="text-slate-500 mt-4 font-medium uppercase text-xs tracking-[0.2em]">
            Last Updated: {lastUpdated}
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-8 py-16">
        <div className="prose prose-slate max-w-none">
          
          <section className="mb-12">
            <h2 className="text-xs font-bold text-[#08335e] uppercase tracking-[0.3em] mb-6 border-b pb-2">1. Data Collection</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              The UIST Institutional Repository collects data to provide a better service to our researchers and the global public. We collect information in two ways:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600">
              <li><strong>Researcher Data:</strong> Name, institutional affiliation, and contact details provided during the account creation and deposit process.</li>
              <li><strong>Usage Data:</strong> We track downloads and page views (anonymized) to provide impact statistics for our authors and to improve system performance.</li>
            </ul>
          </section>

          

          <section className="mb-12">
            <h2 className="text-xs font-bold text-[#08335e] uppercase tracking-[0.3em] mb-6 border-b pb-2">2. Use of Information</h2>
            <p className="text-slate-600 leading-relaxed">
              Information collected is used strictly for the administration of the repository, metadata harvesting by academic search engines (like Google Scholar), and the long-term preservation of the university's digital assets. We do not sell or trade your personal data to third parties.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-xs font-bold text-[#08335e] uppercase tracking-[0.3em] mb-6 border-b pb-2">3. Cookies & Tracking</h2>
            <p className="text-slate-600 leading-relaxed">
              We use essential cookies to maintain your session when you log in. We may also use analytical tools to monitor repository traffic. You can disable cookies in your browser settings, though some features of the submission process may not function correctly.
            </p>
          </section>

          <section className="bg-slate-900 p-8 text-white border-l-8 border-[#08335e]">
            <h2 className="text-xs font-bold text-blue-300 uppercase tracking-[0.3em] mb-4">4. Your Rights (GDPR)</h2>
            <p className="text-sm leading-relaxed mb-4 text-slate-300">
              Under the General Data Protection Regulation (GDPR), users within the European Economic Area have the right to:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px] font-bold uppercase tracking-widest text-white">
              <div className="border border-slate-700 p-4 italic">Request Access to Data</div>
              <div className="border border-slate-700 p-4 italic">Request Rectification</div>
              <div className="border border-slate-700 p-4 italic">Right to Erasure</div>
              <div className="border border-slate-700 p-4 italic">Data Portability</div>
            </div>
          </section>

          <section className="mt-16 pt-8 border-t border-slate-100">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-[0.3em] mb-4">Contact</h2>
            <p className="text-sm text-slate-600">
              For any questions regarding this policy or to exercise your data rights, please contact:
              <br />
              <span className="font-bold text-[#08335e] block mt-2 underline cursor-pointer">privacy@uist.edu.mk</span>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}