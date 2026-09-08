import React from "react";
import { motion } from "motion/react";
import { GovernmentScheme, UserProfile } from "../types";
import {
  X,
  Building,
  CheckCircle2,
  Calendar,
  ExternalLink,
  FileText,
  Gift,
  ShieldCheck,
} from "lucide-react";

interface SchemeModalProps {
  scheme: GovernmentScheme | null;
  userProfile: UserProfile | null;
  isOpen: boolean;
  onClose: () => void;
  onTrackApplication: (title: string, dept: string, fee: string, portalUrl: string) => void;
}

export const SchemeModal: React.FC<SchemeModalProps> = ({
  scheme,
  userProfile,
  isOpen,
  onClose,
  onTrackApplication,
}) => {
  if (!isOpen || !scheme) return null;

  const handleApplyOfficial = () => {
    onTrackApplication(
      scheme.title,
      scheme.ministry,
      "₹0 (Government Welfare Scheme)",
      scheme.officialWebsite
    );
    window.open(scheme.officialWebsite, "_blank", "noopener,noreferrer");
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
        <div className="p-6 bg-gradient-to-r from-[#0B3B60] via-[#09406b] to-[#082a47] text-white flex items-start justify-between border-b border-amber-400/30">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-bold text-[11px] uppercase tracking-wider">
                {scheme.category}
              </span>
              <span className="text-xs text-blue-200 flex items-center gap-1">
                <Building className="w-3.5 h-3.5" />
                {scheme.ministry}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              {scheme.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-slate-200 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {/* Key Benefits */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider mb-2">
              <Gift className="w-4 h-4 text-amber-700" />
              Direct Benefits & Financial Entitlement
            </div>
            <p className="text-sm font-semibold text-slate-800 leading-relaxed">
              {scheme.benefits}
            </p>
          </div>

          {/* Eligibility */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Eligibility Conditions
            </h4>
            <div className="space-y-2">
              {scheme.eligibility.map((el, i) => (
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
              Mandatory Documents
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {scheme.documentsRequired.map((doc, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 flex items-center gap-2"
                >
                  <FileText className="w-3.5 h-3.5 text-[#0B3B60] shrink-0" />
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Last Date & Official Disclaimer */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-500" />
              <span>Application Cycle: <strong>{scheme.lastDate}</strong></span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Free Government Benefit</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900"
          >
            Close
          </button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={handleApplyOfficial}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-2"
          >
            <span>Apply on Official Portal</span>
            <ExternalLink className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
