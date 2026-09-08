import React, { useState } from "react";
import { motion } from "motion/react";
import {
  ScholarshipItem,
  GovernmentScheme,
  ResumeAnalysisResult,
  SupportedLanguage,
} from "../types";
import { SCHOLARSHIPS_DATA, GOVERNMENT_SCHEMES } from "../data/governmentData";
import { ResumeAnalyzer } from "./ResumeAnalyzer";
import { OpportunitiesView } from "./OpportunitiesView";
import { TRANSLATIONS } from "../data/translations";
import {
  GraduationCap,
  Sparkles,
  BookOpen,
  Briefcase,
  Award,
  Search,
  ExternalLink,
  ChevronRight,
  IndianRupee,
  Calendar,
  Lock,
  Unlock,
  CheckCircle2,
} from "lucide-react";

interface StudentPortalProps {
  currentLanguage: SupportedLanguage;
  resumeAnalysis: ResumeAnalysisResult | null;
  onResumeAnalysisComplete: (result: ResumeAnalysisResult) => void;
  onSelectScholarship: (item: ScholarshipItem) => void;
  onSelectScheme: (scheme: GovernmentScheme) => void;
  onTrackApplication: (title: string, dept: string, fee: string, portalUrl: string) => void;
}

export const StudentPortal: React.FC<StudentPortalProps> = ({
  currentLanguage,
  resumeAnalysis,
  onResumeAnalysisComplete,
  onSelectScholarship,
  onSelectScheme,
  onTrackApplication,
}) => {
  const t = TRANSLATIONS[currentLanguage];
  const [activeTab, setActiveTab] = useState<
    "scholarships" | "resume" | "opportunities" | "education-schemes"
  >("scholarships");

  const [scholarshipCategory, setScholarshipCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const isOpportunitiesUnlocked = !!resumeAnalysis;

  // Education schemes from GOVERNMENT_SCHEMES
  const educationSchemes = GOVERNMENT_SCHEMES.filter(
    (s) => s.category === "Education" || s.forRoles.includes("student")
  );

  const filteredScholarships = SCHOLARSHIPS_DATA.filter((item) => {
    const matchesCategory =
      scholarshipCategory === "All" || item.category === scholarshipCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.provider.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Student Portal Banner */}
      <div className="bg-gradient-to-r from-[#0d5c48] via-[#094838] to-[#063327] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg border-b border-emerald-400/40">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/20 border border-emerald-400/40 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
            National Youth, Student & Scholar Gateway
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {t.studentPortal}
          </h2>
          <p className="mt-2 text-sm text-emerald-100/90 leading-relaxed">
            Direct Central & State Scholarships (NSP, PMRF, Pragati), AI Resume
            ATS scoring, SWAYAM course recommendations, and verified Public Sector
            career opportunities.
          </p>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex rounded-2xl bg-slate-100 p-1.5 border border-slate-200 overflow-x-auto no-scrollbar">
        <button
          type="button"
          onClick={() => setActiveTab("scholarships")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === "scholarships"
              ? "bg-[#0d5c48] text-white shadow-md"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Award className="w-4 h-4" />
          <span>National Scholarships ({SCHOLARSHIPS_DATA.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("resume")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === "resume"
              ? "bg-[#0d5c48] text-white shadow-md"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>AI Resume Analyzer {resumeAnalysis ? "(Score: " + resumeAnalysis.atsScore + ")" : ""}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("opportunities")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === "opportunities"
              ? "bg-[#0d5c48] text-white shadow-md"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          {isOpportunitiesUnlocked ? (
            <Unlock className="w-4 h-4 text-emerald-600" />
          ) : (
            <Lock className="w-4 h-4 text-amber-600" />
          )}
          <span>Internships & Jobs {isOpportunitiesUnlocked ? "(Unlocked)" : "(Locked)"}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("education-schemes")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === "education-schemes"
              ? "bg-[#0d5c48] text-white shadow-md"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Education Schemes & Loans</span>
        </button>
      </div>

      {/* Tab 1: Scholarships View */}
      {activeTab === "scholarships" && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search scholarships or provider..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-[#0d5c48] bg-slate-50"
                />
              </div>

              <span className="text-xs text-slate-500">
                Disbursed directly via DBT into student bank account
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
              {[
                "All",
                "School Students",
                "UG Students",
                "PG Students",
                "Research Scholars",
                "Women Scholarships",
                "Minority Scholarships",
                "State Scholarships",
              ].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setScholarshipCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    scholarshipCategory === cat
                      ? "bg-[#0d5c48] text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Scholarships Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredScholarships.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-all relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-600" />

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-500 mb-4 line-clamp-1">
                    {item.provider}
                  </p>

                  <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                      Grant Amount
                    </span>
                    <span className="text-sm font-extrabold text-slate-900">
                      {item.amount}
                    </span>
                  </div>

                  <div className="text-xs text-slate-600 mb-4">
                    <strong className="text-slate-700 block mb-1">Eligibility:</strong>
                    <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-600">
                      {item.eligibility.slice(0, 2).map((el, idx) => (
                        <li key={idx} className="line-clamp-1">{el}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">
                    Closes: <strong>{item.lastDate}</strong>
                  </span>

                  <button
                    type="button"
                    onClick={() => onSelectScholarship(item)}
                    className="px-4 py-2 rounded-xl bg-[#0d5c48] hover:bg-[#0a4637] text-white text-xs font-bold shadow flex items-center gap-1"
                  >
                    <span>View & Apply</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Resume Analyzer View */}
      {activeTab === "resume" && (
        <ResumeAnalyzer
          currentAnalysis={resumeAnalysis}
          onAnalysisComplete={onResumeAnalysisComplete}
          onViewMatchingOpportunities={() => setActiveTab("opportunities")}
        />
      )}

      {/* Tab 3: Opportunities View (Internships & Jobs) */}
      {activeTab === "opportunities" && (
        <OpportunitiesView
          isUnlocked={isOpportunitiesUnlocked}
          resumeAnalysis={resumeAnalysis}
          onGoToResumeUpload={() => setActiveTab("resume")}
          onTrackApplication={onTrackApplication}
        />
      )}

      {/* Tab 4: Education Schemes */}
      {activeTab === "education-schemes" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {educationSchemes.map((scheme) => (
            <div
              key={scheme.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {scheme.category}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-2 mb-1">
                  {scheme.title}
                </h3>
                <p className="text-xs text-slate-500 mb-3">{scheme.ministry}</p>
                <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200 mb-4">
                  {scheme.benefits}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">Free Scheme</span>
                <button
                  type="button"
                  onClick={() => onSelectScheme(scheme)}
                  className="px-4 py-2 rounded-xl bg-[#0d5c48] text-white text-xs font-bold hover:bg-[#0a4637] flex items-center gap-1.5"
                >
                  <span>Apply on Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
