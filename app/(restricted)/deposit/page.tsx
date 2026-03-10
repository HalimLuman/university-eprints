'use client';

import { useState } from "react";

const STEPS = ["Type", "Upload", "Metadata", "Subjects", "Deposit"];

export default function DepositPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    type: "Article (Peer-reviewed)",
    title: "",
    file: null as File | null,
    abstract: "",
    authors: "",
    subjects: [] as string[],
  });

  const [isUploading, setIsUploading] = useState(false);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeStep < STEPS.length - 1) setActiveStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (activeStep > 0) setActiveStep(prev => prev - 1);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, file: e.target.files[0] });
    }
  };

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      // 1. Prepare the data for transport
      const submission = new FormData();
      submission.append("type", formData.type);
      submission.append("title", formData.title);
      submission.append("abstract", formData.abstract);
      
      if (formData.file) {
        submission.append("file", formData.file);
      }

      const response = await fetch("/api/deposit", {
        method: "POST",
        body: submission,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to transmit deposit.");
      }

      const result = await response.json();
      alert(`Success! Item ${result.id || ''} is now in the Editorial Buffer.`);

    } catch (err: any) {
      console.error("Submission Error:", err);
      alert(`Submission failed: ${err.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 mb-10">
        <div className="max-w-4xl mx-auto py-8 px-4">
          <h1 className="text-2xl font-serif font-bold text-slate-900 uppercase tracking-tight">
            New Item Submission
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            UIST Institutional Repository · Version 2026.1
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        {/* Progress Stepper */}
        <div className="flex items-center justify-between mb-10 border border-slate-200 bg-white">
          {STEPS.map((step, index) => (
            <div 
              key={step}
              className={`flex-1 text-center py-4 text-[10px] font-bold uppercase tracking-widest border-r last:border-r-0 border-slate-200 transition-all
                ${index === activeStep ? "bg-[#08335e] text-white" : index < activeStep ? "bg-blue-50 text-[#08335e]" : "text-slate-400 bg-white"}
              `}
            >
              <span className="mr-1">{index + 1}.</span> {step}
            </div>
          ))}
        </div>

        {/* Form Container */}
        <div className="bg-white border-t-4 border-[#08335e] shadow-md p-8 md:p-12 transition-all">
          
          <form onSubmit={activeStep === 4 ? handleSubmit : handleNext}>
            
            {/* STEP 0: TYPE */}
            {activeStep === 0 && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <header className="border-b pb-4">
                  <h2 className="text-lg font-bold text-slate-800 uppercase italic">01. Item Type</h2>
                  <p className="text-slate-500 text-sm">Select the classification for this digital object.</p>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <label className="text-xs font-bold text-slate-700 uppercase pt-3">Classification</label>
                  <select 
                    className="md:col-span-2 border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-[#08335e] outline-none"
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                  >
                    <option>Article (Peer-reviewed)</option>
                    <option>Thesis/Dissertation</option>
                    <option>Conference Item</option>
                    <option>Monograph/Book</option>
                  </select>
                </div>
              </div>
            )}

            {/* STEP 1: UPLOAD */}
            {activeStep === 1 && (
              <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                <header className="border-b pb-4">
                  <h2 className="text-lg font-bold text-slate-800 uppercase italic">02. File Upload</h2>
                  <p className="text-slate-500 text-sm">Upload the manuscript or dataset.</p>
                </header>
                <div className="p-12 border-2 border-dashed border-slate-200 bg-slate-50 text-center relative hover:border-[#08335e] transition-all">
                  <input 
                    type="file" 
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <div className="space-y-2">
                    <p className="text-sm font-bold text-[#08335e]">
                      {formData.file ? `Selected: ${formData.file.name}` : "Click to select or drag PDF file"}
                    </p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest">Max file size: 50MB</p>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: METADATA */}
            {activeStep === 2 && (
              <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                <header className="border-b pb-4">
                  <h2 className="text-lg font-bold text-slate-800 uppercase italic">03. Bibliographic Metadata</h2>
                  <p className="text-slate-500 text-sm">Enter the core details of the work.</p>
                </header>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <label className="text-xs font-bold text-slate-700 uppercase">Item Title</label>
                    <input 
                      className="md:col-span-2 border-b-2 border-slate-200 py-2 focus:border-[#08335e] outline-none text-sm"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <label className="text-xs font-bold text-slate-700 uppercase">Abstract</label>
                    <textarea 
                      rows={4}
                      className="md:col-span-2 border-2 border-slate-100 p-3 focus:border-[#08335e] outline-none text-sm"
                      value={formData.abstract}
                      onChange={(e) => setFormData({...formData, abstract: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3 & 4 (Simplified for brevity) */}
            {activeStep >= 3 && (
              <div className="py-10 text-center space-y-4">
                 <h2 className="text-xl font-serif font-bold text-[#08335e]">Ready to Archive</h2>
                 <p className="text-sm text-slate-500 max-w-md mx-auto">
                    By clicking 'Deposit', you confirm that you have the right to share this work and agree to the institutional repository license.
                 </p>
              </div>
            )}

            {/* NAVIGATION BUTTONS */}
            <div className="flex justify-between items-center pt-10 border-t border-slate-100 mt-12">
              <button 
                type="button" 
                onClick={handleBack}
                disabled={activeStep === 0}
                className={`text-xs font-bold uppercase tracking-widest transition-all ${activeStep === 0 ? "opacity-0" : "text-slate-400 hover:text-slate-900"}`}
              >
                ← Previous Step
              </button>
              
              <div className="flex gap-4">
                <button 
                  type="submit" 
                  disabled={isUploading}
                  className="px-10 py-4 bg-[#08335e] text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#062a4d] shadow-xl transition-all disabled:bg-slate-300"
                >
                  {isUploading ? "Processing..." : activeStep === 4 ? "Complete Deposit" : "Next Step →"}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Academic Note */}
        <p className="mt-8 text-center text-[10px] text-slate-400 uppercase tracking-widest leading-relaxed">
          Submission data is synchronized with the <br /> 
          <strong>UIST Editorial Board</strong> for review.
        </p>
      </div>
    </div>
  );
}