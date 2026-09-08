import React, { useState } from "react";
import { motion } from "motion/react";
import { ApplicationRecord, SupportedLanguage } from "../types";
import { TRANSLATIONS } from "../data/translations";
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Building,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Search,
  FileText,
} from "lucide-react";

interface ApplicationTrackingViewProps {
  applications: ApplicationRecord[];
  currentLanguage: SupportedLanguage;
}

export const ApplicationTrackingView: React.FC<ApplicationTrackingViewProps> = ({
  applications,
  currentLanguage,
}) => {
  const t = TRANSLATIONS[currentLanguage];
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedAppId, setExpandedAppId] = useState<string | null>(applications[0]?.id || null);

  const getStatusBadge = (status: ApplicationRecord["status"]) => {
    switch (status) {
      case "Approved":
        return {
          bg: "bg-emerald-50 text-emerald-800 border-emerald-300",
          icon: CheckCircle2,
          color: "text-emerald-600",
        };
      case "Under Verification":
        return {
          bg: "bg-blue-50 text-blue-800 border-blue-300",
          icon: Clock,
          color: "text-blue-600",
        };
      case "Applied":
        return {
          bg: "bg-amber-50 text-amber-800 border-amber-300",
          icon: Clock,
          color: "text-amber-600",
        };
      case "Rejected":
        return {
          bg: "bg-red-50 text-red-800 border-red-300",
          icon: XCircle,
          color: "text-red-600",
        };
    }
  };

  const filteredApps = applications.filter((app) => {
    const matchesStatus = filterStatus === "All" || app.status === filterStatus;
    const matchesSearch =
      app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.applicationRefNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.departmentOrOrg.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#0B3B60] via-[#09406b] to-[#041d31] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg border-b border-amber-400/30">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            National Single Window Application Tracker
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {t.trackingTitle}
          </h2>
          <p className="mt-2 text-sm text-slate-200 leading-relaxed">
            {t.trackingSubtitle}
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Ref No, Service, or Department..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-[#0B3B60] bg-slate-50"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {["All", "Applied", "Under Verification", "Approved", "Rejected"].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterStatus === st
                  ? "bg-[#0B3B60] text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Applications List with Timelines */}
      <div className="space-y-4">
        {filteredApps.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-500">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h4 className="text-base font-bold text-slate-700">No applications found</h4>
            <p className="text-xs text-slate-500 mt-1">
              Apply for certificates, welfare schemes, or scholarships to track their real-time status.
            </p>
          </div>
        ) : (
          filteredApps.map((app) => {
            const badge = getStatusBadge(app.status);
            const StatusIcon = badge.icon;
            const isExpanded = expandedAppId === app.id;

            return (
              <div
                key={app.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all hover:border-slate-300"
              >
                {/* Header Row */}
                <div
                  onClick={() => setExpandedAppId(isExpanded ? null : app.id)}
                  className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/70"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-bold text-[#0B3B60] bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
                        {app.applicationRefNumber}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        Applied: {app.appliedDate}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900">
                      {app.title}
                    </h3>
                    <span className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <Building className="w-3.5 h-3.5 text-slate-400" />
                      {app.departmentOrOrg}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${badge.bg}`}
                    >
                      <StatusIcon className={`w-3.5 h-3.5 ${badge.color}`} />
                      {app.status}
                    </span>

                    <button
                      type="button"
                      className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                    >
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Timeline View */}
                {isExpanded && (
                  <div className="p-5 pt-0 border-t border-slate-100 bg-slate-50/50">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 my-3">
                      Application Progression Timeline
                    </h4>

                    <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                      {app.timeline.map((item, idx) => (
                        <div key={idx} className="relative">
                          <span
                            className={`absolute -left-6 top-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                              item.done
                                ? "bg-emerald-600 border-emerald-200 text-white"
                                : "bg-white border-slate-300"
                            }`}
                          >
                            {item.done && <CheckCircle2 className="w-2.5 h-2.5" />}
                          </span>
                          <div className="text-xs">
                            <span
                              className={`font-semibold block ${
                                item.done ? "text-slate-900" : "text-slate-500"
                              }`}
                            >
                              {item.step}
                            </span>
                            <span className="text-[11px] text-slate-400 font-mono">
                              {item.date}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                      <span className="text-slate-500">
                        Paid Fee: <strong>{app.officialFees || "₹0.00"}</strong>
                      </span>
                      {app.officialWebsite && (
                        <a
                          href={app.officialWebsite}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-[#0B3B60] hover:underline flex items-center gap-1"
                        >
                          <span>Official Ministry Portal</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
