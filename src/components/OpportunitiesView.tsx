import React, { useState } from "react";
import { motion } from "motion/react";
import { InternshipItem, JobItem, ResumeAnalysisResult } from "../types";
import { INTERNSHIPS_DATA, JOBS_DATA } from "../data/governmentData";
import {
  Lock,
  Unlock,
  Briefcase,
  Building,
  MapPin,
  Clock,
  IndianRupee,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  FileText,
  UploadCloud,
  ChevronRight,
} from "lucide-react";

interface OpportunitiesViewProps {
  isUnlocked: boolean;
  resumeAnalysis: ResumeAnalysisResult | null;
  onGoToResumeUpload: () => void;
  onTrackApplication: (title: string, dept: string, fee: string, portalUrl: string) => void;
}

export const OpportunitiesView: React.FC<OpportunitiesViewProps> = ({
  isUnlocked,
  resumeAnalysis,
  onGoToResumeUpload,
  onTrackApplication,
}) => {
  const [activeTab, setActiveTab] = useState<"internships" | "jobs">("internships");
  const [searchQuery, setSearchQuery] = useState("");

  const handleApply = (title: string, company: string, portalUrl: string) => {
    onTrackApplication(title, company, "₹0 (Direct Recruitment)", portalUrl);
    window.open(portalUrl, "_blank", "noopener,noreferrer");
  };

  // If locked, show the prompt's mandated locked screen
  if (!isUnlocked) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-14 text-center shadow-sm max-w-3xl mx-auto my-6">
        <div className="w-20 h-20 rounded-3xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto mb-5 shadow-inner">
          <Lock className="w-10 h-10" />
        </div>

        <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">
          Gated AI Opportunity Engine
        </span>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Career Opportunities are Currently Locked
        </h3>

        <p className="mt-2 text-base text-slate-600 max-w-lg mx-auto leading-relaxed">
          Upload your resume to calculate your ATS score and unlock verified
          National Internships (NIC, NITI Aayog, ISRO) and Public Sector Jobs
          matched to your verified skillset.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onGoToResumeUpload}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#0d5c48] to-[#07362a] text-white font-bold text-sm shadow-lg shadow-emerald-900/20 flex items-center gap-2 border border-emerald-400/40"
          >
            <UploadCloud className="w-4 h-4 text-emerald-300" />
            <span>Upload Resume to Unlock Opportunities</span>
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Zero Intermediary Fees
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> AI Skill Matching
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Official PSU Links
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1">
              <Unlock className="w-3.5 h-3.5 text-emerald-600" />
              Opportunities Unlocked & Matched
            </span>
            {resumeAnalysis && (
              <span className="text-xs text-slate-500 font-mono">
                ATS Score: {resumeAnalysis.atsScore}/100
              </span>
            )}
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
            Verified Internships & Public Sector Jobs
          </h2>
        </div>

        {/* Tab switch */}
        <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab("internships")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === "internships"
                ? "bg-[#0B3B60] text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Internships ({INTERNSHIPS_DATA.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("jobs")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === "jobs"
                ? "bg-[#0B3B60] text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Govt / PSU Jobs ({JOBS_DATA.length})
          </button>
        </div>
      </div>

      {/* Internships List */}
      {activeTab === "internships" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {INTERNSHIPS_DATA.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-all relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-600" />

              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      {item.type}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-2">
                      {item.role}
                    </h3>
                    <p className="text-xs font-semibold text-slate-600 flex items-center gap-1.5 mt-0.5">
                      <Building className="w-3.5 h-3.5 text-[#0B3B60]" />
                      {item.companyName}
                    </p>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-2 my-4 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 block text-[11px]">Monthly Stipend</span>
                    <span className="font-bold text-slate-900 text-sm flex items-center gap-1">
                      {item.stipend}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 block text-[11px]">Duration & Location</span>
                    <span className="font-bold text-slate-900">
                      {item.duration} • {item.location}
                    </span>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Skills Required:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.skillsRequired.map((skill, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Last Date: <strong>{item.deadline}</strong>
                </span>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleApply(item.role, item.companyName, item.officialWebsite)}
                  className="px-4 py-2 rounded-xl bg-[#0B3B60] hover:bg-[#082a47] text-white text-xs font-bold shadow flex items-center gap-1.5"
                >
                  <span>Official Apply</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Jobs List */}
      {activeTab === "jobs" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {JOBS_DATA.map((job) => (
            <motion.div
              key={job.id}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-all relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-700" />

              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                      {job.type}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-2">
                      {job.position}
                    </h3>
                    <p className="text-xs font-semibold text-slate-600 flex items-center gap-1.5 mt-0.5">
                      <Building className="w-3.5 h-3.5 text-[#0B3B60]" />
                      {job.companyName}
                    </p>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-2 my-4 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 block text-[11px]">Pay Matrix / Salary</span>
                    <span className="font-bold text-slate-900 text-sm">{job.salary}</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 block text-[11px]">Location & Posts</span>
                    <span className="font-bold text-slate-900">
                      {job.location} • {job.vacancies} Posts
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mb-3 line-clamp-2">
                  <strong className="text-slate-800">Eligibility:</strong> {job.eligibility}
                </p>

                {/* Skills */}
                <div className="mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Competencies:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {job.skillsRequired.map((skill, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Last Date: <strong>{job.lastDate}</strong>
                </span>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleApply(job.position, job.companyName, job.officialWebsite)}
                  className="px-4 py-2 rounded-xl bg-[#0B3B60] hover:bg-[#082a47] text-white text-xs font-bold shadow flex items-center gap-1.5"
                >
                  <span>Apply on Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
