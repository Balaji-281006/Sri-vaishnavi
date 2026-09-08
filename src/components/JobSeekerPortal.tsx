import React, { useState } from "react";
import { motion } from "motion/react";
import {
  GovernmentService,
  GovernmentScheme,
  ResumeAnalysisResult,
  SupportedLanguage,
  JobItem,
} from "../types";
import {
  GOVERNMENT_SERVICES,
  GOVERNMENT_SCHEMES,
  JOBS_DATA,
} from "../data/governmentData";
import { ResumeAnalyzer } from "./ResumeAnalyzer";
import { OpportunitiesView } from "./OpportunitiesView";
import { TRANSLATIONS } from "../data/translations";
import {
  Briefcase,
  Search,
  Sparkles,
  FileCheck,
  Award,
  BookOpen,
  Building,
  ExternalLink,
  ChevronRight,
  IndianRupee,
  Calendar,
  Lock,
  Unlock,
  CheckCircle2,
  FileText,
  Filter,
  Layers,
  GraduationCap,
} from "lucide-react";

interface JobSeekerPortalProps {
  currentLanguage: SupportedLanguage;
  resumeAnalysis: ResumeAnalysisResult | null;
  onResumeAnalysisComplete: (result: ResumeAnalysisResult) => void;
  onSelectService: (service: GovernmentService) => void;
  onSelectScheme: (scheme: GovernmentScheme) => void;
  onTrackApplication: (title: string, dept: string, fee: string, portalUrl: string) => void;
}

export const JobSeekerPortal: React.FC<JobSeekerPortalProps> = ({
  currentLanguage,
  resumeAnalysis,
  onResumeAnalysisComplete,
  onSelectService,
  onSelectScheme,
  onTrackApplication,
}) => {
  const t = TRANSLATIONS[currentLanguage];

  // Active view column: 'services' | 'schemes' | 'certificates' | 'resume' | 'jobs'
  const [activeColumn, setActiveColumn] = useState<
    "services" | "schemes" | "certificates" | "resume" | "jobs"
  >("services");

  const [searchQuery, setSearchQuery] = useState("");

  const isOpportunitiesUnlocked = !!resumeAnalysis;

  // Filter government services for employment & citizen
  const employmentServices = GOVERNMENT_SERVICES.filter(
    (s) =>
      s.category === "Citizen Services" ||
      s.id.includes("ncs") ||
      s.id.includes("upsc") ||
      s.id.includes("employment")
  );

  // Filter certificates
  const certificateServices = GOVERNMENT_SERVICES.filter(
    (s) =>
      s.category === "Certificates" ||
      s.id.includes("skill-cert") ||
      s.id.includes("police-clearance")
  );

  // Filter career & employment schemes
  const employmentSchemes = GOVERNMENT_SCHEMES.filter(
    (s) =>
      s.category === "Employment" ||
      s.forRoles.includes("jobseeker") ||
      s.forRoles.includes("student")
  );

  // Search filter logic
  const filteredServices = employmentServices.filter(
    (s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSchemes = employmentSchemes.filter(
    (s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.ministry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.benefits.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCertificates = certificateServices.filter(
    (s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#2e1065] via-[#4c1d95] to-[#1e1b4b] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg border-b border-purple-400/40">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-400/20 border border-purple-400/40 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Briefcase className="w-3.5 h-3.5 text-purple-300" />
            National Employment, Career & Skill Gateway
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {t.jobSeekerPortal || "Job Seeker & Professional Portal"}
          </h2>
          <p className="mt-2 text-sm text-purple-100/90 leading-relaxed">
            Tailored for graduated students, job seekers, professionals, and aspiring officials.
            Search across employment services, government career schemes, skill certificates,
            and leverage our AI Resume ATS Analyzer to unlock verified PSU and Tech jobs.
          </p>
        </div>

        {/* Quick telemetry indicators */}
        <div className="mt-6 pt-5 border-t border-purple-400/20 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2.5">
            <span className="text-purple-200 block text-[10px] uppercase font-bold">Recruitment Hub</span>
            <span className="text-white font-extrabold text-sm">Central & PSU Jobs</span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2.5">
            <span className="text-purple-200 block text-[10px] uppercase font-bold">NCS Integration</span>
            <span className="text-white font-extrabold text-sm">16-Digit Jobseeker ID</span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2.5">
            <span className="text-purple-200 block text-[10px] uppercase font-bold">AI Diagnostics</span>
            <span className="text-white font-extrabold text-sm">ATS 0-100 Score</span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2.5">
            <span className="text-purple-200 block text-[10px] uppercase font-bold">Skill India</span>
            <span className="text-white font-extrabold text-sm">100% Free Training</span>
          </div>
        </div>
      </div>

      {/* Primary Column / Navigation Selector */}
      <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-sm">
        <div className="flex flex-wrap items-center gap-1.5">
          {/* Services Column */}
          <button
            type="button"
            onClick={() => setActiveColumn("services")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeColumn === "services"
                ? "bg-[#0B3B60] text-white shadow-md"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Building className="w-4 h-4" />
            <span>Employment Services ({employmentServices.length})</span>
          </button>

          {/* Schemes Column */}
          <button
            type="button"
            onClick={() => setActiveColumn("schemes")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeColumn === "schemes"
                ? "bg-[#0B3B60] text-white shadow-md"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Career Schemes ({employmentSchemes.length})</span>
          </button>

          {/* Certificates Column */}
          <button
            type="button"
            onClick={() => setActiveColumn("certificates")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeColumn === "certificates"
                ? "bg-[#0B3B60] text-white shadow-md"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Certificates ({certificateServices.length})</span>
          </button>

          {/* AI Resume Analyzer Column */}
          <button
            type="button"
            onClick={() => setActiveColumn("resume")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeColumn === "resume"
                ? "bg-purple-700 text-white shadow-md"
                : "text-purple-700 hover:bg-purple-50"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>AI Resume Analyzer</span>
            {resumeAnalysis && (
              <span className="px-1.5 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold">
                {resumeAnalysis.atsScore}% ATS
              </span>
            )}
          </button>

          {/* PSU & Tech Jobs Column */}
          <button
            type="button"
            onClick={() => setActiveColumn("jobs")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ml-auto ${
              activeColumn === "jobs"
                ? "bg-indigo-700 text-white shadow-md"
                : isOpportunitiesUnlocked
                ? "text-indigo-700 hover:bg-indigo-50"
                : "text-slate-400 hover:bg-slate-50"
            }`}
          >
            {isOpportunitiesUnlocked ? (
              <Unlock className="w-4 h-4 text-emerald-600" />
            ) : (
              <Lock className="w-4 h-4 text-amber-500" />
            )}
            <span>Jobs & PSUs</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                isOpportunitiesUnlocked
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-amber-100 text-amber-800"
              }`}
            >
              {isOpportunitiesUnlocked ? "Unlocked" : "Locked"}
            </span>
          </button>
        </div>
      </div>

      {/* Global Search & Filter Bar (shown on services, schemes, and certificates columns) */}
      {(activeColumn === "services" ||
        activeColumn === "schemes" ||
        activeColumn === "certificates") && (
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${activeColumn} (e.g., NCS ID, UPSC, Skill India, PMKVY)...`}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-[#0B3B60]"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 w-full sm:w-auto justify-between sm:justify-end">
            <span>Viewing {activeColumn.toUpperCase()} Column</span>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-blue-700 hover:underline font-bold"
              >
                Clear Search
              </button>
            )}
          </div>
        </div>
      )}

      {/* COLUMN 1: SERVICES VIEW */}
      {activeColumn === "services" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Building className="w-5 h-5 text-blue-700" />
              <span>Government Employment Services & Registration</span>
            </h3>
            <span className="text-xs text-slate-500 font-semibold">
              Showing {filteredServices.length} Statutory Services
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 text-[11px] font-bold">
                      {service.category}
                    </span>
                    {service.badge && (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[11px] font-bold">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  <h4 className="text-base font-bold text-slate-900 mb-1">
                    {service.title}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium mb-3">
                    {service.department}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {service.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 mb-4 p-2.5 rounded-xl bg-slate-50 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-bold">Official Fee</span>
                      <span className="font-bold text-slate-800">{service.officialFees}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-bold">Processing Time</span>
                      <span className="font-bold text-slate-800">{service.processingTime}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectService(service)}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                  >
                    View Guidelines
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        onTrackApplication(
                          service.title,
                          service.department,
                          service.officialFees,
                          service.officialWebsite
                        )
                      }
                      className="px-3.5 py-1.5 rounded-lg bg-[#0B3B60] hover:bg-[#082a47] text-white text-xs font-bold shadow-sm transition-colors"
                    >
                      Apply & Track
                    </button>
                    <a
                      href={service.officialWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-blue-700 hover:bg-blue-50"
                      title="Open Official Portal"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* COLUMN 2: SCHEMES VIEW */}
      {activeColumn === "schemes" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <span>Government Employment, Skill & Apprenticeship Schemes</span>
            </h3>
            <span className="text-xs text-slate-500 font-semibold">
              Showing {filteredSchemes.length} Active Schemes
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredSchemes.map((scheme) => (
              <div
                key={scheme.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[11px] font-bold">
                      {scheme.category}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {scheme.lastDate}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 mb-1">
                    {scheme.title}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium mb-3">
                    {scheme.ministry}
                  </p>

                  <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/60 mb-3 text-xs text-amber-950 font-medium leading-relaxed">
                    <strong className="text-amber-900 font-bold block mb-0.5">Key Benefit:</strong>
                    {scheme.benefits}
                  </div>

                  <div className="text-xs text-slate-600 space-y-1 mb-4">
                    <span className="font-bold text-slate-700 block text-[11px]">Eligibility:</span>
                    <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-600 pl-1">
                      {scheme.eligibility.slice(0, 2).map((el, i) => (
                        <li key={i} className="truncate">{el}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectScheme(scheme)}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                  >
                    View Criteria
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        onTrackApplication(
                          scheme.title,
                          scheme.ministry,
                          "₹0 (Direct Government Benefit)",
                          scheme.officialWebsite
                        )
                      }
                      className="px-3.5 py-1.5 rounded-lg bg-[#0B3B60] hover:bg-[#082a47] text-white text-xs font-bold shadow-sm transition-colors"
                    >
                      Apply & Track
                    </button>
                    <a
                      href={scheme.officialWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-blue-700 hover:bg-blue-50"
                      title="Open Official Portal"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* COLUMN 3: CERTIFICATES VIEW */}
      {activeColumn === "certificates" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-700" />
              <span>Verifiable Employment & Skill Certificates</span>
            </h3>
            <span className="text-xs text-slate-500 font-semibold">
              Showing {filteredCertificates.length} Certificates
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredCertificates.map((cert) => (
              <div
                key={cert.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-800 text-[11px] font-bold">
                      {cert.category}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Verifiable
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 mb-1">
                    {cert.title}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium mb-3">
                    {cert.department}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {cert.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 mb-4 p-2.5 rounded-xl bg-purple-50/50 border border-purple-100 text-xs">
                    <div>
                      <span className="text-[10px] text-purple-900 block font-bold">Fees</span>
                      <span className="font-bold text-slate-800">{cert.officialFees}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-purple-900 block font-bold">Turnaround Time</span>
                      <span className="font-bold text-slate-800">{cert.processingTime}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectService(cert)}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                  >
                    View Details
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        onTrackApplication(
                          cert.title,
                          cert.department,
                          cert.officialFees,
                          cert.officialWebsite
                        )
                      }
                      className="px-3.5 py-1.5 rounded-lg bg-purple-800 hover:bg-purple-900 text-white text-xs font-bold shadow-sm transition-colors"
                    >
                      Verify / Apply
                    </button>
                    <a
                      href={cert.officialWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-purple-700 hover:bg-purple-50"
                      title="Open Official Portal"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* COLUMN 4: AI RESUME ANALYZER VIEW */}
      {activeColumn === "resume" && (
        <div className="space-y-6">
          <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-700 text-white flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-purple-950">
                  AI ATS Resume Engine for Graduated Students & Professionals
                </h4>
                <p className="text-xs text-purple-700">
                  Analyze your CV for PSU, GovTech, and corporate recruitments. Calculates ATS score,
                  identifies skill gaps, and recommends SWAYAM/NPTEL government-accredited courses.
                </p>
              </div>
            </div>

            {isOpportunitiesUnlocked && (
              <button
                type="button"
                onClick={() => setActiveColumn("jobs")}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5 hover:bg-emerald-700 shadow-sm"
              >
                <Unlock className="w-3.5 h-3.5" />
                <span>View Unlocked Jobs</span>
              </button>
            )}
          </div>

          <ResumeAnalyzer
            currentAnalysis={resumeAnalysis}
            onAnalysisComplete={onResumeAnalysisComplete}
            onViewMatchingOpportunities={() => setActiveColumn("jobs")}
          />
        </div>
      )}

      {/* COLUMN 5: JOBS & PSUs VIEW */}
      {activeColumn === "jobs" && (
        <OpportunitiesView
          isUnlocked={isOpportunitiesUnlocked}
          resumeAnalysis={resumeAnalysis}
          onGoToResumeUpload={() => setActiveColumn("resume")}
          onTrackApplication={onTrackApplication}
        />
      )}
    </div>
  );
};
