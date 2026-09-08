import React, { useState } from "react";
import { motion } from "motion/react";
import {
  GovernmentService,
  GovernmentScheme,
  SupportedLanguage,
} from "../types";
import { GOVERNMENT_SERVICES, GOVERNMENT_SCHEMES } from "../data/governmentData";
import { TRANSLATIONS } from "../data/translations";
import {
  FileText,
  Landmark,
  Building,
  CheckCircle2,
  Clock,
  IndianRupee,
  ChevronRight,
  ExternalLink,
  Search,
  Sparkles,
  Users,
  ShieldCheck,
  Tag,
  Filter,
  Layers,
} from "lucide-react";

interface CitizenPortalProps {
  currentLanguage: SupportedLanguage;
  onSelectService: (service: GovernmentService) => void;
  onSelectScheme: (scheme: GovernmentScheme) => void;
}

export const CitizenPortal: React.FC<CitizenPortalProps> = ({
  currentLanguage,
  onSelectService,
  onSelectScheme,
}) => {
  const t = TRANSLATIONS[currentLanguage];
  const [activeTab, setActiveTab] = useState<
    "all" | "services" | "schemes" | "certificates" | "women" | "farmers" | "housing" | "welfare" | "dbt"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredServices = GOVERNMENT_SERVICES.filter((srv) => {
    const matchesSearch =
      srv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      srv.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      srv.category.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (activeTab === "all" || activeTab === "services") return true;
    if (activeTab === "certificates" && srv.category === "Certificates") return true;
    return false;
  });

  const filteredSchemes = GOVERNMENT_SCHEMES.filter((sch) => {
    const matchesSearch =
      sch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sch.ministry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sch.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sch.benefits.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (activeTab === "all" || activeTab === "schemes") return true;
    if (activeTab === "dbt" && sch.tags.some((t) => t.toLowerCase().includes("dbt") || t.toLowerCase().includes("cash") || t.toLowerCase().includes("stipend") || t.toLowerCase().includes("pension"))) return true;
    if (activeTab === "women" && (sch.category === "Women" || sch.tags.includes("Women"))) return true;
    if (activeTab === "farmers" && (sch.category === "Farmers" || sch.tags.includes("Farmers"))) return true;
    if (activeTab === "housing" && (sch.category === "Housing" || sch.tags.includes("Housing"))) return true;
    if (activeTab === "welfare" && (sch.category === "Social Welfare" || sch.tags.includes("Welfare"))) return true;
    return false;
  });

  return (
    <div className="space-y-8">
      {/* 1. MYSCHEME & UMANG UNIFIED BANNER */}
      <div className="bg-gradient-to-r from-[#031c34] via-[#0B3B60] to-[#06243d] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg border border-amber-400/30">
        <div className="relative z-10 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Unified Services & myScheme Directory
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[11px] font-bold">
              Direct Benefit Transfer (DBT) Ready
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            {t.citizenPortal}
          </h2>
          <div className="text-xs font-serif text-amber-200 mt-1">
            राष्ट्रीय नागरिक सेवा एवं जनकल्याणकारी योजना मंच
          </div>

          <p className="mt-2 text-xs sm:text-sm text-slate-200 leading-relaxed max-w-2xl">
            Single-window access to statutory government certificates, central welfare schemes,
            land revenue records, and direct bank benefit transfers verified by Digital India.
          </p>
        </div>

        {/* Decorative Indian Ashoka subtle element */}
        <div className="absolute right-4 bottom-4 opacity-10 pointer-events-none hidden md:block">
          <Landmark className="w-48 h-48 text-white" />
        </div>
      </div>

      {/* 2. SEARCH AND CATEGORY FILTERS (myScheme Filter Standard) */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search across services, schemes, certificates, departments..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-[#0B3B60] bg-slate-50 font-medium"
            />
          </div>

          <div className="text-xs text-slate-600 font-bold bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
            Found {filteredServices.length + filteredSchemes.length} verified government provisions
          </div>
        </div>

        {/* Filter Pills (myScheme categories) */}
        <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-slate-100">
          {[
            { id: "all", label: "All Offerings" },
            { id: "dbt", label: "Direct Benefit Transfer (DBT)" },
            { id: "certificates", label: "Certificates & Revenue" },
            { id: "services", label: "Identity & Citizen Services" },
            { id: "farmers", label: "Agriculture & Farmers (PM-KISAN)" },
            { id: "women", label: "Women & Child Welfare (Lakhpati Didi)" },
            { id: "housing", label: "Housing & Infrastructure (PMAY)" },
            { id: "welfare", label: "Social Welfare & Food (NFSA)" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? "bg-[#0B3B60] text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. SERVICES SECTION (UMANG Styled Cards) */}
      {(activeTab === "all" || activeTab === "services" || activeTab === "certificates") &&
        filteredServices.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-1 border-b border-slate-200">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#0B3B60]" />
                <span>Statutory Certificates & Public Services (UMANG Services)</span>
              </h3>
              <span className="text-xs text-slate-500 font-bold">
                {filteredServices.length} Active Services
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredServices.map((service) => (
                <motion.div
                  key={service.id}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-3xl border-2 border-slate-200 p-5 shadow-sm flex flex-col justify-between hover:shadow-lg hover:border-[#0B3B60] transition-all relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-700" />

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0B3B60] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                        {service.category}
                      </span>
                      {service.badge && (
                        <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
                          {service.badge}
                        </span>
                      )}
                    </div>

                    <h4 className="text-base font-black text-slate-900 mb-1 leading-snug">
                      {service.title}
                    </h4>

                    <p className="text-xs text-slate-500 mb-3 flex items-center gap-1 font-medium">
                      <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{service.department}</span>
                    </p>

                    <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-2.5 rounded-2xl border border-slate-200 mb-4">
                      <div>
                        <span className="text-slate-400 block text-[10px] font-bold">Government Fee:</span>
                        <span className="font-extrabold text-slate-900">{service.officialFees}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] font-bold">Timeline:</span>
                        <span className="font-extrabold text-slate-900">{service.processingTime}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 font-medium">Step-by-Step Guidance</span>
                    <button
                      type="button"
                      onClick={() => onSelectService(service)}
                      className="px-3.5 py-1.5 rounded-xl bg-[#0B3B60] hover:bg-[#09406b] text-white text-xs font-bold shadow-sm flex items-center gap-1.5 transition-colors"
                    >
                      <span>Apply Guidelines</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

      {/* 4. WELFARE SCHEMES SECTION (myScheme Styled Cards) */}
      {filteredSchemes.length > 0 && (
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between pb-1 border-b border-slate-200">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Landmark className="w-5 h-5 text-amber-600" />
              <span>Government Schemes & Direct Benefits (myScheme Catalog)</span>
            </h3>
            <span className="text-xs text-slate-500 font-bold">
              {filteredSchemes.length} Active Schemes
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredSchemes.map((scheme) => (
              <motion.div
                key={scheme.id}
                whileHover={{ y: -4 }}
                className="bg-white rounded-3xl border-2 border-slate-200 p-5 shadow-sm flex flex-col justify-between hover:shadow-lg hover:border-amber-500 transition-all relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 to-orange-600" />

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300">
                      {scheme.category}
                    </span>
                    <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      DBT Enabled
                    </span>
                  </div>

                  <h4 className="text-base font-black text-slate-900 mb-1 leading-snug">
                    {scheme.title}
                  </h4>

                  <p className="text-xs text-slate-500 mb-3 flex items-center gap-1 font-medium">
                    <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{scheme.ministry}</span>
                  </p>

                  <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-slate-800 mb-4 line-clamp-3">
                    <strong className="text-amber-950 block text-[11px] font-black mb-0.5">
                      Direct Entitlement:
                    </strong>
                    {scheme.benefits}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-emerald-700 font-bold">100% Free Benefit</span>
                  <button
                    type="button"
                    onClick={() => onSelectScheme(scheme)}
                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs font-bold shadow-sm flex items-center gap-1.5 transition-all"
                  >
                    <span>Check Eligibility</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
