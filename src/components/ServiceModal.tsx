import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GovernmentService, UserProfile, VaultDocument } from "../types";
import {
  X,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  FileText,
  Clock,
  IndianRupee,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Upload,
  Info,
  Building,
} from "lucide-react";

interface ServiceModalProps {
  service: GovernmentService | null;
  userProfile: UserProfile | null;
  vaultDocs: VaultDocument[];
  isOpen: boolean;
  onClose: () => void;
  onTrackApplication: (title: string, dept: string, fee: string, portalUrl: string) => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  service,
  userProfile,
  vaultDocs,
  isOpen,
  onClose,
  onTrackApplication,
}) => {
  const [step, setStep] = useState<number>(1);
  const [applicantName, setApplicantName] = useState(userProfile?.fullName || "");
  const [applicantMobile, setApplicantMobile] = useState(userProfile?.mobile || "");
  const [applicantAadhaar, setApplicantAadhaar] = useState("XXXX-XXXX-9845");
  const [annualIncome, setAnnualIncome] = useState("₹1,80,000");
  const [purpose, setPurpose] = useState("Higher Education Scholarship Application");
  const [selectedDocs, setSelectedDocs] = useState<string[]>(["Aadhaar Card", "Ration Card"]);
  const [isReadyForOfficial, setIsReadyForOfficial] = useState(false);

  if (!isOpen || !service) return null;

  const totalSteps = 4; // 1: Overview & Guidelines, 2: Applicant Data, 3: Document Readiness, 4: Review & Redirect

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleApplyOfficial = () => {
    // Record in My Applications
    onTrackApplication(
      service.title,
      service.department,
      service.officialFees,
      service.officialWebsite
    );

    // Open Official Government Portal in a new tab as mandated!
    window.open(service.officialWebsite, "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-[#0B3B60] via-[#09406b] to-[#082a47] text-white flex items-start justify-between border-b border-amber-400/30">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-bold text-[11px] uppercase tracking-wider">
                {service.category}
              </span>
              <span className="text-xs text-blue-200 flex items-center gap-1">
                <Building className="w-3.5 h-3.5" />
                {service.department}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              {service.title}
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

        {/* Step Progress Bar */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex items-center justify-between text-xs font-semibold text-slate-600">
          <div className="flex items-center gap-2">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${step >= 1 ? "bg-[#0B3B60] text-white" : "bg-slate-200 text-slate-600"}`}>
              1
            </span>
            <span className={step === 1 ? "text-[#0B3B60] font-bold" : ""}>Guidelines & Fees</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <div className="flex items-center gap-2">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${step >= 2 ? "bg-[#0B3B60] text-white" : "bg-slate-200 text-slate-600"}`}>
              2
            </span>
            <span className={step === 2 ? "text-[#0B3B60] font-bold" : ""}>Applicant Details</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <div className="flex items-center gap-2">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${step >= 3 ? "bg-[#0B3B60] text-white" : "bg-slate-200 text-slate-600"}`}>
              3
            </span>
            <span className={step === 3 ? "text-[#0B3B60] font-bold" : ""}>Document Vault</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <div className="flex items-center gap-2">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${step >= 4 ? "bg-amber-500 text-white" : "bg-slate-200 text-slate-600"}`}>
              4
            </span>
            <span className={step === 4 ? "text-amber-800 font-bold" : ""}>Official Apply</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* STEP 1: Details, Eligibility, Fees, Processing Time */}
          {step === 1 && (
            <div className="space-y-5">
              <p className="text-sm text-slate-700 leading-relaxed bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                {service.description}
              </p>

              {/* Stat Boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <IndianRupee className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                      Official Government Fee
                    </span>
                    <span className="text-base font-bold text-slate-900">
                      {service.officialFees}
                    </span>
                    <span className="text-[11px] text-slate-500 block mt-0.5">
                      Statutory charge only. Payment made on official govt gateway.
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                      Processing Time
                    </span>
                    <span className="text-base font-bold text-slate-900">
                      {service.processingTime}
                    </span>
                    <span className="text-[11px] text-slate-500 block mt-0.5">
                      Service Guarantee under Right to Public Services Act.
                    </span>
                  </div>
                </div>
              </div>

              {/* Eligibility */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Eligibility Criteria
                </h4>
                <div className="space-y-1.5">
                  {service.eligibility.map((el, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{el}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Required Documents */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Mandatory Required Documents
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {service.documentsRequired.map((doc, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 flex items-center gap-2"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#0B3B60] shrink-0" />
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Application Instructions */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Step-by-Step Instructions
                </h4>
                <ol className="list-decimal list-inside space-y-1 text-xs text-slate-600 leading-relaxed">
                  {service.instructions.map((ins, i) => (
                    <li key={i}>{ins}</li>
                  ))}
                </ol>
              </div>
            </div>
          )}

          {/* STEP 2: Pre-filled Applicant Form */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0" />
                <span>
                  Applicant information automatically loaded from your verified Citizen profile.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Applicant Full Name
                  </label>
                  <input
                    type="text"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium bg-slate-50 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Registered Mobile Number
                  </label>
                  <input
                    type="text"
                    value={applicantMobile}
                    onChange={(e) => setApplicantMobile(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium bg-slate-50 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Aadhaar Reference Number
                  </label>
                  <input
                    type="text"
                    value={applicantAadhaar}
                    onChange={(e) => setApplicantAadhaar(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium bg-slate-50 outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Declared Annual Family Income
                  </label>
                  <input
                    type="text"
                    value={annualIncome}
                    onChange={(e) => setAnnualIncome(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium bg-slate-50 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Purpose of Certificate / Service Request
                </label>
                <input
                  type="text"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder="e.g. Higher Education Admission / Scholarship / Job Recruitment"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium bg-slate-50 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Permanent Residential Address
                </label>
                <textarea
                  rows={2}
                  defaultValue={userProfile?.fullAddress || "Plot 42, Anna Nagar West, Chennai - 600101"}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-medium bg-slate-50 outline-none"
                />
              </div>
            </div>
          )}

          {/* STEP 3: Document Readiness & DigiLocker Link */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Verify Required Documents from Document Vault
                  </h4>
                  <p className="text-xs text-slate-500">
                    Pre-attach verified copies from your DigiLocker Vault.
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  DigiLocker Connected
                </span>
              </div>

              <div className="space-y-2">
                {service.documentsRequired.map((doc, idx) => {
                  const isChecked = selectedDocs.includes(doc);
                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        if (isChecked) {
                          setSelectedDocs(selectedDocs.filter((d) => d !== doc));
                        } else {
                          setSelectedDocs([...selectedDocs, doc]);
                        }
                      }}
                      className={`cursor-pointer p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                        isChecked
                          ? "bg-blue-50/70 border-blue-300 text-blue-950"
                          : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                            isChecked
                              ? "bg-[#0B3B60] text-white border-[#0B3B60]"
                              : "border-slate-300 bg-white"
                          }`}
                        >
                          {isChecked && <CheckCircle2 className="w-4 h-4" />}
                        </span>
                        <div>
                          <span className="text-sm font-semibold block">{doc}</span>
                          <span className="text-[11px] text-slate-500">
                            Available in CitizenOne Vault (Verified)
                          </span>
                        </div>
                      </div>

                      <span className="text-xs font-mono text-emerald-700 font-semibold">
                        Ready
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-xs flex items-start gap-2">
                <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  All documents will be verified directly against the state database. You can also upload additional files on the official government website.
                </span>
              </div>
            </div>
          )}

          {/* STEP 4: Final Review & Redirection Notice */}
          {step === 4 && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs space-y-1">
                <div className="font-bold text-sm text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Application Package Pre-Prepared Successfully
                </div>
                <p>
                  Your pre-fill details and document dossier are ready. Click below to securely transfer to the official government portal.
                </p>
              </div>

              {/* Review Card */}
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 text-xs space-y-2">
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Service:</span>
                  <span className="font-bold text-slate-900">{service.title}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Applicant:</span>
                  <span className="font-bold text-slate-900">{applicantName || userProfile?.fullName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Official Fee Payable:</span>
                  <span className="font-bold text-emerald-700">{service.officialFees}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Processing Window:</span>
                  <span className="font-bold text-slate-900">{service.processingTime}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Official Portal Destination:</span>
                  <span className="font-bold font-mono text-blue-800">{service.officialWebsite}</span>
                </div>
              </div>

              {/* Mandatory Government Rule Notice */}
              <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 text-xs">
                <span className="font-bold text-slate-800 block mb-1">
                  Verified Government Policy:
                </span>
                No financial transactions or fees are collected inside CitizenOne AI. Statutory fees (if applicable) are paid exclusively on the official state revenue / national portal.
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
          ) : (
            <div />
          )}

          {step < totalSteps ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-[#0B3B60] text-white text-xs font-bold hover:bg-[#09406b] flex items-center gap-1.5 shadow"
            >
              <span>Next Step</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={handleApplyOfficial}
              className="px-7 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-white text-sm font-extrabold shadow-lg shadow-amber-600/30 flex items-center gap-2 hover:from-amber-600 hover:to-amber-800"
            >
              <span>Open Official Website</span>
              <ExternalLink className="w-4 h-4" />
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
};
