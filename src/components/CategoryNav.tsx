import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AppScreen, SupportedLanguage, GovernmentService, GovernmentScheme } from "../types";
import { GOVERNMENT_SERVICES, GOVERNMENT_SCHEMES } from "../data/governmentData";
import { TRANSLATIONS } from "../data/translations";
import {
  Users,
  HeartHandshake,
  GraduationCap,
  Briefcase,
  ArrowRight,
  Sparkles,
  Search,
  CheckCircle2,
  Shield,
  Award,
  Landmark,
  FileText,
  Clock,
  ExternalLink,
  ChevronRight,
  Filter,
  IndianRupee,
  PhoneCall,
  Smartphone,
  Layers,
} from "lucide-react";

interface CategoryNavProps {
  currentLanguage: SupportedLanguage;
  onSelectCategory: (category: AppScreen) => void;
  onSelectService?: (service: GovernmentService) => void;
  onSelectScheme?: (scheme: GovernmentScheme) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  currentLanguage,
  onSelectCategory,
  onSelectService,
  onSelectScheme,
}) => {
  const t = TRANSLATIONS[currentLanguage];

  // 1. Interactive 3-Step Eligibility Finder State (Iconic myScheme feature)
  const [beneficiaryType, setBeneficiaryType] = useState<
    "all" | "senior" | "student" | "jobseeker" | "farmer" | "women"
  >("all");
  const [selectedState, setSelectedState] = useState("All India");
  const [socialCategory, setSocialCategory] = useState("all");

  // Dynamic Matching Calculations
  const matchingSchemes = GOVERNMENT_SCHEMES.filter((sch) => {
    if (beneficiaryType === "senior") {
      return (
        sch.category === "Senior Citizens" ||
        sch.category === "Healthcare" ||
        sch.tags.includes("Senior Citizen") ||
        sch.tags.includes("Pension")
      );
    }
    if (beneficiaryType === "student") {
      return (
        sch.category === "Education" ||
        sch.category === "Skill Development" ||
        sch.tags.includes("Student") ||
        sch.tags.includes("Scholarship")
      );
    }
    if (beneficiaryType === "jobseeker") {
      return (
        sch.category === "Skill Development" ||
        sch.tags.includes("Employment") ||
        sch.tags.includes("Job") ||
        sch.tags.includes("Apprentice")
      );
    }
    if (beneficiaryType === "farmer") {
      return sch.category === "Farmers" || sch.tags.includes("Farmers");
    }
    if (beneficiaryType === "women") {
      return sch.category === "Women" || sch.tags.includes("Women");
    }
    return true;
  });

  const matchingServices = GOVERNMENT_SERVICES.filter((srv) => {
    if (beneficiaryType === "senior") {
      return srv.id === "srv-aadhaar" || srv.id === "srv-income-cert";
    }
    return true;
  });

  const totalMatchingCount = matchingSchemes.length + matchingServices.length;

  // UMANG Iconic Most-Used Citizen Services
  const trendingServices = [
    {
      id: "srv-aadhaar",
      title: "Aadhaar Card Download & Update",
      department: "UIDAI • MeitY",
      tag: "Identity & KYC",
      fee: "₹0 to ₹50",
      time: "Instant",
      icon: Shield,
      accent: "from-blue-600 to-indigo-700",
    },
    {
      id: "sch-pm-kisan",
      title: "PM-Kisan 16th Installment (₹2,000 DBT)",
      department: "Ministry of Agriculture",
      tag: "Direct Benefit Transfer",
      fee: "₹0 (Free)",
      time: "Quarterly DBT",
      icon: Landmark,
      accent: "from-emerald-600 to-teal-700",
    },
    {
      id: "sch-ayushman-bharat",
      title: "Ayushman Bharat PM-JAY 70+ Card",
      department: "National Health Authority",
      tag: "Universal ₹5 Lakh Cashless",
      fee: "₹0 (Free)",
      time: "Instant E-Card",
      icon: HeartHandshake,
      accent: "from-rose-600 to-red-700",
    },
    {
      id: "srv-pan-card",
      title: "Instant e-PAN Card Issuance",
      department: "Income Tax Department",
      tag: "Financial Identity",
      fee: "Free (e-PAN)",
      time: "10 Minutes",
      icon: FileText,
      accent: "from-amber-600 to-orange-700",
    },
    {
      id: "sch-pmkvy",
      title: "PM Kaushal Vikas Yojana (PMKVY 4.0)",
      department: "Ministry of Skill Development",
      tag: "Free Training + ₹8,000 Stipend",
      fee: "100% Free",
      time: "3 to 6 Months",
      icon: Award,
      accent: "from-purple-600 to-violet-700",
    },
    {
      id: "sch-nsp-pre-matric",
      title: "National Scholarship Portal (NSP 2026)",
      department: "Ministry of Education",
      tag: "Direct DBT to Bank",
      fee: "₹0 (Free)",
      time: "Academic Session",
      icon: GraduationCap,
      accent: "from-teal-600 to-cyan-700",
    },
  ];

  const handleTrendingClick = (itemId: string) => {
    const srv = GOVERNMENT_SERVICES.find((s) => s.id === itemId);
    if (srv && onSelectService) {
      onSelectService(srv);
      return;
    }
    const sch = GOVERNMENT_SCHEMES.find((s) => s.id === itemId);
    if (sch && onSelectScheme) {
      onSelectScheme(sch);
      return;
    }
    onSelectCategory("citizen-portal");
  };

  const handleApplyFiltered = () => {
    if (beneficiaryType === "senior") {
      onSelectCategory("senior-portal");
    } else if (beneficiaryType === "student") {
      onSelectCategory("student-portal");
    } else if (beneficiaryType === "jobseeker") {
      onSelectCategory("jobseeker-portal");
    } else {
      onSelectCategory("citizen-portal");
    }
  };

  // Primary Dedicated Portals (Bento Cards)
  const portals = [
    {
      screen: "citizen-portal" as AppScreen,
      title: t.citizenPortal,
      nativeTitle: "नागरिक सेवाएं एवं योजनाएं",
      subtitle: "Certificates, Direct Benefit Transfer, Revenue Records, Family Cards, Farmer Welfare",
      icon: Users,
      badge: "Universal Services",
      accentBadge: "1,200+ Services",
      gradient: "from-[#0B3B60] to-[#12588f]",
      border: "border-blue-200 hover:border-blue-600",
      accent: "text-blue-700 bg-blue-50",
    },
    {
      screen: "senior-portal" as AppScreen,
      title: "Senior Citizen Dedicated Gateway",
      nativeTitle: "वरिष्ठ नागरिक सेवा केंद्र (60+)",
      subtitle: "₹5 Lakh Ayushman 70+ Healthcare, Digital Life Certificate, Pensions, 1-Touch Free Access",
      icon: HeartHandshake,
      badge: "Aged 60+ (Free)",
      accentBadge: "Doorstep Visit",
      gradient: "from-[#8B4513] to-[#c26d2e]",
      border: "border-amber-300 hover:border-amber-600",
      accent: "text-amber-900 bg-amber-100",
    },
    {
      screen: "student-portal" as AppScreen,
      title: t.studentPortal,
      nativeTitle: "विद्यार्थी एवं युवा मंच",
      subtitle: "National Scholarships (NSP), AI Resume Analyzer, Govt Internships, Skill India Certifications",
      icon: GraduationCap,
      badge: "Youth & Learners",
      accentBadge: "AI ATS Engine",
      gradient: "from-[#0d5c48] to-[#179676]",
      border: "border-emerald-200 hover:border-emerald-600",
      accent: "text-emerald-800 bg-emerald-50",
    },
    {
      screen: "jobseeker-portal" as AppScreen,
      title: t.jobSeekerPortal || "Job Seeker & Professional Portal",
      nativeTitle: "रोजगार एवं व्यावसायिक मंच",
      subtitle: "AI Resume ATS Score, PSU & Tech Jobs, Skill India Certificates, NCS 16-Digit Job Registration",
      icon: Briefcase,
      badge: "Careers & Jobs",
      accentBadge: "PSU & Tech Jobs",
      gradient: "from-[#4a1d96] to-[#6d28d9]",
      border: "border-purple-200 hover:border-purple-600",
      accent: "text-purple-800 bg-purple-50",
    },
  ];

  return (
    <div className="space-y-10">
      {/* 1. NATIONAL STATS TICKER RIBBON (Signature UMANG & myScheme Real Government Pattern) */}
      <div className="bg-gradient-to-r from-[#031527] via-[#092e4f] to-[#041a30] text-white rounded-3xl p-5 sm:p-6 shadow-xl border border-amber-400/30">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
          <div className="p-2">
            <span className="text-[10px] sm:text-xs text-amber-300 font-bold uppercase tracking-wider block">
              Central & State Services
            </span>
            <span className="text-2xl sm:text-3xl font-black text-white font-sans mt-0.5 block">
              1,840+
            </span>
            <span className="text-[10px] text-slate-300">UMANG Catalog</span>
          </div>

          <div className="p-2">
            <span className="text-[10px] sm:text-xs text-amber-300 font-bold uppercase tracking-wider block">
              Active Welfare Schemes
            </span>
            <span className="text-2xl sm:text-3xl font-black text-white font-sans mt-0.5 block">
              850+
            </span>
            <span className="text-[10px] text-slate-300">myScheme Database</span>
          </div>

          <div className="p-2">
            <span className="text-[10px] sm:text-xs text-amber-300 font-bold uppercase tracking-wider block">
              Direct Benefit Transfer
            </span>
            <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-sans mt-0.5 block">
              ₹4.2L Cr+
            </span>
            <span className="text-[10px] text-slate-300">Disbursed via Aadhaar</span>
          </div>

          <div className="p-2">
            <span className="text-[10px] sm:text-xs text-amber-300 font-bold uppercase tracking-wider block">
              Enrolled Citizens
            </span>
            <span className="text-2xl sm:text-3xl font-black text-white font-sans mt-0.5 block">
              5.2 Cr+
            </span>
            <span className="text-[10px] text-slate-300">Verified Beneficiaries</span>
          </div>

          <div className="p-2 col-span-2 md:col-span-1 flex flex-col items-center justify-center">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[10px] font-extrabold uppercase">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              100% Free Service
            </span>
            <span className="text-[10px] text-slate-300 mt-1">Zero Processing Charges</span>
          </div>
        </div>
      </div>

      {/* 2. THE SIGNATURE MYSCHEME INTERACTIVE ELIGIBILITY CHECKER (3-Step Scheme Engine) */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-xs font-black uppercase tracking-wider mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              myScheme Powered Eligibility Engine
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              Find Schemes & Public Services For You (अपनी योजनाएं खोजें)
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Select your profile details to instantly discover tailored central and state government entitlements.
            </p>
          </div>

          {/* Real-time Match Badge */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3 text-center sm:text-right shrink-0">
            <span className="text-[10px] font-bold text-slate-500 uppercase block">Eligible Opportunities</span>
            <span className="text-xl sm:text-2xl font-black text-[#0B3B60]">
              {totalMatchingCount} Schemes & Services
            </span>
          </div>
        </div>

        {/* 3 Step Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Step 1: Beneficiary Type */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center justify-between">
              <span>Step 1: I am a...</span>
              <span className="text-slate-400 font-normal text-[10px]">Required</span>
            </label>
            <select
              value={beneficiaryType}
              onChange={(e) => setBeneficiaryType(e.target.value as any)}
              className="w-full px-3.5 py-3 rounded-xl border border-slate-300 text-xs sm:text-sm font-bold text-slate-800 bg-slate-50 outline-none focus:ring-2 focus:ring-[#0B3B60]"
            >
              <option value="all">Any Citizen / General Public</option>
              <option value="senior">Senior Citizen (Aged 60+)</option>
              <option value="student">Student & Youth Scholar</option>
              <option value="jobseeker">Job Seeker & Graduated Professional</option>
              <option value="farmer">Farmer / Agricultural Earner</option>
              <option value="women">Woman Beneficiary & Child Care</option>
            </select>
          </div>

          {/* Step 2: State / UT */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center justify-between">
              <span>Step 2: My State / UT</span>
              <span className="text-slate-400 font-normal text-[10px]">All 28 States & 8 UTs</span>
            </label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full px-3.5 py-3 rounded-xl border border-slate-300 text-xs sm:text-sm font-bold text-slate-800 bg-slate-50 outline-none focus:ring-2 focus:ring-[#0B3B60]"
            >
              <option value="All India">All India (Central Sector Schemes)</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Delhi">Delhi NCT</option>
              <option value="West Bengal">West Bengal</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Kerala">Kerala</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Bihar">Bihar</option>
            </select>
          </div>

          {/* Step 3: Social Category */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center justify-between">
              <span>Step 3: Category / Area</span>
              <span className="text-slate-400 font-normal text-[10px]">Welfare Reservation</span>
            </label>
            <select
              value={socialCategory}
              onChange={(e) => setSocialCategory(e.target.value)}
              className="w-full px-3.5 py-3 rounded-xl border border-slate-300 text-xs sm:text-sm font-bold text-slate-800 bg-slate-50 outline-none focus:ring-2 focus:ring-[#0B3B60]"
            >
              <option value="all">All Categories</option>
              <option value="general">General</option>
              <option value="obc">OBC (Other Backward Classes)</option>
              <option value="sc">SC (Scheduled Castes)</option>
              <option value="st">ST (Scheduled Tribes)</option>
              <option value="ews">EWS (Economically Weaker Section)</option>
              <option value="rural">Rural Resident</option>
              <option value="urban">Urban Resident</option>
            </select>
          </div>
        </div>

        {/* Action Button & Matched Preview Pills */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
            <span className="font-bold text-slate-800">Popular matching programs:</span>
            {matchingSchemes.slice(0, 3).map((sch) => (
              <span
                key={sch.id}
                onClick={() => onSelectScheme && onSelectScheme(sch)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold cursor-pointer text-[11px] transition-colors"
              >
                {sch.title.split("(")[0]}
              </span>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={handleApplyFiltered}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#0B3B60] to-[#082d4c] text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2 border border-amber-400/40 hover:from-[#09406b] hover:to-[#061e33] transition-all"
          >
            <span>View {totalMatchingCount} Matching Schemes & Apply</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </motion.button>
        </div>
      </div>

      {/* 3. UMANG ICONIC MOST FREQUENTLY USED CITIZEN SERVICES (Fast-Track Ribbon) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                Trending & Most-Used Government Services (UMANG Highlights)
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Instant 1-click access to India's most transacted citizen services with Aadhaar single sign-on.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onSelectCategory("citizen-portal")}
            className="text-xs font-bold text-[#0B3B60] hover:underline flex items-center gap-1"
          >
            <span>Explore All Services</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {trendingServices.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                whileHover={{ y: -3 }}
                onClick={() => handleTrendingClick(item.id)}
                className="cursor-pointer bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-md hover:border-[#0B3B60] transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      {item.department}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-extrabold border border-emerald-200">
                      {item.fee}
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-[#0B3B60] group-hover:bg-[#0B3B60] group-hover:text-amber-400 transition-colors shrink-0 shadow-inner">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#0B3B60] transition-colors leading-snug">
                        {item.title}
                      </h4>
                      <span className="inline-block mt-1 text-[11px] text-amber-800 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {item.tag}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 text-[11px] flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {item.time}
                  </span>
                  <span className="font-bold text-[#0B3B60] group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                    Open Service <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 4. THE 4 PRIMARY DEDICATED NATIONAL GATEWAYS (Bento Grid) */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg sm:text-xl font-black text-slate-900">
            Dedicated Citizen Gateways & Portals
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Tailored environments curated for specific beneficiary groups, from seniors to students and job seekers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {portals.map((cat) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.screen}
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectCategory(cat.screen)}
                className={`cursor-pointer bg-white rounded-3xl border-2 p-6 shadow-sm transition-all flex flex-col justify-between hover:shadow-xl relative overflow-hidden group ${cat.border}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${cat.accent}`}>
                      {cat.badge}
                    </span>
                    <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wide">
                      {cat.accentBadge}
                    </span>
                  </div>

                  <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-800 group-hover:bg-[#0B3B60] group-hover:text-amber-400 transition-colors duration-200 mb-4 shadow-inner">
                    <Icon className="w-7 h-7" />
                  </div>

                  <h4 className="text-lg font-black text-slate-900 mb-0.5 group-hover:text-[#0B3B60] transition-colors">
                    {cat.title}
                  </h4>
                  <div className="text-xs font-serif text-slate-500 mb-2">
                    {cat.nativeTitle}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {cat.subtitle}
                  </p>
                </div>

                <div className="pt-5 border-t border-slate-100 mt-5 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0B3B60] group-hover:underline">
                    Access Gateway
                  </span>
                  <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-[#0B3B60] group-hover:text-white transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 5. OFFICIAL GOVERNMENT TRUST, TRANSPARENCY & COMPLIANCE SEAL */}
      <div className="bg-slate-100 rounded-3xl p-6 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span className="px-2.5 py-0.5 rounded bg-blue-100 text-blue-900 text-xs font-bold">
              MeitY & Digital India Initiative
            </span>
            <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-900 text-xs font-bold">
              Direct Benefit Transfer (DBT) Ready
            </span>
            <span className="px-2.5 py-0.5 rounded bg-amber-100 text-amber-900 text-xs font-bold">
              Elder-Friendly Voice Ready
            </span>
          </div>
          <h4 className="text-sm sm:text-base font-extrabold text-slate-900">
            Citizen Transparency Guarantee & Single Sign-On Security
          </h4>
          <p className="text-xs text-slate-600 max-w-2xl">
            All entitlements are credited directly to your bank account via PFMS and Aadhaar Payment Bridge.
            No middlemen, no commission charges, and zero platform convenience fees.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href="tel:14567"
            className="px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-800 text-xs font-bold flex items-center gap-2 hover:bg-slate-50 shadow-sm"
          >
            <PhoneCall className="w-4 h-4 text-amber-600" />
            <span>Elderline 14567</span>
          </a>
          <a
            href="https://services.india.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-[#0B3B60] text-white text-xs font-bold flex items-center gap-2 hover:bg-[#082d4c] shadow"
          >
            <span>National Portal of India</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
