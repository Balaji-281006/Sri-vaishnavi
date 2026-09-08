import React from "react";
import { motion } from "motion/react";
import { ScholarshipItem, UserProfile } from "../types";
import {
  X,
  GraduationCap,
  IndianRupee,
  CheckCircle2,
  FileText,
  Calendar,
  ExternalLink,
  Award,
} from "lucide-react";

interface ScholarshipModalProps {
  scholarship: ScholarshipItem | null;
  userProfile: UserProfile | null;
  isOpen: boolean;
  onClose: () => void;
  onTrackApplication: (title: string, dept: string, fee: string, portalUrl: string) => void;
}

export const ScholarshipModal: React.FC<ScholarshipModalProps> = ({
  scholarship,
  userProfile,
  isOpen,
  onClose,
  onTrackApplication,
}) => {
  if (!isOpen || !scholarship) return null;

  const handleApplyOfficial = () => {
    onTrackApplication(
      scholarship.title,
      scholarship.provider,
      "₹0 (Direct Benefit Transfer)",
      scholarship.officialWebsite
    );
    window.open(scholarship.officialWebsite, "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-[#0d5c48] via-[#107058] to-[#0a4637] text-white flex items-start justify-between border-b border-emerald-400/30">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-300 text-emerald-950 font-bold text-[11px] uppercase tracking-wider">
                {scholarship.category}
              </span>
              <span className="text-xs text-emerald-100 flex items-center gap-1">
                <Award className="w-3.5 h-3.5" />
                {scholarship.provider}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              {scholarship.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-emerald-100 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {/* Amount Callout */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <IndianRupee className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">
                Sanctioned Financial Assistance
              </span>
              <span className="text-lg font-extrabold text-slate-900">
                {scholarship.amount}
              </span>
            </div>
          </div>

          {/* Eligibility */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Eligibility Requirements
            </h4>
            <div className="space-y-2">
              {scholarship.eligibility.map((el, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{el}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Required Documents */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Documents for Verification
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {scholarship.requiredDocuments.map((doc, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 flex items-center gap-2"
                >
                  <FileText className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Application Process */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Application Process Steps
            </h4>
            <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-700">
              {scholarship.applicationProcess.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>

          {/* Last Date */}
          <div className="flex items-center gap-2 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
            <Calendar className="w-4 h-4 text-slate-500" />
            <span>Application Deadline: <strong>{scholarship.lastDate}</strong></span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900"
          >
            Cancel
          </button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={handleApplyOfficial}
            className="px-6 py-2.5 rounded-xl bg-[#0d5c48] hover:bg-[#0a4637] text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-2"
          >
            <span>Apply on National Portal</span>
            <ExternalLink className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
